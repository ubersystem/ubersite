import jwt from 'jsonwebtoken';
import model from '../../models/userModel';

const login = async function (req, res) {

    const JWT_KEY = process.env.JWT_KEY;
    const JWT_EXPIRE = process.env.JWT_EXPIRE;
    
    const email = req.body.data.login;
    const password = req.body.data.password;

    try {
        const rs = await model.getByField('email', email);
        const user = rs[0];

        if(user && user.password == password){
            let token = jwt.sign({
                id: user.id,
                name: user.first_name,
                email: user.email
            }, 
            JWT_KEY,
            {
                expiresIn: JWT_EXPIRE
            })
        
            res.status(200)
            .json({
                success: true, 
                data: {
                    id: user.id,
                    name: user.first_name,
                    email: user.email
                },
                token
            })
        }else{
            // usuario ou senha incorretos
            res.status(401).json({ success: false, message: `usuario ou senha incorretos` });
        }

    } catch (error) {
        res.status(200).json({ success: false, message: `${error}` });
    }

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