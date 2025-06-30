"use client"

import { ProductProvider } from "@/contexts/product-context"
import ProductPage from "./product-page"

export default function Page() {
  return (
    <ProductProvider>
      <ProductPage />
    </ProductProvider>
  )
}
