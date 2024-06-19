import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from ".";

describe("Header Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
  });

  it("renders the logo link", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link", { name: /Dogs - Home/i });
    expect(logoLink).toBeInTheDocument();
  });

  it("renders links with appropriate aria-labels", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link", { name: /Dogs - Home/i });
    expect(logoLink).toHaveAttribute("aria-label", "Dogs - Home");
  });

  it("renders the logo image", () => {
    render(<Header />);
    const logoImage = screen.getByAltText("Dogs - Home");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/assets/dogs.svg");
    expect(logoImage).toHaveAttribute("width", "28");
    expect(logoImage).toHaveAttribute("height", "22");
  });
});
