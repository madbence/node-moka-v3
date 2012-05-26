var MokaInstanceManager=require('./MokaInstanceManager.js').MokaInstanceManager;
var MokaConnection=require('./MokaConnection.js').MokaConnection;

function MokaRunner()
{
	var config,
		instanceManager,
		connection;

	return {
		'setConfig': function(obj)
		{
			config=obj;
		},
		'run': function()
		{
			instanceManager=new MokaInstanceManager();
			instanceManager.start();
			connection=new MokaConnection(
				config.get('connection.host'),
				config.get('connection.port'));

			connection.setMessageHandler(function(data)
			{
				instanceManager.sendMessage({
					'type': 'irc',
					'message': data});
			});
			instanceManager.setMessageHandler(function(data)
			{
				connection.sendMessage(data);
			})
		}
	}
}

exports.Runner=MokaRunner;