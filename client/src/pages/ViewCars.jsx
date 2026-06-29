import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import '../App.css'

const COLOR_HEX = {
    Red: '#e74c3c',
    Blue: '#2980b9',
    Black: '#1a1a1a',
    White: '#d0d0d0',
    Yellow: '#f1c40f'
}

const ViewCars = () => {
    const navigate = useNavigate()
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchCars = async () => {
        setLoading(true)
        const data = await getAllCars()
        setCars(data)
        setLoading(false)
    }

    useEffect(() => { fetchCars() }, [])

    const handleDelete = async (id, name) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
        await deleteCar(id)
        fetchCars()
    }

    if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}><span aria-busy="true">Loading cars...</span></div>

    return (
        <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
            <h2>🚗 Your Custom Cars</h2>

            {cars.length === 0 ? (
                <p>No cars saved yet. <a href="/">Build one!</a></p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                    {cars.map(car => (
                        <article key={car.id} style={{ padding: 0, overflow: 'hidden' }}>
                            {/* Color swatch header */}
                            <div
                                style={{
                                    background: COLOR_HEX[car.color] || '#888',
                                    height: 100,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem'
                                }}
                            >
                                🚗
                            </div>

                            <div style={{ padding: '1rem' }}>
                                <h3 style={{ margin: '0 0 0.5rem' }}>{car.name}</h3>
                                <small>
                                    🎨 {car.color} &nbsp;|&nbsp; 🛞 {car.wheels}<br />
                                    🪑 {car.interior} &nbsp;|&nbsp; ⚙️ {car.engine}
                                </small>
                                <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                                    ${Number(car.price).toLocaleString()}
                                </p>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        style={{ flex: 1 }}
                                        onClick={() => navigate(`/customcars/${car.id}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        style={{ flex: 1 }}
                                        className="secondary"
                                        onClick={() => navigate(`/edit/${car.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={{ flex: 1 }}
                                        className="contrast"
                                        onClick={() => handleDelete(car.id, car.name)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars
