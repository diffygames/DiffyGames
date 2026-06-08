import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowLeft, LoaderCircle, ShieldCheck } from "lucide-react";

type Props = {
  onBack: () => void;
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string;
  configured: boolean;
};

export default function TeamLoginPage({ onBack, onSubmit, loading, error, configured }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <main className="min-h-[calc(100vh-12rem)] bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 hover:text-[#3d99f6] transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to store
        </button>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-[#0b1220] px-8 py-10 text-white md:px-10 md:py-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8ed0ff]">
              <ShieldCheck className="h-4 w-4" />
              Team Access
            </div>
            <h1 className="mt-6 font-display text-5xl uppercase leading-[0.94] sm:text-6xl">
              Internal dashboard login.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/70">
              Sign in with your team email and password. Only confirmed accounts that exist in the verified team list can enter the dashboard.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Overview cards for store activity",
                "Orders, products, customers, and settings sections",
                "Verified team-member access only",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[#8ed0ff]">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 py-10 md:px-10 md:py-12">
            <div className="max-w-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400">Team login</p>
              <h2 className="mt-3 font-display text-4xl uppercase leading-none text-gray-900">
                Welcome back
              </h2>
              <p className="mt-4 text-sm leading-6 text-gray-500">
                Use your existing team credentials. Email confirmation and verified access are both required.
              </p>

              {!configured && (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-800">
                  Supabase frontend keys are missing. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local` before using team login.
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-gray-500">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    className="h-12 w-full rounded-2xl border border-gray-200 px-4 text-gray-900 outline-none transition-colors duration-200 focus:border-[#3d99f6]"
                    placeholder="team@diffygames.com"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-gray-500">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                    className="h-12 w-full rounded-2xl border border-gray-200 px-4 text-gray-900 outline-none transition-colors duration-200 focus:border-[#3d99f6]"
                    placeholder="Enter your password"
                  />
                </label>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  whileTap={{ scale: configured && !loading ? 0.98 : 1 }}
                  disabled={!configured || loading}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#3d99f6] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-[#2c8cf0] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                >
                  {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                  {loading ? "Signing in..." : "Login to Dashboard"}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
