/// <reference path="../.astro/types.d.ts" />

declare namespace App {
	interface Locals {
		user: {
			username: string;
			email: string;
			thumb: string;
		} | null;
	}
}
