import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI'
import { calcPrice, COLOR_PRICES, WHEEL_PRICES, INTERIOR_PRICES, ENGINE_PRICES } from '../utilities/calcPrice'
import { validateCombo } from '../utilities/validation'
import '../App.css'

const COLOR_HEX = {
    Red: '#e74c3c',
    Blue: '#2980b9',
    Black: '#1a1a1a',
    White: '#f0f0f0',
    Yellow: '#f1c40f'
}

const CreateCar = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        color: 'Black',
        wheels: 'Standard',
        interior: 'Cloth',
        engine: 'Standard (2.0L)'
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const price = calcPrice(form)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const comboError = validateCombo(form)
        if (comboError) { setError(comboError); return }

        setLoading(true)
        const result = await createCar({ ...form, price })
        setLoading(false)

        if (result.error) {
            setError(result.error)
        } else {
            navigate('/customcars')
        }
    }

    return (
        <div style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
            <article>
                <header><h2>🔧 Build Your Custom Car</h2></header>

                {/* Visual Car Preview */}
                <div style={{
                    background: COLOR_HEX[form.color] || '#888',
                    borderRadius: 16,
                    height: 160,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    transition: 'background 0.4s ease',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
                }}>
                    <span style={{ fontSize: '5rem' }}>🚗</span>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <strong style={{ fontSize: '1.4rem' }}>
                        Total Price: ${price.toLocaleString()}
                    </strong>
                </div>

                {error && (
                    <div role="alert" style={{ color: 'var(--pico-color-red-500)', marginBottom: '1rem', fontWeight: 'bold' }}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label>
                        Car Name
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Give your car a name..."
                            required
                        />
                    </label>

                    <label>
                        Exterior Color
                        <select name="color" value={form.color} onChange={handleChange}>
                            {Object.entries(COLOR_PRICES).map(([c, p]) => (
                                <option key={c} value={c}>{c} {p > 0 ? `(+$${p.toLocaleString()})` : '(included)'}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Wheels
                        <select name="wheels" value={form.wheels} onChange={handleChange}>
                            {Object.entries(WHEEL_PRICES).map(([w, p]) => (
                                <option key={w} value={w}>{w} {p > 0 ? `(+$${p.toLocaleString()})` : '(included)'}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Interior
                        <select name="interior" value={form.interior} onChange={handleChange}>
                            {Object.entries(INTERIOR_PRICES).map(([i, p]) => (
                                <option key={i} value={i}>{i} {p > 0 ? `(+$${p.toLocaleString()})` : '(included)'}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Engine
                        <select name="engine" value={form.engine} onChange={handleChange}>
                            {Object.entries(ENGINE_PRICES).map(([eng, p]) => (
                                <option key={eng} value={eng}>{eng} {p > 0 ? `(+$${p.toLocaleString()})` : '(included)'}</option>
                            ))}
                        </select>
                    </label>

                    <button type="submit" aria-busy={loading} disabled={loading}>
                        {loading ? 'Saving...' : '💾 Save My Car'}
                    </button>
                </form>
            </article>
        </div>
    )
}

export default CreateCar
