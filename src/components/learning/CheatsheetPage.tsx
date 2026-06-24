"use client";

import { useState } from "react";
import { cheatSheet } from "@/lib/learning/resources";

const categories = [...new Set(cheatSheet.map((item) => item.category))];

export function CheatsheetPage() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [search, setSearch] = useState("");

  const filtered = cheatSheet.filter((item) => {
    const matchCat =
      activeCategory === "전체" || item.category === activeCategory;
    const matchSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">📋 치트시트</h1>
      <p className="text-slate-500 mb-8">
        Jest 핵심 문법을 빠르게 찾아볼 수 있는 참고 자료입니다.
      </p>

      <input
        type="text"
        placeholder="검색... (toBe, mock, async)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {["전체", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
          >
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-medium text-slate-800">{item.title}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {item.category}
              </span>
            </div>
            {item.description && (
              <p className="px-4 pt-3 text-xs text-amber-700">{item.description}</p>
            )}
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="font-mono text-slate-800 leading-relaxed">
                {item.code}
              </code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
