import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import activeCampyearCard from "../../campyear/ActiveCampyearCard.vue";

describe("ActiveCampyearCard", () => {
  it("renders properly", () => {
    const wrapper = mount(activeCampyearCard, {
      props: {
        activeCampyear: {
          year: 2025,
          start: "2023-01-01",
          end: "2023-12-31",
          active: true,
          open: false,
          insuranceFee: 10,
          participationFee: 100,
        },
        yearList: [],
      },
    });
    expect(wrapper.text()).toContain("2025");
  });
});
