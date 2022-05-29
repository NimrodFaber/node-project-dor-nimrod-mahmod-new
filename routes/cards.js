const auth = require("../middleware/auth");
const express = require("express"),
  router = express.Router();
//chalk
const chalk = require("chalk");
const log = chalk.bold.white.bgGreen;
const error = chalk.bold.white.bgRed;
const {
  getAllVisitCard,
  getById,
  addCard,
  editCardById,
  getCardsFromUser,
} = require("../controllers/visitCard");
router.get("/", (req, res) => {
  getAllVisitCard()
    .then((visitCard) => res.status(200).json(visitCard))
    .catch((err) => res.status(404).json(err));
});

router.get("/cardsbyid/:id", (req, res) => {
  let id = req.params.id;
  getById(id)
    .then((visitCard) => res.status(200).json(visitCard))
    .catch((err) => res.status(404).json(err));
});

router.post("/addCard", auth, (req, res) => {
  addCard(req.body, req.user_id)
    .then((visitCard) => res.status(200).json(visitCard))
    .catch((err) => res.status(500).json(err));
});
router.get("/getCardsFromUser", auth, (req, res) => {
  getCardsFromUser(req.user_id)
    .then((cards) => res.status(200).json(cards))
    .catch((err) => res.status(500).json(err));
});

router.put("/editCardById/cardId/:id", auth, (req, res) => {
  const filter = {
    cardId: req.params.id,
    userId: req.user_id,
  };
  editCardById(filter)
    .then((cards) => res.status(200).json(cards))
    .catch((err) => {
      console.log(chalk.magenta.bgRed.bold(err));
      res.status(400).json(err);
    });
});

module.exports = router;
