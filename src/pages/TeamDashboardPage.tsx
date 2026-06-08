import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  TrendingUp,
  ArrowLeft,
  DollarSign,
  ShoppingCart,
  Calendar,
  Clock,
  ShieldCheck,
  Zap,
  CreditCard,
  Boxes,
  Pencil,
  Check,
  Users,
  Mail,
  MapPin,
} from "lucide-react";

type TeamMember = {
  email: string;
  role: string;
};

type Props = {
  member: TeamMember;
  onLogout: () => Promise<void>;
  onBackToStore: () => void;
};

type DailyPoint = { date: string; revenue: number };

type OverviewData = {
  totalRevenue: number;
  totalOrders: number;
  last7Revenue: number;
  last7Orders: number;
  todayOrders: number;
  todayRevenue: number;
  dailyChart: DailyPoint[];
  lastOrder: {
    id: string;
    amount: number;
    email: string;
    name: string;
    date: string;
  } | null;
};

type Section = "home" | "overview" | "orders" | "products" | "customers" | "settings";

const NAV_ITEMS: { id: Section; label: string; icon: typeof ShoppingBag; desc: string }[] = [
  { id: "overview", label: "Overview", icon: TrendingUp, desc: "Revenue, orders, charts, and last sale" },
  { id: "orders", label: "Ship Orders", icon: Package, desc: "Fulfillment flow — connects to ShipStation" },
  { id: "products", label: "Products", icon: ShoppingBag, desc: "Inventory, pricing, and product listings" },
  { id: "customers", label: "Customers", icon: Users, desc: "Every buyer with order history and contact info" },
  { id: "settings", label: "Settings", icon: Settings, desc: "Team access and integrations" },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function shortDay(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" });
}

function BarChart({ data }: { data: DailyPoint[] }) {
  const max = Math.max(...data.map((d) => d.revenue), 1);
  return (
    <div className="flex items-end gap-2 h-28 w-full">
      {data.map((d, i) => {
        const pct = (d.revenue / max) * 100;
        const isToday = i === data.length - 1;
        return (
          <div key={d.date} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
            <div className="w-full flex flex-col justify-end" style={{ height: "88px" }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(pct, d.revenue > 0 ? 8 : 3)}%` }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full rounded-t-lg ${
                  isToday
                    ? "bg-emerald-500"
                    : d.revenue > 0
                    ? "bg-[#3d99f6]"
                    : "bg-gray-200"
                }`}
                title={`${shortDay(d.date)}: ${fmt(d.revenue)}`}
              />
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{shortDay(d.date)}</span>
          </div>
        );
      })}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconBg,
  iconColor,
  valueColor,
  delay,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: typeof DollarSign;
  iconBg: string;
  iconColor: string;
  valueColor: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-3"
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">{label}</p>
        <p className={`mt-1 text-2xl font-bold leading-none ${valueColor}`}>{value}</p>
        {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
      </div>
    </motion.div>
  );
}

function OverviewPanel() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/stripe-overview")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError("Could not load data. Is the server running?"); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3d99f6] border-t-transparent" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600 text-sm">{error}</div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={fmt(data.totalRevenue)}
          sub={`${data.totalOrders} orders all time`}
          icon={DollarSign}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          valueColor="text-emerald-600"
          delay={0}
        />
        <StatCard
          label="Last 7 Days"
          value={fmt(data.last7Revenue)}
          sub={`${data.last7Orders} orders`}
          icon={TrendingUp}
          iconBg="bg-blue-50"
          iconColor="text-[#3d99f6]"
          valueColor="text-[#3d99f6]"
          delay={0.07}
        />
        <StatCard
          label="Today's Revenue"
          value={fmt(data.todayRevenue)}
          sub={`${data.todayOrders} order${data.todayOrders !== 1 ? "s" : ""} today`}
          icon={Calendar}
          iconBg="bg-violet-50"
          iconColor="text-violet-600"
          valueColor="text-violet-600"
          delay={0.14}
        />
        <StatCard
          label="Total Orders"
          value={String(data.totalOrders)}
          sub="All paid sessions"
          icon={ShoppingCart}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          valueColor="text-gray-900"
          delay={0.21}
        />
      </div>

      {/* Chart + Last Order */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Daily Revenue</p>
              <p className="mt-0.5 text-lg font-bold text-gray-900">Last 7 Days</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#3d99f6]" />Past
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />Today
              </span>
            </div>
          </div>
          <BarChart data={data.dailyChart} />
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">7-day total</span>
            <span className="text-sm font-bold text-emerald-600">{fmt(data.last7Revenue)}</span>
          </div>
        </motion.div>

        {/* Last Order */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.35 }}
          className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Last Order</p>

          {data.lastOrder ? (
            <div className="flex flex-col gap-3.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Order ID</span>
                <span className="font-mono text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">#{data.lastOrder.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Amount</span>
                <span className="text-xl font-bold text-emerald-600">{fmt(data.lastOrder.amount)}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-gray-400">Customer</span>
                <span className="text-xs text-gray-900 font-medium text-right truncate max-w-[60%]">{data.lastOrder.name}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-gray-400">Email</span>
                <span className="text-xs text-[#3d99f6] text-right truncate max-w-[60%]">{data.lastOrder.email}</span>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400">
                <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="text-xs">{fmtDate(data.lastOrder.date)}</span>
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Paid
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-400 text-sm">
              No orders yet
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

const PRODUCTS_META = [
  { id: "stack-attack", name: "Stack Attack", image: "/StackAttack_HeroImage.webp" },
  { id: "wack-a-balloon", name: "Wack A Balloon", image: "/WackNewHero.webp" },
  { id: "stack-attack-xl", name: "Stack Attack XL", image: "/StackXL1.webp" },
  { id: "wack-a-balloon-party", name: "Wack A Balloon Party Edition", image: "/PartyEdition1.webp" },
];

type ProductStats = Record<string, { today: number; last7: number; last30: number }>;
type Inventory = Record<string, number>;

function InventoryCell({ productId, value, onSave }: { productId: string; value: number; onSave: (id: string, val: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  useEffect(() => { setDraft(String(value)); }, [value]);

  const commit = () => {
    const n = parseInt(draft, 10);
    if (!isNaN(n) && n >= 0) onSave(productId, n);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          min={0}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
          autoFocus
          className="w-16 rounded-lg border border-[#3d99f6] bg-white px-2 py-1 text-sm font-bold text-gray-900 outline-none text-center"
        />
        <button type="button" onClick={commit} className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer">
          <Check className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="group flex items-center gap-2 cursor-pointer"
    >
      <span className={`text-sm font-bold ${value === 0 ? "text-red-500" : "text-gray-900"}`}>{value}</span>
      <Pencil className="h-3 w-3 text-gray-300 group-hover:text-[#3d99f6] transition-colors" />
    </button>
  );
}

function ProductsPanel() {
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/product-stats").then((r) => r.json()),
      fetch("/api/inventory").then((r) => r.json()),
    ]).then(([s, inv]) => {
      setStats(s);
      setInventory(inv);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleInventorySave = (productId: string, value: number) => {
    const updated = { ...inventory, [productId]: value };
    setInventory(updated);
    fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [productId]: value }),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3d99f6] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Table header */}
      <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-4 pb-1">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Product</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 text-center">Today</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 text-center">7 Days</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 text-center">30 Days</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 text-center">Inventory</span>
      </div>

      {PRODUCTS_META.map((product, i) => {
        const s = stats?.[product.id] ?? { today: 0, last7: 0, last30: 0 };
        const inv = inventory?.[product.id] ?? 0;

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            {/* Mobile layout */}
            <div className="flex items-center gap-4 sm:hidden mb-4">
              <img src={product.image} alt={product.name} className="h-14 w-14 rounded-xl object-cover flex-shrink-0" />
              <p className="font-display text-lg uppercase text-gray-900 leading-tight">{product.name}</p>
            </div>

            {/* Desktop layout */}
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center">
              {/* Product */}
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="h-12 w-12 rounded-xl object-cover flex-shrink-0" />
                <p className="font-display text-base uppercase text-gray-900 leading-tight">{product.name}</p>
              </div>

              {/* Today */}
              <div className="text-center">
                <span className={`text-lg font-bold ${s.today > 0 ? "text-emerald-600" : "text-gray-300"}`}>{s.today}</span>
                <p className="text-[10px] text-gray-400 mt-0.5">units</p>
              </div>

              {/* 7 days */}
              <div className="text-center">
                <span className={`text-lg font-bold ${s.last7 > 0 ? "text-[#3d99f6]" : "text-gray-300"}`}>{s.last7}</span>
                <p className="text-[10px] text-gray-400 mt-0.5">units</p>
              </div>

              {/* 30 days */}
              <div className="text-center">
                <span className={`text-lg font-bold ${s.last30 > 0 ? "text-violet-600" : "text-gray-300"}`}>{s.last30}</span>
                <p className="text-[10px] text-gray-400 mt-0.5">units</p>
              </div>

              {/* Inventory */}
              <div className="flex justify-center">
                <InventoryCell productId={product.id} value={inv} onSave={handleInventorySave} />
              </div>
            </div>

            {/* Mobile stats */}
            <div className="grid grid-cols-4 gap-2 sm:hidden">
              {[
                { label: "Today", value: s.today, color: s.today > 0 ? "text-emerald-600" : "text-gray-300" },
                { label: "7 Days", value: s.last7, color: s.last7 > 0 ? "text-[#3d99f6]" : "text-gray-300" },
                { label: "30 Days", value: s.last30, color: s.last30 > 0 ? "text-violet-600" : "text-gray-300" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-gray-50 p-2.5 text-center">
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] text-gray-400">{stat.label}</p>
                </div>
              ))}
              <div className="rounded-xl bg-gray-50 p-2.5 flex flex-col items-center justify-center">
                <InventoryCell productId={product.id} value={inv} onSave={handleInventorySave} />
                <p className="text-[10px] text-gray-400 mt-0.5">Stock</p>
              </div>
            </div>
          </motion.div>
        );
      })}

      <p className="text-xs text-gray-400 pt-1 flex items-center gap-1.5">
        <Boxes className="h-3.5 w-3.5" />
        Click any inventory number to edit. Press Enter or click the checkmark to save.
      </p>
    </div>
  );
}

