
var offerValidationRules = {
    // Auspuff komplett wechseln (ab Katalysator/Partikelfilter) (SP)
    407518: new Rule().setNumber('work',1).setAny('parts',[
        [77500,77800,77900,77901,77907,77503,77637,77801,77921,77638,77802,77902,77922,77942,77510,77542,77610,77630,77633,77640,77808,77811,77906,77908,77910,77915,77941,77570,77580,77560,77561,77572,77581,77582,77920,77551,77571]
    ]).get(),

    // Zylinderkopfdichtung wechseln (SP)
    407519: new Rule().setNumber('work',1).setAny('parts',[
        [80550,80560,82120,82121,82122,82149,82150,82151,82152,82153,82162,82190,82500,80555,85240,82123,82331,82191,82332,82192,82330,82333],
        [81200,81205,81210,81225,81230,81240]// Ölfilter
    ]).get(),

    // Dreiecksscheibe vorne rechts wechseln (SP)
    407529: new Rule().setNumber('work',1).setAny('parts',[
        [77503,77500,77637,77801,77901,77921,77638,77802,77902,77922,77942,77510,77542,77610,77630,77633,77640,77800,77808,77811,77900,77906,77907,77908,77910,77915,77941,77570,77580,77560,77561,77572,77581,77582,77920,77551,77571]
    ]).get(),

    // Vor-/Mittellschaldämpfer wechseln (SP)
    407530: new Rule().setNumber('work',1).setAny('parts',[
        [77526,77527,77610,77620,77621,77622,77630,77636,77637,77638,77640,77641,77642,77644,77771,77773,77778,77780,77799,77800,77801,77802,77811,77910,77812,77901,77941,77942,77520,77770,77524,77890,77900,77807,77808,77551,77767,77550,77504]
    ]).get(),

    // Autobatterie wechseln (SP)
    407531: new Rule().setNumber('work',1).setAny('parts',[
        [46210,46213,56010,56020,46211]
    ]).get(),

    // Bremsservice komplett (Scheiben) (SP)
    407532: new Rule().setNumber('work',1).setAny('parts',[
        [63690,63691,63692,63693,63699,63700,64031,64032,64221,64230,64231,64232,64240,64260,64261,64262],
        [75110,75172,75173,75176,75177,75178,75179,75190,75191,75192,75240,75241,75242,75243,75244,75245,75251,75252,75255,75531,75532,75551,75561,75562,75630,75631,75632,75660,75661,75662,75900],
        [62511,62512,63671,64250,64309,64310,64311,64312,64320,64321,64322,64330],
        [75712,75711,75710,75412,75411,75082,75081]
    ]).get(),

    // Bremsservice vorne (Scheiben) (SP)
    407533: new Rule().setNumber('work',1).setAny('parts',[
        [63690,63691,63692,63693,63699,63700,64031,64032,64221,64230,64231,64232,64240,64260,64261,64262],
        [62511,62512,63671,64250,64309,64310,64311,64312,64320,64321,64322,64330]
    ]).get(),

    // Bremsservice hinten (Scheiben) (SP)
    407534: new Rule().setNumber('work',1).setAny('parts',[
        [75110,75172,75173,75176,75177,75178,75179,75190,75191,75192,75240,75241,75242,75243,75244,75245,75251,75252,75255,75531,75532,75551,75561,75562,75630,75631,75632,75660,75661,75662,75900],
        [75712,75711,75710,75412,75411,75082,75081]
    ]).get(),

    // Bremsbeläge/Klötze vorne wechseln (SP)
    407535: new Rule().setNumber('work',1).setAny('parts',[
        [63690,63691,63692,63693,63699,63700,64031,64032,64221,64230,64231,64232,64240,64260,64261,64262]
    ]).get(),

    // Bremsbeläge hinten wechseln  (SP)
    407536: new Rule().setNumber('work',1).setAny('parts',[
        [75110,75172,75173,75176,75177,75178,75179,75190,75191,75192,75240,75241,75242,75243,75244,75245,75251,75252,75255,75531,75532,75551,75561,75562,75630,75631,75632,75900]
    ]).get(),

    // Windschutzscheibe, Frontscheibe wechseln (SP)
    407537: new Rule().setNumber('work',1).setRequired('parts',[44910]).get(),

    // Alle Riemen/Keilriemen wechseln  (SP)
    407538: new Rule().setNumber('work',1).setAny('parts',[
        [81705,81910,81920,81925,81930,81940,83600,84518,81945,81921,81922,81965,81981]
    ]).get(),

    // Klimakompressor (Neuteil) wechseln (SP)
    407539: new Rule().setNumber('work',1).setAny('parts',[
        [11095,11097,11111,11096]
    ]).get(),

    // Kupplung wechseln (SP)
    407540: new Rule().setNumber('work',1).setAny('parts',[
        [77229,77230,82580,84993,85571,86510,86511,86531,86550,86551,86650,86730,87151,86570,86580,86592,86593,80690,80710,86530,86760]
    ]).get(),

    // Kühler (Austauschteil) wechseln (SP)
    407541: new Rule().setNumber('work',1).setAny('parts',[
        [84001,84010,84011,84020,84021,84022]
    ]).get(),

    // Lichtmaschine (Neuteil) wechseln (SP)
    407542: new Rule().setNumber('work',1).setAny('parts',[
        [84900]
    ]).get(),

    // Radlager vorne links wechseln (SP)
    407543: new Rule().setNumber('work',1).setAny('parts',[
        [62211,62251,62253,62281,62311,62351,62352,62391,62511,62283,62210,62591]
    ]).get(),

    // Radlager vorne rechts wechseln (SP)
    407544: new Rule().setNumber('work',1).setAny('parts',[
        [62212,62252,62254,62282,62312,62351,62352,62392,62512,62284,62592]
    ]).get(),

    // Radlager hinten links wechseln (SP)
    407545: new Rule().setNumber('work',1).setAny('parts',[
        [72241,72251,72271,72281,72283,72291,72351,72280,72293,71047,72321,72341,72391]
    ]).get(),

    // Radlager hinten rechts wechseln (SP)
    407546: new Rule().setNumber('work',1).setAny('parts',[
        [72242,72252,72272,72282,72284,72292,72352,72294,71049,72322,72392]
    ]).get(),

    // Rußpartikelfilter (Austauschteil) wechseln (SP)
    407547: new Rule().setNumber('work',1).setAny('parts',[
        [77536,77771,77772,77790,77791,77796,77910,78165,77792,77831,77832,77712,77779]
    ]).get(),

    // Scheinwerfer komplett vorne links wechseln (SP)
    407548: new Rule().setNumber('work',1).setAny('parts',[
        [17621,45611,45617,45631,45651,45661,45671,45641]
    ]).get(),

    // Scheinwerfer komplett vorne rechts wechseln (SP)
    407549: new Rule().setNumber('work',1).setAny('parts',[
        [17622,45612,45618,45632,45652,45662,45672,45642]
    ]).get(),

    // Scheinwerfer komplett beide vorne wechseln (SP)
    407550: new Rule().setNumber('work',1).setAny('parts',[
        [17621,45611,45617,45631,45651,45661,45671,45641],// links
        [17622,45612,45618,45632,45652,45662,45672,45642]// rechts
    ]).get(),

    // Stoßdämpfer vorne wechseln (SP)
    407551: new Rule().setNumber('work',1).setAny('parts',[
        [62911,63010,63011],// links
        [62912,63012]// rechts
    ]).get(),

    // Stoßdämpfer hinten wechseln (SP)
    407552: new Rule().setNumber('work',1).setAny('parts',[
        [74101,74103],// links
        [74102,74104]// rechts
    ]).get(),

    // Stoßdämpfer komplett wechseln (SP)
    407553: new Rule().setNumber('work',1).setAny('parts',[
        [74101,74103],// hinten links
        [74102,74104],// hinten rechts
        [62911,63010,63011],// vorne links
        [62912,63012]// vorne rechts
    ]).get(),

    // Turbolader (Neuteil) wechseln (SP)
    407554: new Rule().setNumber('work',1).setAny('parts',[
        [82604,82610,86963,87100,87108,87110,87111,87120,87129]
    ]).get(),

    // Turbolader (Neuteil) wechseln (SP)
    407555: new Rule().setNumber('work',1).setAny('parts',[
        [83551,83550,83552,83560,83565,83600,84145,83553,83622]
    ]).get(),

    // Zahnriemenwechsel (inkl. Wasserpumpe) (SP)
    407556: new Rule().setNumber('work',1).setAny('parts',[
        [80956,80981,81685,81690,81691,81692,81693,81694,81705,81715,81740,81750,81865,84518,81730,81995],// zahnriemen
        [83550,83551,83552,83560,83565,83600,84145,83553]// wasserpumpe
    ]).get(),

    // Zündkerzen wechseln (SP)
    407557: new Rule().setNumber('work',1).setAny('parts',[
        [82189,85305,85310,85311,85312]// unnötig
    ]).get(),

    // Motorölwechsel inklusive Ölfilter (SP)
    409868: new Rule().setNumber('work',1).setAny('parts',[
        [85090,85091]
    ]).get(),

    // Getriebe/Automatikgetriebe (Neuteil) wechseln (SP)
    409869: new Rule().setNumber('work',1).setAny('parts',[
        [85500]
    ]).get(),

    // Nebelscheinwerfer komplett wechseln (SP)
    409870: new Rule().setNumber('work',1).setAny('parts',[
        [45600,45900,45906,45641,45891,45901,45907,45911,45921,45951,45957,45961,45910,45905],
        [45600,45900,45906,45642,45892,45902,45908,45912,45922,45952,45958,45962,45910,45905]
    ]).get(),

    // Nebelscheinwerfer links wechseln (SP)
    409871: new Rule().setNumber('work',1).setAny('parts',[
        [45600,45641,45891,45900,45901,45907,45911,45921,45951,45957,45961]
    ]).get(),

    // Nebelscheinwerfer rechts wechseln (SP)
    409872: new Rule().setNumber('work',1).setAny('parts',[
        [45642,45892,45902,45908,45912,45922,45952,45958,45962]
    ]).get(),

    // Motorölwechsel inklusive Ölfilter (SP)
    409873: new Rule().setNumber('work',1).setNumber('fix',1).setNumber('fluids',1).setAny('parts',[
        [81200,81205,81210,81225,81230,81240]
    ]).get(),

    // Ölwanne komplett wechseln (SP)
    409874: new Rule().setNumber('work',1).setAny('parts',[
        [81050,81090,81092,81091],// Wanne
        [81200,81205,81210,81225,81230,81240]// Ölfilter
    ]).get(),

    // Spurstangenkopf, Spurstangengelenk rechts wechseln (SP)
    409875: new Rule().setNumber('work',1).setAny('parts',[
        [65762,65794,65802,65821,65822]
    ]).get(),

    // Spurstangenkopf, Spurstangengelenk links wechseln (SP)
    409876: new Rule().setNumber('work',1).setAny('parts',[
        [65761,65765,65793,65801,65821]
    ]).get(),

    // Thermostat, Kühlwasserthermostat wechseln (SP)
    409877: new Rule().setNumber('work',1).setAny('parts',[
        [11031,11032,11033,14852,83150,83680,83700,83710,83711,83730,83750,84086,84566,86205]
    ]).get(),

    // Anlasser,Starter (Austauschteil) wechseln (SP)
    412819: new Rule().setNumber('work',1).setAny('parts',[
        [85090,85091]
    ]).get(),

    // Getriebe/Automatikgetriebe (Austauschteil) wechseln (SP)
    412820: new Rule().setNumber('work',1).setAny('parts',[
        [85501,85503,85520]
    ]).get(),

    // Kühler (Austauschteil) wechseln (SP)
    412822: new Rule().setNumber('work',1).setAny('parts',[
        [84011]
    ]).get(),

    // Lichtmaschine (Austauschteil) wechseln (SP)
    412823: new Rule().setNumber('work',1).setAny('parts',[
        [84900,84901]
    ]).get(),

    // Rußpartikelfilter (Austauschteil) wechseln (SP)
    412824: new Rule().setNumber('work',1).setAny('parts',[
        [77772,77779,77791,77797,77790]
    ]).get(),

    // Turbolader (Austauschteil) wechseln (SP)
    412825: new Rule().setNumber('work',1).setAny('parts',[
        [82604,82605,82606,86964,87108,87109,87111,82602]
    ]).get(),

    // Luftfilter (Filtereinsatz,Filterelement) für Motor wechseln (SP)
    412915: new Rule().setNumber('work',1).setAny('parts',[
        [83109,83111,83112,83113,83121,83122,83130,83131,83141]
    ]).get(),

    // Innenraumfilter (Pollenfilter,Partikelfilter) wechseln (SP)
    412916: new Rule().setNumber('work',1).setAny('parts',[
        [10020,10031,10040,10041,10045,14320]
    ]).get(),

    // Steuerkettenwechsel (SP)
    422622: new Rule().setNumber('work',1).setAny('parts',[
        [80981,80982,81692,81735,81740,80910,80951,80952,80954,80983,81003,81480,81490,81600,81690,81730,81738,81746,81750,81770,82193,84518,85015,87121,87610,81691]
    ]).get(),

    // Wischerblätter, Scheibenwischblätter vorne wechseln (SP)
    422632: new Rule().setNumber('work',1).setAny('parts',[
        [45210,45211,45212,45213]
    ]).get(),

    // Dichtung für Ölwanne wechseln (SP)
    422645: new Rule().setNumber('work',1).setAny('parts',[
        [80560,80561,80871,81051,81060,81070,81091,85529,86180],
        [81200,81205,81210,81225,81230,81240]
    ]).get(),

    // Dichtung für Thermostat, Kühlwasserthermostat wechseln (SP)
    422646: new Rule().setNumber('work',1).setAny('parts',[
        [83740,8376]
    ]).get(),

    // Dichtung für Turbolader, Abgasturbolader wechseln (SP)
    422647: new Rule().setNumber('work',1).setAny('parts',[
        [77535,77765,82672,82673,87107,87108,87113,87122,87143,87181,87183,87184,87185,87186]
    ]).get(),

    // Dichtung für Wasserpumpe wechseln (SP)
    422648: new Rule().setNumber('work',1).setAny('parts',[
        [83570]
    ]).get(),

    // Bremsflüssigkeit wechseln (SP)
    422652: new Rule().setNumber('fix',1).setNumber('fluids',1).get(),

    // Zahnriemenwechsel (ohne Wasserpumpe) (SP)
    423825: new Rule().setNumber('work',1).setAny('parts',[
        [80956,80981,81685,81690,81691,81692,81693,81694,81705,81715,81740,81750,81865,84518,81730,81995]
    ]).get(),

    // Reifen komplett wechseln (ohne Felge) (SP)
    423843: new Rule().setNumber('work',1).setAny('parts',[
        [66501,66561],
        [66501,66502,66562],
        [76021,76061,76201],
        [76022,76062,76202]
    ]).get(),

    // Reifen vorne wechseln (ohne Felge) (SP)
    423844: new Rule().setNumber('work',1).setAny('parts',[
        [66501,66561],
        [66501,66502,66562]
    ]).get(),

    // Reifen hinten wechseln (ohne Felge) (SP)
    423845: new Rule().setNumber('work',1).setAny('parts',[
        [76021,76061,76201],
        [76022,76062,76202]
    ]).get(),

    // Räder komplett wechseln (mit Felge) (SP)
    423846: new Rule().setNumber('work',1).setAny('parts',[
        [76021,76061,76201],// reifen hinten links
        [76022,76062,76202],// reifen hinten rechts
        [76041,76053,76043,76051],// felge hinten links
        [76042,76035,76054,76044,76052],// felge hinten rechts
        [66501,66561],// reifen vorne links
        [66501,66502,66562],// reifen vorne rechts
        [66531,66535],// felge vorne links
        [66532,66534]// felge vorne rechts
    ]).get(),

    // Räder vorne wechseln (mit Felge) (SP)
    423847: new Rule().setNumber('work',1).setAny('parts',[
        [66501,66561],// reifen vorne links
        [66501,66502,66562],//reifen vorne rechts
        [66531,66535],// felge vorne links
        [66532,66534]//felge vorne rechts
    ]).get(),

    // Räder hinten wechseln (mit Felge) (SP)
    423848: new Rule().setNumber('work',1).setAny('parts',[
        [76021,76061,76201],
        [76022,76062,76202],
        [76041,76053,76043,76051],
        [76042,76035,76054,76044,76052]
    ]).get(),

    // Bremsservice hinten (Trommelbremse) (SP)
    423854: new Rule().setNumber('work',1).setAny('parts',[
        [75111,75112,75121,75122,75172,75190,75191,75192,75195,75196,75210,75230,75231,75232,75250,75251,75252,75571,75857,75881,75882],
        [75410,75172,75112,75111,75131,75411,75441],
        [75112,75132,75172,75410,75412,75414,75417,75442]
    ]).get(),

    // Bremsbacken hinten (Trommelbremse) wechseln (SP)
    423855: new Rule().setNumber('work',1).setAny('parts',[
        [75210,75111,75112,75121,75122,75172,75190,75191,75192,75195,75196,75230,75231,75232,75251,75252,75571,75881,75882,75857,75250]
    ]).get(),

    // Heckscheibe, Heckfenster wechseln (SP)
    450250: new Rule().setNumber('work',1).setAny('parts',[
        [55009,55010,55011,55015,55025,5590,55008,55012,55014,55007,55013]
    ]).get(),

    // Seitenscheiben Tür vorne links wechseln (SP)
    450253: new Rule().setNumber('work',1).setAny('parts',[
        [20451,21291,21381,45107,45101,21351,21301,25291]
    ]).get(),

    // Seitenscheiben Tür vorne rechts wechseln (SP)
    450254: new Rule().setNumber('work',1).setAny('parts',[
        [20452,21382,21292,45108,45102,21352,21302]
    ]).get(),

    // Seitenscheiben Tür hinten links wechseln (SP)
    450255: new Rule().setNumber('work',1).setAny('parts',[
        [24451,25381,55101,25291,25301]
    ]).get(),

    // Seitenscheiben Tür hinten rechts wechseln (SP)
    450256: new Rule().setNumber('work',1).setAny('parts',[
        [6542,25382,25292,25302]
    ]).get(),

    // Schiebedach komplett wechseln (SP)
    450257: new Rule().setNumber('work',1).setAny('parts',[
        [110,120,122,1081,1100,1101,1206,1208,1209,1250,1300,1305,1310,1312,1304,1085,1251]
    ]).get(),

    // Dreiecksscheibe vorne links wechseln  (SP)
    450258: new Rule().setNumber('work',1).setAny('parts',[
        [21291,21381,25291,45107,45101,21351,21301,5611,6111,20453,45131,45133,90608,45111]
    ]).get(),

    // Dreiecksscheibe vorne rechts wechseln (SP)
    450261: new Rule().setNumber('work',1).setAny('parts',[
        [5612,5752,6012,45132,45134,45112,21382,21292,45108,45102,21352,21302]
    ]).get(),

    // Seitenfenster, Dreiecksscheibe hinten links wechseln (SP)
    450262: new Rule().setNumber('work',1).setAny('parts',[
        [5610,5611,5627,5711,5751,6011,6501,6503,6511,6515,6516,5867,6475,6477,5855,5856,5853,6455,5859,5757,5857,6457,25371]
    ]).get(),

    // Seitenfenster, Dreiecksscheibe hinten rechts wechseln (SP)
    450263: new Rule().setNumber('work',1).setAny('parts',[
        [5612,5620,5712,5752,6012,6502,6512,6516,6504,6457,6112,5628,55102,5868,6476,6478,5854,5860,5858,5758,6456,6458,25372]
    ]).get(),

    // Außenspiegel komplett links wechseln (SP)
    450268: new Rule().setNumber('work',1).setAny('parts',[
        [23101,23105,23111,23113,23117,23161,23109,23141,23106,23143,23125,23110,23121,23123,23131,23145,23151,23153,23349,23459,23471,34495,23473,23171,13181,23181,23183,23185,23187,23180]
    ]).get(),

    // Außenspiegel komplett rechts wechseln (SP)
    450269: new Rule().setNumber('work',1).setAny('parts',[
        [23162,23174,23914,23922,45982,23102,23106,23112,23114,23118,23142,23108,23122,23132,23109,23116,23124,23126,23144,23146,23152,23154,23460,23472,29902,34496,23474,23172]
    ]).get(),

    // Kotflügel komplett vorne links wechseln (SP)
    450270: new Rule().setNumber('work',1).setAny('parts',[
        [43611,43631,43641,43621,43633,43643,43718,43711,43716,43721,42551,43755,43757,43758,43761,43881]
    ]).get(),

    // Kotflügel komplett vorne rechts wechseln (SP)
    450271: new Rule().setNumber('work',1).setAny('parts',[
        [43612,43632,43634,43642,43708,43622,43644,43719,43624,43626,43712,43714,43717,43722,42552,43756,43757,43758]
    ]).get(),

    // Kotflügel komplett hinten links wechseln (SP)
    450272: new Rule().setNumber('work',1).setAny('parts',[
        [52261,53001,53065,53111,53115,53121,53123,53125,53151,53153,53161,53131,53133,53141,53201,2899,4521,52021,52031,52041,52053,53203,53205]
    ]).get(),

    // Kotflügel komplett hinten rechts wechseln (SP)
    450273: new Rule().setNumber('work',1).setAny('parts',[
        [53002,53066,53112,53116,53122,53124,53126,53132,53134,53140,53142,53150,53152,53154,53202,53204,53206]
    ]).get(),

    // Außenspiegel beide komplett wechseln (SP)
    450284: new Rule().setNumber('work',1).setAny('parts',[
        [23101,23105,23111,23113,23117,23161,23109,23141,23106,23143,23125,23110,23121,23123,23131,23145,23151,23153,23349,23459,23471,34495,23473,23171,13181,23181,23183,23185,23187,23180],
        [23162,23174,23914,23922,45982,23102,23106,23112,23114,23118,23142,23108,23122,23132,23109,23116,23124,23126,23144,23146,23152,23154,23460,23472,29902,34496,23474,23172]
    ]).get(),

    // Heckleuchte komplett rechts wechseln (SP)
    493017: new Rule().setNumber('work',1).setAny('parts',[
        [54129,54130,55402,55412,55442,55482,55512,55522,55612,55652,55722,55912,55592,55557,54690,55410,55610,55650,55651,55656,55905,55911,55413,55411,16505,55424,55542,55552,55554,55590,55611,55692,55712,55752,55922,55731,9682,55555,55452,55420,55422]
    ]).get(),

    // Bremsencheck
    505358: new Rule().setNumber('fix',1).get(),

    // Frontschürze komplett wechseln (SP)
    518536: new Rule().setNumber('work',1).setAny('parts',[
        [43522,47142,47144,47146,47156,47162,47164,47172,47246,47176,47242,47166,47151,47130,47134,47173,47131,47152,47155,47157,47199,47150,47119,47112,47132,43521,47141,47143,47145,47161,47163,47171,47195,47244,47175,41610,42511,42512,42810,42910,43000,43210,43213,47105,47108,47110,47111,47113,47114,47115,47140,47165,47230,47233,47118,47120,47168,47200,47273,43500,47181,47174,47272,47182]
    ]).get(),

    // Frontschürze wechseln (SP)
    518537: new Rule().setNumber('work',1).setAny('parts',[
        [47166,43500,47119,47120,47181,47115]
    ]).get(),

    // Bremsservice komplett (mit Trommelbremse) (SP)
    518538: new Rule().setNumber('work',1).setAny('parts',[
        [75111,75112,75121,75122,75172,75190,75191,75192,75195,75196,75210,75230,75231,75232,75250,75251,75252,75571,75857,75881,75882],
        [75410,75172,75112,75111,75131,75411,75441],
        [75112,75132,75172,75410,75412,75414,75417,75442],
        [63690,63691,63692,63693,63699,63700,64031,64032,64221,64230,64231,64232,64240,64260,64261,64262],
        [62511,62512,63671,63911,63912,63914,63921,63922,64250,64309,64310,64311,64312,64320,64321,64322,64330]
    ]).get(),

    // Querlenker komplett vorne wechseln (SP)
    525495: new Rule().setNumber('work',1).setAny('parts',[
        [5060,5086,60532,61502,61512,61552,61568,61576,61592,61596,61598,61632,61642,61652,61712,61714,61792,62612,62642,70524,61796,61590,41872,60102,60152,60552,60752,61562,61586,61588,61644,61752,61798,61832,61842,62611,64342,61522,61510,61599,61600,61715,61790,61795,61840,61850,61710,61500,61582],
        [5059,5085,60105,60531,61501,61511,61512,61551,61567,61571,61575,61581,61587,61591,61595,61597,61631,61641,61651,61711,61713,61751,61791,61831,62641,70523,72151,42061,51141,53351,60101,60151,60551,60751,61401,61561,61585,61596,61643,61794,61795,61797,61851,72047,72053,61521,7158,7217,70581,61653,72011,61510,61590,61599,61600,61715,61790,61798,61840,61850,61710,61796,61500,61582],
    ]).get(),

    // Querlenker komplett hinten wechseln (SP)
    525496: new Rule().setNumber('work',1).setAny('parts',[
        [70521,70550,70701,70707,71881,72011,72017,72020,72021,72027,72071,72101,72103,72111,72121,72141,72151,72161,79903,61567,61591,61595,70527,70609,72047,72051,72053,72061,72077,72150],
        [61512,70522,70550,70570,70674,70708,72000,72012,72018,72022,72028,72052,72072,72102,72103,72104,72112,72122,72140,72142,72152,72162,79901,70572,61630,70528,70610,70622,70624,71524,72046,72048,72054,72078,72064,72150],
    ]).get(),

    // Bremsservice vorne (Trommelbremse) (SP)
    525497: new Rule().setNumber('work',1).setAny('parts',[
        [63690,63691,63692,63693,63699,63700,64031,64032,64221,64230,64231,64232,64240,64260,64261,64262],
        [63911,63912,63921,63922,63914]
    ]).get(),

    // Spurstange (Lenkung) links wechseln (SP)
    525498: new Rule().setNumber('work',1).setAny('parts',[
        [65761,65791,65793,65801,65821]
    ]).get(),

    // Spurstange (Lenkung) rechts wechseln (SP)
    525499: new Rule().setNumber('work',1).setAny('parts',[
        [65762,65792,65794,65802,65822]
    ]).get()
};

