const {
  levelDistribution,
} = require("../../Controller/commans/levelDistribution");
const { saveOrder } = require("../../Controller/commans/order");
const { Transection } = require("../../Controller/commans/transection");
const EpinData = require("../../Modals/Pin");
const UserData = require("../../Modals/Users");
const advance_info = require("../../Modals/advanceInfo");
const plan = require("../../Modals/plan");
const userWallet = require("../../Modals/userWallet");
const diffrenc = require("../../controller/diffDistribution");

class buy {
  constructor() {}
  async activeDirect(sponsor_Id) {
    const active_direct = await UserData.find({
      sponsor_Id,
      status: 1,
    }).count();
    const update_active_direct = await userWallet.findOneAndUpdate(
      { user_Id: sponsor_Id },
      { "active_direct.value": active_direct }
    );
    // console.log(update_active_direct)
  }
  async topupWithPin(userSession, body) {
    const { Investment } = await advance_info.findOne();
    const { package_name, user_Id } = body;

    const pinDetails = await plan.findOne({
      "package_type.package_name": package_name,
      "package_type.status": 1,
      "package_type.package_type": "pin",
    });
    if (pinDetails) {
      const num_of_available_pin = await EpinData.findOne({
        user_Id: userSession,
        pin_type: package_name,
        is_used: 0,
        status: 1,
      });
      if (num_of_available_pin) {
        const user = await UserData.findOne({ user_Id });
        if (user) {
          if (
            Investment.allowPackageRepurchase.value == "yes" ||
            user.status == 0
          ) {
            var purchase_type;
            if (user.status == 0) {
              purchase_type = "purchase";
              const activateUser = await UserData.findOneAndUpdate(
                { user_Id, status: 0 },
                { status: 1, Activation_date: new Date() }
              );
              this.activeDirect(activateUser.sponsor_Id);
            } else {
              purchase_type = "re_purchase";
            }
            const use_pin = await EpinData.findOneAndUpdate(
              {
                user_Id: num_of_available_pin.user_Id,
                pin: num_of_available_pin.pin,
              },
              {
                use_for_user_Id: user_Id,
                is_used: 1,
              }
            );
            await saveOrder({
              user_Id: user_Id,
              source: "pin",
              tx_type: purchase_type,
              package_name: pinDetails.package_type.package_name,
              order_amount: pinDetails.package_type.max_amount,
              status: 1,
              remark: null,
            });
            if (pinDetails.level_income.status == 1) {
              await levelDistribution.levelIncome(
                activateUser.user_Id,
                100,
                pinDetails.package_type.max_amount,
                pinDetails
              );
            }
            if (pinDetails.difference_income.status == 1) {
              await diffrenc.level_distribution(
                user_Id,
                1000000,
                pinDetails.package_type.max_amount,
                pinDetails
              );
            }
            return { status: true };
          } else {
            return { status: false, message: "User already active" };
          }
        } else {
          return { status: false, message: "Invalid User" };
        }
      } else {
        return { status: false, message: "Insufficient Pin Balance" };
      }
    } else {
      return { status: false, message: "can't find this type of pin" };
    }
  }
  async topupWithFund(userSession, body) {
    const { Investment } = await advance_info.findOne();
    const { package_name, user_Id, amount } = body;
    const packageDetails = await plan.findOne({
      "package_type.package_name": package_name,
      "package_type.status": 1,
    });
    if (packageDetails) {
      const Wallet = await userWallet.findOne({
        user_Id: userSession,
        "fund_wallet.wallet_status": 1,
      });
      if (
        amount >= packageDetails.package_type.min_amount &&
        amount <= packageDetails.package_type.max_amount
      ) {
        if (Wallet.fund_wallet.value >= amount) {
          const user = await UserData.findOne({ user_Id });
          if (user) {
            if (
              Investment.allowPackageRepurchase.value == "yes" ||
              user.status == 0
            ) {
              var purchase_type;
              if (user.status == 0) {
                purchase_type = "purchase";
                const activateUser = await UserData.findOneAndUpdate(
                  { user_Id, status: 0 },
                  { status: 1, Activation_date: new Date() }
                );
                this.activeDirect(activateUser.sponsor_Id);
              } else {
                purchase_type = "re_purchase";
              }
              const use_fund = await userWallet.findOneAndUpdate(
                { user_Id: userSession },
                { "fund_wallet.value": Wallet.fund_wallet.value - amount }
              );
              Transection({
                user_Id: userSession,
                to_from: user_Id,
                tx_type: purchase_type,
                debit_credit: "debit",
                source: purchase_type,
                wallet_type: "fund_wallet",
                amount,
                status: 1,
                remark: `Debited ${amount} for ${purchase_type} package by ${user_Id}`,
              });
              await saveOrder({
                user_Id: user_Id,
                source: "fund",
                tx_type: purchase_type,
                package_name: packageDetails.package_type.package_name,
                order_amount: amount,
                status: 1,
                remark: null,
              });
              if (packageDetails.level_income.status == 1) {
                await levelDistribution.levelIncome(
                  user_Id,
                  100,
                  amount,
                  packageDetails
                );
              }
              if (packageDetails.level_income.status == 1) {
                await diffrenc.level_distribution(
                    user_Id,
                    1000000,
                    amount,
                    packageDetails
                  );
              }
              return { status: true };
            } else {
              return { status: false, message: "User already active" };
            }
          } else {
            return { status: false, message: "Invalid User" };
          }
        } else {
          return { status: false, message: "Insufficient fund" };
        }
      } else {
        return { status: false, message: "Invalid amount" };
      }
    } else {
      return { status: false, message: "can't find this type of package" };
    }
  }
}
const Buy = new buy();
module.exports = { Buy };
