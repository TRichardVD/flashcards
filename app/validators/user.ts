import vine from '@vinejs/vine'
import { table } from 'console'

/**
 * Validator for user registration
 */
export const registerUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(1).unique({ table: 't_users', column: 'username' }),
    email: vine.string().email().trim().toLowerCase().unique({ table: 't_users', column: 'email' }),
    password: vine.string().minLength(8).maxLength(8).confirmed(),
  })
)

/**
 * Validator for user login
 */
export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().toLowerCase(),
    password: vine.string(),
  })
)
