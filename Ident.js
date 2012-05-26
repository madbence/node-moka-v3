var net=require('net');
var server=null;
var logger=require('./logger/Logger.js');

function Ident(name, port, autoClose)
{
	autoClose=autoClose||true;
	var server=net.createServer(function(socket)
	{
		logger.debug('core.ident', 'Incoming request.');
		socket.on('data', function(data)
		{
			data=data.toString().replace('\r\n', '');
			logger.log('core.ident', 'Request: '+data);
			socket.write(data+' : USERID : '+name+'\r\n');
		});
		socket.on('end', function()
		{
			if(autoClose)
			{
				logger.info('core.ident', 'Closing IdentServer on port '+port+' for user \''+name+'\'...');
				server.close();
			}
		})
		
	})
	server.on('close', function()
	{
		logger.log('core.ident', 'IdentServer on port '+port+' for user \''+name+'\' is closed.');
		server=null;
	})
	server.listen(port, function()
	{
		logger.log('core.ident', 'IdentServer on port '+port+' for user \''+name+'\' is listening.');
	});
	if(autoClose)
	{
		setTimeout(function()
		{
			if(server !== null)
			{
				logger.log('core.ident', 'Shutting down IdentServer (timeout)...');
				server.close();
			}
		}, 5000);
	}
}

function startServer(name, port)
{
	if(server !== null)
	{
		logger.warn('core.ident', 'IdentServer already running!');
		return;
	}
	server=new Ident(name, port, true);
}

exports.startServer=startServer;