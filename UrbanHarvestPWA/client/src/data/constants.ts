export const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'food', label: 'Fresh Produce' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'education', label: 'Workshops' },
] as const

export type Category = (typeof categories)[number]['id']
