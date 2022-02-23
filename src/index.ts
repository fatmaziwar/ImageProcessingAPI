//List of imported Modules
import express from 'express';
import routes from './routes/index';
import sharp from 'sharp';
import logger from './utilities/logger';
import path from 'path';
//creating Server
const app = express();
//Port
const port = 3000;
//On API Level
app.use(logger);
//Router
app.use('/api', routes);
//Images full size folder Endpoint
app.use('/images', express.static('images'));
//API Domain root redirects to the Application Homepage
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./default.html'));
});
//All other not defined routes gives Page Not Found
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
//Exporting current Module
export default app;
