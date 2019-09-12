const express = require('express');
const app = express();
const port = 3000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/website', { useNewUrlParser: true });
var Schema = mongoose.Schema;

app.use(express.static('public'));
//app.get('/', (req, res) => {
//  res.send('Hello World!');
//});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var projectSchema = new Schema({
  startDate: Date,
  endDate: Date,
  name: String,
  html: String
});

var workplaceSchema = new Schema({
  name: String,
  city: String,
  state: String,
  country: String
});


var Project = mongoose.model('Project', projectSchema);
var Workplace = mongoose.model('Workplace', workplaceSchema);
Project.find({}, (err, res) => {
  for (let i = 0; i < res.length; ++i) {
    console.log(res[i].name);
  }
});

app.get('/schemas', (req, res) => {
  res.send({project: projectSchema});
})

app.get('/project/:projectName', (req, res) => {
  console.log(`looking for project ${req.params.projectName}`);
  Project.findOne({name: req.params.projectName}, (err, project) => {
    if (project) {
      res.send(project);
    } else {
      res.send({err: 'no project found'});
    }
  });
});
