var arr = [];
function setData(blank1, token, blank2){
    clearItems()
    if (localStorage.token){             
      arr = [];
    }
    arr.push(token);
    localStorage.token = JSON.stringify(arr);
}
function getData(blank1, blank2){
   // if (localStorage.token != "" && localStorage.token != [""]){         
   //    console.log(JSON.parse(localStorage.getItem('token')));
   //    return JSON.parse(localStorage.getItem('token')); 
   // }else 
   if($("#token-autenction").val() != ""){
      console.log($("#token-autenction").val());
      return $("#token-autenction").val();
   }
   return "";
}
function clearItems(){
   arr = [];
   localStorage.token = JSON.stringify(arr);   
}


// function setData(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//   let expires = "expires="+d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + "; Set-Cookie: flavor=choco; SameSite=None; Secure; path=/";
// }

// function getData(cname) {
//   let name = cname + "=";
//   let ca = document.cookie.split(';');
//   for(let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// var db = openDatabase("Authorization", "2.0", "conjifs", 4048);
// db.transaction(function(create){
//   create.executeSql("CREATE TABLE login (id INTEGER PRIMARY KEY, token TEXT)")
// })

// function setData(id=1, token, blank) {
//   if(getData(id) != null && !!getData(id) == false){
//     db.transaction(function(insert){
//       insert.executeSql("INSERT INTO login (id, token) VALUES (?, ?)",[1, token]);
//       getData(id);
//     });
//   }else{
//     db.transaction(function(update){
//       update.executeSql("UPDATE login SET token = ? WHERE id = ? ",[token, 1]);
//       getData(id);
//     });
//   }
// }
// function getData(id){
//     if(id==1){
//       $.when(
//         selectData,
//         selectData
//       ).done(function(fn1, fn2){
//           fn1(id);
//           fn2(id);
//       });
//       id++;
//       setTimeout(getData, 100, id);
//     }
//     return token.token;
// }
// function selectData(id) {
//   db.transaction(function(select){
//       select.executeSql("SELECT token FROM login WHERE id = ?",[1], function(tx, results) {
//         let rows = results.rows;
//         for (var i = 0; i < rows.length; i++) {
//           token = rows[i];
//         }
//       });
//     });
// }