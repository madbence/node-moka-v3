var logger=require('./logger/Logger.js');

function CommandParser()
{
	var commands=[];

	function shutdown(code)
	{
		code=code||0;
		logger.log('moka.command', 'Shutting down MokaInstance('+process.pid+')...');
		process.exit(code);
	}

	return {
		'handle': function(message)
		{
			commands.push(message);
			switch(message.command)
			{
				case 'shutdown':
					shutdown(message.code);
					break;
				default:
					logger.warn('Unknown command! '+JSON.stringify(message));
			}
		},
		'getCommands': function()
		{
			return commands;
		}
	}
}

exports.CommandParser=CommandParser;