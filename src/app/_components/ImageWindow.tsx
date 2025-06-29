import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

interface ImageWindowProps {
  imageSrc: string;
  altText?: string;
}

export function ImageWindow({ imageSrc, altText }: ImageWindowProps) {
  const [imageScale, setImageScale] = useState(1);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [nativeImageSize, setNativeImageSize] = useState({
    width: 1,
    height: 1,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const getFitScale = (
    imageWidth: number,
    imageHeight: number,
    containerWidth = 900,
    containerHeight = 558,
  ) => {
    const scaleX = containerWidth / imageWidth;
    const scaleY = containerHeight / imageHeight;
    return Math.min(scaleX, scaleY);
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const scale = Math.min(1, getFitScale(naturalWidth, naturalHeight));
    setNativeImageSize({
      width: naturalWidth,
      height: naturalHeight,
    });
    setImageSize({
      width: naturalWidth * scale,
      height: naturalHeight * scale,
    });
    setImageScale(scale);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    const imageEl = imageContainerRef.current!.querySelector("img");
    if (!imageEl || !imageContainerRef.current) return;

    const container = imageContainerRef.current;
    const rect = imageEl.getBoundingClientRect();

    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;
    const ratioX = cursorX / rect.width;
    const ratioY = cursorY / rect.height;

    const newScale = e.deltaY < 0 ? imageScale * 1.1 : imageScale / 1.1;

    const newWidth = nativeImageSize.width * newScale;
    const newHeight = nativeImageSize.height * newScale;

    const oldScrollLeft = container.scrollLeft;
    const oldScrollTop = container.scrollTop;

    const newScrollLeft =
      ratioX * newWidth - rect.width * ratioX + oldScrollLeft;
    const newScrollTop =
      ratioY * newHeight - rect.height * ratioY + oldScrollTop;

    setImageScale(newScale);
    setImageSize({
      width: newWidth,
      height: newHeight,
    });

    requestAnimationFrame(() => {
      container.scrollLeft = newScrollLeft;
      container.scrollTop = newScrollTop;
    });
  };

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
    };
    if (containerRef.current) {
      containerRef.current.addEventListener("wheel", handleScroll, {
        passive: false,
      });
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  return (
    <div
      style={{
        width: 900,
        height: 580,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#121212",
        color: "white",
        borderRadius: "inherit",
      }}
      ref={containerRef}
    >
      <div
        style={{
          height: "calc(100% - 24px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "scroll",
        }}
        onWheel={handleWheel}
        ref={imageContainerRef}
      >
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={imageSrc}
          alt={altText ?? "Image"}
          width={imageSize.width}
          height={imageSize.height}
          onLoad={handleImageLoad}
          className="max-w-none relative"
          style={{
            height: imageSize.height,
            left: imageSize.width > 900 ? (imageSize.width - 900) / 2 : 0,
            top: imageSize.height > 580 ? (imageSize.height - 580) / 2 : 0,
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: 24,
          borderTop: "1px solid #2b2b2b",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <span>{imageSrc.slice(1)}</span>
        <span>
          {t("imageViewer.imageSize")}: {nativeImageSize.width} x{" "}
          {nativeImageSize.height}
        </span>
        <span>
          {t("imageViewer.resizedImageSize")}: {imageSize.width.toFixed(0)} x{" "}
          {imageSize.height.toFixed(0)}
        </span>
        <span>
          {t("imageViewer.scale")}: {imageScale.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
