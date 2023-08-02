import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  entities: [
    process.env.NODE_ENV === "development"
      ? "./src/db/entity/*.ts"
      : "./dist/db/entity/*.js",
  ],
  migrations: [
    process.env.NODE_ENV === "development"
      ? "./src/db/migration/*.ts"
      : "./dist/db/migration/*.js",
  ],
  subscribers: [],
});
