import { PrismaClient } from "@prisma/client";
import { users, gifs } from "./data";
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.gif.deleteMany();
    console.log("Deleted records in gif table");

    await prisma.user.deleteMany();
    console.log("Deleted records in user table");

    await prisma.user.upsert({
      where: { email: users[0].email },
      update: {},
      create: { ...users[0], gifs: { create: gifs } },
    });
    console.log("Added user data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
