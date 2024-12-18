import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "../ui/button";

describe("Button Component", () => {
  test("renders default button", () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole("button", { name: /default button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary text-primary-foreground");
    expect(button).toHaveClass("h-10 px-4 py-2");
  });

  test("renders button with different variants", () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    let button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-destructive text-destructive-foreground");

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole("button", { name: /outline/i });
    expect(button).toHaveClass("border border-input bg-background");

    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByRole("button", { name: /ghost/i });
    expect(button).toHaveClass("hover:bg-accent hover:text-accent-foreground");

    rerender(<Button variant="link">Link</Button>);
    button = screen.getByRole("button", { name: /link/i });
    expect(button).toHaveClass("text-primary underline-offset-4 hover:underline");
  });

  test("renders button with different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByRole("button", { name: /small/i });
    expect(button).toHaveClass("h-9 rounded-md px-3");

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole("button", { name: /large/i });
    expect(button).toHaveClass("h-11 rounded-md px-8");

    rerender(<Button size="icon">Icon</Button>);
    button = screen.getByRole("button", { name: /icon/i });
    expect(button).toHaveClass("h-10 w-10");
  });

  test("renders button with custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  });

  test("renders button as a child component", () => {
    render(
      <Button asChild>
        <a href="/link">Child Link</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: /child link/i });
    expect(link).toHaveAttribute("href", "/link");
  });

  test("button dapat di-disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  test("button dapat diklik", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
