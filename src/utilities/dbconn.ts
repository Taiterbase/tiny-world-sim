import fs from "fs";
import { Pool } from "pg";
import  os from "os";

const homeDir = os.homedir;
const connectionString = process.env.PGCONN;
const config = {
    connectionString,
    ssl: {
        rejectUnauthorized: true,
        encrypt: true,
        ca: fs.readFileSync(`${homeDir}/.postgresql/root.crt`).toString(),
    }
};

const pool = new Pool(config);

export default pool;
