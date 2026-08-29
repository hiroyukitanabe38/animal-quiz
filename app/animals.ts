import { animalMetadata, difficultyLabels, type Difficulty } from "./animal-metadata";

export { difficultyIcons, difficultyLabels, difficultyOrder, difficultyTotals, type Difficulty } from "./animal-metadata";

export type AnimalQuiz = {
  id: string;
  name: string;
  initial: string;
  difficulty: Difficulty;
  hints: [string, string, string];
  extraHint: string;
  choices: [string, string, string, string];
  answer: string;
  fact: string;
  imageKey: string;
  emoji: string;
};

type AnimalSeed = Omit<AnimalQuiz, "choices" | "answer" | "difficulty" | "extraHint" | "imageKey">;

const seedGroupA: AnimalSeed[] = [
  { id: "lion", name: "ライオン", initial: "ら", emoji: "🦁", hints: ["おおきな たてがみが あるよ", "アフリカの そうげんに すんでいるよ", "どうぶつの おうさまと よばれるよ"], fact: "おすの ほうが おおきく、なかまの なわばりを まもるよ。" },
  { id: "elephant", name: "ゾウ", initial: "ぞ", emoji: "🐘", hints: ["ながい はなと おおきな みみ", "くさや きのはを たべるよ", "りくで いちばん おおきい どうぶつ"], fact: "ながい はなは、ものを つかんだり みずを のんだり できるよ。" },
  { id: "giraffe", name: "キリン", initial: "き", emoji: "🦒", hints: ["くびが とっても ながいよ", "たかい きのはを たべるよ", "からだに ちゃいろい もようが あるよ"], fact: "したは くらい むらさきいろで、ながさは 40センチほども あるよ。" },
  { id: "zebra", name: "シマウマ", initial: "し", emoji: "🦓", hints: ["しろと くろの しまもよう", "アフリカの そうげんに すむよ", "うまの なかまだよ"], fact: "しまもようは 1とうずつ ちがっていて、ゆびもんの ようだよ。" },
  { id: "panda", name: "パンダ", initial: "ぱ", emoji: "🐼", hints: ["しろと くろの からだ", "たけを たくさん たべるよ", "めの まわりが くろいよ"], fact: "1にちの はんぶんくらいを たけを たべて すごすよ。" },
  { id: "koala", name: "コアラ", initial: "こ", emoji: "🐨", hints: ["まるい みみと おおきな はな", "ユーカリの はを たべるよ", "きの うえで たくさん ねるよ"], fact: "1にちに 18〜20じかんも ねることが あるよ。" },
  { id: "kangaroo", name: "カンガルー", initial: "か", emoji: "🦘", hints: ["うしろあしが おおきいよ", "オーストラリアに すむよ", "おなかの ふくろで こどもを そだてるよ"], fact: "ながい しっぽで バランスを とりながら ジャンプするよ。" },
  { id: "gorilla", name: "ゴリラ", initial: "ご", emoji: "🦍", hints: ["むねと うでが とても たくましい", "アフリカの もりに すむよ", "やさしい せいかくの おおきな さる"], fact: "くさや くだものを たべ、かぞくで なかよく くらすよ。" },
  { id: "monkey", name: "サル", initial: "さ", emoji: "🐒", hints: ["ながい しっぽの なかまも いるよ", "きの うえが とくい", "てを つかって たべものを もつよ"], fact: "なかまと けづくろいを して、なかよしになるよ。" },
  { id: "tiger", name: "トラ", initial: "と", emoji: "🐯", hints: ["オレンジと くろの しまもよう", "もりや くさはらに すむよ", "ねこの なかまで とても つよいよ"], fact: "しまもようは けだけでなく、はだにも ついているよ。" },
  { id: "bear", name: "クマ", initial: "く", emoji: "🐻", hints: ["おおきな からだと まるい みみ", "もりに すむよ", "はちみつや さかなも たべるよ"], fact: "においを かぐ ちからが とても すぐれているよ。" },
  { id: "polar-bear", name: "ホッキョクグマ", initial: "ほ", emoji: "🐻‍❄️", hints: ["まっしろな けがわ", "こおりの おおい さむい ところに すむよ", "およぎが とっても じょうず"], fact: "けは とうめいで、ひかりが はんしゃして しろく みえるよ。" },
  { id: "hippo", name: "カバ", initial: "か", emoji: "🦛", hints: ["おおきな くちと ずんぐりした からだ", "ひるは みずの なかに いるよ", "よるに くさを たべるよ"], fact: "みずの なかでも みみや はなの あなを とじられるよ。" },
  { id: "rhino", name: "サイ", initial: "さ", emoji: "🦏", hints: ["はなの うえに つのが あるよ", "ぶあつい はだを しているよ", "おおきいけれど はしるのが はやいよ"], fact: "つのは かみのけや つめと にた そざいで できているよ。" },
  { id: "crocodile", name: "ワニ", initial: "わ", emoji: "🐊", hints: ["おおきな くちと するどい は", "かわや ぬまに すむよ", "みずの なかから めと はなを だすよ"], fact: "たまごから でる あかちゃんの こえを おかあさんが ききわけるよ。" },
  { id: "camel", name: "ラクダ", initial: "ら", emoji: "🐫", hints: ["せなかに こぶが あるよ", "さばくで くらしているよ", "ながい あいだ みずなしで あるけるよ"], fact: "こぶの なかには みずではなく、しぼうが たくわえられているよ。" },
  { id: "horse", name: "ウマ", initial: "う", emoji: "🐴", hints: ["ながい あしと たてがみ", "くさを たべるよ", "ひとを のせて はしれるよ"], fact: "たったまま ねむることも できるよ。" },
  { id: "cow", name: "ウシ", initial: "う", emoji: "🐄", hints: ["おおきな からだと つの", "ぼくじょうで くらすよ", "おちちから ぎゅうにゅうが できるよ"], fact: "いちど のみこんだ くさを くちに もどして、よく かむよ。" },
  { id: "pig", name: "ブタ", initial: "ぶ", emoji: "🐷", hints: ["まるい はなを しているよ", "なんでも よく たべるよ", "どろあそびが だいすき"], fact: "どろあそびは からだを すずしくして、はだを まもるためだよ。" },
  { id: "sheep", name: "ヒツジ", initial: "ひ", emoji: "🐑", hints: ["ふわふわの けで おおわれているよ", "くさを たべるよ", "けから あたたかい けいとが できるよ"], fact: "なかまの かおを たくさん おぼえられるよ。" },
  { id: "goat", name: "ヤギ", initial: "や", emoji: "🐐", hints: ["あごに ひげが あるよ", "くさや きのはを たべるよ", "たかい いわばも すいすい のぼるよ"], fact: "よこながの ひとみで、まわりを ひろく みわたせるよ。" },
  { id: "rabbit", name: "ウサギ", initial: "う", emoji: "🐰", hints: ["ながい みみ", "くさや はっぱを たべるよ", "ぴょんぴょん はねるよ"], fact: "うれしいときは からだを ひねって ジャンプすることが あるよ。" },
  { id: "dog", name: "イヌ", initial: "い", emoji: "🐶", hints: ["においを かぐのが とくい", "ひとと いっしょに くらすよ", "うれしいと しっぽを ふるよ"], fact: "ひとの なんぜんばいも においを かぎわけるのが とくいだよ。" },
  { id: "cat", name: "ネコ", initial: "ね", emoji: "🐱", hints: ["ひげと やわらかい にくきゅう", "たかい ところが とくい", "ゴロゴロと のどを ならすよ"], fact: "ひげで せまい ところを とおれるか たしかめるよ。" },
  { id: "squirrel", name: "リス", initial: "り", emoji: "🐿️", hints: ["ふさふさの おおきな しっぽ", "きのみを たべるよ", "どんぐりを じめんに かくすよ"], fact: "かくした きのみの いちぶが そだって、もりの きになるよ。" },
  { id: "mouse", name: "ネズミ", initial: "ね", emoji: "🐭", hints: ["ちいさな からだと ながい しっぽ", "せまい ところに はいれるよ", "まえばが ずっと のびるよ"], fact: "のびつづける はを けずるため、かたいものを かじるよ。" },
  { id: "fox", name: "キツネ", initial: "き", emoji: "🦊", hints: ["とがった みみと ふさふさの しっぽ", "もりや くさはらに すむよ", "コンコンと なくと いわれるよ"], fact: "ゆきの したの おとを きいて、ジャンプして えものを つかまえるよ。" },
  { id: "raccoon", name: "アライグマ", initial: "あ", emoji: "🦝", hints: ["めの まわりが くろいよ", "しましまの しっぽ", "まえあしで たべものを さわって たしかめるよ"], fact: "ての かんかくが とても するどく、みずに ぬれると もっと わかりやすいよ。" },
  { id: "deer", name: "シカ", initial: "し", emoji: "🦌", hints: ["おすには えだのような つの", "もりや そうげんに すむよ", "つのは まいとし はえかわるよ"], fact: "あかちゃんには しろい はんてんが あり、くさむらで みつかりにくいよ。" },
  { id: "boar", name: "イノシシ", initial: "い", emoji: "🐗", hints: ["はなで じめんを ほるよ", "もりに すむよ", "うりぼうには しまもようが あるよ"], fact: "とても はやく はしり、じょうずに およぐことも できるよ。" },
  { id: "wolf", name: "オオカミ", initial: "お", emoji: "🐺", hints: ["イヌに にた すがた", "なかまと むれで くらすよ", "とおくまで きこえる こえで ほえるよ"], fact: "むれの なかまどうしで たすけあって こどもを そだてるよ。" },
  { id: "cheetah", name: "チーター", initial: "ち", emoji: "🐆", hints: ["からだに くろい てんてん", "アフリカの そうげんに すむよ", "りくの どうぶつで いちばん はやいよ"], fact: "ほんきで はしると じどうしゃのような はやさになるよ。" },
  { id: "leopard", name: "ヒョウ", initial: "ひ", emoji: "🐆", hints: ["からだに うめのはなのような もよう", "きのぼりが とくい", "えものを きの うえまで はこぶよ"], fact: "とても ちからもちで、じぶんより おもい えものも はこべるよ。" },
  { id: "hyena", name: "ハイエナ", initial: "は", emoji: "🐕", hints: ["せなかが ななめに さがっているよ", "アフリカに すむよ", "わらいごえのような こえを だすよ"], fact: "あごの ちからが とても つよく、かたい ほねも かめるよ。" },
  { id: "sloth", name: "ナマケモノ", initial: "な", emoji: "🦥", hints: ["ながい つめで きに ぶらさがるよ", "ねったいの もりに すむよ", "とっても ゆっくり うごくよ"], fact: "1しゅうかんに 1かいほど、じめんに おりて トイレを するよ。" },
  { id: "anteater", name: "アリクイ", initial: "あ", emoji: "🐾", hints: ["ほそながい くち", "ながい したを もっているよ", "アリや シロアリを たべるよ"], fact: "はが なく、ながい したで アリを なめとって たべるよ。" },
  { id: "armadillo", name: "アルマジロ", initial: "あ", emoji: "🛡️", hints: ["からだが かたい こうらで おおわれているよ", "あたたかい ちいきに すむよ", "てきが くると まるくなる なかまも いるよ"], fact: "スペインごで『よろいを きた ちいさなもの』という いみだよ。" },
  { id: "meerkat", name: "ミーアキャット", initial: "み", emoji: "🦦", hints: ["ほそい からだで ちいさいよ", "さばくの ちかに すむよ", "うしろあしで たって みはりを するよ"], fact: "みはりばんは あぶないと なきごえで なかまに しらせるよ。" },
  { id: "otter", name: "カワウソ", initial: "か", emoji: "🦦", hints: ["ほそながい からだ", "かわや うみに すむよ", "およぎながら おなかの うえで かいを わるよ"], fact: "ラッコの なかまは ながされないよう、てを つないで ねることが あるよ。" },
  { id: "seal", name: "アザラシ", initial: "あ", emoji: "🦭", hints: ["つるんとした からだ", "うみで くらすよ", "ひれを つかって およぐよ"], fact: "みずの なかで ながい あいだ いきを とめられるよ。" },
  { id: "penguin", name: "ペンギン", initial: "ぺ", emoji: "🐧", hints: ["しろと くろの からだ", "とりだけど そらを とべないよ", "つばさを つかって うみを およぐよ"], fact: "コウテイペンギンの おとうさんは、あしの うえで たまごを あたためるよ。" },
  { id: "dolphin", name: "イルカ", initial: "い", emoji: "🐬", hints: ["なめらかな からだ", "うみで くらすよ", "ジャンプや おしゃべりが とくい"], fact: "なまえのような とくべつな なきごえで なかまを よぶよ。" },
  { id: "whale", name: "クジラ", initial: "く", emoji: "🐋", hints: ["とても おおきな からだ", "うみで くらすよ", "あたまの うえから しおを ふくように みえるよ"], fact: "シロナガスクジラは ちきゅうで いちばん おおきな どうぶつだよ。" },
  { id: "shark", name: "サメ", initial: "さ", emoji: "🦈", hints: ["するどい はが なんれつも あるよ", "うみで くらすよ", "はが ぬけても つぎつぎ はえるよ"], fact: "ほねの かわりに やわらかい なんこつで からだが できているよ。" },
  { id: "octopus", name: "タコ", initial: "た", emoji: "🐙", hints: ["あしが 8ぽん", "うみで くらすよ", "てきが くると すみを はくよ"], fact: "しんぞうが 3つあり、せまい すきまにも はいれるよ。" },
  { id: "jellyfish", name: "クラゲ", initial: "く", emoji: "🪼", hints: ["とうめいで ぷかぷか しているよ", "うみで くらすよ", "ほねも しんぞうも ないよ"], fact: "からだの ほとんどが みずで できているよ。" },
  { id: "sea-turtle", name: "ウミガメ", initial: "う", emoji: "🐢", hints: ["こうらが あるよ", "うみを ながく およぐよ", "すなはまに たまごを うむよ"], fact: "うまれた すなはまの ばしょを おぼえていて、もどってくるよ。" },
  { id: "frog", name: "カエル", initial: "か", emoji: "🐸", hints: ["おおきな うしろあし", "みずべに すむよ", "おたまじゃくしから すがたが かわるよ"], fact: "みずだけでなく、はだからも いきを するよ。" },
  { id: "snake", name: "ヘビ", initial: "へ", emoji: "🐍", hints: ["あしが なく ほそながい からだ", "じめんを くねくね すすむよ", "したを だして においを しらべるよ"], fact: "からだが おおきくなると、ふるい かわを ぬぐよ。" },
  { id: "tortoise", name: "リクガメ", initial: "り", emoji: "🐢", hints: ["かたい こうらを せおっているよ", "りくの うえで くらすよ", "ゆっくり あるいて とても ながいき"], fact: "100ねんいじょう いきる なかまも いるよ。" },
  { id: "owl", name: "フクロウ", initial: "ふ", emoji: "🦉", hints: ["おおきな まるい め", "よるに かつどうするよ", "くびを うしろまで ぐるりと まわせるよ"], fact: "はねの おとが とても しずかで、えものに きづかれにくいよ。" },
  { id: "eagle", name: "ワシ", initial: "わ", emoji: "🦅", hints: ["おおきな つばさと するどい つめ", "そら たかくを とぶよ", "とおくの ものまで よく みえるよ"], fact: "ひとの なんばいも とおくまで はっきり みえるよ。" },
  { id: "flamingo", name: "フラミンゴ", initial: "ふ", emoji: "🦩", hints: ["ピンクいろの はね", "みずべで くらすよ", "いっぽんあしで たつことが あるよ"], fact: "たべものに ふくまれる いろの もとで、はねが ピンクになるよ。" },
  { id: "peacock", name: "クジャク", initial: "く", emoji: "🦚", hints: ["おすの はねが とても きれい", "もりや くさはらに すむよ", "おおきな はねを おうぎのように ひろげるよ"], fact: "きれいな おおきい はねは おすだけが もっているよ。" },
  { id: "parrot", name: "オウム", initial: "お", emoji: "🦜", hints: ["カラフルな はね", "あたたかい もりに すむよ", "ひとの ことばを まねする なかまも いるよ"], fact: "あしの ゆびを じょうずに つかって、たべものを もてるよ。" },
  { id: "chicken", name: "ニワトリ", initial: "に", emoji: "🐔", hints: ["あたまに あかい とさか", "にわや とりごやに いるよ", "たまごを うむよ"], fact: "ひよこは たまごの なかから おかあさんの こえを きいているよ。" },
  { id: "duck", name: "アヒル", initial: "あ", emoji: "🦆", hints: ["ひらたい くちばし", "いけや かわで およぐよ", "あしに みずかきが あるよ"], fact: "はねに あぶらを ぬって、みずを はじくように しているよ。" },
  { id: "swan", name: "ハクチョウ", initial: "は", emoji: "🦢", hints: ["しろい はねと ながい くび", "みずうみで くらすよ", "さむくなると あたたかい ばしょへ とぶよ"], fact: "かぞくで Vの かたちに ならんで とぶことが あるよ。" },
  { id: "bee", name: "ミツバチ", initial: "み", emoji: "🐝", hints: ["きいろと くろの しまもよう", "はなから みつを あつめるよ", "なかまと おどりで ばしょを おしえるよ"], fact: "はなの みつから、あまい はちみつを つくるよ。" },
  { id: "butterfly", name: "チョウ", initial: "ち", emoji: "🦋", hints: ["きれいな 4まいの はね", "はなの みつを すうよ", "いもむしから すがたが かわるよ"], fact: "あしで はっぱの あじを たしかめることが できるよ。" },
];

