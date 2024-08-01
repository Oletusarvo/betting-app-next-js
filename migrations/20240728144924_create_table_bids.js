/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_bids';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.uuid('id').notNullable().unique().primary().defaultTo(knex.fn.uuid());
    tbl
      .uuid('userId')
      .notNullable()
      .references('id')
      .inTable('data_users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .uuid('gameId')
      .notNullable()
      .references('id')
      .inTable('data_games')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .uuid('positionId')
      .notNullable()
      .references('id')
      .inTable('data_gamePositions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.bigint('amount').notNullable();
    tbl.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
