import * as dotenv from 'dotenv';
dotenv.config();

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required. Set it in .env or GitHub Secrets.`);
  }
  return value;
}
