const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    client.on('message', (message) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES') && message.channel.type !== "dm"){
            const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs').id
            const channell = message.guild.channels.cache.get(channel)

            if(message.member.bot){
                return
            }

            if(message.content.includes('https://') || message.content.includes('http://') || message.content.includes('www.')){
                message.delete()
                message.channel.send('<:emojino:796264735649300480> Links are not allowed!')
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter('Hope\'s Discord Cafe')
                .setTimestamp()
                .setColor('RED')
                .setDescription(
                    `**Message sent by <@${message.author.id}> got deleted in <#${message.channel.id}>**\n` + 
                    `${message.content}`
                )
                .addFields(
                    {
                        name: 'Member ID',
                        value: message.author.id,
                    },
                    {
                        name: 'Reason',
                        value: 'Contains Link!'
                    }
                )
                channell.send(embed)
            }
        } else {
            return
        }
    })
}