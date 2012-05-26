var DefaultLogger=require('./Default.js').Logger,
    ConfigManager=require('../ConfigManager.js').ConfigManager,
	loggerList={};

var logLevels={
	'debug': 0x01,
	'info': 0x02,
	'log': 0x04,
	'warn': 0x08,
	'error': 0x10
}

function Logger(logger)
{
	var logHandlers=[],
		config;
	if(logger === undefined)
	{
		logger=new DefaultLogger();
	}
	logHandlers.push(logger);

	function processMessage(type, label, message)
	{
		for(var i in logHandlers)
		{
			if(isLoggingAllowed(type, label))
			{
				logHandlers[i].postMessage(type, label, message);
			}
		}
	}

	function isLoggingAllowed(type, label)
	{
		if(!config)
		{
			return true;
		}
		if(config.get('enabled') === false)
		{
			return false;
		}
		if(logLevels[type]<logLevels[(config.get('level')||'info')])
		{
			return false;
		}
		var bl=config.get('blacklist');
		var wl=config.get('whitelist');
		for(var i in bl)
		{
			if(match(bl[i], label))
			{
				for(var j in wl)
				{
					if(match(wl[j], label))
					{
						return true;
					}
				}
				return false;
			}
			return true;
		}
		return true;
	}

	function match(pattern, label)
	{
		pattern=pattern.split('.');
		label=label.split('.');
		for(var i in pattern)
		{
			if(pattern[i] === '*')
			{
				return true;
			}
			if(pattern[i] !== label[i])
			{
				return false;
			}
		}
	}

	return {
		'setConfig': function(obj)
		{
			config=obj;
		},
		'debug': function(label, message)
		{
			processMessage('debug', label, message);
		},
		'info': function(label, message)
		{
			processMessage('info', label, message);
		},
		'log': function(label, message)
		{
			processMessage('log', label, message);
		},
		'warn': function(label, message)
		{
			processMessage('warn', label, message);
		},
		'error': function(label, message)
		{
			processMessage('error', label, message);
		},
	}
}

function dispatchMessage(type, label, message)
{
	if(message === undefined)
	{
		message=label;
		label='';
	}
	for(var i in loggerList)
	{
		loggerList[i][type](label, message);
	}
}
function debug(label, message)
{
	dispatchMessage('debug', label, message);
}
function info(label, message)
{
	dispatchMessage('info', label, message);
}
function log(label, message)
{
	dispatchMessage('log', label, message);
}
function warn(label, message)
{
	dispatchMessage('warn', label, message);
}
function error(label, message)
{
	dispatchMessage('error', label, message);
}

var def=new Logger(new DefaultLogger());
def.setConfig(ConfigManager.getConfig('logger.default'));
loggerList['default']=def;

exports.debug=debug;
exports.info=info;
exports.log=log;
exports.warn=warn;
exports.error=error;