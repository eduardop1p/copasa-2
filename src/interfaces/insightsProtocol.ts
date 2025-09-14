import insightsPages from '@/services/insightsPages';

export default interface InsightsProtocol {
  page: (typeof insightsPages)[number];
  clicks: number;
  createdIn: Date;
}
