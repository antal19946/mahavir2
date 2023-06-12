var jwt = require('jsonwebtoken');
const adminData = require('../../Modals/admin');
const secrateKey = "secretkeyappearsheregdsahgdahdcasdfdcasgdfdafsadf\dsasdajsdghf\dhashdga\sdfhfdj"

class Authtoken{
    constructor(auth) {
      this.user_Id = auth
      }
    generateToken(user_Id){
       return jwt.sign(
            { user_Id},
            secrateKey,
            { expiresIn: "1h" }
          )

    }
    verifyToken(auth){
     return jwt.verify(auth,secrateKey, function (err, resp) {
            if (err) {
              console.log("here",err)
              return{tokenStatus:false, err}
            }else{
              console.log("hereis",err)
                return {tokenStatus:true, resp}
            }
        }
        )
    }
    verifyAdminToken(auth){
     return jwt.verify(auth,secrateKey, async function (err, resp) {
            if (err) {
              return{tokenStatus:false, err}
            }else{
              const admin = await adminData.findOne({user:resp.user_Id})
              console.log("",resp.user)
              if (admin) {
                return {tokenStatus:true, resp}
              } else {
                return {tokenStatus:false}
              }
            }
        }
        )
    }
}
const Auth = new Authtoken()
module.exports = Auth;