import Nav from '@/app/ui/nav';
import { teachers } from '@/app/ui/fonts';
import BoardMap  from '@/app/ui/cota/map/boardmap';
import { carnivalCharacters } from '@/app/lib/cota/data';

export default function Page() {

  return (
    <div className="flex flex-col">
        <Nav />
        <div className="flex min-h-screen flex-col bg-[url('/circus.jpg')] bg-cover bg-center p-2">
            <div className="mt-2 flex justify-center">
                <div className='flex flex-col justify-center text-center gap-2 rounded-lg bg-carnival-100 p-3 md:w-2/5 md:px-10'>
                    <p className={`${teachers.className} text-xl text-carnival-500 md:text-xl md:leading-normal`}>
                        <strong>The Carnival of the Animals:</strong> <br/><strong>Explore the Characters</strong>
                    </p>
                </div>
            </div>
            <div className='mt-6'>
                <BoardMap 
                    characters={carnivalCharacters}
                />
            </div>
        </div>
    </div>
  );
}