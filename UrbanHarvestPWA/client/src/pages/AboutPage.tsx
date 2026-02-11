import { motion } from 'framer-motion'
import { Users, Award, Leaf } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-harvest-green-dark py-20 text-white">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 font-heading text-4xl font-bold md:text-5xl"
                    >
                        About Urban Harvest
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mx-auto max-w-2xl font-sans text-lg text-white/80"
                    >
                        Cultivating community, sustainability, and fresh food since 2020.
                    </motion.p>
                </div>
            </section>

            {/* Story Section */}
            <section className="px-4 py-16 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl border-3 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-12"
                    >
                        <h2 className="mb-6 font-heading text-3xl font-bold text-gray-900">
                            Our Story
                        </h2>
                        <div className="space-y-6 font-sans text-lg text-gray-600">
                            <p>
                                Urban Harvest began as a small rooftop garden project in the heart of
                                the city. What started with a few tomato plants and a passion for
                                greenery quickly grew into a community movement.
                            </p>
                            <p>
                                We realized that city dwellers were disconnected from their food sources
                                and craved a greener, more sustainable lifestyle. By partnering with
                                local organic farmers and transforming underutilized urban spaces into
                                productive gardens, we built a bridge between the farm and the city.
                            </p>
                            <p>
                                Today, Urban Harvest Hub is more than just a marketplace; it's a vibrant
                                ecosystem of growers, makers, and eco-conscious citizens working together
                                for a healthier planet.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-harvest-green/10 px-4 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900">
                        Core Values
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: Leaf,
                                title: 'Sustainability',
                                desc: 'We prioritize the planet in every decision, from sourcing to packaging.',
                            },
                            {
                                icon: Users,
                                title: 'Community',
                                desc: 'Building strong connections between neighbors, farmers, and nature.',
                            },
                            {
                                icon: Award,
                                title: 'Quality',
                                desc: 'Committed to providing the freshest, highest-quality organic produce.',
                            },
                        ].map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="rounded-xl border-2 border-black bg-white p-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-harvest-green text-white">
                                    <value.icon className="h-8 w-8" />
                                </div>
                                <h3 className="mb-4 font-heading text-xl font-bold">{value.title}</h3>
                                <p className="font-sans text-gray-600">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
