import React, { useEffect } from "react";
import { ArrowLeft, Heart, Star, Smile, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";
import Seo from "../components/Seo";

interface AboutUsPageProps {
  onBack: () => void;
}

export default function AboutUsPage({ onBack }: AboutUsPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Diffy Games",
    description: "Learn how Diffy Games started on TikTok Shop in 2023 and why the brand creates games that look awesome on screen and feel great to play.",
    url: "https://diffygames.com/about-us",
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      <Seo
        title="About Diffy Games | Viral Games Built for Big Reactions"
        description="Learn how Diffy Games started on TikTok Shop in 2023 and why we build games that look awesome on screen, go viral naturally, and stay fun in real life."
        path="/about-us"
        image="/DiffyLogo.webp"
        keywords="about diffy games, tiktok shop games, viral family games, diffy games story"
        schema={aboutSchema}
      />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm relative">
        <div className="mx-4 lg:mx-8 xl:mx-12 flex items-center h-16 lg:h-20">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:text-[#3d99f6] hover:border-blue-200 transition-colors bg-white shadow-sm z-10"
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
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-[#3d99f6] text-white text-center px-4 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 text-white/20 animate-bounce" style={{ animationDuration: '3s' }}>
            <Star className="w-16 h-16 fill-current" />
          </div>
          <div className="absolute bottom-20 left-16 text-white/20 animate-spin" style={{ animationDuration: '9s' }}>
            <Gamepad2 className="w-20 h-20" />
          </div>
          <div className="absolute bottom-10 right-20 text-white/20 animate-pulse" style={{ animationDuration: '4s' }}>
            <Smile className="w-24 h-24" />
          </div>
          <div className="absolute top-20 right-10 text-white/20 animate-bounce" style={{ animationDuration: '5s' }}>
            <Heart className="w-12 h-12 fill-current" />
          </div>

          <div className="relative z-10 container mx-auto max-w-4xl">
            <span className="inline-block py-1 px-4 bg-white text-[#3d99f6] font-bold rounded-full mb-6 font-display uppercase tracking-widest text-sm shadow-md">
              Our Story
            </span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display uppercase text-5xl md:text-7xl lg:text-8xl mb-6 leading-none drop-shadow-lg"
            >
              Making Playtime <br className="hidden md:block"/> Unforgettable.
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              Diffy launched on TikTok Shop in 2023 with one goal: make games that look awesome on screen, go viral for the right reasons, and are even more fun once they hit the table.
            </motion.p>
          </div>
          
          {/* Wave transition */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" className="fill-gray-50"></path>
            </svg>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center">
                <p className="text-sm font-display uppercase tracking-widest text-[#3d99f6] mb-3">Started</p>
                <p className="text-3xl font-display uppercase text-gray-900">2023</p>
              </div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center">
                <p className="text-sm font-display uppercase tracking-widest text-[#3d99f6] mb-3">Where We Began</p>
                <p className="text-3xl font-display uppercase text-gray-900">TikTok Shop</p>
              </div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center">
                <p className="text-sm font-display uppercase tracking-widest text-[#3d99f6] mb-3">What&apos;s Next</p>
                <p className="text-3xl font-display uppercase text-gray-900">More Games Soon</p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative max-w-6xl mx-auto mb-10"
            >
              <div className="absolute inset-0 bg-amber-200 rounded-[2rem] rotate-[-1.5deg] scale-[1.01]" />
              <div className="relative bg-white rounded-[2rem] border-4 border-white shadow-xl px-6 py-10 md:px-10 md:py-12 lg:px-14 overflow-hidden">
                <div className="absolute -top-12 -right-10 w-40 h-40 bg-[#3d99f6]/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-red-200/50 rounded-full blur-3xl" />
                <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
                  <div>
                    <span className="inline-block py-2 px-4 bg-[#3d99f6]/10 text-[#3d99f6] font-bold rounded-full mb-5 font-display uppercase tracking-widest text-sm">
                      More Than Just Games
                    </span>
                    <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-none">
                      Built to stop the scroll <br className="hidden md:block"/> and win game night
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 max-w-2xl">
                      We started Diffy on TikTok Shop in 2023 after seeing how fast people connect with games that feel exciting the second they appear on screen. Our goal was simple: create games that look awesome in content, feel instantly shareable, and deliver real fun the moment people open the box.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
                      That means bright visuals, satisfying gameplay, easy-to-learn rules, and enough competition to keep everyone locked in for just one more round. We want every game to feel bold online and even better in real life.
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <div className="bg-[#3d99f6] text-white rounded-[1.75rem] p-6 shadow-lg">
                      <p className="font-display uppercase tracking-widest text-sm text-white/80 mb-3">On Screen</p>
                      <p className="text-2xl font-display uppercase leading-tight">Awesome visuals that instantly grab attention</p>
                    </div>
                    <div className="bg-white rounded-[1.75rem] p-6 border border-gray-200 shadow-sm">
                      <p className="font-display uppercase tracking-widest text-sm text-red-500 mb-3">In The Moment</p>
                      <p className="text-xl font-semibold text-gray-900 leading-snug">Fast starts, big reactions, and the kind of fun people want to replay and repost.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 max-w-6xl mx-auto items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-red-300 rounded-[2rem] rotate-[1.5deg] scale-[1.01]" />
                <div className="relative bg-white rounded-[2rem] border-4 border-white shadow-xl p-8 md:p-10 h-full">
                  <span className="inline-block py-2 px-4 bg-red-50 text-red-500 font-bold rounded-full mb-5 font-display uppercase tracking-widest text-sm">
                    Why Diffy Works
                  </span>
                  <h2 className="font-display uppercase text-4xl md:text-5xl text-gray-900 mb-6 leading-none">
                    Viral energy. <br className="hidden md:block"/> Real play value.
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    We design for those high-reaction moments people love to share: close calls, fast hands, loud laughs, friendly trash talk, and rematches that happen immediately.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    Under that energy, the focus is still the same: make games that are very fun, easy to bring out with friends or family, and memorable enough to become favorites instead of one-time novelties.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold font-display uppercase tracking-widest">
                      Viral
                    </div>
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold font-display uppercase tracking-widest">
                      Fun
                    </div>
                    <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-bold font-display uppercase tracking-widest">
                      Replayable
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-violet-200 rounded-[2rem] -rotate-[1.5deg] scale-[1.01]" />
                <div className="relative bg-gray-900 text-white rounded-[2rem] shadow-xl p-8 md:p-10 h-full overflow-hidden">
                  <div className="absolute top-0 right-0 w-56 h-56 bg-[#3d99f6]/20 rounded-full blur-3xl" />
                  <div className="relative">
                    <span className="inline-block py-2 px-4 bg-white/10 text-white font-bold rounded-full mb-5 font-display uppercase tracking-widest text-sm border border-white/10">
                      What&apos;s Coming
                    </span>
                    <h2 className="font-display uppercase text-4xl md:text-5xl mb-6 leading-none">
                      More games are coming very soon
                    </h2>
                    <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-2xl">
                      Diffy is growing fast, and we&apos;re already working on more games that fit the same vision: products that look incredible on screen, spark immediate curiosity, and turn into real crowd-pleasers once people start playing.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
                        <p className="font-display uppercase tracking-widest text-xs text-white/70 mb-2">Designed For</p>
                        <p className="text-lg font-semibold">Big reactions</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
                        <p className="font-display uppercase tracking-widest text-xs text-white/70 mb-2">Made To Be</p>
                        <p className="text-lg font-semibold">Shared everywhere</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
                        <p className="font-display uppercase tracking-widest text-xs text-white/70 mb-2">Built Around</p>
                        <p className="text-lg font-semibold">Fun first</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </section>
        
        {/* Bottom CTA */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display uppercase text-4xl md:text-6xl text-gray-900 mb-8 leading-none">
              Ready to Play?
            </h2>
            <button 
              onClick={onBack}
              className="bg-gray-900 text-white font-display uppercase tracking-widest text-lg px-10 py-5 rounded-2xl hover:bg-[#3d99f6] transition-colors duration-300 shadow-xl hover:shadow-2xl active:scale-95"
            >
              Shop Our Games
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
