// ============================================================
// Types
// ============================================================

type InventoryItem = {
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
};

type InventorySummary = {
  totalItems: number;
  totalValue: number;
  topCategory: string | null;
};

// ============================================================
// Minimal test harness (mimics Jest's expect().toEqual() style,
// since this sandbox runs a single file rather than a full Jest suite)
// Do not modify this section.
// ============================================================

let passed = 0;
let failed = 0;

function expectEqual(actual: unknown, expected: unknown, description: string): void {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr === expectedStr) {
    passed++;
    console.log(`✅ PASS: ${description}`);
  } else {
    failed++;
    console.log(`❌ FAIL: ${description}`);
    console.log(`   expected: ${expectedStr}`);
    console.log(`   actual:   ${actualStr}`);
  }
}

function printSummary(): void {
  console.log(`\n${passed} passed, ${failed} failed`);
}

// ============================================================
// Implementation
//
// TODO: Replace this stub. Start by running the file (tests will
// fail — that's the "red" step), then implement summarizeInventory
// so all test cases pass ("green"), then clean up ("refactor").
// Favor reduce() for the aggregation.
// ============================================================

function summarizeInventory(items: InventoryItem[]): InventorySummary {
    throw new Error("Not implemented");
}

// ============================================================
// Parameterized test cases
//
// TODO: Add scenarios for at least:
//   - duplicate categories that must be merged before comparing
//   - an item with quantity: 0
//   - fractional unit prices (check totalValue rounds to 2 decimals)
//   - two categories tied for the highest value (first one should win)
// ============================================================

type TestCase = {
  description: string;
  items: InventoryItem[];
  expected: InventorySummary;
};

const testCases: TestCase[] = [
  {
    description: "returns zeroed summary for an empty array",
    items: [],
    expected: { totalItems: 0, totalValue: 0, topCategory: null },
  },
  {
    description: "Spices totals for a single item",
    items: [{ name: "Cardamom", category: "Spices", quantity: 2, unitPrice: 60 }],
    expected: { totalItems: 2, totalValue: 120, topCategory: "Spices" },
  },
  // TODO: add more test cases here
];

// ============================================================
// Run
// ============================================================

testCases.forEach((testCase) => {
  const actual = summarizeInventory(testCase.items);
  expectEqual(actual, testCase.expected, testCase.description);
});

printSummary();
