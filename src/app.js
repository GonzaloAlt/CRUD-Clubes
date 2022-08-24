require('dotenv').config();
const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');

const {initClub} = require('./module/club/clubModule');
const DIconfig = require('./config/di')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

const port = process.env.PORT || 3000;

const DIContainer = DIconfig(app);
initClub(app, DIContainer)

app.use(DIContainer.get('session'))

// Resuelve los templates del path
nunjucks.configure('src/module', {
    autoescape: true,
    express: app
});


app.get('/', (req, res) => {
  res.render(path.resolve(__dirname, '../src/module/views/parent' + '.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})