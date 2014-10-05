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
	    text: body,
	    html: body
	};

	// send mail with transport
	transporter.sendMail(mailOptions, cb);

}

// add tag:add handler
gith({
	repo: config.repo.shurl,
	branch: 'master'
}).on('tag:add', function(payload) {
	console.log('github:webhook tag was added');
	sendmail(config.mail, payload, function(err, info) {
		if(err) {
			console.log('mail not sent', err);
		} else {
			console.log('mail sent', info);
		}
	});
});
