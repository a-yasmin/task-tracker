# Task Tracker Project

Project URL: https://roadmap.sh/projects/task-tracker

This repository contains a simple task tracker CLI tool.

## Usage Instructions

To use the task-tracker CLI tool, use the following commands:

- **Add a new task**

  ```
  task-cli add "task description"
  ```

- **Update a task's description**

  ```
  task-cli update <id> "new description"
  ```

- **Delete a task**

  ```
  task-cli delete <id>
  ```

- **Mark a task as in-progress**

  ```
  task-cli mark-in-progress <id>
  ```

- **Mark a task as done**

  ```
  task-cli mark-done <id>
  ```

- **List all tasks**

  ```
  task-cli list
  ```

- **List tasks by status**
  - Status can be: `todo`, `in-progress`, `done`
  ```
  task-cli list <status>
  ```

Replace `<id>` with the task ID, and `"description"` with your task details.
All tasks are saved in `tasks.json`.
