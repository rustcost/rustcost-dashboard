/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Card } from "./Card";
import { LoadingSpinner } from "./LoadingSpinner";

type Alignment = "left" | "center" | "right";

export interface TableColumn<T> {
  key: string;
  label: string;
  align?: Alignment;
  render?: (row: T) => ReactNode;
  className?: string;
  sortAccessor?: (row: T) => string | number;
  efficiencyAccessor?: (row: T) => number | undefined;
}

interface TableProps<T> {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  data?: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  error?: string;
  emptyMessage?: string;
  className?: string;
  rowKey?: (row: T, index: number) => string | number;
}

type SortDirection = "asc" | "desc";

interface SortState {
  key: string;
  direction: SortDirection;
}

const getEfficiencyTone = (value?: number) => {
  if (!Number.isFinite(value ?? NaN)) {
    return "";
  }

  if ((value as number) < 40) {
    return "text-rose-500 dark:text-rose-400";
  }

  if ((value as number) < 70) {
    return "text-amber-500 dark:text-amber-400";
  }

  return "text-emerald-500 dark:text-emerald-400";
};
export const Table = <T extends Record<string, any>>({
  title,
  subtitle,
  actions,
  data = [],
  columns,
  isLoading = false,
  error,
  emptyMessage = "No data available",
  className = "",
  rowKey,
}: TableProps<T>) => {
  const [sortState, setSortState] = useState<SortState | null>(null);

  const sortedData = useMemo(() => {
    if (!sortState) {
      return data;
    }

    const column = columns.find((col) => col.key === sortState.key);
    if (!column || !column.sortAccessor) {
      return data;
    }

    const items = [...data];

    items.sort((a, b) => {
      const valueA = column.sortAccessor?.(a);
      const valueB = column.sortAccessor?.(b);

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortState.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      return sortState.direction === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    return items;
  }, [columns, data, sortState]);

  const toggleSort = (column: TableColumn<T>) => {
    if (!column.sortAccessor) {
      return;
    }

    setSortState((prev) => {
      if (prev?.key === column.key) {
        return {
          key: column.key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: column.key, direction: "asc" };
    });
  };

  return (
    <Card
      title={title}
      subtitle={subtitle}
      actions={actions}
      className={className}
    >
      {isLoading ? (
        <LoadingSpinner label="Loading table" className="py-10" />
      ) : error ? (
        <div className="flex h-40 items-center justify-center text-sm text-red-500">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-950/30">
              <tr>
                {columns.map((column) => {
                  const isSorted = sortState?.key === column.key;
                  return (
                    <th
                      key={column.key}
                      scope="col"
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 ${
                        column.align === "right"
                          ? "text-right"
                          : column.align === "center"
                          ? "text-center"
                          : "text-left"
                      } ${
                        column.sortAccessor ? "cursor-pointer select-none" : ""
                      } ${column.className ?? ""}`}
                      onClick={() => toggleSort(column)}
                    >
                      <span className="inline-flex items-center gap-1">
                        {column.label}
                        {column.sortAccessor && (
                          <span className="text-[10px] text-gray-400">
                            {isSorted
                              ? sortState?.direction === "asc"
                                ? "\u2191"
                                : "\u2193"
                              : "\u2195"}
                          </span>
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {sortedData.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
                    colSpan={columns.length}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                sortedData.map((row, index) => (
                  <tr
                    key={String(rowKey ? rowKey(row, index) : index)}
                    className="odd:bg-white even:bg-gray-50/60 hover:bg-amber-50/60 dark:odd:bg-gray-900 dark:even:bg-gray-900/70 dark:hover:bg-amber-500/10"
                  >
                    {columns.map((column) => {
                      const alignment =
                        column.align === "right"
                          ? "text-right"
                          : column.align === "center"
                          ? "text-center"
                          : "text-left";
                      const efficiencyClass = column.efficiencyAccessor
                        ? getEfficiencyTone(column.efficiencyAccessor(row))
                        : "";
                      return (
                        <td
                          key={column.key}
                          className={`px-4 py-3 text-sm text-gray-700 dark:text-gray-200 ${alignment} ${
                            column.className ?? ""
                          } ${efficiencyClass}`}
                        >
                          {column.render
                            ? column.render(row)
                            : (row[column.key] as ReactNode)}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
