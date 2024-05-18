import express from "express";
import usersController from "../controllers/usersController";

const router = express.Router();

router.route("/").get(usersController.getUser);
router.route("/create").post(usersController.setUser);
router.route("/delete").delete(usersController.deleteUser);

const userRoute = router;

export default userRoute;
