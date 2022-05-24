const visitCard = require("../models/visitCard");
const User = require("../models/user");
const { findById } = require("../models/user");
const res = require("express/lib/response");
function getAllVisitCard() {
  return new Promise((resolve, reject) => {
    visitCard
      .find()
      .then((visitCard) => resolve(visitCard))
      .catch((err) => reject(err));
  });
}

function getById(_id) {
  return new Promise((resolve, reject) => {
    visitCard
      .findById(_id)

      .then((card) => resolve(card))
      .catch((err) => reject(err));
  });
}

function addCard(card, userId) {
  return new Promise(async (resolve, reject) => {
    const newCard = new visitCard(card);
    const user = await User.findById(userId);
    if (user.isVip) {
      await user.cards.push(newCard);
      await user.save();
      await newCard.save();
      resolve(card);
    } else {
      reject("this user is not a vip user");
    }
  });
}
function getCardsFromUser(userId) {
  return new Promise(async (resolve, reject) => {
    User.findById(userId)
      .then((user) => resolve(user.cards))
      .catch((err) => reject(err));
  });
}

exports.getAllVisitCard = getAllVisitCard;
exports.getById = getById;
exports.addCard = addCard;
exports.getCardsFromUser = getCardsFromUser;
