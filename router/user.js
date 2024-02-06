import express from "express";

import { getAllUser, getMyProfile, login, logout, register, } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUser);

router.post("/login", login);

router.post("/new", register);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);
// router.get("/userid/:id",getUserDetails);
// router.put("/userid/:id",update);
// router.delete("/userid/:id",deleteUser);


export default router;