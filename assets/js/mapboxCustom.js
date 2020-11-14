$("document").ready(function () {
  //Mapbox access token
  mapboxgl.accessToken =
    "pk.eyJ1Ijoia3dzbmljayIsImEiOiJja2UzMDY3eDAwZWZvMnlwZHk2bWJ3OXkxIn0.prNYik8MEfEYiueN0vP58Q";
  //Create s new mapbox map element within the #map div.
  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: [-2.995859, 53.405974], // starting position [lng, lat]
    zoom: 11, // starting zoom
    logoPosition: "bottom-left",
  });
  // Map type dropdown selector listener and setter
  $("#mapStyles").click(function setLayer() {
    $("#mapStyles").change(function (event) {
      let layerId = $(this).val();
      switchLayer(layerId);
    });
  });

  // Code inspiration from mapbox API documentation, modified to work on a dropdown
  function switchLayer(setId) {
    map.setStyle("mapbox://styles/mapbox/" + setId);
  }
  //Do not show zoom controls, visualise pitch in the North arrow.
  let navControl = new mapboxgl.NavigationControl({
    showZoom: false,
    visualizePitch: true,
  });
  //Enable user location functionality with htigh accuracy.
  let userLocation = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  });
  //Enable scale bar in metres/km.
  let scale = new mapboxgl.ScaleControl({
    maxWidth: 200,
    unit: "metric",
  });
  //Place desired mapbox tools in custom #toolbar div.
  document.getElementById("toolbar").appendChild(navControl.onAdd(map)); //North arrow
  document.getElementById("toolbar").appendChild(userLocation.onAdd(map)); //User location
  map.addControl(scale, "bottom-right");
  //Invoke Mapbox Draw API
  map.on("load", function () {
    let draw = new MapboxDraw({
      //Display custom control set
      displayControlsDefault: false,
      controls: {
        polygon: true, //Draw Polygon
        line_string: true, //Draw Line
        trash: true, //Delete
      },
    });
    //Place mapbox draw tools in #toolbar div.
    document.getElementById("toolbar").appendChild(draw.onAdd(map));

    //Draw imported Boundary Polygon (Called from importCSV.js)
    window.importedCsvBoundaryToDraw = function (importedBoundary) {
      //Will catch and present an alert if one is trigger from mapboxDraw API.
      try {
        draw.add(importedBoundary);
      } catch (e) {
        alert("Boundary Import " + e);
      }
      deleteExistingBoundary();
      getPolygon();
    };

    //Only allow 1x Polygon to exist
    map.on("draw.create", deleteExistingBoundary);

    //Function to delete old polygons before drawing new ones
    function deleteExistingBoundary(e) {
      //Place features collection in a variable
      let data = draw.getAll();
      //Get all features of features collection
      let collectedFeatures = data.features;
      //For of loop to only target Polygon Features and return the ID of the polygon
      function polygonTarget() {
        for (let feature of collectedFeatures) {
          if (feature.geometry.type === "Polygon") {
            let polygonId = feature.id;
            return polygonId;
          }
        }
      }
      let boundaryId = polygonTarget();
      //For loop to count the number of polygon objects
      function deleteExistingPolygon(e) {
        let i = 0;
        for (let feature of collectedFeatures) {
          if (feature.geometry.type === "Polygon") {
            i++;
          }
        }
        //If more than one polygon exists the ID obtained eariler is used to target the older polygon and delete it
        if (i > 1) {
          draw.delete(boundaryId);
        }
      }
      deleteExistingPolygon();
    }

    //Obtain Polygon Geometry
    map.on("draw.create", getPolygon);
    map.on("draw.delete", getPolygon);
    map.on("draw.update", getPolygon);
    //Function to find polygon in featureCollection
    function getPolygon(e) {
      $("#boundaryCoords>#boundaryConverted>tbody>tr").remove();
      $("#boundaryStatData>p").remove();
      let data = draw.getAll();
      let collectedFeatures = data.features;
      //For of loop to only target Polygon Features
      function polygonTarget() {
        for (let feature of collectedFeatures) {
          //Use turf API to get the area of the polygon
          let area = turf.area(feature);
          //Pass this area into a new variable and convert to kilometers to 2d.p.
          let areaKm = (area / 1000).toFixed(2);
          if (feature.geometry.type === "Polygon") {
            let polygonCoords = feature.geometry.coordinates[0];
            //Use polygonCoords and convert to a lineString in turf and then use turf to calculate the length of the linestring in kilometers to 2d.p. 
            let perimeterLength = turf
              .length(turf.lineString(polygonCoords))
              .toFixed(2);
            //Call the function to write these statistics into the Statistics window. 
            updateBoundaryStats(areaKm, perimeterLength);
            return polygonCoords;
          }
        }
      }
      //Write the calculated polygon statistics into the relevant html elements. 
      function updateBoundaryStats(areaKm, perimeterLength) {
        $("#boundaryStatData").html(
          `<p id="boundaryArea" class="bgGlassSmokeIncOpacity"><strong>Boundary Area (km) : </strong>` +
            "" +
            areaKm +
            `</p><p id="boundaryPerimeter" class="bgGlassSmokeIncOpacity"><strong>Boundary Perimeter Length (km) : </strong>` +
            "" +
            perimeterLength +
            `</p>`
        );
      }
      //Boundary Variable containing the coordinate array of the polygon.
      let boundary = polygonTarget();
      //Write the boundary vertices into the boundary table. 
      function writeBoundaryToTable() {
        $("#boundaryCoords>#boundaryTable>tbody>tr").remove();
        if (typeof boundary !== "undefined") {
          for (let vertices of boundary) {
            $("#boundaryCoords>#boundaryTable>tbody").append(
              "<tr><td class='tableBorder'>" +
                vertices[1].toFixed(7) +
                "</td><td class='tableBorder'>" +
                vertices[0].toFixed(7) +
                "</td></tr>"
            );
          }
        }
      }

      writeBoundaryToTable();

      //Function to simulate an enter key down event, used to trigger the functions in UTMproject.js to convert the LAT LONG boundary to Easting and Northing.
      //Adapted from cloakedninjas response within a Stack Overflow query June 2013.
      function simEnter() {
        x = $.Event("keydown");
        x.keyCode = 13; //Enter Key
        $("input").trigger(x);
      }
      simEnter();
    }

    //Delete existing line data function call from importCSV.js
    window.deleteExistingLineFeatures = function () {
      deleteExistingLines();
    };

    //Draw imported Lines (Called from importCSV.js)
    window.importedCsvLineToDraw = function (importedLine) {
      //Will catch and present an alert if one is trigger from mapboxDraw API.
      try {
        draw.add(importedLine);
      } catch (e) {
        this.alert("Line Import " + e);
      }
      getLineString();
    };

    //Function to delete old lines before drawing imported new ones
    function deleteExistingLines(e) {
      //Place features collection in a variable
      let data = draw.getAll();
      //Get all features of features collection
      let collectedFeatures = data.features;
      //For of loop to only target Line Features and return the ID of the lines to then target these ID's deletion
      function lineDeleteTarget() {
        for (let feature of collectedFeatures) {
          if (feature.geometry.type === "LineString") {
            let lineToDeleteId = feature.id;
            draw.delete(lineToDeleteId);
          }
        }
      }
      lineDeleteTarget();
    }
    //Obtain Line Geometry
    map.on("draw.create", getLineString);
    map.on("draw.delete", getLineString);
    map.on("draw.update", getLineString);
    //Function to find line strings in featureCollection
    function getLineString(e) {
      //Place features collection in a variable
      let data = draw.getAll();
      //Get all features of features collection
      let collectedFeatures = data.features;
      //For of loop to only target Line String Features
      function lineTarget() {
        let lineFeaturesArray = [];
        for (let feature of collectedFeatures) {
          if (feature.geometry.type === "LineString") {
            //Get coordinates of each lines vertices
            let lineCoords = feature.geometry.coordinates;
            //Push coordinate of all vertices for an individual line into an array. 
            lineFeaturesArray.push(lineCoords);
          }
        }
        return lineFeaturesArray;
      }
      lineTarget();
      //Line Variable containing the coordinate array of the lineString
      let lines = lineTarget();
      //Gets line string coorinates, matches then to a line ID and writes them to a table for the user.

      function writeLineToTable() {
        //Delete existing lines from Survey Lines table.
        $("#lineCoords>#lineTable>tbody>tr").remove();
        //Delete existing line lengths from statistics.
        $("#lineStatsTable>tbody>tr").remove();
        //Update number of lines in statistics.
        $("#lineCount").html(" ");
        //Update total length of all lines in statistics. 
        $("#lineDistance").html(" ");
        //Show the warning to promt users to re-calulate duration statistics. 
        $("#recalcWarning").show();
        //As long as the line type is not undefined perform this function to write lines to Survey Lines table and calculate each line's length. 
        if (typeof lines !== "undefined") {
          let lineLengthsArray = [];
          for (let i = 0; i < lines.length; i++) {
            let lineLengthArray = [];
            //Use turf to calculate each lines length. 
            let lineLength = turf.length(turf.lineString(lines[i])).toFixed(2);
            let lineId = i + 1;
            let line = lines[i];
            let lineCoords = [];
            for (let j = 0; j < line.length; j++) {
              let lineVertex = [line[j][1].toFixed(7), line[j][0].toFixed(7)];
              lineCoords.push(lineVertex);
              $("#lineCoords>#lineTable>tbody").append(
                "<tr><td class='tableBorder'>" +
                  lineId +
                  "<td class='tableBorder'>" +
                  lineCoords[j][0] +
                  "</td><td class='tableBorder'>" +
                  lineCoords[j][1] +
                  "</td></tr>"
              );
            }
            //De-duplicates line ID and length array to push into final array which is tabulated in HTML
            lineLengthArray.push(lineId, lineLength);
            let uniqueLineLengthSet = new Set(lineLengthArray);
            let uniqueLineLengthArray = [...uniqueLineLengthSet];
            lineLengthsArray.push(uniqueLineLengthArray);
            let lengthsToFloatArray = [];
            $("#lineStatsTable>tbody>tr").remove();
            for (let k = 0; k < lineLengthsArray.length; k++) {
              //Writes the line ID and Length into a table for the user in Statistics
              $("#lineStatsTable>tbody").append(
                "<tr><td class='tableBorder'>" +
                  lineLengthsArray[k][0] +
                  "<td class='tableBorder'>" +
                  lineLengthsArray[k][1] +
                  "</td></tr>"
              );
              //Counts the number of lines and reports it into a HTML element for the user in Statistics
              let noLines = k + 1;
              $("#lineCount").html(" " + noLines);
              //Takes the length of each line, converts from a string to a floating number and pushes into an array.
              lengthsToFloatArray.push(parseFloat(lineLengthsArray[k][1]));
            }
            //Sums all the line lengths in the floating number array and writes a value to 2d.p into an HTML element in Statistics.
            let totalLineLength = lengthsToFloatArray.reduce(function (a, b) {
              return a + b;
            }, 0);
            //Write total length of allsurvey lines to statistics.
            $("#lineDistance").html(" " + totalLineLength.toFixed(2));
          }
        }
      }
      writeLineToTable();

      //Function to simulate an enter key down event, used to trigger the functions in UTMproject.js to convert the LAT LONG boundary to Easting and Northing.
      //Adapted from cloakedninjas response within a Stack Overflow query June 2013.
      function simShift() {
        x = $.Event("keydown");
        x.keyCode = 16; //Shift Key
        $("input").trigger(x);
      }
      simShift();
    }
  });

  // Show cursor location. Inspired by Mapbox GL API documentation
  function reportCursorPos() {
    map.on("mousemove", function (e) {
      let longitude = JSON.stringify(e.lngLat["lng"]);
      let latitude = JSON.stringify(e.lngLat["lat"]);
      document.getElementById("cursorLat").innerHTML =
        // e.lngLat is the longitude, latitude geographical position of the mousemove event.
        // Latitude and Longitude targeted specifically and reported into separate elements.
        '<p class="no-margin">LAT: ' +
        "<span>" +
        parseFloat(latitude).toFixed(7) +
        "</span>" +
        "</p>";
      document.getElementById("cursorLong").innerHTML =
        '<p class="no-margin">LONG: ' +
        "<span>" +
        parseFloat(longitude).toFixed(7) +
        "</span>" +
        "</p>";
    });
  }
  reportCursorPos();
  //On touch end the footer reports the last touch position in Lat and Long.
  function reportLastTouchPos() {
    map.on("touchend", function (e) {
      let longitude = JSON.stringify(e.lngLat["lng"]);
      let latitude = JSON.stringify(e.lngLat["lat"]);
      document.getElementById("cursorLat").innerHTML =
        // e.lngLat is the longitude, latitude geographical position of the mousemove event.
        // Latitude and Longitude targeted specifically and reported into separate elements.
        '<p class="no-margin">LAT: ' +
        "<span>" +
        parseFloat(latitude).toFixed(7) +
        "</span>" +
        "</p>";
      document.getElementById("cursorLong").innerHTML =
        '<p class="no-margin">LONG: ' +
        "<span>" +
        parseFloat(longitude).toFixed(7) +
        "</span>" +
        "</p>";
    });
  }
  reportLastTouchPos();
});
