const DEFAULT_SITE_URL = "https://portfolio-page.vercel.app";

function resolveSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!configuredSiteUrl) {
    return new URL(DEFAULT_SITE_URL);
  }

  try {
    return new URL(configuredSiteUrl);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export const SITE_TITLE = "Heesoo Jun | Frontend Product Engineer";
export const SITE_DESCRIPTION =
  "React와 TypeScript로 사용자 경험을 설계하고 구현하는 프런트엔드 제품 엔지니어 전희수의 포트폴리오입니다.";
export const SITE_URL = resolveSiteUrl();
