CREATE TABLE `postTexts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`postWriteupId` integer NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`postWriteupId`) REFERENCES `postWriteups`(`id`) ON UPDATE no action ON DELETE cascade
);
