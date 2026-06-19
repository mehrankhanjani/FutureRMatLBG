import { DesktopChrome } from './DesktopChrome';
import { Card } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import { client, relationship, crossBank, dealStages, type GraphNode, type CoverageRow } from '../scenario';

const coverageStyle: Record<CoverageRow['status'], string> = {
  Primary: 'bg-accent/15 text-accent',
  Active: 'bg-brand/20 text-brand',
  Light: 'bg-chip-amber/15 text-chip-amber',
};

const strengthCfg: Record<
  GraphNode['strength'],
  { stroke: string; width: number; dash: string; label: string; chip: string }
> = {
  strong: { stroke: 'var(--color-accent)', width: 2.5, dash: '0', label: 'Strong', chip: 'text-accent' },
  medium: { stroke: 'var(--color-brand)', width: 2, dash: '0', label: 'Developing', chip: 'text-brand' },
  weak: { stroke: 'var(--color-faint)', width: 1.5, dash: '5 6', label: 'White-space', chip: 'text-muted' },
};

const CX = 210;
const CY = 175;
const R = 130;
const ANGLES = [-90, -18, 54, 126, 198]; // radial placement around the company

/**
 * Where you win — relationship intelligence. The network map shows exactly who
 * we know and how well, the health score with trend, plus the single-thread
 * risk and white-space that decide whether this deal — and the next — is won.
 */
