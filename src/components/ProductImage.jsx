const ProductImage = ({src, alt, className, onClick}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleError = (e) => {
    const fallback1 = `${baseUrl}/public${src}`;
    const fallback2 = "placeholder.svg";

    if (src === `${baseUrl}/${src}`) {
      e.target.src = fallback1;
    } else if (src === fallback1) {
      e.target.src = fallback2;
    } else {
      e.target.onerror = null;
    }
  };

  return (
    <img
      src={src.startsWith("../") ? "../../public/loading.gif": `${baseUrl}/${src}`}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={handleError}
    />
  );
};

export default ProductImage;