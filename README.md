# inventory-summary-challenge

### You're extending the inventory system for a small warehouseapp. Your task is to implement summarizeInventory(items), a function that takesan array of inventory records and returns:

- totalItems — the total quantity of all items combined

- totalValue — the total monetary value of the inventory (quantity × unit price, summed and rounded to 2 decimal places)

- topCategory — the name of the category whose combined value is highest (or null if the input array is empty)

### Each inventory record has the shape:

type InventoryItem = {

  name: string;

  category: string;

  quantity: number;

  unitPrice: number;

};

### Rules to get right:

- Multiple items can share the same category — their values must be merged together before comparing categories.

- If two or more categories tie for the highest value, return whichever one appears first in the input array.

- Items can have quantity: 0 — they still count toward totals but contribute zero value.

- Prices can be fractional (e.g. 4.**995**) — round totalValue to 2 decimal places to avoid floating-point noise.

- An empty items array should return { totalItems: 0, totalValue: 0, topCategory: null }.

How to work in this file: since this sandbox runs a singleTypeScript file (not a full Jest project), the file already includes a tinyhand-built test harness that mimics Jest's expect(...).toEqual(...) style.Follow the same **TDD** flow you practiced recently:

#### Red — extend the testCases array with scenarios for the edge cases called out in the starter comments (duplicate categories, zero quantity, fractional prices, tie-breaking). Run the file — the stub implementation throws, so everything should fail.

#### Green — implement summarizeInventory (favor reduce() for the aggregation) until every case passes.

#### Refactor — clean up naming and structure while keeping all tests green.

Keep the test cases in the single parameterized array/loopstructure already set up — don't copy-paste separate blocks per scenario.

## How to run
- Download `challenge.ts` and run it in any TypeScript environment.
- Make sure node is installed on your system
- run "npx tsx challenge.ts" command, install if it asks anything
## OR 
- Pick any online typescript compiler
- edit the code run it

<img width="1197" height="93" alt="image" src="https://github.com/user-attachments/assets/5253c72f-a7ff-4e43-bb9f-3bb2e1804546" />
You would see an error like above and that's intentional
