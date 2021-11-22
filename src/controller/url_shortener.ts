import { Router, Request, Response, NextFunction } from "express";
import https from "http";
import logic from '../logic/logic';

const router = Router();

router.post("/", async(req: Request, res: Response) => {

    try {

        const { url } = req.body;
        const response = await logic.shorturl(url);
        res.send(`URL saved, new URL: ${req.headers.referer}api/shorturl/${response}`);

    }

    catch (err) {

        res.json({error: "invalid url, please make sure to add http/https in the beginning of the url"});

    }

});

router.get("/:shorturl", async(req, res) => {

    try {

        const { shorturl } = req.params;
        const redirectedURL = await logic.redirectURL(parseInt(shorturl));
        res.redirect(redirectedURL);

    }

    catch (err) {

        res.json(err);

    }

});

export default router;