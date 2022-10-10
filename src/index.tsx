import { useRef, useEffect, Dispatch, SetStateAction } from "react";

type _CanvasProps = {
  width: number;
  height: number;
  setCnv: Dispatch<SetStateAction<HTMLCanvasElement | null>>;
};

const _Canvas = ({ setCnv, width, height }: _CanvasProps) => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCnv(canvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = Math.ceil(window.devicePixelRatio);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }, [width, height]);
  }, [width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

type CanvasProps = {
  width: number | null;
  height: number | null;
  setCnv: Dispatch<SetStateAction<HTMLCanvasElement | null>>;
};
export const Canvas = ({ setCnv, width, height }: CanvasProps) => {
  return (
    <>
      {width && height && (
        <_Canvas setCnv={setCnv} width={width} height={height} />
      )}
    </>
  );
};
