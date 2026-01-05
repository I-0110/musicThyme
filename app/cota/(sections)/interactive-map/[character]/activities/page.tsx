import { notFound } from "next/navigation";
import { getCharacterById, getCharacterDetails, getCharacterInstruments, getCharacterLessonPlan } from "@/app/lib/cota/functions";
import Nav from "@/app/ui/nav";
import Breadcrumbs from '@/app/ui/cota/map/breadcrumbs';
import Card from "@/app/ui/cota/map/cards";
import Link from 'next/link';
import Image from 'next/image';
import { EnvelopeIcon, PlayCircleIcon, SparklesIcon, SquaresPlusIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "@/app/ui/scroll-to-top";
import ZoomImg from "@/app/ui/cota/map/zoomImg";


export default async function Page({
    params
}: {
    params: Promise<{ character: string }>
}) {
    const { character: characterId } = await params;
    const character = getCharacterById(characterId);
    const lesson = getCharacterLessonPlan(characterId);
    const instrument = getCharacterInstruments(characterId);
    const details = getCharacterDetails(characterId);
   
    if (!character) {
        notFound();
    }

    return (
        <div className="flex flex-col">
            <Nav />
            <div className="bg-[url('/circus.jpg')] bg-cover bg-center mt-2 flex justify-center">
                <div className='flex flex-col justify-center text-center gap-2 rounded-l-lg bg-carnival-100 p-3 md:w-2/5 md:px-10'>
                    <p className="text-carnival-500">
                        <strong>The Carnival of the Animals: {character.characterName}</strong>
                    </p>
                </div>
                <Link
                  href="/cota/interactive-map"
                  className="inline-flex items-center gap-2 bg-carnival-100 text-carnival-500 px-6 py-3 rounded-r-lg text-lg font-bold hover:bg-red-600 hover:text-white transition-colors"
                >
                  <XMarkIcon className='w-4 h-4' />
                </Link>
            </div>
            <Breadcrumbs
                characterId={character.id}
                characterName={character.characterName}
                currentSection='activities'
            />

            <Card characterId={character.id} />

            {/* Stacking Cards Container */}
            <div className='flex flex-col items-center'>
                {/* Card 1: Lesson Plan */}
                <div className='card_content bg-white p-6'>
                    {lesson?.activities && (lesson.activities?.activity1 || lesson.activities?.activity2) && (
                        <div className='w-full max-w-3xl'>
                            <div className='card_content bg-carnival-pink rounded-xl shadow-lg p-2 border-2 border-carnival-pink'>
                                <h2 className="text-2xl font-bold text-carnival-100 mb-4 text-center flex items-center justify-center gap-2">
                                    <SparklesIcon className="w-8 h-8" />
                                    Let&apos;s Play!
                                </h2>
                                <p className="text-center text-carnival-100 text-lg mb-2 font-semibold">
                                    Try these activities while listening to {character.characterName}&apos;s Theme:
                                </p>
                                <ul className="grid grid-cols-2 md:grid-rows-2 shrink gap-2">
                                    {lesson.activities.activity1 && (
                                        <li className="bg-carnival-pink text-white border-2 border-dotted hover:border-none hover:bg-carnival-yellow hover:text-black hover:shadow-lg p-4 rounded-lg text-center transition-transform">
                                            <div className="font-semibold">{lesson.activities.activity1}</div>
                                            <div>
                                                <p>Categories:</p>
                                                <p className="italic">
                                                {lesson.activities.activityCat1.length === 1
                                                    ? lesson.activities.activityCat1[0].charAt(0).toUpperCase() + 
                                                    lesson.activities.activityCat1[0].slice(1)
                                                    : lesson.activities.activityCat1
                                                        .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
                                                        .join(', ')
                                                        .replace(/,([^,]*)$/, ' and$1') // Replace last comma with ' and'
                                                }
                                                </p>
                                            </div>
                                        </li>
                                    )}
                                    {lesson.activities.activity2 && (
                                        <li className="bg-carnival-pink text-white border-2 border-dotted hover:border-none hover:bg-carnival-yellow hover:text-black hover:shadow-lg p-4 rounded-lg text-center transition-transform">
                                            <div className="font-semibold">{lesson.activities.activity2}</div>
                                            <div>
                                                <p>Categories:</p>
                                                <p className="italic">
                                                {lesson.activities.activityCat2.length === 1
                                                    ? lesson.activities.activityCat2[0].charAt(0).toUpperCase() + 
                                                    lesson.activities.activityCat2[0].slice(1)
                                                    : lesson.activities.activityCat2
                                                        .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
                                                        .join(', ')
                                                        .replace(/,([^,]*)$/, ' and$1') // Replace last comma with ' and'
                                                }
                                                </p>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
    
                {/* Card 2: Activity - Video 1 */}
                {lesson?.video.youtube && (
                    <div className='card w-full max-w-4xl'>
                        <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                            <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">Video Activity</h2>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${lesson.video.youtube}`}
                                        title={`${lesson.characterId} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-lg'
                                    />
                                </div>
                                <p>Categories:</p>
                                <p className="italic">
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
                                    <div className="rounded-lg mt-4 hover:bg-carnival-yellow">
                                        <h3 className="font-semibold">Notes:</h3>
                                        <p>{lesson?.videoNotes}</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {/* Card 2: Activity - Video 2 */}
                {lesson?.video2?.youtube && (
                    <div className='card w-full max-w-4xl'>
                        <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                            <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">Video Activity</h2>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${lesson.video2.youtube}`}
                                        title={`${lesson.characterId} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-lg'
                                    />
                                </div>
                                <p>Categories:</p>
                                <p className="italic">
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
                                    <div className="rounded-lg mt-4 hover:bg-carnival-yellow">
                                        <h3 className="font-semibold">Notes:</h3>
                                        <p>{lesson?.videoNotes2}</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {/* Video 3? */}
                {lesson?.video3?.youtube && (
                    <div className='card w-full max-w-4xl'>
                        <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                            <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">Video Activity</h2>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${lesson.video3.youtube}`}
                                        title={`${lesson.characterId} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-lg'
                                    />
                                </div>
                                <p>Categories:</p>
                                <p className="italic">
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
                                    <div className="rounded-lg mt-4 hover:bg-carnival-yellow">
                                        <h3 className="font-semibold">Notes:</h3>
                                        <p>{lesson?.videoNotes3}</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {/* Card 3: Instrument Check! */}
                {instrument && (instrument.mainFamily || instrument.instruments) && (
                    <div className='card w-full max-w-3xl'>
                        <div className='card_content sticky top-[20vh] bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                            <h2 className="text-2xl font-bold text-carnival-500 mb-6 text-center">What instruments did you hear on {character.characterName}&apos;s Theme?</h2>
                            
                            {/* Main Families */}
                            {instrument.mainFamily && instrument.mainFamily.length > 0 && (
                                <div className="flex items-center gap-2 mb-6">
                                    <h3 className="text-xl font-bold text-carnival-300 mb-3">Instrument Families:</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {instrument.mainFamily.map((family, index) => (
                                            <span key={index} className="bg-carnival-200 hover:bg-carnival-yellow hover:text-carnival-500 text-white px-5 py-2 rounded-full text-lg font-bold capitalize">
                                                {family}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Specific Instruments */}
                            {instrument.instruments && instrument.instruments.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-carnival-300 mb-3">Instruments:</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {instrument.instruments.map((instr, index) => (
                                            <div key={index} className="bg-carnival-100 hover:bg-carnival-pink hover:text-carnival-100 p-3 rounded-lg text-center">
                                                <span className="text-lg font-semibold capitalize">{instr}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {/* <div className='relative items-center w-64 h-64'> */}
                                        {/* <Image
                                            src={instrument?.imageUrl || '/circus.jpg'}
                                            alt={character.characterName}
                                            fill
                                            className='object-contain rounded-lg' 
                                        />
                                    </div> */}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Card 4: Parachutes Activities */}
                {lesson?.parachuteVideo?.youtube && (
                    <div className='card w-full max-w-4xl'>
                        <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                            <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">Parachute Activity</h2>
                            <div className='relative w-full aspect-video'>
                                <iframe 
                                    src={`https://www.youtube.com/embed/${lesson.parachuteVideo.youtube}`}
                                    title={`${lesson.characterId} - YouTube video player`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                    className='absolute top-0 left-0 w-full h-full rounded-lg'
                                />
                            </div>
                            {lesson?.parachute && ( 
                                <div className="rounded-lg mt-4 hover:bg-carnival-yellow">
                                    <h3 className="font-semibold">How to play:</h3>
                                    <p>{lesson?.parachute}</p>
                                </div>
                            )}

                            {/* Clickable thumbnails images */}
                            <ZoomImg 
                                images={lesson?.parachuteImage || []}
                                characterName={character.characterName}
                            />
                        </div>
                    </div>
                )}

                {/* Card 5: Movement Activities */}
                {details?.moves && details.moves.length > 0 && (
                    <div className='card w-full max-w-3xl'>
                        <div className='card_content bg-carnival-blue rounded-xl shadow-lg p-6 border-2 border-carnival-blue'>
                            <h2 className="text-2xl font-bold text-carnival-100 mb-6 text-center flex items-center justify-center gap-2">
                                <SparklesIcon className="w-8 h-8" />
                                Let&apos;s Move!
                            </h2>
                            <p className="text-center text-carnival-100 text-lg mb-4 font-semibold">
                                Try these movements while listening to {character.characterName}:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {details.moves.map((move, index) => (
                                    <div key={index} className="bg-carnival-yellow p-4 rounded-lg text-center shadow-md transition-transform">
                                        <span className="text-lg font-bold capitalize text-carnival-500">{move}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Card 5: Credits */}
                <div className='card w-full max-w-4xl'>
                    <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
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
                                                className="text-carnival-blue hover:underline"
                                            >
                                                {creator}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-2">Activities for {lesson?.characterId} were made by:</p>
                                <ul className="list-disc list-inside">
                                    {lesson?.credits?.activitiesCreatedBy?.map((creator, index) => (
                                        <li key={index}>
                                            {creator}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-2">Highly good resources for {lesson?.characterId}:</p>
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
                                    src={character.imageUrl || '/circus.jpg'}
                                    alt={character.characterName}
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