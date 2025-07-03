import express from 'express';
import routes from './routes';

const app = express();
app.use(routes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});