import Nav from '@/app/ui/nav';
import { teachers } from '@/app/ui/fonts';
import GameController from '@/app/ui/patw-listening-game/game-controller'; 

export default function Page() {
  return (
    <div className="flex flex-col">
        <Nav />
        <div className="flex min-h-screen flex-col bg-white dark:bg-black p-6">
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className='flex flex-col justify-center gap-4 rounded-lg bg-thyme-100 p-6 md:w-2/5 md:px-10'>
                    <p className={`${teachers.className} text-xl text-thyme-500 md:text-3xl md:leading-normal`}>
                        <strong>Peter and the Wolf: Listening Game</strong>
                    </p>
                </div>
            </div>
            <div className="mt-4 flex grow flex-col gap-4">
                <GameController />
            </div>
        </div>
    </div>
  );
}