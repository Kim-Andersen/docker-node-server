import mongoose from 'mongoose';
import logger from '../logger/logger';

export default {
  connect: async (uri: string) => {
    try {
      logger.info('Connecting to database');
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      logger.info('Connected to database');
    } catch (error) {
      logger.error(new Error('Error connecting to database', { cause: error }));
      throw error;
    }
  },
  disconnect: async () => {
    try {
      await mongoose.disconnect();
      logger.info('Disconnected from database');
    } catch (error) {
      logger.error(
        new Error('Error disconnecting to database', { cause: error }),
      );
      throw error;
    }
  },
};
