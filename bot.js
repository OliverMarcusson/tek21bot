const discord = require('discord.js');
const schema = require('./schema')
//const mongoose = require('mongoose');
require('dotenv').config();

const env = {
    token: process.env.TOKEN,
    app_id: process.env.APP_ID,
    guild_id: process.env.GUILD_ID
}

const date = new Date();

const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds] });

async function main() {
    //await mongoose.connect('mongodb://localhost:27017/tek21bot');
    let minute = date.getMinutes()
    
    client.once('ready', () => {
        console.log('Bot is ready!')
    })

    client.on('interactionCreate', async interation => {
        let commandName = interation.commandName;
        
        if (!interation.isChatInputCommand) return;

        if (commandName === 'ping') {
            await interation.reply('ping pong dong schlong!')
        }
    })

    if (minute !== date.getMinutes) {
        if (schema.findLection()) {
            
        }
    }

    client.login(env.token)
}

main().catch(err => console.log(err));
