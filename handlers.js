const knownCommands = require('./functions/index');
const commandPrefix = require('./config').prefix;
const version = require('./package').version;


// Called every time a message comes in:
const onMessage = (msg, client) => {
	if (msg.author.bot) return; // Ignore messages from the bot
	let params = [], commandName, flags;

	// This isn't a command since it has no prefix:
	if (!msg.content.includes(commandPrefix)) return;

	//create commandName and strip out everything before.
	if (msg.content.startsWith(commandPrefix)) params = msg.content.substr(1).split(' ');
	else params = msg.content.split(commandPrefix)[1].split(' ');
	commandName = params[0].toLowerCase();
	params = params.splice(1);
	//remove flags from params
	flags = params.filter(a => a.startsWith('-')).map(flag => flag.slice(1));


	switch (commandName) {
		case 'v':
		case 'ver':
			commandName = 'version';
			break;
		case 'h':
			commandName = 'help';
			break;
		case 'p':
			commandName = 'poly';
			break;
		case 'r':
			commandName = 'roll';
			break;
		default:
			break;
	}

	// If the command is known, let's execute it:
	if (commandName in knownCommands) {
		console.log(`${msg.author.username}, ${commandName}, ${params}, ${flags}, ${new Date()}`);
		knownCommands[commandName](msg, params, flags, client);
	}

};

// Called every time the bot connects to Twitch chat:
const onReady = client => {
	console.log(`Logged in as ${client.user.username}!`);
	console.log(`Version: ${version}`);
};

exports.onMessage = onMessage;
exports.onReady = onReady;
