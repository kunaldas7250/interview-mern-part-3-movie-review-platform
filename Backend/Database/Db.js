import sql from "mssql"


const Dbconnection = {
  user: "sa",
  password: "@Kunal143",
  // database: "SalesDB",
  database:"INTERNSHALA_MOVIE_REVIEW_PLATFORM",
  server: "localhost",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool;

const connection = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(Dbconnection);
      console.log("✅ Database connected successfully");
    }
    return pool;
  } catch (error) {
    console.error("❌ Something went wrong in connection:", error);
  }
};

export default connection