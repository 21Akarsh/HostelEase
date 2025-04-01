import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtGenerator = (user_id, type) => {
  const payload = {
    user: {
      user_id,
      type,
    },
  };

  return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1h" });
};

const jwtDecoder = (token) => jwt.verify(token, process.env.JWTSECRET);

export { jwtGenerator, jwtDecoder };
