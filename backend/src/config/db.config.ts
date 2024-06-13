import {DataSource} from "typeorm"; // Importing DataSource from TypeORM for database connection
import dotenv from "dotenv"; // Importing dotenv for environment variable configuration
import {User} from "../entity/user.entity"; // Importing User entity
import {Vacation} from "../entity/vacation.entity"; // Importing Vacation entity
import {Followers} from "../entity/followers.entity"; // Importing Followers entity

dotenv.config(); // Loading environment variables from .env file

// Creating a DataSource instance with database connection configuration
export const AppDataSource = new DataSource({
    type: "mysql", // Database type (MySQL in this case)
    host: process.env.MYSQLDB_HOST, // Database host
    port: +process.env.MYSQLDB_LOCAL_PORT!, // Database port (converted to a number)
    username: process.env.MYSQLDB_USER, // Database username
    password: process.env.MYSQLDB_ROOT_PASSWORD, // Database password
    database: process.env.MYSQLDB_DATABASE, // Database name
    synchronize: true, // Automatically sync database schema with entity metadata (for development only)
    logging: true, // Enable logging (for development only)
    entities: [User, Vacation, Followers], // List of entity classes to be used by the connection
    subscribers: [], // List of subscriber classes to be used by the connection
    migrations: [], // List of migration classes to be used by the connection
});
