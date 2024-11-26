const TelegramBot = require('node-telegram-bot-api');
const jsonfile = require('jsonfile');

// Токен вашего бота
const token = '8039218433:AAFRc5oEJkRSpeiugz2lahsFL6sAcyCre5I';

// Создаем экземпляр бота
const bot = new TelegramBot(token, {polling: true});

// Путь к файлу с цитатами
const filePath = '';

// Функция для добавления цитаты в JSON
function addQuote(text) {
    jsonfile.readFile(filePath, (err, obj) => {
        if (err) {
            console.error(err);
            return;
        }

        const newQuote = {
            id: obj.citati.length + 1,
            text: text
        };
        obj.citati.push(newQuote);

        jsonfile.writeFile(filePath, obj, (err) => {
            if (err) console.error(err);
        });
    });
}

// Обработчик команды /цитата
bot.onText(/\/цитата (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const quoteText = match[1];

    addQuote(quoteText);
    bot.sendMessage(chatId, 'Цитата добавлена!');
});

// citati.js
const citati = document.querySelector('.cont');

fetch('citati.json')
  .then(response => response.json())
  .then(data => {
    data.citati.forEach(quote => {
      const div = document.createElement('div');
      div.classList.add('citata');
      div.innerHTML = `<p>"${quote.text}"</p><hr>`;
      citati.appendChild(div);
    });
  });