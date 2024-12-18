import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Separator } from "../ui/separator";

describe("Separator Component", () => {
  test("renders horizontal separator secara default", () => {
    render(<Separator decorative={false} />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    expect(separator).toHaveClass("h-[1px] w-full bg-border");
  });

  test("renders vertical separator ketika orientation='vertical'", () => {
    render(<Separator orientation="vertical" decorative={false} />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator).toHaveClass("h-full w-[1px] bg-border");
  });

  test("tambahkan kelas custom ke elemen separator", () => {
    render(<Separator className="custom-class" decorative={false} />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveClass("custom-class");
    expect(separator).toHaveClass("h-[1px] w-full bg-border");
  });

  test("renders dengan decorative prop (role=none)", () => {
    render(<Separator decorative />);
    const separator = screen.getByRole("none");
    expect(separator).toBeInTheDocument();
  });

  test("renders tanpa decorative prop", () => {
    render(<Separator decorative={false} />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
  });

  test("teruskan ref ke elemen separator", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} decorative={false} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
