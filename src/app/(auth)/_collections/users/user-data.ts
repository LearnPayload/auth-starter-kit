import { User as UserType } from "@/payload-types";
import {
  CollectionSlug,
  RequiredDataFromCollectionSlug,
  TypedUser,
  Where,
} from "payload";
import { getPayload } from "../../_services/payload";

export class User {
  collection: CollectionSlug = "users";

  constructor(public data: UserType) {}

  asTypedUser = () => {
    return { ...this.data, collection: this.collection } as TypedUser;
  };

  get email() {
    return this.data.email;
  }

  get name() {
    return this.data.name;
  }

  get avatar() {
    return this.data.avatar;
  }

  get otp() {
    return this.data.otp;
  }

  get otp_expiration() {
    return this.data.otp_expiration;
  }

  static create = async (data: RequiredDataFromCollectionSlug<"users">) => {
    const payload = await getPayload();
    const user = await payload.create({
      collection: "users",
      data,
    });

    return new User(user);
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
      const user = await payload.update({
        collection: "users",
        id: found.id,
        data,
      });

      return new User(user);
    }
    const user = await payload.create({
      collection: "users",
      data,
    });

    return new User(user);
  };

  static findFirst = async (lookup: Where) => {
    const payload = await getPayload();
    const found = await payload.find({
      collection: "users",
      where: lookup,
    });
    if (found.totalDocs > 0) {
      return new User(found.docs[0]);
    }
    return null;
  };

  static findFirstOrCreate = async (
    lookup: Where,
    data: RequiredDataFromCollectionSlug<"users">,
  ) => {
    const payload = await getPayload();
    const found = await payload.find({
      collection: "users",
      where: lookup,
    });
    if (found.totalDocs > 0) {
      return new User(found.docs[0]);
    }
    const user = await payload.create({
      collection: "users",
      data,
    });

    return new User(user);
  };

  async update(data: Partial<RequiredDataFromCollectionSlug<"users">>) {
    console.log("Updating user", this.data.id, JSON.stringify(data));
    const payload = await getPayload();
    await payload.update({
      collection: "users",
      id: this.data.id,
      data,
    });
  }
}
