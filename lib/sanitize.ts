// lib/sanitize.ts
import DOMPurify from "isomorphic-dompurify";

export function sanitizeText(text: string): string {
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

export function sanitizeHtml(text: string): string {
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "b", "i", "ul", "ol", "li", "h2", "h3"],
    ALLOWED_ATTR: [],
  });
}
