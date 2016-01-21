var Subscriber = function(params)
{
	this.email = params.email;
	this.firstName = params.firstName || params.firstname;
	this.fromCountryCode = params.fromCountryCode;
	this.languageCode = params.languageCode;
	this.lastName = params.lastName || params.lastname;
	this.username = params.username;
};

module.exports = Subscriber;