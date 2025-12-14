function save_login()
{
	var e = document.getElementById('input_login');
    var login = e.value.trim();
    localStorage.setItem("g_saved_login", login);
    localStorage.setItem("g_my_login", login);
    if (login == '')
    {
		e.style.border = "2px solid red";
    }
    else
		setTimeout(()=>{ window.location = 'level1.html'; }, 100);
}

function start_eval()
{
	var lvl = Math.round(6 + 4*Math.random());
    localStorage.setItem("g_my_login", '');
	localStorage.setItem("g_my_eval", JSON.stringify([lvl]));
	setTimeout(()=>{ window.location = 'level'+lvl+'.html'; }, 100);
}

function load_login()
{
    var login;
    if (!(login = localStorage.getItem("g_saved_login")))
        login = ''; // will means full random during sim.
    return (login);
}