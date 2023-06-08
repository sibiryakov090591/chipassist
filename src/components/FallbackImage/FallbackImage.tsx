import React, { useState } from "react";
import placeholderImg from "@src/images/no-image.png";

const FallbackImage: React.FC<any> = ({ src, fallbackSrc, ...rest }) => {
  const [imageSource, setImageSource] = useState(src);

  const handleImageError = () => {
    setImageSource(fallbackSrc || placeholderImg);
  };

  return <img src={imageSource} onError={handleImageError} {...rest} />;
};

export default FallbackImage;
