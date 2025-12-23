import type { HTMLAttributes } from "react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Avatar({
  name = "",
  size = "md",
  className = "",
  ...props
}: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        rounded-full 
        bg-linear-to-br from-borg-green to-borg-green-light
        flex items-center justify-center
        font-bold text-white
        ring-2 ring-borg-green/30
        ${className}
      `}
      {...props}
    >
      {initials || "?"}
    </div>
  );
}
