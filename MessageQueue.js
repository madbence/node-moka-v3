function MessageQueue()
{
	var queues={
		'default': []
	};

	return {
		'add': function(message)
		{
			queues['default'].push(message);
		},
		'tick': function(callback)
		{
			for(var i in queues)
			{
				if(queues[i].length>0)
				{
					callback(queues[i].shift());
				}
			}
		}
	}
}

exports.MessageQueue=MessageQueue;