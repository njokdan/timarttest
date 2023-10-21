const OrderModel = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
    };

    // sequelize.sync().then(() => {
    //     console.log('Order table created successfully!');
    //  }).catch((error) => {
    //     console.error('Unable to create table : ', error);
    //  });
  
    return Order;
  };
  
  module.exports = OrderModel;
  