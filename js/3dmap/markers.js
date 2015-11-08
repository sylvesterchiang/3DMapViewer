var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var geomarkerSchema = new Schema({
	lat: Number, 
	lng: Number, 
	radius: Number
});

var Marker = mongoose.model('Marker', geomarkerSchema);

module.exports = Marker;