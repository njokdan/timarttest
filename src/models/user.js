const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  
    User.associate = (models) => {
      User.hasMany(models.Order, { foreignKey: 'userId' });
    };

    // sequelize.sync().then(() => {
    //     console.log('User table created successfully!');
    //  }).catch((error) => {
    //     console.error('Unable to create table : ', error);
    //  });
  
    return User;
  };
  
  module.exports = UserModel;
  