"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { firestore } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

// Define the type for your product data for better type safety
// A more generic type might be needed if your Firestore data structure varies
type ProductDataType = any

interface ProductContextType {
  productData: ProductDataType | null
  loading: boolean
  error: string | null
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productData, setProductData] = useState<ProductDataType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landingPageCollectionRef = collection(firestore, "landingPages")
        const querySnapshot = await getDocs(landingPageCollectionRef)

        if (querySnapshot.empty) {
          setError("No documents found in the 'landingpage' collection.")
        } else {
          // Assuming the entire product page data is in the first document
          const docData = querySnapshot.docs[0].data() as ProductDataType
          setProductData(docData)
        }
      } catch (err) {
        setError("Failed to fetch product data from Firebase.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const value = { productData, loading, error }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProduct() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider")
  }
  return context
}
