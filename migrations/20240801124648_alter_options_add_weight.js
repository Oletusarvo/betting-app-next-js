/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_gamePositions';

exports.up = function (knex) {
  return knex.schema.alterTable(table, tbl => tbl.integer('weight').defaultTo(100));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(table, tbl => tbl.dropColumn('weight'));
};
