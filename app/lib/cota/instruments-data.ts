import { Instrumentation } from '@/app/lib/cota/interface';

export const characterInstruments: Instrumentation[] = [
    {
        characterId: 'lion',
        mainFamily: ['strings', 'percussion'],
        instruments: ['piano', 'violin', 'viola', 'cello', 'double bass'],
        imageUrl: '/patw/images/string.png',
        video:{
            youtube: 'e3Kk6b6_eZMWPB8g', //piano
        },
    },
    {
        characterId: 'rooster',
        mainFamily: ['strings','percussion','woodwinds'],
        instruments: ['violin', 'piano', 'clarinet'],
        imageUrl: '/patw/images/clarinet.png',
        video:{
            youtube: 'iatqzl553i1NQFr6', //clarinet
        },
    },
];