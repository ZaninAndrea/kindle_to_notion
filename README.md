# Kindle to Notion

A small cli utility that imports Kindle clippings into a Notion database.

## Usage

Create an env file like the following:

```
NOTION_KEY=YOUR_NOTION_API_SECRET
NOTION_DB=THE_ID_OF_THE_DATABASE_WHERE_THE_CLIPPINGS_SHOULD_BE_IMPORTED
```

Run the cli tool

```
node index.js
```

From the prompt select the book you want to import and hit enter. The book's clippings will now be a page inside your notion database.
