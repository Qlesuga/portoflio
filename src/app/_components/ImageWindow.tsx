import { useEffect, useState, type SyntheticEvent } from "react";
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
  const { t } = useTranslation();

  function getFitScale(
    imageWidth: number,
    imageHeight: number,
    containerWidth = 900,
    containerHeight = 558,
  ) {
    const scaleX = containerWidth / imageWidth;
    const scaleY = containerHeight / imageHeight;
    return Math.min(scaleX, scaleY);
  }

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

    let scale = 0;
    if (e.deltaY < 0) {
      scale = imageScale * 1.1;
    } else {
      scale = imageScale / 1.1;
    }

    setImageScale(scale);
    setImageSize({
      width: nativeImageSize.width * scale,
      height: nativeImageSize.height * scale,
    });
  };

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
      >
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={imageSrc}
          alt={altText ?? "Image"}
          width={imageSize.width}
          height={imageSize.height}
          onLoad={handleImageLoad}
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