export function RelationshipGraph() {
  const pos = relationship.nodes.map((n, i) => {
    const a = (ANGLES[i % ANGLES.length] * Math.PI) / 180;
    return { ...n, x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
  });

  // health gauge geometry
  const gr = 46;
  const circ = 2 * Math.PI * gr;
  const offset = circ * (1 - relationship.healthScore / 100);

  return (
    <DesktopChrome
      active="graph"
      title="Where you win"
      subtitle="Who we know, how well — and where the deal is won"
      dealStage={dealStages['where-you-win']}
    >
      <div className="grid grid-cols-5 gap-4">
        {/* network map */}
        <Card className="anim-fadeUp col-span-3 p-4">
          <div className="mb-1 flex items-center gap-2">
            <Icon name="users" size={16} className="text-accent" />
            <h3 className="text-sm font-extrabold">{client.name}</h3>
          </div>
          <p className="mb-1 text-xs text-muted">Contact map · strength of each relationship</p>

          <svg viewBox="0 0 420 360" className="w-full">
            {/* links */}
            {pos.map((n) => {
              const cfg = strengthCfg[n.strength];
              return (
                <line
                  key={`l-${n.id}`}
                  x1={CX}
                  y1={CY}
                  x2={n.x}
                  y2={n.y}
                  style={{ stroke: cfg.stroke }}
                  strokeWidth={cfg.width}
                  strokeDasharray={cfg.dash}
                  strokeLinecap="round"
                />
              );
            })}

            {/* centre company node */}
            <circle cx={CX} cy={CY} r={38} fill="var(--color-brand)" />
            <text
              x={CX}
              y={CY - 3}
              textAnchor="middle"
              fontSize="15"
              fontWeight="800"
              fill="var(--color-ink)"
            >
              {client.initials}
            </text>
            <text x={CX} y={CY + 13} textAnchor="middle" fontSize="8" fill="var(--color-ink)" opacity={0.8}>
              Avonmore
            </text>

            {/* contact nodes */}
            {pos.map((n) => {
              const cfg = strengthCfg[n.strength];
              return (
                <g key={`n-${n.id}`} className="anim-popIn">
                  {n.key && (
                    <circle cx={n.x} cy={n.y} r={30} fill="none" style={{ stroke: cfg.stroke }} strokeWidth={1} opacity={0.4} />
                  )}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={24}
                    fill="var(--color-surface-2)"
                    style={{ stroke: cfg.stroke }}
                    strokeWidth={2}
                    strokeDasharray={n.strength === 'weak' ? '4 4' : '0'}
                  />
                  <text x={n.x} y={n.y + 1} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-text)">
                    {initials(n.label)}
                  </text>
                  <text x={n.x} y={n.y + 42} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-text)">
                    {n.label}
                  </text>
                  <text x={n.x} y={n.y + 54} textAnchor="middle" fontSize="9" fill="var(--color-muted)">
                    {n.role}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* legend */}
          <div className="mt-1 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold">
            {(['strong', 'medium', 'weak'] as const).map((s) => (
              <span key={s} className="flex items-center gap-1.5 text-muted">
                <span
                  className="h-0.5 w-5"
                  style={{
                    background: strengthCfg[s].stroke,
                    opacity: s === 'weak' ? 0.6 : 1,
                  }}
                />
                {strengthCfg[s].label}
              </span>
            ))}
          </div>
        </Card>

        {/* right column */}
        <div className="col-span-2 space-y-4">
          {/* health score */}
          <Card raised className="anim-fadeUp flex items-center gap-4 p-5" style={{ animationDelay: '80ms' }}>
            <div className="relative shrink-0">
              <svg width="120" height="120" className="-rotate-90">
                <circle cx="60" cy="60" r={gr} fill="none" stroke="var(--color-surface)" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r={gr}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold leading-none">{relationship.healthScore}</span>
                <span className="text-[10px] text-muted">/ 100</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Relationship health</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-accent">
                <Icon name="trendingUp" size={15} /> {relationship.trend} this quarter
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Breadth and depth of coverage, trending up as new contacts are added.
              </p>
            </div>
          </Card>

          {/* single-thread risk */}
          <Card className="anim-fadeUp border border-risk/25 p-4" style={{ animationDelay: '140ms' }}>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-risk/15 text-risk">
                <Icon name="alert" size={15} />
              </span>
              <h4 className="text-sm font-extrabold text-risk">Single-thread risk</h4>
            </div>
            <p className="text-xs leading-relaxed text-muted">{relationship.singleThreadRisk}</p>
          </Card>

          {/* white-space */}
          <Card className="anim-fadeUp border border-info/25 p-4" style={{ animationDelay: '200ms' }}>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-info/15 text-info">
                <Icon name="target" size={15} />
              </span>
              <h4 className="text-sm font-extrabold text-info">White-space to win next</h4>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-muted">{relationship.whiteSpace}</p>
            <button className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-on-accent transition active:scale-[0.98]">
              Plan introductions <Icon name="arrowRight" size={13} />
            </button>
          </Card>
        </div>
      </div>

      {/* single view across the bank */}
      <Card className="anim-fadeUp mt-4 p-4" style={{ animationDelay: '260ms' }}>
        <div className="mb-1 flex items-center gap-2">
          <Icon name="building" size={16} className="text-accent" />
          <h3 className="text-sm font-extrabold">Single view across the bank</h3>
        </div>
        <p className="mb-3 text-xs text-muted">{crossBank.note}</p>

        <div className="space-y-2">
          {crossBank.rows.map((r) => (
            <div
              key={r.team}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl bg-surface-2 px-4 py-3"
            >
              <div className="w-44 shrink-0">
                <p className="text-xs font-bold uppercase tracking-wide text-faint">{r.team}</p>
                <p className="text-sm font-extrabold">{r.contact}</p>
                <p className="text-[11px] text-muted">{r.role}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${coverageStyle[r.status]}`}
              >
                {r.status}
              </span>
              <p className="min-w-0 flex-1 text-xs text-muted">{r.traction}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-2xl border border-info/25 bg-info/5 px-4 py-3">
          <Icon name="target" size={15} className="mt-0.5 shrink-0 text-info" />
          <p className="text-xs leading-relaxed text-muted">{crossBank.recommend}</p>
        </div>
      </Card>
    </DesktopChrome>
  );
}

function initials(name: string) {
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
