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
      res.json(project);
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