// kd_reset.js v0.1

/*
7 - % do siły
11 - % do energii ki
13 - % do obrażeń
14 - % do redukcji obrażeń
15 - % do efektywności treningu
16 - % do doświadczenia
17 - % do szansy na trafienie krytyczne
18 - % do redukcji szansy na otrzymanie trafienia krytycznego
51 - % do obrażeń od technik
52 - % redukcji obrażeń od technik
53 - % do szansy na moc z walk PvM
54 - % do ilości mocy z walk PvM
55 - % do szansy na zdobycie przedmiotu z walk PvM
56 - minut(a) krótsze wyprawy
57 - % do szansy powodzenia wypraw
58 - % do szansy na ulepszenie przedmiotów
59 - % do szansy na połączenie przedmiotów
60 - % do obrażeń od trafień krytycznych
61 - % redukcji obrażeń od trafień krytycznych
62 - % do mocy za wygrane walki wojenne
63 - % do skuteczności podpaleń
64 - % do skuteczności krwawień
65 - % do odporności na podpalenia
66 - % do odporności na krwawienia
67 - % do szansy na zdobycie PSK
68 - % do punktów PvP za wygrane walki
69 - % do szansy na 3x więcej punktów PvP za wygrane walki
70 - % do szansy na 3x więcej doświadczenia za wygrane walki PvM
71 - % do mocy za skompletowanie SK
72 - % do mocy za skompletowanie PSK
73 - minut(y) do czasu trwania błogosławieństw
74 - % do szansy na spotkanie legendarnych potworów
75 - minut(y) krótszy cooldown między walkami PvP
76 - % zwiększenie własnej szybkości
77 - % obniżenie szybkości przeciwnika
78 - % do szansy na zdobycie Niebieskiego Senzu
79 - % mniejsze obrażenia od podpaleń
80 - % mniejsze obrażenia od krwawień
81 - % do szansy na zdobycie Scoutera
91 - % do wtajemniczenia
99 - % większy limit dzienny Niebieskich Senzu
134 - % do szansy na zdobycie CSK z potworów legendarnych // do ulepszania synergii
139 - % do ilości zdobywanych kryształów instancji
140 - % do przyrostu Punktów Akcji
154 - % do sławy za walki w wojnach imperiów
160 - % do boskiego atrybutu przewodniego
163 - % więcej Boskiej Ki za CSK
171 - % do max Punktów Akcji
*/

var kd_wanted_bons = [16, 70, 74, 171]; //bonusy które cie interesują 

var kd_bons;

GAME.emit = function (order, data, force) {
	if (!this.is_loading || force) {
		this.load_start();
		this.socket.emit(order, data);
	} else if (this.debug) console.log('failed order', order, data);
}
GAME.emitOrder = function (data, force = false) {
	this.emit('ga', data, force);
}


Array.prototype.compare = function (testArr) {
	if (this.length != testArr.length) return false;
	for (var i = 0; i < testArr.length; i++) {
		if (this[i].compare) { //To test values in nested arrays
			if (!this[i].compare(testArr[i])) return false;
		} else if (this[i] !== testArr[i]) return false;
	}
	return true;
}

GAME.parseData = function (type, res) {
	switch (type) {
		case 55: //kula energii
			kd_bons = []
			$('.ss_stats tr').css("background", "transparent");
			var ball = res.ball;
			var bd = res.bd;
			this.ball_id = ball.id;
			var grade = '';
			for (var g = 1; g <= bd.grade; g++) grade += '<img src="/gfx/ekw_pages/star.png" />';
			$('#ss_name').text(ball[this.lang_data['nauki'][this.lang]]);
			$('#ss_level').text(bd.level);
			$('#ss_grade').html(grade);
			$('#ss_exp').text(this.dots(bd.exp) + '/' + this.dots(bd.next_lvl));
			if (bd.exp >= bd.next_lvl) $('#ss_lvlup').show();
			else $('#ss_lvlup').hide();
			var w = bd.exp / bd.next_lvl * 100;
			if (w < 0) w = 0;
			if (w > 100) w = 100;
			$('#ss_exp_barer').animate({
				'width': w + '%'
			}, 500);
			$('#ss_synergy_lvl').text(bd.synergy_lvl);
			$('#ss_synergy').text(this.dots(this.char_data.synergy) + '/' + this.dots(bd.synergy_next));
			var w = this.char_data.synergy / bd.synergy_next * 100;
			if (w < 0) w = 0;
			if (w > 100) w = 100;
			$('#ss_syn_barer').animate({
				'width': w + '%'
			}, 500);
			var change = 0,
				changer = false;
			if (res.ss_change) {
				changer = true;
				$('#ss_changed').show();
			} else {
				$('#ss_changed').hide();
			}
			for (var s = 1; s <= 9; s++) {
				if (ball['stat' + s]) {
					if (kd_wanted_bons.includes(ball['stat' + s])) {
						kd_bons.push(ball['stat' + s]);
						$('#stat' + s + '_bon').parent().css("background", "#80008075");
					}
					$('#stat' + s + '_val').text(ball['stat' + s + '_val']);
					$('#stat' + s + '_bon').text(this.item_stat(ball['stat' + s]));
					$('#ss_stat' + s + '_progress').text(bd['stat' + s] + '%');
					$('#ss_stat' + s + '_barer').animate({
						'width': bd['stat' + s] + '%'
					}, 500);
					var ch = '';
					if (changer) {
						var diff = res.ss_change[s];
						var diff = res.ss_change[s];
						change += diff;
						if (diff == 0) ch = '0%';
						else if (diff < 0) ch = '<span class="red">' + diff + '%</span>';
						else ch = '<span class="green">+' + diff + '%</span>';
					}
					$('#ss_change_' + s).html(ch);
					$('#stat' + s + '_con').show();
				} else $('#stat' + s + '_con').hide();
			}

			if (!kd_bons.sort().compare(kd_wanted_bons.sort())) {
				GAME.emitOrder({
					a: 45,
					type: 1,
					bid: GAME.ball_id
				});
			}


			$('#ss_reset_stack').text(res.resets);
			$('#ss_upgrade_stack').text(res.upgrades);
			var ch = '';
			if (change == 0) ch = '0%';
			else if (change < 0) ch = '<b class="red">' + change + '%</b>';
			else ch = '<b class="green">+' + change + '%</b>';

			$('#up_change').html(ch);
			$('#soulstone_interface').show();
			break;
	}
}