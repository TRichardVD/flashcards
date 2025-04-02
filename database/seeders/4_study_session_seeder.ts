import { BaseSeeder } from '@adonisjs/lucid/seeders'
import StudySession from '#models/study_session'
import { StudySessionFactory } from '#database/factories/study_session_factory'

export default class extends BaseSeeder {
  public async run() {
    await StudySession.createMany([
      {
        user_fk: 1,
        deck_fk: 1,
        correct_count: 3,
        total_count: 5,
        duration_seconds: 120,
      },
      {
        user_fk: 2,
        deck_fk: 3,
        correct_count: 4,
        total_count: 7,
        duration_seconds: 180,
      },
    ])
    await StudySessionFactory.createMany(10)
  }
}
