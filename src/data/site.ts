// Shared links for the docs site. Change an address here and every page that
// uses it follows (footer, header, homepage, Smart Collections status page).

/**
 * Support address: the displayed address and the mailto destination.
 * Interim: support@vaultifyuk.co.uk (John, 25 Nov 2026) until mail for
 * @labs.vaultifyuk.co.uk is configured and independently validated (job
 * labs-email-dns). Then change it back to support@labs.vaultifyuk.co.uk.
 */
export const SUPPORT_EMAIL = 'support@vaultifyuk.co.uk';

/**
 * Canonical Labs website. Not linked anywhere yet (John, 25 Nov 2026): it is
 * still the Squarespace site with unconfirmed product claims. The Labs website
 * cutover job restores the "Labs website ↗" link (header, phone menu, footer).
 */
export const LABS_URL = 'https://labs.vaultifyuk.co.uk';

/**
 * Smart Collections product page on the Labs website. Not linked anywhere yet
 * (John, 25 Nov 2026): the live page is still the Squarespace one with plans,
 * a trial and "Install Free". The Labs website cutover job validates the new
 * page, then restores the link on smart-collections/index.mdx.
 */
export const SMART_COLLECTIONS_PRODUCT_URL = `${LABS_URL}/products/smart-collections`;

/** Labs legal documents (canonical host; the paths stay the same after the website cutover). */
export const LEGAL_LINKS = [
	{ label: 'Privacy Policy', href: `${LABS_URL}/privacy` },
	{ label: 'Terms of Service', href: `${LABS_URL}/terms` },
	{ label: 'Cookie Notice', href: `${LABS_URL}/cookies` },
	{ label: 'Sub-processors', href: `${LABS_URL}/subprocessors` },
];
