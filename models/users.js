
const {Sequelize, Model, DataTypes } = require('sequelize')

const UserModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const User = sequelize.define('User', {
        UserId: {type: INTEGER, primaryKey: true, autoIncrement: true},
        Username: {type: STRING, primaryKey: false, allowNull: false},
        Fname:STRING,
        Lname:STRING,
        Password: STRING,
        Email:STRING,
        Role:STRING,

        
    })
    return User
}


let Users =module.exports = UserModel;