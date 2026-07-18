// Tests for Overdue Task Reminders, implemented in Stage 3 (IDE AI) from the
// Stage 2 (CLI) test stub — one case per acceptance criterion.
const assert = require("assert");
const { getOverdueTaskReminders } = require("./getOverdueTaskReminders");

const NOW = new Date("2026-07-18T00:00:00Z");

function test(name, fn) {
  try {
    fn();
    console.log(`  ok - ${name}`);
  } catch (err) {
    console.error(`  FAIL - ${name}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

console.log("getOverdueTaskReminders");

// Criterion 1: overdue = due date in the past AND status !== 'done'
test("counts a past-due, not-done task as overdue", () => {
  const tasks = [{ id: 1, dueDate: "2026-07-01", status: "in-progress" }];
  const result = getOverdueTaskReminders(tasks, NOW);
  assert.strictEqual(result.count, 1);
});

test("does not count a past-due task that is already done", () => {
  const tasks = [{ id: 1, dueDate: "2026-07-01", status: "done" }];
  const result = getOverdueTaskReminders(tasks, NOW);
  assert.strictEqual(result.count, 0);
});

// Criterion 2: badge shows the count
test("badge text includes the overdue count", () => {
  const tasks = [
    { id: 1, dueDate: "2026-07-01", status: "todo" },
    { id: 2, dueDate: "2026-07-10", status: "todo" },
  ];
  const result = getOverdueTaskReminders(tasks, NOW);
  assert.strictEqual(result.count, 2);
  assert.strictEqual(result.badge, "2 overdue");
});

// Criterion 3: badge hidden when nothing is overdue
test("badge is null when there are no overdue tasks", () => {
  const tasks = [{ id: 1, dueDate: "2026-08-01", status: "todo" }];
  const result = getOverdueTaskReminders(tasks, NOW);
  assert.strictEqual(result.count, 0);
  assert.strictEqual(result.badge, null);
});

// Criterion 4: count reacts to status/due-date changes
test("count updates after a task's status changes to done", () => {
  const tasks = [{ id: 1, dueDate: "2026-07-01", status: "todo" }];
  const before = getOverdueTaskReminders(tasks, NOW);
  assert.strictEqual(before.count, 1);

  tasks[0].status = "done";
  const after = getOverdueTaskReminders(tasks, NOW);
  assert.strictEqual(after.count, 0);
});

if (process.exitCode) {
  console.log("\nSome tests FAILED.");
} else {
  console.log("\nAll tests passed.");
}
