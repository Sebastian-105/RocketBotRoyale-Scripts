const { getProfile, updateToken } = require('./api');
const { json } = require('express/lib/response');
const { process_params } = require('express/lib/router');
const fs = require('fs');
const user_id1 = process.argv.slice(2);
const baseURL = 'https://dev-nakama.winterpixel.io/v2';
// Use presets to target people, fr
const presetUsers = [
  "19c33df9-1225-4c79-b4d7-3ed3988a315e", //Envixity
  "c0059131-9425-4bf1-b37e-f59cc83e9bc7", // Ninjaprime
  "7bb4cb45-b858-491e-9904-95018460f586", // Sebastian
	"8010f6cf-76c5-4c10-bdcb-d59c90d90622" // Max
]
async function getDisplayName(id, token) { //unused
	return await getProfile(id, token).then(function (str) {
		return str.split('\\"display_name\\":\\"')[1].split('\\",')[0];
	});
}
async function getSkins(id, token) {
	let displayName = await getDisplayName(id, token);
  return await getProfile(id, token).then(function (str) {
		let skin =  str.split('\\"skin\\":\\"')[1].split('\\",')[0];
    let all = `User ${displayName} is currently using ${skin}`
    return all;
  })
}

async function Skin105() {
	let token = await updateToken();

	let Skins = await getSkins(presetUsers[3], token);
	console.log(Skins);
}
if (require.main === module) {
  Skin105();
	console.log("This only runs when file1.js is executed directly");
}
