import { PayloadMember } from "../model/types/member";
declare global {
  namespace Express {
    interface Request {
      user: PayloadMember;
    }
  }
}
