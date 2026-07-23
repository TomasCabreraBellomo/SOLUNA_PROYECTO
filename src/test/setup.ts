import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

type MockImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

vi.mock("next/image", () => ({
  default: ({ fill, priority, ...props }: MockImageProps) =>
    React.createElement("img", {
      ...props,
      "data-fill": fill ? "true" : undefined,
      "data-priority": priority ? "true" : undefined,
    }),
}));
