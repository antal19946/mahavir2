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
        level_1: {
            type: Number,
            default: 0
        },
        level_2: {
            type: Number,
            default: 0
        },
        level_3: {
            type: Number,
            default: 0
        },
        level_4: {
            type: Number,
            default: 0
        },
        level_5: {
            type: Number,
            default: 0
        },
        level_6: {
            type: Number,
            default: 0
        },
        level_7: {
            type: Number,
            default: 0
        },
        level_8: {
            type: Number,
            default: 0
        },
        level_9: {
            type: Number,
            default: 0
        },
        level_10: {
            type: Number,
            default: 0
        },
        level_11: {
            type: Number,
            default: 0
        },
        level_12: {
            type: Number,
            default: 0
        },
        level_13: {
            type: Number,
            default: 0
        },
        level_14: {
            type: Number,
            default: 0
        },
        level_15: {
            type: Number,
            default: 0
        },
        level_16: {
            type: Number,
            default: 0
        },
        level_17: {
            type: Number,
            default: 0
        },
        level_18: {
            type: Number,
            default: 0
        },
        level_19: {
            type: Number,
            default: 0
        },
        level_20: {
            type: Number,
            default: 0
        },
    },
    roi_income: {
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
            default: 0
        },
        status: {
            type: Number,
            default: 0
        }
    },
    difference_income: {
        status: {
            type: Number,
            default: 1
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

    }
})
const plan = new mongoose.model('plan', planSchema)
module.exports = plan