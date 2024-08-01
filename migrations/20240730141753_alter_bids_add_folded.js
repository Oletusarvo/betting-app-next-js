/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_bids';

exports.up = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.boolean('folded').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.dropColumn('folded');
  });
};
