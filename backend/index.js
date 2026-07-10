import express from "express";
// import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const countries = [
    { code: "US", name: "United States", capital: "Washington, D.C." },
    { code: "CA", name: "Canada", capital: "Ottawa" },
    { code: "MX", name: "Mexico", capital: "Mexico City" }
];

app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM capitals");
    res.json(result.rows);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

