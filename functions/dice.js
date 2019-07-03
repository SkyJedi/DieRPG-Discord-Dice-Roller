const _ = require('lodash');

const generateDiceNumber = sides => _.random(1, sides);

const order = ['good', 'dictator', 'fool', 'foolX', 'foolO', 'foolV', 'emotionKnight','neo','godBinder', 'master', 'bad'];

const dice = {
	good: [1, 2, 3, 4, 5, 6],
	bad: [1, 2, 3, 4, 5, 6],
	fool: [1, 2, 3, 4, 5, 6],
	dictator: [1, 2, 3, 4],
	foolX: ['X', 2, 3, 4, 5, 6],
	foolO: ['O', 2, 3, 4, 5, 6],
	foolV: ['V', 2, 3, 4, 5, 6],
	emotionKnight: [1, 2, 3, 4, 5, 6, 7, 8],
	neo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	godBinder: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	master: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
};

exports.generateDiceNumber = generateDiceNumber;
exports.dice = dice;
exports.order = order;
