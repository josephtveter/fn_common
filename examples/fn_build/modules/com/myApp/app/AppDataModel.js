var AppDataModel = function()
{
    var self = this;
    var SystemDetect = require("com.component.SystemDetect")
    this.systemDetect = new SystemDetect();
};
module.exports = AppDataModel;