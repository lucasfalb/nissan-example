import { getPublicPageUrl } from "./env.js";

const DEFAULT_SEO = {
  title: "Nissan Portugal | Modelos, Campanhas e Ofertas",
  description:
    "Descubra os modelos Nissan, campanhas em destaque e oportunidades em viaturas novas e usadas.",
};

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function applySeoMetadata({ title, description, path }) {
  const nextTitle = title || DEFAULT_SEO.title;
  const nextDescription = description || DEFAULT_SEO.description;

  document.title = nextTitle;

  upsertMeta('meta[name="description"]', {
    name: "description",
    content: nextDescription,
  });
  upsertMeta('meta[property="og:title"]', {
    property: "og:title",
    content: nextTitle,
  });
  upsertMeta('meta[property="og:description"]', {
    property: "og:description",
    content: nextDescription,
  });
  upsertMeta('meta[property="twitter:title"]', {
    property: "twitter:title",
    content: nextTitle,
  });
  upsertMeta('meta[property="twitter:description"]', {
    property: "twitter:description",
    content: nextDescription,
  });
  upsertCanonical(getPublicPageUrl(path || "/"));
}
