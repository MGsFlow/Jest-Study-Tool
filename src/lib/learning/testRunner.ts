/**
 * 브라우저 내 미니 Jest 러너 — 학습용 실습 전용
 */

import type { PlaygroundLog, PlaygroundResult } from "./types";

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (typeof a !== "object") return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const keysA = Object.keys(aObj);
  const keysB = Object.keys(bObj);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => deepEqual(aObj[k], bObj[k]));
}

function isPromise(value: unknown): value is Promise<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof (value as Promise<unknown>).then === "function"
  );
}

function createExpect(actual: unknown) {
  if (isPromise(actual)) {
    const promise = actual;
    return {
      resolves: {
        toBe(expected: unknown) {
          return promise.then((value) => {
            if (value !== expected) {
              throw new Error(
                `Expected ${JSON.stringify(expected)}, received ${JSON.stringify(value)}`
              );
            }
          });
        },
        toEqual(expected: unknown) {
          return promise.then((value) => {
            if (!deepEqual(value, expected)) {
              throw new Error(
                `Expected ${JSON.stringify(expected)}, received ${JSON.stringify(value)}`
              );
            }
          });
        },
      },
      rejects: {
        toThrow(expected?: string | RegExp) {
          return promise.then(
            () => {
              throw new Error("Expected promise to reject");
            },
            (err: unknown) => {
              const message = err instanceof Error ? err.message : String(err);
              if (expected === undefined) return;
              if (typeof expected === "string" && !message.includes(expected)) {
                throw new Error(
                  `Expected error to contain "${expected}", got "${message}"`
                );
              }
              if (expected instanceof RegExp && !expected.test(message)) {
                throw new Error(
                  `Expected error to match ${expected}, got "${message}"`
                );
              }
            }
          );
        },
      },
    };
  }

  const matchers = {
    toBe(expected: unknown) {
      if (actual !== expected) {
        throw new Error(
          `Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`
        );
      }
    },
    toEqual(expected: unknown) {
      if (!deepEqual(actual, expected)) {
        throw new Error(
          `Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`
        );
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(`Expected truthy, received ${JSON.stringify(actual)}`);
      }
    },
    toBeFalsy() {
      if (actual) {
        throw new Error(`Expected falsy, received ${JSON.stringify(actual)}`);
      }
    },
    toBeGreaterThan(expected: number) {
      if (typeof actual !== "number" || actual <= expected) {
        throw new Error(`Expected ${actual} to be greater than ${expected}`);
      }
    },
    toBeLessThan(expected: number) {
      if (typeof actual !== "number" || actual >= expected) {
        throw new Error(`Expected ${actual} to be less than ${expected}`);
      }
    },
    toBeCloseTo(expected: number, precision = 2) {
      if (typeof actual !== "number") throw new Error("Expected a number");
      const pass = Math.abs(actual - expected) < Math.pow(10, -precision) / 2;
      if (!pass) throw new Error(`Expected ${actual} to be close to ${expected}`);
    },
    toContain(expected: unknown) {
      if (typeof actual === "string" && typeof expected === "string") {
        if (!actual.includes(expected)) {
          throw new Error(`Expected "${actual}" to contain "${expected}"`);
        }
        return;
      }
      if (Array.isArray(actual)) {
        if (!actual.includes(expected)) {
          throw new Error(
            `Expected array to contain ${JSON.stringify(expected)}`
          );
        }
        return;
      }
      throw new Error("toContain: expected string or array");
    },
    toMatch(pattern: RegExp | string) {
      if (typeof actual !== "string") throw new Error("toMatch: expected string");
      const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern;
      if (!regex.test(actual)) {
        throw new Error(`Expected "${actual}" to match ${regex}`);
      }
    },
    toHaveLength(expected: number) {
      if (!actual || typeof actual !== "object" || !("length" in actual)) {
        throw new Error("toHaveLength: expected array or string");
      }
      const len = (actual as { length: number }).length;
      if (len !== expected) {
        throw new Error(`Expected length ${expected}, received ${len}`);
      }
    },
    toHaveProperty(key: string, value?: unknown) {
      if (typeof actual !== "object" || actual === null) {
        throw new Error("toHaveProperty: expected object");
      }
      if (!(key in actual)) {
        throw new Error(`Expected object to have property "${key}"`);
      }
      if (
        value !== undefined &&
        (actual as Record<string, unknown>)[key] !== value
      ) {
        throw new Error(
          `Expected property "${key}" to be ${JSON.stringify(value)}`
        );
      }
    },
    toThrow(expected?: string | RegExp) {
      if (typeof actual !== "function") throw new Error("toThrow: expected function");
      let threw = false;
      let errorMessage = "";
      try {
        (actual as () => void)();
      } catch (e) {
        threw = true;
        errorMessage = e instanceof Error ? e.message : String(e);
      }
      if (!threw) throw new Error("Expected function to throw");
      if (expected !== undefined) {
        if (typeof expected === "string" && !errorMessage.includes(expected)) {
          throw new Error(
            `Expected error message to contain "${expected}", got "${errorMessage}"`
          );
        }
        if (expected instanceof RegExp && !expected.test(errorMessage)) {
          throw new Error(
            `Expected error to match ${expected}, got "${errorMessage}"`
          );
        }
      }
    },
    toHaveBeenCalled() {
      assertMock(actual);
      if ((actual as MockFn).mock.calls.length === 0) {
        throw new Error("Expected mock to have been called");
      }
    },
    toHaveBeenCalledWith(...args: unknown[]) {
      assertMock(actual);
      const mock = actual as MockFn;
      const found = mock.mock.calls.some(
        (call) =>
          call.length === args.length && call.every((v, i) => v === args[i])
      );
      if (!found) {
        throw new Error(
          `Expected mock to have been called with ${JSON.stringify(args)}`
        );
      }
    },
    toHaveBeenCalledTimes(n: number) {
      assertMock(actual);
      const count = (actual as MockFn).mock.calls.length;
      if (count !== n) {
        throw new Error(`Expected ${n} calls, received ${count}`);
      }
    },
    not: {} as Record<string, (...args: unknown[]) => void | Promise<void>>,
  };

  for (const key of Object.keys(matchers)) {
    if (key === "not") continue;
    const fn = matchers[key as keyof typeof matchers] as (
      ...args: unknown[]
    ) => void;
    (matchers.not as Record<string, (...args: unknown[]) => void>)[key] = (
      ...args: unknown[]
    ) => {
      try {
        fn(...args);
        throw new Error(`Expected value NOT to ${key}`);
      } catch (e) {
        if (e instanceof Error && e.message.startsWith("Expected value NOT")) {
          throw e;
        }
      }
    };
  }

  return matchers;
}

