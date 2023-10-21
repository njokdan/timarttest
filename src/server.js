const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
const { createHandler } = require('graphql-http/lib/use/http');
const schema = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');
const { body, validationResult } = require('express-validator');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const app = express();

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Timart API Documentation',
        version: '1.0.0',
        description: 'Timarttest API Swagger Documentation',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
        "paths": {
            "/graphql": {
                "get": {
                    "summary": "Execute GraphQL queries and mutations",
                    "requestBody": {
                        "content": {
                        "application/json": {
                            "schema": {
                            "type": "object",
                            "properties": {
                                "query": {
                                "type": "string",
                                "description": "GraphQL query or mutation. Provide a GraphQL query or mutation here.",
                                "example": "query { getUserById(id: 1) { id, name, email } }"
                                
                                },
                                "variables": {
                                "type": "object",
                                "description": "GraphQL query variables",
                                "example": {}
                                },
                                "operationName": {
                                "type": "string",
                                "description": "GraphQL operation name",
                                "example": "GetUserInformation"
                                }
                            },
                            "required": ["query"]
                            }
                        }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "GraphQL response",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object"
                                    }
                                }
                            }
                        },
                    "examples": {
                        "UserInformationExample": {
                            "description": "Example response for retrieving user information by ID.",
                            "value": {
                                "data": {
                                    "getUserById": {
                                        "id": 1,
                                        "name": "John Doe",
                                        "email": "njokdan@gmail.com"
                                    }
                                }
                            }
                        },
                        "UserOrdersExample": {
                            "description": "Example response for retrieving a user's orders.",
                            "value": {
                                "data": {
                                    "getUserOrders": [
                                        {
                                        "id": 1,
                                        "date": "2023-10-20",
                                        "amount": 100.50
                                        },
                                        {
                                        "id": 2,
                                        "date": "2023-10-21",
                                        "amount": 75.20
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
                }
            },
            "/users": {
            "post": {
                "summary": "Create a new user",
                "requestBody": {
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "name": {
                            "type": "string",
                            "description": "User's name",
                            "example": "Daniel Njoku"
                        },
                        "email": {
                            "type": "string",
                            "format": "email",
                            "description": "User's email address",
                            "example": "njokdan@gmail.com"
                        }
                        },
                        "required": ["name", "email"]
                    }
                    }
                }
                },
                "responses": {
                "200": {
                    "description": "User created successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/User"
                        }
                    }
                    }
                },
                "400": {
                    "description": "Bad Request",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/Error"
                        }
                    }
                    }
                }
                }
            }
            },
            "/users/{userId}": {
                "get": {
                "summary": "Get user by ID",
                "parameters": [
                    {
                    "name": "userId",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "User ID"
                    }
                ],
                "responses": {
                    "200": {
                    "description": "User details"
                    },
                    "404": {
                    "description": "User not found"
                    }
                }
                }
            },
            "/users/{userId}/orders": {
                "get": {
                  "summary": "Retrieve a user's orders",
                  "parameters": [
                    {
                      "name": "userId",
                      "in": "path",
                      "required": true,
                      "schema": {
                        "type": "integer"
                      },
                      "description": "User ID"
                    }
                  ],
                  "responses": {
                    "200": {
                      "description": "Successful response",
                      "content": {
                        "application/json": {
                          "schema": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Order"
                            }
                          }
                        }
                      }
                    },
                    "404": {
                      "description": "User not found"
                    },
                    "500": {
                      "description": "Internal server error"
                    }
                  }
                }
              },          
            "/orders": {
            "post": {
                "summary": "Create a new order",
                "requestBody": {
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "date": {
                            "type": "string",
                            "format": "date",
                            "description": "Order date",
                            "example": "2023-10-20"
                        },
                        "amount": {
                            "type": "number",
                            "description": "Order amount",
                            "example": 100.50
                        },
                        "userId": {
                            "type": "integer",
                            "description": "User ID associated with the order",
                            "example": 1
                        }
                        },
                        "required": ["date", "amount", "userId"]
                    }
                    }
                }
                },
                "responses": {
                "200": {
                    "description": "Order created successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/Order"
                        }
                    }
                    }
                },
                "400": {
                    "description": "Bad Request",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/Error"
                        }
                    }
                    }
                }
                }
            }
            }
        },
        "components": {
            "schemas": {
            "User": {
                "type": "object",
                "properties": {
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "email": {
                    "type": "string",
                    "format": "email"
                }
                }
            },
            "Order": {
                "type": "object",
                "properties": {
                "id": {
                    "type": "integer"
                },
                "date": {
                    "type": "string",
                    "format": "date"
                },
                "amount": {
                    "type": "number"
                },
                "userId": {
                    "type": "integer"
                }
                }
            },
            "Error": {
                "type": "object",
                "properties": {
                "errors": {
                    "type": "array",
                    "items": {
                    "type": "object",
                    "properties": {
                        "message": {
                        "type": "string"
                        }
                    }
                    }
                }
                }
            }
            }
        },
    },
    apis: ['./routes/*.js'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());


app.use(
  '/graphql',
  createHandler({ 
    schema,
    rootValue: resolvers,
    graphiql: true,
    context: { models }, }),
);


app.get('/', async (req, res) => {
  
  // If the user is found, return the user data as the response
  res.status(200).json({ success: 'Hello Team' });
});
// Define a route handler for GET /users/{userId}
app.get('/users/:userId', async (req, res) => {
    // Extract userId from the request parameters
    const userId = parseInt(req.params.userId, 10); // Parse the userId as an integer
  
    // Find the user with the specified userId
    const user = await models.User.find(user => user.id === userId);
  
    // If the user is not found, return a 404 Not Found response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // If the user is found, return the user data as the response
    res.status(200).json(user);
  });

  // Define a route handler for GET /users/:userId/orders
app.get('/users/:userId/orders', async (req, res) => {
    const userId = req.params.userId;  
    try {
      // Retrieve user's orders from the database based on userId
      const user = await models.User.findByPk(userId, {
        include: Order, // Include orders associated with the user
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Extract orders from the user object and send as the response
      const userOrders = user.Orders;
      res.status(200).json(userOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user orders' });
    }
});


app.post(
  '/users',
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    const user = await models.User.create({ name, email });

    res.json(user);
  }
);

app.post(
  '/orders',
  body('date').notEmpty().withMessage('Date is required'),
  body('amount').isFloat().withMessage('Invalid amount'),
  body('userId').notEmpty().withMessage('User ID is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, amount, userId } = req.body;
    const order = await models.Order.create({ date, amount, userId });

    res.json(order);
  }
);

models.sequelize.sync().then(() => {
  console.log('Database synced');
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
})
.catch((err) => {
  console.error('Error syncing database:', err);
});
