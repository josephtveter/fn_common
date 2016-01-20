var WaitScreenController = function(navModel)
{
	var ko = require("ko");
	var self = this;
	self.init(navModel);
	this.message = ko.observable();
	this.message2 = ko.observable();
	this.setViewData = function(data)
	{
		data = data || {};
		if(typeof(data.message) === "function")
        {
            data.message = data.message();
        }
        if(typeof(data.message2) === "function")
        {
            data.message2 = data.message2();
        }
		if(data.message)
		{
			self.message(data.message);
		}
		else
		{
			var loading = self.getString("wait.loading");
			self.message(loading());
		}
		if(data && data.message2)
		{
			self.message2(data.message2);
		}
		else
		{
			self.message2("");
		}
	};
};
module.exports = WaitScreenController;
//# sourceURL=/modules/com/vote/ui/controller/WaitScreenController.js