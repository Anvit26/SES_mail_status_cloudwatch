/* For Bounce Mail Add IAM Policy to Send Mail*/
'use strict';

var aws = require('aws-sdk');
var ses = new aws.SES({region: '##-#####-#'});    //Change Region (E.g. ({region: 'ap-south-1'});)

exports.handler = (event, context, callback) => {
    
    var data = JSON.parse(JSON.stringify(event.Records));
    console.log(JSON.stringify(data));
     
     var item = data[0];
     var sns = item.Sns;
     var message = JSON.parse(sns.Message);
     console.log(message);
     var eventType = message.eventType;
     
     if (eventType == 'Bounce'){
             var senderMail =sns.Message ;
             console.log(senderMail);
             var obj = JSON.parse(senderMail);
             var smail = obj.mail.source;
             console.log(smail);
             var replyTo = obj.mail.commonHeaders;
             var ReplyToMail = replyTo.replyTo;
             console.log(ReplyToMail);
     
             var params = {
                Destination: {
                    ToAddresses: ReplyToMail
                },
                Message: {
                    Body: {
                        Text: { Data: JSON.stringify(obj) } 
                        },
                    
                    Subject: { Data: "Mail Bounce" }
                },
                Source: "#######"     //Add Email           
            };
            
             ses.sendEmail(params, function (err, data) {
                callback(null, {err: err, data: data});
                if (err) {
                    console.log(err);
                    context.fail(err);
                } else {      
                    console.log(data);
                    context.succeed(event);
                }
            });
     }else{
         console.log(JSON.stringify(eventType));
     }
     
};
