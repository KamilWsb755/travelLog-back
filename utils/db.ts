import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'travel_log',
    namedPlaceholders: true,
    decimalNumbers: true,
}) 