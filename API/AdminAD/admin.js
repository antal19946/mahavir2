const adminData = require("../../Modals/admin");

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
}
const Admin = new admin();
module.exports = Admin;