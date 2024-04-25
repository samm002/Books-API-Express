const { nanoid } = require('nanoid');
const books = require('./books');

const addBookService = (name, year, author, summary, publisher, pageCount, readPage) => {
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (readPage === pageCount);
  const isReading = !finished;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading: isReading,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    return {
      status: 'failed',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    };
  }

  if (parseInt(readPage, 10) > parseInt(pageCount, 10)) {
    return {
      status: 'failed',
      message: `Gagal menambahkan buku, readPage(${readPage}) tidak boleh lebih besar dari pageCount(${pageCount})`,
    };
  }

  books.push(newBook);

  return {
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  };
};

const getAllBooksService = (name, reading, finished) => {
  let filteredBooks;
  let message;

  if (name) {
    const nameSearched = name.toLowerCase();
    if (reading) {
      filteredBooks = books.filter((book) => book.name
        .toLowerCase()
        .includes(nameSearched) && book.reading === true);
      message = `Menampilkan semua buku yang sedang dibaca dengan nama ${name} berhasil`;
    } else if (finished) {
      filteredBooks = books.filter((book) => book.name
        .toLowerCase()
        .includes(nameSearched) && book.finished === true);
      message = `Menampilkan semua buku yang selesai dibaca dengan nama ${name} berhasil`;
    } else {
      filteredBooks = books.filter((book) => book.name.toLowerCase().includes(nameSearched));
      message = `Menampilkan semua buku dengan nama ${name} berhasil`;
    }

    if (filteredBooks.length < 1) {
      return {
        status: 'success',
        message: `buku dengan nama ${name} tidak ditemukan`,
      };
    }
    return {
      status: 'success',
      message,
      data: filteredBooks,
    };
  }

  if (reading) {
    const filteredReading = books.filter((book) => book.reading === true);
    return {
      status: 'success',
      message: 'Menampilkan semua buku yang sedang dibaca berhasil',
      data: filteredReading,
    };
  }

  if (finished) {
    const filteredFinished = books.filter((book) => book.finished === true);
    return {
      status: 'success',
      message: 'Menampilkan semua buku yang selesai dibaca berhasil',
      data: filteredFinished,
    };
  }

  return {
    status: 'success',
    message: 'Menampilkan semua buku berhasil',
    data: books,
  };
};

const getBookByIdService = (id) => {
  const book = books.filter((getBook) => getBook.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      message: `Menampilkan buku dengan id ${id} berhasil`,
      data: {
        book,
      },
    };
  }

  return {
    status: 'failed',
    message: `Buku dengan id ${id} tidak ditemukan`,
  };
};

const editBookByIdService = (id, name, year, author, summary, publisher, pageCount, readPage) => {
  const updatedAt = new Date().toISOString();
  const finished = (readPage === pageCount);
  const isReading = !finished;

  if (!name) {
    return {
      status: 'failed',
      message: 'Gagal memperbarui buku, nama buku tidak boleh kosong',
    };
  }

  if (readPage > pageCount) {
    return {
      status: 'failed',
      message: `Gagal memperbarui buku, readPage(${readPage}) tidak boleh lebih besar dari pageCount(${pageCount})`,
    };
  }

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading: isReading,
      updatedAt,
    };

    return {
      status: 'success',
      message: `Buku dengan id ${id} berhasil diperbarui`,
      data: books[index],
    };
  }

  return {
    status: 'failed',
    message: `Gagal memperbarui buku, buku dengan id ${id} tidak ditemukan`,
  };
};

const deleteBookByIdService = (id) => {
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    const deletedBook = books[index];
    books.splice(index, 1);
    return {
      status: 'success',
      message: `Buku dengan id ${id} berhasil dihapus`,
      data: deletedBook,
    };
  }

  return {
    status: 'fail',
    message: `Gagal menghapus buku, buku dengan id ${id} tidak ditemukan`,
  };
};

module.exports = {
  addBookService,
  getAllBooksService,
  getBookByIdService,
  editBookByIdService,
  deleteBookByIdService,
};
