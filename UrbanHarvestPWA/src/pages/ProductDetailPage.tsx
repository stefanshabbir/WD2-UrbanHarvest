import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Calendar, MapPin, Clock, Cloud, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/data/mockData'

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>()

    // Find product from centralized mock data
    const product = products.find((p) => p.id === id)
    const isWorkshop = product?.type === 'workshop'

    if (!product) {
        return (
            <div className="min-h-screen px-4 py-20 text-center">
                <h2 className="mb-4 font-heading text-2xl font-bold">Product Not Found</h2>
                <Button asChild className="border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Link to="/explore">Back to Explore</Link>
                </Button>
            </div>
        )
    }

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
                            {product.longDescription || product.description}
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
