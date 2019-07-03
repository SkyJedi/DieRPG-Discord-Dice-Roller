const config = require('../config');
const generateDiceNumber = require('./dice').generateDiceNumber;
const dice = require('./dice').dice;
const order = require('./dice').order;
const sendMessage = require('../');
const _ = require('lodash');

const roll = (message, params, flags, client) => {
	let rolls = {};
	if (!params[0]) {
		message.reply('No dice rolled.');
		return;
	}
	//process each identifier and set it into an array
	let diceOrder = processType(message, params);
	if (!diceOrder) return;
	if (diceOrder.length === 0) {
		message.reply('No dice rolled.');
		return;
	}

	//rolls each die and begins rollResults
	diceOrder.forEach(die => {
		if (die === 'bad') rolls.bad = rollDice(die);
		else rolls[die] = [...Array(diceOrder.filter(x => x === die).length)].map(() => rollDice(die))
	});

	//counts the symbols rolled
	const results = countSymbols(rolls, message);
	printResults(results, rolls, message);
};

//processes the params and give an array of the type of dice to roll
const processType = (message, params) => {
	if (0 >= params.length) {
		message.reply('No dice rolled.');
		return false;
	}
	if (params.some(param => +(param).replace(/\D/g, "") > +config.maxRollsPerDie)) {
		message.reply('Roll exceeds max roll per die limit of ' + config.maxRollsPerDie + ' . Please try again.');
		return false;
	}

	const diceOrder = (params) => {
		if (params[0].match(/\d+/g)) {
			return _.flatten(params.map(param => {
				const diceQty = +(param).replace(/\D/g, ""), color = param.replace(/\d/g, "");
				return [...Array(diceQty)].map(() => color);
			}));
		} else return params.join('').split('').map(type => type);
	};

	return diceOrder(params).map(die => {
		switch (die) {
			case 'good':
			case 'g':
				return 'good';
			case 'bad':
			case 'b':
				return 'bad';
			case 'fool':
			case 'f':
				return 'fool';
			case 'x':
				return 'foolX';
			case 'o':
				return 'foolO';
			case 'v':
				return 'foolV';
			case 'neo':
			case 'n':
				return 'neo';
			case 'dictator':
			case 'd':
				return 'dictator';
			case 'master':
			case 'm':
				return 'master';
			case 'godbinder':
			case 'gb':
			case 'r':
				return 'godBinder';
			case 'emotion':
			case 'emotionknight':
			case 'e':
				return 'emotionKnight';
			default:
				return;
		}
	}).filter(Boolean).sort();
};

//rolls one die and returns the results in an array
const rollDice = (type) => {
	//roll dice and match them to a side and add that face to the message
	if (!type) return;
	return generateDiceNumber(Object.keys(dice[type]).length);
};

function countSymbols(roll) {
	let results = {
		success: 0,
		special: 0
	};
	Object.keys(roll).forEach(type => {
		if (type === 'bad') {
			if (roll.bad > 3) results.success--;
		} else {
			roll[type].forEach(number => {
				// noinspection FallThroughInSwitchStatementJS
				switch (number) {
					case 20:
					case 19:
					case 18:
					case 17:
					case 16:
					case 15:
					case 14:
					case 13:
					case 12:
					case 11:
					case 10:
					case 9:
					case 8:
					case 7:
					case 6:
					case 'X':
					case 'O':
					case 'V':
						results.special++;
					case 5:
					case 4:
						results.success++;
						break;
					case 1:
						results.criticalFail = true;
					default:
						break;
				}
			});
		}
	});
	return results;
}

const printResults = (results, rolls, message) => {
	let final = '';
	Object.keys(rolls).sort((a, b) => order.indexOf(a) - order.indexOf(b)).forEach(type => {
		if (type !== 'bad') final += `${_.startCase(type)}: ( ${rolls[type].map(number => dice[type][number - 1]).join(', ')} )\n`;
		else final += `Bad: ( ${rolls.bad} )\n`;
	});

	if (rolls.dictator) {
		let success = rolls.dictator, modifier = results.success;
		if (rolls.bad>3) modifier>0 ? modifier-- : success--;
		final += `${success} Success. Can be modified by ${modifier}.`;
	}
	else final += `${results.success} Success.`;

	if (results.special) final += ` ${results.special} Special.`;
	if (0 >= results.success && results.criticalFail) final += ' **Critical Failure!**';

	sendMessage.sendMessage(message, final)

};

exports.roll = roll;
exports.processType = processType;
exports.rollDice = rollDice;
exports.countSymbols = countSymbols;
exports.printResults = printResults;

