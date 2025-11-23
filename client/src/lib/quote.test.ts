import { describe, it, expect } from "vitest";
import { classifyVehicle, calculateQuote } from "./quote";

describe("classifyVehicle", () => {
  it("classifies SUVs based on keywords", () => {
    expect(classifyVehicle("Honda", "CR-V")).toBe("suv");
    expect(classifyVehicle("Toyota", "RAV4")).toBe("suv");
  });
  it("classifies non-SUVs as small", () => {
    expect(classifyVehicle("Toyota", "Camry")).toBe("small");
    expect(classifyVehicle("Honda", "Civic")).toBe("small");
  });
});

describe("calculateQuote", () => {
  it("returns a rounded price for a newer excellent car", () => {
    const price = calculateQuote({ year: 2019, make: "Toyota", model: "RAV4", condition: "excellent" });
    expect(price).toBeGreaterThanOrEqual(400);
    expect(price).toBeLessThanOrEqual(600);
    expect(price % 10).toBe(0);
  });
  it("returns lower price for older poor condition", () => {
    const price = calculateQuote({ year: 1990, make: "Ford", model: "Escort", condition: "poor" });
    expect(price).toBeGreaterThanOrEqual(200);
    expect(price).toBeLessThanOrEqual(300);
    expect(price % 10).toBe(0);
  });
});