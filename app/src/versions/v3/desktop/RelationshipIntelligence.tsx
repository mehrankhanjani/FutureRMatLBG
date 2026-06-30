import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { useState } from 'react';
import { Card } from '../../../ui/primitives';
import { Icon, type IconName } from '../../../ui/icons';
import { HelpSpot } from '../help/Help';
import { SceneTabs, RELATIONSHIP_TABS } from './SceneTabs';
import {
  groupRelationship,
  interactionHistory,
  sentimentData,
  dealStages,
  type GroupNode,
} from '../scenario';

/* ---- styling maps -------------------------------------------------------- */

const strengthCfg: Record<
  GroupNode['strength'],
  { stroke: string; dash: string; label: string; chipCls: string }
> = {
  strong: { stroke: 'var(--color-brand)',  dash: '0',   label: 'Strong',      chipCls: 'text-brand'  },
  medium: { stroke: 'var(--color-chip-amber)',   dash: '0',   label: 'Developing',  chipCls: 'text-chip-amber'   },
  weak:   { stroke: 'var(--color-faint)',   dash: '5 5', label: 'White-space', chipCls: 'text-muted'   },
};

const channelIcon: Record<string, IconName> = {
  meeting: 'users',
  call:    'mic',
  email:   'doc',
  crm:     'building',
  teams:   'sparkle',
};

const entityChip: Record<string, string> = {
  Avonmore:   'bg-accent/10 text-accent',
  Calderwood: 'bg-brand/10 text-brand',
  Group:      'bg-surface-2 text-muted',
};

/* ---- network map geometry ------------------------------------------------ */

const AX = 270; const AY = 130;   // Avonmore company node
const CX = 510; const CY = 130;   // Calderwood company node
const COMPANY_R = 34;

// Fixed positions for each contact node (keyed by id)
const NODE_POS: Record<string, { x: number; y: number }> = {
  'aw-cfo':   { x: 70,  y: 140 },
  'aw-ceo':   { x: 160, y: 215 },
  'aw-fd':    { x: 150, y: 55  },
  'aw-de':    { x: 270, y: 45  },
  'ce-ceo':   { x: 650, y: 70  },
  'ce-cfo':   { x: 660, y: 200 },
  'ce-treas': { x: 510, y: 45  },
};

const CONTACT_R = 22;

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('');
}

/* ---- sentiment sparkline ------------------------------------------------- */

const SPARK_W = 520;
const SPARK_H = 88;

