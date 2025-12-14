require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { capitalize, bigintToNumber } = require('../utils/functions')
const { getUserByEmail, createUser, createAndroidUser } = require('../repository/userRepository')

const authService = async (email, username, img_url)=>{
    try {
        const user = await getUserByEmail(email)
        if (user){
            const id = Number(user.id)
            const token = jwt.sign({id: id, email:user.email, role: user.role, lab_id: Number(user.lab_id)}, process.env.SECRET_TOKEN, {expiresIn: 60 * 60 * 24});
            const role = user.role == 'umum' ? 'Mahasiswa' : capitalize(user.role)
            return {
                'status': 200,
                'message': `Login berhasil dengan email ${user.email}`,
                'token': token,
                'role': role,
                'lab': user.labolatories ? user.labolatories.name : null
            }
        } else {
            const user = await createUser(email, username, img_url)
            const role = user.role == 'umum' ? 'Mahasiswa' : capitalize(user.role)
            const id = Number(user.id)
            const token = jwt.sign({id: id, email: user.email, role: user.role, lab_id: Number(user.lab_id)}, process.env.SECRET_TOKEN, {expiresIn: 60*60*24})
            return {
                'status': 201,
                'message': `Sign up berhasil dengan email ${user.email}`,
                'token': token,
                'role': role,
                'lab': user.labolatories ? user.labolatories.name : null
            }
        }
    } catch (error) {
        throw error
    }
}

const authRegisterService = async (username, nim, prodi, email, password)=>{
    try {
        const user = await getUserByEmail(email)
        if (user){
            throw new Error('User dengan email sudah terdaftar', {cause: 'Bad Request'})
        } else {
            const salt = await bcrypt.genSalt()
            const hashPassword = await bcrypt.hash(password, salt)
            const newUser = await createAndroidUser(username, nim, prodi, email, hashPassword)
            const safeUser = bigintToNumber(newUser)
            return safeUser
        }
    } catch (error) {
        throw error
    }
}

const authLoginSevice = async (email, password)=>{
    try {
        const user = await getUserByEmail(email)
        if (!user){
            throw new Error('User dengan email ini belum terdaftar', {cause: 'Bad Request'})
        } else {
            if (await bcrypt.compare(password, user.password) == false){
                throw new Error('Invalid password', {cause: 'Bad Request'})
            } 
            const id = Number(user.id)
            const token = jwt.sign({id: id, email:user.email, role: user.role, lab_id: Number(user.lab_id)}, process.env.SECRET_TOKEN, {expiresIn: 60 * 60 * 24});
            const role = user.role == 'umum' ? 'Mahasiswa' : capitalize(user.role)
            return {
                'status': 200,
                'message': `Login berhasil dengan email ${user.email}`,
                'token': token,
                'user': {
                    'id': Number(user.id),
                    'nama': user.username,
                    'nim': user.nim,
                    'prodi': user.prodi,
                    'email': user.email,
                },
                'role': role,
                'lab': user.labolatories ? user.labolatories.name : null
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    authService, 
    authRegisterService,
    authLoginSevice
}