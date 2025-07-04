"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { firestore } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"

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
      const searchParams = new URLSearchParams(window.location.search)
      const docIdFromURL = searchParams.get("p")
      const defaultDocId = "70Yit9W3jdbmc73MfOj7"

      const docIdToFetch = docIdFromURL || defaultDocId
      const docRef = doc(firestore, "landingPages", docIdToFetch)
      let docSnap = await getDoc(docRef)

      // If the document ID from the URL doesn't exist, fall back to default
      if (!docSnap.exists() && docIdFromURL) {
        const fallbackRef = doc(firestore, "landingPages", defaultDocId)
        docSnap = await getDoc(fallbackRef)
      }

      if (!docSnap.exists()) {
        setError("Document not found.")
      } else {
        const docData = docSnap.data() as ProductDataType
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
