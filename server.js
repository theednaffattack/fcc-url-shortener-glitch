// server.js

// init project
const atob = require('atob');
const bodyParser = require('body-parser');
const btoa = require('btoa');
const chalk = require('chalk');
const express = require('express');
const mongoose = require('mongoose');

const { log } = console;

const { Url } = require('./models/Url');

const app = express();


const connectionString = process.env.MONGO_ATLAS_CONNECTION_STRING;

const port = process.env.PORT || 8080;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});


app.post('/api/getShortLink', (req, res, next) => {
  // const { hash } = req.body;
  console.log('hash');
  console.log(req.body);
  // const id = atob(hash);
  // let shortLink = {hash: baseId, }
  // TODO: add the host data
  res.send(req.body);
});

app.get('/:hash', (req, res) => {
  const baseId = req.params.hash;
  const id = atob(baseId);
  URL.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      res.redirect(doc.url);
    } else {
      res.redirect('/');
    }
  });
});
// app.listen(port, () => console.log(`Listening on port ${objCatcher[Object.keys(objCatcher)[0]]}/${port}!`));

app.post('/shorten', (req, res, next) => {
  console.log('Inside post req.body.url');
  console.log(req.body);
  const urlData = req.body.uri;
  URL.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log('entry found in db');
      console.log({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: 'OK'
      });
      res.send({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: 'OK'
      });
    } else {
      console.log('entry NOT found in db, saving new');
      const stringUrl = urlData.toString();
      const url = new URL({
        url: stringUrl
      });
      url.save(() => {
        // Use any CSS color name

        // crayon('#ffcc00').log('old gold');

        // Compose multiple styles using the chainable API
        // log(chalk.grey.bgGreen.bold('FROM SAVE'));

        log(
          chalk
            .bgHex('#89CFF0')
            .hex('#36454F')
            .bold('\n      FROM SAVE    \n')
        );
        console.log('url._id');
        console.log(url._id);
        console.log('btoa');
        console.log(btoa(url._id));
        if (err) console.error(err);
        res.send({
          url: urlData,
          hash: btoa(url._id),
          status: 200,
          statusTxt: 'OK'
        });
      });
    }
  });
});

// ROUTES

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
