const mongoose = require('../../../database');

const CitySchema = mongoose.Schema({

    state: {
        type: String,
        require: true,
    },
    cityList: [],

});

const City = mongoose.model('city', CitySchema);

module.exports = City;