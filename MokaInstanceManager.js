var fork=require('child_process').fork;
var logger=require('./logger/Logger.js');

function MokaInstanceManager()
{
	var start=new Date(),
		process=null,
		config,
		message;


	return {
		'boot': function()
		{
			if(process !== null)
			{
				logger.info('core.manager', 'Shutting down prevorious instance...');
				process.kill();
			}
			logger.log('core.manager', 'Launching a new MokaInstance...');
			process=fork('./MokaInstance.js');
			process.on('message', function(message)
			{
				logger.debug('core.manager', 'MokaInstance sent a message: '+JSON.stringify(message));
			});
		}
	}
}

exports.MokaInstanceManager=MokaInstanceManager;