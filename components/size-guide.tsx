import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { WhatsAppIcon } from "./icons"

const sizeData = [
  { eu: 37, cm: 23.5 },
  { eu: 38, cm: 24.1 },
  { eu: 39, cm: 24.8 },
  { eu: 40, cm: 25.4 },
  { eu: 41, cm: 26.1 },
]

export function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-rose-600 hover:text-rose-800">
          دليل المقاسات
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">دليل المقاسات</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-right">
          <p className="mb-4">للحصول على أفضل مقاس، قيسي طول قدمك من الكعب إلى أطول إصبع وقارنيه بالجدول أدناه.</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">طول القدم (سم)</TableHead>
                <TableHead className="text-right">مقاس EU</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizeData.map((size) => (
                <TableRow key={size.eu}>
                  <TableCell>{size.cm}</TableCell>
                  <TableCell className="font-medium">{size.eu}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-4 text-sm text-gray-600">إذا كنتِ بين مقاسين، نوصي باختيار المقاس الأكبر لراحة أكبر.</p>
        </div>
        <DialogFooter>
          <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white">
            <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="w-5 h-5 ml-2" />
              اسألي عن مقاسك عبر WhatsApp
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
