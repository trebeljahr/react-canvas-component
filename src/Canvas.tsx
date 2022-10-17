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
    const cnv = canvasRef.current;
    if (!cnv) return;

    const ratio = Math.ceil(window.devicePixelRatio);
    cnv.width = width * ratio;
    cnv.height = height * ratio;
    cnv.style.width = `${width}px`;
    cnv.style.height = `${height}px`;

    const ctx = cnv.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }, [width, height, canvasRef]);

  return <canvas tabIndex={0} ref={canvasRef} width={width} height={height} />;
};

type CanvasProps = {
  width: number | undefined;
  height: number | undefined;
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
