import { Bars3Icon, XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function XButton () {
    return <XMarkIcon className="w-6 h-6" />
}

export function Hamburger () {
    return <Bars3Icon className="w-6 h-6" />
}

export function Button ({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                'flex h-10 items-center rounded-lg bg-thyme-300 px-4 text-sm font-medium text-white transition-colors hover:bg-thyme-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-thyme-500 active:bg-thyme-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                className,
            )}
        >
            {children}
        </button>
    );
}

export function AddPractice () {
    return <PencilSquareIcon className='w-6 h-6' />
}