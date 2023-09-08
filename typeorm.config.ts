import { DataSource } from 'typeorm';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrations: ['src/migrations/*{.ts, .js}'],
  entities: ['src/modules/**/*.entity{.ts,.js}'],
});
