import express from "express";
import cors from "cors";
import { pool } from "../db.js"; // Assuming 'db.js' is using ES6

const app = express();

app.use(cors());
app.use(express.json());

export const getWardenByid = async (req, res) => {
  try {
    const { warden_id } = req.params;
    const warden = await pool.query(
      "select * from warden where warden_id = $1",
      [warden_id]
    );
    res.json(warden.rows);
  } catch (err) {
    console.log(err.message);
  }
};
