import jwt from 'jsonwebtoken';

const login = async function (req, res) {

    const JWT_KEY = process.env.JWT_KEY;
    
    let token = jwt.sign({
        user_id: 30,
        name: 'Juliano Carneiro',
        email: req.body.email
    }, 
    JWT_KEY,
    {
        expiresIn: "6h"
    })

    res.status(200)
    .json({
        success: true, 
        token,
        dados: {
            email: req.body.email,
            password: req.body.password
        }, 
        message: 'Order encontrado login'
    })
}

const logout = async function (req, res) {
    res.status(200)
    .json({
        success: true, 
        dados: {
            'teste': '0'
        }, 
        message: 'Order encontrado logout'
    })
}

const teste = async function (req, res) {
    res.status(200)
    .json({
        message: 'Logado'
    })
}

export default {
    login,
    logout,
    teste
}