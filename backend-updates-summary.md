# Backend Updates for Filter and Sort Functionality

## Changes Made

### 1. Task Model Updates
- Added `dueDate` field (Date type, optional)
- Added `priority` field (Number type, range 0-3)

### 2. API Endpoint Updates

#### GET /api/tasks
- Enhanced to support filter and sort query parameters
- Filter options: `all`, `completed`, `today`, `upcoming`, `overdue`
- Sort options: `newest`, `oldest`, `priority`, `az`

#### POST /api/tasks
- Updated to accept and store `dueDate` and `priority` fields

#### PUT /api/tasks/:id
- Enhanced to support updating `dueDate` and `priority` fields
- Modified to use a dynamic update object

### 3. Frontend Updates

#### TodoContext.js
- Updated fetchTasks to include filter and sort parameters
- Updated to refetch tasks when filter or sortBy change
- Simplified getFilteredTasks function as server now handles most filtering
- Added useEffect to trigger fetchTasks when filter/sort options change

## How It Works

1. When the user changes filter (All Tasks, Today, Upcoming, etc.) or sort option (Newest First, By Priority, etc.), the frontend sends these as query parameters to the backend.

2. The backend applies the filter and sort criteria directly in the database query, which is more efficient than filtering in memory.

3. For search functionality, filtering is still done on the client side for a better user experience (immediate feedback without server round-trips).

4. The filtering logic handles date-based filters with proper timezone handling:
   - Today: Tasks due on the current calendar day
   - Upcoming: Tasks due after today
   - Overdue: Tasks that are past their due date and not completed

5. Sorting is applied after filtering with options for:
   - Newest First: Sort by creation date (newest at top)
   - Oldest First: Sort by creation date (oldest at top)
   - By Priority: Sort by priority level (highest priority first)
   - A-Z: Sort alphabetically by task text

## Testing Instructions

1. Try different filter options to see how they affect the displayed tasks
2. Test the sorting options to verify they work as expected
3. Add tasks with different due dates and priorities to test the full functionality
4. Check that the filter badges (Today, Upcoming, etc.) show correctly based on the due date
5. Verify that the priority labels show correctly for tasks with priorities

## Future Enhancements

- Add more filter options (This Week, This Month)
- Add more sort options (By Due Date)
- Add support for filtering by priority levels
- Add the ability to filter and sort simultaneously with multiple criteria
