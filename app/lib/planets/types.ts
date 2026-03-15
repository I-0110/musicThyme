// Data structure types for Map and Quiz
export type PlanetId = 'mars' | 'venus' | 'mercury' | 'jupiter' | 'saturn' | 'uranus' | 'neptune';

export type Meter = 'steady = 4/4'| 'waltz = 3/4' | 'march = 2/4' | 'irregular = 5/4' | "compound = 6/8" | "compound = 6/4"; // Consider to change title to TIME SIGNATURE!!

export type Tempo = 'very slow = largo' | 'slowy = lento' | 'at ease = adagio' | 'slow = andante' | 'walking speed = andante' | 'moderate = moderato' | 'fast = allegro' | 'lively = vivace' | 'very fast = presto' | 'increasing speed = accelerando';

export type Dynamics = 'very soft = pianissimo' | 'soft = piano' | 'medium-soft = mezzo-piano' | 'medium-loud = mezzo-forte' | 'loud = forte' | 'very loud = fortissimo' | 'soft to loud = crescendo' | 'loud to soft = descrecendo';

// Last clue for easy game: Gustav Holst
export type GH = 'G' | 'U' | 'S' | 'T' | 'A' | 'V' | 'H' | 'O' | 'L' | 'S' | 'T';

export type LessonCategory = 'rhythm' | 'body percussion' | 'move' | 'play' | 'create' | 'UP Percussion' | 'boomwhackers' | 'circle activity' | 'game' | 'small group' | 'watch' | 'listen' | 'recorders' | 'xylophones' | 'Pitched Percussion' | 'parachute';

export type YtChannels = 'RondeauMusic' | 'Musicplayonline' | 'MrGsBoomwhackerChannel' | 'newnewchannel' | 'lenaleon-thecrafterteacher' | 'ssousc' | 'jpiano1144' | 'emilychurch1322' | 'MsMusic-ju9gz' | 'musicteaching7288' | 'amanda_hooper77' | 'pcimini1991' | 'alpacapellaeducacionmusica3125' | 'MHmusicroom' | 'Dolcejj80' | 'Notenjonglina' | 'braunream7411' | 'juliafabrizio9276' | 'SymphonicSounds-rm8qm' | 'RachelHahn'| 'andrewtralle626' | 'danaherro9565' | 'musicwithmrs.kincaid2151' | 'soaringscarvesacademy2871';

export type TpT = 'mr-g-music-tech' | 'lena-leon-the-crafter-teacher';