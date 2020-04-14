Step 1) Create SNS Topic In SNS Console 
	1.1) Go To SNS Console
	1.2) From Left Navigation Bar Select Topic and Press Create Topic 
        1.3) Name- Your Topic Name
        1.4) Display Name - Your Topic Name
        1.5) Press Topic button Create Topic 
Step 2) Create Lambda Function
	2.1) Go To Lambda Console
        2.2) Press Creat Function
        2.3) Select Author From Scratch
        2.4) Function Name - Your Lambda Function Name
        2.5) Runtime - Select Node.js
        2.6) Press Create Function
	2.7) Paste Code From Lambda/index.js
Step 3) Create Subscription in SNS 
        3.1) Go To SNS Console And Select Subscription
        3.2) Topic ARN - Copy ARN of SNS Topic Created in (Step 1)
        3.3) Protocol - Select Lambda In Protocol
        3.4) EndPoint - Copy ARN Of Lambda Function Created In (Step 2)
Step 4) Create Configuration Sets In  SES
        4.1) Go To SES Console and Select Configuration Sets from navigation bar
        4.2) Press Create Configuration Set
        4.3) Enter Name Of Configuration Set Name
        4.4) Press Configuration Set Button
        4.5) Select Configuration Set You have created and from Action Select Edit
        4.6) Add Destination - Select SNS From Drop-down
        4.7) Popup
              4.7.1) Name - Enter Name you want
              4.7.2) Event Type - Select Events Want to record
              4.7.3) Topic - From Drop-down Select Topic created in (Step 1)
              4.7.4) Press Save
Step 5) Testing
        5.1) From SES Navigation Bar Select Email Addresses/Domain
        5.2) Select One mail 
        5.3) Press Send aTest Email
        5.4) popup 
            5.4.1) Email Format - Select Raw
            5.4.2) From - Sender Email
            5.4.3) To - Reciver Email
	    5.4.5) Message 
	    	In the below message Enter Your Configuration Set Name in header created in (step 4)
		"X-SES-CONFIGURATION-SET: MYCONFIGSETNAME"
		and Enter From And To 
========================================================================================================================================
		X-SES-CONFIGURATION-SET: MYCONFIGSETNAME
		From: SenderEmail@example.com
		To: ReciverEmail@example.com
		Subject: Test email
		Content-Type: multipart/alternative;
		    boundary="----=_boundary"

		------=_boundary
		Content-Type: text/html; charset=UTF-8
		Content-Transfer-Encoding: 7bit

		This is a test email.
		<a href="https://github.com/Anvit26/">Git Hub</a>
		------=_boundary
========================================================================================================================================
		5.4.6) Press Send Mail
		5.5.7) In Lambda Function Go To Monitoring And Press View Logs In CloudWatch To Watch data.
		
