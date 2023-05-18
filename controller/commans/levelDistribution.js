const { User } = require("../../API/User/user");
const UserData = require("../../Modals/Users");
const plan = require("../../Modals/plan");
const userWallet = require("../../Modals/userWallet");
const newLocal = './saveTransections';
const { saveTransection } = require('./saveTransections');
class Distribution {
  constructor() { }
  async levelIncome(user_Id, level, packageAmount, packageDetails, order_Id) {
    const user = await User.getProfile(user_Id);
    var sponsor = user.sponsor_Id;
    const Plans = await packageDetails;
    for (let index = 1; index <= level; index++) {
      const spo = await UserData.findOne({ user_Id: sponsor });
      const level = `level_${index}`;
      if (!spo || Plans.level_income[level].value <= 0 || !Plans.level_income[level]) {
        break;
      }
      const wallet = await userWallet.findOne({ user_Id: spo.user_Id, 'level_income.wallet_status': 1 });
      if (wallet && wallet.active_direct.value >= Plans.level_income[level].direct_required) {
        if (index == 1) {
          const count_in_main_wallet = wallet.direct_income.count_in_main_wallet;
          const inc =
            Plans.level_income.income_type.value === "percentage"
              ? packageAmount * (Plans.level_income[level].value / 100)
              : Plans.level_income[level].value;

          if (count_in_main_wallet == 1) {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              {
                "main_wallet.value": wallet.main_wallet.value + inc,
                "direct_income.value": wallet.direct_income.value + inc,
                "direct_income.updated_on": new Date(),
                "main_wallet.updated_on": new Date()

              }
            );
            const tx_body = {
              user_Id: wallet.user_Id,
              to_from: user_Id,
              order_Id,
              tx_type: "Derect Income",
              debit_credit: "credit",
              source: `level_income`,
              wallet_type: 'main_wallet',
              amount: inc, status: 1,
              remark: `Recieved direct income from ${user_Id}`,
              level:index+1
            }
            const tarnsection = await saveTransection(tx_body);
            // console.log(index, "", inc);
          } else {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              {
                "direct_income.value": wallet.direct_income.value + inc,
                "direct_income.updated_on": new Date()
              }
            );
            const tx_body = {
              user_Id: wallet.user_Id,
              to_from: user_Id,
              order_Id,
              tx_type: "Derect Income",
              debit_credit: "credit",
              source: `level_income`,
              wallet_type: 'main_wallet',
              amount: inc, status: 1,
              remark: `Recieved direct income from ${user_Id}`,
              level:index+1
            }
            const tarnsection = await saveTransection(tx_body);
            // console.log("test");
          }
          sponsor = spo.sponsor_Id;
        } else {

          const count_in_main_wallet = wallet.level_income.count_in_main_wallet;
          const inc =
            Plans.level_income.income_type.value === "percentage"
              ? packageAmount * (Plans.level_income[level].value / 100)
              : Plans.level_income[level].value;

          if (count_in_main_wallet == 1) {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              {
                "main_wallet.value": wallet.main_wallet.value + inc,
                "level_income.value": wallet.level_income.value + inc,
                "level_income.updated_on": new Date(),
                "main_wallet.updated_on": new Date()

              }
            );
            const tx_body = {
              user_Id: wallet.user_Id,
              to_from: user_Id,
              order_Id,
              tx_type: "Level Income",
              debit_credit: "credit",
              source: `level_income`,
              wallet_type: 'main_wallet',
              amount: inc, 
              status: 1,
              remark: `Recieved direct income from ${user_Id}`,
              level:index+1
            }
            const tarnsection = await saveTransection(tx_body);

            // console.log(index, "", inc);
          } else {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              {
                "level_income.value": wallet.level_income.value + inc,
                "level_income.updated_on": new Date()
              }
            );
            const tx_body = {
              user_Id: wallet.user_Id,
              to_from: user_Id,
              order_Id,
              tx_type: "Derect Income",
              debit_credit: "credit",
              source: `level_income`,
              wallet_type: 'main_wallet',
              amount: inc,
              status: 1,
              remark: `Recieved direct income from ${user_Id}`,
              level:index+1
            }
            const tarnsection = await saveTransection(tx_body);
            // console.log("test");
          }
          sponsor = spo.sponsor_Id;
        }
      } else {
        sponsor = spo.sponsor_Id;
      }

    }
  }
  async roiLevelIncome(user_Id, level, packageAmount, packageDetails, order_Id) {
    const user = await User.getProfile(user_Id);
    var sponsor = user.sponsor_Id;
    const Plans = await packageDetails;
    for (let index = 1; index <= level; index++) {
      const spo = await UserData.findOne({ user_Id: sponsor });
      const level = `level_${index}`;
      if (!spo || Plans.level_income[level].value <= 0 || !Plans.level_income[level]) {
        break;
      }
      const wallet = await userWallet.findOne({ user_Id: spo.user_Id, 'level_income.wallet_status': 1 });
      if (wallet && wallet.active_direct.value >= Plans.level_income[level].direct_required) {
        if (index == 1) {
          const count_in_main_wallet = wallet.direct_income.count_in_main_wallet;
          const inc =
            Plans.level_income.income_type.value === "percentage"
              ? packageAmount * (Plans.level_income[level].value / 100)
              : Plans.level_income[level].value;

          if (count_in_main_wallet == 1) {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              {
                "main_wallet.value": wallet.main_wallet.value + inc,
                "direct_income.value": wallet.direct_income.value + inc,
                "direct_income.updated_on": new Date(),
                "main_wallet.updated_on": new Date()

              }
            );
            const tx_body = {
              user_Id: wallet.user_Id,
              to_from: user_Id,
              order_Id,
              tx_type: "Derect Income",
              debit_credit: "credit",
              source: `level_income`,
              wallet_type: 'main_wallet',
              amount: inc, status: 1,
              remark: `Recieved direct income from ${user_Id}`,
              level:index+1
            }
            const tarnsection = await saveTransection(tx_body);
            // console.log(index, "", inc);
          } else {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              {
                "direct_income.value": wallet.direct_income.value + inc,
                "direct_income.updated_on": new Date()
              }
            );
            const tx_body = {
              user_Id: wallet.user_Id,
              to_from: user_Id,
              order_Id,
              tx_type: "Derect Income",
              debit_credit: "credit",
              source: `level_income`,
              wallet_type: 'main_wallet',
              amount: inc, status: 1,
              remark: `Recieved direct income from ${user_Id}`,
              level:index+1
            }
            const tarnsection = await saveTransection(tx_body);
            // console.log("test");
          }
          sponsor = spo.sponsor_Id;
        } else {

          const count_in_main_wallet = wallet.level_income.count_in_main_wallet;
          const inc =
            Plans.level_income.income_type.value === "percentage"
              ? packageAmount * (Plans.level_income[level].value / 100)
              : Plans.level_income[level].value;

          if (count_in_main_wallet == 1) {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              {
                "main_wallet.value": wallet.main_wallet.value + inc,
                "level_income.value": wallet.level_income.value + inc,
                "level_income.updated_on": new Date(),
                "main_wallet.updated_on": new Date()

              }
            );
            const tx_body = {
              user_Id: wallet.user_Id,
              to_from: user_Id,
              order_Id,
              tx_type: "Level Income",
              debit_credit: "credit",
              source: `level_income`,
              wallet_type: 'main_wallet',
              amount: inc, 
              status: 1,
              remark: `Recieved direct income from ${user_Id}`,
              level:index+1
            }
            const tarnsection = await saveTransection(tx_body);

            // console.log(index, "", inc);
          } else {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              {
                "level_income.value": wallet.level_income.value + inc,
                "level_income.updated_on": new Date()
              }
            );
            const tx_body = {
              user_Id: wallet.user_Id,
              to_from: user_Id,
              order_Id,
              tx_type: "Derect Income",
              debit_credit: "credit",
              source: `level_income`,
              wallet_type: 'main_wallet',
              amount: inc,
              status: 1,
              remark: `Recieved direct income from ${user_Id}`,
              level:index+1
            }
            const tarnsection = await saveTransection(tx_body);
            // console.log("test");
          }
          sponsor = spo.sponsor_Id;
        }
      } else {
        sponsor = spo.sponsor_Id;
      }

    }
  }
}
const levelDistribution = new Distribution();
module.exports = { levelDistribution };
