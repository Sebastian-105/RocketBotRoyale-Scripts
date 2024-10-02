const { getProfile, updateToken } = require('./api');
const { json } = require('express/lib/response');
const { process_params } = require('express/lib/router');
const fs = require('fs');
const user_id = process.argv.slice(2);
const baseURL = 'https://dev-nakama.winterpixel.io/v2';

async function isOnline(id, token) {
	return await getProfile(id, token).then(function (str) {
		return str.split('\\"online\\":')[1].split(',')[0];
	});
}

async function getDisplayName(id, token) { //unused
	return await getProfile(id, token).then(function (str) {
		return str.split('\\"display_name\\":\\"')[1].split('\\",')[0];
	});
}
async function killstreaks(id, token) {
	let displayName = await getDisplayName(id, token);
	return await getProfile(id, token).then(function (str) {
		let triples = str.split('\\"triple_kills\\":')[1].split(',')[0];
		let doubles = str.split('\\"double_kills\\":')[1].split(',')[0];
		let quads = str.split('\\"quad_kills\\":')[1].split(',')[0];
		let online = str.split('\\"online\\":')[1].split(',')[0];

		let allContent = `User ${displayName} (Online: ${online}) has \n ${triples} triples \n ${doubles} doubles \n ${quads} quads`;
		return allContent;
	});
}
async function getStatus(id, token) {
	let displayName = await getDisplayName(id, token);
	return await getProfile(id, token).then(function (str1) {
		let userID = str1.split('\\"user_id\\":\\"')[1].split('\\",')[0];
		let online = str1.split('\\"online\\":')[1].split(',')[0];
		let skin = str1.split('\\"skin\\":\\"')[1].split('\\",')[0];
		let friendCode = str1.split('\\"friend_code\\":\\"')[1].split('\\",')[0];
		let allContent = `User ${displayName} (Online: ${online})\nUserID: ${userID}\nSkin: ${skin}\nFriend Code: ${friendCode}`;
		return allContent;
	});asdfa
}
async function returnKillstreaks() {
	let token = await updateToken();
	let ks = await killstreaks(user_id, token);
  console.log(ks)
}
// returnKillstreaks()

async function returnStatus() {
	let token = await updateToken()
	let content = await getStatus(user_id, token);
	console.log(content)
}
returnStatus();