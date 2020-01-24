const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  getTasks,
  add,
  addTask,
  update,
  remove,
};

function get() {
  return db('projects');
}

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

function getTasks(id) {
  return db('tasks as t')
    .join('projects as p', 'p.id', 't.project_id')
    .select('p.name', 't.id as task_id', 't.description', 't.notes')
    .where('t.project_id', id)
    .orderBy('t.id');
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