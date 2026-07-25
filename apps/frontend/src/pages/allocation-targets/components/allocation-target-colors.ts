// Allocation palette — shared Craft analytical tokens, theme-aware by design.
const CALM_PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
  "var(--chart-9)",
];

const NAMED_COLORS: Record<string, string> = {
  equity: "var(--chart-4)",
  fixed: "var(--chart-2)",
  cash: "var(--chart-3)",
  commodities: "var(--chart-5)",
  real: "var(--chart-1)",
  property: "var(--chart-1)",
  crypto: "var(--chart-7)",
  digital: "var(--chart-7)",
  alternatives: "var(--chart-8)",
};

export interface AllocationTargetColorRow {
  categoryId: string;
  categoryName: string;
}

export type AllocationTargetColorMap = ReadonlyMap<string, string>;

function categoryKey(id: string, name: string): string {
  return `${id} ${name}`.toLowerCase().replace(/[\s-]+/g, "_");
}

export function allocationTargetColor(id: string, name: string, index = 0): string {
  const key = categoryKey(id, name);
  const named = Object.entries(NAMED_COLORS).find(([needle]) => key.includes(needle));
  if (named) return named[1];
  return CALM_PALETTE[index % CALM_PALETTE.length];
}

export function buildAllocationTargetColorMap(
  rows: readonly AllocationTargetColorRow[],
): AllocationTargetColorMap {
  const colors = new Map<string, string>();

  rows.forEach((row, index) => {
    if (!colors.has(row.categoryId)) {
      colors.set(row.categoryId, allocationTargetColor(row.categoryId, row.categoryName, index));
    }
  });

  return colors;
}

export function allocationTargetColorForRow(
  row: AllocationTargetColorRow,
  colors: AllocationTargetColorMap | undefined,
  fallbackIndex = 0,
): string {
  return (
    colors?.get(row.categoryId) ??
    allocationTargetColor(row.categoryId, row.categoryName, fallbackIndex)
  );
}
