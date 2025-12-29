import { notFound } from "next/navigation";
import { getCharacterById, getCharacterDetails, getVocabulary } from "@/app/lib/cota/functions";
import Nav from "@/app/ui/nav";
import Breadcrumbs from '@/app/ui/cota/map/breadcrumbs';
import Card from "@/app/ui/cota/map/cards";
import Link from 'next/link';
import { LightBulbIcon, SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default async function Page({
    params
}: {
    params: Promise<{ character: string }>
}) {
    const { character: characterId } = await params;

    const character = getCharacterById(characterId);
    const vocab = getVocabulary(characterId);
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
                currentSection='vocabulary'
            />

            <Card characterId={character.id} />

            {/* Stacking Cards Container */}
            <div className='flex flex-col items-center'>
                {vocab && vocab.length > 0 && (
                    <div className='w-full max-w-4xl'>
                        <div className='bg-white p-6'>
                            {/* Cards! */}
                            <div className="grid grid-rows-2 md:grid-rows-3 gap-4">
                                {vocab && vocab.length > 0 && vocab.map((item, index) => (
                                    <div key={index} className="card_content sticky top-[20vh] bg-white border-2 border-carnival-300 rounded-lg p-5 hover:shadow-lg transition-shadow">
                                        <h3 className="text-xl font-bold text-carnival-400 mb-2">{item.term}</h3>
                                        <p className="text-carnival-500 mb-3 font-medium">{item.definition}</p>
                                        {item.example && (
                                            <div className="bg-carnival-yellow p-3 rounded-lg">
                                                <p className="text-sm italic text-carnival-500 flex items-center gap-1">
                                                    <LightBulbIcon className="w-6 h-6" />
                                                    <span className="font-bold"> Example:</span> {item.example}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

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

                {/* Card 3: Movement Activities */}
                {details?.moves && details.moves.length > 0 && (
                    <div className='card w-full max-w-3xl'>
                        <div className='card_content sticky top-[20vh] bg-carnival-blue rounded-xl shadow-lg p-6 border-2 border-carnival-blue'>
                            <h2 className="text-2xl font-bold text-carnival-100 mb-6 text-center flex items-center justify-center gap-2">
                                <SparklesIcon className="w-8 h-8" />
                                Let&apos;s Move!
                            </h2>
                            <p className="text-carnival-100 text-center text-lg mb-4 font-semibold">
                                Try these movements while listening to {character.characterName}:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {details.moves.map((move, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg text-center shadow-md hover:scale-105 transition-transform">
                                        <span className="text-lg font-bold capitalize text-carnival-500">{move}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};