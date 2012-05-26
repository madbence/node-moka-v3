function Message(str, moka)
{
	var prefix,
		command,
		params,
		match=str.match(/(:(.*?) )?(.*?) (.*?)\r\n$/),
		shortStr=str.length>63?(str.substr(0,60)+'...'):shortStr;
	if(match === null)
	{
		throw new Error('Message \''+shortStr+'\' is not valid.');
	}

	prefix=match[2];
	command=match[3];
	params=match[4];
	return {
		'getPrefix': function()
		{
			return prefix;
		},
		'getCommand': function()
		{
			return command;
		},
		'getParams': function()
		{
			return params;
		},
		'getMoka': function()
		{
			return moka;
		},
		'toString': function()
		{
			return str.replace('\r', '').replace('\n', '');
		}
	}
}

exports.Message=Message;