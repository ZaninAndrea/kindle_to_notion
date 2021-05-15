var fs = require("fs")
var parse = require("@sole/kindle-clippings-parser").parse
const cliSelect = require("cli-select")
const fetch = require("isomorphic-fetch")
require("dotenv").config()

var fileContents = fs.readFileSync(
    "/Volumes/Kindle/documents/My Clippings.txt",
    "utf-8"
)
var parsed = parse(fileContents)

cliSelect({
    values: parsed.reverse().map((item) => item.title),
}).then(async ({ id }) => {
    item = parsed[id]

    const pageContent = item.highlights.map(({ text }) => ({
        object: "block",
        type: "paragraph",
        paragraph: {
            text: [
                {
                    type: "text",
                    text: {
                        content: text,
                    },
                },
            ],
        },
    }))

    const res = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + process.env.NOTION_KEY,
            "Notion-Version": "2021-05-13",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            parent: { database_id: process.env.NOTION_DB },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: item.title,
                            },
                        },
                    ],
                },
            },
            children: pageContent,
        }),
    }).then((res) => res.json())
})
