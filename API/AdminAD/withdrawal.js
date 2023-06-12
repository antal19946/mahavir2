const transection = require("../../Modals/transction");
const UserData = require("../../Modals/Users");
const order = require("../../Modals/orders");
const userWallet = require("../../Modals/userWallet");
class Withdraw {
  async withdrawalData(param) {
    const allWithdraw = await transection.find({
      debit_credit: "debit",
      source: "withdrawal",
    });
    let With;
    if (param == "pending") {
      With = allWithdraw.filter((data) => {
        return data.status == 0;
      });
    } else if (param == "approved") {
      With = allWithdraw.filter((data) => {
        return data.status == 1;
      });
    } else if (param == "rejected") {
      With = allWithdraw.filter((data) => {
        return data.status == 2;
      });
    }
    const obj = [];
    With.map((item) => {
      obj.push(item.user_Id);
    });
    const Users = await UserData.find({ user_Id: { $in: obj } });
    const pending_withdrawal = [];
    for (let index = 0; index < With.length; index++) {
      const { user_Id, amount, tx_charge, tx_Id, status, time, remark } =
        With[index];
      const userDetails = Users.find((item) => user_Id == item.user_Id);
      const withdraw_obj = {
        user_Id,
        total_amount: amount + tx_charge,
        payable_amount: amount,
        tx_charge,
        tx_Id,
        wallet_address: userDetails.user_name,
        status,
        date: time,
        remark,
      };
      pending_withdrawal.push(withdraw_obj);
    }
    return pending_withdrawal;
  }
  async approve(body) {
    const { tx_Ids } = body;
    try {
      const approvewithdraw = await transection.updateMany(
        { tx_Id: { $in: tx_Ids }, source: "withdrawal" },
        { $set: { status: 1 } }
      );
      return { status: true };
    } catch (error) {
      return { status: false };
    }
  }
  async reject(body) {
    const { tx_Ids,rejectionReason } = body;
    try {
      const allWithdraw = await transection.find({
        tx_Id: { $in: tx_Ids },
        source: "withdrawal",
        status:0
      });
      for (let index = 0; index < allWithdraw.length; index++) {
        const { amount, tx_charge, user_Id,tx_Id } = allWithdraw[index];
        const { main_wallet, total_withdrawal } = await userWallet.findOne({
          user_Id
        });
        const updateWallet = await userWallet.findOneAndUpdate(
          { user_Id },
          {
            "main_wallet.value": main_wallet.value + amount+tx_charge,
            "total_withdrawal.value": total_withdrawal.value - parseInt(amount)-tx_charge,
          }
        );
        const updateTrans = await transection.findOneAndUpdate({tx_Id},{status:2,remark:rejectionReason});
      }
      return { status: true };
    } catch (error) {
      return { status: false };
    }
  }
}
const Withdrawal = new Withdraw();
module.exports = Withdrawal;
