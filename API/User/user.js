const Auth = require("../../controller/commans/Auth");
const UserData = require("../../Modals/Users");
const advance_info = require("../../Modals/advanceInfo");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const userWallet = require("../../Modals/userWallet");
const Ranks = require("../../Modals/ranks");
const plan = require("../../Modals/plan");

class user {
  constructor() {
    this.advance = null;
    // this.getAdvance();
    // this.test()
  }
  // async test(){
  //   const {single_leg_plan} = await plan.findOne({'single_leg_plan.status':1});
  //   const rank_name = [];
  //   single_leg_plan.ranks.map((rank)=>{
  //     let rrr = {
  //       rank_name:rank.rank_name,
  //       status:0
  //     }
  //     rank_name.push(rrr)
  //   })
  //   console.log(rank_name)
  // }
  async isActive(user_Id){
    try {
      const user = await UserData.findOne({user_Id,status:1})
      if (user) {
        return {status:true}
      } else {
        return {status:false}
      }
    } catch (error) {
      return {status:false}
    }
  }
  async getAdvance() {
    const advanceInfo = await advance_info.findOne()
    this.advance = advanceInfo
  }
  async generateUserName(userName) {
    const { user_gen_method, user_gen_prefix, user_gen_digit } = this.advance.Registration;
    if (userName) {
      if (user_gen_method.value === "automatic") {
        const number =
          Math.floor(
            Math.random() * ((10 ** (user_gen_digit.value) - 1) - 10 ** (user_gen_digit.value - 1) + 1) + 10 ** (user_gen_digit.value - 1)
          );
        const userNmae = `${user_gen_prefix.value}${number}`;
        return ({ status: true, userName: userNmae });
      } else if (user_gen_method.value === "manual") {
        var alfanum = /^[0-9a-zA-Z]+$/;
        if (userName) {
          return ({ status: true, userName });
        } else {
          return ({ status: false, message: "please enter valid username" });
        }
      }
    } else {
      return ({ status: false, message: "please enter username" });
    }
  };
  async isMobile(mobile) {
    if (mobile > 1000000000) {
      const mobile_users = await UserData.find({ mobile }).count()
      if (mobile_users < this.advance.Registration.mobile_users.value) {
        return ({ status: true })
      } else {
        return ({ status: false, message: "Mobile number already exist" })
      }
    } else {
      return ({ status: false, message: "Please enter valid mobile number" })
    }
  }
  async isEmail(email) {
    const isEmail = await validator.validate(email);
    if (isEmail) {
      const email_users = await UserData.find({ email }).count()
      if (email_users < this.advance.Registration.email_users.value) {
        return ({ status: true })
      } else {
        return ({ status: false, message: "email ID already exist" })
      }
    } else {
      return ({ status: false, message: "Please enter valid email ID" })
    }
  }
  async generatePassword(password) {
    const { pass_gen_method, pass_gen_fun, pass_gen_digit,is_password_required } = this.advance.Registration;
    if (is_password_required.value == "yes") {
      if (pass_gen_method.value === "automatic") {
        return generateString(pass_gen_digit.value);
      } else if (pass_gen_method.value === "manual") {
        if (pass_gen_fun.value === "basic") {
          if (password?.length >= 4) {
            return ({ status: true, password });
          } else {
            return ({ status: false, message: "password should be minimum 4 characters" });
          }
        } else if (pass_gen_fun?.value === "strong") {
          if (password?.length === 8) {
            return ({ status: true, password });
          } else {
            return ({ status: false, message: "password should be minimum 8 characters" });
          }
        } else if (pass_gen_fun.value === "strongest") {
          const isStrong = await passwordStrength(password).value;
          if (isStrong === "Strong") {
            return ({ status: true, password });
          } else {
            return ({ status: false, message: "password must contain at least one uppercase character one lowercase character and one number" });
          }
        }
      }
    } else {
      return ({ status: true, password:'null' });
    }
    
  };
  async isSponsorExist(sponsor){
    const sponsor_Data = await UserData.findOne({ user_name: sponsor })
    if (sponsor_Data) {
      return ({
        status: true,
        sponsor_Id: sponsor_Data.user_Id,
      });
    } else {
      return(
        {
          status: false,
          sponsor_Data,
        }
      )
    }
    
  }
  async sponsor(sponsor) {
    this.getAdvance();
    const { is_sponsor_active_required } = this.advance.Registration;
    const sponsor_Data = await UserData.findOne({ user_name: sponsor })
    // console.log(sponsor_Data)
    if (sponsor_Data) {
      if (is_sponsor_active_required.value === "yes") {
        if (sponsor_Data.status == 1) {
          return ({ status: true, sponsor_Id:sponsor_Data.user_Id, name: sponsor_Data.name })
        } else {
          return ({ status: false, message: "sponsor not active" })
        }
      } else {
        return ({ status: true, sponsor_Id:sponsor_Data.user_Id, name: sponsor_Data.name })
      }
    } else {
      return ({ status: false, message: "Invalid sponsor" })
    }

  }
  async addressToId(user_name){
        const Id = await UserData.findOne({user_name});
        if (Id) {
          return ({ status: true, Id:Id.user_Id });
        } else {
          return ({ status: false, message: "Invalid address" })
        }
  }
  async register(body) {
    console.log(body)
    try {
      const {single_leg_plan,royalty_plan} = await plan.findOne();
      const { is_mobile_required,is_email_required,is_password_required } = this.advance.Registration;
      const { name, email, mobile, password, sponsor,user_name } = body;
      const velidUserName = await this.generateUserName(user_name);
      console.log(velidUserName)
      const isEmail =  this.isEmail(email);
      const isMobile =  this.isMobile(mobile);
      const sponsor_Data = await this.sponsor(sponsor);
      const isexist = await UserData.findOne({ user_name: velidUserName.userName });
      const isStrongPassword =is_password_required.value=="yes"? await this.generatePassword(password):{status:true};
      const total_users = await UserData.find().count()
      if (isMobile.status === false) {
        return isMobile
      }
      if (isEmail.status === false) {
        return isEmail
      }
      if (!velidUserName.status) {
        return { status: false, message: "please enter valid username" }
      }
      if (!isStrongPassword.status) {
        return isStrongPassword
      }
      if (isexist) {
        return { status: false, message: "username already exist" }
      }
      if (!sponsor_Data.status) {
        return sponsor_Data
      }
      const Error = await (
        !isMobile.status
        ? isMobile
        : !isEmail.status
          ? isEmail
          : !velidUserName.status
            ? { status: false, message: "please enter valid username" }
            : !isStrongPassword.status
              ? isStrongPassword
              : isexist
                ? { status: false, message: "username already exist" }
                : !sponsor_Data.status
                  ? sponsor_Data
                  : { status: true, message: "registration success" });
        const ErrorVerify = await Error.status;
        if (!ErrorVerify) {
          return Error;
        }
      if (ErrorVerify) {
        const user = await new UserData({
          name,
          email,
          mobile,
          password:is_password_required.value=="yes"? await hashPassword(isStrongPassword?.password):password,
          user_name: velidUserName.userName,
          user_Id:(total_users+1),
          sponsor_Id:sponsor_Data.sponsor_Id,
          sponsor_Name: sponsor_Data.name,
          joining_date: new Date()
        });
        const result = await user.save();
        const wallet = new userWallet({
          user_Id: result.user_Id
        })
        const single_leg_rank = [];
        const royalty_rank = [];
        single_leg_plan.ranks.map((rank)=>{
          let rrr = {
            rank_name:rank.rank_name,
            status:0,
            remaining_time:null
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
          user_Id: result.user_Id,
          single_leg_rank,
          royalty_rank
        });
        const saveRank = await rank.save();
        const savewallet = await wallet.save()
        const accessToken = await Auth.generateToken(result.user_Id);
        return { status: Error.status, message: Error.message, accessToken, result }
      } else {
        return Error
      }
    } catch (error) {
      return error;
    }
   
  }
  async getProfile(user_Id) {

    const Profile = await UserData.findOne({ user_Id })
    return Profile;

  }

  async UpdateProfile(Authorization_Token, body, fileName, hostName) {
    const { name, email, mobile } = body;

    const profile_pic = "http://" + hostName + "/" + fileName;
    if (Authorization_Token) {
      const verification = await Auth.verifyToken(Authorization_Token)
      if (verification.status) {
        const update = await UserData.findOneAndUpdate(
          { user_Id: verification.resp.user_Id },
          { name, email, mobile, profile_pic })
        return { status: true, update };
      } else {
        return verification;
      }

    } else {
      return ({ status: false, message: "Failed to authenticate token." });
    }
  }
  async Login(body) {
    const { is_password_required } = this.advance.Registration;
    const { user_name, password } = body
    const UserDetail = await UserData.findOne({ user_name })
    try {
      if (UserDetail) {
        const comparePassword = is_password_required.value=="yes"? await bcrypt.compare(password, UserDetail.password):true;
        if (UserDetail && comparePassword) {
          const accessToken = await Auth.generateToken(UserDetail.user_Id)
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
          status: false, message: "username or Passwords dose NOT match!"
        })
      }
    } catch (e) {
      return ({
        status: false, messsage: "username or Passwords dose NOT match!"
      })

    }

  }
}

const hashPassword = async (plaintextPassword) => {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return await hash;
};
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const user_data = new user();
module.exports =  user_data;

