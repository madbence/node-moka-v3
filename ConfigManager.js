var Config=require('./util/Config.js').Config,
	config,
	defaultConfigFile='config.json';

function init()
{
	config=Config.fromFile(defaultConfigFile);
}

var ConfigManager={
	'getConfig': function(name)
	{
		name=name||'';
		if(!config)
		{
			init();
		}
		return config.getConfig(name);
	}
}

exports.ConfigManager=ConfigManager;