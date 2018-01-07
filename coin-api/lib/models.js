/**
 * manager for sequelize
 */

var Sequelize = require("sequelize");

const sequelize = new Sequelize('family', 'root', 'family', {
  host: 'mysql', // TODO: To config
  dialect: 'mysql'
});
module.exports.sequelize = sequelize


// TODO model部分はあとで別ファイルにまとめる
// https://havelog.ayumusato.com/develop/javascript/e232-orm_sequelize_tasting.html
const User = sequelize.define('users', {
  username: {type: Sequelize.STRING},
  password: {type: Sequelize.STRING},
  address: {type: Sequelize.STRING}
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


// sequelize.query("select * from users").spread((results, metadata) => {
//   console.log(results);
//   sequelize.close();
// })

// syncメソッドは最初の一度切り
// sequelize.sync(function(errs)
// {
//     console.log('DATABASE SYNC', errs);
// });

/**
 * ユーザーを作成
 */
// function createUser(name, privateKey) {
//   // DBにデータ保存
//   var user = new User({
//       name: name,
//       privateKey: privateKey
//   });
//   user.save();
// }
