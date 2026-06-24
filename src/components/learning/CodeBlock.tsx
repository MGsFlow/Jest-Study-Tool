"use client";

interface CodeBlockProps {
  code: string;
  title?: string;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm">
      {title && (
        <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-400 font-mono">
          {title}
        </div>
      )}
      <div className="px-3 py-1.5 bg-slate-800/80 border-b border-slate-700 flex items-center gap-1.5">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
          예시 코드
        </span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono text-emerald-400">{code}</code>
      </pre>
    </div>
  );
}
