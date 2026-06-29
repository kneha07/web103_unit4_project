import { pool } from '../config/database.js'

export const getAllCars = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM custom_cars ORDER BY created_at DESC')
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getCarById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM custom_cars WHERE id = $1', [id])
        if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const createCar = async (req, res) => {
    try {
        const { name, color, wheels, interior, engine, price } = req.body
        if (!name || !color || !wheels || !interior || !engine || price == null) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        // Impossible combo: Off-Road wheels + Sport or Performance engine
        if (wheels === 'Off-Road' && (engine === 'Sport (3.0L)' || engine === 'Performance (4.0L)')) {
            return res.status(400).json({
                error: 'Off-Road wheels are not compatible with Sport or Performance engines.'
            })
        }

        const result = await pool.query(
            `INSERT INTO custom_cars (name, color, wheels, interior, engine, price)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, color, wheels, interior, engine, price]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const { name, color, wheels, interior, engine, price } = req.body

        if (wheels === 'Off-Road' && (engine === 'Sport (3.0L)' || engine === 'Performance (4.0L)')) {
            return res.status(400).json({
                error: 'Off-Road wheels are not compatible with Sport or Performance engines.'
            })
        }

        const result = await pool.query(
            `UPDATE custom_cars
             SET name=$1, color=$2, wheels=$3, interior=$4, engine=$5, price=$6
             WHERE id=$7 RETURNING *`,
            [name, color, wheels, interior, engine, price, id]
        )
        if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM custom_cars WHERE id=$1 RETURNING *', [id])
        if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
        res.json({ message: 'Car deleted', car: result.rows[0] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