function Sparkline() {
  const max = 100;
  const n = sentimentData.length;
  const maxInt = Math.max(...sentimentData.map((d) => d.interactions));
  const pts = sentimentData.map((d, i) => ({
    x: (i / (n - 1)) * SPARK_W,
    y: SPARK_H - (d.score / max) * SPARK_H,
    ...d,
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${SPARK_W} ${SPARK_H} L 0 ${SPARK_H} Z`;
  const barW = (SPARK_W / n) * 0.42;

  return (
    <svg viewBox={`-8 -6 ${SPARK_W + 16} ${SPARK_H + 24}`} className="w-full">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* interactions logged · tangible volume */}
      {pts.map((p) => {
        const h = (p.interactions / maxInt) * (SPARK_H * 0.7);
        return (
          <rect key={`b-${p.month}`} x={p.x - barW / 2} y={SPARK_H - h} width={barW} height={h} rx={2} fill="var(--color-brand)" opacity={0.22} />
        );
      })}
      {/* sentiment index trend */}
      <path d={areaPath} fill="url(#spark-fill)" />
      <path d={linePath} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p) => (
        <circle key={p.month} cx={p.x} cy={p.y} r={2.6} fill="var(--color-accent)" />
      ))}
      {/* interaction counts above bars */}
      {pts.map((p) => (
        <text key={`c-${p.month}`} x={p.x} y={SPARK_H - (p.interactions / maxInt) * (SPARK_H * 0.7) - 3} textAnchor="middle" fontSize="6.5" fontWeight="700" fill="var(--color-brand)" opacity={0.7}>
          {p.interactions}
        </text>
      ))}
      {/* month labels */}
      {pts.map((p) => (
        <text key={`l-${p.month}`} x={p.x} y={SPARK_H + 13} textAnchor="middle" fontSize="7" fill="var(--color-faint)">
          {p.month}
        </text>
      ))}
    </svg>
  );
}

/* ---- contact-detail card ------------------------------------------------- */

function ContactCard({ node, onClose }: { node: GroupNode; onClose: () => void }) {
  const isSuggested = !!node.suggested;
  const name = isSuggested ? node.suggestedName ?? node.label : node.label;
  const role = isSuggested ? node.decisionRole ?? node.role : node.role;
  const badgeCls = isSuggested
    ? 'text-chip-purple bg-chip-purple/15'
    : 'text-accent bg-accent/15';

  return (
    <div
      className={`anim-fadeUp mt-3 rounded-2xl border bg-surface-2 p-4 ${
        isSuggested ? 'border-chip-purple/40' : 'border-line'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${badgeCls}`}>
          <Icon name={isSuggested ? 'target' : 'users'} size={18} />
        </span>

        <div className="min-w-0 flex-1">
          {isSuggested && (
            <p className="mb-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-chip-purple">
              <Icon name="sparkle" size={10} /> White-space — contact found
            </p>
          )}
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-extrabold">{name}</p>
            {node.decisionRole && (
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${badgeCls}`}>
                {node.decisionRole}
              </span>
            )}
          </div>
          <p className="text-[11px] font-semibold text-muted">
            {role} · {node.entity}
          </p>

          {node.email && (
            <a
              href={`mailto:${node.email}`}
              className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-accent hover:underline"
            >
              <Icon name="mail" size={12} /> {node.email}
            </a>
          )}

          {node.source && (
            <p className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-faint">
              <Icon name="shield" size={10} /> {node.source}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="shrink-0 rounded-lg p-1 text-faint transition hover:bg-surface hover:text-text"
          aria-label="Close contact details"
        >
          <Icon name="check" size={14} />
        </button>
      </div>
    </div>
  );
}

/* ---- main component ------------------------------------------------------ */

/**
 * RelationshipIntelligence — Scene A.
 *
 * Before Daisy walks into the room, she sees the full group picture:
 * the network across Avonmore (her 7-year relationship) and Calderwood
 * (Marcus's client, now one group), the relationship health score and
 * sentiment trend, the interaction history across both threads, and
 * the white-space that needs to be covered now the two entities are one.
 */
export function RelationshipIntelligence() {
  // Render health gauge geometry
  const gr = 38;
  const circ = 2 * Math.PI * gr;
  const offset = circ * (1 - groupRelationship.healthScore / 100);

  // Selected contact node (for the contact-detail card)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = groupRelationship.nodes.find((n) => n.id === selectedId) ?? null;

  // Tangible engagement metrics derived from the 12-month interaction log
  const totalInteractions = sentimentData.reduce((sum, d) => sum + d.interactions, 0);
  const avgInteractions = (totalInteractions / sentimentData.length).toFixed(1);
  const sentimentDelta = sentimentData[sentimentData.length - 1].score - sentimentData[0].score;

  return (
    <DesktopChrome
      active="graph"
      title="Relationship intelligence"
      subtitle="The full group picture — before you walk in"
      dealStage={dealStages.relationship}
    >
      <SceneTabs active="relationship" tabs={RELATIONSHIP_TABS} />

      {/* ---- network map · full width ---------------------------------- */}
      <Card className="anim-fadeUp relative p-4">
          <div className="absolute right-3 top-3 z-10">
            <HelpSpot id="relationship.network" />
          </div>
          <div className="mb-1 flex items-center justify-between pr-8">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <Icon name="users" size={14} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-brand">Avonmore Group — contact network</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold text-muted">
              {(['strong', 'medium', 'weak'] as const).map((s) => (
                <span key={s} className="flex items-center gap-1">
                  <span className="inline-block h-px w-4" style={{ background: strengthCfg[s].stroke, borderTop: s === 'weak' ? '1px dashed' : 'none' }} />
                  {strengthCfg[s].label}
                </span>
              ))}
            </div>
          </div>

          <svg viewBox="0 0 760 280" className="mx-auto block w-full max-w-[820px]">
            {/* company-to-company acquisition link */}
            <line
              x1={AX + COMPANY_R} y1={AY}
              x2={CX - COMPANY_R} y2={CY}
              stroke="var(--color-accent)" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round"
            />
            <text x={(AX + CX) / 2} y={AY - 10} textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--color-accent)" opacity={0.85}>
              acquisition
            </text>

            {/* contact link lines */}
            {groupRelationship.nodes.map((n) => {
              const cfg = strengthCfg[n.strength];
              const pos = NODE_POS[n.id];
              const cx = n.entity === 'Avonmore' ? AX : CX;
              const cy = n.entity === 'Avonmore' ? AY : CY;
              if (!pos) return null;
              return (
                <line
                  key={`link-${n.id}`}
                  x1={cx} y1={cy} x2={pos.x} y2={pos.y}
                  stroke={cfg.stroke} strokeWidth={n.strength === 'strong' ? 2.5 : 1.8}
                  strokeDasharray={cfg.dash} strokeLinecap="round"
                />
              );
            })}

            {/* Avonmore company circle */}
            <circle cx={AX} cy={AY} r={COMPANY_R} fill="var(--color-accent)" />
            <text x={AX} y={AY - 3} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--color-on-accent)">AC</text>
            <text x={AX} y={AY + 11} textAnchor="middle" fontSize="7.5" fill="var(--color-on-accent)" opacity={0.85}>Avonmore</text>

            {/* Calderwood company circle */}
            <circle cx={CX} cy={CY} r={COMPANY_R} fill="var(--color-brand)" />
            <text x={CX} y={CY - 3} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--color-ink)">CE</text>
            <text x={CX} y={CY + 11} textAnchor="middle" fontSize="7.5" fill="var(--color-ink)" opacity={0.85}>Calderwood</text>

            {/* RM coverage lines */}
            <line x1={AX} y1={AY + COMPANY_R} x2={270} y2={222}
              stroke="var(--color-accent)" strokeWidth={2} strokeLinecap="round" />
            <line x1={CX} y1={CY + COMPANY_R} x2={510} y2={222}
              stroke="var(--color-brand)" strokeWidth={2} strokeLinecap="round" />

            {/* RM nodes */}
            {[
              { x: 270, y: 240, label: 'DB', name: 'Daisy Bennett', role: 'BCB', fill: 'var(--color-accent)', text: 'var(--color-on-accent)' },
              { x: 510, y: 240, label: 'MR', name: 'Marcus Reed',   role: 'CIB', fill: 'var(--color-brand)',  text: 'var(--color-ink)'      },
            ].map((rm) => (
              <g key={rm.label}>
                <circle cx={rm.x} cy={rm.y} r={20} fill={rm.fill} />
                <text x={rm.x} y={rm.y + 4} textAnchor="middle" fontSize="9" fontWeight="800" fill={rm.text}>{rm.label}</text>
                <text x={rm.x} y={rm.y + 20} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--color-text)">{rm.name}</text>
                <text x={rm.x} y={rm.y + 30} textAnchor="middle" fontSize="7.5" fill="var(--color-muted)">{rm.role}</text>
              </g>
            ))}

            {/* contact nodes */}
            {groupRelationship.nodes.map((n) => {
              const cfg = strengthCfg[n.strength];
              const pos = NODE_POS[n.id];
              if (!pos) return null;
              const isSel = n.id === selectedId;
              return (
                <g
                  key={`node-${n.id}`}
                  className="anim-popIn cursor-pointer"
                  onClick={() => setSelectedId(isSel ? null : n.id)}
                >
                  {/* selection halo */}
                  {isSel && (
                    <circle cx={pos.x} cy={pos.y} r={CONTACT_R + 5} fill="none" stroke="var(--color-accent)" strokeWidth={1.5} opacity={0.7} />
                  )}
                  <circle
                    cx={pos.x} cy={pos.y} r={CONTACT_R}
                    fill={n.suggested ? 'var(--color-chip-purple)' : 'var(--color-surface-2)'}
                    fillOpacity={n.suggested ? 0.12 : 1}
                    stroke={n.suggested ? 'var(--color-chip-purple)' : cfg.stroke}
                    strokeWidth={1.8}
                    strokeDasharray={cfg.dash}
                  />
                  <text x={pos.x} y={pos.y + 1} textAnchor="middle" fontSize="9" fontWeight="700" fill={n.suggested ? 'var(--color-chip-purple)' : 'var(--color-text)'}>
                    {n.suggested ? '+' : initials(n.label)}
                  </text>
                  <text x={pos.x} y={pos.y + 34} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-text)">
                    {n.label}
                  </text>
                  <text x={pos.x} y={pos.y + 44} textAnchor="middle" fontSize="8" fill="var(--color-muted)">
                    {n.role}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* hint + contact-detail card */}
          {selected ? (
            <ContactCard node={selected} onClose={() => setSelectedId(null)} />
          ) : (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-semibold text-faint">
              <Icon name="users" size={11} /> Tap a contact to see their details — purple nodes are white-space with a contact found via Apollo
            </p>
          )}
        </Card>

        {/* ---- relationship health & sentiment · full width ------------- */}
        <Card raised className="anim-fadeUp relative mt-4 p-4" style={{ animationDelay: '80ms' }}>
          <div className="absolute right-3 top-3 z-10">
            <HelpSpot id="relationship.health" />
          </div>
          <div className="mb-3 flex items-center gap-2 pr-7">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
              <Icon name="heart" size={14} />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wide text-brand">Relationship health & sentiment</span>
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            {/* gauge + summary */}
            <div className="flex items-center gap-4 md:w-72 md:shrink-0">
              <div className="relative shrink-0">
                <svg width="90" height="90" className="-rotate-90">
                  <circle cx="45" cy="45" r={gr} fill="none" stroke="var(--color-surface)" strokeWidth="8" />
                  <circle cx="45" cy="45" r={gr} fill="none" stroke="var(--color-accent)"
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={offset} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold leading-none">{groupRelationship.healthScore}</span>
                  <span className="text-[9px] text-muted">/ 100</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted">Group health</p>
                <p className="flex items-center gap-1 text-sm font-extrabold text-accent">
                  <Icon name="trendingUp" size={13} /> {groupRelationship.trend}
                </p>
                <p className="mt-1 space-y-1 text-[11px] leading-relaxed text-muted">
                  {groupRelationship.coverageNote.split('. ').map((line, i) => (
                    <span key={i} className="block">
                      {line.endsWith('.') ? line : `${line}.`}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            {/* sentiment index + tangible interaction volume */}
            <div className="min-w-0 flex-1 border-t border-line pt-3 md:border-l md:border-t-0 md:pl-5 md:pt-0">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-extrabold">Relationship sentiment index · 12 months</p>
                  <p className="text-[10px] leading-snug text-muted">0–100 score, AI-derived from tone &amp; responsiveness across logged interactions</p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-[9px] font-bold text-muted">
                  <span className="flex items-center gap-1"><span className="inline-block h-px w-3 bg-accent" />Sentiment</span>
                  <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-sm bg-brand/40" />Interactions</span>
                </div>
              </div>
              <Sparkline />
              {/* tangible metrics */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-surface-2 px-3 py-2 text-center">
                  <p className="text-lg font-extrabold text-brand">{totalInteractions}</p>
                  <p className="text-[10px] font-semibold text-muted">Interactions logged · 12 mo</p>
                </div>
                <div className="rounded-xl bg-surface-2 px-3 py-2 text-center">
                  <p className="text-lg font-extrabold">{avgInteractions}</p>
                  <p className="text-[10px] font-semibold text-muted">Avg touchpoints / month</p>
                </div>
                <div className="rounded-xl bg-accent/10 px-3 py-2 text-center">
                  <p className="text-lg font-extrabold text-accent">+{sentimentDelta}</p>
                  <p className="text-[10px] font-semibold text-muted">Sentiment vs 12 mo ago</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ---- detail boxes · below --------------------------------------- */}
        <div className="mt-4 grid grid-cols-3 gap-4">

          {/* single-thread risk */}
          <Card className="anim-fadeUp relative border border-chip-pink/40 p-4" style={{ animationDelay: '140ms' }}>
            <div className="absolute right-3 top-3 z-10">
              <HelpSpot id="relationship.risk" accent="ring-chip-pink hover:bg-chip-pink/20" />
            </div>
            <div className="mb-3 flex items-center gap-2 pr-7">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-chip-pink/15 text-chip-pink">
                <Icon name="alert" size={14} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-chip-pink">Single-thread risk</span>
            </div>
            <p className="text-[11px] leading-relaxed text-muted">{groupRelationship.singleThreadRisk}</p>
          </Card>

          {/* white-space */}
          <Card className="anim-fadeUp relative border border-chip-purple/40 p-4" style={{ animationDelay: '190ms' }}>
            <div className="absolute right-3 top-3 z-10">
              <HelpSpot id="relationship.whitespace" accent="ring-chip-purple hover:bg-chip-purple/20" />
            </div>
            <div className="mb-3 flex items-center gap-2 pr-7">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-chip-purple/15 text-chip-purple">
                <Icon name="target" size={14} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-chip-purple">White-space to cover</span>
            </div>
            <p className="text-[11px] leading-relaxed text-muted">{groupRelationship.whiteSpace}</p>
          </Card>

          {/* knowledge visibility */}
          <Card className="anim-fadeUp relative p-4" style={{ animationDelay: '240ms' }}>
            <div className="absolute right-3 top-3 z-10">
              <HelpSpot id="relationship.knowledge" />
            </div>
            <div className="mb-3 flex items-center gap-2 pr-7">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <Icon name="shield" size={14} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-brand">Knowledge visibility</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-xl bg-accent/10 px-3 py-2 text-center">
                <p className="text-lg font-extrabold text-accent">{groupRelationship.knowledgeShared}</p>
                <p className="text-[10px] font-semibold text-muted">Shared with team</p>
              </div>
              <div className="flex-1 rounded-xl bg-surface-2 px-3 py-2 text-center">
                <p className="text-lg font-extrabold text-muted">{groupRelationship.knowledgePersonal}</p>
                <p className="text-[10px] font-semibold text-muted">Personal notes</p>
              </div>
            </div>
          </Card>
        </div>

      {/* ---- interaction history ----------------------------------------- */}
      <Card className="anim-fadeUp relative mt-4 p-4" style={{ animationDelay: '120ms' }}>
        <div className="absolute right-3 top-3 z-10">
          <HelpSpot id="relationship.history" />
        </div>
        <div className="mb-3 flex items-center gap-2 pr-7">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Icon name="clock" size={14} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand">Interaction history · both threads</span>
        </div>
        <div className="mt-3 space-y-2">
          {interactionHistory.map((evt, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl bg-surface-2 px-4 py-2.5"
            >
              {/* channel icon */}
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                <Icon name={channelIcon[evt.channel] ?? 'doc'} size={13} />
              </span>

              {/* date + entity */}
              <div className="w-20 shrink-0">
                <p className="text-xs font-extrabold">{evt.date}</p>
                <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${entityChip[evt.entity]}`}>
                  {evt.entity}
                </span>
              </div>

              {/* summary */}
              <p className="flex-1 text-xs leading-relaxed text-muted">{evt.summary}</p>

              {/* rm + shared indicator */}
              <div className="shrink-0 text-right">
                <p className="text-[10px] font-bold">{evt.rm}</p>
                <span className={`text-[9px] font-semibold ${evt.shared ? 'text-accent' : 'text-faint'}`}>
                  {evt.shared ? '● Shared' : '○ Personal'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DesktopChrome>
  );
}
