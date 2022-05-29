const visitCard = require("../models/visitCard");
const User = require("../models/user");
const { findById } = require("../models/user");
const res = require("express/lib/response");
const Joi = require("joi");
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
    const { error, value } = newCard.validateCardSchema().validate(card);
    if (error) {
      reject(error.details[0].message);
    } else {
      const user = await User.findById(userId);
      newCard.user_id = userId;
      if (user.isVip) {
        await user.cards.push(newCard);
        await user.save();
        await newCard.save();
        resolve(newCard);
      } else {
        reject("this user is not a vip user");
      }
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
function editCardById(filter) {
  return new Promise(async (resolve, reject) => {
    const { userId,cardId} = filter
    let user = await User.findById(userId);
    if (checkIsVip(user)) {
      visitCard
        .findById(cardId)
        .then((card) => resolve(card))
        .catch((err) => reject(err));
    } else {
      reject({ status: "failed", message: "u need to be a vip" });
    }
  });
}

function checkIsVip(user) {
  return user.isVip ? true : false;
}

module.exports = {
  getAllVisitCard,
  getById,
  addCard,
  getCardsFromUser,
  editCardById,
};
