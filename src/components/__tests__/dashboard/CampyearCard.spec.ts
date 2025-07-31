import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CampyearCard from "../../dashboard/CampyearCard.vue";
import type { ResponseCampyearResponse } from "../../../client";

// Mock the entire client module
vi.mock("../../../client", () => ({
  getAllCampyears: vi.fn(),
}));

// Import the mocked function
import { getAllCampyears } from "../../../client";
const mockedGetAllCampyears = vi.mocked(getAllCampyears);

describe("CampyearCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders properly with active campyear", async () => {
    // Mock successful API response
    const mockCampyears: ResponseCampyearResponse[] = [
      {
        year: 2025,
        start: "2025-01-01",
        end: "2025-12-31",
        active: true,
        open: true,
        participationFee: 100,
        insuranceFee: 10,
      },
      {
        year: 2024,
        start: "2024-01-01",
        end: "2024-12-31",
        active: false,
        open: false,
        participationFee: 100,
        insuranceFee: 10,
      },
    ];

    // Mock the return value to match what the component expects
    mockedGetAllCampyears.mockResolvedValue({
      data: mockCampyears,
      error: undefined,
    } as never);

    const wrapper = mount(CampyearCard);

    // Wait for the component to finish loading
    await new Promise((resolve) => setTimeout(resolve, 0));
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("2025");
    expect(wrapper.text()).toContain("Kampjaar");
    expect(wrapper.text()).toContain("01-01-2025 - 31-12-2025");
  });

  it("handles API error gracefully", async () => {
    // Mock API error
    mockedGetAllCampyears.mockResolvedValue({
      data: undefined,
      error: "API Error",
    } as never);

    const wrapper = mount(CampyearCard);

    // Wait for the component to finish loading
    await new Promise((resolve) => setTimeout(resolve, 0));
    await wrapper.vm.$nextTick();

    // Component should handle error without crashing
    expect(wrapper.exists()).toBe(true);
  });

  it("shows loading state initially", async () => {
    const wrapper = mount(CampyearCard);
    expect(wrapper.find(".skeleton").exists()).toBe(true);
  });
});
