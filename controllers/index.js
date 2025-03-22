const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Utility function to validate ObjectId
const isValidObjectId = (id) => ObjectId.isValid(id);

const getAllBooks = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db('project2').collection('books').find();
    const books = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books', details: err.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!isValidObjectId(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }

    const result = await mongodb.getDatabase().db('project2').collection('books').find({ _id: new ObjectId(bookId) });
    const books = await result.toArray();
    if (books.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the book', details: err.message });
  }
};

const getAllGames = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db('project2').collection('games').find();
    const games = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch games', details: err.message });
  }
};

const getSingleGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    if (!isValidObjectId(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID format' });
    }

    const result = await mongodb.getDatabase().db('project2').collection('games').find({ _id: new ObjectId(gameId) });
    const games = await result.toArray();
    if (games.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(games[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the game', details: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, series, author, coverArt, publisher, releaseDate, format } = req.body;

    // Input validation
    if (!title || !author || !publisher || !releaseDate || !format) {
      return res.status(400).json({ error: 'Missing required fields: title, author, publisher, releaseDate, format' });
    }

    const book = { title, series, author, coverArt, publisher, releaseDate, format };
    const response = await mongodb.getDatabase().db('project2').collection('books').insertOne(book);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Book created successfully' });
    } else {
      res.status(500).json({ error: 'Some error occurred while creating the book' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book', details: err.message });
  }
};

const createGame = async (req, res) => {
  try {
    const { title, studio, publisher, releaseDate, composer, genre, platform } = req.body;

    // Input validation
    if (!title || !studio || !publisher || !releaseDate || !genre || !platform) {
      return res.status(400).json({ error: 'Missing required fields: title, studio, publisher, releaseDate, genre, platform' });
    }

    const game = { title, studio, publisher, releaseDate, composer, genre, platform };
    const response = await mongodb.getDatabase().db('project2').collection('games').insertOne(game);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Game created successfully' });
    } else {
      res.status(500).json({ error: 'Some error occurred while creating the game' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to create game', details: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!isValidObjectId(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }

    const { title, series, author, coverArt, publisher, releaseDate, format } = req.body;

    // Input validation
    if (!title || !author || !publisher || !releaseDate || !format) {
      return res.status(400).json({ error: 'Missing required fields: title, author, publisher, releaseDate, format' });
    }

    const book = { title, series, author, coverArt, publisher, releaseDate, format };
    const response = await mongodb.getDatabase().db('project2').collection('books').replaceOne({ _id: new ObjectId(bookId) }, book);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Book updated successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book', details: err.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    if (!isValidObjectId(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID format' });
    }

    const { title, studio, publisher, releaseDate, composer, genre, platform } = req.body;

    // Input validation
    if (!title || !studio || !publisher || !releaseDate || !genre || !platform) {
      return res.status(400).json({ error: 'Missing required fields: title, studio, publisher, releaseDate, genre, platform' });
    }

    const game = { title, studio, publisher, releaseDate, composer, genre, platform };
    const response = await mongodb.getDatabase().db('project2').collection('games').replaceOne({ _id: new ObjectId(gameId) }, game);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Game updated successfully' });
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update game', details: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!isValidObjectId(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }

    const response = await mongodb.getDatabase().db('project2').collection('books').deleteOne({ _id: new ObjectId(bookId) });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book', details: err.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    if (!isValidObjectId(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID format' });
    }

    const response = await mongodb.getDatabase().db('project2').collection('games').deleteOne({ _id: new ObjectId(gameId) });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Game deleted successfully' });
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete game', details: err.message });
  }
};

module.exports = {
  getAllBooks,
  getAllGames,
  getSingleBook,
  getSingleGame,
  createBook,
  createGame,
  updateBook,
  updateGame,
  deleteBook,
  deleteGame
};
