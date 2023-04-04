import express from "express";
import { createUser, getUserByName } from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

async function genHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

router.post("/signup", async function (request, response) {
  const { email, fullName, userName, password } = request.body;
  //db.movies.insertOne(data);
  console.log(userName, fullName, email, password);
  const userFromDB = await getUserByName(userName);
  console.log(userFromDB);

  if (userFromDB) {
    response.status(400).send({ message: "This userName already Exists" });
  } else if (password.length < 8) {
    response
      .status(400)
      .send({ message: "Password must be atleast 8 characters" });
  } else {
    const hashedPassword = await genHashedPassword(password);
    console.log(hashedPassword);

    const result = await createUser({
      email: email,
      fullName: fullName,
      userName: userName,
      password: hashedPassword,
    });
    response.status(200).send({ result });
  }
});

router.post("/login", async function (request, response) {
  const { userName, password } = request.body;
  //db.movies.insertMany(data);
  const userFromDB = await getUserByName(userName);
  console.log(userFromDB);

  if (!userFromDB) {
    response.status(401).send({ message: "Invalid Credentials" });
  } else {
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    console.log(isPasswordMatch);
    if (isPasswordMatch) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);

      response.status(200).send({
        message: "Successfully Login",
        token: token,
        id: userFromDB._id,
        userName: userFromDB.userName,
      });
    } else {
      response.status(401).send({ message: "Invalid Credentials" });
    }
  }
});

export const userRouter = router;
