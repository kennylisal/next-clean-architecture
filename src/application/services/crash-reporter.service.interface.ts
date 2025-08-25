export interface ICrashResporterService {
  report(error: unknown): string;
}
