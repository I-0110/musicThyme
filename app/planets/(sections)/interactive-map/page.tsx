import Nav from '@/app/ui/nav';
import { teachers } from '@/app/ui/fonts';
import BoardMap from '@/app/ui/planets/map/boardmap';
import ScrollToTop from '@/app/ui/scroll-to-top';
import { planetMvt } from '@/app/lib/planets/main-data';

export default function Page() {
  return (
    <div className="flex flex-col">
        <Nav />
        <div className="flex min-h-screen flex-col bg-[url('/ThePlanets.jpg')] bg-cover bg-center p-2">
            <div className="mt-2 flex justify-center">
                <div className='flex flex-col justify-center text-center gap-2 rounded-lg bg-planet-teal p-3 md:w-2/5 md:px-10'>
                    <p className={`${teachers.className} text-xl text-white md:text-xl md:leading-normal`}>
                        <strong>The Planets</strong>
                    </p>
                    <p className='block sm:hidden text-sm italic'>(Click the image of the planet to explore more)</p>
                </div>
            </div>
            <div>
                <BoardMap 
                    planets={planetMvt}
                />
                <ScrollToTop />
            </div>
        </div>
    </div>
  );
}