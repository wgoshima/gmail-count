function main() {
// 検索条件を入力させる
  var searchInput = Browser.inputBox('検索条件', 'メールの検索条件を入れてください。<BR>例）to:(alert-warning) after:2014/7/1 before:2014/7/18', Browser.Buttons.OK_CANCEL);

  processSubjectCount(searchInput);
};

/**
 * 所定の条件でメールを検索してサブジェクトごとの件数を記録する
 */
function processSubjectCount(searchCondition) {
  // Gmailを指定条件で検索する
  var resultThreads = GmailApp.search(searchCondition);

  var resultCounts = {};
  
  // 見つかった件数を記録
  Logger.log('検索条件：' + searchCondition);
  Logger.log('対象スレッド件数：' + resultThreads.length);
  Logger.log('＝＝＝＝＝＝＝＝集計開始＝＝＝＝＝＝＝＝');
  
  for each(var thread in resultThreads){
    if (inArray(resultCounts, thread.getFirstMessageSubject())) {
      resultCounts[thread.getFirstMessageSubject()] += 1;
    } else {
     resultCounts[thread.getFirstMessageSubject()] = 1;
    }
  }

  for each(var resultSubject in resultCounts){
    Logger.log(resutSubject + ': ' + resultCounts[resultSubject]);
  }

  Logger.log('＝＝＝＝＝＝＝＝集計終了＝＝');
};

/**
 * inArray
 *
 * @param {String} val 要素
 * @param {Array}  arr 配列
 * @return {Boolean}
 */
function inArray(val, arr) {
  var index = arr.indexOf(val);
  if (index !== -1) {
    return true;
  } else {
    return false;
  }
}
