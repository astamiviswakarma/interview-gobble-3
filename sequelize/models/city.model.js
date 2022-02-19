const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('city', {
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
		},
		pincode: {
			allowNull: false,
			type: DataTypes.STRING,
            validate: {
				// We require usernames to have length of at least 5, and
				// only use letters, numbers and underscores.
				is: /^\w{5,}$/
			}
		}
    });
};
