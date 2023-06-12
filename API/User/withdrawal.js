const advance_info = require("../../Modals/advanceInfo");
const company_info = require("../../Modals/companyInfo");
const userWallet = require("../../Modals/userWallet");
const saveTransection = require("../../controller/commans/SaveTransections");

class withdraw {
    async withdrawal(user_Id, body) {
        const {withdrawal} = await advance_info.findOne()
        const { amount } = body;
        const { main_wallet,total_withdrawal } = await userWallet.findOne({ user_Id })
        const {currency_sign} = await company_info.findOne();
        const tx_charge = amount*(withdrawal.tx_charge/100);

        if ( amount>=withdrawal.min_withdrawal ) {
            if (main_wallet.value >= amount) {
                const updateWallet = await OneAndUpdate({user_Id},{'main_wallet.value':main_wallet.value-amount,'total_withdrawal.value':(total_withdrawal.value+parseInt(amount))})
            const tx_body = {
                user_Id,
                to_from: null,
                order_Id: null,
                tx_type: "withdrawal",
                debit_credit: "debit",
                source: `withdrawal`,
                wallet_type: 'total_withdrawal',
                amount:amount-tx_charge,
                tx_charge,
                status: 0

            }
            const transection = await saveTransection(tx_body);
            return { status: true, transection };
            } else {
                return { status: false, message: 'Insufficient balance' }
            }
        } else {
            return { status: false, message: `The amount should be greater than ${withdrawal.min_withdrawal}${currency_sign}.` }
        }

    }
}
const Withdraw = new withdraw()
module.exports = Withdraw;