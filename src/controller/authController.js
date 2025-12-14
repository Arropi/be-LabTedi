const {authService, authLoginSevice, authRegisterService} = require("../service/authService")

const authController = async (req, res)=> {
    try {
        const data = req.body
        const login = await authService(data.email, data.username, data.img_url)
        return res.status(login.status).json({
            'message': login.message,
            'token': login.token,
            'role': login.role,
            'lab': login.lab
        })
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}

const authRegisterAndroidController = async (req, res)=> {
    try {
        const data = req.body
        const register = await authRegisterService(data.username, data.nim, data.prodi, data.email, data.password)
        return res.status(201).json({
            'message': 'Register berhasil',
            'data': register
        })
    } catch (error) {
        if (error.cause == 'Bad Request'){
            return res.status(400).json({
                'message': error.message
            })
        }
        return res.status(500).json({
            'message': error.message
        })
    }
}

const authLoginController = async (req, res) => {
    try {
        const data = req.body
        const login = await authLoginSevice(data.email, data.password)
        return res.status(200).json({
            'message': login.message,
            'token': login.token,
            'role': login.role,
            'lab': login.lab,
            'data': login.user
        })
    } catch (error) {
        if (error.cause == 'Bad Request'){
            return res.status(400).json({
                'message': error.message
            })
        } else {
            return res.status(500).json({
                'message': error.message
            })
        }
    }
}

module.exports = {
    authController,
    authRegisterAndroidController,
    authLoginController
}