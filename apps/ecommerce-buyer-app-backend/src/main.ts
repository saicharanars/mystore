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
import product from './Routes/product.route';
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
app.use('/product', product);

const port = process.env.PORT || 3001;

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
