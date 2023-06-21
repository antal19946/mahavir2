const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const  upload  = require("../controller/commans/UploadFile");
const  Teams  = require("../API/User/getLevelTeam");
const  Auth  = require("../controller/commans/Auth");
const  Buy  = require("../API/User/buyPackage");
const projectSetup = require("../controller/ProjectSetup");
const  Fund  = require("../API/AdminAD/addFund");
const advance_info = require("../Modals/advanceInfo");
const  crons  = require("../controller/Crons");
const  Package  = require("../API/AdminAD/package");
const  Admin  = require("../API/AdminAD/admin");
const  homeData  = require("../API/User/homeData");
const Incomes = require("../API/User/incomeTransection");
const orderDetails = require("../API/User/getOrders");
const Withdraw = require("../API/User/withdrawal");
const Staking = require("../API/User/Stake");
const singleLeg = require("../controller/SingleLegDistribution");
const Royalty = require("../controller/Royalty");
const Dashboard = require("../API/AdminAD/DashboardData");
const Withdrawal = require("../API/AdminAD/withdrawal");
const user_data = require("../API/User/user");
const add_user = require("../API/AdminAD/addUser");
const planSetting = require("../API/AdminAD/PlanSetting");
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
// router.get('/react', (req, res) => {
//     res.sendFile(path.join(__dirname, '../','build', 'index.html'));
//   });
//////////////////////////////////////////////////////////////////////////////
router.get('/project_setup', async (req, res) => {
    const advance = await projectSetup.save_advance_info();
    const defaultPackage = await projectSetup.addDefaultPackage();
    const DefaultAdmin = await projectSetup.addDefaultAdmin();
    const firstUser = await projectSetup.addFirstUser();
    res.json({ advance, firstUser, defaultPackage, DefaultAdmin})
})

