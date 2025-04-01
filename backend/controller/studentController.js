import express from "express";
import { pool } from "../db.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

export const getStudentByid = async (req, res) => {
  try {
    const { student_id } = req.params;
    const student = await pool.query(
      "select * from student where student_id = $1",
      [student_id]
    );
    res.json(student.rows);
  } catch (err) {
    console.log(err.message);
  }
};
