const express = require('express');
const app = express();
const port = 3000;

var models = require('./mongoose_models.js');
//var models = require('./json_models.js');
var Project = models.Project;
var Workplace = models.Workplace;

app.use(express.static(__dirname + '/public'));
//app.get('/', (req, res) => {
//  res.send('Hello World!');
//});

app.listen(port, () => console.log(`App listening on port ${port}!`));


Workplace.find({}, (err, res) => {
  for (let i = 0; i < res.length; ++i) {
    console.log(res[i].name);
  }
});

/*app.get('/schemas', (req, res) => {
  res.send({project: projectSchema});
})*/

app.get('/project/', (req, res) => {
  console.log(req.query);
  Project.find(req.query, (err, projectList) => {
    res.send({project: projectList});
  })
});

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

app.get('/workplace/', (req, res) => {
  console.log(req.query);
  Workplace.find({}, (err, workplaceList) => {
    res.send({workplace: workplaceList});
  })
});