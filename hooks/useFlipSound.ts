"use client";

import { useRef, useCallback } from "react";

export const useFlipSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playFlip = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/flip.mp3");
      audioRef.current.volume = 0.3;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  return playFlip;
};
