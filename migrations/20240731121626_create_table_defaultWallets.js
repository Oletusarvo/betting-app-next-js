/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_defaultWallets';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.uuid('id').notNullable().unique().primary().defaultTo(knex.fn.uuid());
    tbl
      .uuid('userId')
      .notNullable()
      .unique()
      .references('id')
      .inTable('data_users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .uuid('walletId')
      .notNullable()
      .unique()
      .references('id')
      .inTable('data_wallets')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
