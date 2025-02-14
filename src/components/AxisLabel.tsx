interface AxisLabelProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  value: string;
  onChange: (
    position: 'top' | 'bottom' | 'left' | 'right',
    value: string
  ) => void;
}

export default function AxisLabel({
  position,
  value,
  onChange,
}: AxisLabelProps) {
  const positionStyles = {
    top: 'top-0 left-1/2 -translate-x-1/2 mt-8',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2 mb-8',
    left: 'left-0 top-1/2 -translate-y-1/2 -ml-8 transform -rotate-90',
    right: 'right-0 top-1/2 -translate-y-1/2 -mr-8 transform rotate-90',
  };

  return (
    <div className={`absolute ${positionStyles[position]}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(position, e.target.value)}
        className="text-center text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-200"
      />
    </div>
  );
}
