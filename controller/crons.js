const order = require("../Modals/orders");
const plan = require("../Modals/plan");
const userWallet = require("../Modals/userWallet");

class cron {
  constructor() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    console.log(tomorrow.setDate(today.getDate() + 1));
  }
  async roi_closing() {
    const orders = await order.find();
  }
}
const Crons = new cron();
module.exports = { Crons };
