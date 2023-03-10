const cheerio = require('cheerio');
const axios = require('axios');
const j2cp = require('json2csv').Parser;
const fs = require("fs")

const url = "https://exemple.com/blog";
const articleData  = []

async function getAuthors(url){
  
  try {
    const response = await axios.get(url);
    const $=cheerio.load(response.data)
    const article = $("css selctor")
    article.each(function (){
      const title = $(this).find("css selctor").text()
      const author = $(this).find("css selctor").text()
      articleData.push({title, author})
    })
      if ($("css selctor for the next button").length === 1) {
        next_page = $("css selctor for the next button").attr("href")
        getAuthors(next_page)
      } else if ($("css selctor for the next button").length === 0) {
        const parser = new j2cp();
        const csv = parser.parse(articleData);
        fs.writeFileSync("./authors.csv", csv)
      } 
      
    
    console.log('🚀 ~ articleData:', articleData.length)
  } catch (error) {
    console.error('error:', error)    
  }

};

getAuthors(url);