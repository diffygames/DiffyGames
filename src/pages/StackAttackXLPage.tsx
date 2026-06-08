import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  Check,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Clock,
  Zap,
  Package,
} from "lucide-react";
import Seo from "../components/Seo";

/* ─────────────────────────── DATA ─────────────────────────── */

const GALLERY = [
  { src: "/StackXL1.webp", alt: "Stack Attack XL giant stacking game product photo" },
  { src: "/StackXL2.webp", alt: "Stack Attack XL outdoor gameplay with oversized blocks" },
  { src: "/StackXL3.webp", alt: "Close-up of Stack Attack XL tower and large blocks" },
  { src: "/StackXL4.webp", alt: "Players enjoying Stack Attack XL during an outdoor party" },
  { src: "/StackXL5.webp", alt: "Stack Attack XL tower build in progress" },
  { src: "/StackXL6.webp", alt: "Stack Attack XL product contents and giant block pieces" },
  { src: "/StackXL7.webp", alt: "Family and friends playing Stack Attack XL outside" },
  { src: "/StackXL8.webp", alt: "Stack Attack XL dramatic tumble during gameplay" },
];


const CONTENTS = [
  { icon: Package, label: "XL Wobble Base",      qty: "×1" },
  { icon: Zap,     label: "Giant Stacking Blocks", qty: "×100" },
  { icon: Play,    label: "Challenge Cards",       qty: "×36" },
  { icon: Users,   label: "Players",               qty: "2–8" },
  { icon: Clock,   label: "Play Time",             qty: "20–45 min" },
  { icon: Star,    label: "Ages",                  qty: "6+" },
];

const REVIEWS = [
  {
    id: 1,
    name: "Kevin B.",
    rating: 5,
    date: "March 18, 2026",
    title: "The XL version is absolutely insane",
    body: "We set it up at a backyard barbecue and it became the main event all night. The blocks are huge, the wobble base is sturdy, and watching adults freak out over a tower is priceless.",
    verified: true,
    avatar: "KB",
  },
  {
    id: 2,
    name: "Rachel T.",
    rating: 5,
    date: "February 22, 2026",
    title: "Perfect for big groups",
    body: "Got this for a family reunion with 20+ people. We played in teams and it was the best decision we've ever made. Can't recommend it enough.",
    verified: true,
    avatar: "RT",
  },
  {
    id: 3,
    name: "Omar S.",
    rating: 5,
    date: "January 30, 2026",
    title: "4x the blocks, 10x the fun",
    body: "Already owned the original Stack Attack — this is a massive upgrade. The tower gets absolutely ridiculous before it falls. Worth every penny.",
    verified: true,
    avatar: "OS",
  },
  {
    id: 4,
    name: "Carla M.",
    rating: 4,
    date: "December 28, 2025",
    title: "Great outdoor game",
    body: "We mostly play this outside and it handles wind surprisingly well once the stack gets going. Kids love how dramatic the falls are with the big pieces.",
    verified: true,
    avatar: "CM",
  },
  {
    id: 5,
    name: "Derek L.",
    rating: 5,
    date: "November 15, 2025",
    title: "The ultimate party centerpiece",
    body: "Every single person who sees this game wants to play immediately. The size alone draws people in. An absolute crowd-pleaser.",
    verified: true,
    avatar: "DL",
  },
];

const FAQS = [
  {
    q: "How is Stack Attack XL different from the original?",
    a: "Stack Attack XL is 4x the size of the original, includes 100 blocks instead of 48, and supports up to 8 players. The bigger pieces make for more dramatic falls and an even more exciting game.",
  },
  {
    q: "Is Stack Attack XL for indoor or outdoor play?",
    a: "Both! The heavier XL blocks are great for outdoor play and handle light wind well. It's also perfect for indoor game rooms, basements, or living rooms with a bit of space.",
  },
  {
    q: "What age is Stack Attack XL suitable for?",
    a: "Stack Attack XL is designed for ages 6 and up. The larger blocks are actually easier for younger kids to handle than the standard size.",
  },
  {
    q: "How many players can play at once?",
    a: "Stack Attack XL supports 2 to 8 players. You can also play in teams, which we highly recommend for groups of 6 or more.",
  },
  {
    q: "Are replacement pieces available?",
    a: "Yes! Reach out to our support team and we'll send replacement XL blocks at no extra charge within the first year of purchase.",
  },
];

