const service = require('./services');

const indexController = (req, res) => {
  try {
    res.status(200).send('<h1>Books API ready!</h1>');
  } catch (error) {
    res.status(500).send(`<h1>Error</h1> <h2>Detail : ${error} </h2>`);
  }
};

const addBookController = (req, res) => {
  try {
    const {
      name, year, author, summary, publisher, pageCount, readPage,
    } = req.body;

    const newBook = service.addBookService(name, year, author, summary, publisher, pageCount, readPage);
    if (!newBook.data) {
      res.status(400).json(newBook);
    } else {
      res.status(200).json(newBook);
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getAllBooksController = (req, res) => {
  const { name, reading, finished } = req.query;
  try {
    const books = service.getAllBooksService(name, reading, finished);
    if (!books.data) {
      res.status(404).json(books);
    } else {
      res.status(200).json(books);
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getBookByIdController = (req, res) => {
  try {
    const { id } = req.params;
    const book = service.getBookByIdService(id);

    if (!book.data) {
      res.status(404).json(book);
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const editBookByIdController = (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, year, author, summary, publisher, pageCount, readPage,
    } = req.body;

    const editedBook = service.editBookByIdService(id, name, year, author, summary, publisher, pageCount, readPage);

    if (!editedBook.data) {
      if (editedBook.message.includes('id')) {
        res.status(404).json(editedBook);
      } else {
        res.status(400).json(editedBook);
      }
    } else {
      res.status(200).json(editedBook);
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const deleteBookByIdController = (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = service.deleteBookByIdService(id);

    if (!deletedBook) {
      res.status(404).json(deletedBook);
    } else {
      res.status(200).json(deletedBook);
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  indexController,
  addBookController,
  getAllBooksController,
  getBookByIdController,
  editBookByIdController,
  deleteBookByIdController,
};
