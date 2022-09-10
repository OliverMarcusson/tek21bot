// Importing
const discord = require('discord.js');
const schema = require('./schema');
const sl = require('./SL/slplanner');
const sldepartures = require('./SL/sldepartures')
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

const checkIfBusShouldDisplay = (departureData) => {
    if (departureData.departureTime) {
        return `Mot ${departureData.destination} om ${discord.bold(`${departureData.departureTime}`)}\n`;
    } 
    else {
        return `Avgår inte för tillfället.\n`;
    }}

const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.MessageContent] });
// Done declaring constants

// Bot is online
client.once('ready', () => {
    console.log(`${timeStamp()} Bot is online.`)
    const schemaChannel = client.channels.cache.get('1017076611415298110');
    const busChannel = client.channels.cache.get('1018109840100446289');

    // Notification Service
    const findLectionInterval = setInterval(() => {
        const result = schema.findLection('tetek21');
        if (result) {
            
            schemaChannel.messages.fetch({ limit: 1 }).then(message => {
                const lastMessage = message.first();
                if (lastMessage.author.bot === true) {schemaChannel.messages.delete(lastMessage.id)}
            })
            
            const lectionEmbed = new discord.EmbedBuilder()
            .setColor('Blue')
            .setThumbnail('https://pbs.twimg.com/profile_images/1266709827427983362/MOHuOmgX_400x400.jpg')    
            .setTitle(result.lection)
            .setDescription(`Klass: ${result.klass}\nTid: ${result.time}\nKlassrum: ${result.hall}`)
            .setFooter({ text: `TekBot av @F4ith2#7882` });
            
            schemaChannel.send({ content: `${discord.roleMention('1017449064222175315')}`, embeds: [lectionEmbed]});

        };
    }, 60 * 1000); // Seconds between each interval.

    // Bus Service
    const busInterval = setInterval(async () => {
        
        try {
            const departureData = await sldepartures.main()
            const strandEmbed = new discord.EmbedBuilder()
            .setColor('Green')
            .setThumbnail('https://sl.nobina.com/globalassets/images/sl/sl_logo_vit_rgb.png')    
            .setTitle('Kommande Bussar')
            .setDescription(`Information om bussar från ${discord.bold('Nacka Strand')}.`)
            
            .addFields([
                { name: '840', value: checkIfBusShouldDisplay(departureData._840)}, 
                { name: '465', value: checkIfBusShouldDisplay(departureData._465)},
                { name: '443', value: checkIfBusShouldDisplay(departureData._443)},
                { name: '71', value: checkIfBusShouldDisplay(departureData._71)},
            ])
            .setFooter({ text: `TekBot av @F4ith2#7882` });
    
            busChannel.messages.edit('1018116978424164402', { content: `${discord.bold('[LIVE]')} Uppdateras varje 30:e sekund.`, embeds: [strandEmbed] })
        }
        catch {
           console.log('Error getting bus info.') 
        }
        
    }, 30 * 1000);
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
    }

    else if (commandName === 'strand') {
        const departureData = await sldepartures.main()
        const busEmbed = new discord.EmbedBuilder()
        .setColor('Green')
        .setThumbnail('https://sl.nobina.com/globalassets/images/sl/sl_logo_vit_rgb.png')    
        .setTitle('Kommande Bussar')
        .setDescription(`Information om bussar från Nacka Strand.`)
        .addFields([
            { name: '840', value: `Mot ${departureData._840.destination} om ${discord.bold(`${departureData._840.departureTime}`)}\n`}, 
            { name: '465', value: `Mot ${departureData._465.destination} om ${discord.bold(`${departureData._465.departureTime}`)}\n`},
            { name: '443', value: `Mot ${departureData._443.destination} om ${discord.bold(`${departureData._443.departureTime}`)}\n`},
            { name: '71', value: `Mot ${departureData._71.destination} om ${discord.bold(`${departureData._71.departureTime}`)}\n`},
        ])
        .setFooter({ text: `TekBot av @F4ith2#7882` });
        await interaction.reply({embeds: [busEmbed]});
    }
});

client.login(env.token);


