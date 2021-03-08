/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRef, useEffect } from 'react';

const CanvasLineToBeginPath = () => {
  const container = useRef(null);
  useEffect(() => {
    const ctx = container.current.getContext('2d');
    // 定义开始画
    ctx.beginPath();
    // 画笔初始点
    ctx.moveTo(100, 100);
    // 画线段
    ctx.lineTo(700, 700);
    ctx.lineTo(100, 700);
    ctx.lineTo(100, 99);
    // 线段宽度
    // ctx.lineWidth = 3;
    // 着色(实心)样式
    ctx.fillStyle = 'red';
    // 线段颜色
    // ctx.strokeStyle = '#1c76d0';
    // 结束画笔
    ctx.closePath();
    // 实心绘制
    ctx.fill();
    // 绘制
    // ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(101, 101);
    ctx.lineTo(701, 701);
    ctx.lineTo(701, 101);
    ctx.lineTo(101, 99);
    ctx.closePath();
    // ctx.strokeStyle = 'red';
    ctx.fillStyle = '#1c76d0';

    // 实心绘制
    ctx.fill();
    // 绘制
    // ctx.stroke();

    /**
     *  总结
     *  canvas.beginPath 开始绘制到结束 canvas.closePath 通过这两方法绘制一段路径，从而画多个线段
     *  canvas.moveTo 从开始到使用 canvas.lineTo 画线段
     *  canvas.fillStyle 着色样式 canvas.strokeStyle 线段颜色
     *  canvas.fill 完成最后的着色绘制 canvas.stroke 完成最后的线段绘制
     *  注意：绘制是如果fill在stroke之前那么着色是会覆盖线段的一半宽度
     */
  }, []);
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

export default CanvasLineToBeginPath;
