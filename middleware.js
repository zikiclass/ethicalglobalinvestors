import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: [
    "en",
    "fr",
    "de",
    "nl",
    "sv",
    "ar",
    "id",
    "tr",
    "es",
    "ko",
    "ru",
    "pt",
    "zh",
    "ja",
    "it",
  ],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(en|fr|de|nl|sv|ar|id|tr|es|ko|ru|pt|zh|ja|it)/:path*"],
};