const SOCIAL_PROOF = [
  { stat: "186+", label: "5-Star Reviews" },
  { stat: "30K+", label: "Happy Families" },
  { stat: "4×",   label: "Bigger than Original" },
  { stat: "4.8",  label: "Avg. Rating" },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */

function StarRow({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const cls =
    size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-6 h-6" : "w-4 h-4";
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${cls} ${
            s <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── COMPONENT ─────────────────────────── */

interface Props {
  onBack: () => void;
  onAddToCart: (quantity: number, unitPrice: number) => void;
}

export default function StackAttackXLPage({ onBack, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    onAddToCart(quantity, 32.99);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const averageRating = (REVIEWS.reduce((sum, review) => sum + review.rating, 0) / REVIEWS.length).toFixed(1);
  const productSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Stack Attack XL",
    image: GALLERY.map((item) => `https://diffygames.com${item.src}`),
    description: "Stack Attack XL is the oversized outdoor stacking game from Diffy Games, built for parties, backyards, tailgates, and dramatic tower crashes.",
    brand: {
      "@type": "Brand",
      name: "Diffy Games"
    },
    sku: "stack-attack-xl",
    offers: {
      "@type": "Offer",
      url: "https://diffygames.com/stack-attack-xl",
      priceCurrency: "USD",
      price: "32.99",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: String(REVIEWS.length)
    }
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://diffygames.com/" },
      { "@type": "ListItem", position: 2, name: "Stack Attack XL", item: "https://diffygames.com/stack-attack-xl" },
    ],
  });

  return (
    <div className="min-h-screen bg-white pb-28 lg:pb-0">
      <Seo
        title="Stack Attack XL | Giant Outdoor Stacking Game"
        description="Shop Stack Attack XL, the giant outdoor stacking game from Diffy Games. Bigger blocks, bigger crashes, and bigger reactions for parties and backyards."
        path="/stack-attack-xl"
        image="/StackXL1.webp"
        type="product"
        keywords="Stack Attack XL, giant outdoor stacking game, backyard party game, outdoor tumbling tower game"
        schema={[productSchema, faqSchema, breadcrumbSchema]}
      />

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center gap-2 text-sm text-gray-400">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 hover:text-gray-900 transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">Stack Attack XL</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO PRODUCT
      ══════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 md:px-6 pt-8 lg:pt-12 pb-16">
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-start">

          {/* Left — Image Gallery */}
          <div className="lg:sticky lg:top-24">
            <div className="relative rounded-3xl overflow-hidden bg-gray-50 shadow-md aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={GALLERY[activeImage].src}
                  alt={GALLERY[activeImage].alt}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover block"
                />
              </AnimatePresence>
              <button
                type="button"
                onClick={() => setActiveImage((i) => (i - 1 + GALLERY.length) % GALLERY.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => setActiveImage((i) => (i + 1) % GALLERY.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {GALLERY.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative rounded-xl overflow-hidden bg-gray-50 shrink-0 w-16 h-16 cursor-pointer transition-all border-2 ${
                    i === activeImage ? "border-gray-900" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Trust strip (desktop) */}
            <div className="hidden lg:grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: Truck,     label: "Free Shipping",   sub: "Orders over $40" },
                { icon: RotateCcw, label: "Easy Returns",    sub: "30-day policy" },
                { icon: Shield,    label: "Secure Checkout", sub: "SSL encrypted" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1 p-3 rounded-xl border border-gray-100">
                  <Icon className="w-5 h-5 text-[#3d99f6]" />
                  <span className="text-xs font-bold text-gray-800">{label}</span>
                  <span className="text-xs text-gray-400">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Buy Box */}
          <div className="mt-8 lg:mt-0">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                XL Edition
              </span>
              <span className="bg-red-600 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Best Seller
              </span>
            </div>

            <h1 className="font-display uppercase text-5xl lg:text-6xl text-gray-900 leading-none mb-3">
              Stack Attack XL
            </h1>
            <p className="text-sm text-gray-400 font-medium mb-4 leading-snug">
              XL Tower Game · 4× the Original · 100 Pieces · 2–8 Players · Indoor &amp; Outdoor
            </p>

            <div className="flex items-center gap-3 mb-6">
              <StarRow rating={5} />
              <span className="text-sm font-bold text-gray-800">4.8</span>
              <span className="text-gray-300">·</span>
              <button
                type="button"
                onClick={scrollToReviews}
                className="text-sm text-[#3d99f6] hover:underline cursor-pointer"
              >
                186 reviews
              </button>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-extrabold text-gray-900">$32.99</span>
              <span className="text-lg text-gray-300 line-through">$39.99</span>
              <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100">
                Save 23%
              </span>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8 text-base">
              4x bigger, 100 pieces, and 100% more chaos. The ultimate edition of Stack Attack built for backyard parties, game rooms, and anyone who wants to go bigger. Stack it sky high — and watch it come crashing down.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {["100 Blocks", "36 Cards", "XL Wobble Base", "Ages 6+", "2–8 Players", "Indoor & Outdoor"].map((item) => (
                <span key={item} className="border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                  {item}
                </span>
              ))}
            </div>

            <div className="border-t border-gray-100 mb-8" />

            {/* Desktop CTA */}
            <div className="hidden lg:flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center text-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">−</button>
                  <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((q) => q + 1)} className="w-12 h-12 flex items-center justify-center text-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">+</button>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className="flex-1 h-12 bg-gray-900 text-white font-display uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span key="added" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-2">
                        <Check className="w-5 h-5" /> Added to cart!
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              <button type="button" className="w-full h-12 bg-[#3d99f6] text-white font-display uppercase tracking-wider rounded-xl flex items-center justify-center hover:bg-[#2b87e4] transition-colors cursor-pointer">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — SOCIAL PROOF STATS BAR
      ══════════════════════════════════════════════════════ */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {SOCIAL_PROOF.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="font-display text-5xl text-[#3d99f6] uppercase mb-1">{item.stat}</div>
                <div className="text-sm text-gray-400 font-semibold uppercase tracking-widest">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — GAME DESCRIPTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-[#3d99f6] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                About the Game
              </div>
              <h2 className="font-display uppercase text-4xl lg:text-5xl text-gray-900 leading-none mb-6">
                Go bigger.<br />Stack higher.
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg mb-6">
                Stack Attack XL takes everything you love about the original and multiplies it by four. The blocks are massive, the wobble base is wider, and the tower grows to jaw-dropping heights before it finally comes crashing down.
              </p>
              <p className="text-gray-500 leading-relaxed text-lg mb-8">
                Perfect for backyards, patios, game rooms, and any gathering where you want a centerpiece game that draws everyone in instantly.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "100 oversized blocks for towering stacks",
                  "Supports up to 8 players — perfect for big groups",
                  "Indoor & outdoor play — built to handle both",
                  "36 challenge cards add strategy and unpredictability",
                ].map((pt) => (
                  <div key={pt} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#3d99f6] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-gray-700 font-medium">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-12 lg:mt-0"
            >
              <div className="rounded-3xl overflow-hidden bg-gray-50 shadow-xl">
                <img src="/StackXL2.webp" alt="Stack Attack XL in action" className="w-full h-auto block" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — HOW TO PLAY
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-500 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
              Classic XL Mode Rules
            </div>
            <h2 className="font-display uppercase text-5xl lg:text-7xl text-gray-900 leading-none mb-4">
              How To Play
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Ages 6+ &nbsp;·&nbsp; 2–6 Players &nbsp;·&nbsp; Up &amp; running in 60 seconds</p>
          </div>

          {/* Set Up + How To Play */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* Set Up */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h3 className="font-display uppercase tracking-widest text-[#3d99f6] text-xl mb-7">Set Up</h3>
              <ol className="space-y-5">
                {([
                  { n: "1", title: "Place the Base", body: "Set the rectangular XL base on a flat, stable surface like a table or floor." },
                  { n: "2", title: "Position the Tower", body: "Carefully balance the Stack Attack XL tower in the center of the base." },
                  { n: "3", title: "Lay Out the Pieces", body: "Spread all 100 tetromino pieces within easy reach of all players." },
                ] as const).map(s => (
                  <li key={s.n} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-[#3d99f6] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">{s.n}</span>
                    <p className="text-gray-600 leading-relaxed"><strong className="text-gray-900">{s.title}:</strong> {s.body}</p>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* How To Play */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h3 className="font-display uppercase tracking-widest text-amber-500 text-xl mb-7">How To Play</h3>
              <ul className="space-y-5">
                {([
                  { title: "Start the Game", body: "Choose a player to go first.", dot: "bg-amber-400" },
                  { title: "Take Turns", body: "On your turn, place one tetromino anywhere on the tower.", dot: "bg-amber-400" },
                  { title: "3-Second Rule", body: "The piece must stay balanced for 3 seconds after you let go — or it counts as a fall.", dot: "bg-amber-400" },
                  { title: "Don't Let It Fall!", body: "If the tower collapses on your turn, you're eliminated. Reset and keep playing.", dot: "bg-red-500" },
                  { title: "Optional — Card Mode", body: "Draw a Challenge Card before your turn and follow the rule shown.", dot: "bg-[#3d99f6]" },
                ] as const).map((s, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className={`w-3 h-3 rounded-full ${s.dot} shrink-0 mt-1.5`} />
                    <p className="text-gray-600 leading-relaxed"><strong className="text-gray-900">{s.title}:</strong> {s.body}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Challenge Cards callout */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
              <span className="font-display text-3xl text-amber-500">36</span>
            </div>
            <div>
              <h3 className="font-display uppercase tracking-widest text-amber-500 text-lg mb-1">Challenge Cards</h3>
              <p className="text-gray-600 leading-relaxed">Stack one-handed. Eyes closed. Alternate colors. The 36 included Challenge Cards add a wild new rule every round — now with XL-sized pieces for even bigger chaos.</p>
            </div>
          </motion.div>

          {/* Winning Condition */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-amber-500 rounded-3xl p-8 text-center shadow-lg"
          >
            <p className="font-display uppercase text-white text-2xl lg:text-4xl tracking-widest leading-snug drop-shadow">
              The last player left standing wins!
            </p>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — WHAT'S IN THE BOX
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 mt-12 lg:mt-0"
            >
              <div className="rounded-3xl overflow-hidden bg-gray-50 shadow-xl">
                <img src="/StackXL3.webp" alt="Stack Attack XL game contents" className="w-full h-auto block" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-block bg-[#3d99f6] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                What's in the Box
              </div>
              <h2 className="font-display uppercase text-4xl lg:text-5xl text-gray-900 leading-none mb-8">
                Everything you need to play
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {CONTENTS.map(({ icon: Icon, label, qty }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#3d99f6]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{qty}</div>
                      <div className="font-bold text-gray-900 text-sm leading-tight">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — LIFESTYLE BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <img
          src="/StackXL5.webp"
          alt="Stack Attack XL outdoor play"
          className="w-full h-[400px] md:h-[580px] object-cover object-center block"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-lg"
            >
              <p className="text-[#3d99f6] font-bold uppercase tracking-widest text-sm mb-3">
                The XL Experience
              </p>
              <h2 className="font-display uppercase text-white text-4xl md:text-6xl leading-none mb-6">
                Bigger blocks. Bigger falls. Bigger fun.
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Join over 30,000 families who've leveled up their game night with Stack Attack XL.
              </p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="px-8 py-4 bg-white text-gray-900 font-display uppercase tracking-wider text-base hover:bg-gray-100 transition-colors duration-200 cursor-pointer rounded-xl"
              >
                Add to Cart — $32.99
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — REVIEWS
      ══════════════════════════════════════════════════════ */}
      <section ref={reviewsRef} id="reviews" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Customer Reviews
            </div>
            <h2 className="font-display uppercase text-4xl lg:text-5xl text-gray-900 leading-none">
              What players are saying
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-14 p-8 bg-white rounded-3xl shadow-sm">
            <div className="text-center shrink-0">
              <div className="font-display text-8xl text-gray-900 leading-none">4.8</div>
              <StarRow rating={5} size="lg" />
              <div className="text-sm text-gray-400 mt-2 font-semibold">186 reviews</div>
            </div>
            <div className="flex-1 w-full max-w-sm">
              {[[5, 84], [4, 12], [3, 3], [2, 1], [1, 0]].map(([stars, pct]) => (
                <div key={stars} className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold text-gray-600 w-4 shrink-0">{stars}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className="bg-amber-400 h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: (5 - stars) * 0.05 }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right shrink-0">{pct}%</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-500 mb-4 text-sm">Share your experience</p>
              <button type="button" className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-display uppercase tracking-wider text-sm rounded-xl hover:bg-gray-900 hover:text-white transition-colors cursor-pointer">
                Write a Review
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {r.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-gray-900">{r.name}</span>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRow rating={r.rating} size="sm" />
                      {r.verified && (
                        <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="font-bold text-gray-900 mb-2">{r.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{r.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button type="button" className="px-8 py-4 bg-gray-900 text-white font-display uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors cursor-pointer">
              Load More Reviews
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#3d99f6] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              FAQ
            </div>
            <h2 className="font-display uppercase text-4xl lg:text-5xl text-gray-900 leading-none">
              Got questions?
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-3xl overflow-hidden">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900 pr-4">{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-gray-500 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — BOTTOM CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#3d99f6] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="font-display uppercase text-4xl md:text-6xl text-white mb-6 leading-none">
            Ready to go XL?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
            Stack Attack XL — the bigger, bolder game night experience. Get yours today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className="px-10 py-4 bg-gray-900 text-white font-display uppercase tracking-wider text-lg hover:bg-black transition-colors duration-200 cursor-pointer rounded-xl"
            >
              Add to Cart — $32.99
            </motion.button>
            <button
              type="button"
              onClick={onBack}
              className="px-10 py-4 bg-white/20 text-white font-display uppercase tracking-wider text-lg hover:bg-white/30 transition-colors duration-200 cursor-pointer rounded-xl border border-white/30"
            >
              Browse All Games
            </button>
          </div>
        </div>
      </section>

      {/* ── Mobile sticky CTA ─────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 cursor-pointer">−</button>
            <span className="w-8 text-center font-bold text-sm">{quantity}</span>
            <button type="button" onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 cursor-pointer">+</button>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className="flex-1 h-10 bg-gray-900 text-white font-display uppercase tracking-wider text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="added" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Added!
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4" /> Add to Cart — $32.99
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

    </div>
  );
}
