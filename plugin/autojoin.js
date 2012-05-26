var ConfigManager=require('../ConfigManager.js').ConfigManager,
	config=ConfigManager.getConfig('plugins.autojoin'),
	joinList=config.get('channels'),
	logger=require('../logger/Logger.js');

exports.registerEventListeners=function(moka)
{
	moka.on('RPL_ENDOFMOTD', function()
	{
		logger.info('moka.plugin.autojoin', 'Autojoining '+joinList.join(', ')+'.');
		moka.queueMessage('JOIN '+joinList.join(',')+'\r\n');
	})
}