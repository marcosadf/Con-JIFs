function formatDate(date, hours) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        hours = d.getHours() == 0? "00": d.getHours();
        min = d.getMinutes() == 0? "00": d.getMinutes();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if(hours){
        return `${day}/${month}/${year} ${hours}:${min}`;
    }else{
        return `${day}/${month}/${year}`;
    }
}