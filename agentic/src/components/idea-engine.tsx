"use client";

import { useMemo, useState } from "react";
import {
  diagnosticQuestions,
  goalPlaybooks,
  growthStyleLabels,
  ideaBlueprints,
  IdeaBlueprint,
  growthStyles,
  timeCommitmentLabels,
} from "@/lib/ideas";

type PrimaryGoal = keyof typeof goalPlaybooks;

interface UserPreferences {
  skills: string;
  interests: string;
  timeCommitment: IdeaBlueprint["timeCommitment"] | "any";
  growthStyle: "any" | IdeaBlueprint["growthStyles"][number];
  goal: PrimaryGoal;
  audience: string;
}

type MatchResult = {
  blueprint: IdeaBlueprint;
  score: number;
  highlights: {
    label: string;
    items: string[];
  }[];
};

const defaultPreferences: UserPreferences = {
  skills: "",
  interests: "",
  timeCommitment: "any",
  growthStyle: "any",
  goal: "income",
  audience: "",
};

const preferencePresets: Record<
  PrimaryGoal,
  { label: string; description: string; example: string }
> = {
  income: {
    label: "Fast cashflow",
    description: "Ship results quickly with proof-of-value offers.",
    example: "ex: research, operations, automation, done-for-you",
  },
  audience: {
    label: "Audience leverage",
    description: "Earn attention before monetization kicks in.",
    example: "ex: newsletter, roundup, community spotlight",
  },
  credibility: {
    label: "Proof-of-work",
    description: "Build reputation that unlocks premium gigs.",
    example: "ex: playbooks, facilitation, portfolio labs",
  },
  automation: {
    label: "Systems leverage",
    description: "Focus on workflows that scale with minimal time.",
    example: "ex: async studios, no-code automation, scouting",
  },
};

const tokenize = (raw: string) =>
  raw
    .toLowerCase()
    .split(/[\s,;/&]+/)
    .map((token) => token.trim())
    .filter(Boolean);

const matchScore = (
  blueprint: IdeaBlueprint,
  preferences: UserPreferences,
): MatchResult => {
  const skillTokens = new Set(tokenize(preferences.skills));
  const interestTokens = new Set(tokenize(preferences.interests));
  const audienceTokens = new Set(tokenize(preferences.audience));

  let score = 0;
  const highlights: MatchResult["highlights"] = [];

  const matchedSkills = blueprint.requiredSkills.filter((skill) =>
    skillTokens.has(skill.toLowerCase()),
  );
  const adjacentSkills = blueprint.supportiveSkills.filter((skill) =>
    skillTokens.has(skill.toLowerCase()),
  );
  if (matchedSkills.length) {
    score += matchedSkills.length * 4;
    highlights.push({
      label: "Direct fit strengths",
      items: matchedSkills,
    });
  }
  if (adjacentSkills.length) {
    score += adjacentSkills.length * 2;
    highlights.push({
      label: "Transferable skills",
      items: adjacentSkills,
    });
  }

  const matchedInterests = blueprint.suitableInterests.filter((interest) =>
    interestTokens.has(interest.toLowerCase()),
  );
  if (matchedInterests.length) {
    score += matchedInterests.length * 3;
    highlights.push({
      label: "Energizing topics",
      items: matchedInterests,
    });
  }

  const matchedAudiences = blueprint.targetAudiences.filter((audience) =>
    audienceTokens.has(audience.toLowerCase()),
  );
  if (matchedAudiences.length) {
    score += matchedAudiences.length * 2;
    highlights.push({
      label: "Warm audience access",
      items: matchedAudiences,
    });
  }

  if (
    preferences.timeCommitment !== "any" &&
    preferences.timeCommitment === blueprint.timeCommitment
  ) {
    score += 4;
    highlights.push({
      label: "Time fit",
      items: [timeCommitmentLabels[blueprint.timeCommitment]],
    });
  }

  if (
    preferences.growthStyle !== "any" &&
    blueprint.growthStyles.includes(preferences.growthStyle)
  ) {
    score += 5;
    highlights.push({
      label: "Growth preference",
      items: [growthStyleLabels[preferences.growthStyle]],
    });
  }

  if (preferences.goal === "income" && blueprint.revenueStreams.length >= 3) {
    score += 3;
  }

  if (preferences.goal === "automation" && blueprint.noCashTactics.length >= 3) {
    score += 3;
  }

  if (preferences.goal === "credibility" && blueprint.validationSignals.length) {
    score += 2;
  }

  if (highlights.length === 0) {
    highlights.push({
      label: "Leverage points",
      items: [blueprint.differentiation],
    });
  }

  return { blueprint, score, highlights };
};

