import app from './app'
import connectDB from './config/db';
import { env } from './config/env';

const startServer = async () => {
     try {
          await connectDB();

          app.listen(env.PORT, () => {
               console.log(`Server running on port ${env.PORT}`);
          });
     } catch (e) {
          console.error(e);
          console.error("Server startup failed");
          process.exit(1);
     }
};

startServer();
