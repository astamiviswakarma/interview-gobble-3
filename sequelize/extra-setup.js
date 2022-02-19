const passportLocalSequelize = require('passport-local-sequelize');

function applyExtraSetup(sequelize) {
	const { user } = sequelize.models;

	passportLocalSequelize.attachToUser(user, {
		usernameField: 'username',
		hashField: 'password',
		saltField: 'salt'
	});
	// const { instrument, orchestra } = sequelize.models;

	// orchestra.hasMany(instrument);
	// instrument.belongsTo(orchestra);
}

module.exports = { applyExtraSetup };
