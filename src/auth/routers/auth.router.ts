import { Router } from "express";
import { passwordValidation } from "../../user/validation/password.validation";
import { loginOrEmailValidation } from "../../user/validation/login.or.email.validation";
import { inputValidationResultMiddleware } from "../../core/utils/input-validtion-result.middleware";
import { authLoginHandler } from "./handlers/login.handler";
import { getUserDataHandler } from "./handlers/get-user-data.handler";
import { loginValidation } from "../../user/validation/login.validation";
import { emailValidation } from "../../user/validation/email.validation";
import { registrationHandler } from "./handlers/registration.handler";
import { resendConfirmationEmail } from "./handlers/email-resending.handler";
import { confirmRegistration } from "./handlers/registration-confirmation.handler";
import { codeValidation } from "../../user/validation/confirm-code.validation";
import { emailResendValidation } from "../../user/validation/email.resend.validation";
import { refreshTokenHandler } from "./handlers/refresh.handler";
import { logoutHandler } from "./handlers/logout.handler";
import { requestLogMiddleware } from "../middlewares/request-log.middleware";
import container from "../../core/container/container";
import { RefreshTokenGuard } from "./guards/refresh.token.guard";
import TYPES from "../../core/container/types";
import { newPasswordValidation } from "../../user/validation/new-password.validation";
import { recoveryPasswordEmailValidation } from "../../user/validation/recovery-password-email.validation";
import { recoveryCodeValidation } from "../../user/validation/password-recovery-code.validation";
import { passwordRecoveryHandler } from "./handlers/password-recovery.handler";
import { newPasswordHandler } from "./handlers/new-password.handler";
import { accessTokenGuard } from "./guards/access.token.guard";

export const authRouter = Router();
const refreshTokenGuard = container.get<RefreshTokenGuard>(
  TYPES.RefreshTokenGuard,
);

authRouter.post(
  "/login",
  requestLogMiddleware,
  passwordValidation,
  loginOrEmailValidation,
  inputValidationResultMiddleware,
  authLoginHandler,
);
authRouter.post(
  "/registration-confirmation",
  requestLogMiddleware,
  codeValidation,
  inputValidationResultMiddleware,
  confirmRegistration,
);
authRouter.post(
  "/registration",
  requestLogMiddleware,
  passwordValidation,
  loginValidation,
  emailValidation,
  inputValidationResultMiddleware,
  registrationHandler,
);
authRouter.post(
  "/registration-email-resending",
  requestLogMiddleware,
  emailResendValidation,
  inputValidationResultMiddleware,
  resendConfirmationEmail,
);
authRouter.get("/me", accessTokenGuard, getUserDataHandler);
authRouter.post(
  "/refresh-token",
  refreshTokenGuard.handle,
  refreshTokenHandler,
);
authRouter.post("/logout", refreshTokenGuard.handle, logoutHandler);

authRouter.post(
  "/new-password",
  requestLogMiddleware,
  newPasswordValidation,
  recoveryCodeValidation,
  inputValidationResultMiddleware,
  newPasswordHandler,
);
authRouter.post(
  "/password-recovery",
  requestLogMiddleware,
  recoveryPasswordEmailValidation,
  inputValidationResultMiddleware,
  passwordRecoveryHandler,
);
