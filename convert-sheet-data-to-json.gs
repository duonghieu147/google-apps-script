function convertSheetDataToJsonAndExport() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var jsonData = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowData = {};

    for (var j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j];
    }

    jsonData.push(rowData);
  }

  var jsonString = JSON.stringify(jsonData);

  // Create a new file in Google Drive with the JSON data.
  var fileName = sheet.getSheetName()+".json";
  var folderId = "YOUR_FOLDER_ID";  // Replace with your Google Drive folder ID.

  var folder = DriveApp.getFolderById(folderId);
  var file = folder.createFile(fileName, jsonString, MimeType.PLAIN_TEXT);
}
