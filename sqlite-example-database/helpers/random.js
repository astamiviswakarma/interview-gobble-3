function pickRandom(args) {
	return args[Math.floor(Math.random() * args.length)];
}

function randomDate() {
	return new Date(new Date() - 200000000000 * Math.random());
}

function upsert(Model, values, condition) {
    return Model
        .findOne({ where: condition })
        .then(function(obj) {
            // update
            if(obj)
                return obj.update(values);
            // insert
            return Model.create(values);
        })
}

module.exports = { pickRandom, randomDate };
