import { Router, type IRouter } from "express";
import healthRouter from "./health";
import elainaRouter from "./elaina";

const router: IRouter = Router();

router.use(healthRouter);
router.use(elainaRouter);

export default router;
