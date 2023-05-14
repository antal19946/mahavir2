class profile {
    async register(req, res) {
      const { name, email, phone, password, user_Id, sponsor_Id } = req.body;
      const velidUserName = await generateUserName(user_Id);
      const isEmail = await validator.validate(email);
      const isMobile = await validatePhoneNumber.validate(phone);
      const sponsor_Data = await UserData.findOne({ user_Id: sponsor_Id });
      const isexist = await UserData.findOne({ user_Id: velidUserName });
      const isStrongPassword = await generatePassword(password);
      const Error = await (!isMobile
        ? { status: false, massage: "please enter valid mobile number" }
        : !isEmail
        ? { status: false, massage: "please enter valid email" }
        : !velidUserName
        ? { status: false, massage: "please enter valid username" }
        : !isStrongPassword
        ? { status: false, massage: "please enter strong password" }
        : isexist
        ? { status: false, massage: "username already exist" }
        : !sponsor_Data
        ? { status: false, massage: "sponsor id not exist" }
        : { status: true, massage: "registration success" });
      if (Error.status) {
        const user = new UserData({
          name,
          email,
          phone,
          password: await hashPassword(isStrongPassword),
          user_Id: velidUserName,
          sponsor_Id,
          sponsor_Name: sponsor_Data.name,
        });
        const result = await user.save();
        const accessToken = await generateToken(result.user_Id);
        res.status(201).json({
          status: true,
          accessToken,
          password: isStrongPassword,
          result,
        });
      } else {
        res.status(400).json(Error);
      }
    }
    async getProfile(req, res) {
      const Authorization_Token = await req.header("Authorization");
      if (Authorization_Token) {
        jwt.verify(Authorization_Token, secrateKey(), function (err, resp) {
          if (err) {
            res.json({ status: false, err });
          } else {
            UserData.findOne({ user_Id: resp.user_Id }, async (err, result) => {
              if (err) {
                res.json({ status: false, err });
              } else {
                res.json({ status: true, result });
              }
            });
          }
        });
      } else {
        res.json({ status: false, message: "Failed to authenticate token." });
      }
    }
  
    async UpdateProfile(req, res) {
      const { name, email, phone } = req.body;
      let fileName = req?.file?.filename;
      let hostName = req.headers.host;
      const profile_pic = "http://" + hostName + "/" + fileName;
      const Authorization_Token = await req.header("Authorization");
      if (Authorization_Token) {
        jwt.verify(Authorization_Token, secrateKey(), function (err, resp) {
          if (err) {
            res.json({ err });
          } else {
            UserData.findOneAndUpdate(
              { user_Id: resp.user_Id },
              { name, email, phone, profile_pic },
              async (err, result) => {
                if (err) {
                  res.json(err);
                } else {
                  res.json(result);
                }
              }
            );
          }
        });
      } else {
        res.json("Failed to authenticate token.");
      }
    }
  }
  
  const generateUserName = async (userName) => {
    const advance = await advance_info.findOne();
    if (userName) {
      if (userName_structure.structure === "auto") {
        const userNmae = `${userName_structure.startwith}${Math.floor(
          Math.random() * (9999 - 1000 + 1) + 1000
        )}`;
        console.log(userNmae);
        return userNmae;
      } else if (userName_structure.structure === "manual") {
        var alfanum = /^[0-9a-zA-Z]+$/;
        if (userName.match(alfanum)) {
          console.log(true);
          return userName;
        } else {
          console.log(false);
          return false;
        }
      }
    } else {
      console.log("please enter user Id");
    }
  };
  
  const generatePassword = async (password) => {
    const password_structure = await passwordType.findOne();
    if (password_structure.structure === "auto") {
      return generateString(6);
    } else if (password_structure.structure === "manual") {
      if (password_structure.passwordType === "basic") {
        return password;
      } else if (password_structure.passwordType === "strong") {
        if (password.length === 7) {
          return password;
        } else {
          return false;
        }
      } else if (password_structure.passwordType === "strongest") {
        const isStrong = await passwordStrength(password).value;
        console.log(isStrong);
        if (isStrong === "Strong") {
          console.log(password);
          return password;
        } else {
          console.log(false);
          return false;
        }
      }
    }
  };
  
  const hashPassword = async (plaintextPassword) => {
    console.log("object", plaintextPassword);
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
  
//   const { getProfile, UpdateProfile, register } = new profile();
  
//   module.exports = { getProfile, UpdateProfile, register };