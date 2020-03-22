var express = require('express');
var mockjs = require('mockjs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var makeIssue = function() {
  // 现在时间
  var date = new Date();
  // 每一天彩票开售时间
  var first_issue_date = new Date();
  first_issue_date.setHours(9);
  first_issue_date.setMinutes(10);
  first_issue_date.setSeconds(0);
  // 每一天彩票截止时间
  var end_issue_date = new Date(
    first_issue_date.getTime() + 77 * 10 * 60 * 1000
  );
  var cur_issue, end_time, state, stateText;

  // 现在时间大于开始时间， 且小于截止时间就是正常销售时间
  if (
    date.getTime() - first_issue_date.getTime() > 0 &&
    date.getTime() - end_issue_date.getTime() < 0
  ) {
    // 正常销售
    // 每天九点开售
    var cur_issue_date = new Date();
    cur_issue_date.setHours(9);
    cur_issue_date.setMinutes(0);
    cur_issue_date.setSeconds(0);
    var minus_time = date.getTime() - cur_issue_date.getTime();

    // 计算当前是哪一期
    var h = Math.ceil(minus_time / 1000 / 60 / 10);
    // 计算一期的停止时间
    var end_date = new Date(cur_issue_date.getTime() + 1000 * 60 * 10 * h);
    end_time = end_date.getTime();
    cur_issue = [
      end_date.getFullYear(),
      ('0' + (end_date.getMonth() + 1)).slice(-2),
      ('0' + end_date.getDate()).slice(-2),
      ('0' + h).slice(-2)
    ].join('');
  }
  // 当前时间小于每天开始销售时间
  else if (date.getTime() < first_issue_date.getTime()) {
    // 暂停销售
    var cur_issue_date = new Date();
    cur_issue_date.setHours(9);
    cur_issue_date.setMinutes(0);
    cur_issue_date.setSeconds(0);
    end_time = cur_issue_date.getTime();
    cur_issue = [
      cur_issue_date.getFullYear(),
      ('0' + (cur_issue_date.getMonth() + 1)).slice(-2),
      ('0' + cur_issue_date.getDate()).slice(-2),
      '01'
    ].join('');
  }
  // 当前时间大于每天截止销售时间
  else if (date.getTime() > end_issue_date.getTime()) {
    // 今天销售已截止
    first_issue_date.setDate(first_issue_date.getDate() + 1);
    end_time = first_issue_date.getTime();
    cur_issue = [
      first_issue_date.getFullYear(),
      ('0' + (first_issue_date.getMonth() + 1)).slice(-2),
      ('0' + first_issue_date.getDate()).slice(-2),
      '01'
    ].join('');
  }

  var cur_date = new Date();
  if (date.getTime() < first_issue_date.getTime()) {
    stateText = '停止销售';
    state = 100;
  } else if (end_time - cur_date.getTime() > 1000 * 60 * 2) {
    stateText = '正在销售';
    state = 0;
  } else {
    stateText = '开奖中';
    state = 10;
  }

  return {
    issue: cur_issue,
    state: state,
    stateText: stateText,
    end_time: end_time
  };
};
router.get('/get/omit', function(req, res, next) {
  var issue = makeIssue().issue;
  res.json(
    mockjs.mock({
      'data|11': [/[1-9]{1,3}|0/],
      issue: issue
    })
  );
});
router.get('/get/opencode', function(req, res, next) {
  var issue = makeIssue().issue;
  var data = mockjs.mock({
    'data|1': [
      [/[1-3]/, /[4-5]/, /[6-7]/, /[8-9]/, /1[0-1]/],
      [/1[0-1]/, /[4-5]/, /[6-7]/, /[8-9]/, /[1-3]/],
      [/[6-8]/, /[1-2]/, /9|1[0-1]/, /[3-4]/, /[5]/],
      [/[3-5]/, /1[0-1]/, /[1-2]/, /[6-8]/, /[9]/]
    ]
  }).data;
  res.json({
    issue: issue,
    data: data
  });
});
router.get('/get/state', function(req, res, next) {
  var issue = makeIssue();

  res.json(issue);
});
module.exports = router;
