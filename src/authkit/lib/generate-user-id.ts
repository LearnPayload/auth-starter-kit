import { createId } from "@paralleldrive/cuid2";

export const generateUserId = async () => {
  return `user_${createId()}`;
};
