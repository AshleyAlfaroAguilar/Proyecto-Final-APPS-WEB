const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const MyFriend = sequelize.define('my_friend', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'my_friends',
  timestamps: false
});

module.exports = MyFriend;