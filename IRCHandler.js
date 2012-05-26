var Message=require('./IRC/Message.js').Message,
	logger=require('./logger/Logger.js');
	IRCCodes={
	'001': 'REPL_WELCOME',
	'375': 'RPL_MOTDSTART',
	'376': 'RPL_ENDOFMOTD'
}

function IRCHandler(mokaInstance)
{
	var history=[],
		moka=mokaInstance;

	return {
		'handle': function(str)
		{
			try
			{
				var message=new Message(str, moka);
				if(IRCCodes[message.getCommand()] !== undefined)
				{
					moka.emit(IRCCodes[message.getCommand()], message);
				}
				else
				{
					moka.emit(message.getCommand(), message);
				}
				var shortParams=message.getParams().length>33?(message.getParams().substr(0, 30)+'...'):message.getParams();
				logger.debug('moka.irc', 'Got command \''+message.getCommand()+'\' (prefix: \''+message.getPrefix()+'\', params: \''+shortParams+'\')');
			}
			catch(e)
			{
				logger.warn('moka.irc', 'Error while handling IRC message: '+e.message);
				throw e;
			}
		}
	}
}

exports.IRCHandler=IRCHandler;