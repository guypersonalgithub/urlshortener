import mysql from "mysql2";

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(err => {
    if (err) return;
    console.log("Connected to MySQL");
});

const execute = (sql:string) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) { 
                reject(err) 
                return
            };
            resolve(result);
        });
    });
}

const executeWithParameters = (sql: string, parameters: string[]) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

const createURLTable = async() => {
    const sql = "CREATE TABLE IF NOT EXISTS urls (url_id BIGINT AUTO_INCREMENT PRIMARY KEY, old_url VARCHAR(50), new_url VARCHAR(50))";
    await execute(sql);
}

createURLTable();

const options = {
    execute,
    executeWithParameters
}

export default options;