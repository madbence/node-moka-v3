var DefaultLogger=require('./Default.js').Logger,
	loggerList={};

function Logger(logger)
{
	var logHandlers=[];
	if(logger === undefined)
	{
		logger=new DefaultLogger();
	}
	logHandlers.push(logger);

	function processMessage(type, label, message)
	{
		for(var i in logHandlers)
		{
			logHandlers[i].postMessage('log', label, message);
		}
	}

	return {
		'debug': function(label, message)
		{
			processMessage('log', label, message);
		},
		'info': function(label, message)
		{
			processMessage('log', label, message);
		},
		'log': function(label, message)
		{
			processMessage('log', label, message);
		},
		'warn': function(label, message)
		{
			processMessage('log', label, message);
		},
		'error': function(label, message)
		{
			processMessage('log', label, message);
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

loggerList['default']=new Logger(new DefaultLogger());

exports.debug=debug;
exports.info=info;
exports.log=log;
exports.warn=warn;
exports.error=error;