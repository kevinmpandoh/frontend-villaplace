import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "../ui/button";

describe("Button Component", () => {
  const renderButton = (props: any) => render(<Button {...props} />);

  test("renders default button", () => {
    renderButton({ children: "Default Button" });

    const button = screen.getByRole("button", { name: /default button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary text-primary-foreground h-10 px-4 py-2");
  });

  test("renders button with different variants", () => {
    const variants = [
      { variant: "destructive", className: "bg-destructive text-destructive-foreground" },
      { variant: "outline", className: "border border-input bg-background" },
      { variant: "ghost", className: "hover:bg-accent hover:text-accent-foreground" },
      { variant: "link", className: "text-primary underline-offset-4 hover:underline" },
    ];

    variants.forEach(({ variant, className }) => {
      renderButton({ children: variant, variant });
      const button = screen.getByRole("button", { name: new RegExp(variant, "i") });
      expect(button).toHaveClass(className);
    });
  });

  test("renders button with different sizes", () => {
    const sizes = [
      { size: "sm", className: "h-9 rounded-md px-3" },
      { size: "lg", className: "h-11 rounded-md px-8" },
      { size: "icon", className: "h-10 w-10" },
    ];

    sizes.forEach(({ size, className }) => {
      renderButton({ children: size, size });
      const button = screen.getByRole("button", { name: new RegExp(size, "i") });
      expect(button).toHaveClass(className);
    });
  });

  test("renders button with custom className", () => {
    renderButton({ children: "Custom", className: "custom-class" });
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
    renderButton({ children: "Disabled", disabled: true });
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  test("button dapat diklik", () => {
    const handleClick = jest.fn();
    renderButton({ children: "Click Me", onClick: handleClick });

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("button memiliki atribut aksesibilitas dengan type default", () => {
    render(<Button>Accessible Button</Button>);
    screen.debug();
  
    const button = screen.getByRole("button", { name: /accessible button/i });
    expect(button).toHaveAttribute("type", "button");
  });
  
  test("button tidak memiliki atribut type jika digunakan sebagai elemen anak", () => {
    render(
      <Button asChild>
        <a href="/link">Child Link</a>
      </Button>
    );
  
    const link = screen.getByRole("link", { name: /child link/i });
    expect(link).not.toHaveAttribute("type");
  });
  

  test("button menerima fokus", () => {
    renderButton({ children: "Focusable Button" });
    const button = screen.getByRole("button", { name: /focusable button/i });

    button.focus();
    expect(button).toHaveFocus();
  });
});
