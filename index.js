// 必要なHTML要素の取得
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');


// 複数のテキストを格納する配列
const textLists = [
   "Hello World", "This is my app.", "How are you?", "I want to be a programmer.",
   "I want to build a web app.", "Nice to meet you", "Let it be", "Good morning",
   "Information Technology", "Windows Mac Linux iOS Android", "Chrome Firefox Edge Safari", "machine learning",
   "Thank you very much", "programming", "HyperText Markup Language", "Are you nuts?",
   "Cool your jets", "Are we square?", "right as rain", "rain or shine"
];


let checkTexts = [];

// ランダムなテキストを画面に表示する
const createText = () => {
   const p = document.getElementById('text');
   const rnd = Math.floor(Math.random() * textLists.length);         // 配列のインデックス数からランダムな数値を生成する
   
   p.textContent = '';                                               // p要素の中身を空にする
   
   checkTexts = textLists[rnd].split('').map(value => {              // 画面に表示するテキスト情報をcheckTexts配列に格納する
      const span = document.createElement('span');                   // span要素を生成する
      
      span.textContent = value;                                      // span要素に配列の1文字ずつを当てはめる
      p.appendChild(span);                                           // span要素をp要素に追加していく
      
      return span;                                                   // 1文字ずつcheckTextsに格納していく
   });
};


let score = 0;                                                       // scoreの初期値を設定する

// キーイベント＆入力判定処理
const keyDown = e => {
   wrap.style.backgroundColor = '#666';                              // 背景色のデフォルト値を設定
   
   if(e.key === checkTexts[0].textContent) {
         checkTexts[0].className = 'add-color';                      // add-colorクラスを付与する
         
         checkTexts.shift();                                         // 配列から1文字を削除する
         score++;                                                    // 正しい入力の時だけスコアを加算する
         
         if(!checkTexts.length) createText();                        // 最後まで入力したら新しいテキストを用意する
   } else if(e.key === 'Shift') {
      wrap.style.backgroundColor = '#666';                           // Shiftキーを押した時は色が変わらない
   } else {
      wrap.style.backgroundColor = 'red';                            // タイプミスした時だけ背景色を赤色に変える
   }
};


// ランク判定とメッセージ生成処理
const rankCheck = score => {
   let text = '';                                                    // テキストを格納する変数を作る
   
   //スコアに応じて異なるメッセージを変数textに格納する
   if(score < 100) {
      text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
   } else if(score < 200) {
      text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
   } else if(score < 300) {
      text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
   } else if(score >= 300) {
      text = `あなたのランクはSです。\nおめでとうございます！`;
   }
   
   // 生成したメッセージと一緒に文字列を渡す
   return `${score}文字打てました！\n${text}\n\n【OK】リトライ ／【キャンセル】終了`;
   
};


// ゲームの終了処理
const gameOver = id => {
   clearInterval(id);                                                // タイマーをストップする
   
   const result = confirm(rankCheck(score));                         // スコアの値をrankCheck()に渡してダイアログで結果を表示する
   
   if(result) window.location.reload();                              // OKボタンをクリックされたらリロードする
};


// タイマー処理
const timer = () => {
   let time = 60;                                                    // タイマーの初期値を設定(60秒)
   const count = document.getElementById('count');                   // タイマー(count要素)を取得する
   
   // 1秒ごとに実行する処理を書く
   const id = setInterval(() => {
      
      if(time <= 0) gameOver(id);                                    // カウントが0になったらタイマーのidをgameOver()に渡す
      count.textContent = time--;                                    // タイマーの表示を1秒ずつ減らしていく
      
   }, 1000);
};


// ゲームスタート時の処理
start.addEventListener('click', () => {
   timer();                                                          // タイマーを起動する関数
   createText();                                                     // ランダムなテキストを表示する関数
   
   start.style.display = 'none';                                     // 「スタート」ボタンを非表示にする処理
   
   document.addEventListener('keydown', keyDown);                    // キーボードのイベント処理
});