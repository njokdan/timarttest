# Timarttest  
This is a take home test (nodejs,express,graphql,mysql)  

Here are the instructions for running the Node.js application that exposes GraphQL endpoints for creating a new user, retrieving user information by ID, creating a new order for a user, and retrieving a user's orders, using Express.js and GraphQL for routing and Sequelize for MySQL database interactions, and implementing proper input validation and error handling in the API endpoints:  


##Instructions:  
1. Clone the repository to your local machine.  
2. Install Node.js and npm on your system.  
3. Open the terminal and navigate to the project directory.  
4. Run the command npm install to install the required dependencies.  
5. Create a MySQL database and update the database configuration in the models/index.js file.  
6. Run the command npm start to start the server.  
7. Open a web browser and navigate to http://localhost:3000/graphql to access the GraphQL playground.  
8. Use the GraphQL queries and mutations to create a new user, retrieve user information by ID, create a new order for a user, and retrieve a user's orders.    

GraphQL Queries and Mutations:  
To create a new user:  

<script>
mutation {  
  createUser(input: { name: "John Doe", email: "johndoe@example.com" }) {  
    id  
    name  
    email  
  }  
}  
</script>

To retrieve user information by ID:  
<script>
query {  
  user(id: 1) {  
    id  
    name  
    email  
    orders {  
      id  
      date  
      amount  
    }  
  }  
}  
</script>

To create a new order for a user:  
<script>
mutation {  
  createOrder(input: { date: "2023-10-20", amount: 100.0, userId: 1 }) {  
    id  
    date  
    amount  
    user {  
      id  
      name  
      email  
    }  
  }  
}  
</script>  

To retrieve a user's orders:  
<script>
query {  
  orders(userId: 1) {  
    id  
    date  
    amount  
    user {  
      id  
      name  
      email  
    }  
  }  
}  
</script>  

Note: Replace the user ID and order details with your own values.  







