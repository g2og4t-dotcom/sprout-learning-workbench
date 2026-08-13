export const subjects = [
  {
    id: 'literacy', name: '识字乐园', icon: '✏️', color: '#f3a45b', soft: '#fff1df',
    description: '认汉字、读拼音、会组词',
    cards: [
      { id: 'literacy-sun', category: '自然', prompt: '日', pinyin: 'rì', image: '☀️', answer: '太阳的日', detail: '组词：日出、日光、生日', story: '“日”最早画的就是圆圆的太阳。' },
      { id: 'literacy-moon', category: '自然', prompt: '月', pinyin: 'yuè', image: '🌙', answer: '月亮的月', detail: '组词：月亮、月光、一月', story: '弯弯的月亮，慢慢变成了“月”字。' },
      { id: 'literacy-water', category: '自然', prompt: '水', pinyin: 'shuǐ', image: '💧', answer: '喝水的水', detail: '组词：河水、开水、水果', story: '中间像水流，两边像飞溅的小水滴。' },
      { id: 'literacy-fire', category: '自然', prompt: '火', pinyin: 'huǒ', image: '🔥', answer: '火苗的火', detail: '组词：火山、火车、生火', story: '古人把跳动的火苗画成了“火”。' },
      { id: 'literacy-person', category: '身体', prompt: '人', pinyin: 'rén', image: '🧒', answer: '人们的人', detail: '组词：大人、人口、主人', story: '一撇一捺，像一个人站立的样子。' },
      { id: 'literacy-mouth', category: '身体', prompt: '口', pinyin: 'kǒu', image: '👄', answer: '嘴巴的口', detail: '组词：开口、门口、人口', story: '方方的形状，就像张开的嘴巴。' },
      { id: 'literacy-big', category: '生活', prompt: '大', pinyin: 'dà', image: '🐘', answer: '大小的大', detail: '组词：大家、大山、长大', story: '一个人张开双臂，表示很大。' },
      { id: 'literacy-small', category: '生活', prompt: '小', pinyin: 'xiǎo', image: '🐜', answer: '大小的小', detail: '组词：小手、小鸟、小时', story: '三个小点聚在一起，表示细小。' }
    ]
  },
  {
    id: 'pinyin', name: '拼音乐园', icon: '🔤', color: '#de7180', soft: '#ffe9ed',
    description: '听发音、认声调、学拼读',
    cards: [
      { id: 'pinyin-a', category: '单韵母', prompt: 'a', pinyin: 'ā á ǎ à', image: '👧', answer: '张大嘴巴 a a a', detail: '例词：阿姨 ā yí', speak: '啊' },
      { id: 'pinyin-o', category: '单韵母', prompt: 'o', pinyin: 'ō ó ǒ ò', image: '🐓', answer: '公鸡打鸣 o o o', detail: '嘴巴圆圆，声音响亮。', speak: '喔' },
      { id: 'pinyin-e', category: '单韵母', prompt: 'e', pinyin: 'ē é ě è', image: '🦢', answer: '白鹅倒影 e e e', detail: '例词：白鹅 bái é', speak: '鹅' },
      { id: 'pinyin-b', category: '声母', prompt: 'b', pinyin: 'bō', image: '📻', answer: '听广播 b b b', detail: '拼一拼：b + a → ba', speak: '播' },
      { id: 'pinyin-p', category: '声母', prompt: 'p', pinyin: 'pō', image: '🛝', answer: '爬山坡 p p p', detail: '拼一拼：p + o → po', speak: '坡' },
      { id: 'pinyin-ai', category: '复韵母', prompt: 'ai', pinyin: 'āi ái ǎi ài', image: '❤️', answer: '姐姐弟弟挨着坐', detail: '例词：爱心 ài xīn', speak: '爱' },
      { id: 'pinyin-zh', category: '声母', prompt: 'zh', pinyin: 'zhī', image: '🕷️', answer: '蜘蛛织网 zh zh zh', detail: 'zh 是翘舌音。', speak: '知' },
      { id: 'pinyin-zhi', category: '整体认读', prompt: 'zhi', pinyin: 'zhī zhí zhǐ zhì', image: '📄', answer: '整体认读，不能拆开拼', detail: '例词：知道、白纸、数字。', speak: '知' }
    ]
  },
  {
    id: 'math', name: '数学王国', icon: '🔢', color: '#5f9fce', soft: '#e8f5ff',
    description: '数一数、算一算、找规律',
    cards: [
      { id: 'math-count-5', category: '认数字', prompt: '5', image: '⭐⭐⭐⭐⭐', answer: '五', detail: '数一数，一共有 5 颗星。', speak: '五' },
      { id: 'math-add-3', category: '加法', prompt: '2 + 1 = ?', image: '🍎🍎  +  🍎', answer: '3', detail: '两个苹果再放进一个，一共有三个。', choices: ['2', '3', '4'] },
      { id: 'math-add-7', category: '加法', prompt: '4 + 3 = ?', image: '🐟🐟🐟🐟  +  🐟🐟🐟', answer: '7', detail: '从 4 接着数：5、6、7。', choices: ['6', '7', '8'] },
      { id: 'math-sub-3', category: '减法', prompt: '5 − 2 = ?', image: '🍓🍓🍓🍓🍓', answer: '3', detail: '5 颗草莓拿走 2 颗，还剩 3 颗。', choices: ['2', '3', '4'] },
      { id: 'math-compare', category: '比大小', prompt: '8 ○ 6', image: '🐘  VS  🐇', answer: '>', detail: '8 比 6 大，所以填大于号。', choices: ['<', '=', '>'] },
      { id: 'math-shape', category: '认图形', prompt: '哪个是三角形？', image: '🔵  🔺  🟨', answer: '🔺', detail: '三角形有三条边和三个角。', choices: ['🔵', '🔺', '🟨'] },
      { id: 'math-pattern', category: '找规律', prompt: '🔴 🔵 🔴 🔵 ？', image: '🧠', answer: '🔴', detail: '红、蓝交替出现，下一个是红色。', choices: ['🔴', '🔵', '🟡'] },
      { id: 'math-life', category: '生活题', prompt: '桌上有 3 杯水，又拿来 2 杯，一共有几杯？', image: '🥛🥛🥛 + 🥛🥛', answer: '5', detail: '3 + 2 = 5，一共有 5 杯。', choices: ['4', '5', '6'] }
    ]
  },
  {
    id: 'english', name: '英语小岛', icon: '🌍', color: '#6aa478', soft: '#eaf7e9',
    description: '看图片、听单词、说短句',
    cards: [
      { id: 'english-apple', category: '水果', prompt: 'apple', pinyin: '/ˈæpəl/', image: '🍎', answer: '苹果', detail: 'I like apples. 我喜欢苹果。', speak: 'apple', lang: 'en-US' },
      { id: 'english-banana', category: '水果', prompt: 'banana', pinyin: '/bəˈnænə/', image: '🍌', answer: '香蕉', detail: 'A yellow banana. 一根黄色的香蕉。', speak: 'banana', lang: 'en-US' },
      { id: 'english-cat', category: '动物', prompt: 'cat', pinyin: '/kæt/', image: '🐱', answer: '猫', detail: 'This is a cat. 这是一只猫。', speak: 'cat', lang: 'en-US' },
      { id: 'english-dog', category: '动物', prompt: 'dog', pinyin: '/dɔːɡ/', image: '🐶', answer: '狗', detail: 'The dog can run. 小狗会跑。', speak: 'dog', lang: 'en-US' },
      { id: 'english-red', category: '颜色', prompt: 'red', pinyin: '/red/', image: '🔴', answer: '红色', detail: 'It is red. 它是红色的。', speak: 'red', lang: 'en-US' },
      { id: 'english-blue', category: '颜色', prompt: 'blue', pinyin: '/bluː/', image: '🔵', answer: '蓝色', detail: 'The sky is blue. 天空是蓝色的。', speak: 'blue', lang: 'en-US' },
      { id: 'english-family', category: '家庭', prompt: 'family', pinyin: '/ˈfæməli/', image: '👨‍👩‍👧', answer: '家庭', detail: 'I love my family. 我爱我的家。', speak: 'family', lang: 'en-US' },
      { id: 'english-five', category: '数字', prompt: 'five', pinyin: '/faɪv/', image: '🖐️', answer: '五', detail: 'I am five. 我五岁。', speak: 'five', lang: 'en-US' }
    ]
  },
  {
    id: 'science', name: '科普实验室', icon: '🔬', color: '#7f78bb', soft: '#f0edff',
    description: '观察世界、发现为什么',
    cards: [
      { id: 'science-rain', category: '自然奥秘', prompt: '雨从哪里来？', image: '🌧️', answer: '云里的小水滴变重后落下来。', detail: '太阳把水晒成水蒸气，水蒸气升到天空变成云。' },
      { id: 'science-seed', category: '自然奥秘', prompt: '种子怎样长大？', image: '🌱', answer: '需要水、空气、阳光和合适的温度。', detail: '先长根，再长茎和叶子。' },
      { id: 'science-fish', category: '动物世界', prompt: '小鱼用什么呼吸？', image: '🐟', answer: '鳃', detail: '鱼鳃可以从水里获得氧气。', choices: ['鼻子', '鳃', '翅膀'] },
      { id: 'science-bird', category: '动物世界', prompt: '鸟的身体为什么适合飞行？', image: '🕊️', answer: '有翅膀、羽毛和较轻的骨骼。', detail: '流线型的身体也能减小空气阻力。' },
      { id: 'science-heart', category: '身体秘密', prompt: '心脏在做什么？', image: '❤️', answer: '不停地把血液送到全身。', detail: '运动后心跳会加快，因为身体需要更多氧气。' },
      { id: 'science-teeth', category: '身体秘密', prompt: '为什么早晚要刷牙？', image: '🦷', answer: '清除食物残渣，保护牙齿。', detail: '每次认真刷够两分钟。' },
      { id: 'science-shadow', category: '生活科学', prompt: '影子是怎么出现的？', image: '🔦', answer: '物体挡住了光，就会形成影子。', detail: '试试用手电筒照玩具，移动灯光观察影子。' },
      { id: 'science-float', category: '生活科学', prompt: '什么东西可能浮在水上？', image: '🪵', answer: '小木块', detail: '不同材料、形状和内部空气都会影响沉浮。', choices: ['小木块', '铁球', '石头'] }
    ]
  },
  {
    id: 'poetry', name: '古诗时光', icon: '📜', color: '#b47c54', soft: '#f8eee4',
    description: '听诗句、懂意思、会背诵',
    cards: [
      { id: 'poetry-goose', category: '启蒙诗', prompt: '咏鹅', pinyin: '骆宾王', image: '🪿', answer: '鹅，鹅，鹅，曲项向天歌。\n白毛浮绿水，红掌拨清波。', detail: '白鹅弯着脖子鸣叫，白羽毛浮在绿水上，红脚掌拨动清波。' },
      { id: 'poetry-night', category: '唐诗', prompt: '静夜思', pinyin: '李白', image: '🌙', answer: '床前明月光，疑是地上霜。\n举头望明月，低头思故乡。', detail: '诗人在安静的夜里看见月光，想起了家乡。' },
      { id: 'poetry-spring', category: '唐诗', prompt: '春晓', pinyin: '孟浩然', image: '🌸', answer: '春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。', detail: '春日清晨，诗人听到鸟鸣，想起夜里的风雨和落花。' },
      { id: 'poetry-farm', category: '唐诗', prompt: '悯农（其二）', pinyin: '李绅', image: '🌾', answer: '锄禾日当午，汗滴禾下土。\n谁知盘中餐，粒粒皆辛苦。', detail: '每一粒粮食都来之不易，要珍惜食物。' },
      { id: 'poetry-tower', category: '唐诗', prompt: '登鹳雀楼', pinyin: '王之涣', image: '🏯', answer: '白日依山尽，黄河入海流。\n欲穷千里目，更上一层楼。', detail: '想看得更远，就要站得更高，也比喻不断进步。' },
      { id: 'poetry-painting', category: '启蒙诗', prompt: '画', pinyin: '佚名', image: '🖼️', answer: '远看山有色，近听水无声。\n春去花还在，人来鸟不惊。', detail: '诗中的景物不会变化，因为描写的是一幅画。' },
      { id: 'poetry-wind', category: '唐诗', prompt: '风', pinyin: '李峤', image: '🍃', answer: '解落三秋叶，能开二月花。\n过江千尺浪，入竹万竿斜。', detail: '看不见风，却能从落叶、花开、水浪和竹子感受到它。' },
      { id: 'poetry-pond', category: '宋诗', prompt: '小池', pinyin: '杨万里', image: '🪷', answer: '泉眼无声惜细流，树阴照水爱晴柔。\n小荷才露尖尖角，早有蜻蜓立上头。', detail: '初夏的小池安静美丽，小荷刚冒尖，蜻蜓已经飞来。' }
    ]
  },
  {
    id: 'logic', name: '逻辑城堡', icon: '🧩', color: '#d09344', soft: '#fff4d8',
    description: '分类、排序、配对和推理',
    cards: [
      { id: 'logic-fruit', category: '分类', prompt: '哪个不是水果？', image: '🍎 🍌 🥕', answer: '🥕', detail: '胡萝卜是蔬菜，苹果和香蕉是水果。', choices: ['🍎', '🍌', '🥕'] },
      { id: 'logic-animal', category: '分类', prompt: '哪个会在水里游？', image: '🐟 🐈 🐓', answer: '🐟', detail: '鱼生活在水里，用鳍游动。', choices: ['🐟', '🐈', '🐓'] },
      { id: 'logic-size', category: '排序', prompt: '从小到大应该怎么排？', image: '🐘 🐜 🐕', answer: '🐜 → 🐕 → 🐘', detail: '蚂蚁最小，小狗居中，大象最大。' },
      { id: 'logic-day', category: '排序', prompt: '早晨之后通常是什么？', image: '🌅 → ？ → 🌙', answer: '中午', detail: '一天通常按早晨、中午、晚上变化。', choices: ['中午', '昨天', '冬天'] },
      { id: 'logic-pattern-1', category: '找规律', prompt: '⭐ 🌙 ⭐ 🌙 ？', image: '🔍', answer: '⭐', detail: '星星和月亮轮流出现。', choices: ['⭐', '☀️', '🌙'] },
      { id: 'logic-pattern-2', category: '找规律', prompt: '1，2，3，4，？', image: '🚂', answer: '5', detail: '每次增加 1，下一个数是 5。', choices: ['4', '5', '6'] },
      { id: 'logic-pair', category: '配对', prompt: '牙刷应该和谁配对？', image: '🪥', answer: '🦷', detail: '牙刷用来清洁牙齿。', choices: ['🦷', '👂', '👟'] },
      { id: 'logic-riddle', category: '推理', prompt: '下雨出门，需要带什么？', image: '🌧️', answer: '☂️', detail: '雨伞可以帮助我们挡雨。', choices: ['🕶️', '☂️', '🪁'] }
    ]
  }
];

export const defaultTasks = [
  { id: 'task-study-5', label: '学习 5 张知识卡', icon: '🧩', target: 5, type: 'cards' },
  { id: 'task-read', label: '大声朗读 10 分钟', icon: '🗣️', target: 1, type: 'manual' },
  { id: 'task-move', label: '运动或户外活动', icon: '🏃', target: 1, type: 'manual' }
];

export const defaultRewards = [
  { id: 'reward-story', name: '今晚多讲一个故事', icon: '📚', cost: 5 },
  { id: 'reward-game', name: '亲子游戏 20 分钟', icon: '🎲', cost: 10 },
  { id: 'reward-outing', name: '周末家庭小出游', icon: '🚲', cost: 20 }
];

export const findSubject = (subjectId) => subjects.find((subject) => subject.id === subjectId);
export const allCards = subjects.flatMap((subject) => subject.cards.map((card) => ({ ...card, subjectId: subject.id })));