function assertMock(actual: unknown): asserts actual is MockFn {
  if (!actual || typeof actual !== "function" || !("_isMock" in actual)) {
    throw new Error("Expected a mock function");
  }
}

interface MockQueueItem {
  type: "return" | "resolve" | "reject";
  value: unknown;
}

interface MockFn {
  (...args: unknown[]): unknown;
  _isMock: true;
  _returnValue?: unknown;
  _resolvedValue?: unknown;
  _queue: MockQueueItem[];
  mock: { calls: unknown[][]; results: unknown[] };
  mockReturnValue: (v: unknown) => MockFn;
  mockReturnValueOnce: (v: unknown) => MockFn;
  mockResolvedValue: (v: unknown) => MockFn;
  mockResolvedValueOnce: (v: unknown) => MockFn;
  mockRejectedValueOnce: (v: unknown) => MockFn;
  mockImplementation: (fn: (...args: unknown[]) => unknown) => MockFn;
}

function createMockFn(impl?: (...args: unknown[]) => unknown): MockFn {
  let implementation = impl;

  const mock: MockFn = Object.assign(
    (...args: unknown[]) => {
      mock.mock.calls.push(args);

      if (mock._queue.length > 0) {
        const next = mock._queue.shift()!;
        if (next.type === "return") return next.value;
        if (next.type === "resolve") return Promise.resolve(next.value);
        if (next.type === "reject") return Promise.reject(next.value);
      }

      if (mock._returnValue !== undefined) return mock._returnValue;
      if (mock._resolvedValue !== undefined) {
        return Promise.resolve(mock._resolvedValue);
      }
      if (implementation) return implementation(...args);
      return undefined;
    },
    {
      _isMock: true as const,
      mock: { calls: [] as unknown[][], results: [] as unknown[] },
      _returnValue: undefined as unknown,
      _resolvedValue: undefined as unknown,
      _queue: [] as MockQueueItem[],
      mockReturnValue(v: unknown) {
        mock._returnValue = v;
        return mock;
      },
      mockReturnValueOnce(v: unknown) {
        mock._queue.push({ type: "return", value: v });
        return mock;
      },
      mockResolvedValue(v: unknown) {
        mock._resolvedValue = v;
        return mock;
      },
      mockResolvedValueOnce(v: unknown) {
        mock._queue.push({ type: "resolve", value: v });
        return mock;
      },
      mockRejectedValueOnce(v: unknown) {
        mock._queue.push({ type: "reject", value: v });
        return mock;
      },
      mockImplementation(fn: (...args: unknown[]) => unknown) {
        implementation = fn;
        return mock;
      },
    }
  );

  return mock;
}

