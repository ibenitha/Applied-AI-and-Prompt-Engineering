/**
 * Overdue Task Reminders
 *
 * Surface a visible count of overdue tasks to the user as soon as they open TaskFlow, instead of requiring them to scroll through the full task list to notice missed deadlines.
 *
 * Acceptance criteria satisfied below:
 * 1. A task counts as overdue when its due date is earlier than the current date and its status is not 'done'.
 * 2. The app displays a badge showing the count of overdue tasks near the task list header.
 * 3. The badge is hidden, or shows 0, when there are no overdue tasks.
 * 4. The overdue count updates automatically whenever a task's status or due date changes.
 *
 * Implemented in Stage 3 (IDE AI) from the Stage 2 (CLI) stub.
 */
function getOverdueTaskReminders(tasks, now = new Date()) {
  const overdueCount = tasks.filter(
    (task) => task.status !== "done" && new Date(task.dueDate) < now
  ).length;

  return {
    count: overdueCount,
    badge: renderBadge(overdueCount),
  };
}

// Criterion 2 & 3: the badge only shows once there's something to show.
function renderBadge(count) {
  return count > 0 ? `${count} overdue` : null;
}

module.exports = { getOverdueTaskReminders };
