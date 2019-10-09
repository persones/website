var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/website', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var projectSchema = new Schema({
  startDate: Date,
  endDate: Date,
  name: String,
  html: String
});

var Project = mongoose.model('Project', projectSchema);

var workplaceSchema = new Schema({
  name: String,
  city: String,
  state: String,
  country: String,
  startDate: Date,
  endDate: Date
});

var Workplace = mongoose.model('Workplace', workplaceSchema);

module.exports = {
  Project: Project,
  Workplace: Workplace
}