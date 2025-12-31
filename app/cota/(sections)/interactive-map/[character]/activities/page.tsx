import { notFound } from "next/navigation";
import { getCharacterById, getCharacterDetails, getCharacterInstruments, getCharacterLessonPlan } from "@/app/lib/cota/functions";
import Nav from "@/app/ui/nav";
import Breadcrumbs from '@/app/ui/cota/map/breadcrumbs';
import Card from "@/app/ui/cota/map/cards";
import Link from 'next/link';
import Image from 'next/image';
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
                    {lesson?.activities && lesson.activities.length > 0 && (
                        <div className='w-full max-w-3xl'>
                            <div className='card_content bg-carnival-pink rounded-xl shadow-lg p-6 border-2 border-carnival-pink'>
                                <h2 className="text-2xl font-bold text-carnival-100 mb-6 text-center flex items-center justify-center gap-2">
                                    <SparklesIcon className="w-8 h-8" />
                                    Let&apos;s Play!
                                </h2>
                                <p className="text-center text-carnival-100 text-lg mb-4 font-semibold">
                                    Try these movements while listening to {character.characterName}:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {lesson.activities.map((act, index) => (
                                        <div key={index} className="bg-carnival-yellow p-4 rounded-lg text-center shadow-md hover:bg-carnival-100 transition-transform">
                                            <span className="text-lg font-bold text-carnival-500">{act}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
    
                {/* Card 2: Video - CENTERED with max-width */}
                <div className='card w-full max-w-4xl'>
                    <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                        <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">Activity&apos;s Example</h2>
                        {lesson?.video1.youtube && (
                            <div className='w-full'>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${lesson.video1.youtube}`}
                                        title={`${lesson.characterId} - YouTube video player`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen
                                        className='absolute top-0 left-0 w-full h-full rounded-lg'
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Card 3: Instrument Check! */}
                {instrument && (instrument.mainFamily || instrument.instruments) && (
                    <div className='card w-full max-w-3xl'>
                        <div className='card_content sticky top-[20vh] bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                            <h2 className="text-2xl font-bold text-carnival-500 mb-6 text-center">What instruments did you listen on {character.characterName}&apos;s Theme?</h2>
                            
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
                                    <div className='relative items-center w-64 h-64'>
                                        <Image
                                            src={instrument?.imageUrl || '/circus.jpg'}
                                            alt={character.characterName}
                                            fill
                                            className='object-contain rounded-lg' 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Card 4: Movement Activities */}
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

                {/* Card 5: Discover More */}
                <div className='card w-full max-w-4xl'>
                    <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                        <div className="flex flex-col items-center gap-4">
                            {/* <Link
                            href="/content"
                            className="inline-flex items-center gap-2 bg-carnival-100 text-carnival-500 px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-600 hover:text-white transition-colors"
                            >
                                Continue
                                <ArrowRightIcon className='w-4 h-4' />
                            </Link> */}
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
            </div>
        </div>
    )
};