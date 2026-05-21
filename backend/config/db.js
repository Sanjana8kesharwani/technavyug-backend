import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3307,
    dialect: "mysql",
    logging: false, // Turn off query logging for production quality
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Database Connected successfully via Sequelize");
    
    // Sync models
    await sequelize.sync({ alter: true });
    console.log("Database models synchronized");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export { sequelize };
export default connectDB;
