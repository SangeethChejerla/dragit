'use client';

import { useRef, useState } from 'react';

import AxisLabel from '@/components/AxisLabel';
import DownloadButton from '@/components/DownloadButton';
import DraggableItem from '@/components/DraggableItem';
import ImageUpload from '@/components/ImageUpload';
import TagInput from '@/components/TagInput';
import { motion } from 'framer-motion';

export default function MarketMap() {
  const [items, setItems] = useState<
    Array<{
      id: string;
      type: 'tag' | 'image';
      content: string;
      x: number;
      y: number;
      color: string;
    }>
  >([]);
  const [axisLabels, setAxisLabels] = useState({
    top: 'Better DX',
    bottom: 'Worse DX',
    left: 'Less cost-efficient',
    right: 'More cost-efficient',
  });
  const mapRef = useRef<HTMLDivElement>(null);

  const addTag = (tag: string, color: string) => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'tag',
        content: tag,
        x: 50,
        y: 50,
        color,
      },
    ]);
  };

  const addImage = (imageUrl: string) => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'image',
        content: imageUrl,
        x: 50,
        y: 50,
        color: 'transparent',
      },
    ]);
  };

  const updateItemPosition = (id: string, x: number, y: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  };

  const updateAxisLabel = (
    position: 'top' | 'bottom' | 'left' | 'right',
    value: string
  ) => {
    setAxisLabels((prev) => ({ ...prev, [position]: value }));
  };

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8 `}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-4xl font-bold text-white"
      >
        Market Map Creator
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 flex flex-wrap gap-4 justify-center"
      >
        <TagInput onAddTag={addTag} />
        <ImageUpload onAddImage={addImage} />
        <DownloadButton targetRef={mapRef} />
      </motion.div>
      <motion.div
        ref={mapRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative w-full max-w-4xl aspect-square p-12 bg-white rounded-2xl shadow-2xl"
      >
        {/* Axes */}
        <div className="absolute inset-12 flex items-center justify-center">
          <div className="w-[2px] h-full bg-gray-200" />
          <div className="absolute w-full h-[2px] bg-gray-200" />
        </div>

        {/* Axis Labels */}
        <AxisLabel
          position="top"
          value={axisLabels.top}
          onChange={updateAxisLabel}
        />
        <AxisLabel
          position="bottom"
          value={axisLabels.bottom}
          onChange={updateAxisLabel}
        />
        <AxisLabel
          position="left"
          value={axisLabels.left}
          onChange={updateAxisLabel}
        />
        <AxisLabel
          position="right"
          value={axisLabels.right}
          onChange={updateAxisLabel}
        />

        {/* Draggable Items */}
        {items.map((item) => (
          <DraggableItem
            key={item.id}
            id={item.id}
            type={item.type}
            content={item.content}
            initialX={item.x}
            initialY={item.y}
            color={item.color}
            onPositionChange={updateItemPosition}
          />
        ))}
      </motion.div>
    </div>
  );
}
