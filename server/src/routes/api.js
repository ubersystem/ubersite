import express from 'express';

import categoriesController from '../controllers/api/categoriesController';
import logsController from '../controllers/api/logsController';
import mediasController from '../controllers/api/mediasController';
import menusController from '../controllers/api/menusController';
import newslettersController from '../controllers/api/newslettersController';
import permissionsController from '../controllers/api/permissionsController';
import postsController from '../controllers/api/postsController';
import pagesController from '../controllers/api/pagesController';
import settingsController from '../controllers/api/settingsController';
import tagsController from '../controllers/api/tagsController';
import usersController from '../controllers/api/usersController';

var router = express.Router();

router.get('/categories', categoriesController.getAll);
router.get('/categories/:id', categoriesController.getById);
router.post('/categories', categoriesController.insert);
router.put('/categories/:id', categoriesController.update);
router.delete('/categories/:id', categoriesController.remove);

router.get('/logs', logsController.getAll);
router.get('/logs/:id', logsController.getById);
router.post('/logs', logsController.insert);
router.put('/logs/:id', logsController.update);
router.delete('/logs/:id', logsController.remove);


router.get('/medias', mediasController.getAll);
router.get('/medias/:id', mediasController.getById);
router.post('/medias', mediasController.insert);
router.put('/medias/:id', mediasController.update);
router.delete('/medias/:id', mediasController.remove);

router.get('/menus', menusController.getAll);
router.get('/menus/:id', menusController.getById);
router.post('/menus', menusController.insert);
router.put('/menus/:id', menusController.update);
router.delete('/menus/:id', menusController.remove);


router.get('/newsletters', newslettersController.getAll);
router.get('/newsletters/:id', newslettersController.getById);
router.post('/newsletters', newslettersController.insert);
router.put('/newsletters/:id', newslettersController.update);
router.delete('/newsletters/:id', newslettersController.remove);

router.get('/permissions', permissionsController.getAll);
router.get('/permissions/:id', permissionsController.getById);
router.post('/permissions', permissionsController.insert);
router.put('/permissions/:id', permissionsController.update);
router.delete('/permissions/:id', permissionsController.remove);


router.get('/posts', postsController.getAll);
router.get('/posts/:id', postsController.getById);
router.post('/posts', postsController.insert);
router.put('/posts/:id', postsController.update);
router.delete('/posts/:id', postsController.remove);

router.get('/pages', pagesController.getAll);
router.get('/pages/:id', pagesController.getById);
router.post('/pages', pagesController.insert);
router.put('/pages/:id', pagesController.update);
router.delete('/pages/:id', pagesController.remove);

router.get('/settings', settingsController.getAll);
router.get('/settings/:id', settingsController.getById);
router.post('/settings', settingsController.insert);
router.put('/settings/:id', settingsController.update);
router.delete('/settings/:id', settingsController.remove);


router.get('/tags', tagsController.getAll);
router.get('/tags/:id', tagsController.getById);
router.post('/tags', tagsController.insert);
router.put('/tags/:id', tagsController.update);
router.delete('/tags/:id', tagsController.remove);

router.get('/users', usersController.getAll);
router.get('/users/:id', usersController.getById);
router.post('/users', usersController.insert);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.remove);

export default router;