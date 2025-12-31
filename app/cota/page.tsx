import Nav from '@/app/ui/nav';
import { teachers } from '../ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col">
        <Nav />
        <div className="flex min-h-screen flex-col bg-[url('/circus.jpg')] bg-cover bg-center p-6">
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className='flex flex-col justify-center gap-4 rounded-lg bg-carnival-100 p-6 md:w-2/5 md:px-10'>
                  <p className={`${teachers.className} text-xl text-carnival-500 md:text-3xl md:leading-normal`}>
                    <strong>The Carnival of the Animals<br/> by Camille Saint-Saëns</strong>
                    <br/>
                    Learn about the composer, instruments, themes in music, and prove yourself with our interactive game.
                  </p>
                  <Link
                  href="/cota/interactive-map"
                  className="flex items-center gap-5 self-start rounded-lg bg-carnival-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-carnival-300 md:text-base"
                  >
                    <span>Explore our Map</span> <ArrowRightIcon className="w-5 md:w-6" />
                  </Link>
                  <Link
                  href="/cota/listening-game"
                  className="flex items-center gap-5 self-start rounded-lg bg-carnival-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-carnival-300 md:text-base"
                  >
                    <span>Start Listening Game</span> <ArrowRightIcon className="w-5 md:w-6" />
                  </Link>
                </div>
            </div>
        </div>
    </div>
  );
}