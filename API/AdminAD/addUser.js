const UserData = require("../../Modals/Users");
const user_data = require("../User/user");

class addUser {
  constructor() {
    // this.fake(10,"0x71Eb064642d22d967740e36F7a5FE7338C80D0e7")
  }
  async generateString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async fake(body) {
    try {
      const { num } = body;
      for (let index = 0; index < num; index++) {
            const user_Id = await UserData.find().count();
            const user = new UserData({
                status:1,
                user_Id:user_Id+1,
                sponsor_Id:1,
                Activation_date:new Date()
            });
            const result = await user.save()
            console.log(result)       
      }
      return { status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }
}

const add_user = new addUser();
module.exports = add_user;
