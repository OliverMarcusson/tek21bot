const djs = require('discord.js');
//const mongoose = require('mongoose');
require('dotenv').config();

const client = new djs.Client({ intents: [djs.GatewayIntentBits.Guilds] });

async function main() {
    //await mongoose.connect('mongodb://localhost:27017/tek21bot');
    client.once('ready', () => {
        console.log('Bot is ready!')
    })

    client.login(process.env.TOKEN)
}

main().catch(err => console.log(err));
