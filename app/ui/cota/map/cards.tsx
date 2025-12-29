'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sections } from '@/app/lib/cota/data';

interface Card { 
    characterId: string;
}

export default function Card({ characterId }: Card) {
    const pathname = usePathname();

    return (
        <nav className='flex space-x-1 mb-8'>
            {sections.map((section) => {
                const href = `/cota/interactive-map/${characterId}/${section.slug}`;
                const isActive = pathname === href;

                return (
                    <Link
                        key={section.slug}
                        href={href}
                        className={`card px-4 py-2 font-medium transition-colors ${
                            isActive
                            ? 'border-b-2 border-carnival-300 text-carnival-300 dark:text-carnival-pink'
                            : 'text-carnival-500 dark:text-carnival-100  hover:text-carnival-400'
                        }`}
                    >
                            {section.title}
                    </Link>
                )
            })}
        </nav>
    )
}
