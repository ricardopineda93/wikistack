const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
// const layout = require('./views/layout');
const models = require('./models');
const wikiRouter = require('./routes/wiki');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + './public'));
app.use('/wiki', wikiRouter);

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

const init = async () => {
  await models.db.sync({ force: false });
};

init();

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
