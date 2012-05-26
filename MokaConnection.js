var net=require('net');
var logger=require('./logger/Logger.js');

function MokaConnection(host, port)
{
	var handler,
		messageHandler=function(){};

	handler=net.connect(port, host, function()
	{
		logger.info('core.connection', 'TCP/IP connection to \''+host+'\' on port '+port+' is ready.');
	});
	handler.on('end', function()
	{
		logger.info('core.connection', 'TCP/IP connection to \''+host+'\' on port '+port+' closed.');
	});
	handler.on('error', function(e)
	{
		logger.warn('core.connection', 'Error in TCP/IP connection to \''+host+'\' on port '+port+'. '+e.code);
	});
	handler.on('data', function(data)
	{
		data=data.toString();
		var shortData=(data.length>103?(data.substr(0,100)+'...'):data).replace('\n', '').replace('\r', '');
		logger.debug('core.connection.message', shortData);
		messageHandler(data);
	})

	return {
		'disconnect': function(hard)
		{

		},
		'setMessageHandler': function(callback)
		{
			messageHandler=callback;
		},
		'sendMessage': function(message)
		{
			message=message.toString();
			var shortMessage=(message.length>103?(message.substr(0,100)+'...'):message).replace('\r\n', '');
			logger.debug('core.connection.sendMessage', 'Sending message \''+shortMessage+'\'...');
			handler.write(message.toString(), 'utf-8', function()
			{
				logger.debug('core.connection.sendMessage', 'Message \''+shortMessage+'\' sent.');
			});
		}
	}
}

exports.MokaConnection=MokaConnection;