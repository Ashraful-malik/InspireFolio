// lib/appwrite.js
import { Client, Account, Databases, Teams, Avatars } from "appwrite";
import { env } from "../env";
const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(env.projectId); // Project ID

const databases = new Databases(client);
const account = new Account(client);
const teams = new Teams(client);
const avatars = new Avatars(client);

export { client, databases, account, teams, avatars };
