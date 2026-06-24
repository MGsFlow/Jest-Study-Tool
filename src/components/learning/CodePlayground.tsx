"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";
import type { PlaygroundConfig, PlaygroundLog, PlaygroundResult } from "@/lib/learning/types";
import { runPlaygroundTests } from "@/lib/learning/testRunner";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-48 flex items-center justify-center bg-slate-50 text-slate-400 text-sm">
      에디터 로딩 중...
    </div>
  ),
});

import { ErrorInterpreterPanel } from "./ErrorInterpreterPanel";

interface CodePlaygroundProps {
  config: PlaygroundConfig;
  sectionTitle: string;
  onAllTestsPass?: () => void;
}

function ResultPanel({
  logs,
  passed,
  failed,
  total,
  error,
}: {
  logs: PlaygroundLog[];
  passed: number;
  failed: number;
  total: number;
  error?: string;
}) {
  const failMessages = [
    ...(error ? [error] : []),
    ...logs.filter((l) => l.type === "fail" && l.message).map((l) => l.message!),
  ];
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-red-700 font-medium text-sm mb-1">❌ 실행 오류</p>
        <pre className="text-xs text-red-600 whitespace-pre-wrap font-mono">{error}</pre>
      </div>
    );
  }

  if (total === 0 && logs.length === 0) {
    return (
      <p className="text-sm text-slate-500 italic">
        ▶ 실행 버튼을 누르거나 <kbd className="px-1 py-0.5 rounded bg-slate-100 border text-xs">⌘/Ctrl + Enter</kbd>로 테스트를 실행하세요.
      </p>
    );
  }

  const allPass = failed === 0 && total > 0;

  return (
    <div className="space-y-3">
      <div
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
          allPass
            ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
            : "bg-red-50 border border-red-200 text-red-800"
        }`}
      >
        <span>{allPass ? "✅" : "❌"}</span>
        <span>
          {passed} passed, {failed} failed · {total} total
        </span>
      </div>

      <div className="font-mono text-xs space-y-0.5 max-h-48 overflow-y-auto">
        {logs.map((log, i) => (
          <div
            key={i}
            className={`flex gap-2 py-0.5 ${
              log.type === "pass"
                ? "text-emerald-700"
                : log.type === "fail"
                  ? "text-red-600"
                  : log.type === "group"
                    ? "text-slate-700 font-semibold"
                    : "text-slate-500"
            }`}
            style={{ paddingLeft: `${log.indent * 16}px` }}
          >
            <span className="shrink-0 w-4">
              {log.type === "pass" ? "✓" : log.type === "fail" ? "✗" : "›"}
            </span>
            <span>
              {log.name}
              {log.message && (
                <span className="block text-red-500 font-normal mt-0.5">
                  {log.message}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
      {failed > 0 && <ErrorInterpreterPanel messages={failMessages} />}
    </div>
  );
}

export function CodePlayground({
  config,
  sectionTitle,
  onAllTestsPass,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(config.starterCode);
  const [result, setResult] = useState<PlaygroundResult | null>(null);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setResult(null);
    try {
      const res = await runPlaygroundTests(config.setupCode ?? "", code);
      setResult(res);
      if (res.failed === 0 && res.total > 0) {
        onAllTestsPass?.();
      }
    } catch (e) {
      setResult({
        passed: 0,
        failed: 0,
        total: 0,
        logs: [],
        error: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setRunning(false);
    }
  }, [code, config.setupCode, onAllTestsPass]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleRun]);

  const handleReset = () => {
    setCode(config.starterCode);
    setResult(null);
    setShowSolution(false);
  };

  const handleShowSolution = () => {
    if (config.solutionCode) {
      setCode(config.solutionCode);
      setShowSolution(true);
      setResult(null);
    }
  };

  return (
    <div className="my-5 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-base">⌨️</span>
          <span className="text-sm font-medium text-slate-700">
            실습 에디터 — {sectionTitle}
          </span>
        </div>
        <div className="flex gap-2">
          {config.solutionCode && (
            <button
              onClick={handleShowSolution}
              className="px-3 py-1.5 text-xs rounded-lg border border-violet-300 text-violet-700 hover:bg-violet-50 transition-colors"
            >
              {showSolution ? "정답 표시 중" : "💡 정답 보기"}
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={handleRun}
            disabled={running}
            className="px-4 py-1.5 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors disabled:opacity-50"
          >
            {running ? "실행 중..." : "▶ 실행"}
          </button>
        </div>
      </div>

      {config.helpers && config.helpers.length > 0 && (
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-blue-700 font-medium shrink-0">
            사용 가능한 함수:
          </span>
          {config.helpers.map((fn) => (
            <code
              key={fn}
              className="text-xs px-1.5 py-0.5 rounded bg-white border border-blue-200 text-blue-800 font-mono"
            >
              {fn}()
            </code>
          ))}
        </div>
      )}

      {config.hint && (
        <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 text-xs text-amber-800">
          💡 {config.hint}
        </div>
      )}

      <MonacoEditor
        height="240px"
        language="javascript"
        theme="vs"
        value={code}
        onChange={(v) => {
          setCode(v ?? "");
          setShowSolution(false);
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          padding: { top: 12, bottom: 12 },
          tabSize: 2,
          wordWrap: "on",
          automaticLayout: true,
        }}
      />

      <div className="px-4 py-3 bg-white border-t border-slate-200">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          테스트 결과
        </p>
        {result ? (
          <ResultPanel
            logs={result.logs}
            passed={result.passed}
            failed={result.failed}
            total={result.total}
            error={result.error}
          />
        ) : (
          <ResultPanel logs={[]} passed={0} failed={0} total={0} />
        )}
      </div>
    </div>
  );
}
