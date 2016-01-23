# Script to Forward Old Email in Gmail via Google Script API 
#Disclaimer: 
Developed in stressful times and script comes with no guarantees

Very recently, my father passed away on 23rd december 2015. While overcoming the shock of his demise, came the request of his organization that he had some official emails on his gmail account. There was no built in functionality in Gmail that we could bulk forward old emails to a particular account. There might be plugins available but they are PAID. Secondly,i was not getting enough freedom that i wanted from the plugin so thought of writing my own code. Google API might give intermittent errors like "Invalid MIME Type" or "Exception Occured while delivering a message" without mentioning exact Exception.

During this stressful time, I looked at a few examples. I admit here that I have never coded in GoogleScript before. This was a few mins effort to send old emails in my father's inbox to an email account of a relevant person in his organization.

# Things to do before running the script.
1. Create a filter based on a search criteria for old emails that you want to forward. Assign it a label.
2. If you think, new incoming emails might add more threads to the said label then Create a new filter for it and assign it a new label / fwd it to any email address that you want. Just make sure that THREAD COUNT for Step 1 LABEL, DOES NOT CHANGE. This is REQUIREMENT because Google only allows to Forward 100 Messages / day.
3. Open up a Google sheet, add two columns , GmailLabel . AutoForwardEmail  and then put the label and email address in the file (see example image Forward_Old_Email at https://goo.gl/photos/5FyZP8RA58TxpXJKA ) 
4. In Google Sheet, Go to Tools -> Script Editor  ; Copy paste the script FwdOldMailInGmail script 
5. In Script Editor, go to File -> Project Properties-> Script Properties. Set four (4) variables. 
CurrentMessage (set to 0) 
BatchSize (set to 100, this is the max number of emails that Gmail allows to send in one day) 
CurrentThread (set to 0, this shows what is the current thread script is on) 
TotalThreadsSent (set to 0, this number will be set by script to let you know how many threads were actually sent by Script)
6. As there is a total limit of 100 messages / day, you might want to add a trigger that can run everyday by going to Script Editor in Google sheet. Resources -> Current Project's triggers -> Add a new trigger. Make sure the name of the function is correct and Event is Time-Driven -> DayTimer -> Select time 
 [if one thread has 100 messages, then one thread will be sent, else above variables will keep count where you stand and will resume from there next day when trigger runs the function]

7. Edit Line #9 with your Google sheet link
8. If you want your own search criteria, comment Line #40 and uncomment Line #41 and define your search criteria there.


# CAUTION
Script might fail because of API issues (Invalid MIME type error, Exception occured etc). During that scenario, you can check Script properties (ScriptEditor: File->Project Properties -> Script Properties) to see what is the CurrentThread and CurrentMessage. Also you can see the error message by going to View -> Logs in Script Editor. If script is failing again n again, search for the email on Gmail, manually forward it and then go to Script Editor, File->Project Properties -> Script Properties.  increment CurrentThread to next number and CurrentMessage to 0 and Re-Run Script. 

SCRIPT will be NO-OP once 100 Messages are sent for the day. If you have PREMIUM account, you can update batch size from Script Properties.
