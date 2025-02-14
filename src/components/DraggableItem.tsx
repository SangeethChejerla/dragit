'use client';

import { motion } from 'framer-motion';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface DraggableItemProps {
  id: string;
  type: 'tag' | 'image';
  content: string;
  initialX: number;
  initialY: number;
  color: string;
  onPositionChange: (id: string, x: number, y: number) => void;
}

export default function DraggableItem({
  id,
  type,
  content,
  initialX,
  initialY,
  color,
  onPositionChange,
}: DraggableItemProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && ref.current) {
        const rect = ref.current.parentElement!.getBoundingClientRect();
        const newX = ((e.clientX - rect.left) / rect.width) * 100;
        const newY = ((e.clientY - rect.top) / rect.height) * 100;
        setPosition({ x: newX, y: newY });
        onPositionChange(id, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute cursor-move"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        x: '-50%',
        y: '-50%',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseDown={handleMouseDown}
    >
      {type === 'tag' ? (
        <div
          className="text-lg font-medium select-none px-4 py-2 rounded-full shadow-lg transition-all duration-200"
          style={{ backgroundColor: color, color: '#000' }}
        >
          {content}
        </div>
      ) : (
        <img
          src={content || '/placeholder.svg'}
          alt="Uploaded item"
          className="w-16 h-16 object-cover rounded-full border-4 border-white shadow-lg transition-all duration-200"
        />
      )}
    </motion.div>
  );
}