/**
  * @desc Rule constructor
*/
function Rule(){
    var self = this;
    self.rule = {};

    /**
      * @desc set the number of work type with value
      * @param {string} type, type of the work
      * @param {number} value, number of sections of the work type, stored in key "number" of this rule
    */
    self.setNumber = function(type,value){
        self.rule[type] = self.rule[type] || {};
        self.rule[type].number = value;
        return self;
    };

    /**
      * @desc check and update the number of work type with value, if the current value is bigger
      * @param {string} type, type of the work
      * @param {number} value, number of sections of the work type, stored in key "number" of this rule
    */
    self.updateNumber = function(type,value){
        self.rule[type] = self.rule[type] || {};
        var oldNumber = typeof self.rule[type].number !== 'number' ? 0 : self.rule[type].number;
        if (oldNumber < value) {
            return self.setNumber(type,value);
        } else {
            return self;
        }
    };

    /**
      * @desc set required of work type with value
      * @param {string} type, type of the work
      * @param {number} value, number of required sections of the work type, stored in key "required" of this rule
    */
    self.setRequired = function(type,value){
        self.rule[type] = self.rule[type] || {};
        self.rule[type].required = value;
        return self.updateNumber(type,value.length);
    };

    /**
      * @desc set the set of positions of the work type
      * @param {string} type, type of the work
      * @param {array of arrays} value, array of position sets, which are arrays of externalIds (DVNs of the corresponding services). The values are stored in key "required" or "any" of this rule, depending on the value
    */
    self.setAny = function(type,value){
        self.rule[type] = self.rule[type] || {};
        // treat case when value has only 1 element of array which contains only 1 element
        if (value.length === 1 && value[0].length === 1) {
            return self.setRequired(type,value[0]);
        } else {
            // alert duplicates in single array
            $.each(value,function(index,anyPart){
                anyPart.sort(function(a,b){return a - b;});
                if (anyPart.length > 1) {
                    for (var i = 1; i < anyPart.length; i++) {
                        if (anyPart[i] <= anyPart[i-1]) {
                            alert('Rule DVN ' + anyPart[i] + ' is duplicated in array [' + anyPart + ']');
                        }
                    }
                }
            });
            self.rule[type].any = value;
            return self.updateNumber(type,value.length);
        }
    };

    /**
      * @desc get the used rule object
    */
    self.get = function(){
        self.rule.types = [];
        var excludeKeys = ['types'];
        for (var key in self.rule) {
            key = key.toString();
            if ($.inArray(key,excludeKeys) < 0) {
                self.rule.types.push(key);
            }
        }
        return self.rule;
    };
}
