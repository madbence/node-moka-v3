var Time=require('../util/DateTime.js').DateTime;

function Logger(type, label, message)
{
	var format='Y.M.D H:I:S.U';
	return {
		'postMessage': function(type, label, message)
		{
			console.log('['+Time.format(format)+']['+type+']['+label+'] '+message);
		}
	};
}

exports.Logger=Logger;