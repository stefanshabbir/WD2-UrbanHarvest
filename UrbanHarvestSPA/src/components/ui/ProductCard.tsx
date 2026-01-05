import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ProductCardProps {
    id: string
    title: string
    description?: string
    price: number
    image: string
    category: 'food' | 'lifestyle' | 'education'
    type?: 'product' | 'workshop'
    date?: string
    inStock?: boolean
}

const categoryColors = {
    food: 'bg-harvest-green border-harvest-green-dark',
    lifestyle: 'bg-earth-brown border-earth-brown',
    education: 'bg-amber-500 border-amber-600',
}

const categoryLabels = {
    food: 'Fresh Produce',
    lifestyle: 'Lifestyle',
    education: 'Workshop',
}

export default function ProductCard({
    id,
    title,
    description,
    price,
    image,
    category,
    type = 'product',
    date,
    inStock = true,
}: ProductCardProps) {
    const isWorkshop = type === 'workshop'

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative"
        >
            <div className="relative overflow-hidden rounded-2xl border-3 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Category Badge */}
                    <div
                        className={`absolute left-3 top-3 rounded-lg border-2 border-black px-3 py-1 font-sans text-xs font-bold uppercase tracking-wide text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${categoryColors[category]}`}
                    >
                        {categoryLabels[category]}
                    </div>

                    {/* Stock/Availability Badge */}
                    {!inStock && (
                        <div className="absolute right-3 top-3 rounded-lg border-2 border-black bg-gray-800 px-3 py-1 font-sans text-xs font-bold uppercase text-white">
                            Sold Out
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <Link
                            to={`/products/${id}`}
                            className="flex items-center gap-2 rounded-full border-2 border-white bg-white px-6 py-3 font-sans text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
                            aria-label={`View details for ${title}`}
                        >
                            View Details
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Date for workshops */}
                    {isWorkshop && date && (
                        <div className="mb-2 flex items-center gap-2 text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span className="font-sans text-sm">{date}</span>
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="mb-2 font-heading text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-harvest-green">
                        {title}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p className="mb-4 line-clamp-2 font-sans text-sm text-gray-600">
                            {description}
                        </p>
                    )}

                    {/* Price & Action */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                            <span className="font-heading text-2xl font-bold text-harvest-green-dark">
                                ${price.toFixed(2)}
                            </span>
                            {isWorkshop && (
                                <span className="font-sans text-xs text-gray-500">/person</span>
                            )}
                        </div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                asChild
                                disabled={!inStock}
                                className={`border-2 border-black font-sans font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isWorkshop
                                        ? 'bg-earth-brown hover:bg-earth-brown/90'
                                        : 'bg-harvest-green hover:bg-harvest-green/90'
                                    } ${!inStock ? 'cursor-not-allowed opacity-50' : ''}`}
                                aria-label={isWorkshop ? `Book ${title}` : `Add ${title} to cart`}
                            >
                                <Link to={isWorkshop ? `/book/${id}` : `/products/${id}`}>
                                    {isWorkshop ? (
                                        <>
                                            <Calendar className="mr-2 h-4 w-4" />
                                            Book
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Buy
                                        </>
                                    )}
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rotate-45 border-t-3 border-black bg-earth-brown-light" />
            </div>
        </motion.article>
    )
}
