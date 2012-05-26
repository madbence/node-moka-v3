var DateTime=
{
	'format': function(format, dateTime)
	{
		var date=dateTime === undefined ? new Date() : dateTime,
			year=date.getFullYear(),
			month=date.getMonth()+1,
			month2=(month>9?'':'0')+month,
			day=date.getDate(),
			day2=(day>9?'':'0')+day,
			hours=date.getHours(),
			hours2=(hours>9?'':'0')+hours,
			minutes=date.getMinutes(),
			minutes2=(minutes>9?'':'0')+minutes,
			seconds=date.getSeconds(),
			seconds2=(seconds>9?'':'0')+seconds,
			millis=date.getMilliseconds(),
			millis2=(millis>9?(millis>99?'':'0'):'00')+millis;
		return format.
			replace('Y', year).
			replace('m', month).
			replace('M', month2).
			replace('d', day).
			replace('D', day2).
			replace('h', hours).
			replace('H', hours2).
			replace('i', minutes).
			replace('I', minutes2).
			replace('s', seconds).
			replace('S', seconds2).
			replace('u', millis).
			replace('U', millis2);
	}
}

exports.DateTime=DateTime;