var MokaInstanceManager=require('./MokaInstanceManager.js').MokaInstanceManager;

function MokaRunner()
{
	var config,
		instanceManager;

	return {
		'setConfig': function(obj)
		{
			config=obj;
		},
		'run': function()
		{
			instanceManager=new MokaInstanceManager();
			instanceManager.boot({
				'host': config.get('connection.host'),
				'port': config.get('connection.port')||6667
			});
		}
	}
}

exports.Runner=MokaRunner;