var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PollSchema = new Schema({

PollSchema.methods.votesCount = function(){
	return this.choices.reduce(function(acc, currentVal) {
		return acc + currentVal.votes;
	}, 0);
}
module.exports = mongoose.model('Poll', PollSchema);