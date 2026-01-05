import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Calendar, ShoppingBag, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Bento Grid Items
const bentoItems = [
    {
        id: 1,
        title: 'Fresh Local Produce',
        description: 'Farm-fresh vegetables and fruits delivered to your doorstep every week.',
        icon: Leaf,
        color: 'bg-harvest-green',
        link: '/explore?category=food',
        span: 'md:col-span-2 md:row-span-2',
    },
    {
        id: 2,
        title: 'Upcoming Workshops',
        description: 'Learn sustainable gardening, composting, and eco-living.',
        icon: Calendar,
        color: 'bg-earth-brown',
        link: '/explore?category=education',
        span: 'md:col-span-1 md:row-span-1',
    },
    {
        id: 3,
        title: 'Community Hub',
        description: 'Connect with like-minded eco-conscious neighbors.',
        icon: Users,
        color: 'bg-amber-500',
        link: '/explore',
        span: 'md:col-span-1 md:row-span-1',
    },
    {
        id: 4,
        title: 'Lifestyle Goods',
        description: 'Zero-waste products and sustainable home essentials.',
        icon: ShoppingBag,
        color: 'bg-harvest-green-light',
        link: '/explore?category=lifestyle',
        span: 'md:col-span-2 md:row-span-1',
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 100,
            damping: 15,
        },
    },
}

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 py-16 md:py-24">
                {/* Background decoration */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-harvest-green/10 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-earth-brown-light/20 blur-3xl" />
                </div>

                <div className="mx-auto max-w-7xl">
                    {/* Hero Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center md:mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-harvest-green bg-harvest-green/10 px-4 py-2"
                        >
                            <Leaf className="h-4 w-4 text-harvest-green" />
                            <span className="font-sans text-sm font-semibold text-harvest-green">
                                Eco-Conscious Living
                            </span>
                        </motion.div>

                        <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
                            Welcome to{' '}
                            <span className="relative">
                                <span className="relative z-10 text-harvest-green">
                                    Urban Harvest
                                </span>
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 0.6, duration: 0.4 }}
                                    className="absolute bottom-2 left-0 h-4 bg-earth-brown-light/40 md:h-6"
                                />
                            </span>{' '}
                            Hub
                        </h1>

                        <p className="mx-auto max-w-2xl font-sans text-lg text-gray-600 md:text-xl">
                            Your digital gateway to sustainable living. Discover fresh local
                            produce, join community workshops, and embrace an eco-friendly
                            lifestyle.
                        </p>
                    </motion.div>

                    {/* Bento Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="grid gap-4 md:grid-cols-3 md:grid-rows-3 lg:gap-6"
                    >
                        {bentoItems.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                className={`group ${item.span}`}
                            >
                                <Link
                                    to={item.link}
                                    className="block h-full"
                                    aria-label={`Explore ${item.title}`}
                                >
                                    <motion.div
                                        whileHover={{ y: -6 }}
                                        className="relative h-full overflow-hidden rounded-2xl border-3 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:p-8"
                                    >
                                        {/* Icon */}
                                        <div
                                            className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl border-2 border-black ${item.color} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
                                        >
                                            <item.icon className="h-7 w-7 text-white" />
                                        </div>

                                        {/* Content */}
                                        <h2 className="mb-2 font-heading text-xl font-bold text-gray-900 md:text-2xl">
                                            {item.title}
                                        </h2>
                                        <p className="mb-4 font-sans text-gray-600">
                                            {item.description}
                                        </p>

                                        {/* Arrow */}
                                        <div className="flex items-center gap-2 font-sans font-semibold text-harvest-green transition-transform group-hover:translate-x-2">
                                            Explore
                                            <ArrowRight className="h-4 w-4" />
                                        </div>

                                        {/* Decorative corner */}
                                        <div className="absolute -bottom-2 -right-2 h-8 w-8 rotate-45 border-t-3 border-black bg-earth-brown-light opacity-0 transition-opacity group-hover:opacity-100" />
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 text-center md:mt-16"
                    >
                        <Link to="/explore">
                            <Button
                                size="lg"
                                className="border-3 border-black bg-harvest-green px-8 py-6 font-sans text-lg font-bold uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-harvest-green/90 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Start Exploring
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-y-3 border-black bg-harvest-green-dark py-12"
            >
                <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
                    {[
                        { value: '500+', label: 'Local Farmers' },
                        { value: '10K+', label: 'Happy Members' },
                        { value: '50+', label: 'Weekly Workshops' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="font-heading text-4xl font-bold text-white md:text-5xl">
                                {stat.value}
                            </div>
                            <div className="font-sans text-lg text-white/80">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    )
}
