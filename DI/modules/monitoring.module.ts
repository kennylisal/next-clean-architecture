import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { SentryCrashReporter } from "@/infrastructure/services/crash-reporter.service";
import { SentryInstrumentationService } from "@/infrastructure/services/instrumentation.service";

export function createMonitoringModule() {
  const monitoringModule = createModule();
  monitoringModule
    .bind(DI_SYMBOLS.ICrashResporterService)
    .toClass(SentryCrashReporter);

  monitoringModule
    .bind(DI_SYMBOLS.IInstrumentationService)
    .toClass(SentryInstrumentationService);
  return monitoringModule;
}
