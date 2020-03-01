// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')
const cheerio = require('cheerio');


cloud.init()

async function getBookInfo(isbn){
  let res = await axios.get(`https://search.douban.com/book/subject_search?search_text=${isbn}`);
  let bookInfo = res.data;
  let reg = /window\.__DATA__ = "(.*)"/;
  if (reg.test(bookInfo)) {
    let searchInfo = doubanbook(RegExp.$1)[0];
    return searchInfo;
  };

}
// getBookInfo('9787539966205');


// 云函数入口函数
exports.main = async (event, context) => {
  let {a,b,isbn} = event;
  let searchData = await getBookInfo(isbn);
  console.log(searchData);

  let detailData = await axios.get(searchData.url);
    let $ = cheerio.load(detailData.data);
    let summary = $('#link-report .intro').text();
    console.log(summary)

  return {
    sum: a + b,
    title: searchData.title,
    img: searchData.cover_url,
    summary: summary
  };
}