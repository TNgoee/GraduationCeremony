import { ObjectId } from "mongodb";
import { type User, type InsertUser, COLLECTIONS } from "../shared/schema";
import db from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MongoStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    try {
      const database = await db.getDb();
      const user = await database
        .collection<User>(COLLECTIONS.USERS)
        .findOne({ _id: new ObjectId(id) });

      if (!user) return undefined;

      return {
        ...user,
        id: user._id?.toString(),
        _id: undefined,
      };
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const database = await db.getDb();
      const user = await database
        .collection<User>(COLLECTIONS.USERS)
        .findOne({ username });

      if (!user) return undefined;

      return {
        ...user,
        id: user._id?.toString(),
        _id: undefined,
      };
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const database = await db.getDb();
    const newUser: User = {
      ...insertUser,
    };

    const result = await database.collection<User>(COLLECTIONS.USERS).insertOne(newUser);

    return {
      ...newUser,
      id: result.insertedId.toString(),
      _id: undefined,
    };
  }
}

export const storage = new MongoStorage();
