function message(type, params)
{
	return type.toUpperCase()+' '+params.join(' ')+'\r\n';
}

exports.IRC={
	'privmsg': function(options)
	{
		return message('PRIVMSG', [options['target'], ':'+options['message']]);
	}
}