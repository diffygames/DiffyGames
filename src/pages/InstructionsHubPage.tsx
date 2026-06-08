import React, { useEffect, useState } from "react";
import { ArrowLeft, Gamepad2, Puzzle, Sparkles, X, Download, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo";

interface InstructionsHubPageProps {
  onBack: () => void;
  onNavigate: (page: any) => void;
}

export default function InstructionsHubPage({ onBack, onNavigate }: InstructionsHubPageProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle escaping the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedGame(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const games = [
    { name: "Stack Attack XL",              img: "/StackXLLogo.webp",      page: "stack-attack-xl",         color: "group-hover:text-amber-500" },
    { name: "Stack Attack",                 img: "/StackLogo.webp",        page: "stack-attack",            color: "group-hover:text-red-500" },
    { name: "Wack A Balloon",               img: "/WackLogo.webp",         page: "wack-a-balloon",          color: "group-hover:text-blue-500" },
    { name: "Wack A Balloon Party",         img: "/PartyEditionLogo.webp", page: "wack-a-balloon-party",    color: "group-hover:text-purple-500" },
  ];

  return (
    <>
      <Seo
        title="Game Instructions | How to Play Diffy Games"
        description="Find official instructions for Stack Attack, Stack Attack XL, Wack A Balloon, and Wack A Balloon Party Edition on Diffy Games."
        path="/instructions"
        image="/InstructionsForStackandXL.webp"
        keywords="Diffy Games instructions, how to play Stack Attack, how to play Wack A Balloon, game rules"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Diffy Games Instructions",
          description: "Official gameplay instructions for Diffy Games products.",
          url: "https://diffygames.com/instructions",
        })}
      />
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
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
        <section className="relative pt-16 pb-28 lg:pt-24 lg:pb-44 bg-[#3d99f6] text-white text-center px-4 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 text-white/40 animate-spin" style={{ animationDuration: '10s' }}>
            <Puzzle className="w-16 h-16" />
          </div>
          <div className="absolute bottom-32 left-16 text-white/40 animate-pulse" style={{ animationDuration: '4s' }}>
            <Sparkles className="w-20 h-20" />
          </div>
          <div className="absolute bottom-32 right-20 text-white/40 animate-bounce" style={{ animationDuration: '5s' }}>
            <Gamepad2 className="w-20 h-20" />
          </div>

          <div className="relative z-10 container mx-auto max-w-4xl">
            <span className="inline-block py-1 px-4 bg-white text-[#3d99f6] font-bold rounded-full mb-6 font-display uppercase tracking-widest text-sm shadow-md">
              Rule Books & Guides
            </span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display uppercase text-5xl md:text-7xl lg:text-8xl mb-6 leading-none drop-shadow-lg text-white"
            >
              How to Play <br className="hidden md:block"/> Our Games!
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Lost the manual? Trying to settle a family dispute? Choose your game below to learn the official rules.
            </motion.p>
          </div>
          
          {/* Smooth Wave transition */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-[60px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,20 C150,100 350,0 600,40 C850,80 1050,0 1200,20 L1200,120 L0,120 Z" className="fill-gray-50"></path>
            </svg>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {games.map((game, i) => (
                <motion.div
                  key={game.name}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  onClick={() => setSelectedGame(game.name)}
                  className="group bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center cursor-pointer text-center relative overflow-hidden"
                >
                  {/* Subtle color overlay on hover */}
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                  
                  <div className="relative z-10 w-full aspect-square rounded-[2rem] overflow-hidden bg-white shadow-sm group-hover:scale-110 transition-transform duration-500 border border-gray-100 mb-6 flex items-center justify-center p-4">
                    <img 
                      src={game.img} 
                      alt={game.name} 
                      className="w-full h-full object-contain drop-shadow-md" 
                    />
                  </div>
                  
                  <h3 className={`relative z-10 font-display uppercase tracking-widest text-xl text-gray-900 leading-tight transition-colors duration-300 ${game.color}`}>
                    {game.name}
                  </h3>
                  
                  <span className={`relative z-10 mt-4 px-4 py-1.5 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md ${game.color.replace('text', 'bg').replace("group-hover:", "hover:")}`}>
                    View Manual
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* Modal Popout */}
        <AnimatePresence>
          {selectedGame && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedGame(null)}
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm cursor-pointer"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="relative flex items-center justify-center p-6 md:p-8 border-b border-gray-100 bg-gray-50/50 rounded-t-[2rem]">
                  <h2 className="font-display uppercase text-3xl md:text-5xl tracking-widest text-[#3d99f6] text-center px-12">
                    {selectedGame}
                  </h2>
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="absolute right-6 md:right-8 p-3 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm border border-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 md:px-12 scroll-smooth">
                  {selectedGame === "Stack Attack XL" ? (
                    <div className="space-y-12">
                      
                      {/* Photo Section */}
                      <section>
                        <h3 className="font-display uppercase text-2xl text-gray-900 mb-4 tracking-widest drop-shadow-sm">How To Play Stack Attack XL!</h3>
                        <div className="w-full rounded-[2rem] overflow-hidden shadow-lg border border-gray-200">
                          <img src="/stack xl jack stacking falling.webp" alt="Stack Attack XL gameplay — giant stacking game in action" className="w-full h-auto object-cover" loading="lazy" />
                        </div>
                      </section>

                      {/* Download Section */}
                      <section className="bg-amber-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-amber-100 shadow-sm">
                        <div>
                          <h3 className="font-display uppercase text-2xl text-amber-900 mb-2 tracking-widest">Digital Manual</h3>
                          <p className="text-amber-800/80 text-lg">Need a physical copy? Download the high-resolution pages to print at home.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                          <a href="/StackAttackXLInstructions1.webp" download="StackAttackXL_Page1.webp" className="bg-[#3d99f6] hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors active:scale-95">
                            <Download className="w-5 h-5" />
                            Page 1
                          </a>
                          <a href="/StackAttackXLInstructions2.webp" download="StackAttackXL_Page2.webp" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors active:scale-95">
                            <Download className="w-5 h-5" />
                            Page 2
                          </a>
                        </div>
                      </section>

                      {/* Visual & Included Section */}
                      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-2">
                        <div className="bg-white border text-center border-gray-200 rounded-[2rem] p-8 shadow-sm">
                          <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-8 text-2xl">Visual Guide</h4>
                          <div className="w-full flex-1 flex flex-col justify-center items-center">
                            <img src="/InstructionsForStackandXL.webp" alt="Stack Attack and Stack Attack XL visual instruction guide" className="w-full h-auto object-contain drop-shadow-md rounded-[1.5rem] border border-gray-100" />
                          </div>
                        </div>

                        <div className="bg-white border text-center border-gray-200 rounded-[2rem] p-8 shadow-sm">
                          <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-8 text-2xl">Everything Included</h4>
                          <ul className="space-y-5 text-left pl-4 lg:pl-10">
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">100x</strong> Tetrominos
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Stack Attack XL Tower
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Stack Attack XL Base
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">36x</strong> Challenge Cards
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> XL Travel Bag
                            </li>
                          </ul>
                        </div>
                      </section>

                      {/* Text Instructions */}
                      <section className="pb-10">
                        <h3 className="font-display uppercase text-2xl text-gray-900 mb-8 flex items-center gap-3 tracking-widest">
                          <span className="w-10 h-10 bg-[#3d99f6] rounded-xl flex items-center justify-center text-white shadow-md">
                            <CheckCircle2 className="w-6 h-6" />
                          </span>
                          Classic Mode Rules
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-gray-700 text-lg leading-relaxed">
                          
                          {/* Col 1 */}
                          <div>
                            <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-4 text-xl">Set Up</h4>
                            <ul className="space-y-4">
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Place the Base:</strong> Set the rectangular base on a flat, stable surface like a table or floor.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Position the Tower:</strong> Carefully balance the Stack Attack tower in the center of the base.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Lay Out the Pieces:</strong> Spread out all 100 tetromino pieces within easy reach of all players.</span>
                              </li>
                            </ul>

                            <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mt-10 mb-4 text-xl">Winning The Game</h4>
                            <ol className="space-y-4 list-decimal list-outside ml-5">
                              <li className="pl-1">Players keep taking turns stacking pieces.</li>
                              <li className="pl-1">Each piece must remain balanced for 3 seconds after you let go.</li>
                              <li className="pl-1">If the tower falls during your turn, you're eliminated.</li>
                              <li className="pl-1"><strong className="text-gray-900 text-xl text-[#3d99f6] block mt-4">The last player left standing wins!</strong></li>
                            </ol>
                          </div>
                          
                          {/* Col 2 */}
                          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 shadow-sm h-fit">
                            <h4 className="font-display uppercase tracking-widest text-amber-500 mb-6 text-xl">How To Play</h4>
                            <ul className="space-y-6">
                              <li className="flex gap-3">
                                <span className="font-bold text-amber-500 mt-0.5 text-xl">•</span>
                                <span><strong className="text-gray-900">Start the Game:</strong> Choose a player to go first.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-amber-500 mt-0.5 text-xl">•</span>
                                <span><strong className="text-gray-900">Take Turns:</strong> On your turn, place one tetromino onto the tower.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-red-500 mt-0.5 text-xl">•</span>
                                <span><strong className="text-gray-900">Don't Let It Fall:</strong> If the tower collapses during your turn, you're out. Reset the tower and keep playing with the remaining players.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-amber-500 mt-0.5 text-xl">•</span>
                                <span><strong className="text-gray-900">Optional - Card Mode:</strong> Draw a card before your turn and follow the challenge shown.</span>
                              </li>
                            </ul>
                          </div>
                          
                        </div>
                      </section>

                    </div>
                  ) : selectedGame === "Stack Attack" ? (
                    <div className="space-y-12">
                      
                      {/* Photo Section */}
                      <section>
                        <h3 className="font-display uppercase text-2xl text-gray-900 mb-4 tracking-widest drop-shadow-sm">How To Play Stack Attack!</h3>
                        <div className="w-full rounded-[2rem] overflow-hidden shadow-lg border border-gray-200">
                          <img src="/Family_Playing_Stack_Attack.webp" alt="Family playing Stack Attack stacking game together" className="w-full h-auto object-cover" loading="lazy" />
                        </div>
                      </section>

                      {/* Download Section */}
                      <section className="bg-amber-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-amber-100 shadow-sm">
                        <div>
                          <h3 className="font-display uppercase text-2xl text-amber-900 mb-2 tracking-widest">Digital Manual</h3>
                          <p className="text-amber-800/80 text-lg">Need a physical copy? Download the high-resolution pages to print at home.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                          <a href="/StackInstructions1.webp" download="StackAttack_Page1.webp" className="bg-[#3d99f6] hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors active:scale-95">
                            <Download className="w-5 h-5" />
                            Page 1
                          </a>
                          <a href="/StackInstructions2.webp" download="StackAttack_Page2.webp" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors active:scale-95">
                            <Download className="w-5 h-5" />
                            Page 2
                          </a>
                        </div>
                      </section>

                      {/* Visual & Included Section */}
                      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-2">
                        <div className="bg-white border text-center border-gray-200 rounded-[2rem] p-8 shadow-sm">
                          <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-8 text-2xl">Visual Guide</h4>
                          <div className="w-full flex-1 flex flex-col justify-center items-center">
                            <img src="/InstructionsForStackandXL.webp" alt="Stack Attack visual instruction guide and gameplay overview" className="w-full h-auto object-contain drop-shadow-md rounded-[1.5rem] border border-gray-100" />
                          </div>
                        </div>

                        <div className="bg-white border text-center border-gray-200 rounded-[2rem] p-8 shadow-sm">
                          <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-8 text-2xl">Everything Included</h4>
                          <ul className="space-y-5 text-left pl-4 lg:pl-10">
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">48x</strong> Tetrominos
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Stack Attack Tower
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Stack Attack Base
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">36x</strong> Challenge Cards
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Travel Bag
                            </li>
                          </ul>
                        </div>
                      </section>

                      {/* Text Instructions */}
                      <section className="pb-10">
                        <h3 className="font-display uppercase text-2xl text-gray-900 mb-8 flex items-center gap-3 tracking-widest">
                          <span className="w-10 h-10 bg-[#3d99f6] rounded-xl flex items-center justify-center text-white shadow-md">
                            <CheckCircle2 className="w-6 h-6" />
                          </span>
                          Classic Mode Rules
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-gray-700 text-lg leading-relaxed">
                          
                          {/* Col 1 */}
                          <div>
                            <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-4 text-xl">Set Up</h4>
                            <ul className="space-y-4">
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Place the Base:</strong> Set the rectangular base on a flat, stable surface like a table or floor.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Position the Tower:</strong> Carefully balance the Stack Attack tower in the center of the base.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Lay Out the Pieces:</strong> Spread out all 48 tetromino pieces within easy reach of all players.</span>
                              </li>
                            </ul>

                            <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mt-10 mb-4 text-xl">Winning The Game</h4>
                            <ol className="space-y-4 list-decimal list-outside ml-5">
                              <li className="pl-1">Players keep taking turns stacking pieces.</li>
                              <li className="pl-1">Each piece must remain balanced for 3 seconds after you let go.</li>
                              <li className="pl-1">If the tower falls during your turn, you're eliminated.</li>
                              <li className="pl-1"><strong className="text-gray-900 text-xl text-[#3d99f6] block mt-4">The last player left standing wins!</strong></li>
                            </ol>
                          </div>
                          
                          {/* Col 2 */}
                          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 shadow-sm h-fit">
                            <h4 className="font-display uppercase tracking-widest text-amber-500 mb-6 text-xl">How To Play</h4>
                            <ul className="space-y-6">
                              <li className="flex gap-3">
                                <span className="font-bold text-amber-500 mt-0.5 text-xl">•</span>
                                <span><strong className="text-gray-900">Start the Game:</strong> Choose a player to go first.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-amber-500 mt-0.5 text-xl">•</span>
                                <span><strong className="text-gray-900">Take Turns:</strong> On your turn, place one tetromino onto the tower.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-red-500 mt-0.5 text-xl">•</span>
                                <span><strong className="text-gray-900">Don't Let It Fall:</strong> If the tower collapses during your turn, you're out. Reset the tower and keep playing with the remaining players.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-amber-500 mt-0.5 text-xl">•</span>
                                <span><strong className="text-gray-900">Optional - Card Mode:</strong> Draw a card before your turn and follow the challenge shown.</span>
                              </li>
                            </ul>
                          </div>
                          
                        </div>
                      </section>

                    </div>
                  ) : selectedGame === "Wack A Balloon" ? (
                    <div className="space-y-12">

                      {/* Photo Section */}
                      <section>
                        <h3 className="font-display uppercase text-2xl text-gray-900 mb-4 tracking-widest drop-shadow-sm">How To Play Wack A Balloon!</h3>
                        <div className="w-full rounded-[2rem] overflow-hidden shadow-lg border border-gray-200">
                          <img src="/Highland_Bros_Wack_A_Balloon.webp" alt="Three people playing Wack A Balloon together" className="w-full h-auto object-cover" loading="lazy" />
                        </div>
                      </section>

                      {/* Download Section */}
                      <section className="bg-amber-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-amber-100 shadow-sm">
                        <div>
                          <h3 className="font-display uppercase text-2xl text-amber-900 mb-2 tracking-widest">Digital Manual</h3>
                          <p className="text-amber-800/80 text-lg">Need a physical copy? Download the high-resolution pages to print at home.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                          <a href="/WackInstructions1.webp" download="WackABalloon_Page1.webp" className="bg-[#3d99f6] hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors active:scale-95">
                            <Download className="w-5 h-5" />
                            Page 1
                          </a>
                          <a href="/WackInstructions2.webp" download="WackABalloon_Page2.webp" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors active:scale-95">
                            <Download className="w-5 h-5" />
                            Page 2
                          </a>
                        </div>
                      </section>

                      {/* Visual & Included Section */}
                      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-2">
                        <div className="bg-white border text-center border-gray-200 rounded-[2rem] p-8 shadow-sm">
                          <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-8 text-2xl">Visual Guide</h4>
                          <div className="w-full flex-1 flex flex-col justify-center items-center">
                            <img src="/WackInstructions2.webp" alt="Wack A Balloon Visual Guide" className="w-full h-auto object-contain drop-shadow-md rounded-[1.5rem] border border-gray-100" />
                          </div>
                        </div>

                        <div className="bg-white border text-center border-gray-200 rounded-[2rem] p-8 shadow-sm">
                          <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-8 text-2xl">Everything Included</h4>
                          <ul className="space-y-5 text-left pl-4 lg:pl-10">
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Wack A Balloon Box
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">200x</strong> Color Balloons
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Balloon Inflator
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">84x</strong> Easy Balloon Ties
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">4x</strong> Wack A Hammer
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">100x</strong> Plastic Nails
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Wheel Spinner
                            </li>
                          </ul>
                        </div>
                      </section>

                      {/* Text Instructions */}
                      <section className="pb-10">
                        <h3 className="font-display uppercase text-2xl text-gray-900 mb-8 flex items-center gap-3 tracking-widest">
                          <span className="w-10 h-10 bg-[#3d99f6] rounded-xl flex items-center justify-center text-white shadow-md">
                            <CheckCircle2 className="w-6 h-6" />
                          </span>
                          Original Game Mode Rules
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-gray-700 text-lg leading-relaxed">

                          {/* Col 1 */}
                          <div>
                            <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-4 text-xl">Set Up</h4>
                            <ul className="space-y-4">
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Inflate Balloons:</strong> Use the included balloon pump to inflate one or more balloons.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Tie Balloons:</strong> If you can't tie a balloon, use the included Easy Balloon Ties. These knotters are reusable.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Place the Black Box:</strong> Put the black box on a flat surface over the inflated balloon.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Decide Who Goes First:</strong> Choose a player to start. The first player spins the spinner and performs the action indicated by the arrow.</span>
                              </li>
                            </ul>

                            <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mt-10 mb-4 text-xl">Winning The Game</h4>
                            <ol className="space-y-4 list-decimal list-outside ml-5">
                              <li className="pl-1">The game continues with players taking turns spinning the spinner and hammering nails until the balloon pops.</li>
                              <li className="pl-1"><strong className="text-gray-900 text-xl text-red-500 block mt-4">The player who pops the balloon loses — the other player wins!</strong></li>
                            </ol>
                          </div>

                          {/* Col 2 */}
                          <div className="space-y-6">
                            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 shadow-sm">
                              <h4 className="font-display uppercase tracking-widest text-amber-500 mb-6 text-xl">How To Play</h4>
                              <ul className="space-y-6">
                                <li className="flex gap-3">
                                  <span className="font-bold text-amber-500 mt-0.5 text-xl">•</span>
                                  <span><strong className="text-gray-900">Spin the Spinner:</strong> On your turn, spin the wheel and perform the action the arrow lands on.</span>
                                </li>
                                <li className="flex gap-3">
                                  <span className="font-bold text-amber-500 mt-0.5 text-xl">•</span>
                                  <span><strong className="text-gray-900">Hold the Box:</strong> For best results, hold the black box steady while hammering to ensure the balloon pops. <span className="text-red-500 font-semibold">Be careful not to hit your hands.</span></span>
                                </li>
                                <li className="flex gap-3">
                                  <span className="font-bold text-red-500 mt-0.5 text-xl">•</span>
                                  <span><strong className="text-gray-900">Don't Pop It:</strong> If the balloon pops on your turn, you lose!</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                              <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-6 text-xl">Spinner Actions</h4>
                              <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-lg text-gray-700">
                                  <span className="w-8 h-8 rounded-full bg-[#3d99f6] text-white flex items-center justify-center font-bold text-sm shrink-0">1x</span>
                                  <span><strong className="text-gray-900">1x Nail:</strong> Hammer one nail into any designated hole.</span>
                                </li>
                                <li className="flex items-center gap-4 text-lg text-gray-700">
                                  <span className="w-8 h-8 rounded-full bg-[#3d99f6] text-white flex items-center justify-center font-bold text-sm shrink-0">2x</span>
                                  <span><strong className="text-gray-900">2x Nails:</strong> Hammer two nails into the holes of your choice.</span>
                                </li>
                                <li className="flex items-center gap-4 text-lg text-gray-700">
                                  <span className="w-8 h-8 rounded-full bg-[#3d99f6] text-white flex items-center justify-center font-bold text-sm shrink-0">3x</span>
                                  <span><strong className="text-gray-900">3x Nails:</strong> Hammer three nails into the holes of your choice.</span>
                                </li>
                                <li className="flex items-center gap-4 text-lg text-gray-700">
                                  <span className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-xs shrink-0">SKP</span>
                                  <span><strong className="text-gray-900">Skip:</strong> Your turn is skipped — no nails this round.</span>
                                </li>
                                <li className="flex items-center gap-4 text-lg text-gray-700">
                                  <span className="w-8 h-8 rounded-full bg-red-400 text-white flex items-center justify-center font-bold text-xs shrink-0">REV</span>
                                  <span><strong className="text-gray-900">Reverse:</strong> The previous player must take another turn immediately.</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                        </div>
                      </section>

                    </div>
                  ) : selectedGame === "Wack A Balloon Party" ? (
                    <div className="space-y-12">

                      {/* Photo Section */}
                      <section>
                        <h3 className="font-display uppercase text-2xl text-gray-900 mb-4 tracking-widest drop-shadow-sm">How To Play Wack A Balloon Party!</h3>
                        <div className="w-full rounded-[2rem] overflow-hidden shadow-lg border border-gray-200">
                          <img src="/Party_Edition_Mid_Game.webp" alt="Wack A Balloon Party Edition mid-game action" className="w-full h-auto object-cover" loading="lazy" />
                        </div>
                      </section>

                      {/* Download Section */}
                      <section className="bg-amber-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-amber-100 shadow-sm">
                        <div>
                          <h3 className="font-display uppercase text-2xl text-amber-900 mb-2 tracking-widest">Digital Manual</h3>
                          <p className="text-amber-800/80 text-lg">Need a physical copy? Download the high-resolution pages to print at home.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                          <a href="/PartyEditionInstructions1.webp" download="WackABalloonParty_Page1.webp" className="bg-[#3d99f6] hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors active:scale-95">
                            <Download className="w-5 h-5" />
                            Page 1
                          </a>
                          <a href="/PartyEditionInstructions2.webp" download="WackABalloonParty_Page2.webp" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors active:scale-95">
                            <Download className="w-5 h-5" />
                            Page 2
                          </a>
                        </div>
                      </section>

                      {/* 28 Ways to Play Banner */}
                      <section className="bg-purple-600 rounded-[2rem] p-8 text-center shadow-lg">
                        <h3 className="font-display uppercase text-3xl text-white mb-2 tracking-widest drop-shadow">28 Different Ways To Play!</h3>
                        <p className="text-purple-100 text-lg max-w-xl mx-auto">The Party Edition includes 28 unique Game Cards — each one changes up the rules for a wild new round. Draw a card and see what chaos awaits!</p>
                      </section>

                      {/* Visual & Included Section */}
                      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-2">
                        <div className="bg-white border text-center border-gray-200 rounded-[2rem] p-8 shadow-sm">
                          <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-8 text-2xl">Visual Guide</h4>
                          <div className="w-full flex-1 flex flex-col justify-center items-center">
                            <img src="/PartyEditionInstructions2.webp" alt="Wack A Balloon Party Edition Visual Guide" className="w-full h-auto object-contain drop-shadow-md rounded-[1.5rem] border border-gray-100" />
                          </div>
                        </div>

                        <div className="bg-white border text-center border-gray-200 rounded-[2rem] p-8 shadow-sm">
                          <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-8 text-2xl">Everything Included</h4>
                          <ul className="space-y-5 text-left pl-4 lg:pl-10">
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Wack A Balloon Box
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">400x</strong> Color Balloons
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Balloon Inflator
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">4x</strong> Wack A Hammer
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">84x</strong> Balloon Ties
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">200x</strong> Plastic Nails
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3d99f6]"></span> <strong className="font-bold text-gray-900">1x</strong> Wheel Spinner
                            </li>
                            <li className="flex items-center gap-4 text-xl text-gray-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-purple-500"></span> <strong className="font-bold text-gray-900">28x</strong> Game Cards
                            </li>
                          </ul>
                        </div>
                      </section>

                      {/* Text Instructions */}
                      <section className="pb-10">
                        <h3 className="font-display uppercase text-2xl text-gray-900 mb-8 flex items-center gap-3 tracking-widest">
                          <span className="w-10 h-10 bg-[#3d99f6] rounded-xl flex items-center justify-center text-white shadow-md">
                            <CheckCircle2 className="w-6 h-6" />
                          </span>
                          Original Game Mode Rules
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-gray-700 text-lg leading-relaxed">

                          {/* Col 1 */}
                          <div>
                            <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-4 text-xl">Set Up</h4>
                            <ul className="space-y-4">
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Inflate Balloons:</strong> Use the included balloon pump to inflate one or more balloons.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Tie Balloons:</strong> If you can't tie a balloon, use the included Wack A Balloon ties. These knotters are reusable.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Place the Black Box:</strong> Put the black box on a flat surface over the inflated balloon.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="font-bold text-[#3d99f6] mt-0.5">•</span>
                                <span><strong className="text-gray-900">Decide Who Goes First:</strong> Choose a player to start. The first player spins the spinner and performs the action indicated by the arrow.</span>
                              </li>
                            </ul>

                            <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mt-10 mb-4 text-xl">Winning The Game</h4>
                            <ol className="space-y-4 list-decimal list-outside ml-5">
                              <li className="pl-1">The game continues with players taking turns spinning the spinner and hammering nails until the balloon pops.</li>
                              <li className="pl-1"><strong className="text-gray-900 text-xl text-red-500 block mt-4">The player who pops the balloon loses — or wins! It's up to you!</strong></li>
                            </ol>
                          </div>

                          {/* Col 2 */}
                          <div className="space-y-6">
                            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 shadow-sm">
                              <h4 className="font-display uppercase tracking-widest text-amber-500 mb-6 text-xl">How To Play</h4>
                              <ul className="space-y-6">
                                <li className="flex gap-3">
                                  <span className="font-bold text-amber-500 mt-0.5 text-xl">•</span>
                                  <span><strong className="text-gray-900">Spin the Spinner:</strong> On your turn, spin the wheel and perform the action the arrow lands on.</span>
                                </li>
                                <li className="flex gap-3">
                                  <span className="font-bold text-amber-500 mt-0.5 text-xl">•</span>
                                  <span><strong className="text-gray-900">Hold the Box:</strong> For best results, hold the black box steady while hammering to ensure the balloon pops. <span className="text-red-500 font-semibold">Be careful not to hit your hands.</span></span>
                                </li>
                                <li className="flex gap-3">
                                  <span className="font-bold text-purple-500 mt-0.5 text-xl">•</span>
                                  <span><strong className="text-gray-900">Game Cards:</strong> Draw a card before your turn for one of 28 wild rule twists!</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                              <h4 className="font-display uppercase tracking-widest text-[#3d99f6] mb-6 text-xl">Spinner Actions</h4>
                              <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-lg text-gray-700">
                                  <span className="w-8 h-8 rounded-full bg-[#3d99f6] text-white flex items-center justify-center font-bold text-sm shrink-0">1x</span>
                                  <span><strong className="text-gray-900">1x Nail:</strong> Hammer one nail into any designated hole.</span>
                                </li>
                                <li className="flex items-center gap-4 text-lg text-gray-700">
                                  <span className="w-8 h-8 rounded-full bg-[#3d99f6] text-white flex items-center justify-center font-bold text-sm shrink-0">2x</span>
                                  <span><strong className="text-gray-900">2x Nails:</strong> Hammer two nails into the holes of your choice.</span>
                                </li>
                                <li className="flex items-center gap-4 text-lg text-gray-700">
                                  <span className="w-8 h-8 rounded-full bg-[#3d99f6] text-white flex items-center justify-center font-bold text-sm shrink-0">3x</span>
                                  <span><strong className="text-gray-900">3x Nails:</strong> Hammer three nails into the holes of your choice.</span>
                                </li>
                                <li className="flex items-center gap-4 text-lg text-gray-700">
                                  <span className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-xs shrink-0">SKP</span>
                                  <span><strong className="text-gray-900">Skip:</strong> Your turn is skipped — no nails this round.</span>
                                </li>
                                <li className="flex items-center gap-4 text-lg text-gray-700">
                                  <span className="w-8 h-8 rounded-full bg-red-400 text-white flex items-center justify-center font-bold text-xs shrink-0">REV</span>
                                  <span><strong className="text-gray-900">Reverse:</strong> The previous player must take another turn immediately.</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                        </div>
                      </section>

                    </div>
                  ) : (
                    <div className="py-24 text-center">
                      <Puzzle className="w-16 h-16 text-gray-300 mx-auto mb-6 animate-bounce" />
                      <h3 className="font-display uppercase text-3xl text-gray-900 mb-2 tracking-widest">Digital rules not yet ready</h3>
                      <p className="text-gray-500 text-xl max-w-sm mx-auto leading-relaxed">
                        The digital instructions for {selectedGame} are currently being crafted. Check back soon!
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
    </>
  );
}
