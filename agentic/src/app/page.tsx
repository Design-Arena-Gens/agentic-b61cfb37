import { IdeaEngine } from "@/components/idea-engine";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e6fff5_0,_#f2f2ff_40%,_#ffffff_85%)] pb-24 font-sans text-zinc-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-16 pt-24 sm:pt-28 lg:px-10">
        <header className="space-y-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600 shadow-[0_10px_45px_-30px_rgba(16,58,46,0.8)]">
            Zero capital business lab
          </div>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                Ship a business that prints trust, clients, and cash without
                spending a dollar upfront.
              </h1>
              <p className="text-lg text-zinc-600 sm:text-xl">
                Feed the agent with your unfair advantages. Receive curated,
                zero-investment business plays with launch steps, validation
                scripts, and scaling angles that compound fast.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-emerald-700">
                <span className="rounded-full border border-emerald-300 bg-white px-4 py-2">
                  No-code | Community | Advisory | Content | Ops
                </span>
                <span className="rounded-full border border-emerald-300 bg-white px-4 py-2">
                  Built for solo founders & operator-style builders
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-br from-emerald-200/60 via-sky-200/50 to-transparent blur-3xl" />
              <div className="relative flex h-full flex-col justify-between rounded-[34px] border border-emerald-200/70 bg-white/80 p-8 shadow-[0_25px_120px_-60px_rgba(16,58,46,0.7)]">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500">
                  How it compounds
                </p>
                <ul className="mt-5 space-y-4 text-sm text-zinc-600">
                  <li>• Identify leverage you already possess.</li>
                  <li>• Receive business models requiring zero capital.</li>
                  <li>• Launch with validation scripts and proof plans.</li>
                  <li>• Scale using partnerships, playbooks, and retainers.</li>
                </ul>
                <div className="mt-8 rounded-2xl bg-emerald-50/80 p-6 text-sm text-emerald-800">
                  <p className="font-semibold text-emerald-700">
                    Operator tip:
                  </p>
                  Turn every early win into public proof. Momentum multiplies
                  when distribution piggybacks on execution.
                </div>
              </div>
            </div>
          </div>
        </header>

        <IdeaEngine />
      </div>
    </div>
  );
}
