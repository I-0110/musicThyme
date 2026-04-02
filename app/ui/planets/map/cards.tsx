'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sections } from '@/app/lib/planets/main-data';

interface Card { 
    planetId: string;
}

export default function Card({ planetId }: Card) {
    const pathname = usePathname();

    return (
        <nav className='flex space-x-1 mb-8 overflow-x-auto scrollbar-hide'>
            {sections.map((section) => {
                const href = `/planets/interactive-map/${planetId}/${section.slug}`;
                const isActive = pathname === href;

                return (
                    <Link
                        key={section.slug}
                        href={href}
                        className={`card px-4 py-2 font-medium transition-colors ${
                            isActive
                            ? 'border-b-2 border-planet-cyan text-whihte'
                            : 'text-white hover:text-planet-cyan'
                        }`}
                    >
                            {section.title}
                    </Link>
                )
            })}
        </nav>
    )
}
