import { notFound } from "next/navigation";
import { getCharacterById, getCharacterDetails } from "@/app/lib/cota/functions";
import Nav from "@/app/ui/nav";
import Breadcrumbs from '@/app/ui/cota/map/breadcrumbs';
import Card from "@/app/ui/cota/map/cards";
import Link from 'next/link';
import Image from 'next/image';
import { ChartBarIcon, FaceSmileIcon, ForwardIcon, SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";

export default async function Page({
    params
}: {
    params: Promise<{ character: string }>
}) {
    const { character: characterId } = await params;
    const character = getCharacterById(characterId);
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
                currentSection='overview'
            />

            <Card characterId={character.id} />

            {/* Stacking Cards Container */}
            <div className='flex flex-col items-center'>
                {/* Card 1: Overview */}
                <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                    <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">
                        {character.characterName}&apos;s Information
                    </h2>
                    
                    {/* Centered content */}
                    <div className='flex flex-col items-center gap-4'>
                        <div className='text-center space-y-2'>
                            <p className="text-lg"><strong>Title:</strong> {character.title}</p>
                            <p className="text-lg"><strong>Character:</strong> {character.characterName}</p>
                            <p className="text-lg"><strong>Movement:</strong> #{character.orderNumber}</p>
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
    
                {/* Card 2: Video - CENTERED with max-width */}
                <div className='card w-full max-w-4xl'>
                    <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                        <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">Watch & Listen</h2>
                        {character.video.youtube && (
                            <div className='w-full'>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${character.video.youtube}`}
                                        title={`${character.characterName} - YouTube video player`}
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

                {/* Card 3: Musical Elements (Mood, Tempo, Dynamics) */}
                {details && (
                    <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                        <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">
                            {character.characterName}&apos;s Music&apos;s Mood
                        </h2>
                        
                        {/* Mood */}
                        {details.mood && details.mood.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-carnival-500 mb-3">
                                    <FaceSmileIcon className="w-8 h-8" />
                                    Mood:
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {details.mood.map((mood, index) => (
                                        <span key={index} className="bg-carnival-200 text-carnival-500 px-4 py-2 rounded-full text-lg font-semibold capitalize">
                                            {mood}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Card 4: Musical Elements (Mood, Tempo, Dynamics) */}
                {details && (
                    <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                        <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">
                            {character.characterName}&apos;s Music&apos;s Tempo
                        </h2>            
                        {/* Tempo */}
                        {details.tempo && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-carnival-500 mb-3">
                                    <ForwardIcon className="w-8 h-8" />
                                    Tempo:
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {details.tempo.map((tempo, index) => (
                                        <span key={index} className="bg-carnival-200 text-carnival-500 px-4 py-2 rounded-full text-lg font-semibold capitalize">
                                            {tempo}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Card 5: Musical Elements (Mood, Tempo, Dynamics) */}
                {details && (
                    <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                        <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">
                            {character.characterName}&apos;s Music&apos;s Dynamics
                        </h2> 
                            {/* Dynamics */}
                            {details.dynamics && details.dynamics.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-carnival-500 mb-3">
                                        <ChartBarIcon className="w-8 h-8" />
                                        Dynamics:</h3>
                                    <ul className="space-y-2">
                                        {details.dynamics.map((dynamic, index) => (
                                            <li key={index} className="flex items-center gap-3 bg-carnival-200 text-carnival-500 px-4 py-2 rounded-full text-lg font-semibold capitalize">
                                                <MusicalNoteIcon className="w-6 h-6" />
                                                <span className="text-lg capitalize">{dynamic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                    </div>
                )}

                {/* Card 6: Movement Activities */}
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

                {/* Card 7: Discover More */}
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