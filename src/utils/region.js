export const regions = ["全部校区", "南区", "北区"];

export function normalizeRegion(region) {
  if (region === "南苑") return "南区";
  if (region === "北苑") return "北区";
  return regions.includes(region) ? region : "全部校区";
}

export function matchesRegion(item, region) {
  const normalized = normalizeRegion(region);
  if (!normalized || normalized === "全部校区") return true;
  const keywords = normalized === "南区" ? ["南区", "南苑"] : ["北区", "北苑"];
  const text = [item.area, item.place, item.location, item.description, item.title, item.name]
    .filter(Boolean)
    .join(" ");
  return keywords.some((keyword) => text.includes(keyword));
}

export function filterByRegion(list, region) {
  return list.filter((item) => matchesRegion(item, region));
}
