import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Signale } from "signale";

const signale = new Signale();
dotenv.config();

const config = {
    waitForConnections: true,
    connectionLimit: 10,
};


const dbUrl = process.env.DATABASE_URL || "";

const pool = mysql.createPool({ ...config, uri:dbUrl });

export async function query(sql: string, params: any[]) {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const result = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        signale.error(error);
        return null;
    }
}
