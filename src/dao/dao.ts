import { RowDataPacket } from "mysql2";
import connection from "./mysql-connection";

const allShortUrls = async() => {

    try {

        const allSQL = "SELECT * from urls";
        const allURLS = await connection.execute(allSQL);
        return allURLS;

    }

    catch (err) {

        throw err;

    }

}

const shorturl = async(insertedURL: string, newURL: string): Promise<{newURL: string}> => {

    try {

        const urlSQL = "INSERT into urls (old_url, new_url) VALUES (?, ?)";
        const urlResponse = await connection.executeWithParameters(urlSQL, [insertedURL, newURL]);

        return ({newURL: newURL});

    }

    catch (err) {

        throw err;
        
    }

}

const options = {
    allShortUrls,
    shorturl
}

export default options;