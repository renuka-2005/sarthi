"use client";

import React, { useEffect, useState } from "react";
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check for dark mode from the document
    const checkTheme = () => {
      const isDark = document.body.classList.contains('dark') || 
                     document.documentElement.classList.contains('dark');
      setTheme(isDark ? "dark" : "light");
    };

    // Initial check
    checkTheme();

    // Watch for changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
