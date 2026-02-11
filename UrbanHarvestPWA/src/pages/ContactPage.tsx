import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSent(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="mb-4 font-heading text-4xl font-bold text-gray-900">
                        Get in Touch
                    </h1>
                    <p className="font-sans text-lg text-gray-600">
                        We'd love to hear from you. Send us a message or visit us at our hub.
                    </p>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        {[
                            { icon: MapPin, title: 'Visit Us', content: '123 Green Street, Eco City, EC 54321' },
                            { icon: Mail, title: 'Email Us', content: 'hello@urbanharvest.eco' },
                            { icon: Phone, title: 'Call Us', content: '+1 (555) 123-4567' },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4 rounded-xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-harvest-green text-white">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl font-bold">{item.title}</h3>
                                    <p className="font-sans text-gray-600">{item.content}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Map Placeholder */}
                        <div className="h-64 w-full overflow-hidden rounded-2xl border-2 border-black grayscale bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                            <span className="font-sans font-bold text-gray-500">Map Placeholder</span>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-2xl border-3 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    >
                        {isSent ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <Send className="h-8 w-8" />
                                </div>
                                <h3 className="mb-2 font-heading text-2xl font-bold">Message Sent!</h3>
                                <p className="font-sans text-gray-600">
                                    Thanks for reaching out. We'll get back to you shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="mb-2 block font-sans text-sm font-bold uppercase text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formState.name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-2 border-black p-3 font-sans focus:outline-none focus:ring-2 focus:ring-harvest-green focus:ring-offset-2"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block font-sans text-sm font-bold uppercase text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formState.email}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-2 border-black p-3 font-sans focus:outline-none focus:ring-2 focus:ring-harvest-green focus:ring-offset-2"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="mb-2 block font-sans text-sm font-bold uppercase text-gray-700">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-2 border-black p-3 font-sans focus:outline-none focus:ring-2 focus:ring-harvest-green focus:ring-offset-2"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-retro"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
