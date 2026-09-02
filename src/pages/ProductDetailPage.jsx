import ProductDetailContent from "../components/product/ProductDetailContent.jsx"
import ProductGallery from "../components/product/ProductGallery.jsx"
import ProductInfo from "../components/product/ProductInfo.jsx"

export default function ProductDetailPage() {
  return (
    <main>
      <ProductGallery 
        thumbnailImage={product.thumbnailImage}
        imageUrl={product.imageUrl}
        thumbnails={product.thumbnails}
        options={product.options}
        name={product.name}
      />
      <ProductDetailContent />
      <ProductInfo />
    </main>
  )
}
