/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRef, useEffect } from 'react';

const CanvasRect = () => {
  const container = useRef(null);
  useEffect(() => {
    const ctx = container.current.getContext('2d');
    drawRect(ctx, 20, 20, 100, 100, 4, 'red', 'pink');
    /**
     *  总结
     */
  }, []);

  function drawRect(ctx, x, y, width, height, borderWidth, color, fillColor) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + width);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);

    ctx.lineWidth = borderWidth;

    ctx.strokeStyle = color;
    ctx.fillStyle = fillColor;

    ctx.fill();
    ctx.stroke();
  }

  return (
    <div>
      <canvas
        ref={container}
        height={786}
        width={1444}
        css={css`
          border-color: black;
          &:hover {
            background-color: brown;
          }
        `}
      />
    </div>
  );
};

export default CanvasRect;
