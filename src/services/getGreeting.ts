export type GreetingRanges = {
  morning: [number, number];
  afternoon: [number, number];
  night: [number, number];
  dawn?: [number, number];
};

export default function getGreeting(
  date: Date = new Date(),
  opts: {
    ranges?: GreetingRanges;
    includeDawn?: boolean;
    tzOffsetMin?: number | null;
  } = {}
): 'Bom dia' | 'Boa tarde' | 'Boa noite' | 'Boa madrugada' {
  const {
    ranges = {
      morning: [5, 12],
      afternoon: [12, 18],
      night: [18, 24],
      dawn: [0, 5],
    },
    includeDawn = false,
    tzOffsetMin = null,
  } = opts;

  let d = new Date(date);
  if (tzOffsetMin !== null) {
    const localOffset = d.getTimezoneOffset();
    const diff = tzOffsetMin - -localOffset;
    d = new Date(d.getTime() + diff * 60000);
  }

  const h = d.getHours();
  const between = (hour: number, [s, e]: [number, number]) =>
    hour >= s && hour < e;

  if (includeDawn && ranges.dawn && between(h, ranges.dawn))
    return 'Boa madrugada';
  if (between(h, ranges.morning)) return 'Bom dia';
  if (between(h, ranges.afternoon)) return 'Boa tarde';
  return 'Boa noite';
}
