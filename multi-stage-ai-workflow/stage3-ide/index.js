// Demo entry point showing the finished feature wired into the (mini) TaskFlow
// codebase — this is the "integrate into a codebase" half of Stage 3.
const { createTaskManager } = require("./taskManager");
const { getOverdueTaskReminders } = require("./getOverdueTaskReminders");

const manager = createTaskManager([
  { id: 1, title: "Submit expense report", dueDate: "2026-07-10", status: "todo" },
  { id: 2, title: "Review PR #42", dueDate: "2026-07-20", status: "todo" },
  { id: 3, title: "Renew SSL certificate", dueDate: "2026-07-01", status: "in-progress" },
]);

const { count, badge } = getOverdueTaskReminders(manager.getTasks(), new Date("2026-07-18"));
console.log(`Overdue badge: ${badge ?? "(hidden)"} (${count} task(s))`);

manager.setStatus(3, "done");
const after = getOverdueTaskReminders(manager.getTasks(), new Date("2026-07-18"));
console.log(`After marking task 3 done -> ${after.badge ?? "(hidden)"} (${after.count} task(s))`);
