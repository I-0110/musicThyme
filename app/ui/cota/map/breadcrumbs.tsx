import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface Breadcrumb {
    characterId: string;
    characterName: string;
    currentSection: string;
}

export default function Breadcrumb({ characterId, characterName, currentSection }: Breadcrumb) {
    const breadcrumbs = [
        {
            label: 'Interactive Map',
            href: '/cota/interactive-map',
            active: false
        },
        {
            label: characterName,
            href: `/cota/interactive-map/${characterId}/overview`,
            active: false
        },
        {
            label: currentSection.charAt(0).toUpperCase() + currentSection.slice(1),
            href: `/cota/interactive-map/${characterId}/${currentSection}`,
            active: true
        }
    ];

    return (
        <nav aria-label='Breadcrumb'
        className='flex flex-col justify-center text-center gap-2 rounded-lg bg-carnival-200 p-3'>
            <ol className='flex text-xl md:text-2xl items-center'>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.href}
                        aria-current={breadcrumb.active}
                        className={breadcrumb.active ? 'text-carnival-100 dark:text-carnival-pink' : 'text-carnival-400'}
                    >
                        <Link href={breadcrumb.href}>{breadcrumb.label}
                        </Link>
                        {index < breadcrumbs.length - 1 ? (
                            <span className='mx-3 inline-block'>
                                <ChevronRightIcon className='w-2 h-2 text-carnival-500' />
                            </span>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

