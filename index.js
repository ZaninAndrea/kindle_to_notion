var fs = require("fs")
var parse = require("@sole/kindle-clippings-parser").parse
const cliSelect = require("cli-select")

var fileContents = fs.readFileSync(
    "/Volumes/Kindle/documents/My Clippings.txt",
    "utf-8"
)
var parsed = parse(fileContents)

cliSelect({
    values: parsed.map((item) => item.title),
}).then(({ id }) => {
    item = parsed[id]
    const mdSource = item.highlights.reduce(
        (acc, { text }) => acc + text + "\n\n",
        ""
    )
    fs.writeFileSync(`./${item.title}.md`, mdSource)
})
