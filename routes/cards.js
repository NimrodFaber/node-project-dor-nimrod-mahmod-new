const auth = require("../middleware/auth");
const express = require("express"),
  router = express.Router();
const {
  getAllVisitCard,
  getById,
  addCard,
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
    .catch((err) => res.status(404).json(err));
});
router.get("/getCardsFromUser", auth, (req, res) => {
  getCardsFromUser(req.user_id)
    .then((cards) => res.status(200).json(cards))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
