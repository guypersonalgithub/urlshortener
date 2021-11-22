class ServerError {

    constructor(readonly name: string, readonly httpCode: number, readonly message: string) {}

    static notFound = (message: string): ServerError => {

        return new ServerError("Requested page is not found", 404, message);

    }

    static invalidURL = (message: string): ServerError => {

        return new ServerError("InvalidURL", 401, message);

    }

    static badSyntax = (message: string): ServerError =>{ 

        return new ServerError("Bad syntax", 401, message);

    }

    static internalServerError = (): ServerError => {

        return new ServerError("General Error", 500, "Something went wrong");

    }

}

export default ServerError;