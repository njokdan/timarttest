const resolvers = {
    user: async (args, { models }) => {
      try {
        const { id } = args;
        const user = await models.User.findByPk(id, { include: [models.Order] });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    orders: async (args, { models }) => {
      try {
        const { userId } = args;
        const orders = await models.Order.findAll({ where: { userId } });
        if (orders.length === 0) {
          throw new Error('No orders found');
        }
        return orders;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createUser: async (args, { models }) => {
      const { name, email } = args.input;
      return models.User.create({ name, email });
    },
    createOrder: async (args, { models }) => {
      const { date, amount, userId } = args.input;
      return models.Order.create({ date, amount, userId });
    },
  };
  
  module.exports = resolvers;
  