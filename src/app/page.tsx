'use client';

import { useState } from 'react';

import { DraggableItem } from '@/components/DraggableItem';
import { ImageUploader } from '@/components/ImageUploader';
import type { UploadedImage } from '@/types';

export default function MarketMap() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    const newImage: UploadedImage = {
      id: `image-${Date.now()}`,
      url: imageUrl,
      name: file.name,
    };
    setUploadedImages((prev) => [...prev, newImage]);
  };

  return (
    <div
      className={`min-h-screen w-full bg-black flex flex-col items-center p-8 ${GeistSans.variable} ${GeistMono.variable} font-sans`}
    >
      <style jsx global>{`
        body.dragging * {
          cursor: none !important;
        }
      `}</style>

      {/* Image Upload Section */}
      <div className="w-full max-w-md mb-8">
        <ImageUploader onImageUpload={handleImageUpload} />
      </div>

      {/* Market Map */}
      <div className="relative w-full max-w-3xl aspect-square bg-black text-white">
        {/* Axes */}
        <div className="absolute inset-8 flex items-center justify-center">
          <div className="w-[2px] h-full bg-gray-500" />
          <div className="absolute w-full h-[2px] bg-gray-500" />
        </div>

        {/* Axis Labels */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div className="text-center text-lg -mt-8 text-gray-500">BANGER</div>
          <div className="text-center text-lg -mb-8 text-gray-500">
            NON-BANGER
          </div>
        </div>
        <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
          <div className="text-lg pl-4 text-gray-500">NOT CREATIVE</div>
          <div className="text-lg pr-4 text-gray-500">CREATIVE</div>
        </div>

        {/* Draggable Items */}
        <div className="absolute inset-0">
          {/* Pre-defined labels */}
          <DraggableItem
            initialX={20}
            initialY={20}
            color="#6AACF8"
            id="item-1"
          >
            TikTok
          </DraggableItem>
          <DraggableItem
            initialX={80}
            initialY={20}
            color="#6CDA76"
            id="item-2"
          >
            YouTube
          </DraggableItem>
          <DraggableItem
            initialX={20}
            initialY={80}
            color="#F2AB3C"
            id="item-3"
          >
            Instagram
          </DraggableItem>
          <DraggableItem
            initialX={80}
            initialY={80}
            color="#8955DD"
            id="item-4"
          >
            Twitter
          </DraggableItem>

          {/* Uploaded images */}
          {uploadedImages.map((image, index) => (
            <DraggableItem
              key={image.id}
              id={image.id}
              initialX={50}
              initialY={50}
              imageUrl={image.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
