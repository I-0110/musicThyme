'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, UserIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import MusicLogo from './music-logo';

export default function Nav() {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { 
            href: '/', 
            label: 'Home' 
        },
        { 
            href: '/metronome', 
            label: 'Metronome' 
        },
        { 
            href: '#', 
            label: 'Tuner' 
        },
        { 
            href: 'flutists', 
            label: 'Flutists' 
        },
        { 
            href: 'patw', 
            label: 'Peter and the Wolf' 
        },
        {
          href: 'cota',
          label: 'The Carnival of the Animals'
        },
    ]

    return (
    <nav className="sticky top-0 z-50 bg-thyme-500 border-b border-thyme-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile hamburger - left side */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-thyme-200 hover:text-thyme-100"
            aria-label="Toggle menu"
          >
            {open ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>

          {/* Logo - centered on mobile, left on desktop */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-thyme-100 lg:shrink-0"
          >
            <MusicLogo />
          </Link>

          {/* Desktop Navigation - center */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-thyme-200 hover:text-thyme-100 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-thyme-200 hover:text-thyme-100" aria-label="Search">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
            <button className="p-2 text-thyme-200 hover:text-thyme-100" aria-label="Account">
              <UserIcon className="w-6 h-6" />
            </button>
            <button className="p-2 text-thyme-200 hover:text-thyme-100 relative" aria-label="Practice Log">
              <PencilSquareIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-thyme-500 border-t border-thyme-400">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-3 text-thyme-200 hover:bg-thyme-300 hover:text-thyme-100 rounded-md font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
)};