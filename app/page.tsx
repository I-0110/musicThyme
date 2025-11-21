import Nav from '@/app/ui/nav';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import { teachers } from './ui/fonts';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Nav />
      <main className="flex min-h-screen flex-col bg-white dark:bg-black p-6">
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className='flex flex-col justify-center gap-4 rounded-lg bg-thyme-100 p-6 md:w-2/5 md:px-10'>
            <p className={`${teachers.className} text-xl text-thyme-500 md:text-3xl md:leading-normal`}>
              <strong>Welcome to Music Thyme!</strong>
              <br/>
              Start to track your practice here.
            </p>
            <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-thyme-400 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-thyme-300 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
          <div className="flex justify-center">
            {/* Add Hero Videos Here */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className='hidden md:block rounded-lg w-full h-full object-cover'
            >
              <source 
                src="/Flutist.mp4" 
                type="video/mp4" 
              />
            </video>
            <video
              autoPlay
              loop
              muted
              playsInline
              className='block md:hidden rounded-lg w-full h-auto'
            >
              <source 
                src="/Flutist.mp4" 
                type="video/mp4" 
              />
            </video>
          </div>
        </div>
      </main>
    </div>
  );
}
