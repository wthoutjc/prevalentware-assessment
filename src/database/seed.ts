import { db } from "./database";
import * as bcrypt from "bcryptjs";
import { Roles } from "../lib/enums/roles.enum";

const seed = async () => {
  await db.user.createMany({
    data: [
      {
        email: "jhon@example.com",
        password: bcrypt.hashSync("Prevalentware2024#", 10),
        name: "Jhon Doe",
        role: Roles.ADMIN,
        phone: "1234567890",
      },
    ],
  });
};

seed().then(() => {
  console.log("[INFO] Database seeded successfully");
});
