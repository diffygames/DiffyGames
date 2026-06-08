import express from "express";
import Stripe from "stripe";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INVENTORY_FILE = path.join(__dirname, "inventory.json");

const PRICE_TO_PRODUCT: Record<string, string> = {
  "price_1TJeUe1pQJTS8CZHaQcsQBtd": "stack-attack",
  "price_1TJehe1pQJTS8CZHqxipgKAO": "wack-a-balloon",
  "price_1TJej01pQJTS8CZHSdQpurlh": "wack-a-balloon-party",
  "price_1TJekw1pQJTS8CZHOCnNlebd": "stack-attack-xl",
};

dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS: Record<string, string> = {
  "stack-attack": "price_1TJeUe1pQJTS8CZHaQcsQBtd",
  "wack-a-balloon": "price_1TJehe1pQJTS8CZHqxipgKAO",
  "wack-a-balloon-party": "price_1TJej01pQJTS8CZHSdQpurlh",
  "stack-attack-xl": "price_1TJekw1pQJTS8CZHOCnNlebd",
};

const SHIPPING_RATES = [
  "shr_1TID1g1pQJTS8CZHYpUHpDOG", // Ground Shipping
  "shr_1TID2L1pQJTS8CZHfMrq8nUR", // Expedited Shipping
];

app.post("/api/checkout", async (req, res) => {
  const { items } = req.body as {
    items: { productId: string; quantity: number }[];
  };

  if (!items || items.length === 0) {
    res.status(400).json({ error: "Cart is empty" });
    return;
  }

  const PRODUCT_NAMES: Record<string, string> = {
    "stack-attack": "Stack Attack",
    "wack-a-balloon": "Wack A Balloon",
    "wack-a-balloon-party": "Wack A Balloon Party Edition",
    "stack-attack-xl": "Stack Attack XL",
  };

  const PRODUCT_PRICES: Record<string, number> = {
    "stack-attack": 19.99,
    "wack-a-balloon": 25.99,
    "stack-attack-xl": 32.99,
    "wack-a-balloon-party": 29.99,
  };

  const lineItems = items
    .filter((item) => PRODUCT_NAMES[item.productId])
    .map((item) => {
      let unitPrice = PRODUCT_PRICES[item.productId];
      if (item.productId === "stack-attack") {
        if (item.quantity === 2) {
          unitPrice = 17.50; // $34.99 total / 2
        } else if (item.quantity === 3) {
          unitPrice = 15.00; // $44.99 total / 3 (rounded to $15.00)
        } else if (item.quantity > 3) {
          unitPrice = 14.99;
        }
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: PRODUCT_NAMES[item.productId],
          },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: item.quantity,
      };
    });

  if (lineItems.length === 0) {
    res.status(400).json({ error: "No valid products in cart" });
    return;
  }

  const subtotal = lineItems.reduce((sum, item) => {
    return sum + (item.price_data.unit_amount * item.quantity) / 100;
  }, 0);

  const discounts = [];
  if (subtotal >= 40) {
    discounts.push({
      promotion_code: "promo_1Tg7Rn1pQJTS8CZHRLDcSeXe",
    });
  }

  const appUrl = process.env.APP_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    shipping_options: SHIPPING_RATES.map((rate) => ({
      shipping_rate: rate,
    })),
    discounts: discounts.length > 0 ? discounts : undefined,
    success_url: `${appUrl}?checkout=success`,
    cancel_url: `${appUrl}?checkout=cancel`,
  });

  res.json({ url: session.url });
});

app.get("/api/product-stats", async (_req, res) => {
  const now = Date.now();
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const day7 = now / 1000 - 7 * 24 * 60 * 60;
  const day30 = now / 1000 - 30 * 24 * 60 * 60;

  const productIds = Object.values(PRICE_TO_PRODUCT);
  const stats: Record<string, { today: number; last7: number; last30: number }> = {};
  productIds.forEach((id) => { stats[id] = { today: 0, last7: 0, last30: 0 }; });

  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ["data.line_items"],
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    for (const s of sessions.data) {
      if (s.payment_status !== "paid") continue;
      const lineItems = (s as any).line_items?.data ?? [];
      for (const item of lineItems) {
        const priceId = item.price?.id;
        const productId = PRICE_TO_PRODUCT[priceId];
        if (!productId) continue;
        const qty = item.quantity ?? 1;
        if (s.created >= todayStart.getTime() / 1000) stats[productId].today += qty;
        if (s.created >= day7) stats[productId].last7 += qty;
        if (s.created >= day30) stats[productId].last30 += qty;
      }
    }

    hasMore = sessions.has_more;
    if (hasMore) startingAfter = sessions.data[sessions.data.length - 1].id;
  }

  res.json(stats);
});

