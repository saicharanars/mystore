import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import productRoute from './routes/product.route';
import { ApiError } from './utils/apierror';
import cors from 'cors';
import shipmentRoute from './routes/shipment.route';
import * as yaml from 'yaml';
import * as fs from 'fs/promises';
import path from 'path';
import { writeDocumentation } from './docs';
import swaggerUi from 'swagger-ui-express';
import { StatusCodes } from 'http-status-codes';

class App {
  private app: express.Application;
  private PORT: number;
  private MONGO_URL: string;
  private allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
  private docsOutputPath = path.join(__dirname, 'docs', 'openapi-docs.yaml');
  private corsOptions = {
    origin: this.allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  constructor(PORT: number, MONGO_URL: string) {
    this.app = express();
    this.PORT = PORT;
    this.MONGO_URL = MONGO_URL;
    this.initializeMiddleware();
    this.connectToDatabase();
    this.initializeRoutes();
    this.initializeErrorHandler();
  }

  private initializeMiddleware(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`${req.method} ${req.url}`);
      console.log('Headers:', req.headers);
      next();
    });
    this.app.use(cors(this.corsOptions));
    this.app.use(express.json());
  }

  private connectToDatabase(): void {
    mongoose
      .connect(this.MONGO_URL)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
  }

  private initializeRoutes(): void {
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(StatusCodes.OK).json({
        message: 'Health check successfull, api is online',
      });
    });
    this.app.use('/product', productRoute);
    this.app.use('/shipment', shipmentRoute);
  }

  private swaggerRoutes(): void {
    this.app.get('/api-docs/swagger.json', async (req, res) => {
      try {
        const yamlFile = await fs.readFile(this.docsOutputPath, 'utf-8');
        const swaggerDocument = yaml.parse(yamlFile);
        res.header('Content-Type', 'application/json');
        res.json(swaggerDocument);
      } catch (err) {
        console.error('Error reading or parsing the OpenAPI YAML file:', err);
        res.status(500).send('Error reading or parsing the Swagger YAML file.');
      }
    });
  }

  private async setupSwagger(): Promise<void> {
    try {
      const file = await fs.readFile(this.docsOutputPath, {
        encoding: 'utf-8',
      });
      const swaggerDocument = yaml.parse(file);
      this.app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
      );
      console.log(
        'OpenAPI documentation has been successfully read and set up at /api-docs'
      );
    } catch (err) {
      console.error('Failed to read or parse the OpenAPI documentation:', err);
    }
  }

  private initializeErrorHandler(): void {
    this.app.use(
      (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const statusCode = err.statusCode || 500;
        console.error('Error:', err);
        res.status(statusCode).json({
          success: false,
          message: err.message,
        });
      }
    );
  }

  public async start(): Promise<void> {
    try {
      await writeDocumentation();
      console.log('OpenAPI documentation generated successfully');

      await this.setupSwagger();
      this.swaggerRoutes();

      this.app.listen(this.PORT, () => {
        console.log(`Server is running on port ${this.PORT}`);
        console.log(
          `Swagger UI is available at http://localhost:${this.PORT}/api-docs`
        );
      });
    } catch (error) {
      console.error('Error starting the server:', error);
      process.exit(1);
    }
  }
}

const PORT = 3003;
const MONGO_URL = process.env.MONGOURL || '';

const appInstance = new App(PORT, MONGO_URL);
appInstance.start().catch((error) => {
  console.error('Failed to start the application:', error);
  process.exit(1);
});
