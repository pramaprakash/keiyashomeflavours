import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://keiyashomeflavours.com"),
  title: {
    default: "Keiya's Home Flavours | Authentic Kerala Onam Sadya Recipes",
    template: "%s | Keiya's Home Flavours",
  },
  description:
    "Discover authentic Kerala Onam Sadya recipes, cinema-style masterclass videos, and step-by-step culinary guides by Chef Keiya.",
  keywords: [
    "Keiya's Home Flavours",
    "Onam Sadya Recipes",
    "Kerala Parippu Curry",
    "Kerala Cuisine",
    "Authentic Indian Vegetarian Recipes",
    "Sadya Delicacies",
    "Chef Keiya",
  ],
  authors: [{ name: "Chef Keiya" }],
  creator: "Chef Keiya",
  publisher: "Keiya's Home Flavours",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://keiyashomeflavours.com",
    title: "Keiya's Home Flavours | Authentic Kerala Onam Sadya Recipes",
    description:
      "Discover authentic Kerala Onam Sadya recipes, cinema-style masterclass videos, and step-by-step culinary guides by Chef Keiya.",
    siteName: "Keiya's Home Flavours",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Keiya's Home Flavours Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keiya's Home Flavours | Authentic Kerala Onam Sadya Recipes",
    description:
      "Discover authentic Kerala Onam Sadya recipes, cinema-style masterclass videos, and step-by-step culinary guides by Chef Keiya.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800;900&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md min-h-full flex flex-col" suppressHydrationWarning>
        {/* Google Tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L7HQJ0EF1V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L7HQJ0EF1V');
          `}
        </Script>

        {/* Main Content Area */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="bg-primary w-full mt-16 border-t border-primary/20 pb-24 md:pb-12 relative overflow-hidden">
          {/* Decorative Floating Culinary Outline Watermarks */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            <span className="material-symbols-outlined absolute text-[120px] -left-10 top-12 text-white/[0.02] -rotate-12">skillet</span>
            <span className="material-symbols-outlined absolute text-[140px] left-[20%] bottom-8 text-white/[0.02] rotate-45">restaurant</span>
            <span className="material-symbols-outlined absolute text-[100px] left-[40%] top-6 text-white/[0.02] -rotate-45">soup_kitchen</span>
            <span className="material-symbols-outlined absolute text-[150px] right-[25%] top-16 text-white/[0.02] rotate-12">flatware</span>
            <span className="material-symbols-outlined absolute text-[130px] -right-12 bottom-6 -rotate-12">nutrition</span>
            <span className="material-symbols-outlined absolute text-[90px] right-[45%] bottom-12 text-white/[0.02] rotate-[30deg]">kettle</span>
          </div>
          {/* Opaque Cooking Images Ribbon (Modernized grid overlay) */}
          <div className="w-full grid grid-cols-3 sm:grid-cols-6 border-b border-white/5 bg-black/10">
            {[
              {
                alt: "Kitchen preparation",
                url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop",
              },
              {
                alt: "Indian spices and chopping board",
                url: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=400&auto=format&fit=crop",
              },
              {
                alt: "Gourmet plating",
                url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop",
              },
              {
                alt: "Stirring aromatic curry",
                url: "https://images.unsplash.com/photo-1560684352-8497838a2229?q=80&w=400&auto=format&fit=crop",
              },
              {
                alt: "Fresh ground herbs and garlic",
                url: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=400&auto=format&fit=crop",
              },
              {
                alt: "Slow simmering sauce",
                url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=400&auto=format&fit=crop",
              },
            ].map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden h-28 w-full group border-r border-white/5 last:border-r-0">
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover opacity-30 grayscale hover:opacity-85 hover:grayscale-0 transition-all duration-500 ease-out transform group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/20 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Footer Text Area with Dot Pattern */}
          <div className="px-margin-mobile md:px-margin-desktop py-16 max-w-7xl mx-auto relative z-10 flex flex-col gap-10">
            {/* Grid Layout: Brand Note on the Left, Explore & Legal on the Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Brand Note Column */}
              <div className="md:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-sm bg-white flex items-center justify-center">
                    <img src="/logo.jpg" alt="Keiya's Home Flavours Logo" className="w-full h-full object-cover scale-105" />
                  </div>
                  <h4 className="font-headline-sm text-base md:text-lg font-black text-white uppercase tracking-wider">
                    Keiya&apos;s Home Flavour&apos;s
                  </h4>
                </div>
                <p className="font-body-sm text-sm text-on-primary/75 leading-relaxed w-full">
                  We believe that traditional cooking is not about copying the past, but about passing down the warmth of home. Keiya&apos;s Home Flavour&apos;s serves as a premium, curated archive of heritage family recipes, combining detailed step-by-step guidance with live masterclass cooking videos to keep kitchen wisdom alive.
                </p>
              </div>

              {/* Explore Column */}
              <div className="md:col-span-3 space-y-3">
                <p className="font-label-md text-xs font-black text-secondary-fixed-dim uppercase tracking-widest pt-2">Explore</p>
                <div className="flex flex-col gap-2">
                  <Link href="/" className="font-body-sm text-sm text-on-primary/75 hover:text-white transition-colors">
                    The Story
                  </Link>
                  <Link href="/" className="font-body-sm text-sm text-on-primary/75 hover:text-white transition-colors">
                    Recipes
                  </Link>
                  <Link href="/upload" className="font-body-sm text-sm text-on-primary/75 hover:text-white transition-colors">
                    Submit Recipe
                  </Link>
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="font-body-sm text-sm text-on-primary/75 hover:text-white transition-colors">
                    Sitemap
                  </a>
                </div>
              </div>

              {/* Legal Column */}
              <div className="md:col-span-3 space-y-3">
                <p className="font-label-md text-xs font-black text-secondary-fixed-dim uppercase tracking-widest pt-2">Legal</p>
                <div className="flex flex-col gap-2">
                  <a href="#" className="font-body-sm text-sm text-on-primary/75 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="font-body-sm text-sm text-on-primary/75 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>

            {/* Sub-Footer Divider & Content */}
            <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-body-sm text-xs text-on-primary/50 leading-relaxed">
                © {new Date().getFullYear()} KEIYA&apos;S HOME FLAVOUR&apos;S. AUTHENTIC HOME FLAVOURS, REIMAGINED.
              </p>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary-fixed-dim cursor-pointer hover:text-white transition-colors" title="Menu QR Code">qr_code_2</span>
                <span className="material-symbols-outlined text-secondary-fixed-dim cursor-pointer hover:text-white transition-colors" title="Camera/Gallery">photo_camera</span>
                <span className="material-symbols-outlined text-secondary-fixed-dim cursor-pointer hover:text-white transition-colors" title="Contact Email">alternate_email</span>
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
