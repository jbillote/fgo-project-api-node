import express from "express";
import testController from "../controllers/testController";

const router = express.Router();

router.get('/', testController.helloWorld);

export = router