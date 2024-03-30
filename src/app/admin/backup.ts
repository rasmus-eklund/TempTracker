"use server";
import { db } from "../../server/db";
import { accounts, temps, users } from "../../server/db/schema";

const backup = async () => {
  const [userData, accountData, tempData] = await Promise.all([
    db.select().from(users),
    db.select().from(accounts),
    db.select().from(temps),
  ]);
  return { users: userData, accounts: accountData, temps: tempData };
};

export const generateJson = async () => {
  const data = await backup();
  return JSON.stringify(data);
};
