import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Seo from "../components/Seo";

type InfoSection = {
  heading: string;
  paragraphs: string[];
};

interface InfoPageProps {
  title: string;
  description: string;
  path: string;
  intro: string;
  sections: InfoSection[];
  onBack: () => void;
}

export default function InfoPage({ title, description, path, intro, sections, onBack }: InfoPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `https://diffygames.com${path}`,
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      <Seo title={`${title} | Diffy Games`} description={description} path={path} schema={pageSchema} />

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
              alt="Diffy Games"
              className="h-10 lg:h-14 w-auto object-contain pointer-events-auto cursor-pointer"
              onClick={onBack}
            />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#3d99f6] px-4 py-20 text-white text-center lg:py-28">
          <div className="relative z-10 mx-auto max-w-4xl">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display uppercase text-4xl md:text-6xl lg:text-7xl leading-none drop-shadow-lg mb-6"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-3xl text-lg md:text-2xl text-white/90 leading-relaxed"
            >
              {intro}
            </motion.p>
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" className="fill-gray-50"></path>
            </svg>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="rounded-[2rem] bg-white border border-gray-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-6 md:p-10 lg:p-12 space-y-10">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-display uppercase text-2xl md:text-3xl text-gray-900 leading-none mb-4">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-gray-700 text-base md:text-lg leading-8">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
