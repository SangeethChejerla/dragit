export interface Position {
  x: number;
  y: number;
}
export interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

export interface DraggableItemProps {
  initialX: number;
  initialY: number;
  children?: React.ReactNode;
  color?: string;
  imageUrl?: string;
}
