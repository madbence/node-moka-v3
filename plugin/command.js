var ConfigManager=require('../ConfigManager.js').ConfigManager,
	config=ConfigManager.getConfig('command');

exports.registerEventListeners=function(moka)
{
	moka.on('message', function(message)
	{
		var match=message.getText().match(new RegExp(config.get('prefix')+'(.*?)( (.*?))?$'));
		if(match !== null)
		{
			if(config.get('usePermissions') === true)
			{
				//...
			}
			var name=match[match.length-3];
			var params=(match[match.length-1]||'').split(' ');
			var command=new Command(message, name, params);
			moka.emit('command.'+command.getName(), command);
		}
	})
}

function Command(original, command, params)
{
	return {
		'getOriginal': function()
		{
			return original;
		},
		'getName': function()
		{
			return command;
		},
		'getParams': function()
		{
			return params;
		},
		'getOpt': function(name)
		{
			name=name.charAt(0)==='-'?name:('-'+name);
			for(var i in params)
			{
				if(params[i] === name)
				{
					return params[i+1];
				}
			}
		}
	}
}