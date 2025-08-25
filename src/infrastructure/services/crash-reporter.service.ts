import { ICrashResporterServices } from "@/application/services/crash-reporter.service.interface";
import * as Sentry from "@sentry/nextjs";

export class SentryCrashReporter implements ICrashResporterServices {
  report(error: unknown): string {
    return Sentry.captureException(error);
  }
}
