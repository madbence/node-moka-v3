var net=require('net');

function MokaConnection(host, port, callback, disconnect)
{
	var handle,
		callback=callback||function(){},
		disconnect=disconnect||function(){};

	handle=net.connect(port, host, callback)
	handle.on('end', disconnect);

	return {
		'disconnect': function(hard)
		{

		},
		'addDataListener': function(listener)
		{
			handle.on('data', listener);
		},
	}
}

var c=new MokaConnection('irc6.atw.hu', 6667);
c.addDataListener(function(chunk)
{
	console.log(chunk.toString());
})