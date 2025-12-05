import Nav from '@/app/ui/nav';
import { teachers } from '../ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col">
        <Nav />
        <div className="flex min-h-screen flex-col bg-white dark:bg-black p-6">
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className='flex flex-col justify-center gap-4 rounded-lg bg-thyme-100 p-6 md:w-2/5 md:px-10'>
                  <p className={`${teachers.className} text-xl text-thyme-500 md:text-3xl md:leading-normal`}>
                    <strong>Peter and the Wolf<br/> by Sergei Prokofiev</strong>
                    <br/>
                    Learn about the composer, instruments, themes in music, and prove yourself with our interactive game.
                  </p>
                  <Link
                  href="/patw/listening-game"
                  className="flex items-center gap-5 self-start rounded-lg bg-thyme-400 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-thyme-300 md:text-base"
                  >
                    <span>Start Listening Game</span> <ArrowRightIcon className="w-5 md:w-6" />
                  </Link>
                </div>
            </div>
        </div>
    </div>
  );
}