import type { ReactNode } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

type CardPadding = "sm" | "md" | "lg";

const paddingMap: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export interface CardProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
  contentClassName?: string;
  isLoading?: boolean;
  loadingLabel?: string;
  footer?: ReactNode;
}

export const Card = ({
  title,
  subtitle,
  actions,
  children,
  className = "",
  padding = "md",
  contentClassName = "",
  isLoading = false,
  loadingLabel = "Loading",
  footer,
}: CardProps) => {
  const basePadding = paddingMap[padding];
  const headerPadding = `${basePadding} pb-0`;
  const bodyPadding = title || subtitle || actions ? `${basePadding} pt-4` : basePadding;
  const footerPadding = `${basePadding} pt-0`;

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {(title || subtitle || actions) && (
        <div className={`flex flex-wrap items-start justify-between gap-3 ${headerPadding}`}>
          <div className="space-y-1">
            {title && (
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      <div className={`${bodyPadding} ${contentClassName}`}>
        {isLoading ? (
          <LoadingSpinner label={loadingLabel} className="py-8" />
        ) : (
          children
        )}
      </div>

      {footer && (
        <div className={`${footerPadding} border-t border-gray-100 dark:border-gray-800`}>
          {footer}
        </div>
      )}
    </div>
  );
};
