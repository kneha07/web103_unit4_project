export const BASE_PRICE = 20000

export const COLOR_PRICES = {
    'Red':    500,
    'Blue':   500,
    'Black':  0,
    'White':  0,
    'Yellow': 1000
}

export const WHEEL_PRICES = {
    'Standard': 0,
    'Sport':    1500,
    'Off-Road': 2000,
    'Luxury':   3000
}

export const INTERIOR_PRICES = {
    'Cloth':            0,
    'Leather':          1500,
    'Premium Leather':  3000,
    'Alcantara':        5000
}

export const ENGINE_PRICES = {
    'Standard (2.0L)':    0,
    'Sport (3.0L)':       5000,
    'Performance (4.0L)': 10000,
    'Electric':           8000
}

export const calcPrice = ({ color, wheels, interior, engine }) => {
    return (
        BASE_PRICE +
        (COLOR_PRICES[color] ?? 0) +
        (WHEEL_PRICES[wheels] ?? 0) +
        (INTERIOR_PRICES[interior] ?? 0) +
        (ENGINE_PRICES[engine] ?? 0)
    )
}
