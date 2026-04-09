const prisma = require("../prisma/prismaClient");

const getStats = async () => {
  const totalMovies = await prisma.movie.count();
  const totalDirectors = await prisma.director.count();

  const moviesPerDirector = await prisma.director.findMany({
    include: {
      _count: {
        select: { movies: true },
      },
    },
  });

  const average =
    moviesPerDirector.length === 0
      ? 0
      : moviesPerDirector.reduce(
          (acc, d) => acc + d._count.movies,
          0
        ) / moviesPerDirector.length;

  return {
    totalMovies,
    totalDirectors,
    averageMoviesPerDirector: Number(average.toFixed(2)),
  };
};

module.exports = {
  getStats,
};