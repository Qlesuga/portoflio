import { useEffect, useState, type SyntheticEvent } from "react";

interface ImageWindowProps {
  imageSrc: string;
  altText?: string;
}

export function ImageWindow({ imageSrc, altText }: ImageWindowProps) {
  const [imageScale, setImageScale] = useState(1);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

  function getFitScale(
    imageWidth: number,
    imageHeight: number,
    containerWidth = 900,
    containerHeight = 560,
  ) {
    const scaleX = containerWidth / imageWidth;
    const scaleY = containerHeight / imageHeight;
    return Math.min(scaleX, scaleY);
  }

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const scale = getFitScale(naturalWidth, naturalHeight);
    console.log(naturalHeight);
    console.log(scale);
    console.log(scale * naturalHeight);
    setImageSize({
      width: naturalWidth * scale,
      height: naturalHeight * scale,
    });
    setImageScale(scale);
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
      }}
    >
      <div
        style={{
          height: "calc(100% - 20px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "scroll",
        }}
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
      <div style={{ width: "100%", height: 20 }}>
        {imageSize.width} x {imageSize.height} {imageScale}%
      </div>
    </div>
  );
}
