'use client'

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Leaf, ShoppingBag, User } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Login', path: '/admin' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="sticky top-0 z-50 w-full"
        >
            {/* Glass-morphism + Neo-brutalist border combo */}
            <nav className="mx-4 mt-4 rounded-xl border-3 border-black bg-white/80 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] backdrop-blur-lg transition-all duration-300 dark:border-white dark:bg-black/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 transition-transform hover:scale-105"
                        aria-label="Urban Harvest Hub Home"
                    >
                        <motion.div
                            whileHover={{ rotate: 15 }}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-harvest-green shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <Leaf className="h-6 w-6 text-white" />
                        </motion.div>
                        <span className="font-heading text-xl font-bold text-harvest-green-dark">
                            Urban Harvest
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-2 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="group relative px-4 py-2"
                                aria-label={`Navigate to ${link.name}`}
                            >
                                <motion.span
                                    className={`relative z-10 font-sans text-sm font-semibold uppercase tracking-wide transition-colors ${location.pathname === link.path
                                            ? 'text-harvest-green'
                                            : 'text-gray-700 group-hover:text-harvest-green'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {link.name}
                                </motion.span>
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 rounded-lg border-2 border-harvest-green bg-harvest-green/10"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}

                        {/* CTA Button */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                className="ml-4 border-2 border-black bg-earth-brown font-sans font-bold uppercase tracking-wide text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-earth-brown/90 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                aria-label="View shopping cart"
                            >
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Cart
                            </Button>
                        </motion.div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                    aria-label="Open mobile menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[300px] border-l-3 border-black bg-white p-0"
                            >
                                <div className="flex h-full flex-col">
                                    {/* Mobile Header */}
                                    <div className="flex items-center justify-between border-b-3 border-black p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-harvest-green">
                                                <Leaf className="h-6 w-6 text-white" />
                                            </div>
                                            <span className="font-heading text-lg font-bold">
                                                Menu
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mobile Links */}
                                    <div className="flex-1 p-6">
                                        <AnimatePresence>
                                            {navLinks.map((link, index) => (
                                                <motion.div
                                                    key={link.path}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Link
                                                        to={link.path}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`mb-4 flex items-center gap-3 rounded-lg border-2 border-black p-4 font-sans font-bold uppercase tracking-wide transition-all ${location.pathname === link.path
                                                                ? 'bg-harvest-green text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                                                : 'bg-white hover:translate-x-1 hover:bg-gray-100'
                                                            }`}
                                                        aria-label={`Navigate to ${link.name}`}
                                                    >
                                                        {link.name === 'Login' ? (
                                                            <User className="h-5 w-5" />
                                                        ) : (
                                                            <Leaf className="h-5 w-5" />
                                                        )}
                                                        {link.name}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>

                                    {/* Mobile Footer */}
                                    <div className="border-t-3 border-black p-6">
                                        <Button
                                            className="w-full border-2 border-black bg-earth-brown font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <ShoppingBag className="mr-2 h-4 w-4" />
                                            View Cart
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </motion.header>
    )
}
