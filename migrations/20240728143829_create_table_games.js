/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_games';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.uuid('id').notNullable().unique().primary().defaultTo(knex.fn.uuid());
    tbl.uuid('authorId').notNullable().references('id').inTable('data_users').onUpdate('CASCADE');
    tbl
      .uuid('currencyId')
      .notNullable()
      .references('id')
      .inTable('data_currencies')
      .onUpdate('CASCADE');

    tbl.string('title').notNullable();
    tbl.string('description');

    tbl.bigint('minBid').defaultTo(1);
    tbl.bigint('maxBid');
    tbl.bigint('minRaise');
    tbl.bigint('maxRaise');
    tbl.bigint('createdAt');
    tbl.bigint('expiresAt');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
