import pool from "utilities/dbconn";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let response = { error: null, status: 405, data: {} }

    if (req.method === "GET") {
        const client = await pool.connect();
        response = await client.query('SELECT NOW()').then((res, err) => {
            let result = res.rows;
            return { error: err, status: err ? 500 : 200, data: result }
        }).finally(() => client.end());
    }
    return res.status(response.status).json(response);
}