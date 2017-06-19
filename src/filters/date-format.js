/**
 * 日期格式化的filters;
 */
export default function(date, format) {
  if(!date || date === '') return '';
  // date = parseInt(date);
  var t = new Date(date);
  var tf = function(i) {
    return (i < 10 ? '0' : '') + i;
  };

  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
      case 'MM':
        return tf(t.getMonth() + 1);
      case 'mm':
        return tf(t.getMinutes());
      case 'dd':
        return tf(t.getDate());
      case 'HH':
        return tf(t.getHours());
      case 'ss':
        return tf(t.getSeconds());
      default:
        return '';
    }
  });

}
