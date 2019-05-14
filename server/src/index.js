import express from 'express';
import renderer from './helpers/renderer'

const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));


app.get('/',(req,res) => {
  res.send(renderer());
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});