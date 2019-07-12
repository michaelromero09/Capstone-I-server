'use strict';

const UsersService = {
  getAllUsers(knex) {
    return knex.select('*').from('users');
  },
  insertUser(knex, newUser) {
    console.log(newUser);
    return knex
      .insert(newUser)
      .into('users')
      .returning('*');
  },
  deleteUser(knex, id) {
    return knex('users')
      .where({ id })
      .delete();
  },
  getById(knex, id) {
    return knex
      .from('users')
      .select('*')
      .where('id', id)
      .first();
  },
  getByUsername(knex, username) {
    return knex
      .from('users')
      .select('*')
      .where('username', username)
      .first();
  }
};

module.exports = UsersService;

// psql -U mromero -d workouts -f ./seeds/seed.users.sql