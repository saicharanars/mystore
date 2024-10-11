import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import productRoute from './routes/product.route';
import { ApiError } from './utils/apierror';
import UploadService from './services/media.service';
import cors from 'cors';
import shipmentRoute from './routes/shipment.route';

class App {
  private app: express.Application;
  private PORT: number;
  private MONGO_URL: string;
  private uploadService = new UploadService();
  private corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3002'],
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
    this.initializeerrorhandler();
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
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello, World!');
    });
    this.app.use('/product', productRoute);
    this.app.use('/shipment', shipmentRoute);
  }

  private initializeerrorhandler(): void {
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

  public start(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}

const PORT = 3003;
const MONGO_URL = 'mongodb://localhost:27017/mydatabase';
const appInstance = new App(PORT, MONGO_URL);
appInstance.start();
