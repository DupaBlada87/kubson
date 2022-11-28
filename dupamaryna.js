delete reloadSVGcaptcha;
function reloadSVGcaptcha(){}

var kody;
GAME.emitOrder = (data) => GAME.socket.emit('ga',data);
$("body").append("<div style='position:fixed; top:130px; right:0px; z-index:999;'><input type='text' name='kody_capt' /><button id='save_capt'>zapisz</button></div>");

$("#save_capt").click(() => {
    kody = $("input[name='kody_capt']").val();
    console.log(kody);
});
var postać=document.getElementById("char_list_con").children[0].attributes[2].value;  // postać z konta do czekania

var bb = 5;
var whatNow=0;
var stop=true;
var wait=1000
var checkSSJ=true;
var czas=0;
let soul_fight = true;
let what_to_train = 1;
let code_bool = true;
let what_to_traintime = 1;

$(document).bind('keydown', '1', function(){
        if(JQS.chm.is(":focus") == false){
          $('#gh_game_helper .gh_pvp').click()
        }
        return false;
    });
const $css = "#gh_game_helper {min-width:150px; padding:5px; border:solid gray 1px; background:rgba(22, 22, 93, 0.81); color:gold; position: fixed; top: 40px; right: 5px; z-index:5;}#gh_game_helper .gh_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px;}";

const $html = "<div class='gh_button gh_pvp'>Kody <b class='gh_status red'>Off</b></div>";
const $html2 = "<div id='soulfight' class='gh_button'>Otchłań <b class='gh_status green'>On</b></div>";
const $html3 = "<label class='select_input'><select id='bot_what_to_train'><option value='1'>Siła</option><option value='2'>Szybkość</option><option value='3'>Wytrzymałość</option><option value='4'>Siła Woli</option><option value='5'>Energia Ki</option><option value='6'>Wtajemniczenie</option></select></label>";
const $html4 = "<label class='select_input'><select id='bot_what_to_traintime'><option value='1'>1 godz.</option><option value='2'>2 godz.</option><option value='3'>3 godz.</option><option value='4'>4 godz.</option><option value='5'>5 godz.</option><option value='6'>6 godz.</option><option value='7'>7 godz.</option><option value='8'>8 godz.</option><option value='9'>9 godz.</option><option value='10'>10 godz.</option><option value='11'>11 godz.</option><option value='12'>12 godz.</option></select></label>";

$('body').append("<div id='gh_game_helper'>"+$html+$html2+$html3+$html4+"</div>").append("<style>"+$css+"</style>");


$('#gh_game_helper .gh_pvp').click(() => {
	if (stop) {
		$('#gh_game_helper .gh_pvp')
		$(".gh_pvp .gh_status").removeClass("red").addClass("green").html("On");
		stop = false
		start();
		
	} else {
		$('#gh_game_helper .gh_pvp')
		$(".gh_pvp .gh_status").removeClass("green").addClass("red").html("Off");
		stop = true
	}
});

$('#bot_what_to_train').change((e) => {
	what_to_train = parseInt($(e.target).val());
});

$('#bot_what_to_traintime').change((e) => {
	what_to_traintime = parseInt($(e.target).val());
});
$('#soulfight').click(() => {
	if(soul_fight) {
		$("#soulfight .gh_status").removeClass("green").addClass("red").html("Off");
	} else {
		$("#soulfight .gh_status").removeClass("red").addClass("green").html("On");
	}
	soul_fight = !soul_fight;
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
			tren();
		break;
		case 2:
			whatNow++;
			kodyy();
		break;
		case 3:
			whatNow++;
			if(soul_fight) {
				checkTR();
			}
		break;
		case 4:
			whatNow++;
			if(soul_fight) {
				prepareSoulFight();
			}
		break;
		case 5:
			whatNow++;
			if(soul_fight) {
				otchłań();
			}
		break;
		case 6:
			whatNow=0;
			out();
		break;
		default:
	}
} else 
	window.setTimeout(start,wait);
}
	
function kodyy(){
	if(code_bool) {
		code_bool = false;
		GAME.socket.emit('ga',{a:8,type:5,code:kody,apud:'vzaaa'});
	}
	window.setTimeout(start,wait);
}

function out(){
    //GAME.emitOrder({a:2,char_id:postać});
    window.setTimeout(start,wait);
}

function prepareSoulFight() {
	GAME.socket.emit('ga',{a:59,type:0});
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
		GAME.socket.emit('ga',{a:8,type:2,stat:what_to_train,duration:what_to_traintime,code:kody});
		window.setTimeout(start,wait);
	}
}

function servertimecheck(){
	czas = $("#server_time").text()
	czas = czas.split(":")
	if(czas[1] <= bb){
		window.setTimeout(start,wait);
	} else {
		if(!code_bool) {
			code_bool = true;
		}
		
		whatNow = 3;
		window.setTimeout(start,10000);
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