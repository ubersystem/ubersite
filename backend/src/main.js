//index.js
import './utils/config';
import path from 'path';

import app from './app';

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Serve Vue.js as SPA in production
if (process.env.NODE_ENV === 'production') {

    app.use(express.static('dist'))

    app.get('/', (req, res, next) => {
        res.sendFile('index.html', {'root': path.join(__dirname, '../dist')})
    })

    app.get('/*', (req, res, next) => {
      res.sendFile('index.html', {'root': path.join(__dirname, '../dist')})
    })

} else {
    app.get('/', function (req, res) {
        res.render('pagina1', { title: 'Hey', message: 'Server Online :)'});
    });
}

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





