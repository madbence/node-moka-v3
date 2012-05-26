exports.registerEventListeners=function(moka)
{
	moka.on('PING', function(message)
	{
		moka.queueMessage('PONG '+message.getParams().substr(1)+'\r\n');
	})
}