const prisma = require("../prisma/prismaClient");

const getAllDirectors = async () => {
  return prisma.director.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

const getDirectorById = async (id) => {
  const director = await prisma.director.findUnique({
    where: { id: Number(id) },
    include: {
      movies: true,
    },
  });

  if (!director) {
    const error = new Error("Director não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return director;
};

const createDirector = async (data) => {
  const { name, birthYear } = data;

  if (!name) {
    const error = new Error("O campo 'name' é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  return prisma.director.create({
    data: {
      name,
      birthYear,
    },
  });
};

const updateDirector = async (id, data) => {
  const { name, birthYear } = data;

  const existingDirector = await prisma.director.findUnique({
    where: { id: Number(id) },
  });

  if (!existingDirector) {
    const error = new Error("Director não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (!name) {
    const error = new Error("O campo 'name' é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  return prisma.director.update({
    where: { id: Number(id) },
    data: {
      name,
      birthYear,
    },
  });
};

const deleteDirector = async (id) => {
  const existingDirector = await prisma.director.findUnique({
    where: { id: Number(id) },
    include: {
      movies: true,
    },
  });

  if (!existingDirector) {
    const error = new Error("Director não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (existingDirector.movies.length > 0) {
    const error = new Error("Não é possível apagar um director com filmes associados");
    error.statusCode = 409;
    throw error;
  }

  await prisma.director.delete({
    where: { id: Number(id) },
  });
};

const getMoviesByDirectorId = async (id) => {
  const director = await prisma.director.findUnique({
    where: { id: Number(id) },
  });

  if (!director) {
    const error = new Error("Director não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return prisma.movie.findMany({
    where: { directorId: Number(id) },
    orderBy: {
      title: "asc",
    },
  });
};

module.exports = {
  getAllDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
  getMoviesByDirectorId,
};