type Customer = {
  name: string; email: string; totalSpent: number; orderCount: number;
  lastOrderDate: string; lastOrderAmount: number; city: string; state: string;
};

function CustomersPanel() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/customers")
      .then((r) => r.json())
      .then((d) => { setCustomers(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3d99f6] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Total Customers</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{customers.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Total Orders</p>
          <p className="mt-2 text-3xl font-bold text-[#3d99f6]">
            {customers.reduce((s, c) => s + c.orderCount, 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Total Revenue</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {customers.reduce((s, c) => s + c.totalSpent, 0).toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </p>
        </div>
      </div>

      {/* Klaviyo link */}
      <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-gray-900">Email Marketing</p>
          <p className="text-xs text-gray-400 mt-0.5">Manage campaigns, flows, and your full contact list in Klaviyo</p>
        </div>
        <button
          type="button"
          onClick={() => window.open("https://www.klaviyo.com", "_blank")}
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#1a1a1a] hover:bg-black transition-colors duration-200 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white cursor-pointer"
        >
          Open Klaviyo
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#3d99f6] transition-colors shadow-sm"
        />
      </div>

      {/* Customer list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">{search ? "No customers match your search." : "No customers yet."}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Column headers — desktop */}
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 pb-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Customer</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 text-center">Orders</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 text-center">Total Spent</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 text-right">Last Order</span>
          </div>

          {filtered.map((c, i) => (
            <motion.div
              key={c.email}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              {/* Desktop */}
              <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#3d99f6] font-bold text-sm">
                    {c.name !== "—" ? c.name[0].toUpperCase() : c.email[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{c.name !== "—" ? c.name : "—"}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 truncate">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{c.email}</span>
                    </div>
                    {(c.city || c.state) && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span>{[c.city, c.state].filter(Boolean).join(", ")}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-center font-bold text-gray-900">{c.orderCount}</p>
                <p className="text-center font-bold text-emerald-600">
                  {c.totalSpent.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </p>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-900">
                    {c.lastOrderAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(c.lastOrderDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Mobile */}
              <div className="sm:hidden flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#3d99f6] font-bold">
                  {c.name !== "—" ? c.name[0].toUpperCase() : c.email[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{c.name !== "—" ? c.name : c.email}</p>
                  <p className="text-xs text-gray-400 truncate">{c.email}</p>
                  {(c.city || c.state) && (
                    <p className="text-xs text-gray-400">{[c.city, c.state].filter(Boolean).join(", ")}</p>
                  )}
                  <div className="flex gap-3 mt-2">
                    <span className="text-xs text-gray-500">{c.orderCount} order{c.orderCount !== 1 ? "s" : ""}</span>
                    <span className="text-xs font-bold text-emerald-600">
                      {c.totalSpent.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Package className="h-6 w-6 text-gray-400" />
      </div>
      <p className="font-bold text-gray-900 text-lg">{label}</p>
      <p className="text-gray-400 text-sm mt-2">This section is coming soon.</p>
    </div>
  );
}

const SECTION_NAV = NAV_ITEMS.filter((n) => n.id !== "overview");

export default function TeamDashboardPage({ member, onLogout, onBackToStore }: Props) {
  const [activeSection, setActiveSection] = useState<Section | null>(null);

  return (
    <main className="min-h-[calc(100vh-12rem)] bg-gray-50 py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="rounded-[2rem] border border-gray-200 bg-white overflow-hidden shadow-[0_8px_40px_rgba(15,23,42,0.08)]">

          {/* Header */}
          <div className="border-b border-gray-100 bg-white px-6 py-6 md:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                {activeSection ? (
                  <button
                    type="button"
                    onClick={() => setActiveSection(null)}
                    className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#3d99f6] hover:text-blue-700 transition-colors cursor-pointer mb-3"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Dashboard
                  </button>
                ) : (
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400 mb-3">Team Dashboard</p>
                )}
                <h1 className="font-display text-4xl uppercase leading-none text-gray-900 sm:text-5xl">
                  {activeSection ? NAV_ITEMS.find((n) => n.id === activeSection)?.label : "Diffy Admin"}
                </h1>
                {!activeSection && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified · {member.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <Zap className="h-3.5 w-3.5" />
                      Live
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 border border-violet-200 px-3 py-1 text-xs font-semibold text-violet-700">
                      <CreditCard className="h-3.5 w-3.5" />
                      Stripe
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onBackToStore}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-gray-200 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-gray-700 transition-colors duration-200 hover:bg-gray-50 cursor-pointer"
                >
                  View Store
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-gray-700 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-gray-50">
            <AnimatePresence mode="wait">
              {!activeSection ? (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Overview always open */}
                  <OverviewPanel />

                  {/* Divider */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex-1 border-t border-gray-200" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Sections</span>
                    <div className="flex-1 border-t border-gray-200" />
                  </div>

                  {/* 3 section cards */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    {SECTION_NAV.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          onClick={() => item.id === "orders" ? window.open("https://ship.shipstation.com", "_blank") : setActiveSection(item.id)}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.07 }}
                          className="text-left rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-[#3d99f6]/40 hover:shadow-md transition-all duration-200 cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#3d99f6] group-hover:bg-[#3d99f6] group-hover:text-white transition-colors duration-200 flex-shrink-0">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-display text-lg uppercase text-gray-900 leading-tight">{item.label}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeSection === "products" ? (
                    <ProductsPanel />
                  ) : activeSection === "customers" ? (
                    <CustomersPanel />
                  ) : (
                    <ComingSoon label={NAV_ITEMS.find((n) => n.id === activeSection)?.label ?? ""} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
