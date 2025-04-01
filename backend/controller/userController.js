import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { pool } from "../db.js"; // Assuming 'db.js' is using ES6
import { jwtGenerator, jwtDecoder } from "../utils/jwtToken.js";

const app = express();

app.use(cors());
app.use(express.json());

export const userRegister = async (req, res) => {
  const { full_name, email, phone, password, type } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (full_name, email, phone, password, type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [full_name, email, phone, bcryptPassword, type]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id, newUser.rows[0].type);

    if (type === "student") {
      const { block_id, usn, room } = req.body;
      await pool.query(
        "INSERT INTO student (student_id, block_id, usn, room) VALUES ($1, $2, $3, $4)",
        [newUser.rows[0].user_id, block_id, usn, room]
      );
    } else if (type === "warden") {
      const { block_id } = req.body;
      await pool.query(
        "INSERT INTO warden (warden_id, block_id) VALUES ($1, $2)",
        [newUser.rows[0].user_id, block_id]
      );
    }

    console.log(jwtDecoder(jwtToken));
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id, user.rows[0].type, user.rows[0].full_name);
    console.log(jwtDecoder(jwtToken));
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
