'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    return (
        <header className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link className="flex items-center" href={"/"}>
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                    >
                        <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3B82F6" />
                                <stop offset="100%" stopColor="#8B5CF6" />
                            </linearGradient>
                        </defs>
                        <g fill="url(#logoGradient)">
                            <path d="M8.066 18.943l6.5-14.5A1 1 0 0115.934 5.057l-6.5 14.5a1 1 0 01-1.368.386 1 1 0 01-.386-1.368l6.5-14.5-6.5 14.5z" />
                            <path d="M2.22 11.47L6.47 7.22a1 1 0 011.06-.22 1 1 0 01.22 1.5L3.81 12l3.72 3.72a1 1 0 01-1.41 1.41l-4.25-4.25a1 1 0 010-1.41l4.25-4.25-4.25 4.25z" />
                            <path d="M16.47 7.22a1 1 0 011.06-.22 1 1 0 01.22 1.06l-.07.16L21.78 12l-4.25 4.25a1 1 0 01-1.41 0 1 1 0 01-.08-1.32l.08-.1L20.19 12l-3.72-3.72a1 1 0 010-1.41l4.25-4.25-4.25 4.25z" />
                        </g>
                    </svg>
                    <span className="text-xl font-bold">IOAN TUGUI</span>
                </Link>

                <nav className="hidden md:flex space-x-4">
                    <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
                    <a href="/posts" className="hover:text-blue-400 transition-colors">Posts</a>
                    <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
                </nav>

                {/* <div className="hidden md:block">
                    <Button className='w-0 h-0' variant="outline"></Button>
                </div> */}

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
                        <a href="/posts" className="block hover:text-blue-400 transition-colors">Posts</a>
                        <a href="/contact" className="block hover:text-blue-400 transition-colors">Contact</a>
                    </nav>
                    {/* <div className="px-4 pb-4">
                        <Button variant="outline" className="w-full">Get Started</Button>
                    </div> */}
                </div>
            )}
        </header>
    )
}