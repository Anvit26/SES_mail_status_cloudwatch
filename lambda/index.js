/*THE FOLLOWING SERVER-LESS FUNCTION USES AWS SES API TO SEND MAIL TO RECIVER FATCHED FROM EVENT,
FUNCTION WILL TRIGERED BY AWS SNS NOTIFICATION. LAMBDA FUNCTION LOG THE EVENTS IN CLOUD WATCH LOGS.
FOR EXECUTION OF FUNCTION PLEASE ATTACH IAM ROLES WITH SES AND CLOUD WATCH LOGS PERMISSION TO THE 
LAMBDA FUNCTION. MAKE CHANGES IN REGION AND SOURCE OF MAIL, IF NOT REQUIRED DELETE EVENT LOGS TO
CLOUD WATCH*/

'use strict';

var aws = require('aws-sdk');
var ses = new aws.SES({region: 'ap-south-1'});                  //CHANGE REGION

exports.handler = (event, context, callback) => {
    
    var data = JSON.parse(JSON.stringify(event.Records));
    console.log(JSON.stringify(data));
     
     var item = data[0];
     var sns = item.Sns;
     var senderMail =sns.Message ;
     console.log(senderMail);
     var obj = JSON.parse(senderMail);
     var smail = obj.mail.source;                           //MAIL ID OF SENDER   
     console.log(smail);
     var replyTo = obj.mail.headers[3];
     var ReplyToMail = replyTo.value;                       //MAIL ID FOR REPLYTO
     console.log(ReplyToMail);
     
     var params = {                                         //PARAMS FOR SES
        Destination: {
            ToAddresses: [ReplyToMail]                      //TO ADDRESS FOR SES
        },
        Message: {
            Body: {
                Text: { Data: JSON.stringify(obj) }         //MESSAGE BODY 
                },
            
            Subject: { Data: "Mail Bounce" }
        },
        Source: "dev1@electromech.info"                     //CHANGE THE SOURCE ID
    };
    
     ses.sendEmail(params, function (err, data) {           //SES SENDEMAIL FUNCTION TO SEND MAIL
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err);
        } else {      
            console.log(data);
            context.succeed(event);
        }
    });
};
