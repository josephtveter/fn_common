var Subscriber = function(params)
{
	this.adminRole = params.adminRole; 
	this.cellphone = params.cellphone;
	this.contextId = params.contextId;
	this.currencyCode = params.currencyCode;
	this.email = params.email;
	this.emailHashPrefix = params.emailHashPrefix;
	this.emailSha256Hash = params.emailSha256Hash;
	this.emailVerified = params.emailVerified;
	this.encryptKey = params.encryptKey;
	this.firstName = params.firstName || params.firstname;
	this.fromCountryCode = params.fromCountryCode;
	this.languageCode = params.languageCode;
	this.lastName = params.lastName || params.lastname;
	this.mintRegistrationUrl = params.mintRegistrationUrl;
	this.nickname = params.nickname;
	this.nicknameSet = params.nicknameSet;
	this.passwdSet = params.passwdSet;
	this.phone = params.phone;
	this.photoUrl = params.photoUrl;
	this.playMethod = params.playMethod;
	this.primaryId = params.primaryId;
	this.provisional = params.provisional;
	this.role = params.role;
	this.sessionKey = params.sessionKey;
	this.shipCountryCode = params.shipCountryCode;
	this.subscriberId = params.subscriberId;
	this.userSetUsername = params.userSetUsername;
	this.username = params.username;
};
Subscriber.update = function(target, source)
{
	if(target.adminRole !== source.adminRole)
		target.adminRole = source.adminRole;

	if(target.cellphone !== source.cellphone)
		target.cellphone = source.cellphone;

	if(target.contextId !== source.contextId)
		target.contextId = source.contextId;

	if(target.currencyCode !== source.currencyCode)
		target.currencyCode = source.currencyCode;

	if(target.email !== source.email)
		target.email = source.email;

	if(target.emailHashPrefix !== source.emailHashPrefix)
		target.emailHashPrefix = source.emailHashPrefix;

	if(target.emailSha256Hash !== source.emailSha256Hash)
		target.emailSha256Hash = source.emailSha256Hash;

	if(target.emailVerified !== source.emailVerified)
		target.emailVerified = source.emailVerified;

	if(target.firstName !== source.firstName)
		target.firstName = source.firstName;

	if(target.fromCountryCode !== source.fromCountryCode)
		target.fromCountryCode = source.fromCountryCode;

	if(target.languageCode !== source.languageCode)
		target.languageCode = source.languageCode;

	if(target.lastName !== source.lastName)
		target.lastName = source.lastName;

	if(target.mintRegistrationUrl !== source.mintRegistrationUrl)
		target.mintRegistrationUrl = source.mintRegistrationUrl;

	if(target.nickname !== source.nickname)
		target.nickname = source.nickname;

	if(target.nicknameSet !== source.nicknameSet)
		target.nicknameSet = source.nicknameSet;

	if(target.passwdSet !== source.passwdSet)
		target.passwdSet = source.passwdSet;

	if(target.phone !== source.phone)
		target.phone = source.phone;

	if(target.photoUrl !== source.photoUrl)
		target.photoUrl = source.photoUrl;

	if(target.playMethod !== source.playMethod)
		target.playMethod = source.playMethod;

	if(target.primaryId !== source.primaryId)
		target.primaryId = source.primaryId;

	if(target.provisional !== source.provisional)
		target.provisional = source.provisional;

	if(target.role !== source.role)
		target.role = source.role;

	if(target.sessionKey !== source.sessionKey)
		target.sessionKey = source.sessionKey;

	if(target.shipCountryCode !== source.shipCountryCode)
		target.shipCountryCode = source.shipCountryCode;

	if(target.subscriberId !== source.subscriberId)
		target.subscriberId = source.subscriberId;
	
	if(target.userSetUsername !== source.userSetUsername)
		target.userSetUsername = source.userSetUsername;

	if(target.username !== source.username)
		target.username = source.username;



};

module.exports = Subscriber;
	