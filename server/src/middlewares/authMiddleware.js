import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {

    const JWT_KEY = process.env.JWT_KEY;

    try {

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, JWT_KEY);
        req.usuario = decode;
        next();
        
    } catch (error) {
        res.status(401).json({ success: false, message: 'Falha na autenticação' });
    }
    

};

export default authMiddleware;