import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCarById, deleteCar } from '../services/CarsAPI'
import '../App.css'

const COLOR_HEX = {
    Red: '#e74c3c',
    Blue: '#2980b9',
    Black: '#1a1a1a',
    White: '#d0d0d0',
    Yellow: '#f1c40f'
}

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCarById(id).then(data => { setCar(data); setLoading(false) })
    }, [id])

    const handleDelete = async () => {
        if (!confirm(`Delete "${car.name}"?`)) return
        await deleteCar(id)
        navigate('/customcars')
    }

    if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}><span aria-busy="true">Loading...</span></div>
    if (!car || car.error) return <p>Car not found.</p>

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
            <article>
                <div style={{
                    background: COLOR_HEX[car.color] || '#888',
                    borderRadius: '8px 8px 0 0',
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '6rem',
                    transition: 'background 0.4s'
                }}>
                    🚗
                </div>

                <div style={{ padding: '1.5rem' }}>
                    <h2>{car.name}</h2>

                    <table>
                        <tbody>
                            <tr><td>🎨 Exterior Color</td><td><strong>{car.color}</strong></td></tr>
                            <tr><td>🛞 Wheels</td><td><strong>{car.wheels}</strong></td></tr>
                            <tr><td>🪑 Interior</td><td><strong>{car.interior}</strong></td></tr>
                            <tr><td>⚙️ Engine</td><td><strong>{car.engine}</strong></td></tr>
                            <tr><td>💰 Total Price</td><td><strong>${Number(car.price).toLocaleString()}</strong></td></tr>
                        </tbody>
                    </table>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button onClick={() => navigate(`/edit/${car.id}`)}>✏️ Edit</button>
                        <button className="contrast" onClick={handleDelete}>🗑️ Delete</button>
                        <button className="secondary" onClick={() => navigate('/customcars')}>← Back</button>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default CarDetails
