var PrivateMessage=require('../IRC/PrivateMessage.js').PrivateMessage;

exports.registerEventListeners=function(moka)
{
	moka.on('PRIVMSG', function(message)
	{
		var privMsg=new PrivateMessage(message);
		moka.emit('message', privMsg);
	})
}