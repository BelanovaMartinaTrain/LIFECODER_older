import express from "express";
import * as LifecosController from "../controllers/lifecos"

const router = express.Router();


router.get("/", LifecosController.getLifecos);
router.get("/:id", LifecosController.getSingleLifeco);
router.post("/", LifecosController.createLifeco);
router.patch("/:id", LifecosController.updateLifeco);
router.delete("/:id", LifecosController.deleteLifeco)

export default router;