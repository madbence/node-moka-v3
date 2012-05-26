var ConfigManager=require('../ConfigManager.js').ConfigManager,
	config=ConfigManager.getConfig('identity');


exports.registerEventListeners=function(moka)
{
	moka.on('020', function()
	{
		var name=config.get('nick'),
			realName=config.get('realName');
		moka.execute('./Ident.js', 'startServer', name, 113);
		moka.queueMessage('NICK '+name+'\r\n');
		moka.queueMessage('USER '+name+' 8 * :'+realName+'\r\n');
	})
}