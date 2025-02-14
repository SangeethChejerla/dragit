'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type React from 'react';
import { useState } from 'react';

interface TagInputProps {
  onAddTag: (tag: string, color: string) => void;
}

export default function TagInput({ onAddTag }: TagInputProps) {
  const [tag, setTag] = useState('');
  const [color, setColor] = useState('#6AACF8');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag.trim()) {
      onAddTag(tag.trim(), color);
      setTag('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Enter tag"
        className="w-40 bg-white bg-opacity-20 text-white placeholder-gray-300"
      />
      <Input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-12 h-10 p-1 bg-white bg-opacity-20"
      />
      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Add Tag
      </Button>
    </form>
  );
}
