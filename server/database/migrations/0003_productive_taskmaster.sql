PRAGMA defer_foreign_keys = on;--> statement-breakpoint
CREATE TABLE `__new_postWriteups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`postId` integer NOT NULL,
	`locale` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`price` text NOT NULL,
	`address` text,
	`crushes` text DEFAULT '[]',
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_postWriteups`("id", "postId", "locale", "title", "description", "price", "address", "crushes") SELECT "id", "postId", "locale", "title", "description", "price", "address", "crushes" FROM `postWriteups`;--> statement-breakpoint
DROP TABLE `postWriteups`;--> statement-breakpoint
ALTER TABLE `__new_postWriteups` RENAME TO `postWriteups`;--> statement-breakpoint
PRAGMA defer_foreign_keys = off;