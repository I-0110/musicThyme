import Nav from '@/app/ui/nav';
import { teachers } from '@/app/ui/fonts';
import GameController from '@/app/ui/patw-listening-game/game-controller'; 

export default function Page() {
  return (
    <div className="flex flex-col">
        <Nav />
        <div className="flex min-h-screen flex-col bg-[url('/forrest.jpg')] bg-cover bg-center p-2">
            <div className="mt-2 flex justify-center">
                <div className='flex flex-col justify-center text-center gap-2 rounded-lg bg-thyme-100 p-3 md:w-2/5 md:px-10'>
                    <p className={`${teachers.className} text-xl text-thyme-500 md:text-xl md:leading-normal`}>
                        <strong>Peter and the Wolf: Listening Game</strong>
                    </p>
                </div>
            </div>
            <div>
                <GameController />
            </div>
        </div>
    </div>
  );
}