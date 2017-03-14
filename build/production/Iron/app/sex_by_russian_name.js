function _8dd2f6833a5baa96f62f3016e1bfec5ecfaaf745(){};window.SexByRussianName=(function(){function a(d,c,b){this.surname=d;this.first_name=c;this.patronymic=b}a.FEMALE=0;a.MALE=1;a.SURNAME=0;a.PATRONYMIC=1;a.FIRST_NAME=2;a.surname_completions=[["ова","ева","ина","ая","яя","екая","цкая"],["ов","ев","ин","ын","ой","цкий","ский","цкой","ской"]];a.names=[["авдотья","аврора","агата","агния","агриппина","ада","аксинья","алевтина","александра","алёна","алена","алина","алиса","алла","альбина","амалия","анастасия","ангелина","анжела","анжелика","анна","антонина","анфиса","арина","белла","божена","валентина","валерия","ванда","варвара","василина","василиса","вера","вероника","виктория","виола","виолетта","вита","виталия","владислава","власта","галина","глафира","дарья","диана","дина","ева","евгения","евдокия","евлампия","екатерина","елена","елизавета","ефросиния","ефросинья","жанна","зиновия","злата","зоя","ивонна","изольда","илона","инга","инесса","инна","ирина","ия","капитолина","карина","каролина","кира","клавдия","клара","клеопатра","кристина","ксения","лада","лариса","лиана","лидия","лилия","лина","лия","лора","любава","любовь","людмила","майя","маргарита","марианна","мариетта","марина","мария","марья","марта","марфа","марьяна","матрёна","матрена","матрона","милена","милослава","мирослава","муза","надежда","настасия","настасья","наталия","наталья","нелли","ника","нина","нинель","нонна","оксана","олимпиада","ольга","пелагея","полина","прасковья","раиса","рената","римма","роза","роксана","руфь","сарра","светлана","серафима","снежана","софья","софия","стелла","степанида","стефания","таисия","таисья","тамара","татьяна","ульяна","устиния","устинья","фаина","фёкла","фекла","феодора","хаврония","христина","эвелина","эдита","элеонора","элла","эльвира","эмилия","эмма","юдифь","юлиана","юлия","ядвига","яна","ярослава"],["абрам","аверьян","авраам","агафон","адам","азар","акакий","аким","аксён","александр","алексей","альберт","анатолий","андрей","андрон","антип","антон","аполлон","аристарх","аркадий","арнольд","арсений","арсентий","артем","артём","артемий","артур","аскольд","афанасий","богдан","борис","борислав","бронислав","вадим","валентин","валерий","варлам","василий","венедикт","вениамин","веньямин","венцеслав","виктор","вилен","виталий","владилен","владимир","владислав","владлен","всеволод","всеслав","вячеслав","гавриил","геннадий","георгий","герман","глеб","григорий","давид","даниил","данил","данила","демьян","денис","димитрий","дмитрий","добрыня","евгений","евдоким","евсей","егор","емельян","еремей","ермолай","ерофей","ефим","захар","иван","игнат","игорь","илларион","иларион","илья","иосиф","казимир","касьян","кирилл","кондрат","константин","кузьма","лавр","лаврентий","лазарь","ларион","лев","леонард","леонид","лука","максим","марат","мартын","матвей","мефодий","мирон","михаил","моисей","назар","никита","николай","олег","осип","остап","павел","панкрат","пантелей","парамон","пётр","петр","платон","потап","прохор","роберт","ростислав","савва","савелий","семён","семен","сергей","сидор","спартак","тарас","терентий","тимофей","тимур","тихон","ульян","фёдор","федор","федот","феликс","фирс","фома","харитон","харлам","эдуард","эммануил","эраст","юлиан","юлий","юрий","яков","ян","ярослав"]];a.patronymic_completions=[["овна","евна","ична"],["ович","евич","ич"]];a.prototype.get_gender=function(){var b=[this.gender_by(a.SURNAME,this.surname),this.gender_by_first_name(),this.gender_by(a.PATRONYMIC,this.patronymic)];var c=this.determine_gender(b);return c};a.prototype.determine_gender=function(f){var d=false,c=false,e=undefined;for(var b=0;b<3;b++){if(f[b]===a.MALE){d=true}if(f[b]===a.FEMALE){c=true}}if(d&&!c){e=a.MALE}if(!d&&c){e=a.FEMALE}return e};a.prototype.gender_by_first_name=function(){var c=undefined,b=this.normalize(this.first_name);if(this.is_popular_name(b,a.FEMALE)){c=a.FEMALE}if(this.is_popular_name(b,a.MALE)){c=a.MALE}return c};a.prototype.gender_by=function(b,d){var e=undefined,c=this.normalize(d);if(this.is_correct(c,b,a.FEMALE)){e=a.FEMALE}if(this.is_correct(c,b,a.MALE)){e=a.MALE}return e};a.prototype.is_correct=function(d,g,f){var h=false,b;switch(g){case a.SURNAME:b=a.surname_completions[f];break;case a.PATRONYMIC:b=a.patronymic_completions[f]}for(var e=0;e<b.length;e++){var c=this.completion(d,b[e].length);if(c===b[e]){h=true}}return h};a.prototype.is_popular_name=function(c,d){var e=false,f=a.names[d];for(var b=0;b<f.length;b++){if(c===f[b]){e=true}}return e};a.prototype.completion=function(c,d){var b=c.substr((c.length-d),(c.length-1));return b};a.prototype.normalize=function(b){var c=b.toLowerCase();c=c.replace(/\s/g,"");return c};return a})();