app.get("/api/inventory", (_req, res) => {
  const data = JSON.parse(fs.readFileSync(INVENTORY_FILE, "utf-8"));
  res.json(data);
});

app.post("/api/inventory", (req, res) => {
  const updates = req.body as Record<string, number>;
  const current = JSON.parse(fs.readFileSync(INVENTORY_FILE, "utf-8"));
  const updated = { ...current, ...updates };
  fs.writeFileSync(INVENTORY_FILE, JSON.stringify(updated, null, 2));
  res.json(updated);
});

app.get("/api/customers", async (_req, res) => {
  const customerMap: Record<string, {
    name: string; email: string; totalSpent: number; orderCount: number;
    lastOrderDate: string; lastOrderAmount: number; city: string; state: string;
  }> = {};

  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    for (const s of sessions.data) {
      if (s.payment_status !== "paid") continue;
      const email = s.customer_details?.email ?? "unknown";
      const name = s.customer_details?.name ?? "—";
      const amount = (s.amount_total ?? 0) / 100;
      const date = new Date(s.created * 1000).toISOString();
      const city = s.shipping_details?.address?.city ?? s.customer_details?.address?.city ?? "";
      const state = s.shipping_details?.address?.state ?? s.customer_details?.address?.state ?? "";

      if (!customerMap[email]) {
        customerMap[email] = { name, email, totalSpent: 0, orderCount: 0, lastOrderDate: date, lastOrderAmount: amount, city, state };
      }
      customerMap[email].totalSpent += amount;
      customerMap[email].orderCount += 1;
      if (date > customerMap[email].lastOrderDate) {
        customerMap[email].lastOrderDate = date;
        customerMap[email].lastOrderAmount = amount;
      }
    }

    hasMore = sessions.has_more;
    if (hasMore) startingAfter = sessions.data[sessions.data.length - 1].id;
  }

  const customers = Object.values(customerMap).sort(
    (a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
  );

  res.json(customers);
});

app.get("/api/stripe-overview", async (_req, res) => {
  const sessions = await stripe.checkout.sessions.list({ limit: 100 });
  const paid = sessions.data.filter((s) => s.payment_status === "paid");

  const totalRevenue = paid.reduce((sum, s) => sum + (s.amount_total ?? 0), 0) / 100;
  const totalOrders = paid.length;

  const now = Date.now();
  const sevenDaysAgo = now / 1000 - 7 * 24 * 60 * 60;
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);

  const last7 = paid.filter((s) => s.created >= sevenDaysAgo);
  const todayOrders = paid.filter((s) => s.created >= todayStart.getTime() / 1000);

  const last7Revenue = last7.reduce((sum, s) => sum + (s.amount_total ?? 0), 0) / 100;
  const todayRevenue = todayOrders.reduce((sum, s) => sum + (s.amount_total ?? 0), 0) / 100;

  // Daily chart — last 7 days
  const dailyMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now - i * 86400000);
    dailyMap[d.toISOString().slice(0, 10)] = 0;
  }
  last7.forEach((s) => {
    const key = new Date(s.created * 1000).toISOString().slice(0, 10);
    if (key in dailyMap) dailyMap[key] += (s.amount_total ?? 0) / 100;
  });
  const dailyChart = Object.entries(dailyMap).map(([date, revenue]) => ({ date, revenue }));

  // Last order
  const last = paid[0];
  const lastOrder = last
    ? {
        id: last.id.slice(-8).toUpperCase(),
        amount: (last.amount_total ?? 0) / 100,
        email: last.customer_details?.email ?? "—",
        name: last.customer_details?.name ?? "—",
        date: new Date(last.created * 1000).toISOString(),
      }
    : null;

  res.json({ totalRevenue, totalOrders, last7Revenue, last7Orders: last7.length, todayOrders: todayOrders.length, todayRevenue, dailyChart, lastOrder });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Diffy Games server running on http://localhost:${PORT}`);
});
