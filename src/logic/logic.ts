import dns from "dns";
import dao from '../dao/dao';
import ServerError from "../error-handler/server-error";

let allURLS: any;

const getAllURLS = async() => {

    allURLS = await dao.allShortUrls();

}

getAllURLS();

const shorturl = async(insertedURL: string) => {

    try {

        const fullURL = new URL(insertedURL);

        if (fullURL.hostname.length > 50 || fullURL.hostname.length == 0) {

            throw ServerError.invalidURL("You may only shorten urls that are 50 characters long or less");

        }

        await dns.lookup(fullURL.hostname, (err, address, family) => {
    
            if (!address || !family) {
    
                throw ServerError.notFound("Url not found");
    
            }
    
        });

        const response = await dao.shorturl(insertedURL, allURLS.length + 1);
        
        allURLS.push({
            url_id: allURLS.length + 1,
            old_url: insertedURL,
            new_url: allURLS.length + 1
        });

        return (response.newURL);

    }
    catch (err: any) {

        throw err;

    }

}

const redirectURL = async(insertedID: number) => {

    if (insertedID < 1 || insertedID > allURLS.length) {

        throw ServerError.notFound("Url not found.");

    }

    return (allURLS[insertedID - 1].old_url);

}

const options = {
    shorturl,
    redirectURL
}

export default options;