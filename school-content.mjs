const subject = (id, name, icon, color, soft, description, cards) => ({ id, name, icon, color, soft, description, cards });

export const grade1Subjects = [
  subject('g1-chinese', '语文基础', '📖', '#e18462', '#fff0e7', '拼音、字词、量词和句子', [
    { id: 'g1-cn-pinyin', category: '拼音', prompt: '“小鸟”的正确拼音是哪一个？', image: '🐦', answer: 'xiǎo niǎo', detail: '“小”和“鸟”都是三声。', choices: ['xiāo niāo', 'xiǎo niǎo', 'xiào niào'] },
    { id: 'g1-cn-antonym', category: '字词', prompt: '“高”的反义词是什么？', image: '↕️', answer: '矮', detail: '高和矮是一组意思相反的词。', choices: ['长', '矮', '远'] },
    { id: 'g1-cn-quantifier', category: '量词', prompt: '选择合适的量词：一（　）书', image: '📕', answer: '本', detail: '书常用量词“本”，例如一本故事书。', choices: ['本', '只', '朵'] },
    { id: 'g1-cn-radical', category: '汉字', prompt: '“河”的偏旁是什么？', image: '🌊', answer: '三点水', detail: '“河”和水有关，偏旁是三点水“氵”。', choices: ['三点水', '提手旁', '草字头'] },
    { id: 'g1-cn-word-choice', category: '字词', prompt: '选择正确的字：我（　）在椅子上。', image: '🪑', answer: '坐', detail: '“坐”表示动作；“座”常表示座位或量词。', choices: ['坐', '座', '做'] },
    { id: 'g1-cn-punctuation', category: '句子', prompt: '“你今天开心吗（　）”应填什么标点？', image: '❓', answer: '？', detail: '这句话是在提问，句末要用问号。', choices: ['。', '！', '？'] },
    { id: 'g1-cn-similar', category: '汉字', prompt: '选字填空：小明走（　）教室。', image: '🏫', answer: '进', detail: '“进”表示从外面到里面；“近”表示距离短。', choices: ['进', '近', '尽'] },
    { id: 'g1-cn-order', category: '表达', prompt: '把词语排成通顺的句子：\n我们／去／公园／一起', image: '✍️', answer: '我们一起去公园。', detail: '先说“谁”，再说“怎么做”和“去哪里”。' }
  ]),
  subject('g1-reading', '阅读表达', '🌿', '#6f9b67', '#edf7e9', '读短文、找信息、说完整话', [
    { id: 'g1-read-spring', category: '信息提取', prompt: '春天来了，柳树长出嫩绿的叶子，燕子从南方飞回来。\n短文写了哪个季节？', image: '🌱', answer: '春天', detail: '“嫩绿的叶子”和“燕子飞回来”都是春天的特点。', choices: ['春天', '秋天', '冬天'] },
    { id: 'g1-read-rabbit', category: '信息提取', prompt: '小白兔提着篮子去菜园，拔了三根胡萝卜。\n小白兔去了哪里？', image: '🐇', answer: '菜园', detail: '答案可以直接从第一句中找到。', choices: ['果园', '菜园', '公园'] },
    { id: 'g1-read-sequence', category: '顺序', prompt: '早上，我先起床，再刷牙洗脸，最后吃早饭。\n“我”第二件做什么？', image: '🌅', answer: '刷牙洗脸', detail: '“先、再、最后”告诉我们事情的顺序。', choices: ['起床', '刷牙洗脸', '吃早饭'] },
    { id: 'g1-read-feeling', category: '情感理解', prompt: '妈妈生日那天，乐乐送上自己画的贺卡。妈妈笑着抱住了他。\n妈妈的心情怎样？', image: '💌', answer: '开心', detail: '“笑着抱住了他”说明妈妈很开心，也很感动。', choices: ['生气', '开心', '害怕'] },
    { id: 'g1-read-title', category: '主题', prompt: '小猫每天给窗台上的花浇水。过了些日子，花开了，红得像火。\n选一个合适的题目。', image: '🌺', answer: '小猫养花', detail: '题目要能概括短文主要写的事情。', choices: ['小猫养花', '红色的火', '下雨了'] },
    { id: 'g1-read-why', category: '原因', prompt: '天空下起大雨，小红打开雨伞，小心地走回家。\n小红为什么打伞？', image: '☔️', answer: '因为下大雨了。', detail: '用“因为……所以……”可以把原因说完整。' },
    { id: 'g1-read-complete', category: '句子', prompt: '把句子补充完整：\n放学后，我……', image: '🎒', answer: '示例：放学后，我先完成作业。', detail: '句子只要表达完整、通顺就可以，答案不唯一。' },
    { id: 'g1-read-imagine', category: '想象', prompt: '如果你是一朵小云，你想飘到哪里？为什么？', image: '☁️', answer: '示例：我想飘到大海上，因为我想看蓝蓝的海水。', detail: '说清“去哪里”和“为仈么”，就是完整的回答。' }
  ]),
  subject('g1-math', '数学计算', '🔢', '#4e91c5', '#eaf5ff', '20 以内计算、数序和比较', [
    { id: 'g1-math-add', category: '20 以内加法', prompt: '8 + 7 = ?', image: '🧮', answer: '15', detail: '可以把 7 分成 2 和 5，8 + 2 = 10，再加 5 得 15。', choices: ['14', '15', '16'] },
    { id: 'g1-math-sub', category: '20 以内减法', prompt: '14 − 6 = ?', image: '➖', answer: '8', detail: '想 6 + 8 = 14，所以 14 减 6 等于 8。', choices: ['7', '8', '9'] },
    { id: 'g1-math-compose', category: '数的组成', prompt: '10 可以分成 3 和（　）。', image: '🔟', answer: '7', detail: '3 + 7 = 10。', choices: ['6', '7', '8'] },
    { id: 'g1-math-order', category: '数序', prompt: '11，13，15，（　）', image: '🚂', answer: '17', detail: '每次增加 2，所以 15 后面是 17。', choices: ['16', '17', '18'] },
    { id: 'g1-math-compare', category: '比较', prompt: '9 + 4 ○ 15', image: '⚖️', answer: '<', detail: '9 + 4 = 13，13 小于 15。', choices: ['<', '=', '>'] },
    { id: 'g1-math-missing', category: '填空', prompt: '（　）+ 5 = 12', image: '🧩', answer: '7', detail: '用 12 减 5，得到 7。', choices: ['6', '7', '8'] },
    { id: 'g1-math-tens', category: '100 以内数', prompt: '46 由几个十和几个一组成？', image: '💯', answer: '4 个十和 6 个一', detail: '46 的十位是 4，个位是 6。', choices: ['4 个十和 6 个一', '6 个十和 4 个一', '4 个十和 4 个一'] },
    { id: 'g1-math-mental', category: '口算', prompt: '30 + 20 = ?', image: '⚡', answer: '50', detail: '3 个十加 2 个十，是 5 个十。', choices: ['40', '50', '60'] }
  ]),
  subject('g1-application', '数学应用', '📐', '#8a78b8', '#f1edff', '钟表、人民币、图形和应用题', [
    { id: 'g1-app-time', category: '认识时间', prompt: '分针指向 12，时针指向 7，是几时？', image: '🕖', answer: '7 时', detail: '分针指向 12 表示整时，时针指向几就是几时。', choices: ['6 时', '7 时', '12 时'] },
    { id: 'g1-app-money', category: '人民币', prompt: '1 张 5 元和 2 张 1 元，一共多少元？', image: '💴', answer: '7 元', detail: '5 + 1 + 1 = 7 元。', choices: ['6 元', '7 元', '8 元'] },
    { id: 'g1-app-shape', category: '图形', prompt: '长方体有几个面？', image: '📦', answer: '6 个', detail: '长方体有上、下、前、后、左、右共 6 个面。', choices: ['4 个', '6 个', '8 个'] },
    { id: 'g1-app-add', category: '应用题', prompt: '树上有 9 只鸟，又飞来 5 只，现在有多少只？', image: '🐦', answer: '14 只', detail: '求现在一共有多少只，用加法：9 + 5 = 14。', choices: ['13 只', '14 只', '15 只'] },
    { id: 'g1-app-sub', category: '应用题', prompt: '小红有 16 张卡片，送给同学 7 张，还剩多少张？', image: '🃏', answer: '9 张', detail: '“送给”后数量变少，用减法：16 减 7 等于 9。', choices: ['8 张', '9 张', '10 张'] },
    { id: 'g1-app-difference', category: '相差问题', prompt: '明明吃了 8 颗草莓，乐乐吃了 5 颗。明明比乐乐多吃几颗？', image: '🍓', answer: '3 颗', detail: '求两个数相差多少，用减法：8 减 5 等于 3。', choices: ['2 颗', '3 颗', '4 颗'] },
    { id: 'g1-app-position', category: '位置', prompt: '小军的左边是小丽，右边是小强。谁在小军右边？', image: '🧒🧒🧒', answer: '小强', detail: '题目已经告诉我们“右边是小强”。', choices: ['小丽', '小军', '小强'] },
    { id: 'g1-app-plan', category: '解决问题', prompt: '要给 12 位同学每人发 1 支笔，现在只有 9 支，还差几支？', image: '✏️', answer: '3 支', detail: '用需要的 12 支减去已有的 9 支，还差 3 支。', choices: ['2 支', '3 支', '4 支'] }
  ]),
  subject('g1-english', '英语启蒙', '🌍', '#558d73', '#eaf6ef', '校园单词、简单问候和短句', [
    { id: 'g1-en-book', category: '学习用品', prompt: 'book', pinyin: '/bʊk/', image: '📘', answer: '书', detail: 'This is my book. 这是我的书。', speak: 'book', lang: 'en-US', choices: ['书', '铅笔', '书包'] },
    { id: 'g1-en-pencil', category: '学习用品', prompt: 'pencil', pinyin: '/ˈpensəl/', image: '✏️', answer: '铅笔', detail: 'I have a pencil. 我有一支铅笔。', speak: 'pencil', lang: 'en-US', choices: ['尺子', '铅笔', '橡皮'] },
    { id: 'g1-en-morning', category: '问候', prompt: 'Good morning!', image: '🌅', answer: '早上好！', detail: '早上见面时可以说 Good morning!', speak: 'Good morning!', lang: 'en-US', choices: ['早上好！', '晚安！', '谢谢！'] },
    { id: 'g1-en-name', category: '自我介绍', prompt: 'My name is Lily.', image: '👧', answer: '我的名字叫莉莉。', detail: 'My name is ... 可以用来介绍自己的名字。', speak: 'My name is Lily.', lang: 'en-US', choices: ['我的名字叫莉莉。', '她是老师。', '我今年六岁。'] },
    { id: 'g1-en-one-ten', category: '数字', prompt: 'seven', pinyin: '/ˈsevən/', image: '7️⃣', answer: '七', detail: 'Six, seven, eight. 六、七、八。', speak: 'seven', lang: 'en-US', choices: ['六', '七', '八'] },
    { id: 'g1-en-color', category: '颜色', prompt: 'The sun is yellow.', image: '☀️', answer: '太阳是黄色的。', detail: 'yellow 表示黄色。', speak: 'The sun is yellow.', lang: 'en-US', choices: ['太阳是黄色的。', '天空是蓝色的。', '草是绿色的。'] },
    { id: 'g1-en-family', category: '家庭', prompt: 'This is my mother.', image: '👩', answer: '这是我的妈妈。', detail: 'mother 是妈妈，father 是爸爸。', speak: 'This is my mother.', lang: 'en-US', choices: ['这是我的妈妈。', '这是我的姐姐。', '这是我的老师。'] },
    { id: 'g1-en-action', category: '动作', prompt: 'Stand up, please.', image: '🧑', answer: '请站起来。', detail: 'stand up 是“站起来”，sit down 是“坐下”。', speak: 'Stand up, please.', lang: 'en-US', choices: ['请站起来。', '请打开书。', '请坐下。'] }
  ]),
  subject('g1-science', '科学常识', '🔬', '#6e83ad', '#edf1fb', '季节、动植物、光影与安全', [
    { id: 'g1-sci-season', category: '季节', prompt: '天气炎热，知了在树上叫，荷花开了。这是什么季节？', image: '🌸', answer: '夏天', detail: '炎热、知了和荷花都是夏天常见的特点。', choices: ['春天', '夏天', '冬天'] },
    { id: 'g1-sci-plant', category: '植物', prompt: '植物的根主要有什么作用？', image: '🌱', answer: '吸收水分和固定植物', detail: '根长在土里，能吸收水分和养分，也能让植物站稳。', choices: ['吸收水分和固定植物', '开花', '制造声音'] },
    { id: 'g1-sci-animal', category: '动物', prompt: '哪种动物冬天会冬眠？', image: '🐻', answer: '蛇', detail: '蛇、青蛙等动物会通过冬眠度过寒冷季节。', choices: ['蛇', '麻雀', '金鱼'] },
    { id: 'g1-sci-shadow', category: '光影', prompt: '手电筒离玩具越近，墙上的影子通常会怎样？', image: '🔦', answer: '变大', detail: '光源靠近物体时，物体挡住的光的范围变大，影子也往往变大。', choices: ['变大', '变小', '消失'] },
    { id: 'g1-sci-magnet', category: '材料', prompt: '磁铁能吸引下面哪件物品？', image: '🧲', answer: '铁订', detail: '磁铁能吸引铁、镍等一些金属材料。', choices: ['木块', '铁订', '塑料尺'] },
    { id: 'g1-sci-water', category: '水', prompt: '把水放进不同形状的杯子，水的形状会怎样？', image: '💧', answer: '随容器改变', detail: '水会流动，没有固定形状，会呈现容器的形状。', choices: ['始终是圆形', '随容器改变', '一定变成冰'] },
    { id: 'g1-sci-body', category: '健康', prompt: '运动后心跳为什么会加快？', image: '❤️', answer: '身体需要更多氧气和能量', detail: '心脏跳得更快，能把富含氧气的血液更快送到全身。', choices: ['身体需要更多氧气和能量', '心脏累了', '因为天变冷了'] },
    { id: 'g1-sci-safety', category: '安全', prompt: '闻到家里有很重的煤气味，首先应该怎么做？', image: '⚠️', answer: '远离现场并告诉大人', detail: '不要开灯、点火或自己处理，要迅速到安全的地方求助大人。', choices: ['马上开灯查看', '远离现场并告诉大人', '划一根火柴'] }
  ]),
  subject('g1-logic', '逻辑思维', '🧩', '#c28846', '#fff3dc', '找规律、排顺序、辨方位', [
    { id: 'g1-log-pattern', category: '规律', prompt: '2，4，6，8，（　）', image: '🔍', answer: '10', detail: '每次增加 2。', choices: ['9', '10', '12'] },
    { id: 'g1-log-shape', category: '规律', prompt: '▲ ● ● ▲ ● ● （　）', image: '🔷', answer: '▲', detail: '一个三角形后跟两个圆形，然后重复。', choices: ['▲', '●', '■'] },
    { id: 'g1-log-sort', category: '排序', prompt: '按事情发生的先后排序：\n①吃早饭　②起床　③去上学', image: '⏰', answer: '②→①→③', detail: '早上先起床，再吃早饭，然后去上学。', choices: ['①→②→③', '②→①→③', '③→①→②'] },
    { id: 'g1-log-position', category: '方位', prompt: '面向东方站立，你的左手边是什么方向？', image: '🧭', answer: '北方', detail: '面向东方时，左边是北，右边是南。', choices: ['北方', '南方', '西方'] },
    { id: 'g1-log-classify', category: '分类', prompt: '铅笔、尺子、橡皮、苹果中，不是同一类的是什么？', image: '🍎', answer: '苹果', detail: '前三样是学习用品，苹果是水果。', choices: ['铅笔', '橡皮', '苹果'] },
    { id: 'g1-log-infer', category: '推理', prompt: '小明比小红高，小红比小丽高。谁最高？', image: '📏', answer: '小明', detail: '小明＞小红＞小丽，所以小明最高。', choices: ['小明', '小红', '小丽'] },
    { id: 'g1-log-route', category: '路线', prompt: '从家向前走，在第一个路口向右转，最可能先看到什么？\n家 ↑ 路口 → 书店', image: '🗺️', answer: '书店', detail: '按照“向前、右转”的路线，会到达书店。', choices: ['书店', '家', '路口后方'] },
    { id: 'g1-log-riddle', category: '条件推理', prompt: '盒子里只有红球和蓝球。拿出的不是红球，那一定是什么球？', image: '🔴🔵', answer: '蓝球', detail: '只有两种可能，排除红球后就只剩蓝球。', choices: ['红球', '蓝球', '黄球'] }
  ])
];

