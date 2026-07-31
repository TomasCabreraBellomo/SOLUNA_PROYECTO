import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it.each(["primary", "secondary", "outline", "ghost", "whatsapp"] as const)(
    "renders the %s variant as an accessible button",
    (variant) => {
      render(<Button variant={variant}>Continuar</Button>);
      expect(
        screen.getByRole("button", { name: "Continuar" }),
      ).toBeInTheDocument();
    },
  );

  it("blocks disabled button interaction", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        No disponible
      </Button>,
    );
    fireEvent.click(screen.getByRole("button", { name: "No disponible" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not create a navigable link when a linked action is disabled", () => {
    render(
      <Button disabled href="/checkout">
        Sin stock
      </Button>,
    );
    const action = screen.getByRole("link", { name: "Sin stock" });
    expect(action).toHaveAttribute("aria-disabled", "true");
    expect(action).not.toHaveAttribute("href");
  });
});
