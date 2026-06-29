import { pool } from './database.js'
import dotenv from 'dotenv'

dotenv.config()

const createTables = async () => {
    try {
        await pool.query(`
            DROP TABLE IF EXISTS custom_cars;

            CREATE TABLE custom_cars (
                id          SERIAL PRIMARY KEY,
                name        VARCHAR(100) NOT NULL,
                color       VARCHAR(50)  NOT NULL,
                wheels      VARCHAR(50)  NOT NULL,
                interior    VARCHAR(50)  NOT NULL,
                engine      VARCHAR(50)  NOT NULL,
                price       NUMERIC(10,2) NOT NULL,
                created_at  TIMESTAMP DEFAULT NOW()
            );

            INSERT INTO custom_cars (name, color, wheels, interior, engine, price) VALUES
                ('Thunder Beast', 'Red',   'Sport',    'Leather',          'Sport (3.0L)',       35500.00),
                ('Midnight Ghost', 'Black', 'Luxury',  'Premium Leather',  'Performance (4.0L)', 48000.00),
                ('Desert Runner',  'White', 'Off-Road', 'Cloth',           'Standard (2.0L)',    22000.00);
        `)
        console.log('Tables created and seeded ✅')
    } catch (err) {
        console.error('Error setting up tables:', err)
    } finally {
        pool.end()
    }
}

createTables()
