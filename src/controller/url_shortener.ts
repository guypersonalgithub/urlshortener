import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {

    const { url } = req.body;

    res.json({result: url});

})

export default router;