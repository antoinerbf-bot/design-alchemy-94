import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

const imagesGlob = import.meta.glob('@/assets/frames/ezgif-frame-*.jpg', { eager: true });
const imageUrls = Object.keys(imagesGlob).sort().map((key) => {
    return (imagesGlob[key] as { default: string }).default;
});

interface ScrollSequenceProps {
    progress: MotionValue<number>;
}

export function ScrollSequence({ progress }: ScrollSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        imageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
            loadedImages.push(img);
        });
        setImages(loadedImages);
    }, []);

    const renderFrame = () => {
        if (!canvasRef.current || images.length === 0) return;

        const currentProgress = progress.get();
        const frameIndex = Math.min(
            imageUrls.length - 1,
            Math.floor(currentProgress * (imageUrls.length - 1))
        );

        const img = images[frameIndex];
        if (img && img.complete) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(
                    img,
                    0,
                    0,
                    img.width,
                    img.height,
                    centerShift_x,
                    centerShift_y,
                    img.width * ratio,
                    img.height * ratio
                );
            }
        }
    };

    const resizeCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            renderFrame();
        }
    };

    useEffect(() => {
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [images]);

    useEffect(() => {
        return progress.onChange(() => renderFrame());
    }, [progress, images]);

    return <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full object-cover" />;
}
