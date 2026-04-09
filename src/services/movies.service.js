const prisma = require("../prisma/prismaClient");

const getAllMovies = async (query) => {
  const { page = 1, limit = 10, sort } = query;

  return prisma.movie.findMany({
    skip: (page - 1) * limit,
    take: Number(limit),
    orderBy: sort ? { [sort]: "asc" } : undefined,
  });
};

const getMovieById = async (id) => {
  const movie = await prisma.movie.findUnique({
    where: { id: Number(id) },
  });

  if (!movie) {
    const error = new Error("Filme não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return movie;
};

const createMovie = async (data) => {
  const { title, releaseYear, directorId } = data;

  if (!title || !directorId) {
    const error = new Error("Campos obrigatórios: title, directorId");
    error.statusCode = 400;
    throw error;
  }

  const director = await prisma.director.findUnique({
    where: { id: Number(directorId) },
  });

  if (!director) {
    const error = new Error("Director não existe");
    error.statusCode = 404;
    throw error;
  }

  return prisma.movie.create({
    data: {
      title,
      releaseYear,
      directorId: Number(directorId),
    },
  });
};

const updateMovie = async (id, data) => {
  const existingMovie = await prisma.movie.findUnique({
    where: { id: Number(id) },
  });

  if (!existingMovie) {
    const error = new Error("Filme não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return prisma.movie.update({
    where: { id: Number(id) },
    data,
  });
};

const deleteMovie = async (id) => {
  const existingMovie = await prisma.movie.findUnique({
    where: { id: Number(id) },
  });

  if (!existingMovie) {
    const error = new Error("Filme não encontrado");
    error.statusCode = 404;
    throw error;
  }

  await prisma.movie.delete({
    where: { id: Number(id) },
  });
};

const searchMovies = async (title) => {
  return prisma.movie.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
};