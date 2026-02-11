import { type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface BentoGridProps extends HTMLMotionProps<'div'> {
    children: ReactNode
    className?: string
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

export function BentoGrid({ children, className = '', ...props }: BentoGridProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={`grid gap-4 md:grid-cols-3 lg:gap-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    )
}
