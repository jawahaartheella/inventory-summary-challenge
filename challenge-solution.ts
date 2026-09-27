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
  const summary: InventorySummary = {
    totalItems: 0,
    totalValue: 0,
    topCategory: null
  };
  
  if(!items.length) {
    return summary;
  }
  
  let finalItems = [];
  
  items.forEach(item => {
    const matchedItem = finalItems.find(obj => obj.category === item.category);
    
    if(matchedItem) {
      matchedItem.totalQuant += item.quantity;
      matchedItem.totalVal += (item.quantity * item.unitPrice);
    } else {
      finalItems.push({
        category: item.category,
        totalVal: (item.quantity * item.unitPrice),
        totalQuant: item.quantity
      });
    }
  });
  
  summary.totalItems = finalItems.reduce((sum, item) => (sum + item.totalQuant), 0);
  const tVal = finalItems.reduce((sum, item) => (sum + item.totalVal), 0);
  summary.totalValue = (tVal % 1) !== 0 ? Number(tVal.toFixed(2)) : tVal;
  summary.topCategory = finalItems.reduce((max, current) => current.totalVal > max.totalVal ? current : max).category;
  
  return summary; 
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
  {
    description: "Should return total for two items of different categories",
    items: [
      { name: "Cardamom", category: "Spices", quantity: 2, unitPrice: 60 },
      { name: "Onions", category: "Vegies", quantity: 20, unitPrice: 2 },
    ],
    expected: { totalItems: 22, totalValue: 160, topCategory: "Spices" },
  },
  {
    description: "Should return total for four items of different categories",
    items: [
      { name: "Cardamom", category: "Spices", quantity: 2, unitPrice: 60 },
      { name: "Onions", category: "Vegies", quantity: 20, unitPrice: 2 },
      { name: "Apple", category: "Fruits", quantity: 2, unitPrice: 100 },
      { name: "Dairy Milk", category: "Chocolates", quantity: 1, unitPrice: 80 }
    ],
    expected: { totalItems: 25, totalValue: 440, topCategory: "Fruits" },
  },
  {
    description: "Should return total for five items, two items belongs to same category, topCategory should be Chocolates",
    items: [
      { name: "Cardamom", category: "Spices", quantity: 2, unitPrice: 60 },
      { name: "Onions", category: "Vegies", quantity: 20, unitPrice: 2 },
      { name: "Apple", category: "Fruits", quantity: 2, unitPrice: 100 },
      { name: "Dairy Milk", category: "Chocolates", quantity: 1, unitPrice: 80 },
      { name: "Five Star", category: "Chocolates", quantity: 7, unitPrice: 20 }
    ],
    expected: { totalItems: 32, totalValue: 580, topCategory: "Chocolates" },
  },
  {
    description: "Should return total for Six items, multiple items belongs to multiple same category, topCategory should be Fruits",
    items: [
      { name: "Cardamom", category: "Spices", quantity: 2, unitPrice: 60 },
      { name: "Onions", category: "Vegies", quantity: 20, unitPrice: 2 },
      { name: "Apple", category: "Fruits", quantity: 2, unitPrice: 100 },
      { name: "Dairy Milk", category: "Chocolates", quantity: 1, unitPrice: 80 },
      { name: "Five Star", category: "Chocolates", quantity: 7, unitPrice: 20 },
      { name: "Kiwi", category: "Fruits", quantity: 10, unitPrice: 30 }
    ],
    expected: { totalItems: 42, totalValue: 880, topCategory: "Fruits" },
  },
  {
    description: "two or more categories tie for the highest value, return whichever one appears first in the input array",
    items: [
      { name: "Cardamom", category: "Spices", quantity: 2, unitPrice: 60 }, //120
      { name: "Onions", category: "Vegies", quantity: 20, unitPrice: 2 }, // 40
      { name: "Dairy Milk", category: "Chocolates", quantity: 1, unitPrice: 80,
      { name: "Apple", category: "Fruits", quantity: 1, unitPrice: 100 }, // /100
      { name: "Kiwi", category: "Fruits", quantity: 10, unitPrice: 10 }, // /100
      { name: "Five Star", category: "Chocolates", quantity: 6, unitPrice: 20 },
    ],
    expected: { totalItems: 40, totalValue: 560, topCategory: "Chocolates" },
  },
  {
    description: "Items can have quantity: 0 — they still count toward totals but contribute zero value",
    items: [
      { name: "Cardamom", category: "Spices", quantity: 0, unitPrice: 60 }, 
      { name: "Onions", category: "Vegies", quantity: 20, unitPrice: 2 },
      { name: "Kiwi", category: "Fruits", quantity: 10, unitPrice: 10 }, 
      { name: "Five Star", category: "Chocolates", quantity: 6, unitPrice: 20 },
    ],
    expected: { totalItems: 36, totalValue: 260, topCategory: "Chocolates" },
  },
  {
    description: "Prices can be fractional (e.g. 4.995) — round totalValue to 2 decimal places ",
    items: [
      { name: "Onions", category: "Vegies", quantity: 20, unitPrice: 2 },
      { name: "Kiwi", category: "Fruits", quantity: 10, unitPrice: 63.7585 },
      { name: "Five Star", category: "Chocolates", quantity: 6, unitPrice: 5.6873 },
    ],
    expected: { totalItems: 36, totalValue: 711.71, topCategory: "Fruits" },
  },
];
// ============================================================
// Run
// ============================================================
testCases.forEach((testCase) => {
  const actual = summarizeInventory(testCase.items);
  expectEqual(actual, testCase.expected, testCase.description);
});

printSummary();
