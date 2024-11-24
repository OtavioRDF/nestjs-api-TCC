import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 3000),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/database/entities/*.js'],
    synchronize: true,
    migrations: ['dist/database/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;