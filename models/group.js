const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
var db = require('../index');
var sequelize=db.sequelize;
// Define your Sequelize model
class Group extends Sequelize.Model {}
Group.init(
  {
    groupid: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    groupname: {type: DataTypes.STRING, primaryKey: false, allowNull: false}
  },
  { sequelize: sequelize, modelName: "group", tableName: 'research group' }
);
 
// Add your model to the db object
db.Group = Group;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

  module.exports = db;