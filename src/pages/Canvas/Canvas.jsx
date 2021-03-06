/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRef, useEffect } from 'react';

const Canvas = () => {
  const container = useRef(null);
  useEffect(() => {
    const ctx = container.current.getContext('2d');
    // 设置画笔的颜色
    ctx.fillStyle = 'red';
    // 开启一次绘制路径
    ctx.beginPath();
    // 设置起始坐标
    ctx.moveTo(50, 50);
    // 定义绘制图形的形状
    ctx.bezierCurveTo(400, 50, 400, 300, 800, 300);
    ctx.stroke();
    // ctx.lineTo(400, 50);
    // ctx.lineTo(400, 300);
    // ctx.closePath();
    // ctx.stroke();
    // 渲染路径
    // ctx.fill();
  }, []);
  return (
    <div>
      Canvas
      <canvas
        ref={container}
        css={css`
          width: 100%;
          height: 100%;
          &:hover {
            background-color: brown;
          }
        `}
      />
    </div>
  );
};

export default Canvas;
