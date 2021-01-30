module.exports = (sequelize, DataTypes) => {
  const UserList = sequelize.define(
    'userList',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      deleteFlag: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      freezeTableName: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    },
  );

  return UserList;
};
