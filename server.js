var path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    pasesController = require('./controllers/pasesController.js');

//-------------------------------------------------------------------------
var express        = require('express'),
      app          = express(),
      server       = require('http').createServer(app),
      port         = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT ||8000,
      ip           = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//-------------------------------------------------------------------------

//definicion de carpeta para sitios web
app.use(express.static(__dirname + '/htdocs'));


app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));



app.use(function (req, res, next) {
  next();
});

//End: Server configuration

//Start: Routing

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:8080");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

/*
Devuelve todos los eventos
  Entrada: ninguna
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // Array con la información de todos los eventos
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.get('/api/pases/todos', pasesController.getPases);


/*
Devuelve un único evento
  Entrada: 
        id:     // id del evento que se busca
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: información del evento buscado, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
//app.get('/api/pases/:idPase', pasesController.getPasesPorId);

/*
Agrega un nuevo evento
  Entrada: 
        {
           tipoEvento, // tipo del evento a crear
           nombre,      // nombre del evento
           descripcion // descripción del evento
        }
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: id del evento insertado, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.post('/api/pases/nuevo', pasesController.nuevoPase);

/*
Edita un evento
  Entrada: 
        {
           idEvento,    // id del evento a editar, para ubicar el evento <-- Parámetro
           tipoEvento, // carrera o caminata
           nombre,     // carrera o caminata
           descripcion // descripción del evento
        }
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: null, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.put('/api/pases/editar/:idPase', pasesController.editarPase);

/*
Elimina un evento
  Entrada: 
        {
           idEvento    // id del evento a editar, para ubicar el evento
        }
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: null, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.delete('/api/pases/eliminar/:idPase', pasesController.eliminarPase);

/*
Responde var challege a Slack
  Entrada: 
        {
           "token": "Jhj5dZrVaK7ZwHHjRyZWjbDl", 
           "challenge": "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
           "type": "url_verification"
        }
  Salida: 
        { success   // éxito: true, fracaso: false
           "challenge":"3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P"
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.post('/api/slack/challenge', pasesController.challenge);



//main web site
app.get('/test', function(req, res) {
  res.sendfile('htdocs/index.html', {root: __dirname })
});


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});


app.listen(port);
console.log('Server running on http://%s:%s', ip, port);


module.exports = app ;