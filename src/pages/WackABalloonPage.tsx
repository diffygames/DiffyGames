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
  { src: "/WackNewHero.webp",   alt: "Wack A Balloon party game product photo with balloon frame and mallet" },
  { src: "/WackImage2.webp",    alt: "Players reacting during a game of Wack A Balloon" },
  { src: "/WackImage3.webp",    alt: "Wack A Balloon game setup with inflated balloon in the frame" },
  { src: "/WackImage4.webp",    alt: "Close-up of Wack A Balloon gameplay in action" },
  { src: "/WackImage5.webp",    alt: "Group laughing while playing Wack A Balloon" },
  { src: "/WackImage6.webp",    alt: "Wack A Balloon product contents and balloon game components" },
  { src: "/WackImage7.webp",    alt: "Kids and families playing Wack A Balloon at a party" },
  { src: "/WackImage8.webp",    alt: "Wack A Balloon suspense moment before the balloon pops" },
];


const CONTENTS = [
  { icon: Package, label: "Balloons",       qty: "×30" },
  { icon: Zap,     label: "Wacking Mallet", qty: "×1" },
  { icon: Play,    label: "Play Modes",     qty: "3" },
  { icon: Users,   label: "Players",        qty: "2–8" },
  { icon: Clock,   label: "Play Time",      qty: "10–15 min" },
  { icon: Star,    label: "Ages",           qty: "6+" },
];

const REVIEWS = [
  {
    id: 1,
    name: "Tyler R.",
    rating: 5,
    date: "March 20, 2026",
    title: "Non-stop laughs every time",
    body: "This game has become our go-to at every party. The tension of trying not to pop the balloon while everyone is watching is absolutely hilarious. 10/10.",
    verified: true,
    avatar: "TR",
  },
  {
    id: 2,
    name: "Dana L.",
    rating: 5,
    date: "February 14, 2026",
    title: "Perfect gift — everyone loves it",
    body: "Bought this as a birthday gift and it was the hit of the party. Easy to learn, impossible to put down. The whole room was screaming.",
    verified: true,
    avatar: "DL",
  },
  {
    id: 3,
    name: "Marcus W.",
    rating: 4,
    date: "January 5, 2026",
    title: "Great game, balloons are easy to find",
    body: "Super fun game. We ran out of balloons quickly because we couldn't stop playing — but standard party balloons work perfectly as replacements.",
    verified: true,
    avatar: "MW",
  },
  {
    id: 4,
    name: "Sophie H.",
    rating: 5,
    date: "December 12, 2025",
    title: "Kids absolutely love it",
    body: "My kids talk about this game every single day. The suspense of not knowing when it'll pop is genuinely thrilling even for adults watching!",
    verified: true,
    avatar: "SH",
  },
  {
    id: 5,
    name: "Brian C.",
    rating: 5,
    date: "November 30, 2025",
    title: "Office party MVP",
    body: "Brought it to our company holiday party and it was the highlight of the whole night. Perfect for groups who've never played before.",
    verified: true,
    avatar: "BC",
  },
];

const FAQS = [
  {
    q: "Can I use regular balloons when I run out?",
    a: "Absolutely! Any standard latex party balloons work perfectly. Just blow them up to a consistent size for fair play.",
  },
  {
    q: "Is this safe for younger kids?",
    a: "Wack A Balloon is designed for ages 6 and up. Adult supervision is recommended for younger players.",
  },
  {
    q: "How many players can play at once?",
    a: "The game supports 2 to 8 players, making it ideal for family game nights and large gatherings alike.",
  },
  {
    q: "How does shipping work?",
    a: "We offer free shipping on orders over $40 in the contiguous US. Orders ship within 1–2 business days and typically arrive in 3–5 days.",
  },
  {
    q: "What if I want to play with more than 8 people?",
    a: "Check out Wack A Balloon — Party Edition! It supports up to 12 players and comes with 60 balloons and 2 mallets.",
  },
];

