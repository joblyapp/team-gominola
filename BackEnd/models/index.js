const models = {
    usersModel: require("./nosql/users"),
    productsModel: require("./nosql/product"),
    storageModel: require("./nosql/storage"),
    categoryModel:require("./nosql/category"),
    reservationModel:require("./nosql/reservation"),
}

module.exports = models