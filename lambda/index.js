'use strict';

const AWS = require('aws-sdk');                                                 

const ses = new AWS.SES();         

exports.handler = async (event , context) => {
    
    var data = JSON.parse(JSON.stringify(event.Records));
    console.log(JSON.stringify(data));
     var item = data[0];
     var sns = item.Sns;
     console.log(sns);
     
     var SENDER = 'dev1@electromech.info';                                          


        /*for (const record of event.Records) {
        console.log('Received event:', event);
        const sernderMail = record.dynamodb.Keys.userId.S;
        console.log(sernderMail);
        }*/
    var senderMail =sns.Message ;
    console.log(senderMail);
    var obj = JSON.parse(senderMail);
    var obj2 = obj.mail.source;
    console.log(obj2);
    //console.log(obj.mail.source);
    //console.log(obj.bounce);
        sendEmail(sns, function (err, data) {
            context.done(err, null);
        });
        

function sendEmail (obj2, done) {
    
      var obj1 = obj2;
      console.log(`${JSON.stringify(obj1)}`);
      var smail = JSON.stringify(obj1.mail.Source);
      
    var params = {
        Destination: {
            ToAddresses: [
                smail,
            ]
        },
        Message: {
            Body: {
                Text: {
                       Data: JSON.stringify(obj2) ,
                        Charset: 'UTF-8' 
                }
            },
            Subject: {
                Data:  'Email Bounse',
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
}
     
};
