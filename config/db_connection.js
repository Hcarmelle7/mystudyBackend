import mysql from 'mysql2/promise';
import { db_config } from './db_config.js';

const { host, user, password } = db_config;

async function db_connection() {
  try {
    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${db_config.dbName}`);
    console.log('Base de données créée ou déjà existante');
    await connection.end();
  } catch (error) {
    console.error('Erreur lors de la création de la base de données:', error);
    process.exit(1);  // Arrête le processus avec une erreur
  }
}

await db_connection();

