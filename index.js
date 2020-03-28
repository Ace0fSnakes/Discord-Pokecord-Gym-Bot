const Discord = require("discord.js");
const TOKEN = "";
const MessageHandler = require('discord-message-handler');
const battledRecently = new Set();
const config = require("./config.json");
const fs = require("fs")
var bot = new Discord.Client();


bot.on("ready", function() {
    console.log("Ready");
    bot.user.setStatus("Online");
    bot.user.setGame("Slave for We Like Rice")
});

bot.on('message', message => {
    MessageHandler.handleMessage(message);
});

bot.on("message", function(message) {
    if(message.author.equals(bot.user)) return;

    if (!message.content.startsWith(config.prefix)) return;

    var args = message.content.substring(config.prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
        message.channel.sendMessage(`Ping! (${message.createdTimestamp - Date.now()}ms)`)
        break;
        case "help":
            var embed = new Discord.RichEmbed()
                .setColor(0xF0B27A)
                .setDescription("The Hangouts Badge ][ Gym ][ Bot BETA Release | Created by Veen")
                .addField("Getting Started | Badge Commands", 
                 "**" + config.prefix + "help ✘** Displays this help message. \
                 \n**" + config.prefix + "prefix <prefix> ✘** Changes the bot's prefix! \
                 \n**" + config.prefix + "channel <channel name> ✘** Changes where challenge logs are sent! \
                 \n**" + config.prefix + "battle ✘** Execute this command right before challenging a gym!")
                 message.channel.sendEmbed(embed);
        break;
        case "prefix":
        var owner = message.guild.roles.find("name", "Owners");
        let newPrefix = message.content.split(" ").slice(1, 2)[0];
        if(message.member.roles.has(owner.id)) {
        config.prefix = newPrefix
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
        message.channel.sendMessage("__You have changed the prefix to:__ **" + config.prefix + "**");
        } else { 
            message.channel.sendMessage("You do not have permission to use this command!")
        }
        break;
        case "channel":
        var owner = message.guild.roles.find("name", "Owners");
        let newChannel = message.content.split(" ").slice(1, 2)[0];
        if(message.member.roles.has(owner.id)) {
        config.channel = newChannel
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
        message.channel.sendMessage(`You have changed the challenge log room to: **#${config.channel}**`);
        } else {
            message.channel.sendMessage("You do not have permission to use this command!")
        }
        break;
        case "battle":
        var zephyr  = message.guild.roles.find("name", "Zephyr Badge");
        var hive    = message.guild.roles.find("name", "Hive Badge");
        var plain = message.guild.roles.find("name", "Plain Badge");
        var fog = message.guild.roles.find("name", "Fog Badge");
        var storm = message.guild.roles.find("name", "Storm Badge");
        var mineral = message.guild.roles.find("name", "Mineral Badge");
        var glacier = message.guild.roles.find("name", "Glacier Badge");
        var rising = message.guild.roles.find("name", "Rising Badge");
        var thunder = message.guild.roles.find("name", "Thunder Badge");
        var marsh = message.guild.roles.find("name", "Marsh Badge");
        var rainbow = message.guild.roles.find("name", "Rainbow Badge");
        var cascade = message.guild.roles.find("name", "Cascade Badge");
        var soul = message.guild.roles.find("name", "Soul Badge");
        var boulder = message.guild.roles.find("name", "Boulder Badge");
        var volcano = message.guild.roles.find("name", "Volcano Badge");
        var earth = message.guild.roles.find("name", "Earth Badge");
        var nextGym = "**__Zephyr Gym__**"

                 if(message.member.roles.has(zephyr.id)) {
            nextGym = "**__Hive Gym_**"
        }        if(message.member.roles.has(hive.id)) {
            nextGym = "**__Plain Gym__**"
        }        if(message.member.roles.has(plain.id)) {
            nextGym = "**__Fog Gym__**"
        }        if(message.member.roles.has(fog.id)) {
            nextGym = "**__Storm Gym__**"
        }        if(message.member.roles.has(storm.id)) {
            nextGym = "**__Mineral Gym__**"
        }        if(message.member.roles.has(mineral.id)) {
            nextGym = "**__Glacier Gym__**"
        }        if(message.member.roles.has(glacier.id)) {
            nextGym = "**__Rising Gym__**"
        }        if(message.member.roles.has(rising.id)) {
            nextGym = "**__Thunder Gym__**"
        }        if(message.member.roles.has(thunder.id)) {
            nextGym = "**__Marsh Gym__**"
        }        if(message.member.roles.has(marsh.id)) {
            nextGym = "**__Rainbow Gym__**"
        }        if(message.member.roles.has(rainbow.id)) {
            nextGym = "**__Cascade Gym__**"
        }        if(message.member.roles.has(cascade.id)) {
            nextGym = "**__Soul Gym__**"
        }        if(message.member.roles.has(soul.id)) {
            nextGym = "**__Boulder Gym__**"
        }        if(message.member.roles.has(boulder.id)) {
            nextGym = "**__Volcano Gym__**"
        }        if(message.member.roles.has(volcano.id)) {
            nextGym = "**__Earth Gym__**"
        }        if(message.member.roles.has(earth.id)) {
            nextGym = "**__Elite Four__**"
        }

        if (battledRecently.has(message.author.id)) {
            message.channel.send(`Your 12 hour cooldown has not ended, come back later ${message.author}!`);
    } else {
            message.channel.sendMessage(`You are now challenging the ${nextGym} ${message.author}!`)
            message.guild.channels.find("name", config.channel).sendMessage(`${message.author} your cooldown has now started, you must now wait __12 hours__ after your current battle! \
You are now challenging the ${nextGym}`)
        battledRecently.add(message.author.id);
        setTimeout(() => {
          battledRecently.delete(message.author.id);
        }, 43200000);
    }
    break;
        default:
        message.channel.sendMessage("***Invalid Command***");    
}
});

bot.login(TOKEN);