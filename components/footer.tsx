import { InstagramIcon, WhatsAppIcon, FacebookIcon } from "./icons"
import { ThemeToggle } from "./theme-toggle"

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a href="#" aria-label="WhatsApp" className="hover:text-rose-400 transition-colors">
            <WhatsAppIcon className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-rose-400 transition-colors">
            <InstagramIcon className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-rose-400 transition-colors">
            <FacebookIcon className="w-6 h-6" />
          </a>
        </div>
        <p className="text-sm text-center">© 2025 جميع الحقوق محفوظة - سابو أنيق</p>
        <ThemeToggle />
      </div>
    </footer>
  )
}
