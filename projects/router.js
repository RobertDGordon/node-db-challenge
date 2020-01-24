const express = require('express');

const Projects = require('./model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
  .then(Projects => {
    res.json(Projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Projects' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Projects.getById(id)
  .then(project => {
    if (project) {
      Projects.getTasksById(id) //If project id is found, get tasks by id
      .then(task => {
          Projects.getResourcesById(id) //Then get resources by id
          .then(resource => {
            let addTasks = []
            let addResources = []
            if (task.length) {
              addTasks = task  //If tasks exist, set addTasks
            }
            if (resource.length) {
              addResources = resource //If resources exist, set addResources
            }
            res.json({...project[0], tasks: addTasks, resources: addResources}); //Spread project[selecting id to remove from returned array], then add tasks, and resources
          })
          .catch(err => {
            res.status(500).json({ message: 'Failed at nested resource' });
          });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed at nested tasks' });
      });
    } else {
      res.status(404).json({ message: 'Could not get project with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Projects' });
  });
});

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;

  Projects.getTasks(id)
  .then(task => {
    if (task.length) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Could not get task for given project' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get task' });
  });
});

router.get('/:id/resources', (req, res) => {
  const { id } = req.params;

  Projects.getResources(id)
  .then(resource => {
    if (resource.length) {
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Could not get resource for given project' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resource' });
  });
});

router.post('/', (req, res) => {
  const projectData = req.body;

  Projects.add(projectData)
  .then(project => {
    res.status(201).json(project);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

router.post('/:id/tasks', (req, res) => {
  const taskData = req.body;
  const { id } = req.params; 

  Projects.getById(id)
  .then(project => {
    if (project) {
      Projects.addTask(taskData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not get project with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.getById(id)
  .then(project => {
    if (project) {
      Projects.update(changes, id)
      .then(updatedproject => {
        res.json(updatedproject);
      });
    } else {
      res.status(404).json({ message: 'Could not get project with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update project' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not get project with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete project' });
  });
});

module.exports = router;