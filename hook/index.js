'use strict';

var gith = require('gith').create(9001)
  , nodemailer = require('nodemailer')
  , config = require('./config.json');

// sendmail
function sendmail(mailconf, body, cb) {

	// Gmail SMTP transport layer
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: mailconf.user,
	        pass: mailconf.pass
	    }
	});

	// mail options
	var mailOptions = {
	    from: mailconf.from,
	    to: mailconf.to,
	    subject: 'Repo Deployed ✔',
	    text: 'payload: ' + String(new Date()),
	    html: '<p><strong>payload: </strong>'+String(new Date())+'</p><br><br>',
	    attachments: [
	        {
	            filename: 'payload.json',
	            content: JSON.stringify(body)
	        }
        ]
	};

	// send mail with transport
	transporter.sendMail(mailOptions, cb);

}

// add tag:add handler
gith().on('all', function(payload) {
	console.log('github:webhook payload received', new Date());
	sendmail(config.mail, payload, function(err, info) {
		if(err) {
			console.log('mail not sent', err);
		} else {
			console.log('mail sent', info);
		}
	});
});
