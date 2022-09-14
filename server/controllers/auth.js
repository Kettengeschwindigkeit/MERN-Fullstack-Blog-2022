import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.json({
                message: 'This username is already using'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash
        })

        const token = jwt.sign(
            {
                id: newUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        await newUser.save()

        res.json({
            newUser,
            message: 'Registering successful'
        })

    } catch (error) {
        res.json({ message: 'User create error' })
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) {
            return res.json({
                message: 'This username doesn\'t exist...'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Password is wrong'
            })
        }

        res.json({
            token, user, message: 'Welcome!'
        })

    } catch (error) {
        res.json({ message: 'Authorization error' })
    }
}

// Get Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'This username doesn\'t exist...'
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.json({
            user, token
        })
    } catch (error) {
        res.json({ message: 'No access' })
    }
}
