//index.js
import './utils/config';

import app from './app';

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Quando não encontrarota entra aqui
app.use( (req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro)
})

app.use( (error, req, res) => {

    res.status( error.status || 500 );
	return res.send({
        erro : {
            messagem : error.message
        }
    });
})

// Listen the server
app.listen(port, host, () => {
    console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
})


let handling = false;

['SIGTERM', 'SIGINT'].forEach((handler) => {
    process.on( handler, () => {
        if(!handling) {
            handling = true;

            console.log('exiting gracefully');
            process.exit(0);
        }
    })
})





