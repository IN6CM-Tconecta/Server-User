"use strict";

import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    mongoose.connection.on("error", () => {
      console.log("MongoDB | Server-User: No se pudo conectar a mongoDB");
    });

    mongoose.connection.on("connected", () => {
      console.log("MongoDB | Server-User: Conectado a mongoDB");
    });

    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TransmetroUserDb", {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
  } catch (error) {
    console.log(`Error al conectar la DB de Server-User: ${error}`);
    process.exit(1);
  }
};
