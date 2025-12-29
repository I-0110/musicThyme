import { notFound } from "next/navigation";
import { getCharacterById, getCharacterContent, getCharacterInstruments } from "@/app/lib/cota/functions";
import Nav from "@/app/ui/nav";
import Breadcrumbs from '@/app/ui/cota/map/breadcrumbs';
import Card from "@/app/ui/cota/map/cards";
import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon } from "@heroicons/react/24/outline";

export default async function Page({
    params
}: {
    params: Promise<{ character: string }>
}) {
    const { character: characterId } = await params;
    const character = getCharacterById(characterId);
    const content = getCharacterContent(characterId);
    const instruments = getCharacterInstruments(characterId);
   
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
                currentSection='content'
            />

            <Card characterId={character.id} />

            {/* Stacking Cards Container */}
            <div className='flex flex-col items-center'>
                {/* Card 1: Content */}
                <div className='card_content bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                    <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">
                        {character.characterName}&apos;s Facts
                    </h2>
                    
                    {/* Centered content */}
                    <div className='flex flex-col items-center gap-4'>
                        <div className='text-center space-y-2'>
                            <p className="text-lg"><strong>Description:</strong> {content?.description}</p>
                            <p className="text-lg"><strong>Fun Facts:</strong> {content?.funFacts}</p>
                        </div>
                        {/* Musical Facts */}
                        {content?.musicalFacts && content.musicalFacts.length > 0 && (
                            <div>
                                <p className="text-lg font-bold text-carnival-500 mb-3">
                                    Musical Facts:</p>
                                <ul className="space-y-2">
                                    {content.musicalFacts.map((mf, index) => (
                                        <li key={index} className="flex items-center gap-3 bg-carnival-200 text-carnival-500 px-4 py-2 rounded-full text-lg font-semibold capitalize">
                                            <span className="text-lg capitalize">{mf}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {/* Card 2: Video - CENTERED with max-width */}
                <div className='card w-full max-w-4xl'>
                    <div className='card_content sticky top-[20vh] bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                        <h2 className="text-2xl font-bold text-carnival-500 mb-4 text-center">Watch & Listen</h2>
                        {instruments?.video && (
                            <div className='w-full'>
                                <div className='relative w-full aspect-video'>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${instruments.video}`}
                                        title={`${instruments.characterId} - YouTube video player`}
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

                {/* Card 4: Instruments */}
                {instruments && (instruments.mainFamily || instruments.instruments) && (
                    <div className='card w-full max-w-3xl'>
                        <div className='card_content sticky top-[20vh] bg-white rounded-xl shadow-lg p-6 border-2 border-carnival-300'>
                            <h2 className="text-2xl font-bold text-carnival-500 mb-6 text-center">{character.characterName}&apos;s Instruments</h2>
                            
                            {/* Main Families */}
                            {instruments.mainFamily && instruments.mainFamily.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-orange-600 mb-3">Instrument Families:</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {instruments.mainFamily.map((family, index) => (
                                            <span key={index} className="bg-orange-500 text-white px-5 py-2 rounded-full text-lg font-bold capitalize">
                                                {family}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Specific Instruments */}
                            {instruments.instruments && instruments.instruments.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-orange-600 mb-3">Instruments:</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {instruments.instruments.map((instr, index) => (
                                            <div key={index} className="bg-orange-100 p-3 rounded-lg text-center">
                                                <span className="text-lg font-semibold capitalize">{instr}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='relative w-64 h-64'>
                                        <Image
                                            src={instruments?.imageUrl || '/circus.jpg'}
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
            </div>
        </div>
    )
};