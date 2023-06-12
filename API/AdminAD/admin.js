const adminData = require("../../Modals/admin");
const Auth = require("../../controller/commans/Auth");
const bcrypt = require("bcrypt");
class admin{
   async addAdmin(body){
    try {
        const admin = new adminData(body)
        const result = await admin.save()
        return result;
    } catch (error) {
        return error;
    }
   }
   async adminLogin(body) {
    const { user, password } = body
    const UserDetail = await adminData.findOne({ user })
    try {
      if (UserDetail) {
        const comparePassword =  await bcrypt.compare(password, UserDetail.password);
        if (UserDetail && comparePassword) {
          const accessToken = await Auth.generateToken(UserDetail.user)
          return ({
            accessToken,
            status: true,
            UserDetail
          })
        } else {
          return ({
            status: false, message: "username or Passwords dose NOT match!"
          })
        }
      } else {
        return ({
          status: false, message: "username or Passwords dose NOT match!wwwwww"
        })
      }
    } catch (e) {
      return ({
        status: false, messsage: "username or Passwords dose NOT match!"
      })

    }

  }
}
const Admin = new admin();
module.exports = Admin;