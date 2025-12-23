"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1A1B23",
          color: "#FFFFFF",
          border: "1px solid rgba(1, 195, 141, 0.2)",
        },
        success: {
          iconTheme: {
            primary: "#01C38D",
            secondary: "#FFFFFF",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#FFFFFF",
          },
        },
      }}
    />
  );
}
