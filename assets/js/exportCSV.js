$("document").ready(function () {
    //Adapted from https://www.codexworld.com/export-html-table-data-to-csv-using-javascript/
    //Script to download a CSV of the boundary WGS84 Geodetic table. 
    $("#boundaryExportGeo").click(function () {
    function exportBoundaryGeoToCSV() {
      let csv = [];
      //Gets table rows of Boundary table and assigns to a variable. 
      let rows = document.querySelectorAll("#boundaryTable tr");
      //Iterates through the rows variable to target each table cell value.
      for (let i = 0; i < rows.length; i++) {
        let row = [],
          cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);
        // Pushes the cell value into the csv array, joining each with a comma delimeter. 
        csv.push(row.join(","));
      }
      //Calls the download function, using new line between each data row. 
      downloadBoundaryGeoCSV(csv.join("\n"));
    }
    exportBoundaryGeoToCSV();
    function downloadBoundaryGeoCSV(csv) {
        let csvFile;
        let downloadLink;
        //Creates a file-like object based on the csv array
        csvFile = new Blob([csv], {type: "text.csv"});
        //Invokes the browser download functionality. 
        downloadLink = document.createElement("a");
        downloadLink.download = "boundaryExportGeodetic.csv";
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
  });
  //Script to download a CSV of the boundary UTM Projected table.
  $("#boundaryExportProjected").click(function () {
    function exportBoundaryProjectedToCSV() {
      let csv = [];
      //Gets table rows of Boundary table and assigns to a variable. 
      let rows = document.querySelectorAll("#boundaryConverted tr");
      //Iterates through the rows variable to target each table cell value.
      for (let i = 0; i < rows.length; i++) {
        let row = [],
          cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);
        // Pushes the cell value into the csv array, joining each with a comma delimeter.
        csv.push(row.join(","));
      }
      //Calls the download function, using new line between each data row. 
      downloadBoundaryProjectedCSV(csv.join("\n"));
    }
    exportBoundaryProjectedToCSV();
    function downloadBoundaryProjectedCSV(csv) {
        let csvFile;
        let downloadLink;
        //Creates a file-like object based on the csv array
        csvFile = new Blob([csv], {type: "text.csv"});
        //Invokes the browser download functionality. 
        downloadLink = document.createElement("a");
        downloadLink.download = "boundaryExportProjected.csv";
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
  });
  //Script to download a CSV of the survey lines WGS84 Geodetic table.
  $("#lineExportGeo").click(function () {
    function exportLineGeoToCSV() {
      let csv = [];
      //Gets table rows of survey lines table and assigns to a variable. 
      let rows = document.querySelectorAll("#lineTable tr");
      //Iterates through the rows variable to target each table cell value.
      for (let i = 0; i < rows.length; i++) {
        let row = [],
          cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);
        // Pushes the cell value into the csv array, joining each with a comma delimeter.
        csv.push(row.join(","));
      }
      //Calls the download function, using new line between each data row. 
      downloadLineGeoCSV(csv.join("\n"));
    }
    exportLineGeoToCSV();
    function downloadLineGeoCSV(csv) {
        let csvFile;
        let downloadLink;
        //Creates a file-like object based on the csv array
        csvFile = new Blob([csv], {type: "text.csv"});
        //Invokes the browser download functionality. 
        downloadLink = document.createElement("a");
        downloadLink.download = "lineExportGeodetic.csv";
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
  });
  //Script to download a CSV of the survey lines UTM Projected table.
  $("#lineExportProjected").click(function () {
    function exportLineProjectedToCSV() {
      let csv = [];
      //Gets table rows of survey lines table and assigns to a variable. 
      let rows = document.querySelectorAll("#lineConverted tr");
      //Iterates through the rows variable to target each table cell value.
      for (let i = 0; i < rows.length; i++) {
        let row = [],
          cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);
        // Pushes the cell value into the csv array, joining each with a comma delimeter.
        csv.push(row.join(","));
      }
      //Calls the download function, using new line between each data row.
      downloadLineProjectedCSV(csv.join("\n"));
    }
    exportLineProjectedToCSV();
    function downloadLineProjectedCSV(csv) {
        let csvFile;
        let downloadLink;
        //Creates a file-like object based on the csv array
        csvFile = new Blob([csv], {type: "text.csv"});
        //Invokes the browser download functionality. 
        downloadLink = document.createElement("a");
        downloadLink.download = "lineExportProjected.csv";
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
  });
});
