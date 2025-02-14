import { Button } from '@/components/ui/button';
import type React from 'react';
import { useRef } from 'react';

interface ImageUploadProps {
  onAddImage: (imageUrl: string) => void;
}

export default function ImageUpload({ onAddImage }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onAddImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        onClick={handleButtonClick}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        Upload Image
      </Button>
    </div>
  );
}
