import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import { teachers } from '@/app/ui/fonts';

export default function MusicLogo() {
  return (
    <div
      className={`${teachers.className} flex flex-row items-center leading-none text-white`}
    >
      <MusicalNoteIcon className="h-6 w-6 hidden md:block" />
      <p className="text-[32px]">Music Thyme!</p>
    </div>
  );
}
