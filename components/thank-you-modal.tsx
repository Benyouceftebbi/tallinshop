"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface ThankYouModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center p-8">
        <div className="confetti-container" />
        <DialogHeader className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <DialogTitle className="text-2xl font-bold">شكراً لطلبك!</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 mt-2 mb-6">سنتواصل معك قريباً لتأكيد الطلب.</p>
        <Button onClick={onClose} className="w-full">
          إغلاق
        </Button>
        <style jsx>{`
          .confetti-container {
            /* Basic confetti styles, can be enhanced with JS */
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
          }
          /* Add more complex confetti animations here if needed */
        `}</style>
      </DialogContent>
    </Dialog>
  )
}
