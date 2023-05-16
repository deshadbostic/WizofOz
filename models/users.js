const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
var db = require('../index');
var sequelize=db.sequelize;
// Define your Sequelize model
class User extends Sequelize.Model {}
User.init(
  {
    UserId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    Username: {type: DataTypes.STRING, primaryKey: false, allowNull: false},
    Fname:DataTypes.STRING,
    Lname:DataTypes.STRING,
    Password: DataTypes.STRING,
    Email:DataTypes.STRING,
    Role:DataTypes.STRING
  },
  { sequelize: sequelize, modelName: "User", tableName: 'Users' }
);

// Add your model to the db object
db.User = User;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

  module.exports = db;