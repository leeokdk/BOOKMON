var express = require('express'); 
var app = express();

var server = app.listen(4000, function(){
    console.log('start server : localhost:4000');
});
//라우터
app.get('/',function(req, res){
    res.send({
        corsTest: '접속환영'
    })
});

app.set('views',__dirname+'/views'); //디폴트폴더 설정
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

var cors = require('cors');
// app.use(cors()); //전체허용


var corsOptions ={
    origin : "http://127.0.0.1:5500"
    ,credentials : true
}
app.use(cors(corsOptions)); //특정url만 허용



const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async(keyword)=>{
    keyword = encodeURI(keyword);
    try {
        return axios.get(`https://search.daum.net/search?w=bookpage&`+keyword);
    }catch(err){
        console.log(err);
    }
}

const getData = async(keyword) =>{
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    
    const contentList = $('.info_section.info_intro .wrap_cont dl');
    let titles = [];
    
    contentList.each(function(i, elem){
        titles[i] ={
            title: $(this).text()
        };
        
    });
    
    var pg1 = JSON.stringify(titles[2]);
    pg1 = pg1.replace(/[^\d|/|]/g,"");
    var thisbookpage = pg1.split(/[/|]/)[0];
    return thisbookpage;
}

app.get('/page',async(req, res) => {
    var pageis = await getData('bookId='+req.query.bookId+'&q='+req.query.q);
    console.log(pageis);
    res.send(pageis);
});

app.get('/books',function(req, res){
    console.log(req.query.url)
    res.render("./views/books.html",{isbns : req.query.url});
});