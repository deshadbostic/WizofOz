const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
var db = require('../index');
var sequelize=db.sequelize;
// Define your Sequelize model
class Video extends Sequelize.Model {}
Video.init(
  {
    videoid: {type: DataTypes.STRING, primaryKey: true, autoIncrement: true},
    responseid : {type: DataTypes.BIGINT, primaryKey: false, allowNull: false}
  },
  { sequelize: sequelize, modelName: "videos", tableName: 'videos' }
);
 
// Add your model to the db object
db.Video = Video;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

  module.exports = db;