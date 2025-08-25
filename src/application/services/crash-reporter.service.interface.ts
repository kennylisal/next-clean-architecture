export interface ICrashResporterServices {
  report(error: unknown): string;
}
