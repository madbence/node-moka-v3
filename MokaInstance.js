var logger=require('./logger/Logger.js');
require('./ExceptionHandler.js');	//catch ALL teh exceptions
var fs=require('fs');
var CommandParser=require('./CommandParser.js').CommandParser;
var IRCHandler=require('./IRCHandler.js').IRCHandler;
var MessageQueue=require('./MessageQueue.js').MessageQueue;

logger.log('moka.process', 'MokaInstance('+process.pid+') started!');
var moka=new MokaInstance();
process.on('message', function(message)
{
	moka.handle(message);
});
setInterval(function()
{
	moka.tick(function(message)
	{
		process.send({
			'type': 'irc',
			'message': message.toString()
		});
	});
}, 2000);

function MokaInstance()
{
	var messageQueue=new MessageQueue(),
		commandHandler=new CommandParser(),
		modules=[],
		eventListeners=[];

	logger.info('moka.plugin', 'Loading plugins...');
	fs.readdir('./plugin/', function(err, files)
	{
		if(err)
		{
			logger.error('moka.plugin', 'Error while loading plugins: '+err.toString());
			return;
		}
		for(var i in files)
		{
			logger.info('moka.plugin', 'Loading plugin \''+files[i]+'\'...');
			var module=require('./plugin/'+files[i]);
			if(module.registerEventListeners)
			{
				module.registerEventListeners(instance);
			}
			if(module.commands)
			{
				for(var j in module.commands)
				{
					instance.on('command.'+j, module.commands[j].callback);
				}
			}
		}
	}) 
	var instance={
		'handle': function(message)
		{
			var that=this;
			switch(message.type)
			{
				case 'irc':
					message=message.message.split('\r\n').slice(0, message.message.split('\r\n').length-1);
					for(var i in message)
					{
						ircHandler.handle(message[i]+'\r\n', that);
					}
					break;
				case 'command':
					commandHandler.handle(message.command);
					break;
				default:
					logger.warn('moka.process', 'Unknown message: '+JSON.stringify(message));
			}
		},
		'on': function(label, callback)
		{
			logger.info('moka.event', 'Registering listener on event \''+label+'\'');
			if(eventListeners[label] === undefined)
			{
				eventListeners[label]=[];
			}
			eventListeners[label].push(callback);
		},
		'emit': function(label)
		{
			logger.debug('moka.event', 'Emitting \''+label+'\' ('+(arguments.length-1)+' arguments)');
			for(var i in eventListeners[label])
			{
				eventListeners[label][i].apply(null, Array.prototype.slice.call(arguments, 1));
			}
		},
		'execute': function(module, func)
		{
			process.send({
				'type': 'command',
				'module': module,
				'callback': func,
				'params': Array.prototype.slice.call(arguments, 2)
			});
		},
		'queueMessage': function(message)
		{
			messageQueue.add(message);
		},
		'tick': function(callback)
		{
			messageQueue.tick(callback);
		}
	};

	var ircHandler=new IRCHandler(instance);
	return instance;
}

exports.MokaInstance=MokaInstance;