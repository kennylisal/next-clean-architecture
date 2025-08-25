export interface IInstrumentationService {
  startSpan<T>(
    options: { name: string; op?: string; attributes?: Record<string, string> },
    callback: () => T
  ): T;
  instrumentServerAction<T>(
    name: string,
    options: Record<string, string>,
    callback: () => T
  ): Promise<T>;
}
