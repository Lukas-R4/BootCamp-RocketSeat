const express = require('express');

const server = express();
server.use(express.json());

const projetos = [null, {"id": "1", "title": "teste1", tasks: []}, {"id": "2",
 "title": "teste2", tasks: []}];

 function checkIdExists (req, res, next) {
   const {index} = req.params;
   const project = projetos[index];

   if(!project) {
     return res.status(400).json({ error: 'Does not exists'});
   }

   return next();
 }

 function logRequests (req, res, next) {
  console.count('Número de requisições');

  return next();
}

server.use(logRequests);

server.get('/projects', (req, res) => {
  return res.json(projetos);
});

server.get('/projects/:index', checkIdExists, (req, res) => {
  const {index} = req.params;

  return res.json(projetos[index]);

});

server.post('/projects', (req, res) => {
  const { id, title} = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projetos.push(project);

  return res.json(project);

})

server.put('/projects/:index', (req, res) =>{
  const {index} = req.params;
  const {title} = req.body;

  const project = projetos[index];
  project.title = title;

  return res.json(project);
});


server.post('/projects/:index/tasks', (req, res) => {
  const {index} = req.params;
  const {title} = req.body;

  const project = projetos[index];
  project.tasks.push(title);

  return res.json(project);

});

server.delete('/projects/:index', (req, res) => {
  const {index} = req.params;

  projetos.splice(index,1);
  
  return res.json('Removido!');
});

server.listen(3000);