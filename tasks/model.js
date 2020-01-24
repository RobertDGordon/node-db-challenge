const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  add,
  addTask,
  update,
  remove,
};

function get() {
  return db('tasks as t')
  .join('projects as p', 'p.id', 't.project_id')
  .select('t.id', 't.description', 't.notes', 't.completed', 't.project_id', 'p.name as project_name', 'p.description as project_description')
}

function getById(id) {
  return db('tasks')
    .where({ id })
    .first();
}

function add(task) {
  return db('tasks')
    .insert(task)
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
  return db('tasks')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('tasks')
    .where('id', id)
    .del();
}