const passportLocalSequelize = require('passport-local-sequelize');

function applyExtraSetup(sequelize) {
	const { user, project, builder, city } = sequelize.models;

	passportLocalSequelize.attachToUser(user, {
		usernameField: 'username',
		hashField: 'password',
		saltField: 'salt'
	});

	city.hasMany(project);	
	project.belongsTo(city);

	project.hasMany(builder);
	builder.belongsTo(project);

	user.hasMany(builder);
	builder.belongsTo(user);
}

module.exports = { applyExtraSetup };
