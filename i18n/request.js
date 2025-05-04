// i18n/request.js

export default function getRequestConfig({ url }) {
  const pathname = url?.pathname;
  const locale = pathname.split("/")[1] || "en";

  try {
    // Dynamically require the messages based on the locale
    const messages = require(`../src/messages/${locale}.json`);
    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error(`Error loading ${locale} messages:`, error);
    // If no locale found, fallback to English
    return {
      locale: "en",
      messages: require("../src/messages/en.json"),
    };
  }
}
