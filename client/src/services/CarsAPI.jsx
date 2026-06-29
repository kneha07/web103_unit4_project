const BASE_URL = '/api/cars'

export const getAllCars = async () => {
    const res = await fetch(BASE_URL)
    return res.json()
}

export const getCarById = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`)
    return res.json()
}

export const createCar = async (car) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    })
    return res.json()
}

export const updateCar = async (id, car) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    })
    return res.json()
}

export const deleteCar = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    return res.json()
}
