import { UseCaseAction } from "@/entities/models/usercase-actions";

export interface IAuthorizationServices {
  isActionPermitted(action: UseCaseAction): Promise<boolean>;
}
