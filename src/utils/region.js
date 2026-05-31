export const regions = ["全部校区", "南苑", "北苑", "图书馆", "学生中心", "教学楼", "体育馆"];

export function matchesRegion(item, region) {
  if (!region || region === "全部校区") return true;
  const text = [item.area, item.place, item.location, item.description, item.title, item.name]
    .filter(Boolean)
    .join(" ");
  return text.includes(region);
}

export function filterByRegion(list, region) {
  return list.filter((item) => matchesRegion(item, region));
}
