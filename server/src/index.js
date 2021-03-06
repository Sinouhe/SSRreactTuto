import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from "./client/Routes"; 
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import proxy from 'express-http-proxy';
const morganImport = require ('morgan');



const app = express();
//app.use('/api', proxy('http://127.0.0.1:4201/'));
//app.use(morganImport('dev'));
//req : api/v1/data/depenseFixe/all
//app.use('/', proxy('http://127.0.0.1:4201/'));
//app.use('/api/users', proxy('http://127.0.0.1:4201/api/v1/data/depenseFixe/all'));
//app.use('/api/users', proxy('http://www.google.com'));

app.use('/api',proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
}));
app.use(express.static('public'));
app.get('*', (req, res) => {

  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path).map(({route}) => {
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  }).catch((err) => {
    console.log(err.message);
  });
  
});


app.listen(3000, () => {
  console.log('Listening on prot 3000');
});
