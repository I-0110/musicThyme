'use client';

import { useEffect, useRef } from 'react';
import type { Types } from 'phaser';

interface PhaserGameProps {
  config: Types.Core.GameConfig;
}

export default function PhaserGame({ config }: PhaserGameProps) {
    const contaunerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let game: Phaser.Game;

        const initPhaser = async () => {
            const Phaser = (await import ('phaser')).default;

            game = new Phaser.Game({
                ...config,
                parent: contaunerRef.current ?? undefined,
            });
        };

        initPhaser();

        return () => {
            game?.destroy(true);
        };
    }, [config]);

    return <div ref={contaunerRef} className='w-full rounded-xl overflow-hidden' />;
}