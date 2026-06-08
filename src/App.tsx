import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Star,
  Check,
  LoaderCircle,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import Seo from "./components/Seo";
import { supabase } from "./lib/supabase";
import { API_URL } from "./constants";

const StackAttackPage = lazy(() => import("./pages/StackAttackPage"));
const WackABalloonPage = lazy(() => import("./pages/WackABalloonPage"));
const StackAttackXLPage = lazy(() => import("./pages/StackAttackXLPage"));
const WackABalloonPartyPage = lazy(() => import("./pages/WackABalloonPartyPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const InstructionsHubPage = lazy(() => import("./pages/InstructionsHubPage"));
const ShopAllPage = lazy(() => import("./pages/ShopAllPage"));
const TeamLoginPage = lazy(() => import("./pages/TeamLoginPage"));
const TeamDashboardPage = lazy(() => import("./pages/TeamDashboardPage"));
const InfoPage = lazy(() => import("./pages/InfoPage"));

type Page = "home" | "shop-all" | "stack-attack" | "wack-a-balloon" | "stack-attack-xl" | "wack-a-balloon-party" | "about-us" | "our-blog" | "instructions-hub" | "privacy-policy" | "cookie-policy" | "shipping-policy" | "terms-of-service" | "contact-us" | "help-center" | "sitemap-page" | "team-login" | "team-dashboard";

type ProductId = "stack-attack" | "wack-a-balloon" | "stack-attack-xl" | "wack-a-balloon-party";

type ProductMeta = {
  id: ProductId;
  name: string;
  image: string;
  page: Page;
  basePrice: number;
  originalPrice: number;
};

type CartItem = {
  id: string;
  productId: ProductId;
  quantity: number;
  unitPrice: number;
};

type CartStep = "cart" | "review";

type TeamMember = {
  email: string;
  verified: boolean;
  role?: string | null;
};

type RouteState = {
  page: Page;
  blogSlug: string | null;
};

const PRODUCT_CATALOG: Record<ProductId, ProductMeta> = {
  "stack-attack": {
    id: "stack-attack",
    name: "Stack Attack",
    image: "/StackAttack_HeroImage.webp",
    page: "stack-attack",
    basePrice: 19.99,
    originalPrice: 24.99,
  },
  "wack-a-balloon": {
    id: "wack-a-balloon",
    name: "Wack A Balloon",
    image: "/WackNewHero.webp",
    page: "wack-a-balloon",
    basePrice: 25.99,
    originalPrice: 29.99,
  },
  "stack-attack-xl": {
    id: "stack-attack-xl",
    name: "Stack Attack XL",
    image: "/StackXL1.webp",
    page: "stack-attack-xl",
    basePrice: 32.99,
    originalPrice: 39.99,
  },
  "wack-a-balloon-party": {
    id: "wack-a-balloon-party",
    name: "Wack A Balloon Party Edition",
    image: "/PartyEdition1.webp",
    page: "wack-a-balloon-party",
    basePrice: 29.99,
    originalPrice: 39.99,
  },
};

const PRODUCTS = Object.values(PRODUCT_CATALOG);

const PAGE_PATHS: Record<Page, string> = {
  home: "/",
  "shop-all": "/shop-all",
  "stack-attack": "/stack-attack",
  "wack-a-balloon": "/wack-a-balloon",
  "stack-attack-xl": "/stack-attack-xl",
  "wack-a-balloon-party": "/wack-a-balloon-party",
  "about-us": "/about-us",
  "our-blog": "/blog",
  "instructions-hub": "/instructions",
  "privacy-policy": "/privacy-policy",
  "cookie-policy": "/cookie-policy",
  "shipping-policy": "/shipping-policy",
  "terms-of-service": "/terms-of-service",
  "contact-us": "/contact-us",
  "help-center": "/help-center",
  "sitemap-page": "/site-map",
  "team-login": "/team-login",
  "team-dashboard": "/team-dashboard",
};

function parseRoute(pathname: string): RouteState {
  if (pathname.startsWith("/blog/")) {
    return {
      page: "our-blog",
      blogSlug: pathname.replace("/blog/", "").replace(/\/+$/, "") || null,
    };
  }

  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const match = Object.entries(PAGE_PATHS).find(([, path]) => path === normalized);

  return {
    page: (match?.[0] as Page) || "home",
    blogSlug: null,
  };
}

function getPathForPage(page: Page, blogSlug?: string | null) {
  if (page === "our-blog" && blogSlug) {
    return `/blog/${blogSlug}`;
  }

  return PAGE_PATHS[page] || "/";
}

const HERO_SLIDES = [
  {
    id: "1",
    game: "Stack Attack",
    image: "/StackAttack_HeroImage.webp",
    mobileImage: "/StackMobileHero.webp",
    cta: ["Stack it higher.", "Watch it tumble.", "Win the chaos."],
    button: "Shop Stack Attack",
    page: "stack-attack" as Page,
  },
  {
    id: "2",
    game: "Wack A Balloon",
    image: "/WackNewHero.webp",
    mobileImage: "/WackHeroMobile.webp",
    cta: ["Wack it hard.", "But don't pop it.", "Last one wins."],
    button: "Shop Wack A Balloon",
    page: "wack-a-balloon" as Page,
  },
  {
    id: "3",
    game: "Stack Attack XL",
    image: "/StackXL1.webp",
    mobileImage: "/StackXLMobile.webp",
    cta: ["4x the original.", "100 pieces.", "Stack it sky high."],
    button: "Shop Stack Attack XL",
    page: "stack-attack-xl" as Page,
  },
  {
    id: "4",
    game: "Wack A Balloon Party",
    image: "/PartyEdition1.webp",
    mobileImage: "/PartyEditionMobile.webp",
    cta: ["More balloons.", "More players.", "More chaos."],
    button: "Shop Party Edition",
    page: "wack-a-balloon-party" as Page,
  },
];

const slideVariants = {
  enter: ({ dir, mobile }: { dir: number; mobile: boolean }) => ({
    x: mobile ? (dir > 0 ? "100%" : "-100%") : 0,
    y: mobile ? 0 : (dir > 0 ? "100%" : "-100%"),
    scale: mobile ? 0.88 : 1,
    rotate: mobile ? (dir > 0 ? 3 : -3) : 0,
    opacity: 0,
  }),
  center: { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
  exit: ({ dir, mobile }: { dir: number; mobile: boolean }) => ({
    x: mobile ? (dir > 0 ? "-100%" : "100%") : 0,
    y: mobile ? 0 : (dir > 0 ? "-100%" : "100%"),
    scale: mobile ? 0.88 : 1,
    rotate: mobile ? (dir > 0 ? -3 : 3) : 0,
    opacity: 0,
  }),
};

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: "Amazon",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705a.659.659 0 0 1-.757.074c-1.063-.882-1.254-1.29-1.838-2.13-1.758 1.793-3.002 2.329-5.284 2.329-2.697 0-4.8-1.667-4.8-5.006 0-2.607 1.412-4.383 3.424-5.252 1.744-.772 4.178-.91 6.042-1.123v-.419c0-.771.06-1.681-.392-2.348-.395-.596-1.155-.842-1.824-.842-1.239 0-2.343.636-2.614 1.953-.055.294-.271.583-.565.598l-3.162-.341c-.266-.06-.561-.274-.484-.681C5.68 2.505 8.658 1.5 11.33 1.5c1.42 0 3.276.378 4.394 1.456 1.42 1.323 1.284 3.088 1.284 5.009v4.539c0 1.366.566 1.966 1.099 2.704.187.262.228.576-.01.771-.595.497-1.653 1.422-2.234 1.94l-.719-.624zM20.84 18.06c-2.674 2.025-6.552 3.1-9.894 3.1-4.68 0-8.896-1.731-12.086-4.608-.251-.226-.027-.535.275-.359 3.443 2.004 7.697 3.207 12.093 3.207 2.965 0 6.226-.614 9.227-1.888.453-.193.833.298.385.548z" />
      </svg>
    ),
  },
];

