var logger=require('./logger/Logger.js');

process.on('uncaughtException', function(e)
{
	var stack=e.stack;
	logger.log('UNCAUGHT EXCEPTION!');
	if(stack === undefined)
	{
		return;
	}
	var lines=stack.split('\n');
	for(var i in lines)
	{
		logger.log(lines[i]);
	}
})