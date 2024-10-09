const { getProfile, updateToken } = require("./api");
const { json } = require("express/lib/response");
const { process_params } = require("express/lib/router");
const fs = require("fs");
const season = process.argv.slice(2).map(Number);
console.log(`Getting records for season ${season}`);
const baseURL = "https://dev-nakama.winterpixel.io/v2";
// https://dev-nakama.winterpixel.io:443/v2/rpc/query_multiple_leaderboards
// https://dev-nakama.winterpixel.io:443/v2/rpc/rpc_check_season_rollover
// https://dev-nakama.winterpixel.io:443/v2/rpc/winterpixel_get_config
// https://dev-nakama.winterpixel.io:443/v2/storage
async function getLeaderboard(season, token) {
  return await fetch(
    "https://dev-nakama.winterpixel.io/v2/rpc/query_leaderboard",
    {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        authorization: `Bearer ${token}`,
        priority: "u=1, i",
        "sec-ch-ua": '"Chromium";v="127", "Not)A;Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        Referer: "https://rocketbotroyale.winterpixel.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `\"{\\\"leaderboard\\\":\\\"tankkings_trophies\\\",\\\"season\\\":${season}}\"`,
      method: "POST",
    },
  ).then(function (res) {
    return res.text();
  });
}

async function generateLeaderboards() {
  const fs = require("fs").promises;
  let token = await updateToken(updateToken());
  let leaderboard = await getLeaderboard(season, token);
	if (isNaN(season)) {
    console.log("Can not write file, for season is not a number")
    return;
	} else {
    await fs.writeFile(
    `./leaderboard/season_${season}.json`,
    leaderboard,
    "utf8",)
	}
  


  console.log(`JSON file for season ${season} has been written!`);
  await leaderboards(season);
}
async function writeLeaderboards(newContent) {
  const fs = require("fs").promises;
  
	await fs.writeFile(`./newLeaderboards/season_${season}.txt`, `Leaderboards for season ${season}\n==============================================================
\n`, )
	await fs.appendFile(`./newLeaderboards/season_${season}.txt`, newContent)
}
async function leaderboards(season) {
  fs.readFile(`./leaderboard/season_${season}.json`, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      const payload = JSON.parse(jsonData.payload);

      console.log("Next Cursor:", payload.next_cursor);
      console.log("Records:");

      for (const record of payload.records) {
        let content = `Username: ${record.username},\nRank: ${record.rank},\nScore: ${record.score},\nUser ID: ${record.owner_id}\n==============================================================\n`;
        console.log(content);
        const fs = require("fs").promises;
				writeLeaderboards(content)
      }
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });
}

if (require.main === module) {
  generateLeaderboards().catch((err) => console.error(err));
  console.log("Running getLeaderboards.js");
}
