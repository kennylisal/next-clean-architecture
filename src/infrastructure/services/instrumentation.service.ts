import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import * as Sentry from "@sentry/nextjs";
export class SentryInstrumentationService implements IInstrumentationService {
  startSpan<T>(
    options: { name: string; op?: string; attributes?: Record<string, string> },
    callback: () => T
  ): T {
    return Sentry.startSpan(options, callback);
  }
  instrumentServerAction<T>(
    name: string,
    options: Record<string, string>,
    callback: () => T
  ): Promise<T> {
    return Sentry.withServerActionInstrumentation(name, options, callback);
  }
}
