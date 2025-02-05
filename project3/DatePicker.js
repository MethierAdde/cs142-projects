const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
function DatePicker(id,callback){
    this.id = id;
    this.callback =callback;
}
DatePicker.prototype.render = function(date){
    let iscurr = 0;// 因为有个很奇怪的要求，只有在本月点击某一天才调用callback
    let htmlstr = "";
    htmlstr += `<span id = "${this.id}prev"> < </span>`;
    htmlstr += `<span id = "${this.id}curr">${months[date.getMonth()]},${date.getFullYear()}</span>`;
    htmlstr += `<span id = "${this.id}succ"> > </span>`;
    htmlstr += 
    `<table id = "${this.id}calendar">
    </table>
    `;
    let elem = document.getElementById(this.id);
    elem.innerHTML = htmlstr;

    let cal = document.getElementById(this.id + "calendar");
    let prev = document.getElementById(this.id + "prev");
    let curr = document.getElementById(this.id + "curr");
    let succ = document.getElementById(this.id + "succ");
    let tableelems;
    let id = this.id;
    let callback = this.callback;
    getcalendar();
    //获取日历的HTML代码
    function getcalendar(){
        let calhtml = "";
        calhtml += `
        <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
        </tr>
        `;
        let firstday = new Date(date.getTime());
        firstday.setDate(1);
        let lastDay = new Date(date.getTime());
        lastDay.setMonth(date.getMonth() + 1);
        lastDay.setDate(0);

        let daynum = lastDay.getDate();
        let padnum = firstday.getDay();
        let weeknum = (daynum+padnum+6)/7 - 1;
        let pad = 0;
        let day = 0;
        for(let i = 0;i < weeknum;i++){
            let weekhtml=`<tr>`;
            for(let j=0;j<7;j++){
                if(pad<padnum){
                    pad++;
                    weekhtml+='<td></td>';
                }
                else{
                    if(day<daynum){
                        day++;
                        weekhtml += `<td class = "${id}day">${day}</td>`;
                    }
                    else{
                        weekhtml +=`<td></td>`;
                    }
                }
            }
            weekhtml+='</tr>';
            calhtml += weekhtml;
        }

        cal.innerHTML = calhtml;
        //设置事件响应函数
        tableelems = document.getElementsByClassName(id+"day");
        for(let i=0;i<daynum;i++)
        {
            tableelems[i].onclick = ()=>{
                if(iscurr===0){
                    let fixedday = {"day":i+1,"month":months[date.getMonth()],"year":date.getFullYear()};
                    callback(id,fixedday);
                }
            }
        }
    }
    function changemonth(adder){
        iscurr += adder;
        date.setMonth(date.getMonth() + adder);
        getcalendar();
        curr.innerHTML = months[date.getMonth()] + "," + date.getFullYear();
    }

    prev.onclick = ()=>{changemonth(-1)};
    succ.onclick = ()=>{changemonth(1)};
}