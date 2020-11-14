import { LatLon } from "https://cdn.jsdelivr.net/npm/geodesy@2/utm.js";
$(document).ready(function () {
  // Script to convert cursor position to UTM
  $("#map").on("mousemove", function () {
    let cursorLat = $("#cursorLat>p>span").html();
    let cursorLong = $("#cursorLong>p>span").html();
    //Takes footer html elements and converts to an object the API can read. 
    let cursorLatLong = new LatLon(cursorLat, cursorLong);
    //API tool to convert LatLon object to UTM coordinate object.
    let UTM = cursorLatLong.toUtm();
    //Write object properties to unique variables.
    let northing = UTM["northing"];
    let easting = UTM["easting"];
    let hemi = UTM["hemisphere"];
    let zone = UTM["zone"];
    //Write variables into footer html. 
    document.getElementById("cursorGeodetic").innerHTML =
      '<p class="no-margin">' + "<span> WGS84 </span>" + "</p>";
    document.getElementById("cursorNorthing").innerHTML =
      '<p class="no-margin">' +
      "<span>NORTHING: " +
      northing.toFixed(2) +
      "</span>" +
      "</p>";
    document.getElementById("cursorEasting").innerHTML =
      '<p class="no-margin">' +
      "<span>EASTING: " +
      easting.toFixed(2) +
      "</span>" +
      "</p>";
    document.getElementById("cursorUtmZone").innerHTML =
      '<p class="no-margin">' +
      "<span> UTM " +
      zone +
      " " +
      hemi +
      "</span>" +
      "</p>";
  });
  //Script to convert last touch position to UTM
  $("#map").on("touchend", function () {
    let cursorLat = $("#cursorLat>p>span").html();
    let cursorLong = $("#cursorLong>p>span").html();
    //Takes footer html elements and converts to an object the API can read. 
    let cursorLatLong = new LatLon(cursorLat, cursorLong);
    //API tool to convert LatLon object to UTM coordinate object.
    let UTM = cursorLatLong.toUtm();
    //Write object properties to unique variables.
    let northing = UTM["northing"];
    let easting = UTM["easting"];
    let hemi = UTM["hemisphere"];
    let zone = UTM["zone"];
    //Write variables into footer html. 
    document.getElementById("cursorGeodetic").innerHTML =
      '<p class="no-margin">' + "<span> WGS84 </span>" + "</p>";
    document.getElementById("cursorNorthing").innerHTML =
      '<p class="no-margin">' +
      "<span>NORTHING: " +
      northing.toFixed(2) +
      "</span>" +
      "</p>";
    document.getElementById("cursorEasting").innerHTML =
      '<p class="no-margin">' +
      "<span>EASTING: " +
      easting.toFixed(2) +
      "</span>" +
      "</p>";
    document.getElementById("cursorUtmZone").innerHTML =
      '<p class="no-margin">' +
      "<span> UTM " +
      zone +
      " " +
      hemi +
      "</span>" +
      "</p>";
  });
  // Boundary Geodetics to UTM Proejcted Coordinates
  $(document).on("keydown", function (event) {
    if (event.keyCode === 13) {
      //Code to turn boundary table data into an array
      //Code inspiration from Stack Overflow user Andreas Eriksson posted March 6th 2012
      function boundaryTableToArray() {
        let boundaryTableArray = [];
        $("#boundaryTable tr").each(function () {
          let arrayOfThisVertices = [];
          let tableData = $(this).find("td");
          if (tableData.length > 0) {
            tableData.each(function () {
              arrayOfThisVertices.push($(this).text());
            });
            boundaryTableArray.push(arrayOfThisVertices);
          }
        });
        return boundaryTableArray;
      }
      //Function that uses this array and iterates through to convert coordinates for LAT LONG to Easting and Northing.
      function convertBoundaryTableArrayToUtm() {
        let projectedArray = [];
        for (let geodeticCoords of boundaryTableToArray()) {
          let arrayOfThisProjected = [];
          //Creates an object the converter can read. 
          let boundTableLatLong = new LatLon(
            geodeticCoords[0],
            geodeticCoords[1]
          );
          try {
            //Reads the LatLon object and converts it to projected coordinates. 
            let boundTableUTM = boundTableLatLong.toUtm();
            //Writes object properties into unique variables.
            let boundNorthing = boundTableUTM["northing"];
            let boundEasting = boundTableUTM["easting"];
            //Pushes the converted coordinates into an array per vertices. 
            arrayOfThisProjected.push(boundNorthing, boundEasting);
          } catch (e) {
            //Returns the error message from the API is one is triggered. 
            alert(
              "Boundary Import Not Expected Coordinate Format or Geodetics " + e);
          }
          //Pushes the vertices array into a master array for the boundary.
          projectedArray.push(arrayOfThisProjected);
        }
        //Function to delete any previous values in the boundary table and write in the latest values. 
        function writeBoundUtmToTable() {
          $("#boundaryCoords>#boundaryConverted>tbody>tr").remove();
          for (let projectedVertices of projectedArray) {
            $("#boundaryCoords>#boundaryConverted>tbody").append(
              "<tr><td class='tableBorder'>" +
                projectedVertices[0].toFixed(2) +
                "</td><td class='tableBorder'>" +
                projectedVertices[1].toFixed(2) +
                "</td></tr>"
            );
          }
        }
        writeBoundUtmToTable();
      }
      convertBoundaryTableArrayToUtm();
      //Change the cursor type back to default once the script has completed.
      $("body").css("cursor", "default");
      //Change the text of the import button back to default after the script has completed. 
      $("#boundarySubmit").html("IMPORT");
    }
  });
  // Line Geodetics to UTM Projected Coordinates
  $(document).on("keydown", function (event) {
    if (event.keyCode === 16) {
      //Code to turn line table data into an array
      //Code inspiration from Stack Overflow user Andreas Eriksson posted March 6th 2012
      function lineTableToArray() {
        let lineTableArray = [];
        $("#lineTable tr").each(function () {
          let arrayOfThisVertices = [];
          let tableData = $(this).find("td");
          if (tableData.length > 0) {
            tableData.each(function () {
              arrayOfThisVertices.push($(this).text());
            });
            lineTableArray.push(arrayOfThisVertices);
          }
        });
        return lineTableArray;
      }
      //Function that uses this array and iterates through to convert coordinates for LAT LONG to Easting and Northing.
      function convertLineTableArrayToUtm() {
        let projectedArray = [];
        for (let geodeticCoords of lineTableToArray()) {
          let arrayOfThisProjected = [];
          //Obtain the line ID value for the vertices. 
          let lineProjectedId = geodeticCoords[0];
          //Creates an object the converter can read. 
          let lineTableLatLong = new LatLon(
            geodeticCoords[1],
            geodeticCoords[2]
          );
          try {
            //Reads the LatLon object and converts it to projected coordinates. 
            let lineTableUTM = lineTableLatLong.toUtm();
            //Writes object properties into unique variables.
            let lineNorthing = lineTableUTM["northing"];
            let lineEasting = lineTableUTM["easting"];
            //Pushes the converted coordinates into an array per vertices. 
            arrayOfThisProjected.push(lineProjectedId, lineNorthing, lineEasting);
          } catch (e) {
            //Returns the error message from the API is one is triggered. 
            alert("Line Import Not Expected Coordinate Format or Geodetics " + e);
          }
          //Pushes the vertices array into a master array for the line.
          projectedArray.push(arrayOfThisProjected);
        }
        //Function to delete any previous values in the line table and write in the latest values. 
        function writeLineUtmToTable() {
          $("#lineCoords>#lineConverted>tbody>tr").remove();
          for (let projectedVertices of projectedArray) {
            $("#lineCoords>#lineConverted>tbody").append(
              "<tr><td class='tableBorder'>" +
                projectedVertices[0] +
                "</td><td class='tableBorder'>" +
                projectedVertices[1].toFixed(2) +
                "</td><td class='tableBorder'>" +
                projectedVertices[2].toFixed(2) +
                "</td></tr>"
            );
          }
        }
        writeLineUtmToTable();
      }
      convertLineTableArrayToUtm();
      //Change the cursor type back to default once the script has completed.
      $("body").css("cursor", "default");
      //Change the text of the import button back to default after the script has completed. 
      $("#linesSubmit").html("IMPORT");
    }
  });
});
