// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, GuildScheduledEventManager, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType} = require('discord.js');
const { token } = require('./config.json');
const { guildId } = require('./config.json');

//map: map name, image: png link to event cover image, inRotation: which week it appears for Premier
const mapPool = [
	  { map: 'Bind', image: 'https://static.wikia.nocookie.net/valorant/images/2/23/Loading_Screen_Bind.png', inRotation: 2 },
	  { map: 'Haven', image: 'https://static.wikia.nocookie.net/valorant/images/7/70/Loading_Screen_Haven.png', inRotation: 3 },
	  { map: 'Split', image: 'https://static.wikia.nocookie.net/valorant/images/d/d6/Loading_Screen_Split.png', inRotation: false },
	  { map: 'Ascent', image: 'https://static.wikia.nocookie.net/valorant/images/e/e7/Loading_Screen_Ascent.png', inRotation: 1 },
	  { map: 'Icebox', image: 'https://static.wikia.nocookie.net/valorant/images/1/13/Loading_Screen_Icebox.png', inRotation: 5 },
	  { map: 'Breeze', image: 'https://static.wikia.nocookie.net/valorant/images/1/10/Loading_Screen_Breeze.png', inRotation: false },
	  { map: 'Fracture', image: 'https://static.wikia.nocookie.net/valorant/images/f/fc/Loading_Screen_Fracture.png', inRotation: false },
	  { map: 'Pearl', image: 'https://static.wikia.nocookie.net/valorant/images/a/af/Loading_Screen_Pearl.png', inRotation: false },
	  { map: 'Lotus', image: 'https://static.wikia.nocookie.net/valorant/images/d/d0/Loading_Screen_Lotus.png', inRotation: 7 },
	  { map: 'Sunset', image: 'https://static.wikia.nocookie.net/valorant/images/5/5c/Loading_Screen_Sunset.png', inRotation: 6 },
	  { map: 'Abyss', image: 'https://static.wikia.nocookie.net/valorant/images/6/61/Loading_Screen_Abyss.png', inRotation: false },
	  { map: 'Corrode', image: 'https://static.wikia.nocookie.net/valorant/images/6/6f/Loading_Screen_Corrode.png', inRotation: 4 } ];

const playoffsImage = 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/d227d8cef103e26f1369aab755a6dfd83e9cd5c1-1920x1080.jpg';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	const guild = client.guilds.cache.get(guildId)

    const event_manager = new GuildScheduledEventManager(guild);

	//first day which is Week 1 Practice Day 1. Events aren't scheduled for practices but the date is used to calculate
	const startDate = new Date("July 2, 2025 19:00");

	mapPool.forEach((element, index, array) => {

		if(element.inRotation)
		{
			let scheduledDate = startDate.getTime() + ((24 * 7 * (element.inRotation - 1) + 24) * 60 * 60 * 1000)
			if (scheduledDate > Date.now()){
				event_manager.create({
					name: 'Premier Week ' + element.inRotation + ' Day 1 - ' + element.map,
					scheduledStartTime: scheduledDate,
					privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
					entityType: GuildScheduledEventEntityType.Voice,
					//description: 'Match Day Number 1',
	      	channel:  '', // Voice Channel ID to attatch event to
					image: element.image,
					//reason: 'Testing with creating a Scheduled Event',
				});
			}

			scheduledDate = startDate.getTime() + ((24 * 7 * (element.inRotation - 1) + (24*3) + 1) * 60 * 60 * 1000)
			if (scheduledDate > Date.now()){
				event_manager.create({
					name: 'Premier Week ' + element.inRotation + ' Day 2 - ' + element.map,
					scheduledStartTime: scheduledDate,
					privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
					entityType: GuildScheduledEventEntityType.Voice,
					//description: 'Match Day Number 1',
          channel:  '', // Voice Channel ID to attatch event to
					image: element.image,
					//reason: 'Testing with creating a Scheduled Event',
				});
			}

			scheduledDate = startDate.getTime() + ((24 * 7 * (element.inRotation - 1) + (24*4)) * 60 * 60 * 1000)
			if (scheduledDate > Date.now() && element.inRotation != 7){
				event_manager.create({
					name: 'Premier Week ' + element.inRotation + ' Day 3- ' + element.map,
					scheduledStartTime: scheduledDate,
					privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
					entityType: GuildScheduledEventEntityType.Voice,
					//description: 'Match Day Number 1',
		      channel:  '', // Voice Channel ID to attatch event to
					image: element.image,
					//reason: 'Testing with creating a Scheduled Event',
				});
			}
		}
	});

	const scheduledDate = startDate.getTime() + ((24 * 7 * 6 + (24 * 4)) * 60 * 60 * 1000)
	event_manager.create({
		name: 'Premier Playoffs',
		scheduledStartTime: scheduledDate,
		privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
		entityType: GuildScheduledEventEntityType.Voice,
		//description: 'Match Day Number 1',
		channel:  '', // Voice Channel ID to attatch event to
		image: playoffsImage,
		//reason: 'Testing with creating a Scheduled Event',
	});
});

// Log in to Discord with your client's token
client.login(token);
