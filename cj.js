const nodecron = require("node-cron");
const models = require("./models/models.js");
const mailer = require("./helpers/mailer.js");

const cj = () => {
  //Inform that term to book has expired
  nodecron.schedule("5 * * * *", async () => {
    try {
      const now = new Date().getTime();
      const query = {
        state: "PENDIENTE",
        isAlerted: true,
        expiry: { $lte: now },
      };

      const toBeAlerted = await models.CubaGoldCarBooking.find(query);
      console.log(toBeAlerted.length, " customers to be alerted");

      if (toBeAlerted.length < 1) return;

      for (let i = 0; i < toBeAlerted.length; i++) {
        await mailer.informExpiration(toBeAlerted[i]);
        await models.CubaGoldCarBooking.findByIdAndUpdate(toBeAlerted[i]._id, {
          state: "VENCIDO",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  //Send Reminder to pay
  nodecron.schedule("0 * * * *", async () => {
    try {
      const now = new Date().getTime();

      const query = {
        state: "PENDIENTE",
        isAlerted: false,
        reminderTrigger: { $lte: now },
      };

      const toBeAlerted = await models.CubaGoldCarBooking.find(query);
      console.log(toBeAlerted.length, " customers to be alerted");

      if (toBeAlerted.length < 1) return;

      for (let i = 0; i < toBeAlerted.length; i++) {
        await mailer.sendReminder(toBeAlerted[i]);
        await models.CubaGoldCarBooking.findByIdAndUpdate(toBeAlerted[i]._id, {
          isAlerted: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { cj };
