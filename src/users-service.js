'use strict';

const UsersService = {
  getAllUsers(knex) {
    return knex.select('*').from('users');
  },
  insertUser(knex, newUser) {
    console.log('USER-SERVICE: INSERT USER');
    console.log(newUser);
    return knex
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(rows => rows[0]);
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
    const user = knex
      .from('users')
      .select('*')
      .where('username', username)
      .first()
      .then(res => {
        console.log(res);
        return res;
      });
    return user;
  }
};

module.exports = UsersService;

// psql -U mromero -d workouts -f ./seeds/seed.users.sql