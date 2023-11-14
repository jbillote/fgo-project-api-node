import express from "express";
import servantController from "../controllers/servantController";

const router = express.Router();

router.get('/api/fgo/v1/servant', servantController.searchServant);

export = router;
