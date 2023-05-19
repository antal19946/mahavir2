const levelDistribution = require("../../controller/commans/LevelDistribution");
const  saveOrder  = require("../../controller/commans/Order");
const  saveTransection  = require("../../controller/commans/SaveTransections");
const EpinData = require("../../Modals/Pin");
const UserData = require("../../Modals/Users");
const advance_info = require("../../Modals/advanceInfo");
const plan = require("../../Modals/plan");
const userWallet = require("../../Modals/userWallet");
const diffrenc = require("../../controller/diffDistribution");
const order = require("../../Modals/orders");
const transection = require("../../Modals/transction");

class buy {
  constructor() {
    
  }
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
            const order = await saveOrder({
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
                pinDetails,
                order.order_Id
              );
            }
            if (pinDetails.difference_income.status == 1) {
              await diffrenc.level_distribution(
                user_Id,
                1000000,
                pinDetails.package_type.max_amount,
                pinDetails,
                order.order_Id
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
        if (Wallet?.fund_wallet.value >= amount) {
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

              const order = await saveOrder({
                user_Id: user_Id,
                source: "fund",
                tx_type: purchase_type,
                package_name: packageDetails.package_type.package_name,
                order_amount: amount,
                status: 1,
                remark: null,
              });
              const tx_body = {
                user_Id: userSession,
                to_from: user_Id,
                order_Id: order.order_Id,
                tx_type: purchase_type,
                debit_credit: "debit",
                source: purchase_type,
                wallet_type: "fund_wallet",
                amount,
                status: 1,
                remark: `Debited ${amount} for ${purchase_type} package by ${user_Id}`,
              }
              const tarns = await saveTransection(tx_body);

              if (packageDetails.level_income.status == 1) {
                await levelDistribution.levelIncome(
                  user_Id,
                  100,
                  amount,
                  packageDetails,
                  order.order_Id
                );
              }
              if (packageDetails.difference_income.status == 1) {
                await diffrenc.level_distribution(
                  user_Id,
                  1000000,
                  amount,
                  packageDetails,
                  order.order_Id
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
  async topupWithDap(userSession, body) {
    const { Investment } = await advance_info.findOne();
    const { package_name, amount } = body;
    const packageDetails = await plan.findOne({
      "package_type.package_name": package_name,
      "package_type.status": 1,
    });
    if (packageDetails) {
      if (amount >= packageDetails.package_type.min_amount &&
        amount <= packageDetails.package_type.max_amount) {
        const user = await UserData.findOne({ user_Id: userSession });
        if (
          Investment.allowPackageRepurchase.value == "yes" ||
          user.status == 0
        ) {
          const purchase_type = user.status == 0 ? "purchase" : "re_purchase";
          const order = await saveOrder({
            user_Id: userSession,
            source: "dap",
            tx_type: purchase_type,
            package_name: packageDetails.package_type.package_name,
            order_amount: amount,
            status: 0,
            remark: null,
          });

          // const Tran = await levelDistribution.levelIncome(
          //   userSession,
          //   100,
          //   amount,
          //   packageDetails,
          //   order.order_Id
          // );
          const Tran = await diffrenc.level_distribution(
            userSession,
            1000000,
            amount,
            packageDetails,
            order.order_Id
          );


          return { status: true, order_Id: order.order_Id, transections: Tran };
        }
      } else {
        return { status: false, message: "Invalid amount" };
      }

    } else {
      return { status: false, message: "can't find this type of package" };
    }
  }

  async confirmOrder(userSession, body) {
    const { order_Id, tx_hash } = body
    try {
      const pending_order = await order.findOne({ user_Id: userSession, order_Id, status: 0 });
      if (pending_order) {
        const allTransection = await transection.find({ order_Id: pending_order.order_Id, status: 0 });
        for (let index = 0; index < allTransection.length; index++) {
          const {source,amount,user_Id,tx_Id} = allTransection[index];
          const wallet = await userWallet.findOne({ user_Id: allTransection[index].user_Id })
          let sourceWallet = wallet[source];
          sourceWallet.value+=amount
           const updateWallet = await userWallet.findOneAndUpdate({ user_Id }, { [source]: sourceWallet})
           const updateTransection = await transection.findOneAndUpdate({tx_Id},{status:1})
        }
      const update_pending_order = await order.findOneAndUpdate({ user_Id: userSession, order_Id, status: 0 }, { status: 1, tx_hash });
        return { status: true, pending_order }
      } else {
        return { status: false, pending_order }
      }
    } catch (error) {
      return error
    }



  }
}
const Buy = new buy();
module.exports =  Buy;
