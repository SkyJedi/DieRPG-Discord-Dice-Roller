const main = require('../index');
const Discord = require('discord.js');
const prefix = require('../config').prefix;

const help = ({ message, params }) => {
	const embed = new Discord.RichEmbed()
		.setTitle('Help')
		.setColor('2D7C2F');
	switch (params[0]) {
		case 'polyhedral':
		case 'poly':
		case 'p':
			embed.setTitle('**Polyhedral Roll Help**')
				.addField(`${prefix}poly`, 'Rolls any combination of polyhedral dice with modifier.')
				.addField(`Examples`, `\`\`\`${prefix}poly 1d4 2d6+1 1d100-60\`\`\``);
			break;
		case 'roll':
		case 'r':
			embed.setTitle('**Roll Help**')
				.setDescription(`*${prefix}roll diceIdentifiers "text"*`)
				.addField(
					`diceIdentifiers`,
					`**g/good** = good d6 dice
					**b/bad** = BAD d6 dice
					**d/dictator** = Dictator d4 dice
					**x/foolX** = Fool's 'X' d6 dice
					**o/foolO** = Fool's 'O' d6 dice
					**v/foolV** = Fool's 'V' d6 dice
					**e/emotion/emotionknight** = Emotion Knights's d8 dice
					**n/neo** = Neo's d10 dice
					**r/gb/godbinder** = Godbinder's d12 dice
					**m/master** = Master's d20 dice
					`)
				.addField('Examples',
					`\`\`\`${prefix}roll gggbe\`\`\` (must use single character identifiers)
    				\`\`\`${prefix}roll 3g 1b 1gb\`\`\` (must specify a number before each identifier)`);
			break;
		default:
			embed
				.addField(`${prefix}roll`, 'rolls any combination of dice.')
				.addField(`${prefix}poly`, 'rolls any combination of polyhedral dice.')
				.addField(`${prefix}invite`, 'Get the invite link.')
				.addField(`${prefix}version`, 'Get the version number of current bot.')
				.addField('Bot Information', '[SkyJedi\'s Bot Emporium](https://discord.gg/G8au6FH)')
				.addField('Other Info', '[DieRPG](https://diecomic.com/rpg)');
			break;
	}
	main.sendMessage(message, {embed});
};

module.exports = help;
