function setData(cname, cvalue, exdays) {
  localStorage.setItem(cname, cvalue);

  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + "; Set-Cookie: flavor=choco; SameSite=None; Secure; path=/";
}

function getData(cname) {
  valueS = localStorage.getItem(cname);
  valueC = "";
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      valueC = c.substring(name.length, c.length);
    }
  }
  if(valueC != "" && valueC != null){
    return valueC;
  }
  return valueS;
}
