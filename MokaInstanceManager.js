var fork=require('child_process').fork;
var logger=require('./logger/Logger.js');
var fs=require('fs');

function MokaInstanceManager()
{
	var start=new Date(),
		lastStart=new Date(),
		first=true,
		process=null,
		config,
		messageHandler=function(){};

	fs.watch('.', function(event, file)
	{
		filesChanged(event, file);
	});
	fs.watch('./plugin', function(event, file)
	{
		filesChanged(event, file);
	});

	function filesChanged(event, file)
	{
		logger.log('core.manager', 'File \''+file+'\' changed ('+event+').');
		instance.start();
	}

	var instance={
		'start': function()
		{
			var that=this;
			if(lastStart.getTime()+10*1000 > new Date().getTime() && !first)
			{
				logger.info('core.manager', 'Waiting before restart...');
				setTimeout(function()
				{
					if(process === null)
					{
						that.start();
					}
				}, 10000);
				return;
			}
			first=false;
			lastStart=new Date();
			if(process !== null)
			{
				logger.info('core.manager', 'Shutting down prevorious instance...');
				process.removeAllListeners('exit');
				process.kill();
			}
			logger.log('core.manager', 'Launching a new MokaInstance...');
			process=fork('./MokaInstance.js');
			process.on('message', function(message)
			{
				logger.debug('core.manager', 'MokaInstance sent a message: '+JSON.stringify(message));
				if(message.type === 'irc')
				{
					messageHandler(message.message);
				}
				else if(message.type === 'command')
				{
					logger.info('core.manager', 'Executing '+message.callback+'('+message.params.join(', ')+') in module \''+message.module+'\'.');
					require(message.module)[message.callback].apply(null, message.params);
				}
			});
			process.on('exit', function(code, signal)
			{
				logger.log('core.manager', 'MokaInstance exiting. Code='+code+', SIGNAL='+signal);
				process=null;
				that.start();
			});
		},
		'setMessageHandler': function(handler)
		{
			messageHandler=handler;
		},
		'sendMessage': function(message)
		{
			if(process === null)
			{
				logger.warn('core.manager', 'MokaInstance is not running!');
				return;
			}
			process.send(message);
		}
	};

	return instance;
}

exports.MokaInstanceManager=MokaInstanceManager;