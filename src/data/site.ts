// Shared links for the docs site. Change an address here and every page that
// uses it follows (footer, header, homepage, Smart Collections status page).

/** Labs support mailbox: the displayed address and the mailto destination. */
export const SUPPORT_EMAIL = 'support@labs.vaultifyuk.co.uk';

/** Canonical Labs website. */
export const LABS_URL = 'https://labs.vaultifyuk.co.uk';

/** Smart Collections product page on the Labs website. */
export const SMART_COLLECTIONS_PRODUCT_URL = `${LABS_URL}/products/smart-collections`;

/** Labs legal documents (canonical host; the paths stay the same after the website cutover). */
export const LEGAL_LINKS = [
	{ label: 'Privacy Policy', href: `${LABS_URL}/privacy` },
	{ label: 'Terms of Service', href: `${LABS_URL}/terms` },
	{ label: 'Cookie Notice', href: `${LABS_URL}/cookies` },
	{ label: 'Sub-processors', href: `${LABS_URL}/subprocessors` },
];
