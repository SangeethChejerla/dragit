'use client';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import type React from 'react';

interface DownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

export default function DownloadButton({ targetRef }: DownloadButtonProps) {
  const handleDownload = async () => {
    if (targetRef.current) {
      const canvas = await html2canvas(targetRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'market-map.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="bg-purple-500 hover:bg-purple-600 text-white"
    >
      Download Map
    </Button>
  );
}
