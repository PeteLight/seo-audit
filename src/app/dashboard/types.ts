export interface Report {
  overallScore: number;
  loadTime: number; // in seconds
  mobileFriendly: boolean;
  recommendations: { title: string; description: string }[];
}
