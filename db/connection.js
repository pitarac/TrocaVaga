import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE, // Fix: Added a comma after the previous line
});

export default sequelize;
module.exports = sequelize;
module.exports = sequelize;
