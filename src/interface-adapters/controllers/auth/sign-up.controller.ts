import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ISignupUseCase } from "@/application/use-case/auth/sign-up.use-case";
import { InputParseError } from "@/entities/error/common";
import { CreateUser, createUserSchema } from "@/entities/models/user";

export type ISignUpController = ReturnType<typeof signUpController>;

export const signUpController =
  (
    signUpUseCase: ISignupUseCase,
    instrumentationService: IInstrumentationService
  ) =>
  async (input: CreateUser) => {
    return await instrumentationService.startSpan(
      { name: "signup controller" },
      async () => {
        const { data, error: inputParseError } =
          createUserSchema.safeParse(input);
        if (inputParseError) {
          throw new InputParseError("Invalid data", { cause: inputParseError });
        }
        return await signUpUseCase(data);
      }
    );
  };
