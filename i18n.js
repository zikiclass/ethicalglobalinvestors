import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = [
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
];

export default getRequestConfig(async ({ request, params }) => {
  // Extract locale from URL path params
  const locale = params?.locale || "en"; // Default to 'en' if no locale is available in the URL

  // If the locale is not supported, return 404
  if (!locales.includes(locale)) {
    console.error(`Locale ${locale} not supported`);
    notFound();
  }

  try {
    // Load the appropriate messages based on the locale
    return {
      locale,
      messages: (await import(`./messages/${locale}.json`)).default,
    };
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    notFound();
  }
});
