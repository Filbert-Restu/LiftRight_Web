CREATE TABLE `reps` (
	`id` text PRIMARY KEY NOT NULL,
	`set_id` text NOT NULL,
	`rep_index` integer NOT NULL,
	`peak_velocity` real,
	`mean_velocity` real,
	`trunk_angle_min` real,
	`trunk_angle_max` real,
	`deviation_score` real,
	`classification` text,
	`confidence` integer,
	FOREIGN KEY (`set_id`) REFERENCES `sets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`started_at` integer NOT NULL,
	`ended_at` integer,
	`exercise` text NOT NULL,
	`total_volume_kg` real,
	`avg_efficiency` real,
	`synced_at` integer
);
--> statement-breakpoint
CREATE TABLE `sets` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`set_index` integer NOT NULL,
	`load_kg` real NOT NULL,
	`rep_count` integer NOT NULL,
	`efficiency_score` real,
	`velocity_loss_pct` real,
	`sticking_angle_deg` real,
	`classification` text,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action
);
