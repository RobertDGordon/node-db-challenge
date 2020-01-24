
exports.seed = function(knex) {
  return knex('tasks').del()
    .then(function () {
      return knex('tasks').insert([
        {id: 1, description: 'Setup project', notes:'Commit regularly', completed:true, project_id: 1},
        {id: 2, description: 'Meet MVP', notes:'Can be done quickly', project_id: 1},
        {id: 3, description: 'Stretch goals', notes:'Yay!', project_id: 1},
        {id: 4, description: 'Decide what toppings', notes:'So many toppings, so little time...', project_id: 2},
        {id: 5, description: 'Organize video clips', notes:'This takes forever', project_id: 3},
        {id: 6, description: 'Choose songs', notes:'Make sure the client likes the songs', project_id: 3},
      ]);
    });
};
