const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
};

function get() {
  return db('resources');
}

function getById(id) {
  return db('resources')
    .where({ id })
    .first();
}

function add(resource) {
  return db('resources')
    .insert(resource)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(changes, id) {
  return db('resources')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('resources')
    .where('id', id)
    .del();
}