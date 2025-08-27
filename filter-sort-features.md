# Enhanced Todo App - Filter and Sort Features

## New Features Added

### Filter Features
- **All Tasks**: View all tasks (default)
- **Today**: View tasks due today
- **Upcoming**: View tasks that are due in the future and not completed
- **Overdue**: View tasks that are past their due date and not completed
- **Completed**: View only completed tasks

### Sorting Features
- **Newest First**: Sort tasks by creation date, newest at the top (default)
- **Oldest First**: Sort tasks by creation date, oldest at the top
- **By Priority**: Sort tasks by priority level, highest priority first
- **A-Z**: Sort tasks alphabetically by task text

### Task Enhancements
- **Due Date**: Each task can now have an optional due date
- **Priority Levels**: Tasks can be assigned one of four priority levels:
  - No Priority (default)
  - Low Priority
  - Medium Priority
  - High Priority

## Technical Implementation

### Backend Updates
- Enhanced Task model with `dueDate` and `priority` fields
- Updated API endpoints to support filtering and sorting via query parameters
- Added filtering logic to handle date-based filters (today, upcoming, overdue)
- Implemented sorting capabilities for all sort criteria

### Frontend Updates
- Added FilterButtons component with icons for visual filtering
- Added SortButton component with dropdown menu for sorting options
- Updated TodoContext to handle the new filter and sort functionality
- Modified API calls to use the new backend filtering and sorting capabilities

## API Documentation
Detailed documentation about the new API features can be found in `backend-filter-sort-updates.md`.

## Usage
1. Use the horizontal filter bar at the top of the task list to filter tasks by status
2. Click the sort button to select your preferred sorting method
3. When adding or editing tasks, you can now set a due date and priority level
