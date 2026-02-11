import { createContext, useContext, useState, type ReactNode } from 'react'

export type FilterCategory = 'all' | 'food' | 'lifestyle' | 'education'

interface FilterContextType {
    activeCategory: FilterCategory
    setActiveCategory: (category: FilterCategory) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
    const [activeCategory, setActiveCategory] = useState<FilterCategory>('all')

    return (
        <FilterContext.Provider value={{ activeCategory, setActiveCategory }}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilter() {
    const context = useContext(FilterContext)
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider')
    }
    return context
}
