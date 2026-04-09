const express = require("express");
const router = express.Router();

const {
  getAllDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
  getMoviesByDirectorId,
} = require("../controllers/director.controller");

router.get("/", getAllDirectors);
router.get("/:id/movies", getMoviesByDirectorId);
router.get("/:id", getDirectorById);
router.post("/", createDirector);
router.put("/:id", updateDirector);
router.delete("/:id", deleteDirector);

module.exports = router;