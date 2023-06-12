const UserData = require("../../Modals/Users");
const order = require("../../Modals/orders");
const transection = require("../../Modals/transction");

class dashboard {
  constructor() {
  }
  async getData() {
    const allUsers = await UserData.find();
    const activeUsers = allUsers.filter((data) => {
      return data.status == 1;
    });
    const allOders = await order.find({ status: 1 });
    const total_order_amount = allOders.reduce(
      (acc, obj) => acc + obj.order_amount,
      0
    );
    const allTransection = await transection.find();
    const totalIncome = allTransection.filter((data) => {
      return (
        data.status == 1 &&
        data.debit_credit == "credit" &&
        data.wallet_type == "main_wallet"
      );
    });
    const total_income = totalIncome.reduce((acc, obj) => acc + obj.amount, 0);
    const pendingWithdrawal = allTransection.filter((data) => {
      return (
        data.status == 0 &&
        data.debit_credit == "debit" &&
        data.source == "withdrawal"
      );
    });
    const approvedWithdrawal = allTransection.filter((data) => {
      return (
        data.status == 1 &&
        data.debit_credit == "debit" &&
        data.source == "withdrawal"
      );
    });
    const rejectedWithdrawal = allTransection.filter((data) => {
      return (
        data.status == 2 &&
        data.debit_credit == "debit" &&
        data.source == "withdrawal"
      );
    });
    const total_pending_withdrawal = pendingWithdrawal.reduce(
      (acc, obj) => acc + obj.amount,
      0
    );
    const total_approved_withdrawal = approvedWithdrawal.reduce(
      (acc, obj) => acc + obj.amount,
      0
    );
    const total_rejected_withdrawal = rejectedWithdrawal.reduce(
      (acc, obj) => acc + obj.amount,
      0
    );
    const result = [
      { all_users: allUsers.length },
      { active_users: activeUsers.length },
      { total_investment: total_order_amount },
      { total_income },
      { total_pending_withdrawal },
      { total_approved_withdrawal },
      { total_rejected_withdrawal },
    ];
    return result;
  }
  async getAllUsers() {
    try {
      const all_users = await UserData.find();
      return all_users;
    } catch (error) {
      return error;
    }
  }
  async getOrders(){
    const allOders = await order.find({ status: 1 });
    return allOders;
  }
  async getIncomes(param){
    const incomes = await transection.find({source:param,status:1});
    return incomes;
}
}
const Dashboard = new dashboard();
module.exports = Dashboard;
