import { memo } from 'react';

const MatrixRain = memo(() => {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-primary font-mono text-xs"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `matrixRain ${5 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {Array.from({ length: 20 }, () => 
            Math.random() > 0.5 
              ? String.fromCharCode(48 + Math.floor(Math.random() * 10)) 
              : String.fromCharCode(65 + Math.floor(Math.random() * 26))
          ).join('\n')}
        </div>
      ))}
    </div>
  );
});

MatrixRain.displayName = 'MatrixRain';

export default MatrixRain;
