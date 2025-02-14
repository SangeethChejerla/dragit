'use client';

import type { DraggableItemProps, Position } from '@/types';
import React, { useEffect, useRef, useState } from 'react';

export function DraggableItem({
  initialX,
  initialY,
  children,
  color,
  imageUrl,
  id,
}: DraggableItemProps) {
  const [position, setPosition] = useState<Position>({
    x: initialX,
    y: initialY,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [moveDirection, setMoveDirection] = useState<string | null>(null);
  const [tiltAngle, setTiltAngle] = useState(0);
  const [isWobbling, setIsWobbling] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const lastPosition = useRef<Position>({ x: initialX, y: initialY });
  const lastMoveTime = useRef<number>(0);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    dropSoundRef.current = new Audio(
      'https://rjj2qyxxex49xrmy.public.blob.vercel-storage.com/a_short_and_fun_womp%20(1)-KP9MRnczG1Yn0Er85oaT3beNqA8Hri.mp3'
    );
    clickSoundRef.current = new Audio(
      'https://rjj2qyxxex49xrmy.public.blob.vercel-storage.com/a_quick_click_sound-fsBeePlfPVSXEf5MiVtaMBPjArwufm.mp3'
    );
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.body.classList.add('dragging');
    } else {
      document.body.classList.remove('dragging');
    }
  }, [isDragging]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && ref.current) {
        const currentTime = Date.now();
        const rect = ref.current.parentElement!.getBoundingClientRect();
        const newX = ((e.clientX - rect.left) / rect.width) * 100;
        const newY = ((e.clientY - rect.top) / rect.height) * 100;

        const dx = newX - lastPosition.current.x;
        const dy = newY - lastPosition.current.y;
        const timeDiff = currentTime - lastMoveTime.current;

        const velocity = Math.sqrt(dx * dx + dy * dy) / timeDiff;
        const newTiltAngle = Math.min(Math.max(velocity * 200, 1), 15);
        setTiltAngle(newTiltAngle);

        if (Math.abs(dx) > Math.abs(dy)) {
          setMoveDirection(dx > 0 ? 'right' : 'left');
        } else {
          setMoveDirection(dy > 0 ? 'down' : 'up');
        }

        setPosition({ x: newX, y: newY });
        lastPosition.current = { x: newX, y: newY };
        lastMoveTime.current = currentTime;

        if (moveTimeoutRef.current) {
          clearTimeout(moveTimeoutRef.current);
        }
        moveTimeoutRef.current = setTimeout(() => {
          setMoveDirection(null);
          setTiltAngle(0);
        }, 50);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setMoveDirection(null);
      setTiltAngle(0);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      setIsWobbling(true);
      setTimeout(() => setIsWobbling(false), 300);

      if (dropSoundRef.current) {
        dropSoundRef.current.currentTime = 0;
        dropSoundRef.current.play();
      }
      document.body.classList.remove('dragging');
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsWobbling(false);
    lastPosition.current = position;
    lastMoveTime.current = Date.now();
    document.body.classList.add('dragging');

    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play();
    }
  };

  const getWobbleAnimation = () => {
    if (isWobbling) return 'animate-lightWobble';
    switch (moveDirection) {
      case 'left':
        return 'animate-wobbleLeft';
      case 'right':
        return 'animate-wobbleRight';
      case 'up':
        return 'animate-wobbleUp';
      case 'down':
        return 'animate-wobbleDown';
      default:
        return '';
    }
  };

  return (
    <div
      ref={ref}
      className={`absolute cursor-move ${getWobbleAnimation()}`}
      style={
        {
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `translate(-50%, -50%) ${
            isDragging ? 'scale(1.25)' : 'scale(1)'
          }`,
          transition: 'transform 0.3s',
          '--tilt-angle': `${
            moveDirection === 'left' || moveDirection === 'up'
              ? -tiltAngle
              : tiltAngle
          }deg`,
        } as React.CSSProperties
      }
      onMouseDown={handleMouseDown}
    >
      {imageUrl ? (
        <div
          className="rounded-lg overflow-hidden shadow-lg"
          style={{
            width: '100px',
            height: '100px',
          }}
        >
          <img
            src={imageUrl}
            alt="Draggable item"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      ) : (
        <div
          className="text-xl font-medium select-none px-4 py-1 rounded-full relative whitespace-nowrap"
          style={{
            backgroundColor: color,
            color: '#000',
            textAlign: 'center',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
