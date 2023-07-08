import * as crypto from "crypto";

const tokenExpires = new Date();
tokenExpires.setHours(tokenExpires.getHours() + 48);
const jwtSecret = "process.env.KEY_SECRET_TOKEN";

export default {
  token: crypto.randomBytes(20).toString("hex"),
  jwtSecret,
  tokenExpires,
};
