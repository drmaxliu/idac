$(document).ready(function() {

  // hide user specific information for js
  var ud2 = $('#user_data');
  ud2.hide();
  ud2 = $('#user_status');
  // ud2.hide();
  ud2 = $('#user_level_code');
  //ud2.hide();
  ud2 = $('#user_answer');
  //ud2.hide();

	// hide all test structures at the beginning
	var test_types = ['', 'a', 'b', 'c', 'd', 'r'];
	for(i=1;i<7;i++) {
		for(j=0;j<6;j++) {
			$('#test_group_' + i.toString() + test_types[j]).hide();
			$('#test_description_' + i.toString() + test_types[j]).hide();
			if(i==3 || i==4) $('#test_content_3a4').hide();
      else $('#test_content_' + i.toString()).hide();
		}
	}
	$('#audio_recording').hide();
	$('#record_buttons').hide();
	$('#video_controls').hide();

	$('#test_item').hide();
	$('#test_item_extra').hide();

  $('#record_alert').hide();
  $('#answer_alert').hide();
  $('#video_end_handle').hide();
  $('#show_instruction').hide();
  $('#hide_instruction').hide();
  $('#hide_logout').hide();
  $('#show_logout').hide();

  $('#test_buttons').hide();
  $('#tester_answer').hide();
  $('#tester_answer_submit').hide();
  $('#welcome').show();

  $('#user_test_date_1i').css('width', "70px");
  $('#user_test_date_2i').css('width', "70px");
  $('#user_test_date_3i').css('width', "70px");
  $('#user_bot_1i').css('width', "70px");
  $('#user_bot_2i').css('width', "70px");
  $('#user_bot_3i').css('width', "70px");
  $('#user_level').css("width", "50px");


  var level;
  var status;
  var exercise_mode = true;
  var group_id;
  var jump2test = false;

  var group_idx;
  var item_idx;
  var test_start, test_end;
  var exer_start, exer_end;

  // level 1:
  // 1b: 10, 1a: 2, 2b: 10, 2a: 2, 3b:10, 3a: 2 (overlapped with level 2: 4 problems each)
  // 4a: 5, 4b: 5, 4c: 5
  // 5a: 
  var level_1x = ['1b', 1, 2, 1, 10, '1a', 1, 2, 1, 2, '2b', 1, 2, 1, 10, '2a', 1, 2, 1, 2];
  // var level_1x = ['5a', 1, 2, 1, 2, '5b', 1, 2, 1, 2, '2b', 1, 2, 1, 10, '2a', 1, 2, 1, 2];
  var level_1y = ['3b', 1, 2, 1, 10, '3a', 1, 2, 1, 2, '4b', 1, 2, 1, 5, '4c', 1, 2, 1, 5];
  var level_1z = ['5a', 1, 2, 1, 14, '6', 1, 1, 1, 5];
  var level_1 = level_1x.concat(level_1y, level_1z);

  // level 2:
  // 1b: 2, 1a: 10, 2b: 2, 2a: 10, 3b:2, 3a: 10 (overlapped with level and level 3: 4 problems each)
  // 4a: 5, 4c: 6, 4d: 6
  // 5a: 5b: 6:
  var level_2x = ['1b', 1, 2, 9, 10, '1a', 1, 2, 1, 10, '2b', 1, 2, 9, 10, '2a', 1, 2, 1, 10];
  var level_2y = ['3b', 1, 2, 9, 10, '3a', 1, 2, 1, 10, '4b', 1, 2, 4, 8, '4c', 1, 2, 4, 8];
  var level_2z = ['5a', 1, 2, 10, 20, '5b', 1, 2, 1, 3, '6', 1, 1, 3, 7];
  var level_2 = level_2x.concat(level_2y, level_2z);

  // level 3
  // 1a: 4, 1c: 10, 2a: 4, 2c: 10, 3a: 4, 3c: 10 (overlapped with level 2: 4 problems each)
  // 4b: 5, 4c: 5, 4d: 7
  //
  var level_3x = ['1a', 1, 2, 7, 10, '1c', 1, 2, 1, 10, '2a', 1, 2, 7, 10, '2c', 1, 2, 1, 10];
  var level_3y = ['3a', 1, 2, 7, 10, '3c', 1, 2, 1, 10, '4b', 1, 2, 6, 10, '4c', 1, 2, 6, 10];
  var level_3z = ['5a', 1, 2, 18, 20, '5b', 1, 2, 1, 10, '6', 1, 1, 6, 9];
  var level_3 = level_3x.concat(level_3y, level_3z);

  var level_joint = [level_1, level_2, level_3];
  var level_selected;

  var video_list_1 = ['WMTlMRHSI9s', 'BP--0Z-tmNk', '2-GK492jJ2Y', 'Izq1E6b4WlQ', 'DF4TJueMBzs', 'yoO6PR1wwbg', 'dJo6NNLFNeo', '8_U5dJd-rig', 'vyaubRJ-5GA', 'tzhTaoIQPXA'];
  var video_list_2 = ['rD_MFBZi830', 'wfzYsE2wMEA', 'xYxsMNuXIBM', 'nq5iWryVqQs', '1dYdyRr3e6E', 'nfIgZFkh5ZA', 'LT9AEw96WJw', '3dSp5XgnsYc', 'A0JTIO2ifxk', '4vhPnKQG5Nc'];
  var video_list_3 = ['X5jV5I5Dq_w', 'DEk4gd-2Na4', 'KE_Cs7U1-gY', 'MLI5chwDT4Q', 'Nvez8sXkQc', 'ePHVUh7PHNM', 'ePHVUh7PHNM', 'mtWq0TAUI0k', 'cyC8Rd5DtEE', 'BqVt8BZxo60'];

  // for test groups 3 and 4
  e1  = [["red", 20, 20, 10]];
  c1a = [["red", 80, 20, 10]];
  c1b = [["red", 20, 20, 10]];
  c1c = [["red", 80, 80, 10]];
  c1d = [["red", 20, 80, 10]];

  e2  = [["blue", 20, 20, 10], ["blue", 80, 50, 10]];
  c2a = [["blue", 20, 80, 10], ["blue", 80, 50, 10]];
  c2b = [["blue", 20, 50, 10], ["blue", 80, 20, 10]];
  c2c = [["blue", 50, 20, 10], ["blue", 80, 80, 10]];
  c2d = [["blue", 20, 20, 10], ["blue", 80, 50, 10]];

  t1  = [["red", 80, 50, 10]];
  s1a = [["red", 20, 50, 10]];
  s1b = [["red", 80, 50, 10]];
  s1c = [["red", 50, 20, 10]];
  s1d = [["red", 50, 80, 10]];
  s1 = [s1a, s1b, s1c, s1d];

  t2  = [["blue", 20, 20, 10]];
  s2a = [["blue", 20, 20, 10]];
  s2b = [["blue", 80, 20, 10]];
  s2c = [["blue", 80, 80, 10]];
  s2d = [["blue", 20, 80, 10]];
  s2 = [s2a, s2b, s2c, s2d];

  t3  = [["red", 20, 80, 10], ["red", 80, 20, 10]];
  s3a = [["red", 20, 20, 10], ["red", 80, 80, 10]];
  s3b = [["red", 20, 80, 10], ["red", 20, 20, 10]];
  s3c = [["red", 20, 80, 10], ["red", 80, 20, 10]];
  s3d = [["red", 20, 80, 10], ["red", 80, 80, 10]];
  s3 = [s3a, s3b, s3c, s3d];

  t4  = [["blue", 20, 50, 10], ["blue", 80, 80, 10]];
  s4a = [["blue", 80, 20, 10], ["blue", 20, 50, 10]];
  s4b = [["blue", 20, 80, 10], ["blue", 80, 50, 10]];
  s4c = [["blue", 20, 50, 10], ["blue", 80, 80, 10]];
  s4d = [["blue", 20, 80, 10], ["blue", 50, 20, 10]];
  s4 = [s4a, s4b, s4c, s4d];

  t5  = [["blue", 50,23,15], ["blue", 80,80,10]];
  s5a = [["blue", 20,20,10], ["blue", 77,50,15]];
  s5b = [["blue", 20,50,10], ["blue", 77,23,15]];
  s5d = [["blue", 50,23,15], ["blue", 80,80,10]];
  s5c = [["blue", 23,77,15], ["blue", 80,50,10]];
  s5 = [s5a, s5b, s5c, s5d];

  t6  = [["blue", 23,23,15], ["blue", 80,80,10]];
  s6a = [["blue", 20,20,10], ["blue", 77,77,15]];
  s6b = [["blue", 23,23,15], ["blue", 80,80,10]];
  s6c = [["blue", 80,23,15], ["blue", 20,80,10]];
  s6d = [["blue", 23,77,15], ["blue", 80,20,10]];
  s6 = [s6a, s6b, s6c, s6d];

  t7  = [["blue", 77,23,15], ["blue", 80,80,10], ["blue", 20,20,10]];
  s7a = [["blue", 20,20,10], ["blue", 80,20,10], ["blue", 77,77,15]];
  s7b = [["blue", 20,80,10], ["blue", 77,77,15], ["blue", 80,20,10]];
  s7c = [["blue", 50,23,15], ["blue", 20,20,10], ["blue", 20,80,10]];
  s7d = [["blue", 77,23,15], ["blue", 80,80,10], ["blue", 20,20,10]];
  s7 = [s7a, s7b, s7c, s7d];

  t8  = [["blue", 23,50,15], ["blue", 50,20,10], ["blue", 80,80,10]];
  s8a = [["blue", 20,50,10], ["blue", 77,77,15], ["blue", 50,20,10]];
  s8b = [["blue", 23,50,15], ["blue", 50,20,10], ["blue", 80,80,10]];
  s8c = [["blue", 77,50,15], ["blue", 20,80,10], ["blue", 50,20,10]];
  s8d = [["blue", 23,50,15], ["blue", 50,80,10], ["blue", 80,20,10]];
  s8 = [s8a, s8b, s8c, s8d];

  t9  = [["blue", 50,23,15], ["blue", 80,80,10], ["blue", 80,20,10], ["blue", 23,77,15]];
  s9a = [["blue", 50,20,10], ["blue", 80,80,10], ["blue", 77,23,15], ["blue", 23,77,15]];
  s9b = [["blue", 23,23,15], ["blue", 50,20,10], ["blue", 77,77,15], ["blue", 20,80,10]];
  s9c = [["blue", 50,23,15], ["blue", 77,77,15], ["blue", 20,80,10], ["blue", 20,20,10]];
  s9d = [["blue", 50,23,15], ["blue", 80,80,10], ["blue", 80,20,10], ["blue", 23,77,15]];
  s9 = [s9a, s9b, s9c, s9d];

  t10  = [["blue", 20,50,10], ["blue", 77,23,15], ["blue", 50,70,20], ["blue", 80,80,10]];
  s10a = [["blue", 20,50,10], ["blue", 77,23,15], ["blue", 50,70,20], ["blue", 80,80,10]];
  s10b = [["blue", 80,50,10], ["blue", 23,23,15], ["blue", 50,70,20], ["blue", 20,80,10]];
  s10c = [["blue", 20,50,10], ["blue", 77,77,15], ["blue", 50,30,20], ["blue", 80,20,10]];
  s10d = [["blue", 20,50,10], ["blue", 70,30,20], ["blue", 50,77,15], ["blue", 80,80,10]];
  s10 = [s10a, s10b, s10c, s10d];

  // exercise problems
  var spatial_list_e = [e1, e2];
  var spatial_list_c = [[c1a, c1b, c1c, c1d], [c2a, c2b, c2c, c2d]];

  // formal test problems
  var spatial_list_t = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];
  var spatial_list_s = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];

  var q5_list_e = ["吃飯", "香蕉", "西瓜", "米飯"];
  var q5_list_c = [["喝水", "洗手", "説話", "尿尿"], ["西瓜", "雞蛋", "茄子", "香腸"], ["苦瓜", "香瓜", "葡萄", "木瓜"], ["饅頭", "豆漿", "餃子", "麵條"]];
  
  var q5_img_e = ["rice.jpg", "banana.png", "watermelon.png", "rice.jpg"];
  var q5_img_c1 = [["drinking_water.jpg", "wash_hands.gif", "speaking.jpg", "pee.png"], ["watermelon.png", "egg.jpg", "egg_plant.png", "grape.jpg"]];
  var q5_img_c2 = [["bitter_melon.jpg", "xiang_melon.jpg", "grape.jpg", "papaya.jpg"], ["mantou.jpg", "doujiangjpg", "dumpling.jpg", "noodle.jpg"]];
  var q5_img_c = q5_img_c1.concat(q5_img_c2);

  var q5_test_1 = ["糖果", "米飯", "褲子", "水桶", "牙刷", "唱歌", "貓咪", "小花", "榕樹", "蝴蝶"];
  var q5_test_2 = ["青蛙", "馬", "鯨魚", "雲", "水", "火爐", "星星", "姐姐", "鞋子", "棒球"];
  var q5_test_3 = ["鉛筆", "飯碗", "飛機", "冰", "汽車", "老師", "哥哥", "松樹", "睡覺", "讀書"];

  var q5_img_t1 = ["candy.png", "rice.jpg", "trouser.jpg", "bucket.png", "brush.png", "sing.jpg", "cat.png", "flower.jpg", "tree.jpg", "butterfly.png"];
  var q5_img_t2 = ["frog.jpg", "horse.jpg", "whale.jpg", "cloud.jpg", "water.jpg", "fireplace.jpg", "star.jpg", "sister.jpg", "shoes.png", "baseball.png"];
  var q5_img_t3 = ["pencil.jpg", "bowl.jpg", "airplane.jpg", "ice.jpg", "car.png", "teacher.gif", "brother.jpg", "tree2.jpg", "sleep.jpg", "reading.jpg"];

  var q5_c1 = [["冰淇淋", "帽子", "飛機", "房子"], ["玩具", "奶瓶", "蔬菜", "毛巾"], ["飯碗", "汽車", "上衣", "蠟筆"]];
  var q5_c2 = [["鏟子", "杯子", "椅子", "電視"], ["牙膏", "帽子", "鞋子", "玩具"], ["讀書", "遊戲", "走路", "彈琴"]];

  var q5_img_c1 = [["icecream.jpg", "hat.jpg", "airplane.jpg", "house.png"], ["toys.png", "milk_bottle.jpg", "vegetable.jpg", "towel.jpg"]];
  var q5_img_c2 = [["bowl.jpg", "car.png", "shirt.jpg", "crayon.jpg"], ["shovel.jpg", "cup.jpg", "chair.jpg", "tv.jpg"]];
  var q5_img_c3 = [["tooth_paste.png", "hat.jpg", "shoes.png", "toys.png"], ["reading.jpg", "games.jpg", "walking.jpg", "pianos.jpg"]];
  var q5_img_cc1 = q5_img_c1.concat(q5_img_c2, q5_img_c3);

  var q5_c3 = [["狗狗", "老鼠", "小鳥", "金魚"], ["大樹", "蜜蜂", "蝴蝶", "蜘蛛"], ["蘭花", "松樹", "玫瑰", "水仙"]];
  var q5_c4 = [["蜘蛛", "老鷹", "烏龜", "螞蟻"], ["麻雀", "金魚", "袋鼠", "公鷄"], ["牛", "老虎", "兔子", "獅子"]];

  var q5_img_c4 = [["dog.jpg", "rat.png", "bird.png", "goldfish.png"], ["tree.jpg", "bee.jpg", "butterfly.png", "spider.jpg"]];
  var q5_img_c5 = [["orchid.jpg", "tree2.jpg", "rose.png", "water_flower.png"], ["spider.jpg", "eagle.png", "turtle.jpg", "ant.png"]];
  var q5_img_c6 = [["sparrow.jpg", "goldfish.png", "kangaroo.jpg", "hens.jpg"], ["ox.jpg", "tiger.jpg", "rabbit.jpg", "lion.jpg"]];
  var q5_img_cc2 = q5_img_c4.concat(q5_img_c5, q5_img_c6);

  var q5_c5 = [["鯊魚", "海豚", "旗魚", "海鰻"], ["風", "雪", "煙", "火"], ["冰", "酒", "湯", "油"]];
  var q5_c6 = [["電視", "電腦", "冷氣機", "電冰箱"], ["月亮", "地球", "太陽", "飛機"], ["爸爸", "奶奶", "爺爺", "舅舅"]];

  var q5_img_c7 = [["shark.png", "dolphin.jpg", "flag_fish.jpg", "sea_eel.jpg"], ["wind.jpg", "snow.jpg", "smoke.jpg", "fire.png"]];
  var q5_img_c8 = [["ice.jpg", "wine.jpeg", "soup.png", "oil.jpg"], ["tv.jpg", "pc.png", "ac.jpg", "refrig.jpg"]];
  var q5_img_c9 = [["moon.jpg", "earth.jpg", "sun.jpg", "airplane.jpg"], ["dad.jpg", "grandma.jpg", "grandpa.png", "uncle.jpg"]];
  var q5_img_cc3 = q5_img_c7.concat(q5_img_c8, q5_img_c9);

  var q5_c7 = [["上衣", "褲子", "襪子", "帽子"], ["籃球", "羽求", "足球", "排球"], ["毛筆", "鋼筆", "蠟筆", "筷子"]];
  var q5_c8 = [["湯匙", "西瓜", "筷子", "盤子"], ["火箭", "飛彈", "衛星", "輪船"], ["雲", "水", "雪", "煙"]];

  var q5_img_c10 = [["shirt.jpg", "trouser.jpg", "socks.jpg", "hat.jpg"], ["basketball.jpg", "baminton.png", "soccer.png", "volleyball.png"]];
  var q5_img_c11 = [["brush_pen.jpg", "ink_pen.png", "crayon.jpg", "chopsticks.jpg"], ["spoon.jpg", "watermelon.png", "chopsticks.jpg", "plate.jpg"]];
  var q5_img_c12 = [["rocket.png", "missle.jpg", "satellite.png", "ship.jpg"], ["cloud.jpg", "water.jpg", "snow.jpg", "smoke.jpg"]];
  var q5_img_cc4 = q5_img_c10.concat(q5_img_c11, q5_img_c12);

  var q5_c9 = [["腳踏車", "火車", "飛機", "公車"], ["父母", "警察", "同學", "校長"], ["爸爸", "叔叔", "阿姨", "舅舅"]];
  var q5_c10 = [["椰子樹", "長頸鹿", "椅子", "電綫杆"], ["吃飯", "運動", "看電視", "喝水"], ["遊戲", "打架", "運動", "唱歌"]];

  var q5_img_c13 = [["bike.png", "train.jpg", "airplane.jpg", "bus.jpg"], ["parents.png", "police.jpg", "classmates.png", "principal.jpg"]];
  var q5_img_c14 = [["dad.jpg", "uncle.jpg", "aunt.png", "uncle2.jpg"], ["palm.jpg", "giraffjpg", "chair.jpg", "pole.jpg"]];
  var q5_img_c15 = [["eating.jpg", "exercise.jpg", "watching_tv.jpg", "drinking_water.jpg"], ["games.jpg", "fight.gif", "exercise.jpg", "sing.jpg"]];
  var q5_img_cc5 = q5_img_c13.concat(q5_img_c14, q5_img_c15);

  var q5_cc1 = q5_c1.concat(q5_c2, q5_c3);
  var q5_cc2 = q5_c4.concat(q5_c5, q5_c6);
  var q5_cc3 = q5_c7.concat(q5_c8, q5_c9);
  var q5_cc4 = q5_cc1.concat(q5_cc2, q5_cc3);

  var q5_list_t = q5_test_1.concat(q5_test_2, q5_test_3);
  var q5_img_t = q5_img_t1.concat(q5_img_t2, q5_img_t3);
  var q5_list_a = q5_cc4.concat(q5_c10);
  var q5_img_a1 = q5_img_cc1.concat(q5_img_cc2, q5_img_cc3);
  var q5_img_a = q5_img_a1.concat(q5_img_cc4, q5_img_cc5);

  var q6_e1 = "把功課快做好";
  var q6_q1 = "把飯快吃完";
  var q6_q2 = "把手洗乾淨";
  var q6_q3 = "你都不聽話";
  var q6_q4 = "不要太晚睡覺";
  var q6_q5 = "你怎麽會肚子痛";
  var q6_q6 = "不要動，好好躺著";
  var q6_q7 = "你聼不懂嗎";
  var q6_q8 = "快來吃好嗎";
  var q6_q9 = "想吃什麼";

  var q6_list_t = [q6_q1, q6_q2, q6_q3, q6_q4, q6_q5, q6_q6, q6_q7, q6_q8, q6_q9];
  var q6_list_e = [q6_e1];

  var q6_emo_e1 = ["hungry.png", "furious.jpg", "crying.png", "joy.jpg"];
  var q6_emo_e = [q6_emo_e1];

  var q6_emo_q1 = ["hurted.jpg", "smile.jpg", "order.png", "mad.jpg"];
  var q6_emo_q2 = ["caring.jpg", "furious.jpg", "confused.jpg", "despise.jpg"];
  var q6_emo_q3 = ["love2.png", "sorry.jpg", "shy.png", "yarn.jpg"];
  var q6_emo_q4 = ["love3.jpg", "worry.png", "shy2.png", "mad2.png"];
  var q6_emo_q5 = ["laugh.png", "hurted2.png", "crying.png", "shock2.jpg"];
  var q6_emo_q6 = ["yarn.jpg", "caring.jpg", "order.png", "joy.jpg"];
  var q6_emo_q7 = ["cold.png", "love2.png", "gentle.png", "hurted.jpg"];
  var q6_emo_q8 = ["hungry.png", "angry.png", "despise.jpg", "invitation.png"];
  var q6_emo_q9 = ["asking.png", "love3.jpg", "shy.png", "hurted2.png"];

  var q6_emo_t = [q6_emo_q1, q6_emo_q2, q6_emo_q3, q6_emo_q4, q6_emo_q5, q6_emo_q6, q6_emo_q7, q6_emo_q8, q6_emo_q9];

  var user_answer;
  var current_answer = "";

  function init_answer () {

    answer_1 = "ANSWER for Group 1/";
    answer_2 = "ANSWER for Group 2/";
    answer_3 = "ANSWER for Group 3/";
    answer_4 = "ANSWER for Group 4/";
    answer_5 = "ANSWER for Group 5/";
    answer_6 = "ANSWER for Group 6/";
    user_answer = [answer_1, answer_2, answer_3, answer_4, answer_5, answer_6]

  }

  // prepare for the test
  // set up test starting point
  if($('#user_data').html()=='') {
    $('#welcome_text_1').html('開始測驗前，請先註冊或登入！');
  } else {
    // set up the test level
    x = $('#user_level_code').html();
    level = parseInt(x);
    level_selected = level_joint[2]; // XXXX level_joint[level-1];

    // extract answers
    if($('#user_answer').html()=='') {
      init_answer();
      status = '0';
    } else {
      user_answer = $('#user_answer').html().split('||');
      if(user_answer.length>1) {
        status = user_answer.shift();
        status.replace(/\r/g, '');
        status.replace(/\n/g, '');
        status.replace(/ /g, '');
      }
      else {
        init_answer();
        status = '0';
      }
    }

    if(status=='0') {
      exercise_mode = true;
      group_idx = 0;
      item_idx = level_selected[1];
      group_id = level_selected[0];

      $('#welcome_text_1').html('歡迎從頭開始以下測驗');

      idx = parseInt(group_id[0]);
      current_answer = user_answer[idx-1];

      // display the test description of the starting group 
      $('#test_group_' + group_id).show();
      $('#test_description_' + group_id).show();

      $('#show_instruction').hide();
      $('#hide_instruction').show();
      $('#show_logout').show();
      $('#hide_logout').hide();
      $('#test_start').hide();

      $('#answer_alert').show();
      $('#alert_message').html('請按[練習鍵]或[往下鍵]開始。');
    } else {
      exercise_mode = true;
      group_idx = parseInt(status);

      if(group_idx*5 >= level_selected.length)
      {
        $('#welcome_text_1').html('你已完成測驗，請登出結束！');

        $('#show_instruction').hide();
        $('#hide_instruction').hide();

        $('#answer_alert').hide();

        // hide logout 
        $('#hide_logout').hide();
        $('#show_logout').show();
        $('#test_start').show();

      } else {
        item_idx = level_selected[5*group_idx+1];
        group_id = level_selected[5*group_idx];


        $('#welcome_text_1').html('歡迎繼續以下測驗');

        idx = parseInt(group_id[0]);
        current_answer = user_answer[idx-1];

        // display the test description of the starting group 
        $('#test_group_' + group_id).show();
        $('#test_description_' + group_id).show();

        $('#show_instruction').hide();
        $('#hide_instruction').show();

        $('#answer_alert').show();
        $('#alert_message').html('請按[練習鍵]或[往下鍵]開始。');

        // hide logout 
        $('#show_logout').show();
        $('#hide_logout').hide();
        $('#test_start').hide();
      }
    }
  }

  var new_group = false;

  // find the next problem, will update:
  // exercise_mode, group_idx, item_idx
  // return -1 if end of the test
  // return +1 otherwise
  function next_problem() {

    $('#test_description_' + group_id).hide();
    $('#show_instruction').show();
    $('#hide_instruction').hide();

    group_id = level_selected[5*group_idx];
    exer_start = level_selected[5*group_idx+1];
    exer_end = level_selected[5*group_idx+2];
    test_start = level_selected[5*group_idx+3];
    test_end = level_selected[5*group_idx+4];

    new_group = false;

    $('#record_alert').hide();

    if(jump2test) {
      jump2test = false;
      exercise_mode = false;
      item_idx = test_start;
      $('#exer').hide();

    } else {
      if(exercise_mode && item_idx < exer_end) {
        item_idx++;
        if(item_idx==exer_end) $('#exer').hide();
        $('#exer').show();
      }
      else if(exercise_mode) {
        exercise_mode = false;
        item_idx = test_start;
        $('#exer').hide();
      } else {
        if(item_idx < test_end) item_idx++;
        else {
          gid = group_id;
          group_idx += 1;

          exercise_mode = true;
          if(5*group_idx==level_selected.length) {

            // close all displays
            $('#test_group_' + group_id).hide();
            $('#test_description_' + group_id).hide();
            $('#test_content_' + group_id[0]).hide(); // group_id: take only the number in the id
            $('#test_item').hide();
            hide_all_buttons();
            $('#test_buttons').hide();
            $('#answer_alert').show();
            $('#alert_message').html('請按保存鍵，然後登出結束。');
            
            // save the answers here ...
            user_answer[parseInt(group_id[0])-1] = current_answer;

            new_answer = group_idx.toString();
            for(i=0;i<6;i++) {
              new_answer += '||' + user_answer[i]
            }
            $('#tester_answer').html(new_answer);
            $('#tester_answer_submit').show();
            return -1;
          }
          else {
            new_group = true;

            // save current_answer to the #tester_answer area
            user_answer[parseInt(group_id[0])-1] = current_answer;

            new_answer = group_idx.toString();
            for(i=0;i<6;i++) {
              new_answer += '||' + user_answer[i]
            }
            $('#tester_answer').html(new_answer);
            $('#tester_answer_submit').show();
            
            // hide the test structures for the current group
            $('#test_group_' + group_id).hide();
            $('#test_description_' + group_id).hide();
            $('#test_content_' + group_id[0]).hide(); // group_id: take only the number in the id
            $('#test_item').hide();
            hide_all_buttons();
            $('#test_buttons').hide();
            $('#answer_alert').show();
            $('#alert_message').html('請按[保存]鍵');
            
            group_id = level_selected[5*group_idx];
            item_idx = level_selected[5*group_idx+1];

            exer_start = level_selected[5*group_idx+1];
            exer_end = level_selected[5*group_idx+2];
            test_start = level_selected[5*group_idx+3];
            test_end = level_selected[5*group_idx+4];

            // get new current_answer
            if(gid[0] != group_id[0]) {
              current_answer = user_answer[parseInt(group_id[0])-1];
            }

            // show the test structures for the current group
            $('#test_group_' + group_id).show();
            $('#test_description_' + group_id).show();

            // show form to save the current answers ....

            $('#show_instruction').hide();
            $('#hide_instruction').show();

          }
        }
      }
    }

    problem_title_formation();

    return 1;

  };


  // problem id
  var problem_id = "";
  var answer_id = "";
  var title = "";

  function problem_title_formation() {

    iid = item_idx.toString();

    if(exercise_mode) {
      title = '練習題 ' + iid;

      if(group_id[0]=='1') {
        problem_id = 'p1_e' + iid;
        answer_id = problem_id;
        load_next_audio(problem_id, answer_id);
      } else if(group_id[0]=='2') {
        problem_id = 'p' + group_id + "_" + 'e' + iid;
        answer_id = 'p' + group_id + "_" + "a" + iid;
        load_next_audio(problem_id, answer_id);
      } else if(group_id[0]=='5') {
        problem_id = 'q' + group_id + "_" + 'e' + iid;
        load_next_audio(problem_id, '');
      } else if(group_id[0]=='6') {
        problem_id = 'q' + group_id + "_" + 'e' + iid;
        load_next_audio(problem_id, '');
      }
    } 
    else {
      title = '第 ' + iid + ' 題';
      problem_id = 'play_' + group_id + '_' + iid;

      if(group_id[0]=='1') gid = '1';
      else if(group_id[0]=='2') gid = group_id;

      if(group_id[0]=='1' || group_id[0]=='2') {
        problem_id = 'p' + gid + "_" + 'q' + iid;
        load_next_audio(problem_id, '');
      } else if(group_id[0]=='5') {
        problem_id = 'q' + group_id + "_" + 'q' + iid;
        load_next_audio(problem_id, '');
      } else if(group_id[0]=='6') {
        problem_id = 'q' + group_id + "_" + 'q' + iid;
        load_next_audio(problem_id, '');
      }
    }
     
    $('#test_item').html(title);
  };

  //
   $('#show_instruction').on("click", function() {
      $('#show_instruction').hide();
      $('#hide_instruction').show();
      $('#test_description_' + group_id).show();
   });

   $('#hide_instruction').on("click", function() {
      $('#show_instruction').show();
      $('#hide_instruction').hide();
      $('#test_description_' + group_id).hide();
   });

   $('#show_logout').on("click", function() {
      $('#show_logout').hide();
      $('#hide_logout').show();
      $('#test_start').show();
   });

   $('#hide_logout').on("click", function() {
      $('#show_logout').show();
      $('#hide_logout').hide();
      $('#test_start').hide();
   });

  // start doing regular test items
  $('.play_test').on("click", function() {

    $('#welcome').hide();
    $('#tester_answer_submit').hide();

    $('#group_' + group_id + '_exer').attr("src", '/icon_repeat.png');
    $('#group_' + group_id + '_start').attr("src", '/icon_next.jpg');

    jump2test = false;
    exercise_mode = false;
    problem_title_formation();

    // set up the test structure
    group_test_setup();

    $('#answer_alert').show();
    $('#alert_message').html('請按播放鍵，開始正式測驗。');
  });

  // start doing exercise items
  $('.play_exer').on("click", function() {

    $('#welcome').hide();
    $('#tester_answer_submit').hide();

    $('#group_' + group_id + '_exer').attr("src", '/icon_repeat.png');
    $('#group_' + group_id + '_start').attr("src", '/icon_next.jpg');

    exercise_mode = true;
    jump2test = false;
    problem_title_formation();

    // set up the test structure
    group_test_setup();

    $('#answer_alert').show();
    $('#alert_message').html('請按播放鍵，開始練習題。');
  });

  // inital setup for starting tests of a given group
  function group_test_setup() {
    $('#test_item').show();

    gid = group_id[0];
    if(gid=='3' || gid=='4') {
      $('#test_content_3a4').show();
      $('#test_for_3a4').hide();
      $('#answer_for_3a4').hide();
    }
    // else $('#test_content_' + group_id[0]).show();

    hide_all_buttons();
    $('#test_buttons').show();
    $('#a2').show(); // this starts the test item
  };

  function hide_all_buttons() {
    $('#a2').hide(); // this starts the test item
    $('#yellow').hide(); // show up for repeating the test question
    // if(group_id[0]=='5' || group_id[0]=='6') $('#green').hide();
    // else $('#green').css('opacity', 0.2); // opacity = 1 when the test is answered
    $('#green').hide();
    $('#answer').hide(); // show up after the test is given 
    $('#submit').hide(); // show up after the test is given
    $('#next').hide(); // show up after the user gives the anwswer
    $('#exer').hide(); // show up if there are still exercise questions
    $('#response').hide(); // show up if there are still exercise questions
  }

  // load new audio
  function load_next_audio(fn1, fn2) {

    if(fn2=='') {
      $('#audio_play_q').get(0).setAttribute('src', '/' + fn1 + '.wav');
      $('#audio_play_q').get(0).load();

      // alert('audio: ' + fn1 + ' is loaded...');
    } else {
      $('#audio_play_a').get(0).setAttribute('src', '/' + fn2 + '.wav');
      $('#audio_play_a').get(0).load();

      $('#audio_play_q').get(0).setAttribute('src', '/' + fn1 + '.wav');
      $('#audio_play_q').get(0).load();

      // alert('audio: ' + fn1 + ' and ' + fn2 + ' are loaded...');
    }
    
  };

  var all_done;
  var key = '-';
  var is_loaded = false;

	// play audio, no repeat nor interference
	$('#a2').on("click", function() {
    all_done = false; // true after first play is done

    // save play status
    if(exercise_mode) key = "e";
    else key = "t";

    // load video
    if(group_id[0]=='1' || group_id[0]=='2') {

      $('#audio_play_q').get(0).play();
      $('#a2').hide();
      $('#exer').hide();
      $('#next').hide();
      $('#answer_alert').show();
      $('#alert_message').html('首次播音，請牢記。');

      if(group_id[1]=='c') {
        var vid;
        if(exercise_mode) {
          if(group_id[0]=='1') vid = video_list_2[item_idx-1];
          else if(group_id[0]=='2') vid = video_list_3[item_idx-1];
          else vid = video_list_1[item_idx-1];
        } else {
          if(group_id[0]=='1') vid = video_list_1[item_idx-1];
          else if(group_id[0]=='2') vid = video_list_2[item_idx-1];
          else vid = video_list_3[item_idx-1];
        }
        is_loaded = true;

        $('#user_status').html(vid + '/' + group_id + '/' + item_idx.toString());
        // loadVideo(vid);
      }

      
      current_answer += group_id + ':' + key + item_idx.toString() + '/';

      $('#audio_play_q').bind("ended", function() {

        if(group_id[1]=='a' || all_done) {
          $('#answer_alert').show();
          $('#alert_message').html('請等綠蘋果出現後開始錄音。');

          // after audio is played, wait 3 seconds
          setTimeout(function() {
            $('#green').show();
            $('#yellow').hide();

            if(exercise_mode && item_idx < level_selected[5*group_idx+2]) $('#exer').show(); 
            else $('#exer').hide();

            $('#next').show();

            if(exercise_mode) $('#answer').show();
            else $('#answer').hide();

            $('#record_alert').show();
            $('#answer_alert').hide();

          }, 3000); 
        } else {
          
          $('#answer_alert').show();
          $('#alert_message').html('請等黃燈出現。');

          setTimeout(function() {
            all_done = true;

            // audio is replayed
            if(group_id[1]=='b') {
              // play second time
              $('#audio_play_q').get(0).play();
              $('#yellow').show();
              $('#answer_alert').show();
              $('#alert_message').html('這是重復播音。');

            // use iframe for video interference
            } else if(group_id[1]=='c') {
              
              // *** original place for video loading
            
              // set up for handling after video play stops
              handle_code = ''
              if(exercise_mode && item_idx < level_selected[5*group_idx+2]) handle_code = '1/';  //$('#exer').show(); 
              else handle_code = '0/'; // $('#exer').hide();

              if(exercise_mode) handle_code += '1/'; // $('#answer').show();
              else handle_code += '0/'; //$('#answer').hide();

              handle_code += group_id;

              $('#video_end_handle').html(handle_code);
              $('#test_description_' + group_id).hide();
              $('#test_group_' + group_id).hide();
              $('#test_content_1').hide();

              $('#show_instruction').show();
              $('#hide_instruction').hide();

              // use iframe for video interference
              $('#answer_alert').show();
              $('#alert_message').html('影音將播放三十秒。');
              // load2playVideo();  // *** vid
              playVideo();
              // testVideo();
            }

          }, 1500);
        }
      }); // audio bind for the first play

    } else if(group_id[0]=='3' || group_id[0]=='4') {
      // 1. select the question according to the exercise mode
      if(exercise_mode) elements = spatial_list_e[item_idx-1];
      else elements = spatial_list_t[item_idx-1];

      // 2. draw the question on the canvas
      if(group_id[0]=='3') {
        if(group_id[1]=='a') post_canvas_question(elements, 0);
        else if(group_id[1]=='b') post_canvas_question(elements, 1);
        else if(group_id[1]=='c') post_canvas_question(elements, 2);
        else if(group_id[1]=='d') post_canvas_question(elements, 3);
      } else {
        if(group_id[1]=='a') post_canvas_question(elements, 3);
        else if(group_id[1]=='b') post_canvas_question(elements, 3);
        else if(group_id[1]=='c') post_canvas_question(elements, 4);
        else if(group_id[1]=='d') post_canvas_question(elements, 4);
      }

      if(group_id[1]=='c' || group_id[1]=='d') {
        if(exercise_mode) {
          if(group_id=='3c') vid = video_list_2[item_idx-1];
          else if(group_id=='4c') vid = video_list_2[item_idx+2];
          else vid = video_list_2[item_idx+5];
        } else {
          if(group_id=='3c') vid = video_list_3[item_idx-1];
          else if(group_id=='4c') vid = video_list_1[item_idx-1];
          else vid = video_list_2[item_idx-1];
        }

        $('#user_status').html(vid + '/' + group_id + '/' + item_idx.toString());
      }
      
      // 3. handle displays
      $('#test_for_3a4').show();
      $('#answer_for_3a4').hide();
      $('#test_buttons').hide();

      $('#test_description_' + group_id).hide();

      $('#show_instruction').show();
      $('#hide_instruction').hide();

      $('#answer_alert').show();
      $('#alert_message').html('請記住圖形，2秒後會消失。');

      var timeout;
      if(group_id[1]=='b') timeout = 1000;
      else timeout = 5000;

      // (1) hide test question after showing for 5 seconds
      setTimeout(function() {
        $('#test_for_3a4').hide();
        $('#answer_for_3a4').hide();
        $('#test_buttons').show();
        hide_all_buttons();
        $('#yellow').show();
        $('#alert_message').html('黃燈會出現5秒，請稍候。');

        // (2) actions after 5 second disappearnce
        setTimeout(function() {
      
          if(group_id[1]=='a') {
            // show choices to select after first disappearance
            post_canvas_answers();
            $('#test_for_3a4').hide();
            $('#answer_for_3a4').show();
            $('#test_buttons').show();
            hide_all_buttons();
            $('#green').show();
            if(exercise_mode) $('#answer').show();
            $('#response').hide();
            $('#answer_alert').show();

            $('#alert_message').html('請在正確圖形處觸碰。');

          } else if(group_id[1]=='b') {
            // show again test question after first disappearance
            $('#test_for_3a4').show();
            $('#test_buttons').hide();

            $('#alert_message').html('重復原來圖形，2秒後會消失。');

            // (3) hide again after 5 seconds
            setTimeout(function() {
              $('#test_for_3a4').hide();
              $('#test_buttons').show();
              $('#alert_message').html('請等候5秒再回答問題。');

              // (4) show choices to select after second disappearance
              setTimeout(function() {
                post_canvas_answers();
                $('#test_for_3a4').hide();
                $('#answer_for_3a4').show();
                $('#test_buttons').show();
                hide_all_buttons();

                $('#green').show();
                if(exercise_mode) $('#answer').show();
                $('#answer_alert').show();
                $('#response').hide();
                $('#alert_message').html('請在正確圖形處觸碰。');

                }, 5000); // (4) show choices after 5 second disappearce
              

            }, 2000); // (3) show again for 2 seconds    

          } else {
            // 1. select video to play after 5 second time out ...
            // ....
            
            // 2. set up for handling after video play stops
            hide_all_buttons();
            $('#test_buttons').hide();
            handle_code = '0/'; // $('#exer').hide();
            if(exercise_mode) handle_code += '1/'; // $('#answer').show();
            else handle_code += '0/'; //$('#answer').hide();
            handle_code += group_id;
            $('#video_end_handle').html(handle_code);

            $('#alert_message').html('影音播放30秒，請稍候。');

            // 3. pre-draw and hide the canvas
            post_canvas_answers();
            $('#test_for_3a4').hide();
            $('#answer_for_3a4').hide();

            // 4. load video and play
            playVideo();
            // xxx load2playVideo(vid); 
          }
        }, timeout); // (2) hide test question first time for [timeout] msec

      }, 2000); // (1) show 2 seconds

    } else if(group_id[0]=='5') {

      // 1. select the question according to the exercise mode
      if(exercise_mode) m = 1;
      else m = 10;
      if(group_id[1]=='a') offset = 0;
      else offset = 2*m;
      if(exercise_mode) {
        qq = q5_list_e[item_idx-1+offset];
        choices = q5_list_c[item_idx-1+offset];

        ii = q5_img_e[item_idx-1+offset];
        jj = q5_img_c[item_idx-1+offset];

      }
      else {
        qq = q5_list_t[item_idx-1+offset];
        choices = q5_list_a[item_idx-1+offset];

        ii = q5_img_t[item_idx-1+offset];
        jj = q5_img_a[item_idx-1+offset];
      }

      // 2. display the question and choices
      $('#q5_text').html(qq);
      $('#q5_img').attr({src: '/'+ ii});
      for(i=1;i<=4;i++) {
        $('#q5_text_' + i.toString()).html(choices[i-1]);
        $('#q5_img_' + i.toString()).attr({src: '/'+ jj[i-1]});
      }
      $('#test_content_5').show();

      // 3. handle displays
      $('#test_description_' + group_id).hide();
      $('#test_group_' + group_id).show();

      $('#show_instruction').show();
      $('#hide_instruction').hide();

      $('#audio_play_q').get(0).play();
      $('#answer_alert').hide();

      hide_all_buttons();
      $('#test_buttons').hide();
      if(exercise_mode) $('#answer').show();

      if(group_id[1]=='b') $('#q5_message').html('請從以下選出與以上題目最不適合的概念');
      else $('#q5_message').html('請從以下選出與以上題目最適合的概念');

    } else if(group_id[0]=='6') {

      // 1. play audio
      $('#audio_play_q').get(0).play();
      $('#answer_alert').hide();
      $('#test_content_6').show();

      if(exercise_mode) {
        qq = q6_list_e[item_idx-1];
        ii = q6_emo_e[item_idx-1];
      }
      else {
        qq = q6_list_t[item_idx-1];
        ii = q6_emo_t[item_idx-1];
      }

      // 2. display the question and choices
      $('#q6_text').html(qq);
      for(i=1;i<=4;i++) {
        $('#q6_emo_' + i.toString()).attr({src: '/'+ ii[i-1]});
      }

      // 2. set up operation after play is finished
      $('#audio_play_q').bind("ended", function() {

        hide_all_buttons();
        $('#test_buttons').show();

        if(exercise_mode) $('#answer').show();
        $('#answer_alert').hide();
      });

      // 3. handle displays
      $('#test_description_' + group_id).hide();
      $('#test_group_' + group_id).hide();

      $('#show_instruction').show();
      $('#hide_instruction').hide();
    }
  	
  });

  // play the answer audio
  $('#answer').on("click", function() {
  	if(group_id[0]=='1' || group_id[0]=='2') {

      // $('#' + answer_id).get(0).play();
      $('#audio_play_a').get(0).play();

    }
    else display_answer(group_id, item_idx, exercise_mode);
  });

  // for question groups after first 2
  $('#response').on("click", function() {

    response_handling();

  });

  function response_handling() {

    hide_all_buttons();
    $('#response').hide();

    // in exercise mode, tester can jump to test or continue doing exercise
    // otherwise, go directly to play the next problem
    if(exercise_mode && item_idx < level_selected[5*group_idx+2]) {
      $('#next').show();
      $('#exer').show(); 
    } else {
      get_next_play_ready();
    }

    $('#answer_for_3a4').hide();
    $('#test_content_5').hide();
    $('#test_content_6').hide();

    $('#answer_alert').show();
    if(item_idx!=test_start) $('#alert_message').html('請按[繼續鍵]');

  };

  // go to next exercise
  $('#exer').on("click", function() {
  	// check out the next exercise
  	exercise_mode = true;

    $('#answer_alert').show();
    $('#alert_message').html('請按[播放鍵]');

    next_problem();

    // setup for next test item
    $('#a2').show();
    $('#yellow').hide();
    $('#green').hide();
    $('#submit').hide();
    $('#next').hide();
    $('#answer').hide();
    $('#exer').hide();
    $('#test_buttons').show();
  });

  // go to next problem
	$('#next').on("click", function() {

    if(exercise_mode) jump2test = true;
    exercise_mode = false;

    get_next_play_ready();
  });

  function get_next_play_ready() {
    $('#answer_alert').show();
    $('#alert_message').html('請按[播放鍵]');

    next_problem();

    // setup for next test item
    $('#a2').show();
    $('#yellow').hide();
    $('#green').hide();
    $('#submit').hide();
    $('#next').hide();
    $('#answer').hide();
    $('#exer').hide();
    if(new_group) $('#test_buttons').hide();
    else $('#test_buttons').show();
  }

  function draw_canvas_basic (canvas_id, elements, mode) {
    var c=document.getElementById(canvas_id);
    var ctx=c.getContext("2d");

    ctx.clearRect(0, 0, 100, 100);

    for(i=0;i<elements.length;i++) {
      ee = elements[i]
      ctx.fillStyle = ee[0]; // color
      ctx.beginPath();
      if(mode==0) ctx.arc(ee[1],ee[2],ee[3],0,2*Math.PI); // ee[1], ee[2]: center point, ee[3]: radius
      else if(mode==1) ctx.arc(ee[2], c.height-ee[1],ee[3],0,2*Math.PI); // clockwise + left-right swap
      else if(mode==2) ctx.arc(ee[2],ee[1],ee[3],0,2*Math.PI); // counter-clockwise + up-down
      else if(mode==3) ctx.arc(c.width - ee[2],ee[1],ee[3],0,2*Math.PI); // clockwise
      else ctx.arc(ee[2],c.height-ee[1],ee[3],0,2*Math.PI); // counter-clockwise
      ctx.fill();
      ctx.closePath();
    }
  };

  function post_canvas_question(elements, mode) {

    canvas_id = 'canvas_for_test';
    draw_canvas_basic(canvas_id, elements, mode);

  }

  function post_canvas_answers() {

    for(k=1;k<=4;k++) {
      canvas_id = 'canvas_for_answer_' + k.toString();
      if(exercise_mode) elements = spatial_list_c[item_idx-1];
      else elements = spatial_list_s[item_idx-1];
      if(group_id[0]=='3') {
        if(group_id[1]=='a') draw_canvas_basic(canvas_id, elements[k-1], 0);
        else if(group_id[1]=='b') draw_canvas_basic(canvas_id, elements[k-1], 1);
        else if(group_id[1]=='c') draw_canvas_basic(canvas_id, elements[k-1], 2);
        else if(group_id[1]=='d') draw_canvas_basic(canvas_id, elements[k-1], 3);
      } else {
        if(group_id[1]=='a') draw_canvas_basic(canvas_id, elements[k-1], 1);
        else if(group_id[1]=='b') draw_canvas_basic(canvas_id, elements[k-1], 1);
        else if(group_id[1]=='c') draw_canvas_basic(canvas_id, elements[k-1], 2);
        else if(group_id[1]=='d') draw_canvas_basic(canvas_id, elements[k-1], 2);
      }
    }
  }


  $('#canvas_for_answer_1').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':1/';
    response_handling();
  });

  $('#canvas_for_answer_2').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':2/';
    response_handling();
  });

  $('#canvas_for_answer_3').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':3/';
    response_handling();
  });

  $('#canvas_for_answer_4').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':4/';
    response_handling();
  });

  $('#q5_img_1').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':1/';
    response_handling();
  });

  $('#q5_img_2').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':2/';
    response_handling();
  });

  $('#q5_img_3').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':3/';
    response_handling();
  });

  $('#q5_img_4').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':4/';
    response_handling();
  });

  $('#q6_emo_1').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':1/';
    response_handling();
  });

  $('#q6_emo_2').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':2/';
    response_handling();
  });

  $('#q6_emo_3').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':3/';
    response_handling();
  });

  $('#q6_emo_4').on("click", function() {
    current_answer += group_id + ':' + key + item_idx.toString() + ':4/';
    response_handling();
  });

});