export const grade2Subjects = [
  subject('g2-chinese', '语文基础', '📖', '#d87559', '#fff0e8', '字词辨析、句子练习和标点', [
    { id: 'g2-cn-polyphone', category: '多音字', prompt: '“好学”中“好”的读音是什么？', image: '📚', answer: 'hào', detail: '“好学”表示喜欢学习，“好”读四声 hào。', choices: ['hǎo', 'hào', 'hāo'] },
    { id: 'g2-cn-synonym', category: '近义词', prompt: '“特别”的近义词是什么？', image: '🔎', answer: '非常', detail: '“今天特别热”也可以说“今天非常热”。', choices: ['非常', '普通', '立刻'] },
    { id: 'g2-cn-word', category: '字词', prompt: '选字填空：同学们正在仔细地（　）察蚂蚁。', image: '🐜', answer: '观', detail: '“观察”表示仔细地看和研究。', choices: ['现', '观', '见'] },
    { id: 'g2-cn-structure', category: '汉字', prompt: '“园”是什么结构的字？', image: '🏞️', answer: '全包围结构', detail: '“囗”从四周把“元”包围起来。', choices: ['左右结构', '上下结构', '全包围结构'] },
    { id: 'g2-cn-collocation', category: '词语搭配', prompt: '选择合适的词语：（　）的阳光', image: '☀️', answer: '温暖', detail: '“温暖的阳光”搭配自然。', choices: ['温暖', '嘈杂', '飞快'] },
    { id: 'g2-cn-ba', category: '句子', prompt: '把句子改成“把”字句：\n小明关上了窗户。', image: '🪟', answer: '小明把窗户关上了。', detail: '把被处理的事物“窗户”放在“把”后面。' },
    { id: 'g2-cn-metaphor', category: '句子', prompt: '哪一句使用了比喻？', image: '🌙', answer: '弯弯的月亮像一条小船。', detail: '句子把弯月比作小船，写出它们形状相似。', choices: ['月亮出来了。', '弯弯的月亮像一条小船。', '我看见月亮。'] },
    { id: 'g2-cn-punctuation', category: '标点', prompt: '“这棵树真高啊（　）”应填什么标点？', image: '🌳', answer: '！', detail: '句子表达强烈的赞叹，句末用感叹号。', choices: ['。', '？', '！'] }
  ]),
  subject('g2-reading', '阅读表达', '🌿', '#5f9467', '#eaf6e9', '段落理解、原因结果和概括', [
    { id: 'g2-read-main', category: '概括', prompt: '清晨，爷爷带我去公园跑步。我们看见有人打太极拳，有人跳绳，还有人绕湖慢跑。\n这段话主要写什么？', image: '🏃', answer: '公园里的人们在晨练。', detail: '后面的例子都围绕“晨练”展开。', choices: ['公园里的人们在晨练。', '爷爷喜欢太极拳。', '湖水很美。'] },
    { id: 'g2-read-cause', category: '原因结果', prompt: '小树在狂风中摇晃，乐乐找来木棍和绳子，把小树支撑起来。\n乐乐为什么要支撑小树？', image: '🌳', answer: '因为小树在狂风中摇晃，可能会被吹倒。', detail: '联系前文“狂风中摇晃”就能找到原因。' },
    { id: 'g2-read-pronoun', category: '指代', prompt: '小猫追着毛线球满屋子跑，它一会儿跳上沙发，一会儿钻到桌底。\n“它”指的是谁？', image: '🐈', answer: '小猫', detail: '“它”指代前面提到的小猫。', choices: ['毛线球', '小猫', '沙发'] },
    { id: 'g2-read-order', category: '顺序', prompt: '我先把黄豆泡在水里，第二天它鼓起了小肚子，又过两天，一根白色的小芽钻了出来。\n黄豆最后发生了什么变化？', image: '🌱', answer: '长出了白色的小芽', detail: '按时间顺序读，最后一句写的就是最后的变化。', choices: ['变干了', '长出了白色的小芽', '变成了花'] },
    { id: 'g2-read-character', category: '人物品质', prompt: '小雨在操场上捡到一个文具盒。她站在原地等了一会儿，没看到失主，就把文具盒交给老师。\n小雨是一个怎样的孩子？', image: '🎒', answer: '诚实', detail: '她没有把捡到的东西据为己有，说明她拾金不昧、很诚实。', choices: ['诚实', '胆小', '马虎'] },
    { id: 'g2-read-title', category: '标题', prompt: '松鼠在秋天收集松果，把它们藏在树洞里。冬天食物变少时，它就取出松果充饥。\n哪个标题最合适？', image: '🐿️', answer: '松鼠储存食物', detail: '标题要同时概括“秋天收集”和“冬天食用”。', choices: ['冬天来了', '松鼠储存食物', '树洞里的松果'] },
    { id: 'g2-read-word', category: '联系上下文', prompt: '大雨过后，天空逐渐放晴，一道彩虹挂在天边。\n“逐渐”最接近什么意思？', image: '🌈', answer: '慢慢地', detail: '结合天气由雨到晴的变化，可知“逐渐”表示慢慢变化。', choices: ['突然', '慢慢地', '永远'] },
    { id: 'g2-read-expression', category: '表达', prompt: '用“有的……有的……还有的……”写操场上的活动。', image: '🏫', answer: '示例：操场上，有的同学跳绳，有的同学踢球，还有的同学在跑步。', detail: '注意三个分句都围绕“操场活动”，句子要通顺。' }
  ]),
  subject('g2-math', '数学计算', '🔢', '#417fb5', '#e7f3ff', '百以内加减、表内乘除', [
    { id: 'g2-math-add', category: '百以内加法', prompt: '47 + 36 = ?', image: '🧮', answer: '83', detail: '个位 7 + 6 = 13，向十位进 1；十位 4 + 3 + 1 = 8。', choices: ['73', '83', '93'] },
    { id: 'g2-math-sub', category: '百以内减法', prompt: '72 − 38 = ?', image: '➖', answer: '34', detail: '个位 2 不够减 8，从十位退 1 当 10，12 减 8 等于 4，十位 6 减 3 等于 3。', choices: ['34', '44', '46'] },
    { id: 'g2-math-times', category: '表内乘法', prompt: '7 × 8 = ?', image: '✖️', answer: '56', detail: '七八五十六。', choices: ['48', '54', '56'] },
    { id: 'g2-math-divide', category: '表内除法', prompt: '36 ÷ 6 = ?', image: '➗', answer: '6', detail: '因为 6 乘 6 等于 36，所以 36 除以 6 等于 6。', choices: ['5', '6', '7'] },
    { id: 'g2-math-mixed', category: '混合口算', prompt: '6 × 4 + 5 = ?', image: '🧠', answer: '29', detail: '先算 6 乘 4 等于 24，再算 24 加 5 等于 29。', choices: ['24', '29', '44'] },
    { id: 'g2-math-missing', category: '填空', prompt: '（　）× 5 = 40', image: '🧩', answer: '8', detail: '想五八四十，或者用 40 除以 5 等于 8。', choices: ['6', '8', '9'] },
    { id: 'g2-math-estimate', category: '估算', prompt: '38 + 41 的结果最接近哪个整十数？', image: '🎯', answer: '80', detail: '38 约等于 40，41 约等于 40，和大约是 80。', choices: ['60', '70', '80'] },
    { id: 'g2-math-unit', category: '长度单位', prompt: '1 米等于多少厘米？', image: '📏', answer: '100 厘米', detail: '1 米 = 100 厘米。', choices: ['10 厘米', '100 厘米', '1000 厘米'] }
  ]),
  subject('g2-application', '数学应用', '📐', '#7b6caf', '#efecfb', '乘除应用、时间、方向和数据', [
    { id: 'g2-app-times', category: '乘法应用', prompt: '每盘放 6 个橘子，4 盘一共有多少个？', image: '🍊', answer: '24 个', detail: '4 个 6 相加，用乘法：6 乘 4 等于 24。', choices: ['10 个', '20 个', '24 个'] },
    { id: 'g2-app-divide', category: '除法应用', prompt: '18 本书平均分给 3 个小组，每组分几本？', image: '📚', answer: '6 本', detail: '平均分用除法：18 除以 3 等于 6。', choices: ['5 本', '6 本', '9 本'] },
    { id: 'g2-app-two-step', category: '两步问题', prompt: '车上原有 35 人，到站下去 12 人，又上来 8 人。现在有多少人？', image: '🚌', answer: '31 人', detail: '先算 35 减 12 等于 23，再算 23 加 8 等于 31。', choices: ['23 人', '31 人', '39 人'] },
    { id: 'g2-app-time', category: '时间', prompt: '一节课 8:30 开始，9:10 结束，上了多长时间？', image: '⏰', answer: '40 分钟', detail: '从 8:30 到 9:00 是 30 分钟，再到 9:10 是 10 分钟，共 40 分钟。', choices: ['30 分钟', '40 分钟', '50 分钟'] },
    { id: 'g2-app-money', category: '人民币', prompt: '一本笔记本 8 元，买 3 本需要多少元？付 30 元应找回多少元？', image: '💰', answer: '需要 24 元，找回 6 元', detail: '先算 8 乘 3 等于 24，再算 30 减 24 等于 6。', choices: ['需要 24 元，找回 6 元', '需要 18 元，找回 12 元', '需要 24 元，找回 4 元'] },
    { id: 'g2-app-direction', category: '方向', prompt: '地图上通常按照“上北下南”确定方向，那么左边是什么方向？', image: '🧭', answer: '西', detail: '地图上通常是上北、下南、左西、右东。', choices: ['东', '西', '南'] },
    { id: 'g2-app-data', category: '数据', prompt: '一组同学喜欢的水果人数：\n苹果 6 人，香蕉 4 人，葡萄 7 人。\n喜欢哪种水果的人最多？', image: '📊', answer: '葡萄', detail: '比较 6、4、7，7 最大。', choices: ['苹果', '香蕉', '葡萄'] },
    { id: 'g2-app-remainder', category: '解决问题', prompt: '25 名同学坐船，每条船最多坐 4 人，至少需要几条船？', image: '🚣', answer: '7 条', detail: '6 条船只能坐 24 人，还有 1 人，所以至少需要 7 条。', choices: ['6 条', '7 条', '8 条'] }
  ]),
  subject('g2-english', '英语入门', '🌍', '#4d876e', '#e8f5ed', '日常活动、时间、地点和短句', [
    { id: 'g2-en-routine', category: '日常活动', prompt: 'I get up at seven.', image: '⏰', answer: '我七点起床。', detail: 'get up 是“起床”，at seven 是“在七点”。', speak: 'I get up at seven.', lang: 'en-US', choices: ['我七点起床。', '我七点睡觉。', '我有七本书。'] },
    { id: 'g2-en-like', category: '喜好', prompt: 'I like playing football.', image: '⚽', answer: '我喜欢踢足球。', detail: 'like doing 表示喜欢做某事。', speak: 'I like playing football.', lang: 'en-US', choices: ['我喜欢踢足球。', '我会打篮球。', '我不喜欢运动。'] },
    { id: 'g2-en-weather', category: '天气', prompt: 'It is rainy today.', image: '🌧️', answer: '今天是雨天。', detail: 'rainy 是“有雨的”，sunny 是“晴朗的”。', speak: 'It is rainy today.', lang: 'en-US', choices: ['今天是雨天。', '今天是晴天。', '今天很冷。'] },
    { id: 'g2-en-place', category: '地点', prompt: 'Where is the library?', image: '🏛️', answer: '图书馆在哪里？', detail: 'Where is ...? 用来询问一个地方或物品在哪里。', speak: 'Where is the library?', lang: 'en-US', choices: ['图书馆在哪里？', '这是图书馆吗？', '你喜欢图书馆吗？'] },
    { id: 'g2-en-can', category: '能力', prompt: 'The bird can fly.', image: '🐦', answer: '鸟会飞。', detail: 'can 加动词原形，表示“会做……”。', speak: 'The bird can fly.', lang: 'en-US', choices: ['鸟会飞。', '鸟正在吃东西。', '鸟在树下。'] },
    { id: 'g2-en-question', category: '对话', prompt: 'How old are you?', image: '🎂', answer: '你几岁了？', detail: '回答可以说 I am eight. 我八岁。', speak: 'How old are you?', lang: 'en-US', choices: ['你叫什么名字？', '你几岁了？', '你在哪里？'] },
    { id: 'g2-en-plural', category: '单复数', prompt: 'three ______', image: '🍎🍎🍎', answer: 'apples', detail: '数量大于 1 时，apple 通常要变成复数 apples。', speak: 'three apples', lang: 'en-US', choices: ['apple', 'apples', 'an apple'] },
    { id: 'g2-en-read', category: '阅读', prompt: 'Tom has a red kite. He flies it in the park.\nWhat does Tom have?', image: '🪁', answer: 'A red kite.', detail: '问句询问 Tom 有什么，短文第一句说他有一只红色风筝。', speak: 'Tom has a red kite. He flies it in the park. What does Tom have? A red kite.', lang: 'en-US', choices: ['A red kite.', 'A blue ball.', 'A yellow bike.'] }
  ]),
  subject('g2-science', '科学常识', '🔬', '#667ca8', '#ebeff9', '天气、材料、生命与简单实验', [
    { id: 'g2-sci-weather', category: '天气', prompt: '测量气温应使用什么工具？', image: '🌡️', answer: '温度计', detail: '温度计用来测量空气、水或物体的温度。', choices: ['尺子', '温度计', '放大镜'] },
    { id: 'g2-sci-water-cycle', category: '水', prompt: '湿衣服晾在太阳下慢慢变干，水去了哪里？', image: '👕', answer: '变成水蒸气进入空气', detail: '液态水变成水蒸气的过程叫蒸发。', choices: ['消失了', '变成水蒸气进入空气', '全部流到地下'] },
    { id: 'g2-sci-material', category: '材料', prompt: '制作雨伞的主要材料需要具有什么特点？', image: '☂️', answer: '防水', detail: '雨伞需要挡住雨水，因此伞面材料应当不易透水。', choices: ['容易吸水', '防水', '容易破碎'] },
    { id: 'g2-sci-sound', category: '声音', prompt: '用手按住正在发声的皮筋，声音会停止。这说明声音与什么有关？', image: '🎸', answer: '物体的振动', detail: '物体振动会产生声音，振动停止，声音也会停止。', choices: ['物体的振动', '物体的颜色', '天气的冷热'] },
    { id: 'g2-sci-food-chain', category: '生命', prompt: '青蛙在田里捕食害虫，这对庄稼有什么帮助？', image: '🐸', answer: '减少害虫对庄稼的伤害', detail: '青蛙能捕食许多农田害虫，是庄稼的朋友。', choices: ['减少害虫对庄稼的伤害', '让庄稼停止生长', '让土地变干'] },
    { id: 'g2-sci-seed', category: '实验', prompt: '两颗相同的种子，一颗每天浇适量的水，另一颗不浇水。这个实验主要研究什么？', image: '🌱', answer: '水是否影响种子发芽', detail: '实验中只改变了“有没有水”，其他条件保持相同。', choices: ['水是否影响种子发芽', '阳光是否影响发芽', '种子的颜色'] },
    { id: 'g2-sci-earth', category: '地球', prompt: '白天和黑夜交替与地球的什么运动有关？', image: '🌍', answer: '自转', detail: '地球不停地自转，面向太阳的一面是白天，背对太阳的一面是黑夜。', choices: ['自转', '下雨', '月亮发光'] },
    { id: 'g2-sci-safety', category: '安全', prompt: '雷雨天在户外，下面哪种做法更安全？', image: '⛈️', answer: '尽快进入有防雷设施的室内', detail: '雷雨天要远离高大树木、金属杆和空旷场地。', choices: ['躲在大树下', '站在空旷操场上', '尽快进入有防雷设施的室内'] }
  ]),
  subject('g2-logic', '逻辑思维', '🧩', '#b47b3f', '#fff1d9', '数量规律、条件推理和策略', [
    { id: 'g2-log-number', category: '数列规律', prompt: '3，6，12，24，（　）', image: '🔍', answer: '48', detail: '后一个数都是前一个数的 2 倍。', choices: ['30', '36', '48'] },
    { id: 'g2-log-difference', category: '规律', prompt: '1，4，9，16，（　）', image: '🧠', answer: '25', detail: '它们依次是 1 乘 1、2 乘 2、3 乘 3、4 乘 4，下一个是 5 乘 5 等于 25。', choices: ['20', '24', '25'] },
    { id: 'g2-log-weight', category: '比较推理', prompt: '苹果比梨重，梨比桃子重。哪种水果最轻？', image: '⚖️', answer: '桃子', detail: '苹果＞梨＞桃子，所以桃子最轻。', choices: ['苹果', '梨', '桃子'] },
    { id: 'g2-log-seat', category: '位置推理', prompt: '三个座位排成一排。小明不坐两边，小红坐在小明左边。右边坐的是谁？', image: '🪑', answer: '第三位同学', detail: '小明只能坐中间，小红坐左边，右边留给第三位同学。' },
    { id: 'g2-log-clock', category: '周期推理', prompt: '今天是星期二，10 天后是星期几？', image: '📅', answer: '星期五', detail: '7 天后还是星期二，再过 3 天是星期五。', choices: ['星期四', '星期五', '星期六'] },
    { id: 'g2-log-box', category: '排除', prompt: '三个盒子分别装着铅笔、橡皮和尺子。红盒子不是铅笔，也不是尺子。红盒子装的是什么？', image: '🎁', answer: '橡皮', detail: '排除铅笔和尺子后，只剩橡皮。', choices: ['铅笔', '橡皮', '尺子'] },
    { id: 'g2-log-count', category: '数量推理', prompt: '小明从 1 楼走到 4 楼，一共走了几段楼梯？', image: '🪜', answer: '3 段', detail: '1 到 2 是一段，2 到 3 是一段，3 到 4 是一段，共 3 段。', choices: ['3 段', '4 段', '5 段'] },
    { id: 'g2-log-strategy', category: '策略', prompt: '有 9 枚硬币，其中 1 枚比其他轻。用天平至少称几次一定能找到？', image: '⚖️', answer: '2 次', detail: '先分成 3 组，每组 3 枚。第一次确定轻币在哪组，第二次再从该组 3 枚中找出。', choices: ['1 次', '2 次', '3 次'] }
  ])
];
