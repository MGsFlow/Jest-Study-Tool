export interface ProjectStep {
  id: number;
  phase: "Red" | "Green" | "Refactor";
  title: string;
  description: string;
  setupCode: string;
  starterCode: string;
  solutionCode: string;
  hint: string;
}

export const projectSteps: ProjectStep[] = [
  {
    id: 1,
    phase: "Red",
    title: "실패하는 테스트 작성 — addTodo",
    description:
      "Todo 앱의 addTodo 함수가 아직 없습니다. **테스트를 먼저** 작성해 실패(Red)를 확인하세요.",
    setupCode: `
// 아직 구현되지 않음 — TDD Red 단계
function addTodo(todos, title) {
  throw new Error("Not implemented");
}
`,
    starterCode: `describe("addTodo", () => {
  it("새 할 일을 추가한다", () => {
    // TODO: addTodo([], "장보기") 결과 검증
    // expect(result).toHaveLength(1);
    // expect(result[0].title).toBe("장보기");
  });
});`,
    solutionCode: `describe("addTodo", () => {
  it("새 할 일을 추가한다", () => {
    var result = addTodo([], "장보기");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("장보기");
    expect(result[0].done).toBe(false);
  });
});`,
    hint: "addTodo([], '장보기')의 결과 배열 길이와 title을 검증하세요. 지금은 실패가 정상입니다!",
  },
  {
    id: 2,
    phase: "Green",
    title: "최소 구현 — addTodo 통과",
    description:
      "테스트를 통과시키는 **최소한의 addTodo** 구현을 setup에 반영하고 테스트를 실행하세요.",
    setupCode: `
function addTodo(todos, title) {
  return todos.concat([{ id: Date.now(), title: title, done: false }]);
}
`,
    starterCode: `describe("addTodo", () => {
  it("새 할 일을 추가한다", () => {
    var result = addTodo([], "장보기");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("장보기");
    expect(result[0].done).toBe(false);
  });

  it("기존 목록에 추가한다", () => {
    var existing = [{ id: 1, title: "운동", done: false }];
    var result = addTodo(existing, "공부");
    expect(result).toHaveLength(2);
  });
});`,
    solutionCode: `describe("addTodo", () => {
  it("새 할 일을 추가한다", () => {
    var result = addTodo([], "장보기");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("장보기");
    expect(result[0].done).toBe(false);
  });

  it("기존 목록에 추가한다", () => {
    var existing = [{ id: 1, title: "운동", done: false }];
    var result = addTodo(existing, "공부");
    expect(result).toHaveLength(2);
    expect(result[1].title).toBe("공부");
  });
});`,
    hint: "모든 테스트가 통과하면 Green! ▶ 실행으로 확인하세요.",
  },
  {
    id: 3,
    phase: "Red",
    title: "toggleTodo 테스트 작성",
    description: "완료 상태를 토글하는 toggleTodo 테스트를 먼저 작성합니다.",
    setupCode: `
function addTodo(todos, title) {
  return todos.concat([{ id: Date.now(), title: title, done: false }]);
}
function toggleTodo(todos, id) {
  throw new Error("Not implemented");
}
`,
    starterCode: `describe("toggleTodo", () => {
  it("할 일 완료 상태를 토글한다", () => {
    var todos = [{ id: 1, title: "운동", done: false }];
    // TODO: toggleTodo(todos, 1) 후 done이 true인지 검증
  });
});`,
    solutionCode: `describe("toggleTodo", () => {
  it("할 일 완료 상태를 토글한다", () => {
    var todos = [{ id: 1, title: "운동", done: false }];
    var result = toggleTodo(todos, 1);
    expect(result[0].done).toBe(true);
  });

  it("다시 토글하면 false", () => {
    var todos = [{ id: 1, title: "운동", done: true }];
    var result = toggleTodo(todos, 1);
    expect(result[0].done).toBe(false);
  });
});`,
    hint: "toggleTodo 호출 후 result[0].done이 true인지 expect하세요.",
  },
  {
    id: 4,
    phase: "Green",
    title: "toggleTodo 구현",
    description: "toggleTodo를 구현해 테스트를 통과시킵니다.",
    setupCode: `
function addTodo(todos, title) {
  return todos.concat([{ id: Date.now(), title: title, done: false }]);
}
function toggleTodo(todos, id) {
  return todos.map(function(todo) {
    if (todo.id === id) {
      return { id: todo.id, title: todo.title, done: !todo.done };
    }
    return todo;
  });
}
`,
    starterCode: `describe("toggleTodo", () => {
  it("할 일 완료 상태를 토글한다", () => {
    var todos = [{ id: 1, title: "운동", done: false }];
    var result = toggleTodo(todos, 1);
    expect(result[0].done).toBe(true);
  });
});`,
    solutionCode: `describe("toggleTodo", () => {
  it("할 일 완료 상태를 토글한다", () => {
    var todos = [{ id: 1, title: "운동", done: false }];
    var result = toggleTodo(todos, 1);
    expect(result[0].done).toBe(true);
  });

  it("다시 토글하면 false", () => {
    var todos = [{ id: 1, title: "운동", done: true }];
    var result = toggleTodo(todos, 1);
    expect(result[0].done).toBe(false);
  });

  it("다른 id는 변경 없음", () => {
    var todos = [
      { id: 1, title: "운동", done: false },
      { id: 2, title: "공부", done: false },
    ];
    var result = toggleTodo(todos, 1);
    expect(result[1].done).toBe(false);
  });
});`,
    hint: "원본 todos는 변경하지 않고 새 배열을 반환하는지도 테스트해보세요.",
  },
  {
    id: 5,
    phase: "Red",
    title: "getActiveCount 테스트",
    description: "미완료 할 일 개수를 세는 함수 테스트를 작성합니다.",
    setupCode: `
function getActiveCount(todos) {
  throw new Error("Not implemented");
}
`,
    starterCode: `describe("getActiveCount", () => {
  it("미완료 할 일 개수", () => {
    var todos = [
      { id: 1, title: "A", done: false },
      { id: 2, title: "B", done: true },
      { id: 3, title: "C", done: false },
    ];
    // TODO: expect(getActiveCount(todos)).toBe(2);
  });
});`,
    solutionCode: `describe("getActiveCount", () => {
  it("미완료 할 일 개수", () => {
    var todos = [
      { id: 1, title: "A", done: false },
      { id: 2, title: "B", done: true },
      { id: 3, title: "C", done: false },
    ];
    expect(getActiveCount(todos)).toBe(2);
  });

  it("빈 배열은 0", () => {
    expect(getActiveCount([])).toBe(0);
  });
});`,
    hint: "done: false인 항목만 세면 됩니다.",
  },
  {
    id: 6,
    phase: "Green",
    title: "getActiveCount 구현 — 프로젝트 완료!",
    description: "마지막 함수를 구현하고 전체 테스트를 통과시키면 TDD 프로젝트 완료입니다.",
    setupCode: `
function addTodo(todos, title) {
  return todos.concat([{ id: Date.now(), title: title, done: false }]);
}
function toggleTodo(todos, id) {
  return todos.map(function(todo) {
    if (todo.id === id) {
      return { id: todo.id, title: todo.title, done: !todo.done };
    }
    return todo;
  });
}
function getActiveCount(todos) {
  return todos.filter(function(t) { return !t.done; }).length;
}
`,
    starterCode: `describe("Todo 앱 통합", () => {
  it("추가 → 토글 → 카운트", () => {
    var todos = addTodo([], "장보기");
    todos = addTodo(todos, "운동");
    expect(getActiveCount(todos)).toBe(2);

    todos = toggleTodo(todos, todos[0].id);
    expect(getActiveCount(todos)).toBe(1);
  });
});`,
    solutionCode: `describe("Todo 앱 통합", () => {
  it("추가 → 토글 → 카운트", () => {
    var todos = addTodo([], "장보기");
    todos = addTodo(todos, "운동");
    expect(getActiveCount(todos)).toBe(2);

    todos = toggleTodo(todos, todos[0].id);
    expect(getActiveCount(todos)).toBe(1);
  });

  it("전체 완료 시 0", () => {
    var todos = addTodo([], "A");
    todos = toggleTodo(todos, todos[0].id);
    expect(getActiveCount(todos)).toBe(0);
  });
});`,
    hint: "통합 테스트로 addTodo + toggleTodo + getActiveCount를 함께 검증하세요!",
  },
];
