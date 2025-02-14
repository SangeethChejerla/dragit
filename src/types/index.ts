export interface Position {
  x: number;
  y: number;
}

export interface DraggableItemProps {
  initialX: number;
  initialY: number;
  children?: React.ReactNode;
  color?: string;
  imageUrl?: string;
}
