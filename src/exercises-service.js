'use strict';

const ExercisesService = {
  getAllExercises(knex) {
    return knex.select('*').from('exercises');
  },
  insertExercise(knex, newExercise) {
    console.log(newExercise);
    return knex
      .insert(newExercise)
      .into('exercises')
      .returning('*');
  },
  deleteExercise(knex, id) {
    return knex('exercises')
      .where({ id });
  },
  getById(knex, id) {
    return knex
      .from('exercises')
      .select('*')
      .where('id', id)
      .first();
  },
  getByExercisename(knex, username) {
    return knex
      .from('exercises')
      .select('*')
      .where('username', username)
      .first();
  }
};

module.exports = ExercisesService;