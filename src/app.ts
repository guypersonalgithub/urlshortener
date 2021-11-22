import express, { Application, Request, Response } from "express";
import urlShortener from './controller/url_shortener';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req: Request, res: Response) => {

    res.sendFile(__dirname + '/html/index.html');

});

app.use("/api/shorturl", urlShortener);

app.listen(3001, () => {

    console.log(`Server is running on port 3001`);

});
