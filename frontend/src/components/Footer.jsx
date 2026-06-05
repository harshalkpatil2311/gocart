function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 font-bold text-white shadow-lg">
                Go
              </div>
              <span className="text-xl font-bold tracking-tight text-white">GoCart</span>
            </div>
            <p className="mb-6 text-sm">
              India's #1 Smart Marketplace for electronics, fashion, and daily needs.
            </p>
            <div className="flex gap-4">
              <button className="text-slate-400 hover:text-white" aria-label="Facebook">📱</button>
              <button className="text-slate-400 hover:text-white" aria-label="Twitter">🐦</button>
              <button className="text-slate-400 hover:text-white" aria-label="Instagram">📸</button>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-primary-400">About GoCart</button></li>
              <li><button className="hover:text-primary-400">Careers</button></li>
              <li><button className="hover:text-primary-400">Press Releases</button></li>
              <li><button className="hover:text-primary-400">GoCart Science</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Connect with Us</h3>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-primary-400">Facebook</button></li>
              <li><button className="hover:text-primary-400">Twitter</button></li>
              <li><button className="hover:text-primary-400">Instagram</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-primary-400">Sell on GoCart</button></li>
              <li><button className="hover:text-primary-400">Protect and Build Your Brand</button></li>
              <li><button className="hover:text-primary-400">Global Selling</button></li>
              <li><button className="hover:text-primary-400">Become an Affiliate</button></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
          <p>© 2026 GoCart Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
