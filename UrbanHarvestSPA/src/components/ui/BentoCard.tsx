import { type ElementType } from 'react'
import { Link } from 'react-router-dom'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface BentoCardProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
    title: string
    description: string
    icon: ElementType
    link: string
    colorClass: string // e.g., "bg-harvest-green"
    spanClass?: string // e.g., "md:col-span-2"
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

export function BentoCard({
    title,
    description,
    icon: Icon,
    link,
    colorClass,
    spanClass = '',
    className = '',
    ...props
}: BentoCardProps) {
    return (
        <motion.div
            variants={itemVariants}
            className={`group ${spanClass} ${className}`}
            {...props}
        >
            <Link
                to={link}
                className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2"
                aria-label={`Explore ${title}`}
            >
                <motion.div
                    whileHover={{ y: -6 }}
                    className="relative h-full overflow-hidden rounded-2xl border-3 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:p-8"
                >
                    {/* Icon */}
                    <div
                        className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl border-2 border-black ${colorClass} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
                    >
                        <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Content */}
                    <h2 className="mb-2 font-heading text-xl font-bold text-gray-900 md:text-2xl">
                        {title}
                    </h2>
                    <p className="mb-4 font-sans text-gray-600">
                        {description}
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
    )
}
