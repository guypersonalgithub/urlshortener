import dns from "dns";

const shorturl = async(insertedURL: string) => {

    try {

        const fullURL = new URL(insertedURL);

        await dns.lookup(fullURL.hostname, (err, address, family) => {
    
            if (!address || !family) {
    
                throw new Error("Invalid url");
    
            }
    
        });

        return ("URL saved.");

    }
    catch (err: any) {

        throw new Error(err);

    }

}

export {shorturl};