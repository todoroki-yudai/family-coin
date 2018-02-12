/**
 * manager for sequelize
 */

var moment = require("moment");

var Sequelize = require("sequelize");
const Op = Sequelize.Op;

const sequelize = new Sequelize('family', 'root', 'family', {
  host: 'mysql', // TODO: To config
  dialect: 'mysql'
});
module.exports.sequelize = sequelize


// TODO model部分はあとで別ファイルにまとめる
// https://havelog.ayumusato.com/develop/javascript/e232-orm_sequelize_tasting.html
const User = sequelize.define('users', {
  username: {type: Sequelize.STRING},
  email: {type: Sequelize.STRING},
  password: {type: Sequelize.STRING},
  address: {type: Sequelize.STRING},
  balance: {type: Sequelize.INTEGER}
}, {
  freezeTableName: true,
  timestamps: false
});
module.exports.User = User


const UserBalanceLog = sequelize.define('users_balance_log', {
  address: {type: Sequelize.STRING},
  balance: {type: Sequelize.INTEGER}
}, {
  freezeTableName: true,
  timestamps: false
});
UserBalanceLog.getBalance = async (address) => {
  let log = await UserBalanceLog.findAll({
    limit: 1,
    where: { address: address },
    order: [[ 'created_at', 'DESC' ]]
  })
  return new Promise((resolve, reject) => {
    balance = 0
    if (log.length > 0) {
      balance = log[0].balance;
    }
    resolve(balance);
  });
};
UserBalanceLog.getBalanceLatest = async () => {
  sql = `
  SELECT a.*
  FROM users_balance_log AS a
  INNER JOIN (SELECT address, MAX(created_at) AS most_recently_created_at
                                FROM users_balance_log
                                GROUP BY address) AS b
  ON a.address = b.address
  AND a.created_at = b.most_recently_created_at;
  `;
  let logs = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT})
  return new Promise((resolve, reject) => {
    resolve(logs);
  });
};
module.exports.UserBalanceLog = UserBalanceLog


const Transaction = sequelize.define('transactions', {
  sender_address: {type: Sequelize.STRING},
  receiver_address: {type: Sequelize.STRING},
  message: {type: Sequelize.STRING},
  amount: {type: Sequelize.INTEGER}
}, {
  freezeTableName: true,
  timestamps: false
});
module.exports.Transaction = Transaction


const Deposit = sequelize.define('deposits', {
  user_id: {type: Sequelize.INTEGER},
  currency_type: {type: Sequelize.STRING},
  amount: {type: Sequelize.INTEGER},
  deposited_at: {
    type: Sequelize.DATE,
    get: function() {
      return moment.utc(this.getDataValue('deposited_at')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});
module.exports.Deposit = Deposit


const ThanksTerm = sequelize.define('thanks_term', {
  start_date: {
    type: Sequelize.DATEONLY,
    get: function() {
      return moment.utc(this.getDataValue('start_date')).format('YYYY-MM-DD');
    }
  },
  end_date: {
    type: Sequelize.DATEONLY,
    get: function() {
      return moment.utc(this.getDataValue('end_date')).format('YYYY-MM-DD');
    }
  },
  is_sent: {type: Sequelize.BOOLEAN}
}, {
  freezeTableName: true,
  timestamps: false
});
ThanksTerm.getLatest = async () => {
  let result = await ThanksTerm.findOne({
    order: [[ 'end_date', 'DESC' ]]
  })
  return new Promise((resolve, reject) => {
    resolve(result);
  });
};
ThanksTerm.getByTargetData = async (targetDate) => {
  let result = await ThanksTerm.findOne({
    where: {
      start_date: {
        [Op.lte]: targetDate
      },
      end_date: {
        [Op.gte]: targetDate
      }
    }
  })
  return new Promise((resolve, reject) => {
    resolve(result);
  });
};
module.exports.ThanksTerm = ThanksTerm
