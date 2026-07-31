import { describe, expect, it } from "vitest";

import { commerceConfig, getWhatsAppUrl } from "@/config/commerce";
import { siteConfig } from "@/config/site";

describe("commerce links", () => {
  it("builds the WhatsApp link from central configuration", () => {
    const url = getWhatsAppUrl("Hola Soluna");

    expect(commerceConfig.orderRecipientName).toBe("Sofía");
    expect(commerceConfig.whatsapp.phone).toBe("5493874093118");
    expect(commerceConfig.whatsapp.phone).toMatch(/^\d+$/);
    expect(url).toContain(commerceConfig.whatsapp.phone);
    expect(url).toContain("Hola%20Soluna");
  });

  it("keeps Instagram as an external Soluna link", () => {
    expect(siteConfig.instagramUrl).toBe(
      "https://www.instagram.com/solunaccs.tuc/",
    );
  });
});
