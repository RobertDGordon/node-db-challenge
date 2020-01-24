const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  getTasksById,
  getResourcesById,
  getTasks,
  getResources,
  add,
  addTask,
  update,
  remove,
};

function get() {
  return db('projects');
}

// function getById(id) {
//   return id

// }

function getById(id) {
  return db('projects as p')
    .select('*')
    .where('p.id', id)
    // .innerJoin(
    //   db('tasks as t')
    //   .select('*')
    //   .where('t.project_id', id)
    //   .as('tak')
    //   )

}

function getTasksById(id) {
  return db('tasks as t')
    .where('t.project_id', id)
}

function getResourcesById(id) {
  return db('resources as r')
    .where('r.project_id', id)
}

function getTasks(id) {
  return db('tasks as t')
    .join('projects as p', 'p.id', 't.project_id')
    .select('p.name as project_name', 't.id as task_id', 't.description', 't.notes', 't.completed')
    .where('t.project_id', id)
    .orderBy('t.id');
}

function getResources(id) {
  return db('resources as r')
    .join('projects as p', 'p.id', 'r.project_id')
    .select('p.name as project_name', 'r.id as resource_id', 'r.name', 'r.description')
    .where('r.project_id', id)
    .orderBy('r.id');
}

function add(project) {
  return db('projects')
    .insert(project)
    .then(ids => {
      return getById(ids[0]);
    });
}

function addTask(taskData, id) {
    const newTask = {...taskData, project_id: id}
    return db('tasks')
      .insert(newTask)
      .then(() => {
          return getTasks(id)});
  }

function update(changes, id) {
  return db('projects')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('projects')
    .where('id', id)
    .del();
}