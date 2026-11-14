import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

const approvedAssets = [
	{
		name: "Kiivo",
		path: "/assets/kiivo-portrait.png",
		sha256: "47E4B63A01AB85F4833600871B00D10406E4B5CF37AD31660B066978330158BF",
	},
	{
		name: "Leera",
		path: "/assets/leera-portrait.png",
		sha256: "64FD15064EC1CE82CCF9ADAA85DED4521240E994FD6F0ED4816B36A5CBAEC02F",
	},
];

async function sha256(response: Response): Promise<string> {
	const bytes = await response.arrayBuffer();
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0"))
		.join("")
		.toUpperCase();
}

describe("canonical Kiivo and Leera artwork", () => {
	it("uses only the approved portraits in both homepage character sections", async () => {
		const response = await SELF.fetch("http://example.com/");
		expect(response.ok).toBe(true);
		const html = await response.text();

		for (const asset of approvedAssets) {
			expect(html.split(asset.path).length - 1, asset.name).toBe(2);
			expect(html, asset.name).not.toContain(asset.name === "Kiivo" ? "kiivo-hero.png" : "leera-hero.png");
		}
	});

	it("serves the exact owner-approved portrait bytes", async () => {
		for (const asset of approvedAssets) {
			const response = await SELF.fetch(`http://example.com${asset.path}`);
			expect(response.ok, asset.name).toBe(true);
			expect(await sha256(response), asset.name).toBe(asset.sha256);
		}
	});
});
