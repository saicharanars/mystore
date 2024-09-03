/* eslint-disable @nx/enforce-module-boundaries */
import 'reflect-metadata';
import express from 'express';
import path from 'path';
import 'dotenv/config';
import { connection } from '@ecommerce/db-postgres';
import authroute from './Routes/auth.route';
import { writeDocumentation } from './docs';
import swaggerUi from 'swagger-ui-express';
import * as yaml from 'yaml';
import * as fs from 'fs/promises';
import cors from 'cors';
// Use fs/promises for async/await
const app = express();
app.use(express.json());
const corsOptions = {
  origin: '*', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS method
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/auth', authroute);

const port = process.env.PORT || 3001;

// async function createDummyData() {
//   // Create users
//   const user1 = await UserModel.create({
//     name: 'John Doe',
//     email: 'john.do@example.com',
//     password: 'password123',
//     role: 'customer',
//   });

//   const user2 = await UserModel.create({
//     name: 'Jane Smith',
//     email: 'jane.smh@example.com',
//     password: 'password456',
//     role: 'seller',
//   });

//   // Create locations
//   const location1 = await LocationModel.create({
//     address: '123 Main St',
//     city: 'New York',
//     state: 'NY',
//     pincode: 10001,
//   });

//   const location2 = await LocationModel.create({
//     address: '456 Elm St',
//     city: 'Los Angeles',
//     state: 'CA',
//     pincode: 90001,
//   });

//   // Associate users with locations
//   await UserLocationModel.create({
//     userId: user1.id,
//     locationId: location1.id,
//   });

//   await UserLocationModel.create({
//     userId: user2.id,
//     locationId: location2.id,
//   });

//   console.log('Dummy data created successfully');
// }

// async function performDummyQueries() {
//   // Query all users
//   const allUsers = await UserModel.findAll();
//   console.log('All users:', allUsers.map(user => user.toJSON()));

//   // Query user by email
//   const userByEmail = await UserModel.findOne({ where: { email: 'john.doe@example.com' } });
//   console.log('User by email:', userByEmail?.toJSON());

//   // Query all locations
//   const allLocations = await LocationModel.findAll();
//   console.log('All locations:', allLocations.map(location => location.toJSON()));

//   // Query users with their locations
//   const usersWithLocations = await UserModel.findAll({
//     include: [{ model: LocationModel, through: { attributes: [] } }],
//   });
//   console.log('Users with locations:', usersWithLocations.map(user => user.toJSON()));

//   // Query locations with their users
//   const locationsWithUsers = await LocationModel.findAll({
//     include: [{ model: UserModel, through: { attributes: [] } }],
//   });
//   console.log('Locations with users:', locationsWithUsers.map(location => location.toJSON()));
// }
const outputPath = path.join(__dirname, 'openapi-docs.yaml');
app.get('/api-docs/swagger.json', async (req, res) => {
  try {
    const yamlFile = await fs.readFile(outputPath, 'utf-8');
    const swaggerDocument = yaml.parse(yamlFile);
    res.header('Content-Type', 'application/json');
    res.json(swaggerDocument);
  } catch (err) {
    console.error('Error reading or parsing the OpenAPI YAML file:', err);
    res.status(500).send('Error reading or parsing the Swagger YAML file.');
  }
});

async function setupSwagger() {
  try {
    // Read the file asynchronously
    const file = await fs.readFile(outputPath, { encoding: 'utf-8' });

    // Parse the YAML content
    const swaggerDocument = yaml.parse(file);

    // Set up Swagger UI with the parsed document
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    console.log(
      'OpenAPI documentation has been successfully read and set up at /api-docs'
    );
  } catch (err) {
    console.error('Failed to read or parse the OpenAPI documentation:', err);
  }
}

(async () => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');

    await connection.sync({ alter: false });
    console.log('Database synced');
    // Write the OpenAPI documentation to the file
    writeDocumentation();
    // Set up Swagger UI
    await setupSwagger();

    // await createDummyData();
    // await performDummyQueries();

    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    });

    server.on('error', console.error);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
