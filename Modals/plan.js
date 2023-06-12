const mongoose = require('mongoose')
// const validator = require('validator')


const planSchema = new mongoose.Schema({
    package_type: {
        package_name: {
            type: String,
            unique: true,
            default: "Starter"
        },
        package_type: {
            type: String,
            default: null
        },
        min_amount: {
            type: Number,
            default: 1
        },
        max_amount: {
            type: Number,
            default: 1e18
        },
        status: {
            type: Number,
            default: 1
        },
        added_on: {
            type: String,
            default: new Date()
        },
        updated_on: {
            type: String,
            default: null
        }
    },
    level_income: {
        status: {
            type: Number,
            default: 1
        },
        income_type: {
            options: {
                type: String,
                default: "percentage,fix"
            },
            value: {
                type: String,
                default: "percentage"
            }
        },
        level_1: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 10
            }
        },
        level_2: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 9
            }
        },
        level_3: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 8
            }
        },
        level_4: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 7
            }
        },
        level_5: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 6
            }
        },
        level_6: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 5
            }
        },
        level_7: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 4
            }
        },
        level_8: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 3
            }
        },
        level_9: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 2
            }
        },
        level_10: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 1
            }
        },
        level_11: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_12: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_13: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_14: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_15: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_16: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_17: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_18: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_10: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_20: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
    },
    roi_level_income: {
        status: {
            type: Number,
            default: 0
        },
        income_type: {
            options: {
                type: String,
                default: "percentage,fix"
            },
            value: {
                type: String,
                default: "percentage"
            }
        },
        level:
        {
            type: Array,
            default: [
                {
                    "level": 1,
                    "value":10,
                    "direct_required": 1
                },
                {
                    "level": 2,
                    "value":10,
                    "direct_required": 1
                },
                {
                    "level": 3,
                    "value":10,
                    "direct_required": 1
                },
                {
                    "level": 4,
                    "value":10,
                    "direct_required": 1
                },
                {
                    "level": 5,
                    "value":10,
                    "direct_required": 1
                },
                {
                    "level": 6,
                    "value":10,
                    "direct_required": 1
                },
                {
                    "level": 7,
                    "value":10,
                    "direct_required": 1
                },
                {
                    "level": 8,
                    "value":10,
                    "direct_required": 1
                },
                {
                    "level": 9,
                    "value":10,
                    "direct_required": 1
                },
                {
                    "level": 10,
                    "value":10,
                    "direct_required": 1
                }
            ]
        }

        
    },
    roi_income: {
        status:{
            type:Number,
            default:0
        },
        income_type: {
            options: {
                type: String,
                default: "percentage,fix"
            },
            value: {
                type: String,
                default: "percentage"
            }
        },
        value: {
            type: Number,
            default: 2
        },
        status: {
            type: Number,
            default: 0
        }
    },
    staking_income: {
        status:{
            type:Number,
            default:0
        },
        income_type: {
            options: {
                type: String,
                default: "percentage,fix"
            },
            value: {
                type: String,
                default: "percentage"
            }
        },
        stakes: {
            type: Array,
            default: [
                {
                    "days": 1,
                    "value": 0.4
                },
                {
                    "days": 7,
                    "value": 0.8
                },
                {
                    "days": 15,
                    "value": 1
                },
                {
                    "days": 30,
                    "value": 1.2
                },
                {
                    "days": 90,
                    "value": 1.5
                },
                {
                    "days": 180,
                    "value": 1.8
                },
                {
                    "days": 365,
                    "value": 2
                },
            ]
        }
    },
    difference_income: {
        status: {
            type: Number,
            default: 0
        },
        ranks:
        {
            type: Array,
            default: [
                {
                    "min_investment": 2000,
                    "max_investment": 4999,
                    "value": 5
                },
                {
                    "min_investment": 5000,
                    "max_investment": 10999,
                    "value": 7
                },
                {
                    "min_investment": 11000,
                    "max_investment": 24999,
                    "value": 9
                },
                {
                    "min_investment": 25000,
                    "max_investment": 59999,
                    "value": 11
                },
                {
                    "min_investment": 60000,
                    "max_investment": 124999,
                    "value": 13
                },
                {
                    "min_investment": 125000,
                    "max_investment": 269999,
                    "value": 16
                },
                {
                    "min_investment": 270000,
                    "max_investment": 499999,
                    "value": 19
                },
                {
                    "min_investment": 600000,
                    "max_investment": 1499999,
                    "value": 22
                },
                {
                    "min_investment": 1500000,
                    "max_investment": 3999999,
                    "value": 27
                },
                {
                    "min_investment": 4000000,
                    "max_investment": 1000000000,
                    "value": 31
                }
            ]
        }

    },
    single_leg_plan:{
        status: {
            type: Number,
            default: 1
        },
        fix_closing_amount:{
            type:Number,
            default:1000
        },
        ranks:
        {
            type: Array,
            default: [
                {
                    "min_team": 1,
                    "max_team": 10000,
                    "direct_required":1,
                    "rank_name":"star1",
                    "value": 25
                },
                {
                    "min_team": 2,
                    "max_team": 10000,
                    "direct_required":1,
                    "rank_name":"star2",
                    "value": 25
                },
                {
                    "min_team": 3,
                    "max_team": 10000,
                    "direct_required":1,
                    "rank_name":"star3",
                    "value": 25
                },
                {
                    "min_team": 4,
                    "max_team": 10000,
                    "direct_required":1,
                    "rank_name":"star4",
                    "value": 25
                }
            ]
        }
    },
    royalty_plan:{
        status: {
            type: Number,
            default: 1
        },
        fix_closing_amount:{
            type:Number,
            default:1000
        },
        ranks:
        {
            type: Array,
            default: [
                {
                    "min_team_required": 0,
                    "max_days": 10,
                    "direct_required":1,
                    "rank_name":"star1",
                    "value": 25
                },
                {
                    "min_team_required": 0,
                    "max_days": 10,
                    "direct_required":2,
                    "rank_name":"star2",
                    "value": 25
                },
                {
                    "min_team_required": 0,
                    "max_days": 10,
                    "direct_required":3,
                    "rank_name":"star3",
                    "value": 25
                },
                {
                    "min_team_required": 0,
                    "max_days": 10,
                    "direct_required":4,
                    "rank_name":"star4",
                    "value": 25
                }
            ]
        }
    }
})
const plan = new mongoose.model('plan', planSchema)
module.exports = plan