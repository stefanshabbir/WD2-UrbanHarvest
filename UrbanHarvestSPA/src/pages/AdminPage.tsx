import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Search, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Dummy data for admin table
const dummyListings = [
    {
        id: '1',
        title: 'Organic Vegetable Box',
        category: 'Food',
        price: 35.0,
        status: 'Active',
    },
    {
        id: '2',
        title: 'Urban Composting Workshop',
        category: 'Education',
        price: 25.0,
        status: 'Active',
    },
    {
        id: '3',
        title: 'Bamboo Starter Kit',
        category: 'Lifestyle',
        price: 42.0,
        status: 'Active',
    },
    {
        id: '4',
        title: 'Farm-to-Table Fruit Basket',
        category: 'Food',
        price: 28.0,
        status: 'Draft',
    },
    {
        id: '5',
        title: 'Rooftop Garden Basics',
        category: 'Education',
        price: 45.0,
        status: 'Active',
    },
]

export default function AdminPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredListings = dummyListings.filter((listing) =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-black bg-harvest-green shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <LayoutDashboard className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                                Admin Dashboard
                            </h1>
                            <p className="font-sans text-gray-600">Manage your listings</p>
                        </div>
                    </div>

                    <Button className="border-2 border-black bg-harvest-green font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Listing
                    </Button>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search listings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border-3 border-black bg-white py-3 pl-12 pr-4 font-sans shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none focus:ring-2 focus:ring-harvest-green focus:ring-offset-2"
                            aria-label="Search listings"
                        />
                    </div>
                </motion.div>

                {/* Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="overflow-hidden rounded-2xl border-3 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-3 border-black bg-gray-100">
                                    <th className="px-6 py-4 text-left font-sans text-sm font-bold uppercase tracking-wide text-gray-700">
                                        Title
                                    </th>
                                    <th className="px-6 py-4 text-left font-sans text-sm font-bold uppercase tracking-wide text-gray-700">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left font-sans text-sm font-bold uppercase tracking-wide text-gray-700">
                                        Price
                                    </th>
                                    <th className="px-6 py-4 text-left font-sans text-sm font-bold uppercase tracking-wide text-gray-700">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-right font-sans text-sm font-bold uppercase tracking-wide text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredListings.map((listing, index) => (
                                    <motion.tr
                                        key={listing.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-gray-200 transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="font-sans font-semibold text-gray-900">
                                                {listing.title}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-block rounded-lg border-2 border-black px-3 py-1 font-sans text-xs font-bold uppercase ${listing.category === 'Food'
                                                        ? 'bg-harvest-green text-white'
                                                        : listing.category === 'Education'
                                                            ? 'bg-amber-500 text-white'
                                                            : 'bg-earth-brown text-white'
                                                    }`}
                                            >
                                                {listing.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-sans font-semibold text-gray-900">
                                                ${listing.price.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-block rounded-full px-3 py-1 font-sans text-xs font-semibold ${listing.status === 'Active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                {listing.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-9 w-9 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                    aria-label={`Edit ${listing.title}`}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-9 w-9 border-2 border-red-500 text-red-500 shadow-[2px_2px_0px_0px_rgba(239,68,68,1)] hover:bg-red-50"
                                                    aria-label={`Delete ${listing.title}`}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredListings.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="font-sans text-gray-500">
                                No listings found matching "{searchQuery}"
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* Stub Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 p-6 text-center"
                >
                    <p className="font-sans text-gray-500">
                        🚧 This is a stub dashboard. Backend integration coming soon!
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