const seedGroupB: AnimalSeed[] = [
  { id: "binturong", name: "ビントロング", initial: "び", emoji: "🐾", hints: ["くろくて ふさふさの からだ", "アジアの ねったいうりんに すむよ", "ポップコーンのような においが するよ"], fact: "しっぽを きの えだに まきつけて あるけるよ。" },
  { id: "red-panda", name: "レッサーパンダ", initial: "れ", emoji: "🦊", hints: ["あかちゃいろで しましまの しっぽ", "ヒマラヤの もりに すむよ", "たけや くだものを たべるよ"], fact: "たつことで からだを おおきく みせることが あるよ。" },
  { id: "tapir", name: "バク", initial: "ば", emoji: "🐾", hints: ["みじかい ぞうの はなのような くち", "もりの みずべに すむよ", "こどもは しましま・てんてん もよう"], fact: "はなを シュノーケルのように つかって およげるよ。" },
  { id: "capybara", name: "カピバラ", initial: "か", emoji: "🐹", hints: ["おおきな ネズミの なかま", "みずべで くらすよ", "おんせんに はいる すがたで にんき"], fact: "せかいで いちばん おおきな ネズミの なかまだよ。" },
  { id: "alpaca", name: "アルパカ", initial: "あ", emoji: "🦙", hints: ["ふわふわの けと ながい くび", "みなみアメリカの こうげんに すむよ", "けから やわらかい ぬのが できるよ"], fact: "なかまに きもちを つたえるため、つばを とばすことが あるよ。" },
  { id: "llama", name: "リャマ", initial: "り", emoji: "🦙", hints: ["ながい くびと まがった みみ", "アンデスの たかい ところに すむよ", "にもつを はこぶ おてつだいを するよ"], fact: "むかしから アンデスの ひとびとの にもつを はこんできたよ。" },
  { id: "orangutan", name: "オランウータン", initial: "お", emoji: "🦧", hints: ["あかちゃいろの ながい け", "ボルネオや スマトラの もりに すむよ", "ながい うでで きから きへ うつるよ"], fact: "なまえは『もりの ひと』という いみだよ。" },
  { id: "chimpanzee", name: "チンパンジー", initial: "ち", emoji: "🐵", hints: ["くろい けと おおきな みみ", "アフリカの もりに すむよ", "えだを どうぐにして アリを とるよ"], fact: "なかまごとに ちがう どうぐの つかいかたを おぼえるよ。" },
  { id: "gibbon", name: "テナガザル", initial: "て", emoji: "🐒", hints: ["うでが とても ながいよ", "アジアの もりに すむよ", "えだから えだへ ブランコのように すすむよ"], fact: "おおきな こえで うたうように なかまと よびあうよ。" },
  { id: "mandrill", name: "マンドリル", initial: "ま", emoji: "🐒", hints: ["おとなの おすの かおが カラフル", "アフリカの もりに すむよ", "あおと あかの はなが めじるし"], fact: "サルの なかまでは せかいで いちばん おおきいよ。" },
  { id: "baboon", name: "ヒヒ", initial: "ひ", emoji: "🐒", hints: ["ながい くちと するどい は", "アフリカの そうげんに すむよ", "おおきな むれで くらすよ"], fact: "なかまどうしで けづくろいをして きずなを つよくするよ。" },
  { id: "okapi", name: "オカピ", initial: "お", emoji: "🦓", hints: ["あしに しまうまのような もよう", "アフリカの もりに すむよ", "キリンの なかまだよ"], fact: "ながい したで じぶんの みみを なめられるよ。" },
  { id: "wildebeest", name: "ヌー", initial: "ぬ", emoji: "🐂", hints: ["うしのような つのと たてがみ", "アフリカの そうげんに すむよ", "たくさんの なかまと だいいどうするよ"], fact: "あめと くさを もとめて、100まんとういじょうが いどうするよ。" },
  { id: "buffalo", name: "バッファロー", initial: "ば", emoji: "🐃", hints: ["おおきな つのと くろい からだ", "そうげんや みずべに すむよ", "むれで こどもを まもるよ"], fact: "なかまが おそわれると、むれで たすけに いくことが あるよ。" },
  { id: "pronghorn", name: "プロングホーン", initial: "ぷ", emoji: "🦌", hints: ["シカに にた ほそい あし", "きたアメリカの そうげんに すむよ", "チーターの つぎくらいに はしるのが はやいよ"], fact: "ながい きょりを はやく はしりつづけられるよ。" },
  { id: "gerenuk", name: "ジェレヌク", initial: "じ", emoji: "🦌", hints: ["とても ながい くびと あし", "アフリカの かわいた ところに すむよ", "うしろあしで たって きのはを たべるよ"], fact: "なまえは ソマリごで『キリンのような くび』という いみだよ。" },
  { id: "fennec", name: "フェネック", initial: "ふ", emoji: "🦊", hints: ["からだより おおきな みみ", "さばくに すむよ", "よるに かつどうする ちいさな キツネ"], fact: "おおきな みみで ねつを にがし、すなの なかの おとも きくよ。" },
  { id: "mongoose", name: "マングース", initial: "ま", emoji: "🐾", hints: ["ほそながい からだと みじかい あし", "アフリカや アジアに すむよ", "どくヘビと たたかうことも あるよ"], fact: "とても すばやく うごいて、ヘビの こうげきを よけるよ。" },
  { id: "badger", name: "アナグマ", initial: "あ", emoji: "🦡", hints: ["かおに しろと くろの しま", "じめんに ほった あなで くらすよ", "つよい つめで あなを ほるよ"], fact: "いくつもの へやと いりぐちが ある おおきな すを つくるよ。" },
  { id: "skunk", name: "スカンク", initial: "す", emoji: "🦨", hints: ["くろい からだに しろい せん", "きたアメリカなどに すむよ", "てきに くさい えきを とばすよ"], fact: "こうげきする まえに、あしを ふみならして けいこくするよ。" },
  { id: "porcupine", name: "ヤマアラシ", initial: "や", emoji: "🦔", hints: ["からだに ながい とげ", "もりや いわばに すむよ", "てきが くると とげを さかだてるよ"], fact: "とげは ぬけても また はえてくるよ。" },
  { id: "pangolin", name: "センザンコウ", initial: "せ", emoji: "🐾", hints: ["からだが うろこで おおわれているよ", "アジアや アフリカに すむよ", "てきが くると まるくなるよ"], fact: "ほにゅうるいで うろこを もつ めずらしい どうぶつだよ。" },
  { id: "wombat", name: "ウォンバット", initial: "う", emoji: "🐻", hints: ["ずんぐりした からだと みじかい あし", "オーストラリアに すむよ", "しかくい うんちを するよ"], fact: "しかくい うんちは ころがりにくく、なわばりの めじるしになるよ。" },
  { id: "tasmanian-devil", name: "タスマニアデビル", initial: "た", emoji: "🐾", hints: ["くろい けと おおきな くち", "タスマニアとうに すむよ", "からだは ちいさいけれど こえが とても おおきいよ"], fact: "あごの ちからが つよく、ほねまで かみくだくよ。" },
  { id: "platypus", name: "カモノハシ", initial: "か", emoji: "🦆", hints: ["カモのような くちばし", "オーストラリアの かわに すむよ", "たまごを うむ ほにゅうるい"], fact: "おすの うしろあしには どくを だす とげが あるよ。" },
  { id: "echidna", name: "ハリモグラ", initial: "は", emoji: "🦔", hints: ["からだに たくさんの とげ", "オーストラリアなどに すむよ", "たまごを うむ ほにゅうるい"], fact: "ながい したで アリや シロアリを たべるよ。" },
  { id: "manatee", name: "マナティー", initial: "ま", emoji: "🦭", hints: ["まるくて おおきな からだ", "あたたかい かわや うみに すむよ", "みずくさを ゆっくり たべるよ"], fact: "やさしい せいかくで『うみの うし』とも よばれるよ。" },
  { id: "dugong", name: "ジュゴン", initial: "じ", emoji: "🐋", hints: ["まるい かおと みかづきがたの しっぽ", "あたたかい うみに すむよ", "うみの そこに はえる くさを たべるよ"], fact: "にんぎょの モデルになったとも いわれているよ。" },
  { id: "narwhal", name: "イッカク", initial: "い", emoji: "🐋", hints: ["おでこから ながい つの", "ほっきょくの つめたい うみに すむよ", "つのは じつは ながく のびた は"], fact: "つのには たくさんの しんけいが あり、みずの ようすを かんじるよ。" },
  { id: "walrus", name: "セイウチ", initial: "せ", emoji: "🦭", hints: ["ながい 2ほんの きば", "ほっきょくの うみに すむよ", "きばを つかって こおりに のぼるよ"], fact: "りっぱな ひげで、くらい うみの そこにいる かいを さがすよ。" },
];

