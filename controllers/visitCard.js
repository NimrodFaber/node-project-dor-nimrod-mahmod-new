const visitCard = require ("../models/visitCard")
function getAllVisitCard() {
    return new Promise((resolve, reject) => {
        visitCard.find()
        .then((visitCard) => resolve(visitCard))
        .catch((err) => reject(err));
    });
  }

  function getById(_id) {
    return new Promise((resolve, reject) => {
        visitCard.findById(_id)
        .then((visitCard) => resolve(visitCard))
        .catch((err) => reject(err));
    });
  }

  exports.getAllVisitCard = getAllVisitCard
  exports.getById = getById