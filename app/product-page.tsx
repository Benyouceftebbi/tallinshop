"use client"
import { useState, useEffect } from "react"
import type React from "react"
import * as LucideIcons from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownBanner } from "@/components/countdown-banner"
import { SizeGuide } from "@/components/size-guide"
import { Faq } from "@/components/faq"
import { ThankYouModal } from "@/components/thank-you-modal"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useProduct } from "@/contexts/product-context"
import Loading from "./loading"

interface CartItem {
  id: string
  name: string
  size: string
  color: string
  quantity: number
  price: number
  image: string
}

export default function ProductPage() {
  const { productData, loading, error } = useProduct()

  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomedImage, setZoomedImage] = useState("")
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCommune, setSelectedCommune] = useState("")
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    if (productData) {
      setSelectedSize(productData.variants[0].option1)
      setSelectedColor(productData.variants[0].option2)
      setSelectedDeliveryMethod("domicile")
    }
  }, [productData])

  if (loading) {
    return <Loading />
  }

  if (error || !productData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error || "Could not load product data."}
      </div>
    )
  }

  const currentColorObj =
    productData.colorImages.find((color: any) => color.color === selectedColor) || productData.variants[0].option2

  const currentDeliveryMethod ={id:"1",name:"domicile",discreption:"",cost:400}

  const selectedProvinceObj = {code: "01", name: "blida", communes: ["Commune1", "Commune2", "Commune3"]} // Replace with actual province data
  const availableCommunes = selectedProvinceObj?.communes || []

  const productTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingCost = currentDeliveryMethod?.cost || 0
  const grandTotal = productTotal + shippingCost

  const handleImageZoom = (imageSrc: string) => {
    setZoomedImage(imageSrc)
    setIsZoomed(true)
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return
    const cartItemId = `${currentColorObj.id}-${selectedSize}`
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === cartItemId)
      if (existingItem) {
        return prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            name: productData.title,
            size: selectedSize,
            color: selectedColor,
            quantity: 1,
            price: productData.priceAfter,
            image: currentColorObj.imageUrl,
          },
        ]
      }
    })
  }

  const handleUpdateCartQuantity = (itemId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) {
      alert("Votre panier est vide!")
      return
    }
    console.log("Form submitted!", { cart })
    setShowThankYou(true)
    setCart([])
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-stone-300">
      <CountdownBanner />

      <main className="container mx-auto px-4 py-12" id="order-section">
        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-8 max-w-7xl mx-auto">
          {/* Product Images */}
          <div className="space-y-6 lg:order-1">
            <div className="relative group">
              <div
                className="aspect-square bg-white dark:bg-slate-800 rounded-2xl overflow-hidden cursor-zoom-in shadow-lg hover:shadow-xl transition-all duration-500"
                onClick={() => handleImageZoom(currentColorObj.imageUrl)}
              >
                <Image
                  src={currentColorObj.imageUrl || "/placeholder.svg"}
                  alt={`${productData.title} - ${selectedColor}`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 ${
                  isLiked ? "text-red-500" : "text-gray-400 dark:text-stone-400"
                }`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <LucideIcons.Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {productData.colorImages.map((thumbnail: string, index: number) => (
                <div
                  key={index}
                  className="aspect-square bg-white dark:bg-slate-800 rounded-xl overflow-hidden cursor-zoom-in shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleImageZoom(thumbnail.imageUrl || "/placeholder.svg")}
                >
                  <Image
                    src={thumbnail.imageUrl || "/placeholder.svg"}
                    alt={`${selectedColor} variant ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-8 lg:order-2">
            <div className="flex items-center gap-4 p-4 bg-stone-100 dark:bg-slate-800 rounded-xl order-3 lg:order-2">
              <span className="text-lg text-gray-500 dark:text-stone-400 line-through">
                {"DZ"} {productData.priceBefore.toFixed(2)}
              </span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
               {"DZ"}  {productData.priceAfter}
              </span>
           
                <Badge className="bg-rose-500 text-white px-3 py-1 text-sm">{ "En vente"}</Badge>
           
            </div>

            <div className="space-y-4 order-4 lg:order-1">
              <p className="text-sm text-rose-600 dark:text-rose-400 uppercase tracking-wider font-semibold">
                {productData.boutiqueName}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {productData.title}
              </h1>
              <p className="text-gray-600 dark:text-stone-300 text-lg leading-relaxed hidden md:block">
                Découvrez l'élégance et le confort avec nos mules sabots premium. Parfaites pour la femme moderne qui ne
                veut pas choisir entre style et confort.
              </p>
            </div>
            <div className="space-y-4 order-1 lg:order-5">
              <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                {"Couleur"}
              </Label>
              <div className="flex flex-wrap gap-3">
                {productData.colorImages.map((color: any,index) => (
                  <Button
                    key={color.color }
                    variant={color.color === selectedColor ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full px-4 py-2 transition-all duration-300 transform hover:scale-105 ${
                      color.name === selectedColor
                        ? "bg-slate-800 text-white border-slate-800 dark:bg-rose-600 dark:border-rose-600 shadow-lg"
                        : "border-2 border-stone-300 dark:border-stone-600 hover:border-rose-400 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                    }`}
                    onClick={() => setSelectedColor(color.color)}
                  >
                    {color.color}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4 order-2 lg:order-4">
              <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                {"Pointure"}
              </Label>
              <RadioGroup value={selectedSize || ""} onValueChange={setSelectedSize} className="flex flex-wrap gap-3">
                {["37","38","39","40"].map((size: string) => (
                  <Label
                    key={size}
                    className="border-2 border-stone-200 dark:border-stone-700 rounded-xl px-6 py-3 cursor-pointer hover:bg-stone-100 dark:hover:bg-slate-800 transition-all duration-300 [&:has(:checked)]:bg-slate-800 [&:has(:checked)]:text-white [&:has(:checked)]:border-slate-800 dark:[&:has(:checked)]:bg-rose-600 dark:[&:has(:checked)]:border-rose-600 transform hover:scale-105"
                  >
                    <RadioGroupItem value={size} className="sr-only" />
                    <span className="font-medium">{size}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between order-5 lg:order-3">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <LucideIcons.Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-stone-300 font-medium">4.9 (127 avis)</span>
              </div>
              <SizeGuide />
            </div>

            <div className="order-6 lg:order-6">
              <Button onClick={handleAddToCart} size="lg" className="w-full">
                <LucideIcons.Plus className="w-5 h-5 ml-2" />
                {"Ajouter au panier"}
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <section className="mt-20 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8 flex items-center justify-center gap-2">
                <LucideIcons.ShoppingCart className="w-6 h-6 text-rose-500" />
                Votre Commande
              </h3>

              <div className="space-y-4 mb-8">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-slate-800 rounded-xl">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-stone-400">
                          Taille {item.size} / {item.color}
                        </p>
                      </div>
                      <div className="flex items-center border-2 border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="px-3 py-2"
                          onClick={() => handleUpdateCartQuantity(item.id, -1)}
                        >
                          -
                        </Button>
                        <span className="px-3 font-semibold">{item.quantity}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="px-3 py-2"
                          onClick={() => handleUpdateCartQuantity(item.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {"DZ"} {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-stone-400 py-4">Votre panier est vide.</p>
                )}
              </div>

              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8 flex items-center justify-center gap-2">
                <LucideIcons.Truck className="w-6 h-6 text-rose-500" />
                {"Type de livraison"}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2 block">
                    {"nom"} <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex">
                    <div className="bg-stone-100 dark:bg-slate-700 px-4 py-3 border border-r-0 border-stone-200 dark:border-stone-600 rounded-r-xl">
                      <LucideIcons.User className="w-5 h-5 text-gray-600 dark:text-stone-400" />
                    </div>
                    <Input
                      id="name"
                   
                      className="rounded-l-xl border-l-0 focus:ring-rose-500 focus:border-rose-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2 block">
                    {"telephone"} <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex">
                    <div className="bg-stone-100 dark:bg-slate-700 px-4 py-3 border border-r-0 border-stone-200 dark:border-stone-600 rounded-r-xl">
                      <span className="text-gray-600 dark:text-stone-400">📞</span>
                    </div>
                    <Input
                      id="phone"
                    
                      className="rounded-l-xl border-l-0 focus:ring-rose-500 focus:border-rose-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="province"
                    className="text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2 block"
                  >
                    {"wilaya"}
                  </Label>
                  <Select
                    value={selectedProvince}
                    onValueChange={(value) => {
                      setSelectedProvince(value)
                      setSelectedCommune("")
                    }}
                    required
                  >
                    <SelectTrigger className="w-full focus:ring-rose-500 focus:border-rose-500">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-stone-400">📍</span>
                        <SelectValue placeholder={"alger"} />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {[ { "code": "16", "name": "Alger", "communes": ["Alger Centre", "Bab Ezzouar", "Birtouta", "Zeralda"] },
      { "code": "31", "name": "Oran", "communes": ["Oran", "Es Senia", "Bir El Djir"] },
      { "code": "25", "name": "Constantine", "communes": ["Constantine", "Ali Mendjeli", "Hamma Bouziane"] },
      { "code": "23", "name": "Annaba", "communes": ["Annaba", "El Hadjar", "Berrahal"] },
      { "code": "19", "name": "Sétif", "communes": ["Sétif", "El Eulma", "Béni Ourtilane"] }].map((wilaya: any) => (
                        <SelectItem key={wilaya.code} value={wilaya.name}>
                          {wilaya.code} - {wilaya.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="commune"
                    className="text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2 block"
                  >
                    {"wilaya"} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={selectedCommune}
                    onValueChange={setSelectedCommune}
                    disabled={!selectedProvince}
                    required
                  >
                    <SelectTrigger className="w-full focus:ring-rose-500 focus:border-rose-500">
                      <SelectValue placeholder={"wilaya"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCommunes.map((commune: string) => (
                        <SelectItem key={commune} value={commune}>
                          {commune}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6">
                <Label className="text-sm font-semibold text-gray-700 dark:text-stone-300 mb-4 block">
                  {"type de livraison"}
                </Label>
                <RadioGroup
                  value={selectedDeliveryMethod || ""}
                  onValueChange={setSelectedDeliveryMethod}
                  className="space-y-3"
                >
                  {[{id:"1",name:"domicile",discreption:"",cost:400}].map((method: any) => (
                    <div
                      key={method.id}
                      className="flex items-center space-x-3 p-4 border-2 border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <RadioGroupItem value={method.id} id={method.id} className="text-rose-500" />
                      <Label htmlFor={method.id} className="text-sm font-medium cursor-pointer flex-1">
                        <span className="font-semibold text-gray-800 dark:text-white">{method.name}</span> -{" "}
                        {method.description}
                        <span className="block text-xs text-gray-500 dark:text-stone-400 mt-1">
                          +{productData?.product?.currency} {method.cost?.toFixed(2) || "0.00"}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {selectedDeliveryMethod === "stopdesk" && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-sm text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                
                  </div>
                )}
              </div>
              <div className="mt-8 p-6 bg-stone-100 dark:bg-slate-800 rounded-xl">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-stone-300">{"prix d article"}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {"DZ"} {productTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-stone-300">{"prix de livraison"}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {"DZ"} {shippingCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-3 border-gray-200 dark:border-stone-700">
                    <span className="text-gray-900 dark:text-white">{"prix total"}</span>
                    <span className="text-rose-600 dark:text-rose-400">
                      {"DZ"} {grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 p-4 z-50">
            <div className="max-w-md mx-auto">
              <Button
                type="submit"
                disabled={cart.length === 0}
                className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-rose-600 dark:hover:bg-rose-700 text-white py-4 text-lg font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <LucideIcons.ShoppingCart className="w-5 h-5 ml-2" />
                {cart.length > 0
                  ? `commandez maintenant DZ ${grandTotal.toFixed(2)}`
                  : "Votre panier est vide"}
              </Button>
            </div>
          </div>
        </form>

        <section className="mt-20 py-20 bg-gradient-to-br from-stone-100 to-rose-50 dark:from-slate-800 dark:to-rose-900/40 rounded-3xl overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pourquoi choisir nos mules ?</h2>
              <p className="text-gray-600 dark:text-stone-300 text-lg max-w-2xl mx-auto">
                Découvrez ce qui rend nos chaussures si spéciales et pourquoi des milliers de femmes nous font
                confiance.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {productData.whyChooseUs.map((feature: any, index: number) => {
                const Icon = (LucideIcons as any)[feature.icon] || LucideIcons.Sparkles
                return (
                  <div
                    key={index}
                    className="group opacity-0 animate-fade-in-up"
                    style={{
                      animationDelay: feature.delay,
                      animationFillMode: "forwards",
                    }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm overflow-hidden h-full">
                      <div className="relative overflow-hidden">
                        <Image
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 flex justify-center">
                          <div className="p-3 bg-stone-100 dark:bg-slate-700 rounded-full group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50 transition-colors duration-300">
                            <Icon className="w-6 h-6 text-rose-500 dark:text-rose-400" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-stone-300 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mt-20 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Ce que disent nos clientes
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {productData.testimonials.map((testimonial: any, index: number) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-slate-800 overflow-hidden"
                >
                  {testimonial.reviewImage && (
                    <div className="aspect-video relative">
                      <Image
                        src={testimonial.reviewImage || "/placeholder.svg"}
                        alt={`Review from ${testimonial.name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-stone-400">
                          {testimonial.age} ans, {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <LucideIcons.Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-stone-300 italic">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Faq />

        {isZoomed && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
                onClick={() => setIsZoomed(false)}
              >
                <LucideIcons.X className="w-6 h-6" />
              </Button>
              <Image
                src={zoomedImage || "/placeholder.svg"}
                alt="Zoomed product image"
                width={800}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
      <ThankYouModal isOpen={showThankYou} onClose={() => setShowThankYou(false)} />

      <div className="h-24"></div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
