exports.commands={
	'uptime': {
		'description': '',
		'callback': function(command)
		{
			command.getOriginal().reply(process.uptime()+'s');
		}
	}
};