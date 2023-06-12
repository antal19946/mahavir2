const user_data = require("../API/User/user");
const UserData = require("../Modals/Users");
const userWallet = require("../Modals/userWallet");
const saveTransection = require("./commans/SaveTransections");

class Roi_level {
  constructor() {}
  async roiLevelIncome(
    user_Id,
    level,
    packageAmount,
    packageDetails
  ) {
    const user = await user_data.getProfile(user_Id);
    var sponsor = user.sponsor_Id;
    const { roi_level_income } = await packageDetails;
    for (let index = 0; index < level; index++) {
      const spo = await UserData.findOne({ user_Id: sponsor });
      if (
        !spo ||
        roi_level_income.level[index].value <= 0 ||
        !roi_level_income.level[index]
      ) {
        break;
      }
      const wallet = await UserData.findOne({ user_Id: spo.user_Id });
      if (
        wallet &&
        wallet.active_direct.value >=
          roi_level_income.level[index].direct_required
      ) {
        const inc =
          roi_level_income.income_type.value === "percentage"
            ? packageAmount * (roi_level_income.level[index].value / 100)
            : roi_level_income.level[index].value;
        const tx_body = {
          user_Id: wallet.user_Id,
          to_from: user_Id,
          order_Id: null,
          tx_type: "Roi Level Income",
          debit_credit: "credit",
          source: `roi_level_income`,
          wallet_type: "main_wallet",
          amount: inc,
          status: 1,
          remark: `Recieved Roi Level Income income from ${user_Id}`,
          level: index + 1,
        };
        const tarnsection = await saveTransection(tx_body);
        const updateWallet = await userWallet.findOneAndUpdate(
          { user_Id: wallet.user_Id },
          {
            "main_wallet.value": wallet.main_wallet.value + inc,
            "roi_level_income.value": wallet.roi_level_income.value + inc,
          }
        );
        sponsor = spo.sponsor_Id;
      } else {
        sponsor = spo.sponsor_Id;
      }
    }
  }
}
const roiLevel=new Roi_level();
module.exports = roiLevel;
