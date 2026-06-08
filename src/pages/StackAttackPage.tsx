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
  { src: "/StackAttack_HeroImage.webp",            alt: "Stack Attack stacking game box and wobble base product photo" },
  { src: "/Stack Attack Lifestyle Image 1.webp",   alt: "Family playing Stack Attack around a table" },
  { src: "/Stack Attack Lifestyle Image 2.webp",   alt: "Players stacking colorful Stack Attack blocks during game night" },
  { src: "/Stack Attack Infographic.webp",         alt: "Stack Attack game infographic showing features and gameplay details" },
  { src: "/Stack Attack Testimonials.webp",        alt: "Stack Attack customer review and testimonial graphic" },
  { src: "/Stack Attack Challenge Cards.webp",     alt: "Stack Attack challenge cards included in the game box" },
  { src: "/Stack Attack Infographic 2.webp",       alt: "Stack Attack infographic with product contents and play details" },
];


const CONTENTS = [
  { icon: Package, label: "Wobble Base", qty: "×1" },
  { icon: Zap,     label: "Colorful Stacking Blocks", qty: "×48" },
  { icon: Play,    label: "Challenge Cards", qty: "×36" },
  { icon: Users,   label: "Players",         qty: "2–6" },
  { icon: Clock,   label: "Play Time",       qty: "15–30 min" },
  { icon: Star,    label: "Ages",            qty: "6+" },
];

const REVIEWS = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "March 15, 2026",
    title: "Best family game we own!",
    body: "We've played this every single weekend since we got it. The kids love it, the adults love it. Simple to learn but genuinely tense when the stack gets high!",
    verified: true,
    avatar: "SM",
  },
  {
    id: 2,
    name: "James T.",
    rating: 5,
    date: "February 28, 2026",
    title: "Went viral for a reason",
    body: "Saw it on TikTok and bought it on a whim. Zero regrets. Perfect for parties and works great with just 2 players too.",
    verified: true,
    avatar: "JT",
  },
  {
    id: 3,
    name: "Priya K.",
    rating: 4,
    date: "January 10, 2026",
    title: "Great quality, super addictive",
    body: "The blocks are sturdy and well made. Once you start playing it's hard to stop. Took off one star only because the base could be slightly larger.",
    verified: true,
    avatar: "PK",
  },
  {
    id: 4,
    name: "Marcus D.",
    rating: 5,
    date: "December 20, 2025",
    title: "Perfect gift!",
    body: "Gave this to my nephew for his birthday and the whole family ended up playing for 3 hours. Definitely buying more for other families.",
    verified: true,
    avatar: "MD",
  },
  {
    id: 5,
    name: "Linda R.",
    rating: 5,
    date: "November 5, 2025",
    title: "Classroom hit",
    body: "I'm a teacher and use this for brain breaks. Students BEG to play. Helps with focus, coordination, and teamwork. 10/10.",
    verified: true,
    avatar: "LR",
  },
];

const FAQS = [
  {
    q: "What age is Stack Attack suitable for?",
    a: "Stack Attack is designed for ages 6 and up. The wobble base and block sizes are safe for younger supervised play, but the challenge cards are best enjoyed by kids 6+.",
  },
  {
    q: "How many players can play at once?",
    a: "Stack Attack supports 2 to 6 players — ideal for both small gatherings and larger parties. You can also do solo time-trial challenges!",
  },
  {
    q: "Are replacement pieces available?",
    a: "Yes! Reach out to our support team and we'll send replacement blocks at no extra charge within the first year of purchase.",
  },
  {
    q: "How does shipping work?",
    a: "We offer free shipping on orders over $40 in the contiguous US. Orders ship within 1–2 business days and typically arrive in 3–5 days.",
  },
  {
    q: "Can I return Stack Attack if my family doesn't love it?",
    a: "Absolutely. We have a 30-day hassle-free return policy. If it's not a hit, we'll refund you — no questions asked.",
  },
];

