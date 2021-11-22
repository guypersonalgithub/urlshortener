import dns from "dns";
import dao from '../dao/dao';

let allURLS: any;

const getAllURLS = async() => {

    allURLS = await dao.allShortUrls();

}

getAllURLS();

const shorturl = async(insertedURL: string) => {

    try {

        const fullURL = new URL(insertedURL);

        if (fullURL.hostname.length > 50 || fullURL.hostname.length == 0) {

            throw new Error("Invalid url");

        }

        await dns.lookup(fullURL.hostname, (err, address, family) => {
    
            if (!address || !family) {
    
                throw new Error("Invalid url");
    
            }
    
        });

        const response = await dao.shorturl(insertedURL, allURLS.length + 1);
        
        return (response.newURL);

    }
    catch (err: any) {

        throw new Error(err);

    }

}

const options = {
    shorturl
}

export default options;