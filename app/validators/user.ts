import vine from '@vinejs/vine'

/**
 * Validator for user registration
 */
export const registerUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().nullable(),
    email: vine.string().email().trim().toLowerCase(),
    password: vine.string().minLength(8).confirmed(),
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

/**
 * Validator for updating user profile
 */
export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().nullable(),
    email: vine.string().email().trim().toLowerCase().optional(),
  })
)

/**
 * Validator for password change
 */
export const passwordChangeValidator = vine.compile(
  vine.object({
    currentPassword: vine.string(),
    password: vine.string().minLength(8).confirmed(),
  })
)
