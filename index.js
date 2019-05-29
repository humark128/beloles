const cheerio = require('cheerio')
const request = require('request')
const rp = require('request-promise')
const fs = require('fs')

// var allArticles = [];
var allRecipes = [];
// var allCategories = [];
var allPages = [];
var counter = 0;
var categoryCounter = 0;

start()

//functions for parse one recipe

async function getContentFromPage(url) {
    let ReqOptions = {
      uri: url,
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    let params = {};
    let $ = await rp(ReqOptions);
        params.title = $('h1.recipe-title').text().trim();
        if (params.title.length < 2) return;
        params.photo_link = $('img.-image').attr('src');
        params.introduction = $('div.recipe-tagline__text').text().trim();
        params.options = '';
        params.options += 'Время приготовления: ' + $('div.recipe-time-yield__label-prep').text().trim();
        params.options += 'Порции: ' + $('div.recipe-time-yield__label-servings').text().trim();
        params.ingredient_title = 'Ингредиенты:';
        params.ingredient_body = '';
        $('ul.recipe-ingredients__list').find('li').each(function() {
            params.ingredient_body += $(this).text().trim() + ', ';
        });
        params.directions_title = 'Приготовление:';
        params.directions_body = '';
        $('ul.recipe-directions__list').find('li').find('span').each(function() {
            // params.directions_body += $(this).find('div.recipe-procedure-number').text().trim();
            params.directions_body += $(this).text().trim() + ' ';
        });
    counter++;
    // console.log('Получено ' + counter + ' рецептов.');
    allRecipes.push(JSON.stringify(params));
    let oneRecord = JSON.stringify(params) + ',\n';
    fs.appendFile('eng.json', oneRecord, function (err) {
      if (err) throw err;
      console.log('Сохранено ' + counter + ' рецептов. Со страницы ' + url);
    });
}

//functions for mass parsing all recipes
async function start() {
    //site url
    // let url = `https://www.101cookbooks.com`;

    //get category list
    // await getCategoryList(url)
    // console.log('Категории собраны.');

    //get pages list
    // var allCategories = fs.readFileSync('all_category.json', 'utf8');
    // allCategories = allCategories.split(',');
    // for (let j in allCategories) {
    //     await sleep(1500);
    //     await getPages(allCategories[j]);
    // }
    // fs.writeFile('all_pages.json', allPages, function (err) {
    //   if (err) throw err;
    // });
    // console.log('Ссылки на страницы собраны.');

    //get articles list
    // var allLinks = fs.readFileSync('all_pages.json', 'utf8');
    // allLinks = allLinks.split(',');
    // for (let link in allLinks) {
    //     await sleep(1500);
    //     await getAllArticles(allLinks[link]);
    // }
    // console.log('Все ссылки на рецепты у нас!');

    //get articles
    var allArticles = fs.readFileSync('all_articles.json', 'utf8');
    allArticles = allArticles.split(',');
    console.log('allArticles len ' + allArticles.length);
    // for (let article in allArticles) {
    //         await sleep(1500);
    //         await getContentFromPage(allArticles[article])
    // }
    for (let article = 2001; article <= 4000;article++) {
            await sleep(1500);
            await getContentFromPage(allArticles[article])
    }

    console.log('Все рецепты у нас!');
}

async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function getAllArticles(url) {
    let ReqOptions = {
      uri: url,
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    let $ = await rp(ReqOptions);
    $('li.single-recipe').find('a').each(function(o, element) {
        let link = $(this).attr('href');
        counter++;
        fs.appendFile('all_articles.json', link + ',\n', function (err) {
          if (err) throw err;
        });
    });
    console.log('Сохранено ' + counter + ' ссылок. На странице ' + url);
}

async function getPagesCount(url) {
    console.log(url);
    let ReqOptions = {
      uri: url,
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    let $ = await rp(ReqOptions);

    return [await parseInt($('a.page').parent().children().last().text()), await $('a.page').parent().children().eq(1).attr('href')];
}

async function getCategoryList(url) {
    let ReqOptions = {
        uri : url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    let $ = await rp(ReqOptions);
    $('div.categorylist').find('div.dropdown-item').find('a').each(function(o, element) {
        let link = $(this).attr('href');
        fs.appendFile('all_category.json', link + ',\n', function (err) {
          if (err) throw err;
        });
    });
}

async function getPages(url) {
    allPages.push(url);
    let ReqOptions = {
        uri : url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    let $ = await rp(ReqOptions);
    let lastPage = parseInt($('a.page').last().text());
    for (let page=1;page<=lastPage;page++) {
        let link = url + '/page/' + page;
        allPages.push(link);
    }
}
