const { Model, DataTypes } = require('sequelize')
const client = require('../config/connections')
const bcrypt = require('bcrypt')

class User extends Model {
  //Use bcrypt to compare and validate input password to encrypted password
  validatePassword(password) {
    return bcrypt.compareSync(password, this.password)
  }
}
//Defines colomns for User table
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'You must provide a valid email string'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    }
  },
  {
    sequelize: client,
    timestamps: false,
    modelName: 'user',
    hooks: { //Creates an encrypted password value to protect new user password
      beforeCreate: async (newData) => {
        newData.password = await bcrypt.hash(newData.password, 10) //encrypt the password
        return newData
      }
    }
  }

)

module.exports = User
  