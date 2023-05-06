const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const { email, password } = req.body;

  const validateFields = () => {
    if (
      !email.trim() ||
      !password.trim() ||
      password.length < 6 ||
      password.length > 20 ||
      !email.includes("@")
    ) {
      throw new Error("Please check your input fields");
    }
  };

  try {
    validateFields();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });

    res.json({ email, token, result: result.rows });
  } catch (error) {
    console.error(error);
    res.status(400).json({ detail: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const handleErrors = (error) => {
    console.error(error);
    throw new Error(`${error} in login`);
  };

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows?.[0];

    if (!user) {
      return res.status(401).json({ detail: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.hashed_password);

    if (!validPassword) {
      return res.status(401).json({ detail: "Incorrect password" });
    }

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });

    res.json({ email, token, result: result.rows });
  } catch (error) {
    handleErrors(error);
  }
};

module.exports = { signup, login };
