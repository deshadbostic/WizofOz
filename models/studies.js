const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
var db = require('../index');
var sequelize=db.sequelize;
// Define your Sequelize model
class Study extends Sequelize.Model {}
Study.init(
  {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, primaryKey: false, allowNull: false},
    creator:DataTypes.BIGINT,
  },
  { sequelize: sequelize, modelName: "studies", tableName: 'research studies' }
);

// Add your model to the db object
db.Study = Study;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

  module.exports = db;