const SOCIAL_PROOF = [
  { stat: "98+",  label: "5-Star Reviews" },
  { stat: "40K+", label: "Happy Players" },
  { stat: "#1",   label: "Party Game Pick" },
  { stat: "4.9",  label: "Avg. Rating" },
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

export default function WackABalloonPage({ onBack, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    onAddToCart(quantity, 25.99);
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
    name: "Wack A Balloon",
    image: GALLERY.map((item) => `https://diffygames.com${item.src}`),
    description: "Wack A Balloon is a fast, suspense-filled balloon party game built for kids, families, birthdays, and big reactions.",
    brand: {
      "@type": "Brand",
      name: "Diffy Games"
    },
    sku: "wack-a-balloon",
    offers: {
      "@type": "Offer",
      url: "https://diffygames.com/wack-a-balloon",
      priceCurrency: "USD",
      price: "25.99",
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
      { "@type": "ListItem", position: 2, name: "Wack A Balloon", item: "https://diffygames.com/wack-a-balloon" },
    ],
  });

  return (
    <div className="min-h-screen bg-white pb-28 lg:pb-0">
      <Seo
        title="Wack A Balloon | Viral Balloon Party Game for Kids and Families"
        description="Shop Wack A Balloon, the suspense-packed balloon party game from Diffy Games. Perfect for birthdays, family game nights, and loud group play."
        path="/wack-a-balloon"
        image="/WackNewHero.webp"
        type="product"
        keywords="Wack A Balloon, balloon party game, kids party game, viral party game, family game night game"
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
          <span className="text-gray-900 font-medium">Wack A Balloon</span>
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
              <span className="bg-[#3d99f6] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Fan Favorite
              </span>
              <span className="bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                New
              </span>
            </div>

            <h1 className="font-display uppercase text-5xl lg:text-6xl text-gray-900 leading-none mb-3">
              Wack A Balloon
            </h1>
            <p className="text-sm text-gray-400 font-medium mb-4 leading-snug">
              Party Game · 2–8 Players · 30 Balloons · Ages 6+ · Indoor &amp; Outdoor
            </p>

            <div className="flex items-center gap-3 mb-6">
              <StarRow rating={5} />
              <span className="text-sm font-bold text-gray-800">4.9</span>
              <span className="text-gray-300">·</span>
              <button
                type="button"
                onClick={scrollToReviews}
                className="text-sm text-[#3d99f6] hover:underline cursor-pointer"
              >
                98 reviews
              </button>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-extrabold text-gray-900">$25.99</span>
              <span className="text-lg text-gray-300 line-through">$29.99</span>
              <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100">
                Save 28%
              </span>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8 text-base">
              Wack it hard — but don't pop it. The last player standing wins. Pure chaos, pure fun. Includes 30 balloons and a wacking mallet for 2 to 8 players.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {["30 Balloons", "1 Mallet", "2–8 Players", "Ages 6+", "Indoor & Outdoor"].map((item) => (
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
                Wack it hard.<br />Don't pop it.
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg mb-6">
                Wack A Balloon is the party game that turns everyone into a nervous wreck — in the best possible way. Take turns wacking the balloon without popping it. Each hit brings you closer to the edge.
              </p>
              <p className="text-gray-500 leading-relaxed text-lg mb-8">
                Simple enough for kids, nerve-wracking enough for adults. The pressure builds, the laughter gets louder, and the last player standing wins.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Instant chaos for any group",
                  "Works indoors and outdoors",
                  "Replacement balloons available everywhere",
                  "Multiple play modes for endless variety",
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
                <img src="/WackImage2.webp" alt="Wack A Balloon in action" className="w-full h-auto block" />
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
            <div className="inline-block bg-red-500 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
              Original Game Mode
            </div>
            <h2 className="font-display uppercase text-5xl lg:text-7xl text-gray-900 leading-none mb-4">
              How To Play
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Ages 4+ &nbsp;·&nbsp; 1–8 Players &nbsp;·&nbsp; Adult Supervision Required</p>
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
                  { n: "1", title: "Inflate Balloons", body: "Use the included balloon pump to inflate one or more balloons." },
                  { n: "2", title: "Tie Balloons", body: "Can't tie a knot? Use the included Easy Balloon Ties — they're reusable!" },
                  { n: "3", title: "Place the Black Box", body: "Put the black box on a flat surface directly over the inflated balloon." },
                  { n: "4", title: "Decide Who Goes First", body: "Choose a starting player. They spin and perform the action the arrow lands on." },
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
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col gap-6"
            >
              <div>
                <h3 className="font-display uppercase tracking-widest text-amber-500 text-xl mb-7">How To Play</h3>
                <ul className="space-y-5">
                  {([
                    { title: "Spin the Spinner", body: "On your turn, spin the wheel and perform the action the arrow lands on.", dot: "bg-amber-400" },
                    { title: "Hold the Box", body: "Hold the black box steady while hammering. Be careful not to hit your hands.", dot: "bg-amber-400" },
                    { title: "Don't Pop It!", body: "If the balloon pops on your turn, you lose the round!", dot: "bg-red-500" },
                  ] as const).map((s, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className={`w-3 h-3 rounded-full ${s.dot} shrink-0 mt-1.5`} />
                      <p className="text-gray-600 leading-relaxed"><strong className="text-gray-900">{s.title}:</strong> {s.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety notice */}
              <div className="mt-auto bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
                <p className="text-red-700 text-sm font-semibold uppercase tracking-widest mb-0.5">⚠ Safety Notice</p>
                <p className="text-red-600 text-sm leading-relaxed">Small parts — not suitable for children under 4. Adult supervision required at all times.</p>
              </div>
            </motion.div>
          </div>

          {/* Spinner Actions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6"
          >
            <h3 className="font-display uppercase tracking-widest text-[#3d99f6] text-xl mb-7 text-center">Spinner Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {([
                { badge: "1×", label: "1x Nail", body: "Hammer one nail into any designated hole.", color: "bg-[#3d99f6]" },
                { badge: "2×", label: "2x Nails", body: "Hammer two nails into holes of your choice.", color: "bg-[#3d99f6]" },
                { badge: "3×", label: "3x Nails", body: "Hammer three nails into holes of your choice.", color: "bg-[#3d99f6]" },
                { badge: "SKP", label: "Skip", body: "Turn is skipped — no nails this round.", color: "bg-amber-400" },
                { badge: "REV", label: "Reverse", body: "The previous player takes another turn.", color: "bg-red-500" },
              ] as const).map(a => (
                <div key={a.label} className="flex flex-col items-center text-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className={`w-12 h-12 rounded-full ${a.color} text-white flex items-center justify-center font-display font-bold text-sm`}>{a.badge}</span>
                  <span className="font-bold text-gray-900 text-sm uppercase tracking-wide">{a.label}</span>
                  <span className="text-gray-500 text-xs leading-relaxed">{a.body}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Winning Condition */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-red-500 rounded-3xl p-8 text-center shadow-lg"
          >
            <p className="font-display uppercase text-white text-2xl lg:text-4xl tracking-widest leading-snug drop-shadow">
              The player who pops the balloon <span className="underline decoration-wavy decoration-white/50">loses</span> —<br className="hidden sm:block" /> the other player wins!
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
                <img src="/WackImage3.webp" alt="Wack A Balloon game contents" className="w-full h-auto block" />
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
          src="/WackImage5.webp"
          alt="Wack A Balloon party fun"
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
                The Ultimate Party Game
              </p>
              <h2 className="font-display uppercase text-white text-4xl md:text-6xl leading-none mb-6">
                The game that puts everyone on edge
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Join over 40,000 players who've made Wack A Balloon their go-to for laughter-filled game nights.
              </p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="px-8 py-4 bg-white text-gray-900 font-display uppercase tracking-wider text-base hover:bg-gray-100 transition-colors duration-200 cursor-pointer rounded-xl"
              >
                Add to Cart — $25.99
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
              <div className="font-display text-8xl text-gray-900 leading-none">4.9</div>
              <StarRow rating={5} size="lg" />
              <div className="text-sm text-gray-400 mt-2 font-semibold">98 reviews</div>
            </div>
            <div className="flex-1 w-full max-w-sm">
              {[[5, 90], [4, 8], [3, 2], [2, 0], [1, 0]].map(([stars, pct]) => (
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
            Ready to wack?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
            Wack A Balloon — the game that has everyone holding their breath. Get yours today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className="px-10 py-4 bg-gray-900 text-white font-display uppercase tracking-wider text-lg hover:bg-black transition-colors duration-200 cursor-pointer rounded-xl"
            >
              Add to Cart — $25.99
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
                  <ShoppingBag className="w-4 h-4" /> Add to Cart — $25.99
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

    </div>
  );
}