const seedGroupC: AnimalSeed[] = [
  { id: "fossa", name: "フォッサ", initial: "ふ", emoji: "🐾", hints: ["ネコのような からだと ながい しっぽ", "マダガスカルだけに すむよ", "キツネザルを おいかけて きに のぼるよ"], fact: "マダガスカルで いちばん おおきな にくしょくどうぶつだよ。" },
  { id: "kinkajou", name: "キンカジュー", initial: "き", emoji: "🐾", hints: ["きんいろの けと まるい め", "ちゅうなんべいの もりに すむよ", "しっぽを えだに まきつけられるよ"], fact: "ながい したで はなの みつや くだものを たべるよ。" },
  { id: "naked-mole-rat", name: "ハダカデバネズミ", initial: "は", emoji: "🐭", hints: ["けが ほとんどなく おおきな まえば", "アフリカの ちかに すむよ", "ハチのように じょおうを ちゅうしんに くらすよ"], fact: "からだが いたみを かんじにくく、とても ながいきだよ。" },
  { id: "aye-aye", name: "アイアイ", initial: "あ", emoji: "🐒", hints: ["おおきな みみと ほそながい ゆび", "マダガスカルの もりに すむよ", "きの なかの むしを ゆびで とりだすよ"], fact: "きの みきを たたく おとで、なかにいる むしを みつけるよ。" },
  { id: "saiga", name: "サイガ", initial: "さ", emoji: "🦌", hints: ["おおきく ふくらんだ はな", "ちゅうおうアジアの そうげんに すむよ", "はなで すなの ほこりを ふせぐよ"], fact: "ふしぎな はなは、ふゆの つめたい くうきを あたためるよ。" },
  { id: "shoebill", name: "ハシビロコウ", initial: "は", emoji: "🐦", hints: ["くつのように おおきな くちばし", "アフリカの しつげんに すむよ", "えものを まつあいだ じっと うごかないよ"], fact: "おじぎを するような うごきで なかまと あいさつするよ。" },
  { id: "kakapo", name: "カカポ", initial: "か", emoji: "🦜", hints: ["みどりいろで まるい からだ", "ニュージーランドに すむよ", "そらを とべない よるの オウム"], fact: "せかいで いちばん おもい オウムの なかまだよ。" },
  { id: "quokka", name: "クオッカ", initial: "く", emoji: "🦘", hints: ["いつも わらっているような かお", "オーストラリアの しまに すむよ", "カンガルーの ちいさな なかま"], fact: "おなかの ふくろで こどもを そだてるよ。" },
  { id: "sifaka", name: "シファカ", initial: "し", emoji: "🐒", hints: ["しろい けと ながい あし", "マダガスカルに すむよ", "じめんを よこむきに はねて すすむよ"], fact: "なまえは『シーファク』という なきごえから ついたよ。" },
  { id: "markhor", name: "マーコール", initial: "ま", emoji: "🐐", hints: ["ぐるぐる ねじれた おおきな つの", "ちゅうおうアジアの やまに すむよ", "けわしい がけを かるがる のぼるよ"], fact: "パキスタンの くにを しょうちょうする どうぶつだよ。" },
];

