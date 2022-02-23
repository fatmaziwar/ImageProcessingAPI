//Router module
//List of imported Modules
import express from 'express';
import { resizeImg } from './api/resizeImg';

const routes = express.Router();
//API/
routes.get('/', (req, res) => {
  res.send('Main api Route.');
});

//Endpoint API/resizeImg
routes.use('/resizeImg', resizeImg);

//Exporting Module
export default routes;
