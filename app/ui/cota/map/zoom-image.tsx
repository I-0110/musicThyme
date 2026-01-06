'use client';

import { useState } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ParachuteImageGalleryProps {
    images: string[];
    characterName: string;
}

export default function ZoomImg({ images, characterName }: ParachuteImageGalleryProps) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    if (!images || images.length === 0) return null;

    return (
        <>
            <div className="flex gap-2 mt-4">
                {images.map((img, index) => (
                    <div key={index} className="relative w-1/2 h-24">
                        <Image
                            src={img}
                            alt={`${characterName} parachute activity ${index + 1}`}
                            fill
                            className='object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity' 
                            onClick={() => setSelectedImg(img)}
                        />
                    </div>
                ))}
            </div>
            
            {selectedImg && (
                <div
                    className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedImg(null)}
                >
                    <div className="relative w-full max-w-4xl h-[80vh]">
                        <Image 
                            src={selectedImg} 
                            alt="Enlarged view"
                            fill
                            className="object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={() => setSelectedImg(null)}
                            className='absolute top-2 right-2 bg-white rounded-full p-1 text-gray-700 hover:text-red-600 hover:shadow-lg z-10'
                            aria-label='Close'
                        >
                            <XMarkIcon className='w-8 h-8' />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}