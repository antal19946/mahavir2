var jwt = require('jsonwebtoken');
const secrateKey = "secretkeyappearsheregdsahgdahdcasdfdcasgdfdafsadf\dsasdajsdghf\dhashdga\sdfhfdj"

class Auth{
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
              return{tokenStatus:false, err}
            }else{
                return {tokenStatus:true, resp}
            }
        }
        )
    }
}
const {generateToken,verifyToken} = new Auth()
module.exports = {generateToken,verifyToken}