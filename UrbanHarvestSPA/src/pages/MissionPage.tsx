import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe, Sprout, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MissionPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-earth-brown text-white py-20">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 font-heading text-4xl font-bold md:text-6xl"
                    >
                        Our Mission
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto max-w-2xl font-sans text-xl text-white/90"
                    >
                        To green our cities, nourish our communities, and empower everyone to live sustainably.
                    </motion.p>
                </div>
            </section>

            {/* Goals Section */}
            <section className="px-4 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col justify-center"
                        >
                            <h2 className="mb-6 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                                Cultivating a Greener Future
                            </h2>
                            <p className="mb-6 font-sans text-lg text-gray-600">
                                We believe that urban living doesn't have to mean a disconnect from nature.
                                Our mission is to integrate sustainable practices into the fabric of city life.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Reduce urban food miles by supporting local growers',
                                    'Eliminate single-use plastics from our supply chain',
                                    'Educate 10,000 citizens on composting and gardening',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-harvest-green text-white">
                                            <Sprout className="h-4 w-4" />
                                        </div>
                                        <span className="font-sans font-medium text-gray-800">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-2xl border-3 border-black bg-harvest-green-light/20 p-8"
                        >
                            <div className="aspect-square w-full rounded-xl bg-harvest-green/10 flex items-center justify-center">
                                <Globe className="h-32 w-32 text-harvest-green" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full border-3 border-black bg-earth-brown flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <span className="font-heading text-xl font-bold text-white text-center leading-tight p-2">
                                    2030<br />Vision
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-100 py-20 text-center px-4">
                <div className="mx-auto max-w-3xl">
                    <h2 className="mb-6 font-heading text-3xl font-bold text-gray-900">
                        Join the Movement
                    </h2>
                    <p className="mb-8 font-sans text-lg text-gray-600">
                        Whether you want to learn how to compost, buy fresh local produce, or simply
                        connect with like-minded individuals, there is a place for you at Urban Harvest.
                    </p>
                    <Link to="/explore">
                        <Button className="btn-retro">
                            Start Your Journey
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
