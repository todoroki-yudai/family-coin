/**
 * manager for sequelize
 */

import { Sequelize } from "sequelize";

const sequelize = new Sequelize('family', 'root', 'family', {
  host: 'mysql', // TODO: To config
  dialect: 'mysql'
});

// TODO model部分はあとで別ファイルにまとめる
// https://havelog.ayumusato.com/develop/javascript/e232-orm_sequelize_tasting.html
export const User = sequelize.define('users', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true
  // },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true,
  timestamps: false
});

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
