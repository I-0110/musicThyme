import { notFound } from "next/navigation";
import { 
    getPlanetById, 
    // getPlanetDetails, 
    getPlanetInstruments, 
    getPlanetLessonPlan 
} from "@/app/lib/planets/functions";
import Nav from "@/app/ui/nav";
import Breadcrumbs from '@/app/ui/planets/map/breadcrumbs';
import Card from "@/app/ui/planets/map/cards";
import Link from 'next/link';
import Image from 'next/image';
import { EnvelopeIcon, PlayCircleIcon, SquaresPlusIcon, UsersIcon, XMarkIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "@/app/ui/scroll-to-top";

export default async function Page({
    params
}: {
    params: Promise<{ planet: string }>
}) {
    const { planet: planetId } = await params;
    const planet = getPlanetById(planetId);
    const lesson = getPlanetLessonPlan(planetId);
    const instrument = getPlanetInstruments(planetId);
    // const details = getPlanetDetails(planetId);
   
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
            <Breadcrumbs
                planetId={planet.id}
                planetName={planet.planetName}
                currentSection='activities'
            />

            <Card planetId={planet.id} />

            {/* Stacking Cards Container */}
            <div className="bg-[url('/galaxy.jpg')] bg-center mt-2 flex flex-col items-center">
    
                {/* Card 1: Activity - Video 1 */}
                <div className='card_content w-full max-w-4xl'>
                {lesson?.video && (
                    <div className='card'>
                        <div className='card_content bg-planet-teal/65 dark:bg-planet-sea-green-200/65 border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">Watch Summary:</h2>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${lesson.video}`}
                                        title={`${lesson.planetId} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-lg'
                                    />
                                </div>
                                <p className="text-white">Categories:</p>
                                <p className="italic text-white">
                                {lesson?.videoCat.length === 1
                                    ? lesson.videoCat[0].charAt(0).toUpperCase() + 
                                    lesson.videoCat[0].slice(1)
                                    : lesson?.videoCat
                                        .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
                                        .join(', ')
                                        .replace(/,([^,]*)$/, ' and$1') // Replace last comma with ' and'
                                }
                                </p>
                                {lesson?.videoNotes && ( 
                                    <div className="rounded-lg mt-4 hover:bg-planet-grape">
                                        <h3 className="font-semibold">Notes:</h3>
                                        <p>{lesson?.videoNotes}</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )}
                </div>

                {/* Card 2: Activity - Video 2 */}
                {lesson?.video2 && (
                    <div className='card w-full max-w-4xl'>
                        <div className='card_content bg-planet-teal/65 dark:bg-planet-sea-green-200/65 border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">Video Activity</h2>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${lesson.video2}`}
                                        title={`${lesson.planetId} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-lg'
                                    />
                                </div>
                                <p className="text-white">Categories:</p>
                                <p className="italic text-white">
                                    {lesson?.videoCat2?.length === 1
                                        ? lesson?.videoCat2[0].charAt(0).toUpperCase() + 
                                        lesson?.videoCat2[0].slice(1)
                                        : lesson?.videoCat2
                                            ?.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
                                            .join(', ')
                                            .replace(/,([^,]*)$/, ' and$1') // Replace last comma with ' and'
                                    }
                                </p>
                                {lesson?.videoNotes2 && ( 
                                    <div className="rounded-lg mt-4 hover:bg-planet-grape">
                                        <h3 className="font-semibold">Notes:</h3>
                                        <p>{lesson?.videoNotes2}</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {/* Video 3? */}
                {lesson?.video3 && (
                    <div className='card w-full max-w-4xl'>
                        <div className='card_content bg-planet-teal/65 dark:bg-planet-sea-green-200/65 border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">Video Activity</h2>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${lesson.video3}`}
                                        title={`${lesson.planetId} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-lg'
                                    />
                                </div>
                                <p className="text-white">Categories:</p>
                                <p className="italic text-white">
                                {lesson?.videoCat3?.length === 1
                                    ? lesson.videoCat3[0].charAt(0).toUpperCase() + 
                                    lesson.videoCat3[0].slice(1)
                                    : lesson?.videoCat3
                                        ?.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
                                        .join(', ')
                                        .replace(/,([^,]*)$/, ' and$1') // Replace last comma with ' and'
                                }
                                </p>
                                {lesson?.videoNotes3 && ( 
                                    <div className="rounded-lg mt-4 hover:bg-planet-grape">
                                        <h3 className="font-semibold">Notes:</h3>
                                        <p>{lesson?.videoNotes3}</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {/* Video 4? */}
                {lesson?.video4 && (
                    <div className='card w-full max-w-4xl'>
                        <div className='card_content bg-planet-teal/65 dark:bg-planet-sea-green-200/65 border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">Video Activity</h2>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${lesson.video4}`}
                                        title={`${lesson.planetId} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-lg'
                                    />
                                </div>
                                <p className="text-white">Categories:</p>
                                <p className="italic text-white">
                                {lesson?.videoCat4?.length === 1
                                    ? lesson.videoCat4[0].charAt(0).toUpperCase() + 
                                    lesson.videoCat4[0].slice(1)
                                    : lesson?.videoCat4
                                        ?.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
                                        .join(', ')
                                        .replace(/,([^,]*)$/, ' and$1') // Replace last comma with ' and'
                                }
                                </p>
                                {lesson?.videoNotes4 && ( 
                                    <div className="rounded-lg mt-4 hover:bg-planet-grape">
                                        <h3 className="font-semibold">Notes:</h3>
                                        <p>{lesson?.videoNotes4}</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {/* Music Theory? */}
                {lesson?.videoTheory && (
                    <div className='card w-full max-w-4xl'>
                        <div className='card_content bg-planet-teal/65 dark:bg-planet-sea-green-200/65 border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">Music Theory</h2>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${lesson.videoTheory}`}
                                        title={`${lesson.planetId} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-lg'
                                    />
                                </div>
                                <p className="text-white">Categories:</p>
                                <p className="italic text-white">
                                {lesson?.videoTheoryCat?.length === 1
                                    ? lesson.videoTheoryCat[0].charAt(0).toUpperCase() + 
                                    lesson.videoTheoryCat[0].slice(1)
                                    : lesson?.videoTheoryCat
                                        ?.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
                                        .join(', ')
                                        .replace(/,([^,]*)$/, ' and$1') // Replace last comma with ' and'
                                }
                                </p>
                                {lesson?.videoTheoryNotes && ( 
                                    <div className="rounded-lg mt-4 hover:bg-planet-grape">
                                        <h3 className="font-semibold">Notes:</h3>
                                        <p>{lesson?.videoTheoryNotes}</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {/* Card 3: Instrument Check! */}
                {instrument && (
                    <div className='card_content bg-planet-sea-green text-white border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">
                            {planet.planetName}&apos;s Music&apos;s Instruments:
                        </h2> 
                            {/* Instruments */}
                            {instrument.instruments && instrument.instruments.length > 0 && (
                                <div className="mb-6">
                                    <ul className="grid grid-cols-2 lg:grid-cols-4  space-y-2 gap-3">
                                        {instrument.instruments.map((instrument, index) => (
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

                {/* Card 4: Parachutes Activities */}
                {lesson?.parachuteVideo && (
                    <div className='card w-full max-w-4xl'>
                        <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                            <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">Parachute Activity</h2>
                            <div className='relative w-full aspect-video'>
                                <iframe 
                                    src={`https://www.youtube.com/embed/${lesson.parachuteVideo}`}
                                    title={`${lesson.planetId} - YouTube video player`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                    className='absolute top-0 left-0 w-full h-full rounded-lg'
                                />
                            </div>
                            {lesson?.parachute && ( 
                                <div className="rounded-lg mt-4 hover:bg-planet-grape">
                                    <h3 className="font-semibold">How to play:</h3>
                                    <p>{lesson?.parachute}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}


                {/* Card 5: Credits */}
                <div className='card w-full max-w-4xl'>
                    <div className='card_content bg-planet-sea-green text-white border-planet-cobalt rounded-xl shadow-lg border-2 p-6'>
                        <div className="flex flex-col items-center gap-4">
                            <div className="rounded-lg mt-4">
                                <h3 className="font-semibold text-center wrap-break-word">
                                    We are thankful for you.<br/> Our most important contribution for this project to work!
                                </h3>
                                <p className="mt-2">Our video makers channels. Please like and subscribe!</p>
                                <ul className="list-disc list-inside">
                                    {lesson?.credits?.videoCreatedBy?.map((creator, index) => (
                                        <li key={index}>
                                            <Link
                                                href={`https://www.youtube.com/@${creator}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-planet-cobalt hover:underline"
                                            >
                                                {creator}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-2">Activities for {lesson?.planetId} were made by:</p>
                                <ul className="list-disc list-inside">
                                    {lesson?.credits?.activitiesCreatedBy?.map((creator, index) => (
                                        <li key={index}>
                                            {creator}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-2">Highly good resources for {lesson?.planetId}:</p>
                                <ul className="list-disc list-inside">
                                    {lesson?.credits?.people?.map((creator, index) => (
                                        <li key={index} className="mt-3">
                                            <strong>{creator.name}</strong>
                                            {creator.description && (
                                                <span className="text-carnival-pink"> - {creator.description}</span>
                                            )}
                                            <div className="ml-5 mt-1 text-sm">
                                                {creator.email && (
                                                    <Link
                                                        href={`mailto:${creator.email}`}
                                                        className="flex items-center gap-2 text-carnival-blue hover:underline"
                                                    >
                                                        <EnvelopeIcon className="w-4 h-4" />
                                                        {creator.email}
                                                    </Link>
                                                )}
                                            </div>
                                            <div className="ml-5 mt-1 text-sm">
                                                {creator?.ytChannel && (
                                                    <div className="flex items-center gap-2 text-carnival-blue">
                                                        <PlayCircleIcon className="w-4 h-4" />                                                    
                                                        <Link
                                                            href={`https://www.youtube.com/@${creator.ytChannel}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:underline"
                                                        >
                                                            {creator.ytChannel}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-5 mt-1 text-sm">
                                                {creator?.tpt && (
                                                    <div className="flex items-center gap-2 text-carnival-blue">
                                                        <UsersIcon className="w-4 h-4" />                                                    
                                                        <Link
                                                            href={`https://www.teacherspayteachers.com/store/${creator.tpt}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:underline"
                                                        >
                                                            {creator.tpt}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-5 mt-1 text-sm">
                                                {creator?.otherLink && (
                                                    <div className="flex items-center gap-2 text-carnival-blue">
                                                        <SquaresPlusIcon className="w-4 h-4" />                                                    
                                                        <Link
                                                            href={`${creator.otherLink}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:underline"
                                                        >
                                                            {creator.otherLink}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='relative w-64 h-64'>
                                <Image
                                    src={planet.imageUrl || '/ThePlanets.jpg'}
                                    alt={planet.planetName}
                                    fill
                                    className='object-contain rounded-lg' 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <ScrollToTop />
            </div>
        </div>
    )
};