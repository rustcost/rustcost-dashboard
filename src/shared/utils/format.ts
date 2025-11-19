const DEFAULT_FRACTION_DIGITS = 1;

export const formatBytes = (
  bytes: number,
  fractionDigits = DEFAULT_FRACTION_DIGITS
): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let value = bytes;
  let index = 0;

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }

  return `${value.toFixed(fractionDigits)} ${units[index]}`;
};

export const formatMillis = (millis: number, fractionDigits = 0): string =>
  `${millis.toFixed(fractionDigits)} ms`;

export const formatCpu = (
  milliCores: number,
  fractionDigits = DEFAULT_FRACTION_DIGITS
): string => `${milliCores.toFixed(fractionDigits)} mC`;

export const formatCurrency = (
  value: number,
  currency: string,
  fractionDigits = 2
): string =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

export const formatPercent = (
  value: number,
  fractionDigits = DEFAULT_FRACTION_DIGITS
): string => `${value.toFixed(fractionDigits)}%`;

export const sum = (values: Array<number | undefined>): number =>
  values.reduce((acc: number, item) => acc + (item ?? 0), 0);

export const average = (values: Array<number | undefined>): number => {
  if (!values.length) {
    return 0;
  }

  const total = sum(values);
  return total / values.length;
};

export const clamp = (value: number, min = 0, max = 100): number => {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
};
