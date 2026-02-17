# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo managed by `pnpm` workspaces and TurboRepo containing Jory Tindall's personal website ecosystem:

- **apps/web**: Next.js personal website (jorytindall.com) with design, development, and music content
- **apps/admin**: Sanity CMS for content management
- **apps/presentations**: Svelte + RevealJS presentation platform for conference talks
- **packages/tokens**: Design tokens managed with style-dictionary

## Development Commands

### Root Level Commands
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all applications
- `pnpm test` - Run tests across all apps
- `pnpm lint` - Run linting across all apps
- `pnpm format:all` - Format all code with Prettier

### App-Specific Commands
- `pnpm web:dev` / `pnpm web:build` - Web app development/build
- `pnpm admin:dev` / `pnpm admin:build` - Sanity CMS development/build
- `pnpm pres:dev` / `pnpm pres:build` - Presentations app development/build
- `pnpm tokens:build` - Build design tokens

### Web App Specific
- `pnpm test:e2e` - Run Playwright end-to-end tests
- `pnpm test:e2e:ui` - Run Playwright tests with UI
- `pnpm email` - Email development server
- `next-sitemap` runs automatically after build

## Architecture Overview

### Web Application (Next.js)
- **Framework**: Next.js 15 with App Router
- **Content**: Sanity CMS integration for dynamic content
- **Styling**: CSS Modules with design tokens from workspace package
- **Components**: Modular component architecture in `src/components/`
- **Content Types**: Blog posts, portfolio projects, events, music projects, talks
- **Layout**: Global layout with header/footer navigation, banner system
- **Analytics**: Vercel Analytics and Fathom integration

### Key Web App Patterns
- **Sanity Integration**: Content fetched via `lib/queries/` with typed responses
- **Component Structure**: Each component has its own directory with `.module.css` styles
- **Image Handling**: Sanity image optimization with next-sanity-image
- **Routing**: App Router with dynamic routes for content types (`[slug]` pages)
- **Email**: React Email components in `src/email/`

### Sanity CMS (Admin)
- **Schema**: Comprehensive content schemas in `schemas/` (documents and objects)
- **Content Types**: Pages, posts, portfolio projects, events, music projects, talks, navigation
- **Project ID**: j9ccckrc, dataset: production

### Design Tokens
- **Tool**: style-dictionary for token generation
- **Output**: CSS, SCSS, JSON formats for web consumption
- **Themes**: Light and dark theme support
- **Categories**: Color (core/semantic), typography (font-family, font-size, line-height)

### Presentations App (Svelte)
- **Framework**: SvelteKit + RevealJS
- **Purpose**: Conference presentations about design systems
- **Structure**: Presentation-specific routes with slide components

## Environment Setup

The web app expects these environment variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `PORTFOLIO_ACCESS_PASSWORD` - Shared password for accessing protected portfolio projects
- Additional vars for analytics and email functionality

## Testing

- **E2E Testing**: Playwright configuration in `apps/web/playwright.config.ts`
- **Test Location**: `apps/web/src/tests/e2e/`

## Deployment

All apps deploy to Vercel with automatic builds triggered by the TurboRepo pipeline.