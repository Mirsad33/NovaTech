const {Model, DataTypes} = require('sequelize')

const client = require('../config/connections')
const User = require('./user')

class Post extends Model{}
//Post model used to defining table column
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize: client,
    timestamps: true,
    modelName: 'post'
  }
)

module.exports = Post
  