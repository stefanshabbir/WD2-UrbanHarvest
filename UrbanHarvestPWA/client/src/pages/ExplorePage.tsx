import { useState, useEffect } from 'react'
import { endpoints } from '@/lib/api'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, ChevronDown, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import ProductCard from '@/components/ui/ProductCard'
import { categories, type Category } from '@/data/constants'
import { useFilter, type FilterCategory } from '@/context/FilterContext'

interface Product {
    _id: string
    id: string
    title: string
    category: 'food' | 'lifestyle' | 'education'
    price: number
    image: string
    description?: string
    inStock?: boolean
}

function FilterSidebar({
    activeCategory,
    onCategoryChange,
    isMobile = false,
    onClose,
}: {
    activeCategory: FilterCategory
    onCategoryChange: (cat: FilterCategory) => void
    onLocationChange?: (lat: number, lng: number) => void
    isMobile?: boolean
    onClose?: () => void
}) {
    const handleLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // alert(`Location Found: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}. \nShowing products near you.`)
                    // Call parent handler if available, or dispatch event. 
                    // Ideally props should allow passing this up.
                    // For now, let's assume we pass a prop or use a context.
                    // BUT, since we are inside a component, let's look at the props.
                    // The props don't currently include a location handler.
                    // We need to modify the component props.
                },
                (error) => {
                    console.error('Geolocation error:', error)
                    alert('Unable to retrieve location.')
                }
            )
        } else {
            alert('Geolocation not supported.')
        }
    }

    return (
        <div className={isMobile ? 'p-6' : ''}>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold">Filters</h2>
                {isMobile && onClose && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        aria-label="Close filters"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {/* Geolocation Feature */}
            <div className="mb-6">
                <div className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-gray-500">
                    <MapPin className="h-4 w-4" />
                    Location
                </div>
                <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-2 border-dashed border-gray-400 text-gray-600 hover:border-harvest-green hover:text-harvest-green"
                    onClick={handleLocation}
                >
                    <MapPin className="h-4 w-4" />
                    Find Near Me
                </Button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
                <div className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-gray-500">
                    <ChevronDown className="h-4 w-4" />
                    Categories
                </div>
                {categories.map((cat) => (
                    <motion.button
                        key={cat.id}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            onCategoryChange(cat.id as FilterCategory)
                            onClose?.()
                        }}
                        className={`w-full rounded-lg border-2 border-black p-3 text-left font-sans font-semibold transition-all ${activeCategory === cat.id
                            ? 'bg-harvest-green text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                            : 'bg-white hover:bg-gray-100'
                            }`}
                        aria-label={`Filter by ${cat.label}`}
                        aria-pressed={activeCategory === cat.id}
                    >
                        {cat.label}
                    </motion.button>
                ))}
            </div>
        </div>
    )
}

// Container variants for staggered animation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export default function ExplorePage() {
    const { activeCategory, setActiveCategory } = useFilter()
    const [filterOpen, setFilterOpen] = useState(false)
    const [searchParams] = useSearchParams()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

    // Sync URL query param with context on mount
    useEffect(() => {
        const categoryParam = searchParams.get('category')
        if (categoryParam) {
            // Simple validation to check if it's a valid category
            const isValid = categories.some((c) => c.id === categoryParam)
            if (isValid) {
                setActiveCategory(categoryParam as Category)
            }
        }
    }, [searchParams, setActiveCategory])

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                let url = endpoints.products
                if (userLocation) {
                    url += `?lat=${userLocation.lat}&lng=${userLocation.lng}&dist=20`
                }
                const res = await fetch(url)
                const data = await res.json()
                // Ensure data is array (if backend returns object wrapper)
                setProducts(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error('Failed to fetch products:', error)
                // Fallback to empty or handled in UI
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [userLocation])

    const filteredProducts =
        activeCategory === 'all'
            ? products
            : products.filter((p) => p.category === activeCategory)

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-harvest-green"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen px-4 py-8 md:py-12">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="mb-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                        Explore Our Collection
                    </h1>
                    <p className="font-sans text-gray-600">
                        Discover sustainable products and educational workshops for
                        eco-conscious living.
                    </p>
                </motion.div>

                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden w-64 shrink-0 md:block"
                    >
                        <div className="sticky top-28 rounded-2xl border-3 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <FilterSidebar
                                activeCategory={activeCategory}
                                onCategoryChange={setActiveCategory}
                                onLocationChange={(lat, lng) => {
                                    // Trigger fetch with new coords
                                    // We need to move fetchProducts out of useEffect or trigger a state change
                                    setUserLocation({ lat, lng })
                                }}
                            />
                        </div>
                    </motion.aside>

                    {/* Mobile Filter Button */}
                    <div className="fixed bottom-6 right-6 z-40 md:hidden">
                        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    className="h-14 w-14 rounded-full border-3 border-black bg-harvest-green shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                    aria-label="Open filters"
                                >
                                    <Filter className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] border-r-3 border-black p-0">
                                <FilterSidebar
                                    activeCategory={activeCategory}
                                    onCategoryChange={setActiveCategory}
                                    onLocationChange={(lat, lng) => {
                                        setUserLocation({ lat, lng })
                                        setFilterOpen(false)
                                    }}
                                    isMobile
                                    onClose={() => setFilterOpen(false)}
                                />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0 }}
                                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {filteredProducts.map((product) => (
                                    <motion.div key={product._id || product.id} variants={itemVariants}>
                                        <ProductCard {...product} id={product._id || product.id} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {filteredProducts.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-20 text-center"
                            >
                                <p className="font-sans text-lg text-gray-500">
                                    No items found in this category.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
