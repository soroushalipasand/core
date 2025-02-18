export const cleanHtmlContent = (html: string): string => {
  // Remove HTML tags
  let text = html.replace(/<\/?[^>]+(>|$)/g, '').trim();

  // Remove custom shortcodes like [divider], [blockquote], etc.
  text = text.replace(/\[.*?\]/g, '').trim();

  // Decode HTML entities (optional for special characters like &#8221;)
  text = text.replace(/&#(\d+);/g, (_match, num) =>
    String.fromCharCode(Number(num)),
  );

  return text;
};
