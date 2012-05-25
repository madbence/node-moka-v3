function MokaInstance()
{
	var messageQueue;

	return {
		'handle': function(message)
		{

		}
	}
}

exports.MokaInstance=MokaInstance;

process.send({
	'message': 'O HAI'
})