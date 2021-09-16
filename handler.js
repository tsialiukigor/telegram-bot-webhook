'use strict';
const axios = require('axios');

module.exports.webhook = async (event) => {
  console.log('Event: ', event);

  try {
    const {
      message: {
        chat: { id: chatId },
        text,
      },
    } = JSON.parse(event.body);
    const res = await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: `Hello, ${text}!`,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ result: res.data }),
    };
  } catch (err) {
    console.log('Error: ', err);

    return {
      statusCode: 400,
      body: JSON.stringify({ error: err }),
    };
  }
};
