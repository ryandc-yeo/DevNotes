import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres'
import * as schema from '../../../migrations/schema'
import {migrate} from 'drizzle-orm/postgres-js/migrator'

if (!process.env.DATABASE_URL) {
    console.log('Unable to find database url');
}

const client = postgres(process.env.DATABASE_URL as string, {max:1})
const db = drizzle(client, {schema})
const migrateDb = async () => {
    try {
        console.log('🟠 Migrating client');
        await migrate(db, {migrationsFolder: 'migrations'})
        console.log('🟢 Migrate client successful!');
    } catch (error) {
        console.log('🔴 Error migrating client');
    }
}

migrateDb();
export default db;