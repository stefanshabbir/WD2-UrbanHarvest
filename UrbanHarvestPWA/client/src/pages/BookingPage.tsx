import { useState } from 'react'
import { endpoints } from '@/lib/api'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Calendar, User, Mail, Phone, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FormData {
    name: string
    email: string
    phone: string
    guests: number
    notes: string
}

interface FormErrors {
    name?: string
    email?: string
    phone?: string
}

export default function BookingPage() {
    const { id } = useParams<{ id: string }>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        guests: 1,
        notes: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (formData.phone && !/^[\d\s\-+()]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const checkPhoneWithNumVerify = async (phone: string) => {
        try {
            // NOTE: Variable must be prefixed with VITE_ to be exposed to client
            const apiKey = import.meta.env.VITE_NUMVERIFY_KEY || import.meta.env.VITE_NUMVERIFY_ACCESS_KEY

            if (!apiKey) {
                console.warn('NumVerify API key missing. Skipping strict validation.')
                return true
            }

            // NumVerify doesn't support CORS on free plan usually, so this might need a proxy.
            // For dev/demo, we'll try direct call. If HTTPS vs HTTP issue, might fail.
            const response = await fetch(`http://apilayer.net/api/validate?access_key=${apiKey}&number=${phone}&country_code=&format=1`)
            const data = await response.json()

            if (data.valid === false) {
                setErrors((prev) => ({ ...prev, phone: 'Invalid phone number (checked via NumVerify)' }))
                return false
            } else if (data.valid === true) {
                return true
            }
            // Handle error/unknown response
            return true
        } catch (error) {
            console.error('NumVerify check failed:', error)
            // Fallback to allowing it if API fails
            return true
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        // Verify Phone
        if (formData.phone) {
            const isPhoneValid = await checkPhoneWithNumVerify(formData.phone)
            if (!isPhoneValid) {
                setIsSubmitting(false)
                return
            }
        }

        // Send to Backend API
        try {
            const response = await fetch(endpoints.bookings, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }
        } catch (error) {
            console.error('Booking Error:', error)
            setErrors(prev => ({ ...prev, form: 'Failed to submit booking. Please try again.' }))
            setIsSubmitting(false)
            return
        }

        setIsSubmitting(false)
        setIsSuccess(true)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'guests' ? parseInt(value) : value,
        }))
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="mx-auto max-w-2xl">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        to={`/products/${id}`}
                        className="inline-flex items-center gap-2 font-sans font-semibold text-gray-600 transition-colors hover:text-harvest-green"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Details
                    </Link>
                </motion.div>

                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        /* Success State */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="rounded-2xl border-3 border-black bg-white p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-12"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-3 border-black bg-harvest-green shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <Check className="h-12 w-12 text-white" />
                            </motion.div>
                            <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900">
                                Booking Confirmed!
                            </h2>
                            <p className="mb-8 font-sans text-lg text-gray-600">
                                Thank you, {formData.name}! We've sent a confirmation email to{' '}
                                <span className="font-semibold">{formData.email}</span>.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button
                                    asChild
                                    className="border-2 border-black bg-harvest-green font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <Link to="/explore">Continue Exploring</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-2 border-black font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <Link to="/">Go Home</Link>
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        /* Form State */
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="rounded-2xl border-3 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-8"
                        >
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-black bg-earth-brown shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    <Calendar className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h1 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                                        Complete Your Booking
                                    </h1>
                                    <p className="font-sans text-gray-600">
                                        Fill in your details to reserve your spot
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-gray-700"
                                    >
                                        <User className="h-4 w-4" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border-3 bg-white px-4 py-3 font-sans transition-all focus:outline-none focus:ring-2 focus:ring-harvest-green focus:ring-offset-2 ${errors.name
                                            ? 'border-red-500 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]'
                                            : 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                            }`}
                                        placeholder="Enter your full name"
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                    />
                                    {errors.name && (
                                        <p id="name-error" className="mt-2 font-sans text-sm text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-gray-700"
                                    >
                                        <Mail className="h-4 w-4" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border-3 bg-white px-4 py-3 font-sans transition-all focus:outline-none focus:ring-2 focus:ring-harvest-green focus:ring-offset-2 ${errors.email
                                            ? 'border-red-500 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]'
                                            : 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                            }`}
                                        placeholder="you@example.com"
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                    />
                                    {errors.email && (
                                        <p id="email-error" className="mt-2 font-sans text-sm text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-gray-700"
                                    >
                                        <Phone className="h-4 w-4" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border-3 bg-white px-4 py-3 font-sans transition-all focus:outline-none focus:ring-2 focus:ring-harvest-green focus:ring-offset-2 ${errors.phone
                                            ? 'border-red-500 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]'
                                            : 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                            }`}
                                        placeholder="+1 (555) 000-0000"
                                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                                    />
                                    {errors.phone && (
                                        <p id="phone-error" className="mt-2 font-sans text-sm text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Guests Field */}
                                <div>
                                    <label
                                        htmlFor="guests"
                                        className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-gray-700"
                                    >
                                        <Users className="h-4 w-4" />
                                        Number of Guests
                                    </label>
                                    <select
                                        id="guests"
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-3 border-black bg-white px-4 py-3 font-sans shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none focus:ring-2 focus:ring-harvest-green focus:ring-offset-2"
                                    >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>
                                                {num} {num === 1 ? 'Guest' : 'Guests'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Notes Field */}
                                <div>
                                    <label
                                        htmlFor="notes"
                                        className="mb-2 block font-sans text-sm font-semibold uppercase tracking-wide text-gray-700"
                                    >
                                        Additional Notes
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full resize-none rounded-lg border-3 border-black bg-white px-4 py-3 font-sans shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none focus:ring-2 focus:ring-harvest-green focus:ring-offset-2"
                                        placeholder="Any dietary requirements or special requests?"
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full border-3 border-black bg-harvest-green py-6 font-sans text-lg font-bold uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <motion.span
                                                animate={{ opacity: [1, 0.5, 1] }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                            >
                                                Processing...
                                            </motion.span>
                                        ) : (
                                            'Confirm Booking'
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
