const movieService = require("../services/movies.service");

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await movieService.getAllMovies(req.query);
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const movie = await movieService.updateMovie(
      req.params.id,
      req.body
    );
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    await movieService.deleteMovie(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const searchMovies = async (req, res, next) => {
  try {
    const movies = await movieService.searchMovies(req.query.title);
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
};