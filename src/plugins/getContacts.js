/**
 *  从名字中获取到首字母和名称的数组
*/
import getFirstChart from './getFirstChart';

//  通讯录人员首大写字母排序;
// export function Contact(userList) {
//     // console.log(getFirstChart('冯羽'))   // ["SXT"]
//     return userList.reduce((prev, cur, index, array) => {
//         if (!prev.some(title => title.title === getFirstChart(cur.name)[0].charAt(0).toUpperCase())) {
//             // console.log(getFirstChart(cur.name)[0].charAt(0).toUpperCase())
//             // if (!prev.some(title => title.title === cur.userid.charAt(0).toUpperCase())) {
//             prev.push({
//                 title: getFirstChart(cur.name)[0].charAt(0).toUpperCase(),
//                 // title: cur.userid.charAt(0).toUpperCase(),
//                 list: [cur]
//             });
//             // prev[prev.length].title = cur.userid.charAt(0).toUpperCase()     // 好像不能这样用;
//             // prev[prev.length].list = cur;
//         } else {
//             prev.forEach(title => {
//                 if (title.title === getFirstChart(cur.name)[0].charAt(0).toUpperCase()) {
//                     // if (title.title === cur.userid.charAt(0).toUpperCase()) {
//                     title.list.push(cur)
//                 }
//             })
//         }
//         return prev;
//     }, [])
// }

export default function contact(userList) {
    const indexLetters = [],
          users = [],
          lestters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K','L','M','N','O','P','Q',
          'R','S','T','U','V','W','X','Y','Z','#']
    lestters.forEach((letter) => {
        const filters = userList.filter(el => {
          const name = el.RealName || el.UserName
          return getFirstChart(name)[0].charAt(0).toUpperCase() === letter
        })
        if(filters.length > 0) {
          users[indexLetters.length] = filters
          indexLetters.push(letter)
        }
    })

  return {
    letters: indexLetters,
    users
  }
}
