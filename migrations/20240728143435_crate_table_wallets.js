/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_wallets';

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
      .uuid('currencyId')
      .notNullable()
      .references('id')
      .inTable('data_currencies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.bigint('balance').defaultTo(0);
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
