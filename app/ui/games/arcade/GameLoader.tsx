'use client';

import dynamic from 'next/dynamic';

// ssr: false is critical - Plaser uses window and document
const ChaseTheOrchestraGame = dynamic(
    () => import('./ChaseTheOrchestraGame'),
    { ssr: false, loading: () => <p className='text-center p-8'>Loading game...</p> }
);

export default function GameLoader() {
    return <ChaseTheOrchestraGame />;
}