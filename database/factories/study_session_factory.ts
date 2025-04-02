import Factory from '@ioc:Adonis/Lucid/Factory'
import StudySession from '#models/study_session'

export const StudySessionFactory = Factory.define(StudySession, ({ faker }) => {
  return {
    user_fk: faker.number.int({ min: 1, max: 10 }),
    deck_fk: faker.number.int({ min: 1, max: 3 }),
    correct_count: faker.number.int({ min: 0, max: 20 }),
    total_count: faker.number.int({ min: 1, max: 20 }),
    duration_seconds: faker.number.int({ min: 30, max: 300 }),
  }
}).build()
