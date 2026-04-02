import { notFound } from "next/navigation";
import { getPlanetById, getPlanetDetails } from '@/app/lib/planets/functions';
import Nav from "@/app/ui/nav";
// import Breadcrumbs from '@/app/ui/planets/map/breadcrumbs';
import Card from "@/app/ui/planets/map/cards";
import Link from 'next/link';
import Image from 'next/image';
import { ChartBarIcon, ForwardIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";
import ScrollToTop from "@/app/ui/scroll-to-top";

export default async function Page({
    params
}: {
    params: Promise<{ planet: string }>
}) {
    const { planet: planetId } = await params;
    const planet = getPlanetById(planetId);
    const details = getPlanetDetails(planetId);
   
    if (!planet) {
        notFound();
    }

    return (
        <div className="flex flex-col">
            <Nav />
            <div className="bg-[url('/ThePlanets.jpg')] bg-cover bg-center mt-2 flex justify-center">
                <div className='flex flex-col justify-center text-center gap-2 rounded-l-lg bg-planet-teal p-3 md:w-2/5 md:px-10'>
                    <p className="text-white">
                        <strong>The Planets: {planet.planetName}</strong>
                    </p>
                </div>
                <Link
                  href="/planets/interactive-map"
                  className="inline-flex items-center gap-2 bg-planet-sea-green text-white px-6 py-3 rounded-r-lg text-lg font-bold hover:bg-red-600 hover:text-white transition-colors"
                >
                  <XMarkIcon className='w-4 h-4' />
                </Link>
            </div>
            
            {/* <Breadcrumbs
                planetId={planet.id}
                planetName={planetName}
                currentSection='overview'
            /> */}

            <Card planetId={planet.id} />

            {/* Stacking Cards Container */}
            <div className="bg-[url('/galaxy.jpg')] bg-center mt-2 flex flex-col items-center">
                {/* Card 1: Overview */}
                <div className='card_content bg-planet-teal/65 dark:bg-planet-sea-green-200/65 rounded-lg shadow-lg
                transition-all duration-300'>
                    <h2 className="text-2xl font-bold text-white m-6 text-center">
                        {planet.planetName}&apos;s Information
                    </h2>
                    
                    {/* Centered content */}
                    <div className='flex flex-col items-center gap-4'>
                        <div className='text-center space-y-2 text-white'>
                            <p className="text-lg"><strong>Title:</strong> {planet.title}</p>
                            <p className="text-lg"><strong>Character:</strong> {planet.planetName}</p>
                            <p className="text-lg"><strong>Movement:</strong> #{planet.orderNumber}</p>
                        </div>
                        
                        <div className='relative w-64 h-64'>
                            <Image
                                src={planet.imageUrl || '/circus.jpg'}
                                alt={planet.planetName}
                                fill
                                className='object-contain rounded-lg' 
                            />
                        </div>
                    </div>
                </div>
    
                {/* Card 2: Video - CENTERED with max-width */}
                <div className='card w-full max-w-4xl'>
                    <div className='card_content bg-planet-teal/65 dark:bg-planet-sea-green-200/65 text-white border-planet-cobalt rounded-xl shadow-lg border-2 p-6  '>
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">Watch & Listen</h2>
                        {planet.youtube && (
                            <div className='w-full'>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${planet.youtube}`}
                                        title={`${planet.planetName} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-xl'
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Card 3: Video - CENTERED with max-width */}
                <div className='card w-full max-w-4xl'>
                    <div className='card_content bg-planet-teal/65 dark:bg-planet-sea-green-200/65 text-white border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">Full Movement Performance</h2>
                        {planet.fullMvt && (
                            <div className='w-full'>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${planet.fullMvt}`}
                                        title={`${planet.planetName} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-xl'
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Card 4: Musical Elements (Time Signature) */}
                {details && (
                    <div className='card_content bg-planet-sea-green text-white border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">
                            {planet.planetName}&apos;s Music&apos;s Time Signature
                        </h2>            
                        {/* Time Signature */}
                        {details.meter && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-3">
                                    <ForwardIcon className="w-8 h-8" />
                                    Time Signature:
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {details.meter.map((meter, index) => (
                                        <span key={index} className="bg-planet-grape/75 flex items-center justify-center p-4 content-start px-4 py-2 rounded-full text-lg font-semibold capitalize">
                                            {meter}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Card 5: Musical Elements (Tempo) */}
                {details && (
                    <div className='card_content bg-planet-sea-green text-white border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">
                            {planet.planetName}&apos;s Music&apos;s Tempo
                        </h2>            
                        {/* Time Signature */}
                        {details.tempo && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-3">
                                    <ForwardIcon className="w-8 h-8" />
                                    Tempo:
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {details.tempo.map((meter, index) => (
                                        <span key={index} className="bg-planet-grape/75 flex items-center justify-center p-4 content-start px-4 py-2 rounded-full text-lg font-semibold capitalize">
                                            {meter}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Card 6: Musical Elements (Dynamics) */}
                {details && (
                    <div className='card_content bg-planet-sea-green text-white border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">
                            {planet.planetName}&apos;s Music&apos;s Dynamics
                        </h2> 
                            {/* Dynamics */}
                            {details.dynamics && details.dynamics.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        <ChartBarIcon className="w-8 h-8" />
                                        Dynamics:</h3>
                                    <ul className="space-y-2">
                                        {details.dynamics.map((dynamic, index) => (
                                            <li key={index} className="flex items-center gap-3 bg-planet-grape text-white px-4 py-2 rounded-full text-lg font-semibold capitalize">
                                                <MusicalNoteIcon className="w-6 h-6" />
                                                <span className="text-lg capitalize">{dynamic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                    </div>
                )}

                {/* Card 7: Musical Elements (Instrumentation) */}
                {details && (
                    <div className='card_content bg-planet-sea-green text-white border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">
                            {planet.planetName}&apos;s Music&apos;s Instruments:
                        </h2> 
                            {/* Instruments */}
                            {details.instruments && details.instruments.length > 0 && (
                                <div className="mb-6">
                                    <ul className="grid grid-cols-2 lg:grid-cols-4  space-y-2 gap-3">
                                        {details.instruments.map((instrument, index) => (
                                            <li key={index} className="flex items-center gap-3 bg-planet-grape text-white px-4 py-2 rounded-full text-lg font-semibold capitalize">
                                                <MusicalNoteIcon className="w-6 h-6" />
                                                <span className="text-lg capitalize">{instrument}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                    </div>
                )}

                <ScrollToTop />               
            </div>
        </div>
    )
};