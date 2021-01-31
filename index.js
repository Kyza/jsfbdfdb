const https = require("https");
const fs = require("fs");
const decomment = require("decomment");

const { JSFuck } = require("./JSFuck");

function download(url, dest, cb) {
	const file = fs.createWriteStream(dest);
	https.get(url, function (response) {
		response.pipe(file);
		file.on("finish", function () {
			file.close(cb);
		});
	});
}

console.log("Downloading library.");
download(
	"https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/Library/0BDFDB.plugin.js",
	"0BDFDB.plugin.js",
	() => {
		console.log("Decommenting and saving...");
		const bdfdb = fs.readFileSync("./0BDFDB.plugin.js", "utf-8");

		console.log("Converting is JSF...");
		const jsfbdfdb = JSFuck.encode(bdfdb);

		console.log("Cleaning up previous file...");
		try {
			fs.unlinkSync("0JSFBDFDB.plugin.js");
		} catch {}

		console.log("Writing to 0JSFBDFDB.plugin.js...");
		fs.writeFileSync(
			"0JSFBDFDB.plugin.js",
			bdfdb.match(/((?:\/\*\*).+?(?:\*\/))/is)[0],
			"utf-8"
		);
		fs.appendFileSync("0JSFBDFDB.plugin.js", jsfbdfdb, "utf-8");

		console.log("Done!");
	}
);
