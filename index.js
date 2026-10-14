const { Client, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config();

const logger = require("./#- Utils/logger");

const { loadCommands } = require("./#- Handlers/commandHandler");
const { loadEvents } = require("./#- Handlers/eventHandler");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.commands = new Collection();

const initVoiceAutoJoin = require("./#- Utils/voiceAutoJoin");
initVoiceAutoJoin(client);

const registerNitroCommand = require('./#- Commands/#- General\'S Commands/Nitro.js');
const registerBoostCommand = require('./#- Commands/#- General\'S Commands/Boost.js');

registerNitroCommand(client);
registerBoostCommand(client);

loadCommands(client);
loadEvents(client);

client.login(process.env.TOKEN)
  .catch((err) => logger.error(`Failed to login: ${err.message}`));
  
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught exception occurred: ${error.message}`);
});
process.on("unhandledRejection", (reason) => {
  logger.warn(`Unhandled promise rejection: ${reason}`);
});