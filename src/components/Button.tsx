"use client";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export function Button({
  label,
  onClick,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  const baseClass =
    "px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass}`}
      aria-label={label}
    >
      {label}
    </button>
  );
}