const INFO_PAGES: Record<Extract<Page, "privacy-policy" | "cookie-policy" | "shipping-policy" | "terms-of-service" | "contact-us" | "help-center" | "sitemap-page">, {
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
}> = {
  "privacy-policy": {
    title: "Privacy Policy",
    description: "Learn how Diffy Games collects, uses, and protects customer information on diffygames.com.",
    intro: "We respect your privacy and only collect the information needed to process orders, improve the site, and support our customers.",
    sections: [
      { heading: "Information We Collect", paragraphs: ["We may collect information you provide directly, including your name, email address, shipping details, and order information when you make a purchase or contact us.", "We may also collect basic technical information such as browser type, device type, referral source, and on-site activity to improve performance and usability."] },
      { heading: "How We Use Information", paragraphs: ["We use collected information to fulfill orders, provide customer support, send essential transactional updates, and improve the shopping experience on Diffy Games.", "We may also use aggregated analytics data to understand product interest, improve content, and make the website easier to use."] },
      { heading: "Your Rights", paragraphs: ["If you need help reviewing, updating, or deleting information associated with your orders or inquiries, contact us and we will do our best to assist promptly."] },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description: "Understand how Diffy Games uses cookies and similar technologies on diffygames.com.",
    intro: "Cookies help us keep the site functional, understand performance, and improve the shopping experience.",
    sections: [
      { heading: "How Cookies Help", paragraphs: ["Cookies may be used to remember preferences, preserve shopping behavior where applicable, and support measurement tools that help us understand site performance.", "Some cookies are necessary for the site to function properly, while others help us improve content, navigation, and conversion flows."] },
      { heading: "Managing Cookies", paragraphs: ["Most browsers let you control or disable cookies through settings. Disabling some cookies may affect site functionality or checkout behavior."] },
    ],
  },
  "shipping-policy": {
    title: "Shipping Policy",
    description: "Review Diffy Games shipping timelines, delivery expectations, and order processing details.",
    intro: "We aim to process orders quickly and keep delivery expectations clear so customers know when to expect their games.",
    sections: [
      { heading: "Processing Times", paragraphs: ["Orders are typically processed within one to two business days unless otherwise stated during checkout or during peak promotional periods."] },
      { heading: "Delivery Expectations", paragraphs: ["Delivery windows vary by destination and selected shipping method. Tracking details are provided when available so customers can monitor shipment progress.", "Free shipping thresholds, regional availability, and carrier timelines may change over time and should be confirmed during checkout."] },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    description: "Read the general terms that govern use of diffygames.com and purchases from Diffy Games.",
    intro: "These terms explain the basic rules for using the site, placing orders, and interacting with Diffy Games content and services.",
    sections: [
      { heading: "Website Use", paragraphs: ["By using diffygames.com, you agree to use the website lawfully and in a way that does not interfere with the experience of other visitors or customers."] },
      { heading: "Orders and Availability", paragraphs: ["Product availability, pricing, and promotions may change without notice. We reserve the right to update product information, correct errors, or cancel orders where necessary."] },
      { heading: "Intellectual Property", paragraphs: ["Site content, branding, graphics, copy, and product materials are owned by or licensed to Diffy Games and may not be reused without permission."] },
    ],
  },
  "contact-us": {
    title: "Contact Us",
    description: "Get in touch with Diffy Games for customer support, order questions, and partnership inquiries.",
    intro: "Need help with an order, product question, or partnership idea? Reach out and we will point you in the right direction.",
    sections: [
      { heading: "Customer Support", paragraphs: ["For order updates, product questions, or general support, contact the Diffy Games team through your usual support channel or order confirmation details."] },
      { heading: "Partnerships and Media", paragraphs: ["For wholesale, creator collaborations, media requests, or partnership opportunities, please include the context of your request so we can respond faster."] },
    ],
  },
  "help-center": {
    title: "Help Center",
    description: "Find answers to common Diffy Games questions about products, orders, gameplay, and support.",
    intro: "The Help Center is designed to make it easier for customers to find quick answers before reaching out directly.",
    sections: [
      { heading: "Orders and Shipping", paragraphs: ["Common support topics include order status, shipping timelines, address updates, and delivery expectations."] },
      { heading: "Products and Gameplay", paragraphs: ["For how-to-play information, setup help, and product details, visit the instructions section and individual product pages for the most relevant guidance."] },
    ],
  },
  "sitemap-page": {
    title: "Site Map",
    description: "Browse the main pages available on diffygames.com, including product pages, blog content, and support pages.",
    intro: "Use this page to quickly access the most important parts of the Diffy Games website.",
    sections: [
      { heading: "Main Store Pages", paragraphs: ["Homepage, Shop All, About Us, Instructions, and each individual product page are available directly from the main site navigation."] },
      { heading: "Blog and Support", paragraphs: ["The blog contains strategy guides, family game night ideas, and product-led educational content. Support pages cover policies, contact information, and site navigation resources."] },
    ],
  },
};

export default function App() {
  const initialRoute = parseRoute(typeof window !== "undefined" ? window.location.pathname : "/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartStep, setCartStep] = useState<CartStep>("cart");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [cartToast, setCartToast] = useState<{ title: string; quantity: number } | null>(null);
  const [teamSession, setTeamSession] = useState<Session | null>(null);
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [teamAuthLoading, setTeamAuthLoading] = useState(true);
  const [teamLoginLoading, setTeamLoginLoading] = useState(false);
  const [teamAuthError, setTeamAuthError] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = window.localStorage.getItem("diffy-cart");
      return saved ? JSON.parse(saved) as CartItem[] : [];
    } catch {
      return [];
    }
  });
  const [page, setPage] = useState<Page>(initialRoute.page);
  const [blogSlug, setBlogSlug] = useState<string | null>(initialRoute.blogSlug);
  const [checkoutStatus, setCheckoutStatus] = useState<"success" | "cancel" | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const navigate = (p: Page, options?: { blogSlug?: string | null; replace?: boolean }) => {
    const nextBlogSlug = p === "our-blog" ? options?.blogSlug ?? null : null;
    const targetPath = getPathForPage(p, nextBlogSlug);

    setPage(p);
    setBlogSlug(nextBlogSlug);
    setIsMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
    setCartStep("cart");
    if (window.location.pathname !== targetPath) {
      window.history[options?.replace ? "replaceState" : "pushState"]({}, "", targetPath);
    }
    window.scrollTo({ top: 0 });
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const supabaseConfigured = Boolean(supabase);

  const loadVerifiedTeamMember = async (session: Session | null) => {
    if (!supabase || !session?.user?.email) {
      setTeamSession(session);
      setTeamMember(null);
      return false;
    }

    const emailConfirmed = Boolean(session.user.email_confirmed_at);

    const { data, error } = await supabase
      .from("team_members")
      .select("email, verified, role")
      .eq("email", session.user.email)
      .maybeSingle();

    if (error || !data?.verified || !emailConfirmed) {
      setTeamSession(null);
      setTeamMember(null);
      await supabase.auth.signOut();
      return false;
    }

    setTeamSession(session);
    setTeamMember({
      email: data.email,
      verified: data.verified,
      role: data.role,
    });
    return true;
  };

  const goTo = (index: number, dir?: number) => {
    setDirection(dir ?? (index > currentSlide ? 1 : -1));
    setCurrentSlide(index);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 9000);
  };

  const advance = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(advance, 9000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("diffy-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handlePopState = () => {
      const route = parseRoute(window.location.pathname);
      setPage(route.page);
      setBlogSlug(route.blogSlug);
      setIsMenuOpen(false);
      setSearchOpen(false);
      setCartOpen(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("checkout");
    if (status === "success") {
      setCheckoutStatus("success");
      setCartItems([]);
      window.localStorage.removeItem("diffy-cart");
    } else if (status === "cancel") {
      setCheckoutStatus("cancel");
    }
    if (status) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  useEffect(() => {
    if (!cartToast) return undefined;

    const timer = window.setTimeout(() => setCartToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [cartToast]);

  useEffect(() => {
    if (!supabase) {
      setTeamAuthLoading(false);
      return undefined;
    }

    let mounted = true;

    const boot = async () => {
      const { data } = await supabase.auth.getSession();
      const allowed = await loadVerifiedTeamMember(data.session);

      if (!mounted) return;

      if (allowed && page === "team-login") {
        setPage("team-dashboard");
      }

      setTeamAuthLoading(false);
    };

    void boot();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      void (async () => {
        const allowed = await loadVerifiedTeamMember(session);

        if (!mounted) return;

        if (allowed && page === "team-login") setPage("team-dashboard");
        if (!allowed && page === "team-dashboard") setPage("team-login");
        setTeamAuthLoading(false);
      })();
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [page]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 40;
  const freeShippingProgress = Math.min((cartSubtotal / freeShippingThreshold) * 100, 100);
  const freeShippingRemaining = Math.max(freeShippingThreshold - cartSubtotal, 0);

  const getProductUnitPrice = (productId: ProductId, quantity: number): number => {
    if (productId === "stack-attack") {
      if (quantity === 1) return 19.99;
      if (quantity === 2) return 17.50; // $34.99 / 2
      if (quantity === 3) return 15.00; // $44.99 / 3 (rounded to $15.00)
      return 14.99;
    }
    return PRODUCT_CATALOG[productId].basePrice;
  };

  const addToCart = (productId: ProductId, quantity = 1, _ignoredPrice?: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);

      if (existing) {
        const nextQuantity = existing.quantity + quantity;
        const nextPrice = getProductUnitPrice(productId, nextQuantity);
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, id: productId, quantity: nextQuantity, unitPrice: nextPrice }
            : item
        );
      }

      const unitPrice = getProductUnitPrice(productId, quantity);
      return [...prev, { id: productId, productId, quantity, unitPrice }];
    });

    setCheckoutMessage("");
    setCheckoutLoading(false);
    setCartStep("cart");
    setCartToast({ title: PRODUCT_CATALOG[productId].name, quantity });
    setCartOpen(true);
  };

  const updateCartItemQuantity = (itemId: string, nextQuantity: number) => {
    setCartItems((prev) => {
      if (nextQuantity <= 0) {
        return prev.filter((item) => item.id !== itemId);
      }
      return prev.map((item) => {
        if (item.id === itemId) {
          const unitPrice = getProductUnitPrice(item.productId, nextQuantity);
          return { ...item, quantity: nextQuantity, unitPrice };
        }
        return item;
      });
    });
    setCheckoutMessage("");
    setCheckoutLoading(false);
  };

  const removeCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    setCheckoutMessage("");
    setCheckoutLoading(false);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0 || checkoutLoading) return;

    setCheckoutLoading(true);
    setCheckoutMessage("");

    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }

      window.location.href = data.url;
    } catch (err) {
      setCheckoutLoading(false);
      setCheckoutMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const handleTeamLogin = async (email: string, password: string) => {
    if (!supabase) {
      setTeamAuthError("Supabase is not configured for team login yet.");
      return;
    }

    setTeamLoginLoading(true);
    setTeamAuthError("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setTeamLoginLoading(false);
      setTeamAuthError(error.message);
      return;
    }

    const allowed = await loadVerifiedTeamMember(data.session);
    setTeamLoginLoading(false);

    if (!allowed) {
      setTeamAuthError("Only verified team members with confirmed email addresses can access the dashboard.");
      return;
    }

    setPage("team-dashboard");
  };

  const handleTeamLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }

    setTeamSession(null);
    setTeamMember(null);
    setTeamAuthError("");
    setPage("team-login");
  };

  const homeSchema = [
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Diffy Games",
      url: "https://diffygames.com",
      logo: "https://diffygames.com/DiffyLogo.webp",
      description: "Diffy Games creates viral family party games designed to look awesome on screen and feel even better in real life.",
    }),
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Diffy Games",
      url: "https://diffygames.com",
    }),
  ];

  const routeLoader = (
    <main className="min-h-[calc(100vh-12rem)] bg-gray-50 flex items-center justify-center px-4">
      <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-gray-500 shadow-sm">
        <LoaderCircle className="h-4 w-4 animate-spin text-[#3d99f6]" />
        Loading page
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-gray-900 text-white py-2 px-4 text-center text-xs font-medium tracking-wide uppercase">
        Free shipping on orders over $40 in the contiguous US
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border border-gray-200 shadow-sm">
        <div className="mx-4 lg:mx-8 xl:mx-12 flex items-center justify-between relative h-16 lg:h-20">

          {/* Left — menu button */}
          <div className="flex-1 flex items-center">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-lg cursor-pointer text-gray-700 hover:text-red-600 hover:border-red-200 transition-all duration-200 group"
            >
              <Menu className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="hidden lg:inline text-sm font-semibold tracking-wide uppercase">Menu</span>
            </button>
          </div>

          {/* Center — logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("home"); }} className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <img
              src="/DiffyLogo.webp"
              alt="Diffy Toys and Games"
              className="h-10 lg:h-14 w-auto object-contain rounded-md"
            />
          </a>

          {/* Right — search + cart */}
          <div className="flex-1 flex items-center justify-end gap-2 lg:gap-3">
            <div className="relative" ref={searchRef}>
              <button
                type="button"
                aria-label="Search products"
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen((open) => !open)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg cursor-pointer text-gray-700 hover:text-red-600 hover:border-red-200 transition-all duration-200"
              >
                <Search className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="hidden lg:inline text-sm font-semibold tracking-wide uppercase">Search</span>
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-3 w-[min(22rem,calc(100vw-2rem))] rounded-[1.5rem] border border-gray-200 bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
                  >
                    <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
                      Shop Our Games
                    </p>
                    <div className="space-y-1">
                      {PRODUCTS.map((product) => (
                        <button
                          key={product.name}
                          type="button"
                          onClick={() => navigate(product.page)}
                          className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-14 w-14 rounded-xl object-cover border border-gray-100 bg-gray-100 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-display text-sm uppercase leading-tight text-gray-900">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs font-medium text-gray-500">
                              View product page
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              type="button"
              aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} item${cartCount > 1 ? "s" : ""}` : ""}`}
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg cursor-pointer text-gray-700 hover:text-red-600 hover:border-red-200 transition-all duration-200 relative"
            >
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="hidden lg:inline text-sm font-semibold tracking-wide uppercase">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      <AnimatePresence>
        {cartToast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 left-4 right-4 z-[95] rounded-[1.5rem] border border-gray-200 bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-md sm:left-auto sm:right-6 sm:w-[22rem]"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Check className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">Added to cart</p>
                <p className="mt-1 font-display text-lg uppercase leading-tight text-gray-900">{cartToast.title}</p>
                <p className="mt-1 text-sm text-gray-500">Quantity added: {cartToast.quantity}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px]"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: "100%", y: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed inset-x-0 bottom-0 z-[90] flex max-h-[92vh] w-full flex-col rounded-t-[2rem] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.25)] sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:max-w-md sm:rounded-none"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400">{cartStep === "cart" ? "Your Cart" : "Review Order"}</p>
                  <h2 className="font-display text-2xl uppercase text-gray-900">{cartStep === "cart" ? `${cartCount} item${cartCount === 1 ? "" : "s"}` : "Almost there"}</h2>
                </div>
                <div className="flex items-center gap-2">
                  {cartStep === "review" && (
                    <button
                      type="button"
                      onClick={() => {
                        setCartStep("cart");
                        setCheckoutMessage("");
                        setCheckoutLoading(false);
                      }}
                      className="rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    type="button"
                    aria-label="Close cart"
                    onClick={() => setCartOpen(false)}
                    className="rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:px-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 text-[#3d99f6] shadow-inner">
                    <ShoppingBag className="h-9 w-9" />
                  </div>
                  <h3 className="mt-6 font-display text-3xl uppercase text-gray-900">Your cart is empty</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                    Add a few Diffy favorites and they&apos;ll show up here with quantity controls, free shipping progress, and a checkout review step.
                  </p>
                  <div className="mt-6 grid w-full max-w-sm gap-3 text-left">
                    {[
                      "Fast review before checkout",
                      "Secure checkout powered by Stripe",
                      "Free shipping over $40 in the contiguous US",
                    ].map((note) => (
                      <div key={note} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#3d99f6] shadow-sm">
                          <Check className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium text-gray-600">{note}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCartOpen(false);
                      navigate("home");
                    }}
                    className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-[#3d99f6] cursor-pointer"
                  >
                    Keep Shopping
                  </button>
                </div>
              ) : (
                <>
                  {cartStep === "cart" ? (
                    <>
                      <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                          <span>Free Shipping Progress</span>
                          <span>{freeShippingRemaining > 0 ? `$${freeShippingRemaining.toFixed(2)} away` : "Unlocked"}</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#3d99f6] to-cyan-400 transition-all duration-300" style={{ width: `${freeShippingProgress}%` }} />
                        </div>
                        <p className="mt-3 text-sm text-gray-500">
                          {freeShippingRemaining > 0
                            ? `Add $${freeShippingRemaining.toFixed(2)} more to qualify for free shipping.`
                            : "You unlocked free shipping for this order."}
                        </p>
                      </div>

                      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
                        {cartItems.map((item) => {
                          const product = PRODUCT_CATALOG[item.productId];
                          const lineTotal = item.unitPrice * item.quantity;

                          return (
                            <div key={item.id} className="rounded-3xl border border-gray-100 bg-gray-50/70 p-4">
                              <div className="flex gap-4">
                                <button
                                  type="button"
                                  onClick={() => navigate(product.page)}
                                  className="shrink-0 cursor-pointer"
                                >
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-24 w-24 rounded-2xl border border-gray-100 bg-white object-cover"
                                  />
                                </button>

                                <div className="min-w-0 flex-1">
                                  <button
                                    type="button"
                                    onClick={() => navigate(product.page)}
                                    className="text-left cursor-pointer"
                                  >
                                    <h3 className="font-display text-lg uppercase leading-tight text-gray-900 hover:text-[#3d99f6] transition-colors duration-200">
                                      {product.name}
                                    </h3>
                                  </button>
                                  <p className="mt-2 text-sm font-semibold text-gray-500">
                                    ${item.unitPrice.toFixed(2)} each
                                  </p>
                                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center rounded-full border border-gray-200 bg-white">
                                      <button
                                        type="button"
                                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                        className="flex h-10 w-10 items-center justify-center text-lg text-gray-600 transition-colors duration-200 hover:bg-gray-50 cursor-pointer"
                                      >
                                        -
                                      </button>
                                      <span className="min-w-10 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                                      <button
                                        type="button"
                                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                        className="flex h-10 w-10 items-center justify-center text-lg text-gray-600 transition-colors duration-200 hover:bg-gray-50 cursor-pointer"
                                      >
                                        +
                                      </button>
                                    </div>

                                    <div className="text-right">
                                      <p className="font-display text-xl uppercase text-gray-900">${lineTotal.toFixed(2)}</p>
                                      <button
                                        type="button"
                                        onClick={() => removeCartItem(item.id)}
                                        className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-gray-400 transition-colors duration-200 hover:text-red-600 cursor-pointer"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Upsell Banner for Stack Attack */}
                              {item.productId === "stack-attack" && item.quantity === 1 && (
                                <div className="mt-4 flex items-center justify-between gap-3 p-3 bg-amber-50/80 border border-amber-200/50 rounded-2xl">
                                  <div className="text-xs text-amber-800 leading-tight">
                                    <span className="font-bold">Add more to save!</span> Price drops to <span className="font-bold">$17.50 each</span> at 2 games.
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => updateCartItemQuantity(item.id, 2)}
                                    className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl transition-colors cursor-pointer text-center"
                                  >
                                    Add & Save
                                  </button>
                                </div>
                              )}
                              {item.productId === "stack-attack" && item.quantity === 2 && (
                                <div className="mt-4 flex items-center justify-between gap-3 p-3 bg-emerald-50/80 border border-emerald-200/50 rounded-2xl">
                                  <div className="text-xs text-emerald-800 leading-tight">
                                    <span className="font-bold">Best value tier!</span> Add 1 more to drop price to <span className="font-bold">$15.00 each</span>.
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => updateCartItemQuantity(item.id, 3)}
                                    className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl transition-colors cursor-pointer text-center"
                                  >
                                    Add & Save
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="border-t border-gray-100 bg-white px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
                        <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                          <span>Subtotal</span>
                          <span className="font-display text-2xl tracking-normal text-gray-900">${cartSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm font-semibold text-gray-500">
                          <span>Shipping</span>
                          <span className={freeShippingRemaining > 0 ? "text-gray-900" : "text-emerald-600"}>
                            {freeShippingRemaining > 0 ? "Calculated at checkout" : "Free"}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm font-semibold text-gray-500">
                          <span>Sales Tax</span>
                          <span className="text-gray-900">Calculated at checkout</span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-500">
                          Secure checkout powered by Stripe.
                        </p>
                        <button
                          type="button"
                          onClick={() => setCartStep("review")}
                          disabled={cartItems.length === 0}
                          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#3d99f6] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-[#2c8cf0] hover:shadow-[0_14px_30px_rgba(61,153,246,0.28)] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                        >
                          Review Order
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                        <div className="rounded-[1.75rem] border border-gray-100 bg-gray-50 p-5">
                          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            <span>Order Summary</span>
                            <span>{cartCount} item{cartCount === 1 ? "" : "s"}</span>
                          </div>
                          <div className="mt-4 space-y-3">
                            {cartItems.map((item) => {
                              const product = PRODUCT_CATALOG[item.productId];
                              return (
                                <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 border border-gray-100">
                                  <img src={product.image} alt={product.name} className="h-14 w-14 rounded-xl object-cover border border-gray-100" />
                                  <div className="min-w-0 flex-1">
                                    <p className="font-display text-sm uppercase text-gray-900 leading-tight">{product.name}</p>
                                    <p className="mt-1 text-xs font-medium text-gray-500">Qty {item.quantity} x ${item.unitPrice.toFixed(2)}</p>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">${(item.quantity * item.unitPrice).toFixed(2)}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="mt-5 rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-sm">
                          <div className="flex items-center justify-between text-sm font-semibold text-gray-500">
                            <span>Subtotal</span>
                            <span className="text-gray-900">${cartSubtotal.toFixed(2)}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-sm font-semibold text-gray-500">
                            <span>Shipping</span>
                            <span className={freeShippingRemaining > 0 ? "text-gray-900" : "text-emerald-600"}>
                              {freeShippingRemaining > 0 ? "Calculated at checkout" : "Free"
                              }
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-sm font-semibold text-gray-500">
                            <span>Sales Tax</span>
                            <span className="text-gray-900">Calculated at checkout</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-4">
                            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">Estimated total</span>
                            <span className="font-display text-2xl text-gray-900">${cartSubtotal.toFixed(2)}+</span>
                          </div>
                        </div>

                        <div className="mt-5 space-y-3">
                          <div className="rounded-[1.75rem] border border-blue-100 bg-blue-50 px-5 py-4">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3d99f6]">Shipping note</p>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                              Orders over $40 ship free in the contiguous US. Most orders ship in 1-2 business days.
                            </p>
                          </div>
                          <div className="rounded-[1.75rem] border border-gray-100 bg-gray-50 px-5 py-4">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Returns</p>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                              Easy 30-day returns. If something arrives wrong or damaged, we&apos;ll make it right.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 bg-white px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
                        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                          Secure checkout powered by Stripe
                        </p>
                        <button
                          type="button"
                          onClick={handleCheckout}
                          disabled={cartItems.length === 0 || checkoutLoading}
                          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#3d99f6] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-[#2c8cf0] hover:shadow-[0_14px_30px_rgba(61,153,246,0.28)] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                        >
                          {checkoutLoading ? "Preparing Secure Checkout..." : "Proceed to Checkout"}
                        </button>
                        {checkoutMessage && (
                          <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#3d99f6]">
                            {checkoutMessage}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-full max-w-xs bg-white z-[70] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-bold text-xl">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="cursor-pointer p-1 text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col">
                {/* Shop Products — accordion */}
                <div className="border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShopOpen((v) => !v)}
                    className="w-full text-lg font-medium py-3 flex items-center justify-between cursor-pointer hover:text-red-600 transition-colors duration-200"
                  >
                    Shop Products
                    <motion.span animate={{ rotate: shopOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {shopOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col pb-3 pl-4 gap-1">
                          {PRODUCTS.map((product) => (
                            <a
                              key={product.name}
                              href={getPathForPage(product.page)}
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(product.page);
                              }}
                              className="py-2 text-base transition-colors duration-200 flex items-center gap-2 text-gray-600 hover:text-red-600 cursor-pointer"
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                              {product.name}
                            </a>
                          ))}
                          <a
                            href={PAGE_PATHS["shop-all"]}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("shop-all");
                            }}
                            className="py-2 text-base transition-colors duration-200 flex items-center gap-2 text-gray-600 hover:text-red-600 cursor-pointer"
                          >
                            <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                            Shop All
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Us */}
                <a
                  href={PAGE_PATHS["about-us"]}
                  onClick={(e) => { e.preventDefault(); navigate("about-us"); }}
                  className="text-lg font-medium py-3 border-b border-gray-100 flex items-center justify-between group cursor-pointer hover:text-red-600 transition-colors duration-200"
                >
                  About Us
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 transition-colors duration-200" />
                </a>

                {/* Our Blog */}
                <a
                  href={PAGE_PATHS["our-blog"]}
                  onClick={(e) => { e.preventDefault(); navigate("our-blog"); }}
                  className="text-lg font-medium py-3 border-b border-gray-100 flex items-center justify-between group cursor-pointer hover:text-red-600 transition-colors duration-200"
                >
                  Our Blog
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 transition-colors duration-200" />
                </a>

                {/* Instructions */}
                <a
                  href={PAGE_PATHS["instructions-hub"]}
                  onClick={(e) => { e.preventDefault(); navigate("instructions-hub"); }}
                  className="text-lg font-medium py-3 border-b border-gray-100 flex items-center justify-between group cursor-pointer hover:text-red-600 transition-colors duration-200"
                >
                  Instructions
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 transition-colors duration-200" />
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Suspense fallback={routeLoader}>
        {page === "about-us" && (
          <AboutUsPage onBack={() => navigate("home")} />
        )}
        {page === "shop-all" && (
          <ShopAllPage onBack={() => navigate("home")} onNavigate={(p) => navigate(p as Page)} products={PRODUCTS} />
        )}
        {page === "our-blog" && (
          <BlogPage
            onBack={() => navigate("home")}
            activeSlug={blogSlug}
            onOpenPost={(slug) => navigate("our-blog", { blogSlug: slug })}
            onClosePost={() => navigate("our-blog")}
          />
        )}
        {page === "instructions-hub" && (
          <InstructionsHubPage onBack={() => navigate("home")} onNavigate={(p) => navigate(p as Page)} />
        )}
        {(page === "privacy-policy" || page === "cookie-policy" || page === "shipping-policy" || page === "terms-of-service" || page === "contact-us" || page === "help-center" || page === "sitemap-page") && (
          <InfoPage
            title={INFO_PAGES[page].title}
            description={INFO_PAGES[page].description}
            intro={INFO_PAGES[page].intro}
            sections={INFO_PAGES[page].sections}
            path={PAGE_PATHS[page]}
            onBack={() => navigate("home")}
          />
        )}
        {page === "team-login" && (
          <Seo
            title="Team Login | Diffy Games"
            description="Secure team login for Diffy Games staff."
            path="/team-login"
            noindex
          />
        )}
        {page === "team-login" && (
          <TeamLoginPage
            onBack={() => navigate("home")}
            onSubmit={handleTeamLogin}
            loading={teamLoginLoading}
            error={teamAuthError}
            configured={supabaseConfigured}
          />
        )}
        {page === "team-dashboard" && (
          <Seo
            title="Team Dashboard | Diffy Games"
            description="Internal Diffy Games dashboard."
            path="/team-dashboard"
            noindex
          />
        )}
        {page === "team-dashboard" && (
          teamAuthLoading ? (
            <main className="min-h-[calc(100vh-12rem)] bg-gray-50 flex items-center justify-center px-4">
              <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-gray-500 shadow-sm">
                <LoaderCircle className="h-4 w-4 animate-spin text-[#3d99f6]" />
                Checking team access
              </div>
            </main>
          ) : teamSession && teamMember?.verified ? (
            <TeamDashboardPage
              member={{ email: teamMember.email, role: teamMember.role || "team" }}
              onLogout={handleTeamLogout}
              onBackToStore={() => navigate("home")}
            />
          ) : (
            <TeamLoginPage
              onBack={() => navigate("home")}
              onSubmit={handleTeamLogin}
              loading={teamLoginLoading}
              error={teamAuthError || "Please sign in with a verified team account."}
              configured={supabaseConfigured}
            />
          )
        )}
        {page === "stack-attack" && (
          <StackAttackPage onBack={() => navigate("home")} onAddToCart={(quantity, unitPrice) => addToCart("stack-attack", quantity, unitPrice)} />
        )}
        {page === "wack-a-balloon" && (
          <WackABalloonPage onBack={() => navigate("home")} onAddToCart={(quantity, unitPrice) => addToCart("wack-a-balloon", quantity, unitPrice)} />
        )}
        {page === "stack-attack-xl" && (
          <StackAttackXLPage onBack={() => navigate("home")} onAddToCart={(quantity, unitPrice) => addToCart("stack-attack-xl", quantity, unitPrice)} />
        )}
        {page === "wack-a-balloon-party" && (
          <WackABalloonPartyPage onBack={() => navigate("home")} onAddToCart={(quantity, unitPrice) => addToCart("wack-a-balloon-party", quantity, unitPrice)} />
        )}
      </Suspense>

      {page === "home" && (
      <main>
        <Seo
          title="Diffy Games | Viral Family Party Games That Look Great On Screen"
          description="Shop Diffy Games for viral family party games like Stack Attack, Wack A Balloon, Stack Attack XL, and Party Edition. Built for laughs, replayability, and big reactions."
          path="/"
          image="/StackAttack_HeroImage.webp"
          keywords="viral party games, family party games, stacking game, balloon party game, tiktok shop games, diffy games"
          schema={homeSchema}
        />
        {/* Hero Carousel */}
        <section className="bg-white overflow-hidden relative lg:min-h-[600px]">
          <AnimatePresence custom={{ dir: direction, mobile: isMobile }} mode="wait">
            <motion.div
              key={currentSlide}
              custom={{ dir: direction, mobile: isMobile }}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={isMobile
                ? { type: "spring", stiffness: 280, damping: 26, opacity: { duration: 0.15 } }
                : { duration: 0.63, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[600px]"
            >
              {/* Image */}
              <div
                className={`w-full lg:w-[52%] lg:flex lg:items-end lg:justify-center ${HERO_SLIDES[currentSlide].page ? "cursor-pointer" : ""}`}
                onClick={() => { const p = HERO_SLIDES[currentSlide].page; if (p) navigate(p); }}
              >
                <picture>
                  {HERO_SLIDES[currentSlide].mobileImage && (
                    <source
                      media="(max-width: 1023px)"
                      srcSet={HERO_SLIDES[currentSlide].mobileImage}
                    />
                  )}
                  <img
                    src={HERO_SLIDES[currentSlide].image}
                    alt={HERO_SLIDES[currentSlide].game}
                    className="w-full h-auto block lg:w-auto lg:h-[680px] xl:h-[740px] lg:object-contain"
                    fetchPriority="high"
                    loading="eager"
                  />
                </picture>
              </div>

              {/* Text — Desktop Only */}
              <div className="hidden lg:flex relative w-full lg:w-[48%] flex-col justify-center lg:pl-14 xl:pl-20 pr-12 xl:pr-20 py-16 border-l-2 border-gray-100 overflow-hidden">

                {(HERO_SLIDES[currentSlide].page === "stack-attack" || HERO_SLIDES[currentSlide].page === "stack-attack-xl" || HERO_SLIDES[currentSlide].page === "wack-a-balloon" || HERO_SLIDES[currentSlide].page === "wack-a-balloon-party") && (
                  <div className={`pointer-events-none absolute -right-8 xl:-right-14 2xl:-right-20 z-0 ${
                    HERO_SLIDES[currentSlide].page === "stack-attack" || HERO_SLIDES[currentSlide].page === "stack-attack-xl"
                      ? "top-20 xl:top-16"
                      : "-top-[3.75rem] xl:-top-[4.75rem]"
                  }`}>
                    <img
                      src={HERO_SLIDES[currentSlide].page === "stack-attack" || HERO_SLIDES[currentSlide].page === "stack-attack-xl"
                        ? "/StackSticker.webp"
                        : HERO_SLIDES[currentSlide].page === "wack-a-balloon-party"
                          ? "/PartyEditionSticker.webp"
                          : "/WackSticker.webp"}
                      alt=""
                      aria-hidden="true"
                      className="w-[24rem] xl:w-[31rem] 2xl:w-[34rem] max-w-none h-auto drop-shadow-[0_24px_42px_rgba(15,23,42,0.16)] rotate-[16deg] opacity-80"
                    />
                  </div>
                )}

                {/* Game name label */}
                <div className="relative z-10 flex items-center gap-3 mb-7">
                  <div className="w-8 h-[3px] bg-[#3d99f6] rounded-full" />
                  <h2 className="text-2xl xl:text-3xl tracking-widest text-[#3d99f6] mb-0">
                    {HERO_SLIDES[currentSlide].game}
                  </h2>
                </div>

                {/* Big CTA headline */}
                <h1 className="relative z-10 leading-[0.88] mb-8 text-gray-900">
                  {HERO_SLIDES[currentSlide].cta.map((line, i) => (
                    <span
                      key={i}
                      className={`font-display block text-[3.75rem] xl:text-[4.5rem] 2xl:text-[5rem] ${
                        i === HERO_SLIDES[currentSlide].cta.length - 1
                          ? "text-[#3d99f6]"
                          : "text-gray-900"
                      }`}
                    >
                      {line}
                    </span>
                  ))}
                </h1>

                {/* Accent bar */}
                <div className="relative z-10 w-20 h-[3px] bg-[#3d99f6] rounded-full mb-9" />

                {/* Actions */}
                <div className="relative z-10 flex items-center gap-6">
                  <a
                    href={getPathForPage(HERO_SLIDES[currentSlide].page)}
                    onClick={(e) => {
                      e.preventDefault();
                      const p = HERO_SLIDES[currentSlide].page;
                      if (p) navigate(p);
                    }}
                    className="px-10 py-4 bg-gray-900 text-white font-display uppercase tracking-widest text-base hover:bg-[#3d99f6] transition-colors duration-200 active:scale-95 cursor-pointer rounded-2xl shadow-lg"
                  >
                    {HERO_SLIDES[currentSlide].button}
                  </a>
                  <a
                    href={getPathForPage(HERO_SLIDES[currentSlide].page)}
                    onClick={(e) => {
                      e.preventDefault();
                      const p = HERO_SLIDES[currentSlide].page;
                      if (p) navigate(p);
                    }}
                    className="font-display uppercase text-sm tracking-widest text-gray-400 hover:text-[#3d99f6] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="absolute bottom-6 right-6 lg:right-12 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  i === currentSlide ? "bg-[#3d99f6] w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12">
              <div className="w-full text-center">
                <h2 className="font-display uppercase text-4xl md:text-4xl mb-4">
                  <span className="font-display">Explore Diffy</span>
                </h2>
                <p className="text-gray-500 hidden md:block">Explore our curated selection of fun.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Stacking Games", image: "/stack xl jack stacking falling.webp", page: "stack-attack-xl" as Page },
                { name: "Wack The Balloon", image: "/WackNewHero.webp", page: "wack-a-balloon" as Page, objectPosition: "bottom" },
                { name: "Coming Soon", image: "/ComingSoonImage.webp" },
              ].map((cat) => (
                <motion.a
                  key={cat.name}
                  href={cat.page ? getPathForPage(cat.page) : undefined}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => {
                    if (!cat.page) return;
                    e.preventDefault();
                    navigate(cat.page);
                  }}
                  className={`group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ${cat.page ? "cursor-pointer" : "cursor-default"}`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: cat.objectPosition ?? "center" }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 top-0 text-white text-center px-4 pt-1">
                    <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                    <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                      Shop Now <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <h2 className="font-display uppercase text-4xl md:text-5xl mb-4 text-gray-900">Our Top Games</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
                Games the whole family can't put down. Grab yours before they sell out!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  id: "stack-attack" as ProductId,
                  name: "Stack Attack",
                  image: "/StackAttack_HeroImage.webp",
                  price: "$19.99",
                  originalPrice: "$24.99",
                  description: "The viral stacking game that took TikTok by storm. Stack the blocks — but one wrong move and it all crashes down!",
                  tag: "Best Seller",
                  tagColor: "bg-red-600",
                  page: "stack-attack" as Page,
                },
                {
                  id: "wack-a-balloon" as ProductId,
                  name: "Wack A Balloon",
                  image: "/WackNewHero.webp",
                  price: "$25.99",
                  originalPrice: "$29.99",
                  description: "Wack it hard, but don't pop it! The last player standing wins in this hilarious party game.",
                  tag: "Fan Favorite",
                  tagColor: "bg-[#3d99f6]",
                  page: "wack-a-balloon" as Page,
                },
                {
                  id: "stack-attack-xl" as ProductId,
                  name: "Stack Attack XL",
                  image: "/StackXL1.webp",
                  price: "$32.99",
                  originalPrice: "$39.99",
                  description: "4x bigger, 100 pieces, and 100% more chaos. The ultimate edition for parties and backyard fun.",
                  tag: "XL Edition",
                  tagColor: "bg-gray-900",
                  page: "stack-attack-xl" as Page,
                },
                {
                  id: "wack-a-balloon-party" as ProductId,
                  name: "Wack A Balloon — Party Edition",
                  image: "/PartyEdition1.webp",
                  price: "$29.99",
                  originalPrice: "$39.99",
                  description: "Double the mallets, 60 balloons, up to 12 players. The Party Edition is built for big groups and even bigger laughs.",
                  tag: "Party Edition",
                  tagColor: "bg-[#3d99f6]",
                  page: "wack-a-balloon-party" as Page,
                },
              ].map((product, i) => (
                <div className="relative">
                  {product.name === "Stack Attack" && (
                    <span className="absolute -top-3 -left-3 z-10 bg-amber-400 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                      <Star className="w-4 h-4 fill-white text-white" />
                    </span>
                  )}
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <a
                      href={getPathForPage(product.page)}
                      className="relative overflow-hidden bg-gray-50 cursor-pointer block"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(product.page);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                      />
                    </a>

                    {/* Info */}
                    <div className="p-5 flex flex-col flex-1">
                      <a
                        href={getPathForPage(product.page)}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(product.page);
                        }}
                        className="text-left cursor-pointer mb-2 group/title"
                      >
                        <h3 className="font-display uppercase text-xl text-gray-900 group-hover/title:text-[#3d99f6] transition-colors duration-200 leading-tight">
                          {product.name}
                        </h3>
                      </a>

                      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-gray-900">{product.price}</span>
                          <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(product.id, 1, PRODUCT_CATALOG[product.id].basePrice)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-display uppercase tracking-wide rounded-xl hover:bg-[#3d99f6] transition-colors duration-200 active:scale-95 cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community / UGC Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">
                Tag @DiffyGames for a chance to be featured
              </p>
              <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-none">
                Join our community of 100K+
              </h2>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { handle: "@joeyreed",           img: "/Joey_Reed_Playing_Wack_A_Balloon.webp", page: "wack-a-balloon" as Page },
                { handle: "@adifishman",         img: "/Party_Edition_Mid_Game.webp", page: "wack-a-balloon-party" as Page },
                { handle: "@highlandbrosgames",  img: "/Highland_Bros_Wack_A_Balloon.webp", page: "wack-a-balloon" as Page },
                { handle: "@brandontheentertainer", img: "/Family_Playing_Stack_Attack.webp", page: "stack-attack" as Page },
              ].map((item, i) => (
                <motion.div
                  key={item.handle}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex flex-col gap-2"
                >
                  {/* Username */}
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                    {item.handle}
                  </p>

                  {/* Photo */}
                  <a
                    href={getPathForPage(item.page)}
                    className="relative overflow-hidden cursor-pointer group block"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.page);
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`Community photo by ${item.handle}`}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </a>

                  {/* Shop Now */}
                  <a
                    href={getPathForPage(item.page)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.page);
                    }}
                    className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 hover:text-[#3d99f6] transition-colors duration-200 cursor-pointer text-center py-1 border-b-2 border-gray-900 hover:border-[#3d99f6] mx-auto"
                  >
                    Shop Now
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Faze Rug Spotlight */}
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
                  <a
                    href={PAGE_PATHS["stack-attack"]}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("stack-attack");
                    }}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3d99f6] px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-[#2c8cf0] hover:shadow-[0_14px_30px_rgba(61,153,246,0.35)] cursor-pointer"
                  >
                    Shop Stack Attack
                  </a>
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
                            <filter id="glow-arrow" x="-50%" y="-50%" width="200%" height="200%">
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
                            filter="url(#glow-arrow)"
                          />
                          <path
                            d="M228 38 L201 54 L231 64"
                            fill="none"
                            stroke="#ff5353"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#glow-arrow)"
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

        {/* Instructions Section */}
        <section className="py-16 bg-[#2c97fa]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="font-display uppercase text-3xl md:text-4xl text-white leading-none mb-2">
                Instructions For All Games!
              </h2>
              <p className="text-white/80 text-sm font-medium">
                Choose any game to find out how to play!
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { name: "Stack Attack",                 img: "/StackLogo.webp",        href: PAGE_PATHS["instructions-hub"] },
                { name: "Wack A Balloon",               img: "/WackLogo.webp",         href: PAGE_PATHS["instructions-hub"] },
                { name: "Stack Attack XL",              img: "/StackXLLogo.webp",      href: PAGE_PATHS["instructions-hub"] },
                { name: "Wack A Balloon Party Edition", img: "/PartyEditionLogo.webp", href: PAGE_PATHS["instructions-hub"] },
              ].map((game, i) => (
                <motion.a
                  key={game.name}
                  href={game.href}
                  onClick={(e) => { e.preventDefault(); navigate("instructions-hub"); }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col items-center gap-3 cursor-pointer"
                >
                  {/* Square logo box */}
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <img
                      src={game.img}
                      alt={game.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Game name */}
                  <span className="font-display font-bold text-white uppercase tracking-widest text-center text-sm group-hover:text-white/70 transition-colors duration-200 leading-tight">
                    {game.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">

            {/* Header */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 px-4 py-1.5 rounded-full mb-4">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Verified Reviews</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-none">
                What Our Happy<br className="hidden sm:block" /> Customers Say!
              </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah M.",       avatar: "SM", avatarBg: "bg-rose-400",
                  rating: 5,
                  game: "Stack Attack",
                  quote: "We've played this every single weekend since we got it. The kids love it, the adults love it. Simple to learn but genuinely tense when the stack gets high!",
                },
                {
                  name: "James T.",       avatar: "JT", avatarBg: "bg-sky-400",
                  rating: 5,
                  game: "Wack A Balloon",
                  quote: "Saw it on TikTok and bought it on a whim. Zero regrets. It was the funniest game night we've ever had. The whole room was screaming.",
                },
                {
                  name: "Priya K.",       avatar: "PK", avatarBg: "bg-violet-400",
                  rating: 5,
                  game: "Stack Attack XL",
                  quote: "The XL version is on a whole other level. We set it up at a barbecue and it basically ran itself — everyone wanted in. Absolute crowd-pleaser.",
                },
                {
                  name: "Marcus D.",      avatar: "MD", avatarBg: "bg-emerald-400",
                  rating: 5,
                  game: "Stack Attack",
                  quote: "Gave this to my nephew for his birthday and the whole family ended up playing for 3 hours straight. Definitely buying more for other families.",
                },
                {
                  name: "Tanya F.",       avatar: "TF", avatarBg: "bg-orange-400",
                  rating: 5,
                  game: "Wack A Balloon Party Edition",
                  quote: "Used the Party Edition at a wedding reception and it was the best decision of the night. Even grandparents got involved. The 2 mallets keep things moving fast.",
                },
                {
                  name: "Linda R.",       avatar: "LR", avatarBg: "bg-teal-400",
                  rating: 5,
                  game: "Wack A Balloon",
                  quote: "I'm a teacher and use this for brain breaks. Students BEG to play it. Helps with focus, coordination, and teamwork. Hands down the best game I own.",
                },
              ].map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative bg-white rounded-3xl p-7 shadow-sm border border-gray-100 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300"
                >
                  {/* Big quote mark */}
                  <span className="absolute top-5 right-6 font-display text-7xl text-gray-100 leading-none select-none pointer-events-none" aria-hidden>
                    "
                  </span>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 leading-relaxed text-[15px] flex-1">
                    "{t.quote}"
                  </p>

                  {/* Game tag */}
                  <span className="inline-block self-start text-[10px] font-bold uppercase tracking-widest text-[#3d99f6] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                    {t.game}
                  </span>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className={`w-10 h-10 rounded-full ${t.avatarBg} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" /> Verified Purchase
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-400 text-sm mb-4">Over <span className="font-bold text-gray-700">500+ happy customers</span> and counting</p>
              <div className="flex justify-center gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">4.9 Average Rating</p>
            </div>
          </div>
        </section>

        {/* Newsletter */}


        <section className="py-24 bg-[#3d99f6] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h2 className="font-display uppercase text-5xl md:text-6xl lg:text-7xl mb-4 text-white leading-none">Join Team Diffy For A Discount!</h2>
            <p className="font-display uppercase text-2xl md:text-3xl lg:text-4xl text-white/90 mb-10 max-w-4xl mx-auto leading-tight">
              Subscribe to get 10% off your first order and stay updated on new game releases.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); }}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gray-900 text-white text-xl leading-6 font-bold rounded-xl hover:bg-black transition-colors duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <a href="/" onClick={(e) => { e.preventDefault(); navigate("home"); }} className="flex items-center mb-6">
                <img
                  src="/DiffyLogo.webp"
                  alt="Diffy Toys and Games"
                  className="h-14 w-auto object-contain rounded-md"
                />
              </a>
              <p className="text-gray-500 text-lg md:text-xl mb-8 max-w-sm leading-relaxed">
                We create games that bring people together! Strategic, funny games made for all ages!
              </p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map(({ svg, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-100 transition-all duration-200 cursor-pointer"
                  >
                    {svg}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-2xl mb-6">Discover</h4>
              <ul className="flex flex-col gap-4 text-lg md:text-xl text-gray-500">
                {["Instructions", "Physical Games"].map(item => (
                  <li key={item}>
                    <a 
                      href={item === "Instructions" ? PAGE_PATHS["instructions-hub"] : PAGE_PATHS["shop-all"]}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        if (item === "Instructions") navigate("instructions-hub"); 
                        else navigate("shop-all");
                      }}
                      className="hover:text-red-600 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-2xl mb-6">Company</h4>
              <ul className="flex flex-col gap-4 text-lg md:text-xl text-gray-500">
                {["About Us", "Our Blog"].map(item => (
                  <li key={item}>
                    <a 
                      href={item === "About Us" ? PAGE_PATHS["about-us"] : PAGE_PATHS["our-blog"]}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        if (item === "About Us") navigate("about-us"); 
                        else if (item === "Our Blog") navigate("our-blog");
                      }}
                      className="hover:text-red-600 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-2xl mb-6">Support</h4>
              <ul className="flex flex-col gap-4 text-lg md:text-xl text-gray-500">
                {[
                  { label: "Contact Us", page: "contact-us" as Page },
                  { label: "Help Center", page: "help-center" as Page },
                  { label: "Shipping Policy", page: "shipping-policy" as Page },
                  { label: "Terms of Service", page: "terms-of-service" as Page },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={PAGE_PATHS[item.page]}
                      onClick={(e) => { e.preventDefault(); navigate(item.page); }}
                      className="hover:text-red-600 transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-base text-gray-400">
              © 2026 Playground Games Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-8 text-base text-gray-400">
              <a href={PAGE_PATHS["privacy-policy"]} onClick={(e) => { e.preventDefault(); navigate("privacy-policy"); }} className="hover:text-gray-600 transition-colors duration-200">Privacy Policy</a>
              <a href={PAGE_PATHS["cookie-policy"]} onClick={(e) => { e.preventDefault(); navigate("cookie-policy"); }} className="hover:text-gray-600 transition-colors duration-200">Cookie Policy</a>
              <a href={PAGE_PATHS["sitemap-page"]} onClick={(e) => { e.preventDefault(); navigate("sitemap-page"); }} className="hover:text-gray-600 transition-colors duration-200">Sitemap</a>
              <button
                type="button"
                onClick={() => navigate(teamSession && teamMember?.verified ? "team-dashboard" : "team-login")}
                className="text-left hover:text-gray-600 transition-colors duration-200 cursor-pointer"
              >
                Team Login
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Checkout Confirmation Overlay */}
      <AnimatePresence>
        {checkoutStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden bg-[#0F0F23] border border-purple-700/40 shadow-[0_0_80px_rgba(124,58,237,0.25)]"
            >
              {checkoutStatus === "success" ? (
                <div className="p-8 text-center">
                  {/* Success icon */}
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-700/20 border border-purple-500/30">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <Check className="h-10 w-10 text-purple-400" />
                    </motion.div>
                  </div>

                  <h2 className="font-display text-3xl uppercase tracking-widest text-white mb-2">
                    Order Confirmed
                  </h2>
                  <p className="text-purple-300 text-sm tracking-wide mb-1">
                    Thanks for your purchase!
                  </p>
                  <p className="text-gray-400 text-sm mb-8">
                    Stripe will send a receipt to your email. We'll get your games packed and shipped soon.
                  </p>

                  <button
                    type="button"
                    onClick={() => setCheckoutStatus(null)}
                    className="w-full cursor-pointer rounded-2xl bg-purple-700 hover:bg-purple-600 transition-colors duration-200 px-6 py-3.5 font-display uppercase tracking-widest text-white text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center">
                  {/* Cancel icon */}
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-900/20 border border-rose-500/30">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <X className="h-10 w-10 text-rose-400" />
                    </motion.div>
                  </div>

                  <h2 className="font-display text-3xl uppercase tracking-widest text-white mb-2">
                    Order Cancelled
                  </h2>
                  <p className="text-gray-400 text-sm mb-8">
                    No worries — your cart is still saved. Head back whenever you're ready.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutStatus(null);
                      setCartOpen(true);
                    }}
                    className="w-full cursor-pointer rounded-2xl bg-rose-700 hover:bg-rose-600 transition-colors duration-200 px-6 py-3.5 font-display uppercase tracking-widest text-white text-sm"
                  >
                    Back to Cart
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
