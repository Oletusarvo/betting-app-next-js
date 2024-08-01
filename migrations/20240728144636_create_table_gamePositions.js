/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_gamePositions';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.uuid('id').notNullable().unique().primary().defaultTo(knex.fn.uuid());
    tbl
      .uuid('gameId')
      .notNullable()
      .references('id')
      .inTable('data_games')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('value');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
