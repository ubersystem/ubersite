import express from 'express';
import path from 'path';

const app = express();

var fs = require('fs'); // this engine requires the fs module

app.engine('tpl', function (filePath, options, callback) { // define the template engine

  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));

    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', ''+ options.title +'')
    .replace('#message#', ''+ options.message +'');
    
    return callback(null, rendered);

  });

});

app.set('views', './src/views'); // specify the views directory
app.set('view engine', 'tpl'); // register the template engine




export default app;
