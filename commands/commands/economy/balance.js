const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['balance', 'bal'],
    cooldown: 10,
    callback: (message, client) => {
        let user
        if(message.mentions.users.first()){
            user = message.mentions.users.first()
        } else {
            user = message.author
        }

        if(user.bot || user === client.user){
            const embed = new Discord.MessageEmbed()
            .setDescription(`<:emojino:796264735649300480> Sorry! The mentioned user is a bot and bots cannot have money!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        let balance = db.get(`account.${user.id}.balance`)
        if(!balance) balance = 0
        else balance = balance

        let bank = db.get(`account.${user.id}.bank`)
        if(!bank) bank = 0
        else bank = bank

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${user.tag}`, user.displayAvatarURL())
        .setDescription(`<:emojiyes:796264735833980968> **Balance:** ${(balance).toLocaleString()} GCoins!\n<:emojiyes:796264735833980968> **Bank:** ${(bank).toLocaleString()}`)
        .setColor('ORANGE')
        .setFooter('Hope\'s Discord Cafe')
        .setTimestamp(new Date())
        return message.channel.send(embed)
    }
}