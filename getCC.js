module.exports = {
	'test': function (event) {
		const data = {};
		const canvas = cc.find('Canvas');

		if (event.reply) event.reply(null, data);
	}
};