const SOCIAL_PROOF = [
  { stat: "142+", label: "5-Star Reviews" },
  { stat: "50K+", label: "Happy Families" },
  { stat: "#1",   label: "On TikTok" },
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

export default function StackAttackPage({ onBack, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const pricingTiers = [
    { qty: 1, title: "1 Game", label: "", price: 19.99, regPrice: 24.99, discount: "Save 20%" },
    { qty: 2, title: "2 Games", label: "Most Popular", price: 34.99, regPrice: 49.98, discount: "Save 30%" },
    { qty: 3, title: "3 Games", label: "Best Value", price: 44.99, regPrice: 74.97, discount: "Save 40%" },
  ];

  const currentTier = pricingTiers.find((t) => t.qty === quantity) || {
    qty: quantity,
    title: `${quantity} Games`,
    label: "",
    price: quantity * 14.99,
    regPrice: quantity * 24.99,
    discount: "Save 40%",
  };
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    onAddToCart(quantity, currentTier.price / quantity);
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
    name: "Stack Attack",
    image: GALLERY.map((item) => `https://diffygames.com${item.src}`),
    description: "Stack Attack is a viral stacking game with a wobble base, challenge cards, and fast family-friendly gameplay for parties and game nights.",
    brand: {
      "@type": "Brand",
      name: "Diffy Games"
    },
    sku: "stack-attack",
    offers: {
      "@type": "Offer",
      url: "https://diffygames.com/stack-attack",
      priceCurrency: "USD",
      price: "19.99",
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
      { "@type": "ListItem", position: 2, name: "Stack Attack", item: "https://diffygames.com/stack-attack" },
    ],
  });

  return (
    <div className="min-h-screen bg-white pb-28 lg:pb-0">
      <Seo
        title="Stack Attack | Viral Stacking Game for Families and Parties"
        description="Shop Stack Attack, the viral stacking game from Diffy Games. Easy to learn, tense to play, and built for family game night, parties, and TikTok-worthy reactions."
        path="/stack-attack"
        image="/StackAttack_HeroImage.webp"
        type="product"
        keywords="Stack Attack, stacking game, family party game, viral tiktok game, block stacking game, jenga alternative"
        schema={[productSchema, faqSchema, breadcrumbSchema]}
      />

      {/* ── Breadcrumb ────────────────────────────────────────── */}
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
          <span className="text-gray-900 font-medium">Stack Attack</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO PRODUCT (Image Gallery + Buy Box)
      ══════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 md:px-6 pt-8 lg:pt-12 pb-16">
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-start">

          {/* Left — Image Gallery */}
          <div className="lg:sticky lg:top-24">
            {/* Main image */}
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
              {/* Prev / Next arrows */}
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
            <div className="flex gap-3 mt-4">
              {GALLERY.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative rounded-xl overflow-hidden bg-gray-50 flex-1 aspect-square cursor-pointer transition-all border-2 ${
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
                { icon: Truck,    label: "Free Shipping", sub: "Orders over $40" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                { icon: Shield,   label: "Secure Checkout", sub: "SSL encrypted" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1 p-3 rounded-xl border border-gray-100"
                >
                  <Icon className="w-5 h-5 text-[#3d99f6]" />
                  <span className="text-xs font-bold text-gray-800">{label}</span>
                  <span className="text-xs text-gray-400">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Buy Box */}
          <div className="mt-8 lg:mt-0">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-red-600 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Best Seller
              </span>
              <span className="bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Viral on TikTok
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display uppercase text-5xl lg:text-6xl text-gray-900 leading-none mb-3">
              Stack Attack
            </h1>
            <p className="text-sm text-gray-400 font-medium mb-4 leading-snug">
              Tower Game · Balance Game for Kids &amp; Adults · Family Game Night · Includes 48 Pcs &amp; 36 Cards
            </p>

            {/* Rating row */}
            <div className="flex items-center gap-3 mb-6">
              <StarRow rating={5} />
              <span className="text-sm font-bold text-gray-800">4.8</span>
              <span className="text-gray-300">·</span>
              <button
                type="button"
                onClick={scrollToReviews}
                className="text-sm text-[#3d99f6] hover:underline cursor-pointer"
              >
                142 reviews
              </button>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-extrabold text-gray-900">${currentTier.price.toFixed(2)}</span>
              <span className="text-lg text-gray-300 line-through">${currentTier.regPrice.toFixed(2)}</span>
              <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100">
                {currentTier.discount}
              </span>
            </div>

            {/* Short description */}
            <p className="text-gray-500 leading-relaxed mb-8 text-base">
              The viral stacking game that took TikTok by storm. Stack the blocks, follow the challenge cards, and keep your nerve — one wrong move and it all comes tumbling down. Includes 48 blocks, 36 cards &amp; a wobble base.
            </p>

            {/* Quick contents pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["48 Blocks", "36 Cards", "Wobble Base", "Ages 6+", "2–6 Players"].map((item) => (
                <span
                  key={item}
                  className="border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* TIERED PRICING SECTION */}
            <div className="flex flex-col gap-3 mb-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Select Quantity & Save</h3>
              {pricingTiers.map(tier => (
                <button
                  key={tier.qty}
                  type="button"
                  onClick={() => setQuantity(tier.qty)}
                  className={`relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer text-left overflow-visible ${
                    quantity === tier.qty 
                      ? "border-[#3d99f6] bg-blue-50/30 shadow-sm" 
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  {/* tag */}
                  {tier.label && (
                    <span className={`absolute -top-3 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm z-10 ${
                      tier.label === "Most Popular" ? "bg-amber-400 text-white" : "bg-gray-900 text-white"
                    }`}>
                      {tier.label}
                    </span>
                  )}
                  
                  <div className="flex items-center gap-4">
                    {/* radio circle */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      quantity === tier.qty ? "border-[#3d99f6] bg-[#3d99f6]" : "border-gray-300"
                    }`}>
                      {quantity === tier.qty && <Check className="w-3 h-3 text-white" />}
                    </div>
                    
                    <div>
                      <div className="font-bold text-gray-900 text-lg leading-none mb-1">{tier.title}</div>
                      <div className="text-sm text-gray-500 font-medium">
                        ${(tier.price / tier.qty).toFixed(2)} / each
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-gray-900 text-xl">${tier.price.toFixed(2)}</div>
                    {tier.discount && (
                      <div className={`text-xs font-bold px-2 py-0.5 rounded mt-1 inline-block ${
                        quantity === tier.qty ? "bg-[#3d99f6]/10 text-[#3d99f6]" : "bg-green-50 text-green-600"
                      }`}>
                        {tier.discount}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-100 mb-8" />

            {/* Quantity + CTA (desktop) */}
            <div className="hidden lg:flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center text-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-12 flex items-center justify-center text-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    +
                  </button>
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
                        <ShoppingBag className="w-5 h-5" /> Add to Cart — ${currentTier.price.toFixed(2)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              <button
                type="button"
                className="w-full h-12 bg-[#3d99f6] text-white font-display uppercase tracking-wider rounded-xl flex items-center justify-center hover:bg-[#2b87e4] transition-colors cursor-pointer"
              >
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
          SECTION 3 — GAME DESCRIPTION (full-width editorial)
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
                Stack it higher.<br />Watch it wobble.
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg mb-6">
                Stack Attack is a fast-paced stacking game that challenges hand-eye coordination, focus, and strategy.
                Designed as a competitive tabletop game, it keeps players on the edge of their seats — from the first block to the final wobble.
              </p>
              <p className="text-gray-500 leading-relaxed text-lg mb-8">
                Play solo challenges, team competitions, or card-based modes that add suspense and unpredictability. A truly versatile game for families, classrooms, and parties alike.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Fast-paced fun for all ages",
                  "Multiple ways to play — solo, team, or card mode",
                  "Compact & portable — take it anywhere",
                  "High replay value with 36 unique challenge cards",
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
                <img
                  src="/StackMobileHero.webp"
                  alt="Stack Attack in action"
                  className="w-full h-auto block"
                />
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
            <div className="inline-block bg-[#3d99f6] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
              Classic Mode Rules
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
                  { n: "1", title: "Place the Base", body: "Set the rectangular base on a flat, stable surface like a table or floor." },
                  { n: "2", title: "Position the Tower", body: "Carefully balance the Stack Attack tower in the center of the base." },
                  { n: "3", title: "Lay Out the Pieces", body: "Spread all 48 tetromino pieces within easy reach of all players." },
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
              <p className="text-gray-600 leading-relaxed">Stack one-handed. Eyes closed. Alternate colors. The 36 included Challenge Cards add a wild new rule every round — perfect for mixing things up.</p>
            </div>
          </motion.div>

          {/* Winning Condition */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#3d99f6] rounded-3xl p-8 text-center shadow-lg"
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
                <img
                  src="/StackAttack_HeroImage.webp"
                  alt="Stack Attack game contents"
                  className="w-full h-auto block"
                />
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
                  <div
                    key={label}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100"
                  >
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
          SECTION 6 — FAZE RUG SPOTLIGHT
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0b1220] py-20 md:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(61,153,246,0.35),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.22),_transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div className="relative container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8ed0ff]">
                Ranked by Faze Rug + Papa Rug
              </div>
              <h2 className="mt-5 font-display uppercase text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Stack Attack made the S tier.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
                Faze Rug and Papa Rug played Stack Attack and ranked it in the top tier. Big reactions, real gameplay, and a clean S-tier stamp right on the board.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3d99f6] px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-[#2c8cf0] hover:shadow-[0_14px_30px_rgba(61,153,246,0.35)] cursor-pointer"
                >
                  Add to Cart - ${currentTier.price.toFixed(2)}
                </motion.button>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                  Viral gameplay. S-tier ranking.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="grid gap-5"
            >
              <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-2 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                  <img
                    src="/FazeRugPlaying.webp"
                    alt="Faze Rug and Papa Rug playing Stack Attack"
                    loading="lazy"
                    className="h-full w-full rounded-[1.45rem] object-cover"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-center font-display text-xl uppercase tracking-[0.18em] text-white sm:text-2xl">
                    Faze Rug&apos;s Tier List
                  </p>
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-2 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                    <img
                      src="/FazeRugTierList.webp"
                      alt="Faze Rug tier list showing Stack Attack in S tier"
                      loading="lazy"
                      className="h-full w-full rounded-[1.45rem] bg-black object-contain"
                    />

                    <div className="pointer-events-none absolute inset-0">
                      <svg
                        viewBox="0 0 420 240"
                        className="absolute inset-0 h-full w-full"
                        aria-hidden="true"
                      >
                        <defs>
                          <filter id="glow-arrow-product" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <path
                          d="M350 38 C312 38, 282 42, 214 53"
                          fill="none"
                          stroke="#ff5353"
                          strokeWidth="10"
                          strokeLinecap="round"
                          filter="url(#glow-arrow-product)"
                        />
                        <path
                          d="M228 38 L201 54 L231 64"
                          fill="none"
                          stroke="#ff5353"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#glow-arrow-product)"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
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

          {/* Rating overview */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-14 p-8 bg-white rounded-3xl shadow-sm">
            <div className="text-center shrink-0">
              <div className="font-display text-8xl text-gray-900 leading-none">4.8</div>
              <StarRow rating={5} size="lg" />
              <div className="text-sm text-gray-400 mt-2 font-semibold">142 reviews</div>
            </div>

            <div className="flex-1 w-full max-w-sm">
              {[[5, 82], [4, 14], [3, 3], [2, 1], [1, 0]].map(([stars, pct]) => (
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
              <button
                type="button"
                className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-display uppercase tracking-wider text-sm rounded-xl hover:bg-gray-900 hover:text-white transition-colors cursor-pointer"
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Review list */}
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
            <button
              type="button"
              className="px-8 py-4 bg-gray-900 text-white font-display uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
            >
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
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
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
          SECTION 9 — BOTTOM CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#3d99f6] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="font-display uppercase text-4xl md:text-6xl text-white mb-6 leading-none">
            Ready to play?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
            Stack Attack — the game that brings the whole family to the table. Get yours today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className="px-10 py-4 bg-gray-900 text-white font-display uppercase tracking-wider text-lg hover:bg-black transition-colors duration-200 cursor-pointer rounded-xl"
            >
              Add to Cart — ${currentTier.price.toFixed(2)}
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

      {/* ── Mobile sticky CTA ────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              −
            </button>
            <span className="w-8 text-center font-bold text-sm">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              +
            </button>
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
                  <ShoppingBag className="w-4 h-4" /> Add to Cart — ${currentTier.price.toFixed(2)}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

    </div>
  );
}
