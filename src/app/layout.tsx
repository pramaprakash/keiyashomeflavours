import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keiya's Home Flavour's | Authentic Heritage Reimagined",
  description: "A premium culinary space displaying heritage recipes and cooking videos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800;900&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md min-h-full flex flex-col">
        {/* Main Content Area */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="bg-surface-container-high w-full mt-16 border-t border-outline-variant/20 pb-20 md:pb-0 relative overflow-hidden">
          {/* Opaque Cooking Images Ribbon (Modernized grid overlay) */}
          <div className="w-full grid grid-cols-3 sm:grid-cols-6 border-b border-outline-variant/20 bg-black/5">
            {[
              {
                alt: "Beetroot Pachadi",
                url: "https://lh3.googleusercontent.com/aida-public/AB6AXuACY6K7RH67m6vgzql94jsTXX8IbHz0QBM76RVhlNIDFbmpbVhXlVUr6pTk9nI1NcOL_Mxfum0jQxU3B201OeP6X_0i3CdzYjeTFe9-PmFb2YgLilv4bxKdW6cZyimfQW56b_m958tHlte54XvI2rG7titAVor5aTLkJFuC78TIZPJF0FjXWgIUfdgM8mHuH1A5q5kG3wxN-2E-NkNcPnMQ591aNHeEeGlj0azIcRuYlgbGgCYSB7bc",
              },
              {
                alt: "Dosa Spread",
                url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=300&auto=format&fit=crop",
              },
              {
                alt: "Cooking Curry",
                url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhQdPTajuew8Zg-TxtWMetOeDXoJRaJFhw8Pjs5uaseY1H_yfBJBJmTg4MwQk3YutB_DdBdfRVDzZoJMHBqiR6Ky0r09Iuz9n2AmALpqNVD5T2D6ecFAE8Q0TiQ65FzXJu-y-wnpzAvOvyC6YaEqbOwGuf69lgtZWRQ0bdWQi1BQGsm3sAjkIBAwbe8UGqhh0W_JNaYmG98owP_77o55bjBFYB9X-mwfX5IebmKuhB_KUGK1xsYzus",
              },
              {
                alt: "Fresh Salad",
                url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop",
              },
              {
                alt: "Yogurt Blend",
                url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp3V7wq94nIBBCw0TkuYZb1kNudmbRMIcGzNjsA1WTrpOZQv2Whg-8-ryJJGK9yk33ffHp_LZHSbb5peNDm5ddWcPFCwNKr-d7PHcYyk_QAkTgRUmLIzeYAXhQeiuEQlZkFQ4f9gYPKvUb0ZIwpjL4XkHQgLTy1kZXZNWr9u_JN0V-jU_NqvUTxAM3ql5AyeHwA0VDfDQeFZj_rX8k5Bm7MB78O2RgYzhcuIuqnXDraohHMqq93LoJ",
              },
              {
                alt: "Mustard Seeds Spicing",
                url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsnq7RI9ro8EOUdov3sdUUfaW8hU26ua-qKCrjdDtJinXi-0yY87OMvqATy8JBCF-qAaNoOz22wBR98K5IF3gfY8gKe0fmSbU3WvI0kVY8G0HynMXS9jtg3g0jcNTINaOnkHNnTGCvrKRh5x9lwEnRvda6cofwKWj3vtnMNRhpYPYBa7fwlQ-HjlTAMkaW4YrE34RqNvd1v-sOSAccwsqBMW0whsFHccIDyNnjjAAFDiSyHLbbWhdK",
              },
            ].map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden h-28 w-full group">
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover opacity-25 grayscale hover:opacity-75 hover:grayscale-0 transition-all duration-500 ease-out transform group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Footer Text Links Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-margin-mobile md:px-margin-desktop py-12 max-w-7xl mx-auto relative z-10">
            {/* Brand Manifesto Reading Block */}
            <div className="lg:col-span-7 bg-surface-container-low/55 rounded-2xl p-6 md:p-8 border border-outline-variant/30 flex flex-col justify-between shadow-xs">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-primary font-label-md text-[10px] uppercase tracking-wider mb-4 font-black">
                  Our Mission
                </span>
                <h4 className="font-headline-sm text-lg md:text-xl font-bold text-primary mb-3 uppercase tracking-wider">
                  Keiya&apos;s Home Flavour&apos;s
                </h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed max-w-xl">
                  We believe that traditional cooking is not about copying the past, but about passing down the warmth of home. Keiya&apos;s Home Flavour&apos;s serves as a premium, curated archive of heritage family recipes, combining detailed step-by-step guidance with live masterclass cooking videos to keep kitchen wisdom alive.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="font-body-sm text-xs text-outline leading-normal">
                  © {new Date().getFullYear()} KEIYA&apos;S HOME FLAVOUR&apos;S. AUTHENTIC HOME FLAVOURS, REIMAGINED.
                </p>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-85" title="Menu QR Code">qr_code_2</span>
                  <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-85" title="Camera/Gallery">photo_camera</span>
                  <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-85" title="Contact Email">alternate_email</span>
                </div>
              </div>
            </div>

            {/* Navigation Menus block */}
            <div className="lg:col-span-5 bg-surface-container-low/30 rounded-2xl p-6 md:p-8 border border-outline-variant/20 grid grid-cols-2 gap-8 items-start shadow-xs">
              <div className="space-y-3">
                <p className="font-label-md text-sm text-primary font-black uppercase tracking-wider">Explore</p>
                <Link href="/" className="block font-body-sm text-sm text-on-surface-variant hover:text-primary transition-colors">
                  The Story
                </Link>
                <Link href="/" className="block font-body-sm text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Recipes
                </Link>
                <Link href="/upload" className="block font-body-sm text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Submit Recipe
                </Link>
              </div>
              <div className="space-y-3">
                <p className="font-label-md text-sm text-primary font-black uppercase tracking-wider">Legal</p>
                <a href="#" className="block font-body-sm text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block font-body-sm text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* BottomNavBar (Mobile Only) */}
        <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface shadow-[0_-4px_20px_rgba(45,75,55,0.08)] border-t border-outline-variant/30">
          <div className="flex justify-around items-center h-16 px-4">
            <Link href="/" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">explore</span>
              <span className="font-label-md text-[10px] mt-1">Discover</span>
            </Link>
            <Link href="/upload" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">add_circle</span>
              <span className="font-label-md text-[10px] mt-1">Upload</span>
            </Link>
            <Link href="/saved" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">bookmark</span>
              <span className="font-label-md text-[10px] mt-1">Saved</span>
            </Link>
          </div>
        </nav>
      </body>
    </html>
  );
}
