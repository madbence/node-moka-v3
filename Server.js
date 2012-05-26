var MokaRunner=require('./MokaRunner.js').Runner;
var ConfigManager=require('./ConfigManager.js').ConfigManager;
require('./ExceptionHandler.js');	//catch ALL teh exceptions

var runner=new MokaRunner();
runner.setConfig(ConfigManager.getConfig());
runner.run();