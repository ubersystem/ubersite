import express from 'express';import helmet from 'helmet';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import packageJson from '../package.json';
import engine from './ubs/view_engine';

import authMiddleware from './middlewares/authMiddleware';

import PostsController from "./controllers/site/postsController";
import TagsController from "./controllers/site/tagsController";
import CategoriesController from "./controllers/site/categoriesController";
import SearchController from "./controllers/site/searchController";

// Routes
//import auth from './routes/auth';
import api from './routes/api';

const app = express();

engine(app);

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true, type:['x-www-form-urlencoded','application/x-www-form-urlencoded', 'text/html','text/x-www-form-urlencoded'] }));
app.use(bodyParser.json({limit: '1mb'}));

// tratamento de CORS
app.use( (req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With,Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})   
const postsController = new PostsController();
const tagsController = new TagsController();
const categoriesController = new CategoriesController();
const searchController = new SearchController();

/** Posts **/
app.get("/posts", postsController.posts);
app.get("/post/:ano/:mes/:dia/:slug", postsController.post);

/** Tags **/
app.get("/tags", tagsController.tags);
app.get("/tag/:slug", tagsController.tag);

/** Category **/
app.get("/categories", categoriesController.categories);
app.get("/category/:slug", categoriesController.category);

/** Search **/
app.get("/search/:slug", searchController.search);


//app.use('/auth', auth);
app.use('/api', authMiddleware, api);


app.get('/cms', (req, res) => {
  res.status(200).json({ nome: 'cms'})
})


app.get('/:slug', (req, res) => {
  let slug = req.params.slug || '';
  res.status(200).json({ slug})
})




// Serve Vue.js as SPA in production
if (process.env.NODE_ENV === 'production') {

  app.use(express.static('dist'))

  app.get('/', (req, res, next) => {
      res.sendFile('index.html', {'root': path.join(__dirname, '../dist')})
  })

  app.get('/*', (req, res, next) => {
    res.sendFile('index.html', {'root': path.join(__dirname, '../dist')})
  })

} else {
  app.get('/', function (req, res) {
      res.render('pagina1', { title: 'Hey', message: 'Server Online :)'});
  });
}
export default app;