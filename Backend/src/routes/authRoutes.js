import { Router } from 'express'
import { login, profile, logout, updateProfile, changePassword } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { loginSchema, updateProfileSchema, changePasswordSchema } from '../validators/auth.validator.js'

const router = Router()

router.post('/login', validate(loginSchema), login)
router.post('/logout', authMiddleware, logout)
router.get('/profile', authMiddleware, profile)
router.put('/profile', authMiddleware, validate(updateProfileSchema), updateProfile)
router.put('/change-password', authMiddleware, validate(changePasswordSchema), changePassword)

export default router