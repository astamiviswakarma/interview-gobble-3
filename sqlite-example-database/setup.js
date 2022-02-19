const sequelize = require('../sequelize');
const { pickRandom, randomDate } = require('./helpers/random');

async function reset() {
	console.log('Will rewrite the SQLite example database, adding some dummy data.');
	
	await sequelize.sync({ force: true });
	
	sequelize.models.user.register('candy', 'cane', function(err, data) {
		if (err) console.log(arguments);
	});
	sequelize.models.user.register('starbuck', 'redeye', function(err, data) {
		if (err) console.log(arguments);
	});
	
	await sequelize.models.city.bulkCreate([
		{ name: 'New Delhi', pincode: '110001' },
		{ name: 'Bangkok', pincode: '10100' },
		{ name: 'Jkarta', pincode: '10110' },
		{ name: 'Singapore', pincode: '199001' },
	]);
	
	await sequelize.models.project.bulkCreate([
		{ name: 'Central Mall, Saket', cityId: 1, inceptionDate: randomDate() },
		{ name: 'Central Mall, Pattaya', cityId: 2, inceptionDate: randomDate() },
		{ name: 'DLF Mega Mall, Gurugram', cityId: 1, inceptionDate: randomDate() },
		{ name: 'ION Orchard, SG', cityId: 4, inceptionDate: randomDate() }
	]);
	
	for (const project of await sequelize.models.project.findAll()) {
		const builder = pickRandom([
			'DLF',
			'Central Group',
			'Excel Partners'
		]);
		
		var obj = await sequelize.models.builder
		.findOne({ where: {name: builder} })

		// update
		if(obj) {
			project.update({builderId: obj.id});
		} else {
			// insert
			project.createBuilder({
				name: builder,
				// userId: pickRandom([1,2])
			})
		}
		
	}
	
	console.log('Done!');
}

reset();
