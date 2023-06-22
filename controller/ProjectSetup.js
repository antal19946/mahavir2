const UserData = require("../Modals/Users");
const advance_info = require("../Modals/advanceInfo");
const userWallet = require("../Modals/userWallet");
const  Package  = require("../API/AdminAD/package");
const bcrypt = require("bcrypt");
const adminData = require("../Modals/admin");
const company_info = require("../Modals/companyInfo");
const Ranks = require("../Modals/ranks");
const plan = require("../Modals/plan");

class setup {
    constructor() {

    }
    async addDefaultAdmin() {
        const admin = new adminData({
            user: 'admin',
            type: 'admin',
            password: await hashPassword("test"),
            email: 'admin@gmail.com',
            mobile: null,
            created_on: new Date()
        });
        const result = await admin.save();
        return result;
    }
    async addFirstUser() {
      const {single_leg_plan,royalty_plan} = await plan.findOne({'single_leg_plan.status':1});
        const user = new UserData({
            name: "demo",
            email: "demo@gmail.com",
            mobile: '1111111111',
            password: await hashPassword("test"),
            user_name:'TWB8DNixF2kqV1jmf91vQtXNmk4soqzywN',
            user_Id: 1,
            status: 1,
            sponsor_Id: "",
            joining_date: new Date()
        });
        const single_leg_rank = [];
        const royalty_rank = [];
        single_leg_plan.ranks.map((rank)=>{
          let rrr = {
            rank_name:rank.rank_name,
            status:0
          }
          single_leg_rank.push(rrr)
        })
        royalty_plan.ranks.map((rank)=>{
          let rrr = {
            rank_name:rank.rank_name,
            status:0
          }
          royalty_rank.push(rrr)
        })
        const rank = new Ranks({
          user_Id: 1,
          single_leg_rank,
          royalty_rank
        });
        const saveRank = await rank.save();
        const result = await user.save();
        const wallet = new userWallet({
            user_Id: result.user_Id
        })
        const savewallet = await wallet.save()
        return result;
    }
    async save_advance_info() {
        const advance = new advance_info()
        const company = new company_info()
        const isAdvanse = await advance_info.find().count()
        if (isAdvanse < 1) {
            await advance.save()
            await company.save()
            return ({ isAdvanse })
        } else {
            return ({ isAdvanse, message: "advance info already saved" })
        }
    }
    async addDefaultPackage() {
        const body = {
            package_name: 'starter',
            min_amount: 1,
            mex_amount: 1000000000
        }
        const defaultPackage = await Package.createPackage(body);
        return defaultPackage;
    }

}

const hashPassword = async (plaintextPassword) => {
    console.log("object", plaintextPassword);
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return await hash;
};

const projectSetup = new setup();
module.exports = projectSetup;