const { saveMovie, getMovie } = require("./../controllers/moviesController"),
  express = require("express"),
  router = express.Router();
const { getAllVisitCard, getById } = require("./controllers/visitCard");

app.get("/", (req, res) => {
  getAllVisitCard()
    .then((visitCard) => res.status(200).json(visitCard))
    .catch((err) => res.status(404).json(err));
});

app.get("/cardsbyid/:id", (req, res) => {
  let id = req.params;
  getById(id)
    .then((visitCard) => res.status(200).json(visitCard))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
