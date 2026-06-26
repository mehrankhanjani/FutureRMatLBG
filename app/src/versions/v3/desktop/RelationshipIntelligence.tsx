import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card, SectionLabel } from '../../../ui/primitives';
import { Icon, type IconName } from '../../../ui/icons';
import { HelpSpot } from '../help/Help';
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
  strong: { stroke: 'var(--color-accent)',  dash: '0',   label: 'Strong',      chipCls: 'text-accent'  },
  medium: { stroke: 'var(--color-brand)',   dash: '0',   label: 'Developing',  chipCls: 'text-brand'   },
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

const AX = 155; const AY = 145;   // Avonmore company node
const CX = 355; const CY = 145;   // Calderwood company node
const COMPANY_R = 34;

// Fixed positions for each contact node (keyed by id)
const NODE_POS: Record<string, { x: number; y: number }> = {
  'aw-cfo':   { x: 60,  y: 65  },
  'aw-ceo':   { x: 45,  y: 175 },
  'aw-fd':    { x: 155, y: 40  },
  'aw-de':    { x: 245, y: 42  },
  'ce-ceo':   { x: 450, y: 65  },
  'ce-cfo':   { x: 460, y: 178 },
  'ce-treas': { x: 355, y: 40  },
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

const SPARK_W = 170;
const SPARK_H = 44;

function Sparkline() {
  const max = 100;
  const pts = sentimentData.map((d, i) => ({
    x: (i / (sentimentData.length - 1)) * SPARK_W,
    y: SPARK_H - (d.score / max) * SPARK_H,
    ...d,
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${SPARK_W} ${SPARK_H} L 0 ${SPARK_H} Z`;

  return (
    <svg viewBox={`-6 -4 ${SPARK_W + 12} ${SPARK_H + 20}`} className="w-full">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-fill)" />
      <path d={linePath} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p) => (
        <circle key={p.month} cx={p.x} cy={p.y} r={3} fill="var(--color-accent)" />
      ))}
      {/* month labels */}
      {pts.map((p) => (
        <text key={`l-${p.month}`} x={p.x} y={SPARK_H + 10} textAnchor="middle" fontSize="7" fill="var(--color-faint)">
          {p.month}
        </text>
      ))}
    </svg>
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

  return (
    <DesktopChrome
      active="graph"
      title="Relationship intelligence"
      subtitle="The full group picture — before you walk in"
      dealStage={dealStages.relationship}
    >
      <div className="grid grid-cols-5 gap-4">

        {/* ---- left: network map ----------------------------------------- */}
        <Card className="anim-fadeUp col-span-3 p-4">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="users" size={15} className="text-accent" />
              <span className="text-sm font-extrabold">Avonmore Group — contact network</span>
              <HelpSpot id="relationship.network" />
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

          <svg viewBox="0 0 510 314" className="w-full">
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
            <line x1={AX} y1={AY + COMPANY_R} x2={100} y2={268}
              stroke="var(--color-accent)" strokeWidth={2} strokeLinecap="round" />
            <line x1={CX} y1={CY + COMPANY_R} x2={410} y2={268}
              stroke="var(--color-brand)" strokeWidth={2} strokeLinecap="round" />

            {/* RM nodes */}
            {[
              { x: 100, y: 270, label: 'DB', name: 'Daisy Bennett', role: 'BCB', fill: 'var(--color-accent)', text: 'var(--color-on-accent)' },
              { x: 410, y: 270, label: 'MR', name: 'Marcus Reed',   role: 'CIB', fill: 'var(--color-brand)',  text: 'var(--color-ink)'      },
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
              return (
                <g key={`node-${n.id}`} className="anim-popIn">
                  <circle
                    cx={pos.x} cy={pos.y} r={CONTACT_R}
                    fill="var(--color-surface-2)"
                    stroke={cfg.stroke} strokeWidth={1.8}
                    strokeDasharray={cfg.dash}
                  />
                  <text x={pos.x} y={pos.y + 1} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-text)">
                    {initials(n.label)}
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
        </Card>

        {/* ---- right column ---------------------------------------------- */}
        <div className="col-span-2 flex flex-col gap-3">

          {/* health score + sentiment trend */}
          <Card raised className="anim-fadeUp p-4" style={{ animationDelay: '80ms' }}>
            <div className="flex items-center gap-4">
              {/* gauge */}
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
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-muted">Group health <HelpSpot id="relationship.health" /></p>
                <p className="flex items-center gap-1 text-sm font-extrabold text-accent">
                  <Icon name="trendingUp" size={13} /> {groupRelationship.trend}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{groupRelationship.coverageNote}</p>
              </div>
            </div>
            {/* sentiment sparkline */}
            <div className="mt-3 border-t border-line pt-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-muted">Relationship sentiment · 6 months</p>
              <Sparkline />
            </div>
          </Card>

          {/* single-thread risk */}
          <Card className="anim-fadeUp border border-risk/25 p-4" style={{ animationDelay: '140ms' }}>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-risk/15 text-risk">
                <Icon name="alert" size={14} />
              </span>
              <h4 className="text-sm font-extrabold text-risk">Single-thread risk</h4>
              <HelpSpot id="relationship.risk" />
            </div>
            <p className="text-[11px] leading-relaxed text-muted">{groupRelationship.singleThreadRisk}</p>
          </Card>

          {/* white-space */}
          <Card className="anim-fadeUp border border-info/25 p-4" style={{ animationDelay: '190ms' }}>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-info/15 text-info">
                <Icon name="target" size={14} />
              </span>
              <h4 className="text-sm font-extrabold text-info">White-space to cover</h4>
              <HelpSpot id="relationship.whitespace" />
            </div>
            <p className="text-[11px] leading-relaxed text-muted">{groupRelationship.whiteSpace}</p>
          </Card>

          {/* knowledge visibility */}
          <Card className="anim-fadeUp p-4" style={{ animationDelay: '240ms' }}>
            <div className="mb-2 flex items-center gap-2">
              <Icon name="shield" size={14} className="text-accent" />
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted">Knowledge visibility</p>
              <HelpSpot id="relationship.knowledge" />
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
      </div>

      {/* ---- interaction history ----------------------------------------- */}
      <Card className="anim-fadeUp mt-4 p-4" style={{ animationDelay: '120ms' }}>
        <div className="flex items-center gap-1.5">
          <SectionLabel>Interaction history · both threads</SectionLabel>
          <HelpSpot id="relationship.history" />
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
