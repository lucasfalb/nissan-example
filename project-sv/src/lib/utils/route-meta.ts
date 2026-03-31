import { pageDefinitions } from "$lib/content/page-definitions";
import { getPageModel } from "$lib/utils/page-meta";

function normalizePath(pathname: string) {
  if (pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function getRouteMeta(pathname: string) {
  const path = normalizePath(pathname);

  if (path === "/") {
    return {
      page_path: path,
      page_type: "home_page",
      page_category: "home",
      page_model: null,
    };
  }

  if (path === "/modelos/") {
    return {
      page_path: path,
      page_type: "models_hub_page",
      page_category: "models_hub",
      page_model: null,
    };
  }

  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "campanhas" && segments[1]) {
    return {
      page_path: path,
      page_type: "campaign_page",
      page_category: "campaign",
      page_model: null,
    };
  }

  if (segments[0] === "modelos" && segments[1]) {
    const page = pageDefinitions[segments[1] as keyof typeof pageDefinitions];
    return {
      page_path: path,
      page_type: "model_page",
      page_category: "new_model",
      page_model: page ? getPageModel(page) : segments[1],
    };
  }

  if (segments[0] === "usados" && segments[1]) {
    const page = pageDefinitions[segments[1] as keyof typeof pageDefinitions];
    return {
      page_path: path,
      page_type: "used_page",
      page_category: "used",
      page_model: page ? getPageModel(page) : segments[1],
    };
  }

  return {
    page_path: path,
    page_type: "unknown",
    page_category: "unknown",
    page_model: null,
  };
}
