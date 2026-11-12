// Path prefix the site is served under.
// "" on a custom domain (usstm.ca); "/usstm-website" on usstm.github.io/usstm-website.
// Set at build time by the Pages workflow (see .github/workflows/build.yml).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Prefix a root-relative path ("/images/...") with BASE_PATH.
// next/link and Next's own CSS/JS already do this; plain <a> and <Image src> do not.
export const withBasePath = (path) => `${BASE_PATH}${path}`;
