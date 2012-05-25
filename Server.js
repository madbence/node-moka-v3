var MokaRunner=require('./MokaRunner.js').Runner;
var Config=require('./util/Config.js').Config;
require('./ExceptionHandler.js');	//catch ALL teh exceptions

var runner=new MokaRunner();
runner.setConfig(Config.load());
runner.run();