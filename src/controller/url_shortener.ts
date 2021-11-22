import { Router, Request, Response, NextFunction } from "express";
import {shorturl} from '../logic/logic';

const router = Router();

router.post("/", async(req: Request, res: Response) => {

    try {

        const { url } = req.body;
        const response = await shorturl(url);
        res.send(response);

    }

    catch (err) {

        res.json({error: "invalid url, please make sure to add http/https in the beginning of the url"});

    }

})

export default router;