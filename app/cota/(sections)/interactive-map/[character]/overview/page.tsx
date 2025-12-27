import { notFound } from "next/navigation";
import { getCharacterById } from "@/app/lib/cota/functions";
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
                  className="inline-flex items-center gap-2 bg-carnival-100 text-carnival-500 px-6 py-3 rounded-r-lg text-lg font-bold hover:bg-red-600 transition-colors"
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

            {/* Main Content - Two Column Layout */}
            <div className='flex flex-col md:flex-row gap-6 px-4 py-8 mb-8'>
                {/* Left Column - Image and Info */}
                <div className='flex flex-col items-center md:items-start md:w-1/2'>
                    <p><strong>Title:</strong> {character.title} </p>
                    <p><strong>Character:</strong> {character.characterName} </p>
                    <p><strong>Order:</strong> Movement #{character.orderNumber} </p>
                    <div className='relative w-48 h-48'>
                        <Image
                            src={character.imageUrl}
                            alt={character.characterName}
                            fill
                            className='object-fit items rounded-lg' 
                         />
                    </div>
                </div>

                {/* Right Column - Video and Read More */}
                <div className='flex flex-col items-center md:w-1/2 gap-3'>
                    {/* YouTube Video */}
                    <div className='w-full max-w-lg'>
                        <div className='relative w-full aspect-video'>
                            <iframe 
                            src={`https://www.youtube.com/embed/${character.video.youtube}`}
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className='absolute top-0 left-0 w-full h-full rounded-lg'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}