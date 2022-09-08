// Importing //
const discord = require('discord.js');
const schema = require('./schema')
require('dotenv').config();
// Done importing //

// Declaring constants //
const env = {
    token: process.env.TOKEN,
    app_id: process.env.APP_ID,
    guild_id: process.env.GUILD_ID
}

let schemaChannel = null

const date = new Date();

const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds] });
// Done declaring constants //

// Main function //
function main() {
    
    client.once('ready', () => {
        console.log('Bot is ready!')
        schemaChannel = client.channels.cache.get('1017076611415298110');
    })

    client.on('interactionCreate', async interaction => {
        let commandName = interaction.commandName;
        if (!interaction.isChatInputCommand) return;
        console.log(interaction)
        if (commandName === 'ping') {
            await interaction.reply('pling plong ding dong.')
        }
    })
    
    // Scheme Notification Sender //
    const findLectionInterval = setInterval(() => {
        
        const result = schema.findLection('tetek21')
        
        if (result) {
            
            const lectionEmbed = new discord.EmbedBuilder()
            .setColor('Blue')    
            .setTitle(result.lection)
            .setDescription(`Klass: ${result.klass}\nTid: ${result.time}\nKlassrum: ${result.hall}`)
            .setFooter({ text: 'Embed gjord av TekBot' });
            
            schemaChannel.send({ content: `${discord.roleMention('1017449064222175315')}`, embeds: [lectionEmbed]});
        }

    }, 60000);

    client.login(env.token)
    
}

main()

