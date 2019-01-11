/**
 * 所定の条件でメールを検索して送信元ごとの件数を集計する
 */
function processMailFromCount() {
  // メールの検索条件を設定（5日前より新しいメール）
  var SEARCH_CONDITION =  "newer_than:5d";

  // Gmailを指定条件で検索する
  var resultThreads = GmailApp.search(SEARCH_CONDITION);

  var resultCounts = {};  // 送信元アドレスごとのカウント用配列
  var messagesInThread  = {};  // スレッド内のメッセージ取得用配列
  var mailFrom = "";  // 送信元メールアドレス
  
  // 見つかった件数を記録
  Logger.log('検索条件：' + SEARCH_CONDITION);
  Logger.log('対象スレッド件数：' + resultThreads.length);
  Logger.log('＝＝＝＝＝＝＝＝集計開始＝＝＝＝＝＝＝＝');
  
  // 検索結果で取得したスレッドを順に処理し、送信元アドレスごとの件数を集計
  for each(var thread in resultThreads){
    messagesInThread = thread.getMessages();
    // スレッド内のメッセージを順に見て送信元アドレスを取得
    for each(var message in messagesInThread){
      mailFrom = message.getFrom();
      var mailAddress = mailFrom.match(/<.*@.*>/);
      if (mailAddress != null){
        mailFrom = mailAddress[0].substring(1,mailAddress[0].length - 1);
      }
    　// 送信元アドレスごとの件数をカウントアップ
      if (mailFrom in resultCounts) {
          resultCounts[mailFrom] += 1;
      } else {
        resultCounts[mailFrom] = 1;
      }
    }
  }
  
  // 件数を降順にソートする
  var keys=[];
  for(var key in resultCounts){
    keys.push(key);
  }
  keys.sort(function(a,b){
    return resultCounts[b]-resultCounts[a];
  });
  
  // ログに送信元：件数 のフォーマットで書き出す
  for (key in keys){
    Logger.log(keys[key] + ': ' + resultCounts[keys[key]]);
  }

  Logger.log('＝＝＝＝＝＝＝＝集計終了＝＝＝＝＝＝＝＝');
};
