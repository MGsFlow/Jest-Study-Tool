interface TipBoxProps {
  children: React.ReactNode;
}

export function TipBox({ children }: TipBoxProps) {
  return (
    <div className="my-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <span className="text-xl shrink-0">💡</span>
      <p className="text-sm text-amber-900 leading-relaxed">{children}</p>
    </div>
  );
}

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
}

export function InfoBox({ title, children }: InfoBoxProps) {
  return (
    <div className="my-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <h4 className="font-semibold text-blue-800 mb-2">{title}</h4>
      <div className="text-sm text-blue-900/80 leading-relaxed whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}

interface RealWorldBoxProps {
  examples: string[];
}

export function RealWorldBox({ examples }: RealWorldBoxProps) {
  return (
    <div className="my-6 rounded-xl border border-violet-200 bg-violet-50 p-5">
      <h3 className="font-semibold text-violet-800 mb-3 flex items-center gap-2">
        <span>🏢</span> 실무 예시
      </h3>
      <ul className="space-y-2">
        {examples.map((ex, i) => (
          <li key={i} className="flex gap-2 text-sm text-violet-900/80">
            <span className="text-violet-500 shrink-0">→</span>
            {ex}
          </li>
        ))}
      </ul>
    </div>
  );
}
