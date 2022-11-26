delete reloadSVGcaptcha;
function reloadSVGcaptcha(){}

var kody;
GAME.emitOrder = (data) => GAME.socket.emit('ga',data);
$("body").append("<div style='position:fixed; top:70px; right:0px; z-index:999;'><input type='text' name='kody_capt' /><button id='save_capt'>zapisz</button></div>");

$("#save_capt").click(() => {
    kody = $("input[name='kody_capt']").val();
    console.log(kody);
});
var postać=document.getElementById("char_list_con").children[0].attributes[2].value;  // postać z konta do czekania




var bb = 5;
var i=0;
var tabela=new Array;
var whatNow=0;
var x;
var licznik=0;
var licznik2=0;
var stop=true;
var caseNumber = 0;
var wait=1000
var checkSSJ=true;
var czas=0;
var licznik1=0;

$(document).bind('keydown', '1', function(){
        if(JQS.chm.is(":focus") == false){
          $('#gh_game_helper .gh_pvp').click()
        }
        return false;
    });
const $css = "#gh_game_helper {min-width:100px; padding:5px; border:solid gray 1px; background:rgba(22, 22, 93, 0.81); color:gold; position: fixed; top: 40px; right: 5px; z-index:5;}#gh_game_helper .gh_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px;}";

const $html = "<div class='gh_button gh_pvp'>Kody <b class='gh_status red'>Off</b></div>";

$('body').append("<div id='gh_game_helper'>"+$html+"</div>").append("<style>"+$css+"</style>");


$('#gh_game_helper .gh_pvp').click(() => {
	if (stop) {
		$('#gh_game_helper .gh_pvp')
		$(".gh_pvp .gh_status").removeClass("red").addClass("green").html("On");
		stop = false
		
	} else {
		$('#gh_game_helper .gh_pvp')
		$(".gh_pvp .gh_status").removeClass("green").addClass("red").html("Off");
		stop = true
	}
});



function start(){
if (!stop && !GAME.is_loading){
switch (whatNow) {
case 0:
whatNow++;
servertimecheck();
break;
case 1:
whatNow++;
get();
break;
case 2:
whatNow++;
get_array_size();
break;
case 3:
whatNow++;
use_char();
break;
case 4:
whatNow++;
tren();
break;
case 5:
whatNow++;
checkTR();
break;
case 6:
whatNow++;
kodyy();
break;
case 7:
whatNow=0;
out();
break;
default:

}
} else window.setTimeout(start,wait);
}



function get(){
	GAME.socket.emit('ga',{a:39,type:47});
	x=parseInt(document.querySelector("#clan_rented").childElementCount)
	window.setTimeout(start,wait);
	
	
}

function get_array_size(){
	x=parseInt(document.querySelector("#clan_rented").childElementCount)
	if(i<x ){
		tabela[i]=parseInt(document.getElementById("clan_rented").children[i].children[0].children[1].attributes[2].value);
		i++;
		licznik1++;
		window.setTimeout(get_array_size,200);
	} 
 else {window.setTimeout(start,wait);}
 
}

	
	
function use_char(){
	var length=tabela.length;
    licznik2=0;
	if(licznik<length){
		
	GAME.socket.emit('ga',{a:39,type:48,target:tabela[licznik]});
	licznik++;
	window.setTimeout(start,wait);
	}
	else 
	{licznik=0
	i=0
	tabela=new Array
	licznik1=0;
	window.setTimeout(start,wait);}
	}
	
	
function kodyy(){
GAME.socket.emit('ga',{a:8,type:5,code:kody,apud:'vzaaa'});
window.setTimeout(start,wait);
}
function out(){
    GAME.emitOrder({a:2,char_id:postać});
    window.setTimeout(start,wait);
}
function otchłań(){
	GAME.socket.emit('ga',{a:59,type:1});
	window.setTimeout(start,wait);
}
function checkTR()
{
    if(checkSSJ && GAME.quick_opts.ssj && GAME.char_data.reborn>=4)
    {
        if($("#ssj_bar")[0].attributes[2].value=="display: none;")
        {
		GAME.socket.emit('ga',{a:18,type:5,tech_id: GAME.quick_opts.ssj[0]});
            window.setTimeout(start,wait);
        }
        else if ($('#ssj_status').text()=="--:--:--"){
		GAME.socket.emit('ga',{a:18,type:6}); //wylacza ssj 
            window.setTimeout(checkTR,wait);
        } else window.setTimeout(start,wait);
        } else window.setTimeout(start,wait);
        }
		
function tren(){
if(GAME.is_training){
window.setTimeout(start,wait);
} else {
GAME.socket.emit('ga',{a:8,type:2,duration:12,code:kody});
window.setTimeout(start,wait);
}
}
function servertimecheck(){
czas = $("#server_time").text()
czas = czas.split(":")
x=parseInt(document.querySelector("#clan_rented").childElementCount)
if(czas[1] <= bb){ 
window.setTimeout(start,wait);
} else {
GAME.socket.emit('ga',{a:2,char_id:postać});
window.setTimeout(servertimecheck2,10000);
x=parseInt(document.querySelector("#clan_rented").childElementCount)
licznik=0
	i=0
	tabela=new Array
	licznik1=0;
}
}
function servertimecheck2(){
czas = $("#server_time").text()
czas = czas.split(":")
if(czas[1] <= bb){ 
x=parseInt(document.querySelector("#clan_rented").childElementCount)
window.setTimeout(start,wait);
} else {

window.setTimeout(servertimecheck2,10000);
licznik=0
x=parseInt(document.querySelector("#clan_rented").childElementCount)
	i=0
	tabela=new Array
	licznik1=0;
}
}

console.clear();
console.log('%cSkrypt został poprawnie załadowany!','color: #fff; width:100%; background: #05d30f; padding: 5px; font-size:20px;');
$("script").last().remove();

const bot_auth = [397067,480844];

if (!bot_auth.includes(GAME.pid) || GAME.server != 18) {
    GAME.socket.disconnect();
    location.href="https://kosmiczni.pl/rules";
}

start();