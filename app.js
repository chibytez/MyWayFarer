import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';


import routes from './server/routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



routes(app);
app.listen(port);

console.log('info', `App is listening on port ${port}`);

export default app;
