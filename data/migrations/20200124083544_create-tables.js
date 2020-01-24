
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.string('name',255).notNullable().index();
            tbl.text('description');
            tbl.boolean('completed').defaultTo(false);
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.string('name',255).notNullable().index();
            tbl.text('description');
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.string('description', 255).notNullable();
            tbl.text('notes');
            tbl.boolean('completed').defaultTo(false);
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
  
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
};
