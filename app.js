import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerdoc from './swagger';
import swaggerUi from 'swagger-ui-express';


import routes from './server/routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerdoc));



routes(app);
app.listen(port);

console.log('info', `App is listening on port ${port}`);

export default app;
