import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Leaf,
    Instagram,
    Twitter,
    Facebook,
    Mail,
    MapPin,
    Heart,
} from 'lucide-react'

const footerLinks = {
    explore: [
        { name: 'Fresh Produce', path: '/explore?category=food' },
        { name: 'Workshops', path: '/explore?category=education' },
        { name: 'Lifestyle', path: '/explore?category=lifestyle' },
    ],
    company: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Mission', path: '/mission' },
        { name: 'Contact', path: '/contact' },
    ],
    legal: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
    ],
}

const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
]

export default function Footer() {
    return (
        <footer className="relative mt-auto border-t-3 border-black bg-harvest-green-dark">

            <div className="mx-auto max-w-7xl px-6 py-16">
                {/* Main Footer Content */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <Link to="/" className="mb-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur">
                                <Leaf className="h-7 w-7 text-white" />
                            </div>
                            <span className="font-heading text-2xl font-bold text-white">
                                Urban Harvest
                            </span>
                        </Link>
                        <p className="mb-6 font-sans text-sm leading-relaxed text-white/80">
                            Connecting eco-conscious communities through sustainable living,
                            fresh local produce, and educational workshops.
                        </p>
                        {/* Eco Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border-2 border-earth-brown-light bg-earth-brown-light/20 px-4 py-2">
                            <Heart className="h-4 w-4 text-earth-brown-light" />
                            <span className="font-sans text-xs font-bold uppercase tracking-wide text-earth-brown-light">
                                100% Eco-Friendly
                            </span>
                        </div>
                    </motion.div>

                    {/* Explore Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="mb-6 font-heading text-lg font-bold text-white">
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.explore.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="group flex items-center gap-2 font-sans text-sm text-white/70 transition-colors hover:text-white"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-earth-brown-light transition-transform group-hover:scale-150" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="mb-6 font-heading text-lg font-bold text-white">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="group flex items-center gap-2 font-sans text-sm text-white/70 transition-colors hover:text-white"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-earth-brown-light transition-transform group-hover:scale-150" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact & Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="mb-6 font-heading text-lg font-bold text-white">
                            Get in Touch
                        </h3>
                        <div className="mb-6 space-y-4">
                            <div className="flex items-center gap-3 text-white/70">
                                <Mail className="h-4 w-4" />
                                <span className="font-sans text-sm">hello@urbanharvest.eco</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <MapPin className="h-4 w-4" />
                                <span className="font-sans text-sm">
                                    123 Green Street, Eco City
                                </span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 transition-colors hover:border-white hover:bg-white/20"
                                    aria-label={`Follow us on ${social.label}`}
                                >
                                    <social.icon className="h-5 w-5 text-white" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 md:flex-row"
                >
                    <p className="font-sans text-sm text-white/60">
                        © {new Date().getFullYear()} Urban Harvest Hub. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="font-sans text-sm text-white/60 transition-colors hover:text-white"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
