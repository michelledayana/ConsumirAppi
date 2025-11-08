import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("pokemon_db"); // tu base de datos
    const usersCollection = db.collection("users"); // tu colección

    const users = [
      { name: "Ash Ketchum", email: "ash@pokemon.com", password: "1234" },
      { name: "Misty", email: "misty@pokemon.com", password: "1234" },
      { name: "Brock", email: "brock@pokemon.com", password: "1234" },
    ];

    const result = await usersCollection.insertMany(users);
    console.log(`${result.insertedCount} usuarios creados.`);
  } catch (error) {
    console.error("Error creando usuarios:", error);
  } finally {
    await client.close();
  }
}

run();
