/**
 * dexie --indexedDB的封装库;
 */
import Dexie  from 'dexie'

export default {
  install(Vue, options) {
    let db = new Dexie(options.name || 'database');
    db.version(1).stores({
      friends: "++id, name, age, *tags",
      gameSessions: "id, score"
    });

    // db.version(2).stores({
    //     friends: "++id, [firstName+lastName], yearOfBirth, *tags", // Change indexes
    //     gameSessions: null // Delete table
    //   })
    //   .upgrade(() => {
    //       return db.friends.modify(function (friend) {
    //         friend.firstName = friend.name.split(' ')[0];
    //         friend.lastName = friend.name.split(' ')[1];
    //         friend.birthDate = new Date(new Date().getFullYear() - friend.age, 0);
    //         delete friend.name;
    //         delete friend.age;
    //     });
    //   })

    Vue.prototype.$db = db;
  }
}
