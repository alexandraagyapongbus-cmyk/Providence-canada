import { InView } from '@/components/in-view';

export function ConnectionGraphic({
  ariaLabel = 'Providence connects care organizations with healthcare workers through recruiting, matching, and coordination',
  leftLabel = 'Care organizations',
  leftSub = 'Roles · settings · schedules',
  rightLabel = 'Healthcare workers',
  rightSub = 'Qualifications · availability',
  caption = 'Recruiting, matching, and staffing coordination — organized around real needs on both sides.',
}: {
  ariaLabel?: string;
  leftLabel?: string;
  leftSub?: string;
  rightLabel?: string;
  rightSub?: string;
  caption?: string;
}) {
  return (
    <InView className="connection-graphic">
      <div className="connection-graphic-inner">
        <svg viewBox="0 0 1000 160" aria-hidden="true">
          <defs>
            <linearGradient id="cg-line-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1284ff" />
              <stop offset="50%" stopColor="#e5b84b" />
              <stop offset="100%" stopColor="#1284ff" />
            </linearGradient>
          </defs>

          <path className="cg-line" d="M170,90 C 320,40 380,40 460,90" />
          <path className="cg-line" d="M540,90 C 620,40 680,40 830,90" />

          <circle className="cg-node-ring" cx="150" cy="90" r="34" />
          <circle className="cg-node-dot cg-blue" cx="150" cy="90" r="5" />

          <rect className="cg-hub" x="450" y="62" width="100" height="56" rx="2" />

          <circle className="cg-node-ring" cx="850" cy="90" r="34" />
          <circle className="cg-node-dot" cx="850" cy="90" r="5" />
        </svg>
        <div className="connection-graphic-labels" role="img" aria-label={ariaLabel}>
          <div><strong>{leftLabel}</strong><span>{leftSub}</span></div>
          <div className="connection-graphic-hub-label"><strong>Providence</strong></div>
          <div><strong>{rightLabel}</strong><span>{rightSub}</span></div>
        </div>
        <p className="connection-graphic-caption">{caption}</p>
      </div>
    </InView>
  );
}
