'use strict';

var aws = require('aws-sdk');
var ses = new aws.SES({region: 'ap-south-1'});

exports.handler = (event, context, callback) => {
    
    var data = JSON.parse(JSON.stringify(event.Records));
    console.log(JSON.stringify(data));
     
     var item = data[0];
     var sns = item.Sns;
     var senderMail =sns.Message ;
     console.log(senderMail);
     var obj = JSON.parse(senderMail);
     var smail = obj.mail.source;
     console.log(smail);
    
     var params = {
        Destination: {
            ToAddresses: [smail]                                                //Reciver Mail-id
        },
        Message: {
            Body: {
                Text: { Data: JSON.stringify(obj) }                             //message body
                },
            
            Subject: { Data: "Mail Bounce" }
        },
        Source: "dev1@electromech.info"                                         //sender Mail-id
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
};
