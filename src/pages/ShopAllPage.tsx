import React, { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Seo from "../components/Seo";

type ShopAllProduct = {
  id: string;
  name: string;
  image: string;
  page: string;
  basePrice: number;
  originalPrice: number;
};

interface ShopAllPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  products: ShopAllProduct[];
}

export default function ShopAllPage({ onBack, onNavigate, products }: ShopAllPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const collectionSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shop All Diffy Games",
    description: "Browse all board games and party games from Diffy Games.",
    url: "https://diffygames.com/shop-all",
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      <Seo
        title="Shop All Board Games and Party Games | Diffy Games"
        description="Browse every Diffy Games product in one place, including Stack Attack, Wack A Balloon, Stack Attack XL, and Party Edition."
        path="/shop-all"
        image="/StackAttack_HeroImage.webp"
        keywords="shop all board games, party games, diffy games, family games"
        schema={collectionSchema}
      />
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm relative">
        <div className="mx-4 lg:mx-8 xl:mx-12 flex items-center h-16 lg:h-20">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:text-[#3d99f6] hover:border-blue-200 transition-colors bg-white shadow-sm z-10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="font-bold text-xs lg:text-sm uppercase tracking-widest font-display">Back</span>
          </button>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src="/DiffyLogo.webp"
              alt="Diffy Toys and Games"
              className="h-10 lg:h-14 w-auto object-contain pointer-events-auto cursor-pointer"
              onClick={onBack}
            />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#3d99f6] px-4 py-20 text-white text-center lg:py-28">
          <div className="absolute inset-0 opacity-15" aria-hidden="true">
            <div className="absolute left-[-4rem] top-8 h-40 w-40 rounded-full bg-white blur-3xl" />
            <div className="absolute right-[-2rem] top-16 h-52 w-52 rounded-full bg-amber-300 blur-3xl" />
            <div className="absolute bottom-[-3rem] left-1/3 h-48 w-48 rounded-full bg-red-300 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <span className="inline-block rounded-full bg-white px-4 py-1 font-bold font-display uppercase tracking-widest text-[#3d99f6] text-sm shadow-md mb-6">
              Shop All
            </span>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display uppercase text-5xl md:text-7xl lg:text-8xl leading-none drop-shadow-lg mb-6"
            >
              All Diffy <br className="hidden md:block" /> Games
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg md:text-2xl text-white/90 leading-relaxed"
            >
              Explore every Diffy game in one place, then jump into each product page for full details, photos, and ordering.
            </motion.p>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" className="fill-gray-50"></path>
            </svg>
          </div>
        </section>

        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {products.map((product, index) => {
                const discount = Math.max(0, Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100));

                return (
                  <motion.a
                    key={product.id}
                    href={`/${product.page}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.35 }}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(product.page);
                    }}
                    className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white text-left shadow-[0_18px_50px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3d99f6] focus:ring-offset-2"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent via-transparent to-[#3d99f6]/5" />
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900 shadow-sm">
                        Save {discount}%
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#3d99f6] mb-3">Diffy Game</p>
                      <h2 className="font-display uppercase text-2xl leading-tight text-gray-900 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h2>
                      <div className="mt-4 flex items-end gap-3">
                        <span className="text-2xl font-bold text-gray-900">${product.basePrice.toFixed(2)}</span>
                        <span className="text-sm font-semibold text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                      </div>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 group-hover:text-red-600 transition-colors">
                        View product <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
