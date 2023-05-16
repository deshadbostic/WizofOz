const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
var db = require('../index');
var sequelize=db.sequelize;
// Define your Sequelize model
class GroupSequence extends Sequelize.Model {}
GroupSequence.init(
  {
    groupid: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    responseid: {type: DataTypes.BIGINT, primaryKey: false, allowNull: false},
    sequence:DataTypes.INTEGER
  },
  { sequelize: sequelize, modelName: "group", tableName: 'group sequence' }
);
 
// Add your model to the db object
db.GroupSequence = GroupSequence;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

  module.exports = db;