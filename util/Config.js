var fs=require('fs');

function Config(obj)
{
	var config=obj;

	return {
		'get': function(name)
		{
			var path=name.split('.');
			var item=config;
			for(var i=0;i<path.length;i++)
			{
				item=item[path[i]];
				if(item === undefined)
				{
					throw new Error('Value \''+name+'\' not found (\''+path[i]+'\')');
				}
			}
			return item;
		},
		'getConfig': function(name)
		{
			return new Config(this.get(name));
		}
	}
}

Config.fromFile=function(file)
{
	try
	{
		var data=fs.readFileSync(file, 'utf-8');
		return new Config(JSON.parse(data));
	}
	catch(e)
	{
		throw new Error('Config file \''+file+'\' is not valid: '+e.message);
	}
}

Config.load=function()
{
	return Config.fromFile('config.json');
}

exports.Config=Config;