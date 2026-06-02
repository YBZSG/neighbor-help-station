const memberCounts = {
  全部校区: 2845,
  南区: 1468,
  北区: 1377
};

function splitValue(total, region, southRatio = 0.52) {
  if (region === "南区") return Math.round(total * southRatio);
  if (region === "北区") return total - Math.round(total * southRatio);
  return total;
}

export function getCampusMetrics(state, region = "全部校区") {
  const helpOpenCount = state.help.filter((item) => item.status !== "已完成").length;
  const emergencyOpenCount = state.emergency.filter((item) => item.status !== "已完成").length;
  const totalVolunteerHours = state.volunteer.reduce((sum, item) => sum + Math.round(item.current * item.hours), 0);
  const volunteerActivityCount = splitValue(state.volunteer.length, region, 0.54);

  const itemCount = state.items.length;
  const materialCount = splitValue(state.materials.length, region, 0.56);
  const helpCount = helpOpenCount + emergencyOpenCount;
  const volunteerHours = splitValue(totalVolunteerHours, region, 0.53);

  return {
    members: memberCounts[region] || memberCounts["全部校区"],
    itemCount,
    materialCount,
    helpCount,
    volunteerHours,
    volunteerActivityCount,
    totalRecords: itemCount + materialCount + helpCount + volunteerActivityCount
  };
}
