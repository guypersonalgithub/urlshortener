import { Router, Request, Response, NextFunction } from "express";
import https from "http";
import logic from '../logic/logic';

const router = Router();

router.post("/", async(req: Request, res: Response, next: NextFunction) => {

    try {

        const { url } = req.body;
        const response = await logic.shorturl(url);
        res.send(`URL saved, new URL: ${req.headers.referer}api/shorturl/${response}`);

    }

    catch (err) {

        next(err);

    }

});

router.get("/:shorturl", async(req: Request, res: Response, next: NextFunction) => {

    try {

        const { shorturl } = req.params;
        const redirectedURL = await logic.redirectURL(parseInt(shorturl));
        res.redirect(redirectedURL);

    }

    catch (err) {

        next(err);

    }

});

export default router;