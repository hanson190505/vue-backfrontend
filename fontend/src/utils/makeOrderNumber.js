//生成唯一编号
//arg传入相关表的简写字母
export function makeOrderNumber(arg) {
    const now = new Date()
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    String(month).length === 1 ? (month = "0" + month) : month;
    String(day).length === 1 ? (day = "0" + day) : day;
    const yyyyMMdd = `${year}${month}${day}`;
    let orderNumber = arg + yyyyMMdd + '-' + Math.random().toString(36).substr(2, 4);
    window.sessionStorage.setItem('orderNumber', orderNumber)
    return orderNumber
}