const seeded = [...seedGroupA, ...seedGroupB, ...seedGroupC];

if (Object.keys(animalMetadata).length !== seeded.length) {
  throw new Error("動物メタデータが100匹分そろっていません");
}

for (const seed of seeded) {
  const metadata = animalMetadata[seed.id];
  if (!metadata) throw new Error(`${seed.name} のメタデータがありません`);
  if (!metadata.extraHint.trim()) throw new Error(`${seed.name} の追加ヒントがありません`);
  if (metadata.extraHint.includes(seed.name)) throw new Error(`${seed.name} の追加ヒントに答えが含まれています`);

  const normalize = (text: string) => text.replace(/[\s、。・「」『』！？,.!?]/g, "");
  const extraHint = normalize(metadata.extraHint);
  if ([...seed.hints, seed.fact].some((text) => normalize(text) === extraHint)) {
    throw new Error(`${seed.name} の追加ヒントが既存情報と重複しています`);
  }
}

function choicesFor(seed: AnimalSeed, index: number): [string, string, string, string] {
  const difficulty = animalMetadata[seed.id].difficulty;
  const wrongChoices = [...new Set(
    seeded
      .filter((animal) => animalMetadata[animal.id].difficulty === difficulty && animal.name !== seed.name)
      .map((animal) => animal.name),
  )];

  if (wrongChoices.length < 3) {
    throw new Error(`${seed.name} の不正解候補が3種類未満です`);
  }

  const offset = (index * 7) % wrongChoices.length;
  const choices: [string, string, string, string] = [
    seed.name,
    wrongChoices[offset],
    wrongChoices[(offset + 1) % wrongChoices.length],
    wrongChoices[(offset + 2) % wrongChoices.length],
  ];

  if (new Set(choices).size !== choices.length) {
    throw new Error(`${seed.name} の選択肢に重複があります`);
  }

  return choices;
}

export const animals: AnimalQuiz[] = seeded.map((seed, index) => ({
  ...seed,
  difficulty: animalMetadata[seed.id].difficulty,
  extraHint: animalMetadata[seed.id].extraHint,
  answer: seed.name,
  imageKey: seed.id,
  choices: choicesFor(seed, index),
}));

const difficultyCounts = animals.reduce<Record<Difficulty, number>>((counts, animal) => {
  counts[animal.difficulty] += 1;
  return counts;
}, { easy: 0, normal: 0, medium: 0, hard: 0 });

for (const [difficulty, expected] of Object.entries({ easy: 50, normal: 25, medium: 15, hard: 10 }) as [Difficulty, number][]) {
  if (difficultyCounts[difficulty] !== expected) {
    throw new Error(`${difficultyLabels[difficulty]}の動物数が${expected}匹ではありません`);
  }
}
