const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const { User } = require("../API/User/user");
const { upload } = require("../controller/commans/UploadFile");
const { Teams } = require("../API/User/getLevelTeam");
const { verifyToken } = require("../controller/commans/Auth");
const { Buy } = require("../API/User/buyPackage");
const projectSetup = require("../Controller/projectSetup");
const { Fund } = require("../API/AdminAD/addFund");
const advance_info = require("../Modals/advanceInfo");
const { Crons } = require("../Controller/crons");
const { Package } = require("../API/AdminAD/package");
const { Admin } = require("../API/AdminAD/admin");
const diff = require("../controller/diffDistribution");
var router = express.Router();
var jsonParser = bodyParser.json();
router.use(jsonParser)
router.get('/', (req, res) => {
    res.send("hello")
})
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
};

router.use(cors(corsOpts));
//////////////////////////////////////////////////////////////////////////////
router.get('/project_setup', async (req, res) => {
    const advance = await projectSetup.save_advance_info();
    const firstUser = await projectSetup.addFirstUser();
    const defaultPackage = await projectSetup.addDefaultPackage();
    const DefaultAdmin = await projectSetup.addDefaultAdmin();
    res.json({ advance, firstUser, defaultPackage, DefaultAdmin})
})

/////////////////////////////// Add Admin  /////////////////////////////////////////////
router.post('/create_admin', async (req, res) => {
    const advance = await Admin.addAdmin(req.body)
    res.json({ advance })
})
////////////////////////////////////////////////////////////////////////////////////
router.post('/register', async (req, res) => {
    const result = await User.register(req.body)
    res.json( result )
})
router.post('/is_sponsor_exist', async (req, res) => {
    const result = await User.isSponsorExist(req.body.sponsor)
    res.json( result )
})
router.post('/address_to_id', async (req, res) => {
    const result = await User.addressToId(req.body.address)
    res.json( result )
})
router.post('/login', async (req, res) => {
    const advance = await User.Login(req.body)
    res.json({ advance })
})
router.get('/get_profile', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const verification = await verifyToken(Authorization_Token);
        if (verification.status) {
            const Profile = await User.getProfile(verification.resp.user_Id)
            res.json({ status: true, Profile });
        } else {
            res.json({ verification });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.post('/update_profile', upload.single('file'), async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    let fileName = req?.file?.filename;
    let hostName = req.headers.host;
    const advance = await User.UpdateProfile(Authorization_Token, req.body, fileName, hostName)
    res.json({ advance })
})
router.get('/get_level_team', async (req, res) => {

    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const verification = await verifyToken(Authorization_Token);
        if (verification.status) {
            const level_Team = await Teams.getLevelTeam(verification.resp.user_Id, req.body.level)
            res.json({ status: true, level_Team });
        } else {
            res.json({ verification });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.post('/create_package', async (req, res) => {
    const advance = await Package.createPackage(req.body)
    res.json({ advance })
})
router.post('/generate_pin', async (req, res) => {
    const advance = await Package.generatePin(req.body)
    res.json({ advance })
})
router.post('/add_fund', async (req, res) => {
    const advance = await Fund.addFund(req.body)
    res.json({ advance })
})


// router.get('/test_level',async(req,res)=>{
//     const{user_Id,level,package_amount}=req.body
//     const advance =await levelDistribution.levelIncome(user_Id,level,package_amount)
//     res.json({advance})
// })
router.post('/buy_package', async (req, res) => {

    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const verification = await verifyToken(Authorization_Token);
        if (verification.status) {
            const advance = await advance_info.findOne()
            // res.json({advance})
            if (advance.Investment.topup_type.value == "pin") {
                const activateUser = await Buy.topupWithPin(verification.resp.user_Id, req.body)
                res.json({ activateUser });
            } else {
                const activateUser = await Buy.topupWithFund(verification.resp.user_Id, req.body)
                res.json({ activateUser });
            }
        } else {
            res.json({ verification });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.post('/roi_closing', async (req, res) => {
    const advance = await Crons.roi_closing()
    res.json({ advance })
})

module.exports = router;