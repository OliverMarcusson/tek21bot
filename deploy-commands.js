const dRest = require('@discordjs/rest');
const discord = require('discord.js');
require('dotenv').config();

const env = {
    token: process.env.TOKEN,
    app_id: process.env.APP_ID,
    guild_id: process.env.GUILD_ID
};

const commands = [
    new discord.SlashCommandBuilder().setName('ping').setDescription('Pong!'),
    new discord.SlashCommandBuilder().setName('busstillforum').setDescription('Skickar informationen om nästa buss till Nacka Forum från Nacka Strand.')
]
    .map(command => command.toJSON());

const rest = new dRest.REST({ version: '10' }).setToken(env.token);

rest.put(discord.Routes.applicationGuildCommands(env.app_id, env.guild_id), { body: commands })
    .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error);