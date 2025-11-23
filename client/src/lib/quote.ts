export type VehicleType = "small" | "suv";

export const classifyVehicle = (make: string, model: string): VehicleType => {
  const s = `${make} ${model}`.toLowerCase();
  const suvKeywords = [
    "suv","cr-v","rav4","highlander","tahoe","explorer","escape","pilot","rogue","cx-",
    "sorento","sportage","x5","glc","outback","forester","santa fe","pathfinder","grand cherokee"
  ];
  return suvKeywords.some((k) => s.includes(k)) ? "suv" : "small";
};

const pricingConfig = {
  small: { min: 200, max: 300 },
  suv: { min: 400, max: 600 },
} as const;

export const calculateQuote = (data: {
  year: string | number;
  make: string;
  model: string;
  condition: "excellent" | "good" | "fair" | "poor";
}): number => {
  const type = classifyVehicle(data.make, data.model);
  const { min, max } = pricingConfig[type];
  const span = max - min;
  const yearNum = typeof data.year === "string" ? parseInt(data.year, 10) || 0 : data.year || 0;
  const yearScore = Math.max(0, Math.min(1, (yearNum - 1985) / (2020 - 1985)));
  const conditionScore =
    data.condition === "excellent" ? 1 :
    data.condition === "good" ? 0.8 :
    data.condition === "fair" ? 0.5 : 0.2;
  const score = (yearScore + conditionScore) / 2;
  const price = min + span * score;
  return Math.round(price / 10) * 10;
};