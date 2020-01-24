
exports.seed = function(knex) {
  return knex('projects').del()
    .then(function () {
      return knex('projects').insert([
        {id: 1, name: 'Sprint Challenge', description: 'Lambda Node Database'},
        {id: 2, name: 'Celebrate with Pizza', description: 'Eat delicious pizza'},
        {id: 3, name: 'Wedding Video', description: 'Finish editing wedding video for client'}
      ]);
    });
};