const spies: { obj: object; key: string; original: unknown }[] = [];

export async function runPlaygroundTests(
  setupCode: string,
  userCode: string
): Promise<PlaygroundResult> {
  const logs: PlaygroundLog[] = [];
  let passed = 0;
  let failed = 0;
  let total = 0;

  const testQueue: { name: string; group: string; fn: () => unknown }[] = [];

  const expect = (actual: unknown) => createExpect(actual);

  const jestApi = {
    fn: (impl?: (...args: unknown[]) => unknown) => createMockFn(impl),
    clearAllMocks: () => {},
    spyOn(obj: object, method: string) {
      const original = (obj as Record<string, unknown>)[method];
      if (typeof original !== "function") {
        throw new Error(`jest.spyOn: ${method} is not a function`);
      }
      const spy = createMockFn((...args: unknown[]) =>
        (original as (...args: unknown[]) => unknown).apply(obj, args)
      );
      (obj as Record<string, unknown>)[method] = spy;
      spies.push({ obj, key: method, original });
      return spy;
    },
    restoreAllMocks: () => {
      for (const s of spies) {
        (s.obj as Record<string, unknown>)[s.key] = s.original;
      }
      spies.length = 0;
    },
  };

  const hooks = {
    beforeEachFns: [] as (() => void)[],
    afterEachFns: [] as (() => void)[],
  };

  function beforeEach(fn: () => void) {
    hooks.beforeEachFns.push(fn);
  }
  function afterEach(fn: () => void) {
    hooks.afterEachFns.push(fn);
  }
  function beforeAll(_fn: () => void) {}
  function afterAll(_fn: () => void) {}

  let currentGroup = "";

  function describe(name: string, fn: () => void) {
    const savedBefore = [...hooks.beforeEachFns];
    const savedAfter = [...hooks.afterEachFns];
    const prevGroup = currentGroup;
    currentGroup = name;

    logs.push({ type: "group", name, indent: 0 });

    try {
      fn();
    } catch (e) {
      logs.push({
        type: "fail",
        name: `describe "${name}"`,
        message: e instanceof Error ? e.message : String(e),
        indent: 0,
      });
    }

    currentGroup = prevGroup;
    hooks.beforeEachFns = savedBefore;
    hooks.afterEachFns = savedAfter;
  }

  function it(name: string, fn: () => unknown) {
    testQueue.push({ name, group: currentGroup, fn });
  }

  const test = it;

  try {
    // setup + user 코드를 같은 스코프에서 실행 → 예시 함수 공유
    const combinedCode = [setupCode.trim(), userCode.trim()]
      .filter(Boolean)
      .join("\n\n");

    const runCode = new Function(
      "describe",
      "it",
      "test",
      "expect",
      "jest",
      "beforeEach",
      "afterEach",
      "beforeAll",
      "afterAll",
      "globalThis",
      combinedCode
    );

    runCode(
      describe,
      it,
      test,
      expect,
      jestApi,
      beforeEach,
      afterEach,
      beforeAll,
      afterAll,
      globalThis
    );

    // 등록된 테스트 실행 (async 지원)
    for (const tc of testQueue) {
      total++;
      try {
        hooks.beforeEachFns.forEach((h) => h());
        const result = tc.fn();
        if (isPromise(result)) {
          await result;
        }
        hooks.afterEachFns.forEach((h) => h());
        passed++;
        logs.push({ type: "pass", name: tc.name, indent: 1 });
      } catch (e) {
        failed++;
        logs.push({
          type: "fail",
          name: tc.name,
          message: e instanceof Error ? e.message : String(e),
          indent: 1,
        });
      }
    }
  } catch (e) {
    return {
      passed,
      failed,
      total,
      logs,
      error: e instanceof Error ? e.message : String(e),
    };
  } finally {
    jestApi.restoreAllMocks();
  }

  return { passed, failed, total, logs };
}

/** setup 코드에서 사용 가능한 함수 이름 추출 */
export function extractHelperNames(setupCode: string): string[] {
  const names: string[] = [];
  const patterns = [
    /function\s+(\w+)\s*\(/g,
    /const\s+(\w+)\s*=\s*(?:async\s*)?\(/g,
    /const\s+(\w+)\s*=\s*function/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(setupCode)) !== null) {
      if (!names.includes(match[1])) names.push(match[1]);
    }
  }
  return names;
}
