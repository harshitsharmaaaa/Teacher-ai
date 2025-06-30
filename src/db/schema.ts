import { text, pgTable, timestamp ,boolean,pgEnum} from "drizzle-orm/pg-core";
import {nanoid} from "nanoid";


export const user = pgTable("user", {
  id: text('id').primaryKey(),
  name:text('name').notNull(),
  email:text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').$defaultFn(() => false),
  image: text('image'),
  createdAt:timestamp('createdAt', { mode: 'date' }).$defaultFn(() => new Date()).notNull(),
  updatedAt:timestamp('updatedAt', { mode: 'date' }).$defaultFn(() => new Date()).notNull(),
});

export const session = pgTable("session", {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
});

export const account = pgTable("account", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable("verification", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => new Date())
});


export const agents = pgTable("agents", {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  name: text('name').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  instructions:text('instruction').notNull(),
  createdAt: timestamp('created_At').notNull().defaultNow(),
  updatedAt: timestamp('updated_At').notNull().defaultNow(),
});

export const meetingStatus = pgEnum("meeting_status", [
  "upcoming",
  "completed",
  "active",
  "cancelled",
  "processing"

]);

export const meetings = pgTable("meetings", {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  name: text('name').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  agentId: text('agent_id').notNull().references(() => agents.id, { onDelete: 'cascade' }),
  status: meetingStatus('status').notNull().default('upcoming'),
  startedAt: timestamp('started_at'),
  endedAt: timestamp('ended_at'),
  transcriptUrl: text('transcript_url'),
  recordingUrl: text('recording_url'),
  summary: text('summary'),
  createdAt: timestamp('created_At').notNull().defaultNow(),
  updatedAt: timestamp('updated_At').notNull().defaultNow(),
});