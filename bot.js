// Importing
const discord = require('discord.js');
const schema = require('./schema');
const sl = require('./sl');
require('dotenv').config();
// Done importing

// Declaring constants
const env = {
    token: process.env.TOKEN,
    app_id: process.env.APP_ID,
    guild_id: process.env.GUILD_ID
};

const date = new Date();

const timeStamp = () => {return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;}

const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds] });
// Done declaring constants
    
// Bot is online
client.once('ready', () => {
    console.log(`${timeStamp()} Bot is online.`)
    schemaChannel = client.channels.cache.get('1017076611415298110');

    // Notification Service
    const findLectionInterval = setInterval(() => {
    
        const result = schema.findLection('tetek21');
        if (result) {
            const lectionEmbed = new discord.EmbedBuilder()
            .setColor('Blue')
            .setThumbnail('https://pbs.twimg.com/profile_images/1266709827427983362/MOHuOmgX_400x400.jpg')    
            .setTitle(result.lection)
            .setDescription(`Klass: ${result.klass}\nTid: ${result.time}\nKlassrum: ${result.hall}`)
            .setFooter({ text: `TekBot av @F4ith2#7882` });
            
            schemaChannel.send({ content: `${discord.roleMention('1017449064222175315')}`, embeds: [lectionEmbed]});
        };

    }, 60 * 1000); // Seconds between each interval.
});

client.on('interactionCreate', async interaction => {
    const commandName = interaction.commandName;
    if (!interaction.isChatInputCommand) return;
    
    if (commandName === 'ping') {
        await interaction.reply('pling plong ding dong.');
    } 
    
    else if (commandName === 'forum') {
        const travelInfo = await sl.main();
        const busEmbed = new discord.EmbedBuilder()
        .setColor('Green')
        .setThumbnail('https://sl.nobina.com/globalassets/images/sl/sl_logo_vit_rgb.png')    
        .setTitle('Nästa Buss')
        .setDescription(`Tid för avgång vid hållplats ${discord.bold(travelInfo.departureName)}: ${travelInfo.departureTime} (om ${discord.bold(travelInfo.departureTimeLeft)} minuter).\n\nTid för ankomst vid hållplats ${travelInfo.arrivalName}: ${travelInfo.arrivalTime}.`)
        .setFooter({ text: `TekBot av @F4ith2#7882` });
        await interaction.reply({embeds: [busEmbed]})
    };
});

client.login(env.token);


