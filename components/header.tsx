'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    return (
        <header className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link className="flex items-center gap-2" href={"/"}>
                    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="40" stroke="#14b8a6" strokeWidth="6" fill="none" />
                        <circle cx="50" cy="50" r="6" fill="#14b8a6" />
                    </svg>

                    <span className="text-xl font-bold">ITUGUI</span>
                </Link>

                <nav className="hidden md:flex space-x-4">
                    <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
                    <a href="/blog" className="hover:text-blue-400 transition-colors">Posts</a>
                </nav>

                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <nav className="px-4 pt-2 pb-4 space-y-2">
                        <a href="/about" className="block hover:text-blue-400 transition-colors">About</a>
                        <a href="/blog" className="block hover:text-blue-400 transition-colors">Posts</a>
                    </nav>
                </div>
            )}
        </header>
    )
}