import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ISignInUseCase } from "@/application/use-case/auth/sign-in.use-case";
import { InputParseError } from "@/entities/error/common";
import { LoginUser, loginUserSchema } from "@/entities/models/user";

export type ISignInController = ReturnType<typeof signInController>;

export const signInController =
  (
    signInUseCase: ISignInUseCase,
    instrumentationService: IInstrumentationService
  ) =>
  async (input: LoginUser) => {
    instrumentationService.startSpan(
      { name: "signin controller" },
      async () => {
        const { data, error: inputParseError } =
          loginUserSchema.safeParse(input);
        if (inputParseError) {
          throw new InputParseError("Invalid data", { cause: inputParseError });
        }
        return await signInUseCase(data.user_email, data.user_password);
      }
    );
  };
