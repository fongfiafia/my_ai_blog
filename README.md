# Cursor AI Programming Tutorial Website

## Project Overview
This is a Cursor AI programming tutorial website developed based on Next.js (lookai.top), mainly targeting novice users with zero programming experience, providing Cursor usage tutorials and learning resources.

## Main Page Structure

### 1. Home Page (`app/page.tsx`)
- The main page of the website, including the website introduction and entry points to the main functions.
- Displays the slogan "Cursor Learning Website for Novices with Zero Foundation".
- Provides a "Start the Journey" button to guide users into the tutorials.
- Contains an FAQ section to answer common questions.

### 2. Tutorial Page (`app/cursor/[[...slug]]/page.tsx`)
The article content is placed here.

### 3. Layout Component (`app/layout.tsx`)
- Provides the overall layout structure of the website.
- Includes a navigation bar and a main content area.
- Integrates Google Analytics and advertising-related code.
- Adds SEO-related metadata.

### 4. Internationalization Support
When adding new languages in the future, only the following steps are required:
Add the new language in i18n-config.ts.
Create the corresponding dictionary file.
Add the corresponding routing configuration.

## Website Address
https://www.lookai.top