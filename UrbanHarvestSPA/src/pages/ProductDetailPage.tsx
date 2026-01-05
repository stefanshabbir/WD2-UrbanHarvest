import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Calendar, MapPin, Clock, Cloud, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Dummy product data (would come from API/context in real app)
const products: Record<string, {
    id: string
    title: string
    description: string
    longDescription: string
    price: number
    image: string
    category: string
    type: 'product' | 'workshop'
    date?: string
    location?: string
    duration?: string
    inStock: boolean
}> = {
    '1': {
        id: '1',
        title: 'Organic Vegetable Box',
        description: 'Weekly delivery of fresh, seasonal organic vegetables from local farms.',
        longDescription: 'Experience the freshest produce with our weekly Organic Vegetable Box. We partner with over 50 local farms to bring you a curated selection of seasonal vegetables, picked at peak ripeness and delivered within 24 hours of harvest. Each box contains 8-10 different vegetables, enough to feed a family of four for a week. Our farmers follow strict organic practices, using no synthetic pesticides or fertilizers.',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200',
        category: 'food',
        type: 'product',
        inStock: true,
    },
    '2': {
        id: '2',
        title: 'Urban Composting Workshop',
        description: 'Learn how to turn kitchen scraps into garden gold in this hands-on workshop.',
        longDescription: 'Join us for an immersive 3-hour workshop where you\'ll learn the art and science of composting in urban environments. Perfect for apartment dwellers and homeowners alike, this workshop covers everything from vermicomposting to bokashi fermentation. You\'ll leave with a starter kit and the confidence to reduce your kitchen waste by up to 80%.',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200',
        category: 'education',
        type: 'workshop',
        date: 'January 15, 2025',
        location: 'Urban Harvest Community Center',
        duration: '3 hours',
        inStock: true,
    },
}

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>()
    const product = products[id || '1'] || products['1']
    const isWorkshop = product.type === 'workshop'

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="mx-auto max-w-7xl">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        to="/explore"
                        className="inline-flex items-center gap-2 font-sans font-semibold text-gray-600 transition-colors hover:text-harvest-green"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Explore
                    </Link>
                </motion.div>

                {/* Split Screen Layout */}
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="overflow-hidden rounded-2xl border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="aspect-square w-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col"
                    >
                        {/* Category Badge */}
                        <div
                            className={`mb-4 inline-flex w-fit items-center gap-2 rounded-lg border-2 border-black px-4 py-2 font-sans text-sm font-bold uppercase tracking-wide text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${product.category === 'food'
                                    ? 'bg-harvest-green'
                                    : product.category === 'education'
                                        ? 'bg-amber-500'
                                        : 'bg-earth-brown'
                                }`}
                        >
                            {product.category === 'food'
                                ? 'Fresh Produce'
                                : product.category === 'education'
                                    ? 'Workshop'
                                    : 'Lifestyle'}
                        </div>

                        {/* Title */}
                        <h1 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                            {product.title}
                        </h1>

                        {/* Workshop Details */}
                        {isWorkshop && (
                            <div className="mb-6 space-y-3 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                                {product.date && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Calendar className="h-5 w-5 text-harvest-green" />
                                        <span className="font-sans">{product.date}</span>
                                    </div>
                                )}
                                {product.location && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <MapPin className="h-5 w-5 text-harvest-green" />
                                        <span className="font-sans">{product.location}</span>
                                    </div>
                                )}
                                {product.duration && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Clock className="h-5 w-5 text-harvest-green" />
                                        <span className="font-sans">{product.duration}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Description */}
                        <p className="mb-6 font-sans text-lg leading-relaxed text-gray-600">
                            {product.longDescription}
                        </p>

                        {/* Price */}
                        <div className="mb-6 flex items-baseline gap-2">
                            <span className="font-heading text-4xl font-bold text-harvest-green-dark">
                                ${product.price.toFixed(2)}
                            </span>
                            {isWorkshop && (
                                <span className="font-sans text-gray-500">/person</span>
                            )}
                        </div>

                        {/* Action Button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                asChild
                                size="lg"
                                className={`w-full border-3 border-black py-6 font-sans text-lg font-bold uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${isWorkshop ? 'bg-earth-brown hover:bg-earth-brown/90' : 'bg-harvest-green hover:bg-harvest-green/90'
                                    }`}
                            >
                                <Link to={isWorkshop ? `/book/${product.id}` : `/book/${product.id}`}>
                                    {isWorkshop ? (
                                        <>
                                            <Calendar className="mr-2 h-5 w-5" />
                                            Book Your Spot
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="mr-2 h-5 w-5" />
                                            Add to Cart
                                        </>
                                    )}
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Weather Widget (External API Placeholder) */}
                        {isWorkshop && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 rounded-2xl border-3 border-black bg-gradient-to-br from-blue-400 to-blue-600 p-6 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className="mb-3 flex items-center gap-2">
                                    <Cloud className="h-5 w-5" />
                                    <span className="font-sans text-sm font-semibold uppercase tracking-wide">
                                        Weather Forecast
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-sans text-sm opacity-80">Event Day</p>
                                        <p className="font-heading text-2xl font-bold">
                                            {product.date}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <Sun className="mb-1 inline-block h-10 w-10" />
                                        <p className="font-heading text-3xl font-bold">72°F</p>
                                        <p className="font-sans text-sm">Sunny</p>
                                    </div>
                                </div>
                                <p className="mt-3 font-sans text-xs opacity-70">
                                    * Weather data from external API (placeholder)
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