/////////////////////////////// Add Admin  /////////////////////////////////////////////
router.post('/create_admin', async (req, res) => {
    const advance = await Admin.addAdmin(req.body)
    res.json({ advance })
})
router.post('/admin_login', async (req, res) => {
    const result = await Admin.adminLogin(req.body)
    res.json({ result })
})
router.get('/get_dashboard_data', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Dashboard.getData()
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.get('/get_all_users', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Dashboard.getAllUsers()
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.post('/add_fake_user', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result = await add_user.fake(req.body)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.get('admin/get_incomes/:param', async (req, res) => {
    const param = req.params.param;
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Dashboard.getIncomes(param)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.get('/get_all_orders', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Dashboard.getOrders()
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.get('/get_withdrawal_data/:param', async (req, res) => {
    const param = req.params.param;
    console.log(param)
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Withdrawal.withdrawalData(param)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.post('/approve_withdrawal', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Withdrawal.approve(req.body)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.post('/reject_withdrawal', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Withdrawal.reject(req.body)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.post('/add_fund', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result =  await Fund.addFund(req.body)
            res.json({tokenStatus, status: true, result,message:result.message });
        } else {
            res.json({ tokenStatus, message: "Failed to authenticate token."  });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.post('/single_leg_income_setting', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result =  await planSetting.SL_distribution_setting(req.body)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus, message: "Failed to authenticate token."  });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.get('/get_single_leg_ranks', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyAdminToken(Authorization_Token);
        if (tokenStatus) {
            const result =  await planSetting.get_SL_rank()
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus, message: "Failed to authenticate token."  });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
////////////////////////////////////////////////////////////////////////////////////
router.post('/register', async (req, res) => {
    const result = await user_data.register(req.body)
    res.json( result )
})
router.post('/is_sponsor_exist', async (req, res) => {
    const result = await user_data.isSponsorExist(req.body.sponsor)
    res.json( result )
})
router.post('/address_to_id', async (req, res) => {
    const result = await user_data.addressToId(req.body.address)
    res.json( result )
})
router.post('/login', async (req, res) => {
    const result = await user_data.Login(req.body)
    res.json({ result })
})
router.get('/get_profile', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await user_data.getProfile(resp.user_Id)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.get('/get_wallet', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await homeData.getWallet(resp.user_Id)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.get('/get_currency',async(req,res)=>{
    const result = await homeData.getCurrency();
    res.json(result)
})
router.get('/self_investment', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await homeData.getSelfInvestment(resp.user_Id)
            res.json({ tokenStatus,status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.post('/update_profile', upload.single('file'), async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    let fileName = req?.file?.filename;
    let hostName = req.headers.host;
    const advance = await user_data.UpdateProfile(Authorization_Token, req.body, fileName, hostName)
    res.json({ advance })
})
router.get('/get_level_team', async (req, res) => {

    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const level_Team = await Teams.getLevelTeam(resp.user_Id, req.body.level)
            res.json({tokenStatus, status: true, level_Team });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.get('/get_direct_team', async (req, res) => {

    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Teams.getDirectTeam(resp.user_Id)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.get('/get_single_leg_goals', async (req, res) => {

    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await singleLeg.singleLegGoal(resp.user_Id)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.get('/get_royalty_goals', async (req, res) => {

    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Royalty.royaltyGoal(resp.user_Id)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.get('/get_incomes/:param', async (req, res) => {
    const param = req.params.param;
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Incomes.getIncomes(resp.user_Id,param)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.get('/get_today_incomes/:param', async (req, res) => {
    const param = req.params.param;
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Incomes.getTodayIncome(resp.user_Id,param)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.get('/get_orders', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await orderDetails.getAllorder(resp.user_Id)
            res.json({tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.post('/withdraw', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Withdraw.withdrawal(resp.user_Id,req.body)
            res.json({tokenStatus, result });
        } else {
            res.json({ tokenStatus });
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



// router.get('/test_level',async(req,res)=>{
//     const{user_Id,level,package_amount}=req.body
//     const advance =await levelDistribution.levelIncome(user_Id,level,package_amount)
//     res.json({advance})
// })
router.post('/buy_package', async (req, res) => {

    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const advance = await advance_info.findOne()
            // res.json({advance})
            if (advance.Investment.topup_type.value == "pin") {
                const activateUser = await Buy.topupWithPin(resp.user_Id, req.body)
                res.json({tokenStatus,result:activateUser});
            } else if(advance.Investment.topup_type.value == "fund") {
                const activateUser = await Buy.topupWithFund(resp.user_Id, req.body)
                res.json( {tokenStatus,result:activateUser} );
            } else if(advance.Investment.topup_type.value == "dap") {
                const activateUser = await Buy.topupWithDap(resp.user_Id, req.body)
                res.json( {tokenStatus,result:activateUser} );
            }else if(advance.Investment.topup_type.value == "API") {
                const activateUser = await Buy.topupWithAPI(resp.user_Id, req.body)
                res.json( {tokenStatus,result:activateUser} );
            }
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.post('/stake', async (req, res) => {

    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
                const stakeUser = await Staking.stake(resp.user_Id, req.body)
                res.json({tokenStatus,result:stakeUser});
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }

})
router.post('/confirm_order', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await Buy.confirmOrder(resp.user_Id,req.body)
            res.json({ tokenStatus, status: true, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.get('/is_active', async (req, res) => {
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const {tokenStatus,resp} = await Auth.verifyToken(Authorization_Token);
        if (tokenStatus) {
            const result = await user_data.isActive(resp.user_Id)
            res.json({ tokenStatus, result });
        } else {
            res.json({ tokenStatus });
        }
    } else {
        res.json({ status: false, message: "Failed to authenticate token." });
    }
})
router.post('/roi_closing', async (req, res) => {
    const advance = await crons.roi_closing()
    res.json({ advance })
})
router.get('/get_deposit_details', async (req, res) => {
    const advance = await Buy.getDeposit()
    res.json({ result:advance })
})
router.get('/update_singleleg_and_rank', async (req, res) => {
   const result =  await singleLeg.single_leg_rank_remaining_time()
    res.json({ result })
})
router.get('/single_leg_closing_static', async (req, res) => {
   const result =  await singleLeg.single_leg_closing_static()
    res.json({ result })
})
router.get('/royalty_rank', async (req, res) => {
   const result =  await Royalty.royalty_rank_closing()
    res.json({ result })
})
router.get('/royalty_closing', async (req, res) => {
   const result =  await Royalty.royalty_closing()
    res.json({ result })
})

module.exports = router;