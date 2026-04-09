const directorService = require("../services/director.service");

const getAllDirectors = async (req, res, next) => {
  try {
    const directors = await directorService.getAllDirectors();
    res.status(200).json(directors);
  } catch (error) {
    next(error);
  }
};

const getDirectorById = async (req, res, next) => {
  try {
    const director = await directorService.getDirectorById(req.params.id);
    res.status(200).json(director);
  } catch (error) {
    next(error);
  }
};

const createDirector = async (req, res, next) => {
  try {
    const director = await directorService.createDirector(req.body);
    res.status(201).json(director);
  } catch (error) {
    next(error);
  }
};

const updateDirector = async (req, res, next) => {
  try {
    const director = await directorService.updateDirector(
      req.params.id,
      req.body
    );
    res.status(200).json(director);
  } catch (error) {
    next(error);
  }
};

const deleteDirector = async (req, res, next) => {
  try {
    await directorService.deleteDirector(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getMoviesByDirectorId = async (req, res, next) => {
  try {
    const movies = await directorService.getMoviesByDirectorId(
      req.params.id
    );
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
  getMoviesByDirectorId,
};