const fs = require('fs');
let storagecache = {};
const email = 'testsubject105@gmail.com';
const password = 'password';
const baseURL = 'https://dev-nakama.winterpixel.io/v2';
async function getProfile(id, token) {
	return await fetch('https://dev-nakama.winterpixel.io/v2/rpc/rpc_get_users_with_profile', {
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
		body: `\"{\\\"ids\\\":[\\\"${id}\\\"]}\"`,
		method: 'POST',
	}).then(function (res) {
		return res.text();
	});
}
async function getLeaderboard(season) {
	return await fetch('https://dev-nakama.winterpixel.io/v2/rpc/query_leaderboard', {
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
		body: `\"{\\\"leaderboard\\\":\\\"tankkings_trophies\\\",\\\"season\\\":${season}}\"`,
		method: 'POST',
	}).then(function (res) {
		return res.text();
	});
}

async function updateToken() {
	return await fetch('https://dev-nakama.winterpixel.io/v2/account/authenticate/email?create=false&', {
		headers: {
			accept: 'application/json',
			'accept-language': 'en-US,en;q=0.9',
			authorization: 'Basic OTAyaXViZGFmOWgyZTlocXBldzBmYjlhZWIzOTo=',
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
		body: `{\"email\":\"${email}\",\"password\":\"${password}\",\"vars\":{\"client_version\":\"66\",\"platform\":\"HTML5\"}}`,
		method: 'POST',
	})
		.then(function (res) {
			// console.log(res);
			return res.json();
		})
		.then(function (json) {
			console.log(json);
			token = json['token'];
			return json['token'];
		});
}
async function isOnline(id, token) {
	return await getProfile(id, token).then(function (str) {
		return str.split('\\"online\\":')[1].split(',')[0];
	});
}

async function getDisplayName(id, token) {
	return await getProfile(id, token).then(function (str) {
		return str.split('\\"display_name\\":\\"')[1].split('\\",')[0];
	});
}

// only works for self
async function getLoadout(id, token) {
	return await fetch('https://dev-nakama.winterpixel.io/v2/storage', {
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
		body: `{\"object_ids\":[{\"collection\":\"tankkings\",\"key\":\"loadout\",\"user_id\":\"${id}\"}]}`,
		method: 'POST',
	})
		.then(function (res) {
			return res.text();
		})
		
}

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
	})
		.then(function (res) {
			return res.text();
		})
		.then(function (txt) {
			return txt; //.split(":[")[1].split("]")[0];
		});
}

async function getIdFromStoredUser(username) {
	fs.readFile('aliases.json', function (res) {
		let data = JSON.parse(res);
		console.log(data);
		return data[username];
	});
}

async function addUserIdPair(username, id) {
	let data;
	fs.readFile('aliases.json', function (res) {
		data = JSON.parse(res);
	});
	data[username] = id;
	fs.writefile('aliases.json', data);
}

module.exports = { getProfile, getLeaderboard, updateToken, isOnline, getDisplayName, getLoadout, getFriends, getIdFromStoredUser, addUserIdPair };

async function returnLeaderboards() {
	let season = 15;
	let token = await updateToken();
	let leaderboard = await getLoadout('', token);
	console.log(leaderboard)
}

returnLeaderboards();