const strategicAngles = [
  "Audit existing relationships for first wins.",
  "Package outcomes, not hours — define a signature offer.",
  "Capture testimonials and case studies within two weeks.",
  "Ship public assets weekly to build compounding trust.",
  "Automate intake, onboarding, and reporting from day one.",
];

const MomentumBadge = ({ label }: { label: string }) => (
  <span className="rounded-full border border-emerald-400/50 bg-emerald-100/70 px-3 py-1 text-xs font-medium text-emerald-700">
    {label}
  </span>
);

const SectionTitle = ({ title, kicker }: { title: string; kicker: string }) => (
  <header className="flex flex-col gap-1">
    <span className="text-xs uppercase tracking-[0.35em] text-emerald-500">
      {kicker}
    </span>
    <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">{title}</h2>
  </header>
);

const IdeaCard = ({ match }: { match: MatchResult }) => {
  const { blueprint, highlights } = match;
  return (
    <article className="flex flex-col rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-[0_25px_60px_-45px_rgba(16,58,46,0.55)] transition hover:border-emerald-300 hover:shadow-[0_30px_70px_-40px_rgba(16,58,46,0.6)]">
      <div className="flex flex-wrap items-center gap-2">
        <MomentumBadge label={growthStyleLabels[blueprint.growthStyles[0]]} />
        <MomentumBadge
          label={`Time: ${timeCommitmentLabels[blueprint.timeCommitment]}`}
        />
        <MomentumBadge label="Zero capital launch" />
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-zinc-900">
        {blueprint.title}
      </h3>
      <p className="mt-2 text-sm font-medium text-emerald-700">
        {blueprint.headline}
      </p>
      <p className="mt-4 text-sm text-zinc-600">{blueprint.description}</p>

      <dl className="mt-6 space-y-4">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Why this wins
          </dt>
          <dd className="mt-2 space-y-2 text-sm text-zinc-600">
            {blueprint.valueProps.map((prop) => (
              <p key={prop}>• {prop}</p>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Leverage points
          </dt>
          <dd className="mt-2 flex flex-wrap gap-2 text-xs text-emerald-700">
            {highlights.flatMap((group) =>
              group.items.map((item, index) => (
                <span
                  key={`${group.label}-${item}-${index}`}
                  className="rounded-full bg-emerald-100 px-3 py-1"
                >
                  {item}
                </span>
              )),
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            First revenue moves
          </dt>
          <dd className="mt-2 space-y-2 text-sm text-zinc-600">
            {blueprint.launchSteps.slice(0, 3).map((step) => (
              <p key={step}>• {step}</p>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            No-cash tactics
          </dt>
          <dd className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-700">
            {blueprint.noCashTactics.map((tactic) => (
              <span
                key={tactic}
                className="rounded-full border border-emerald-200 px-3 py-1"
              >
                {tactic}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <footer className="mt-8 grid gap-4 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Revenue experiments
          </p>
          <ul className="mt-2 space-y-1 text-zinc-700">
            {blueprint.revenueStreams.map((stream) => (
              <li key={stream}>• {stream}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Scale pathways
          </p>
          <ul className="mt-2 space-y-1 text-zinc-700">
            {blueprint.scaleAngles.map((angle) => (
              <li key={angle}>• {angle}</li>
            ))}
          </ul>
        </div>
      </footer>
    </article>
  );
};

const FocusTile = ({
  goal,
  isActive,
  onSelect,
}: {
  goal: PrimaryGoal;
  isActive: boolean;
  onSelect: (goal: PrimaryGoal) => void;
}) => {
  const preset = preferencePresets[goal];
  return (
    <button
      type="button"
      onClick={() => onSelect(goal)}
      className={`flex flex-col rounded-2xl border p-6 text-left transition ${
        isActive
          ? "border-emerald-400 bg-emerald-50 shadow-[0_12px_50px_-30px_rgba(16,58,46,0.65)]"
          : "border-zinc-200 bg-white hover:border-emerald-200 hover:shadow-[0_15px_50px_-45px_rgba(16,58,46,0.4)]"
      }`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
        {preset.label}
      </span>
      <span className="mt-3 text-lg font-semibold text-zinc-900">
        {preset.description}
      </span>
      <span className="mt-3 text-sm text-zinc-500">{preset.example}</span>
    </button>
  );
};

export function IdeaEngine() {
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);
  const [variation, setVariation] = useState(0);

  const matches = useMemo(() => {
    const scored = ideaBlueprints.map((blueprint) =>
      matchScore(blueprint, preferences),
    );
    const sorted = scored.sort((a, b) => b.score - a.score);
    const rotation = variation % Math.max(sorted.length, 1);
    const rotated =
      rotation === 0
        ? sorted
        : [...sorted.slice(rotation), ...sorted.slice(0, rotation)];
    return rotated.slice(0, 3);
  }, [preferences, variation]);

  const goalPlaybook = goalPlaybooks[preferences.goal];

  return (
    <div className="space-y-16">
      <section className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] lg:items-start">
        <div className="space-y-10 rounded-4xl border border-zinc-200 bg-white/80 p-10 shadow-[0_30px_120px_-60px_rgba(16,58,46,0.75)] backdrop-blur">
          <SectionTitle
            kicker="Opportunity intelligence"
            title="Design your zero-capital business advantage"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-600">
              Strengths or skills you lean on
              <textarea
                rows={3}
                placeholder="research, operations, storytelling..."
                value={preferences.skills}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    skills: event.target.value,
                  }))
                }
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-600">
              Topics that energize you
              <textarea
                rows={3}
                placeholder="creator economy, community building..."
                value={preferences.interests}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    interests: event.target.value,
                  }))
                }
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-600">
              Communities or audiences you can reach easily
              <textarea
                rows={3}
                placeholder="indie hackers, local food makers..."
                value={preferences.audience}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    audience: event.target.value,
                  }))
                }
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-600">
              Time you can commit weekly
              <select
                value={preferences.timeCommitment}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    timeCommitment: event.target.value as UserPreferences["timeCommitment"],
                  }))
                }
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
              >
                <option value="any">I can flex my schedule</option>
                <option value="micro">1-4 hrs/week</option>
                <option value="part-time">5-15 hrs/week</option>
                <option value="full-time">16+ hrs/week</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-600">
              Preferred momentum style
              <select
                value={preferences.growthStyle}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    growthStyle: event.target.value as UserPreferences["growthStyle"],
                  }))
                }
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
              >
                <option value="any">Surprise me with leverage</option>
                {growthStyles.map((style) => (
                  <option key={style} value={style}>
                    {growthStyleLabels[style]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="space-y-4 rounded-3xl bg-emerald-50/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Pick your priority
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.keys(preferencePresets) as PrimaryGoal[]).map((goal) => (
                <FocusTile
                  key={goal}
                  goal={goal}
                  isActive={preferences.goal === goal}
                  onSelect={(selectedGoal) =>
                    setPreferences((prev) => ({ ...prev, goal: selectedGoal }))
                  }
                />
              ))}
            </div>
            <div className="rounded-2xl border border-emerald-200/80 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                {goalPlaybook.headline}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-emerald-900">
                {goalPlaybook.focusPoints.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SectionTitle
            kicker="Immediate actions"
            title="Prime your launch in the next 7 days"
          />
          <div className="rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-[0_25px_90px_-60px_rgba(16,58,46,0.6)] backdrop-blur">
            <p className="text-sm text-zinc-600">
              Focus on the highest leverage momentum moves to earn your first
              wins while confidence compounds.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-zinc-700">
              {strategicAngles.map((angle, index) => (
                <li key={angle} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-300 text-xs font-semibold text-emerald-700">
                    {index + 1}
                  </span>
                  <span>{angle}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setVariation((count) => count + 1)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-medium text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-900"
            >
              Refresh with different angle
            </button>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-white to-emerald-50 p-8 shadow-[0_20px_70px_-50px_rgba(16,58,46,0.5)]">
            <SectionTitle kicker="Self-discovery" title="Diagnostic prompts" />
            <p className="mt-3 text-sm text-zinc-600">
              Journal on one prompt daily to expose underused leverage. Use your
              answers inside outreach, landing pages, and content.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {diagnosticQuestions.map((question) => (
                <li key={question}>• {question}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle kicker="Idea short-list" title="Your top 3 no-capital plays" />
        <div className="grid gap-6 lg:grid-cols-3">
          {matches.map((match) => (
            <IdeaCard key={match.blueprint.id} match={match} />
          ))}
        </div>
      </section>
    </div>
  );
}
