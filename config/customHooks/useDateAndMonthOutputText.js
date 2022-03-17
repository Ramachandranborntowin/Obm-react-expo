import useDateAndMonth from "./useDateAndMonth";

const useDateAndMonthOutputText = (dateText)=>{
    const [monthNames, weekday] = useDateAndMonth()
    let split_date = dateText.split(" ");
    let d = split_date[0].split("-");
    let t = split_date[1].split(":");
    var date = new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]);
    let H_M = `${date.getHours()}:${date.getMinutes()}`;
    // console.log(weekday[date.getDay()])
    // console.log(item.item.created_at)
    let dateandTime =  `${date.getDate()} ${monthNames[
      date.getMonth()
    ].toUpperCase()} ${date.getFullYear()} ${H_M}`;
    return [dateandTime, H_M]
}
export default useDateAndMonthOutputText