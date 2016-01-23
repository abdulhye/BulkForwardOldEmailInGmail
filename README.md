# Script to Send Email via Google Script API 
#Disclaimer: 
Developed in stressful times and script comes with no guarantees

Very recently, my father passed away on 23rd december 2015. While overcoming the shock of his demise, came the request of his organization that he had some official emails on his gmail account. There was no built in functionality in Gmail that we could bulk forward old emails to a particular account. There might be plugins available but they are PAID. Secondly,i was not getting enough freedom that i wanted from the plugin so thought of writing my own code. Google API might give intermittent errors like "Invalid MIME Type" or "Exception Occured while delivering a message" without mentioning exact Exception.

During this stressful time, i looked at few examples. I admit here that I never coded in Google script before. This effort was a few mins effort to send old email sitting in my father's inbox to his organization's relevant person's email account.

# Things to do before running the script.

1. Please create a filter upon a search criteria for all incoming messages to the relevant email address, in this way new emails will be fwded to the account
2. Create a filter based on old emails and if possible, assign it a label.
3. Open up a Google sheet, add two columns , GmailLabel . AutoForwardEmail  and then put the label and email address in the file (see example image Forward_Old_Email at https://goo.gl/photos/5FyZP8RA58TxpXJKA ) 
4. In Google Sheet, Go to Tools -> Script Editor  ; Copy paste the script SendEmailViaGmail script 
5. In Script Editor, go to File -> Project Properties-> Script Properties. Set four (4) variables. 
CurrentMessage (set to 0) 
BatchSize (set to 100, this is the max number of emails that Gmail allows to send in one day) 
CurrentThread (set to 0, this shows what is the current thread script is on) 
TotalThreadsSent (set to 0, this number will be set by script to let you know how many threads were actually sent by Script)
6. As there is a total limit of 100 messages / day, you might want to add a trigger that can run everyday by going to Script Editor, Resources -> Current Project's triggers -> Add a new trigger. Make sure the name of the function is correct and Event is Time-Driven -> DayTimer -> Select time 
 [if one thread has 100 messages, then one thread will be sent, else above variables will keep count where you stand and will resume from there next day when trigger runs the function]

7. Edit Line #9 with your Google sheet link
8. If you want your own search criteria, comment Line #40 and uncomment Line #41 and define your search criteria there.


# CAUTION
Script might fail because of API issues (Invalid MIME type error, Exception occured etc). During that scenario, you can check Script properties (ScriptEditor: File->Project Properties -> Script Properties) to see what is the CurrentThread and CurrentMessage. Also you can see the error message by going to View -> Logs in Script Editor. If script is failing again n again, search for the email on Gmail, manually forward it and then go to Script Editor, File->Project Properties -> Script Properties.  increment CurrentThread to next number and CurrentMessage to 0. 
