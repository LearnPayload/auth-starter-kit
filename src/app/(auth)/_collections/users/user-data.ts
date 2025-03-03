import { User } from "@/payload-types";
import { RequiredDataFromCollectionSlug, Where } from "payload";
import { getPayload } from "../../_services/payload";

export class UserData {
  static create = async (data: RequiredDataFromCollectionSlug<"users">) => {
    const payload = await getPayload();
    const user = await payload.create({
      collection: "users",
      data,
    });

    return user;
  };

  static updateOrCreate = async (
    lookup: Where,
    data: RequiredDataFromCollectionSlug<"users">,
  ) => {
    const payload = await getPayload();
    const found = await payload.db.findOne({
      collection: "users",
      where: lookup,
    });
    if (found) {
      const user: User = await payload.update({
        collection: "users",
        id: found.id,
        data,
      });

      return user;
    }
    const user = await payload.create({
      collection: "users",
      data,
    });

    return user;
  };
}
