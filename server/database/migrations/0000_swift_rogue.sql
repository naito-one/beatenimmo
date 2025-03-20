CREATE TABLE `postMedias` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`postWriteupId` integer NOT NULL,
	`pathname` text NOT NULL,
	`description` text,
	FOREIGN KEY (`postWriteupId`) REFERENCES `postWriteups`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `postWriteups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`postId` integer NOT NULL,
	`locale` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`price` text NOT NULL,
	`address` text,
	`crushes` text DEFAULT '[]',
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`type` text NOT NULL,
	`visible` integer NOT NULL,
	`relativeValue` real NOT NULL,
	`numRooms` real,
	`numFloors` real,
	`terrainArea` integer,
	`livingArea` integer,
	`livingVolume` integer,
	`createdAt` integer NOT NULL
);
