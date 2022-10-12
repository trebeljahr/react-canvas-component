import React from "react";

type _CanvasProps = {
  width: number;
  height: number;
  setCnv: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
};

const _Canvas = ({ setCnv, width, height }: _CanvasProps) => {
  const canvasRef = React.useRef<null | HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCnv(canvas);
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = Math.ceil(window.devicePixelRatio);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }, [width, height]);

  return <canvas tabIndex={1} ref={canvasRef} width={width} height={height} />;
};

type CanvasProps = {
  width: number | null;
  height: number | null;
  setCnv: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
};

export const SimpleReactCanvasComponent = ({
  setCnv,
  width,
  height,
}: CanvasProps) => {
  return (
    <>
      {width && height && (
        <_Canvas setCnv={setCnv} width={width} height={height} />
      )}
    </>
  );
};

export default SimpleReactCanvasComponent;
