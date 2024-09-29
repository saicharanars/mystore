import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import productRoute from './routes/product.route';
import { ApiError } from './utils/apierror';

class App {
  private app: express.Application;
  private PORT: number;
  private MONGO_URL: string;

  constructor(PORT: number, MONGO_URL: string) {
    this.app = express();
    this.PORT = PORT;
    this.MONGO_URL = MONGO_URL;

    this.initializeMiddleware();
    this.connectToDatabase();
    this.initializeRoutes();
    this.initializeerrorhandler();
  }

  // Initialize middleware
  private initializeMiddleware(): void {
    this.app.use(express.json());
  }

  // Connect to MongoDB
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

  // Define routes
  private initializeRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello, World!');
    });
    this.app.use('/product', productRoute);
  }
  private initializeerrorhandler(): void {
    this.app.use(
      (
        err: ApiError,
        req: Request,
        res: Response,
        next: express.NextFunction
      ) => {
        const statusCode = err.statusCode || 500;

        res.status(statusCode).json({
          success: false,
          message: err.message,
        });
      }
    );
  }

  // Start the server
  public start(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}

// Create a new instance of the App class
const PORT = 3003;
const MONGO_URL = 'mongodb://localhost:27017/mydatabase';
const appInstance = new App(PORT, MONGO_URL);

// Start the server
appInstance.start();
