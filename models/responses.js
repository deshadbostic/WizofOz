const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
var db = require('../index');
var sequelize=db.sequelize;
// Define your Sequelize model
class Response extends Sequelize.Model {}
Response.init(
  {
    responseid: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
 
    contents: {type: DataTypes.STRING, primaryKey: false, allowNull: false},
    "research study": {type: DataTypes.STRING, foreignKey: true, allowNull: false},
  },
  { sequelize: sequelize, modelName: "responses", tableName: 'responses' }
);
 
// Add your model to the db object
db.Response = Response;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

  module.exports = db;