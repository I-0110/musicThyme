import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface Breadcrumb {
    planetId: string;
    planetName: string;
    currentSection: string;
}

export default function Breadcrumb({ planetId, planetName, currentSection }: Breadcrumb) {
    const breadcrumbs = [
        {
            label: 'Interactive Map',
            href: '/planets/interactive-map',
            active: false
        },
        {
            label: planetName + `'s` + ' ' + currentSection.charAt(0).toUpperCase() + currentSection.slice(1),
            href: `/planets/interactive-map/${planetId}/${currentSection}`,
            active: true
        }
    ];

    return (
        <nav aria-label='Breadcrumb'
        className='flex flex-col justify-center text-center gap-2 rounded-lg bg-planet-cyan p-3'>
            <ol className='flex text-xl md:text-2xl items-center'>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.href}
                        aria-current={breadcrumb.active}
                        className={breadcrumb.active ? 'text-planet-deep' : 'text-planet-grape'}
                    >
                        <Link href={breadcrumb.href}>{breadcrumb.label}
                        </Link>
                        {index < breadcrumbs.length - 1 ? (
                            <span className='mx-3 inline-block'>
                                <ChevronRightIcon className='w-2 h-2 text-planet-cobalt' />
                            </span>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    );
}