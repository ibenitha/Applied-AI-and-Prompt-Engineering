/**
 * Tiny in-memory stand-in for TaskFlow's task store, used only to give the
 * new feature something real to integrate with in this demo.
 */
function createTaskManager(initialTasks = []) {
  let tasks = [...initialTasks];

  return {
    getTasks: () => tasks,
    addTask: (task) => {
      tasks.push(task);
    },
    setStatus: (id, status) => {
      tasks = tasks.map((t) => (t.id === id ? { ...t, status } : t));
    },
  };
}

module.exports = { createTaskManager };
