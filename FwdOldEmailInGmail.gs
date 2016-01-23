/*
 Developer: Abdul Hye Fahad
 License: Free to Use for people in need/freeware. Contact Developer for code to be used in Paid Plugins / Softwares etc. 
 Development time taken: few mins, Developer gives no guarantees. Please do read "ReadMe.md" before applying the script. 
 */

function fwdOldMailInGmail() {
  // Save Google Sheet with two columns and as many rows as you want and give its url in line #3 
  var sheet =  SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/<sheetID>/edit').getSheets()[0]; //Get First Active Sheet 
  var startRow = 3;  // First row of data to process
  var numRows = 1;   // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 2);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  
  var remainingQuota = Number(MailApp.getRemainingDailyQuota());
  var batchSize = Number(PropertiesService.getScriptProperties().getProperty('BatchSize'));
  var totalThreadsSent = Number(PropertiesService.getScriptProperties().getProperty('TotalThreadsSent'));
  var currentThread = Number(PropertiesService.getScriptProperties().getProperty('CurrentThread'));
  var currentMessage = Number(PropertiesService.getScriptProperties().getProperty('CurrentMessage'));
  
  var actualBatch = Math.min(batchSize,remainingQuota)
  
  Logger.log("Total Threads sent till now:" + totalThreadsSent);
  Logger.log("Batch size: " + actualBatch);
  Logger.log("Remaining Quota:" + remainingQuota);
  Logger.log("Sending Emails FROM :: ");
  Logger.log("Thread Number: " + currentThread);
  Logger.log("Message Number:" + currentMessage);
  
  try{
  
  for (i in data) 
  {
    var row = data[i];
    var label = row[0]; // First Column 
    var emailAddress = row[1];  // Second column
    // *Use any of the below strategy of line 34,35 to define search criteria*
    var searchLabel = 'label:'+label;
    //var searchLabel = 'label:[Gmail]/someLabel after:2015/9/15 before:2016/7/1';
    var threads = GmailApp.search(searchLabel);
    var messagesLeft = actualBatch ;
    
    for (var h = currentThread; h < threads.length; h++) 
    {
      if(messagesLeft <= 0)
        break;
      
      Logger.log("Sending Thread Number: " + h);
      
      var messages = threads[h].getMessages();
      if(messages != null)
      {
        var maxRange = currentMessage + messagesLeft 
        var limit = Math.min(maxRange, messages.length);
        
        for (var i = currentMessage; i < limit; i++) 
        {
          Logger.log("Sending Message:" + messages[i].getSubject());
          messages[i].forward(emailAddress);
          
          messagesLeft = messagesLeft -1;  
          currentMessage = currentMessage +1; 
          PropertiesService.getScriptProperties().setProperty('CurrentMessage', String(currentMessage));
          Utilities.sleep(1000);
        }
        
        // If all messages have been sent in a thread 
        if(currentMessage  == messages.length)
        {
          currentMessage = 0 ;
          currentThread = currentThread + 1; 
          totalThreadsSent = totalThreadsSent+1;
          
          PropertiesService.getScriptProperties().setProperty('CurrentMessage', String(currentMessage));
          PropertiesService.getScriptProperties().setProperty('CurrentThread', String(currentThread));
          PropertiesService.getScriptProperties().setProperty('TotalThreadsSent', String(totalThreadsSent));
        }
      } 
       
    }
  }
  
  }
  catch(e)
  {
    Logger.log("EXCEPTION OCCURED !");
    Logger.log("Message:" + e.message);
    Logger.log("FileName:" + e.fileName);
    Logger.log("Line : " + e.lineNumber);
    
  }
 
}
