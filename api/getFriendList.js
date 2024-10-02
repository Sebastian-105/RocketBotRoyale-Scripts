const { getProfile, updateToken } = require('./api');
const { json } = require('express/lib/response');
const { process_params } = require('express/lib/router');
const fs = require('fs');
const user_id = process.argv.slice(2);
const baseURL = 'https://dev-nakama.winterpixel.io/v2';

async function getFriends(id, token) {
	return await fetch(`https://dev-nakama.winterpixel.io/v2/friend?ids=${id}`, {
		headers: {
			accept: 'application/json',
			'accept-language': 'en-US,en;q=0.9',
			authorization: `Bearer ${token}`,
			priority: 'u=1, i',
			'sec-ch-ua': '"Chromium";v="127", "Not)A;Brand";v="99"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Linux"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			Referer: 'https://rocketbotroyale.winterpixel.io/',
			'Referrer-Policy': 'strict-origin-when-cross-origin',
		},
		body: '', //"\"{\\\"leaderboard\\\":\\\"tankkings_trophies\\\",\\\"limit\\\":100,\\\"season\\\":34}\"",
		method: 'POST',
	}).then(function (res) {
		return res.text();
	});
}

async function FriendList() {
	let token = await updateToken();
	let friendList = await getFriends(user_id, token);
	console.log()
	console.log(friendList, "success");
}
FriendList();
