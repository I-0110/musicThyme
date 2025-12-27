import { notFound } from "next/navigation";
import { getCharacterById } from "@/app/lib/cota/functions";
import Nav from "@/app/ui/nav";
import Breadcrumbs from '@/app/ui/cota/map/breadcrumbs';
import Card from "@/app/ui/cota/map/cards";
import Link from 'next/link';
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
        <div className="flex flex-col ">
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
                currentSection='vocabulary'
            />

            <Card characterId={character.id} />

            <div className="prose max-w-none">
                <p><strong>Title:</strong> {character.title} </p>
                <p><strong>Character:</strong> {character.characterName} </p>
                <p><strong>Order:</strong> Movement #{character.orderNumber} </p>
            </div>
        </div>
    )
}