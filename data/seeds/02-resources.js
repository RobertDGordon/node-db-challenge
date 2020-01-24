
exports.seed = function(knex) {
  return knex('resources').truncate()
    .then(function () {
      return knex('resources').insert([
        {id: 1, name: 'Computer', description:'One of my favorite things in the whole world', project_id: 1},
        {id: 2, name: 'Internet Connection', description:'Another favorite thing', project_id: 1},
        {id: 3, name: 'Wake up early', description:'Not my favorite thing', project_id: 1},
        {id: 4, name: 'Appetite', description:'I never say no to pizza', project_id: 2},
        {id: 5, name: 'Editing software', description:'Buggy software that needs to be programmed better', project_id: 3},
        {id: 6, name: 'Time', description:'Need to set aside time to finish this project', project_id: 3},
      ]);
    });
};
