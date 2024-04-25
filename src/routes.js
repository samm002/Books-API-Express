const express = require('express');
const controller = require('./controllers');

const app = express();
const router = express.Router();

router.get('/', controller.indexController);
router.get('/books', controller.getAllBooksController);
router.get('/books/:id', controller.getBookByIdController);
router.post('/books', controller.addBookController);
router.put('/books/:id', controller.editBookByIdController);
router.delete('/books/:id', controller.deleteBookByIdController);

module.exports = {
  app,
  router,
};
