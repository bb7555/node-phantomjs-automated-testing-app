exports.tests = [

{path:'/category/112043/sports' ,host:'www.newson6.com'}

/*,{path:'/category/112032/news' ,host:'www.news9.com'}

,{path:'/category/233430/entertainment' ,host:'www.myfoxphilly.com'}

,{path:'/story/22836959/2013/07/14/rallies-against-zimmerman-verdict-being-held-in-us' ,host:'www.myfoxboston.com'}

,{path:'/story/22840576/ex-corrections-officer-accused-of-stabbing-girlfriend-to-death-titusville-florida' ,host:'www.myfoxorlando.com'}

,{path:'/story/22826592/suspect-sought-in-severe-beating-of-transient' ,host:'www.kpho.com'}

,{path:'/story/22390586/cbs-atlanta-news-exposes-alleged-squatters-tricks' ,host:'www.cbsatlanta.com'}

,{path:'/story/22663915/three-people-shot-at-party' ,host:'www.wsmv.com'}

,{path:'/story/22819364/stop-frying-eggs-death-valley-officials-say' ,host:'www.turnto10.com'}

,{path:'/story/22843222/johnson-named-to-2013-butkus-award-watch-list' ,host:'www.wnct.com'}

,{path:'/story/22834381/george-zimmerman-found-not-guilty' ,host:'www.nbc26.tv'}

,{path:'/story/22841973/black-panther-rally-for-trayvon-martin-drew-3-people' ,host:'www.wfla.com'}

,{path:'/story/22841498/journalist-edward-snowden-has-blueprints-to-nsa' ,host:'www.760kfmb.com'}

,{path:'/story/22837926/rallies-large-and-small-follow-zimmerman-verdict' ,host:'www.okcfox.com'}

,{path:'/story/22844706/fbi-searching-for-man-who-robbed-okc-bank' ,host:'www.kswo.com'}

,{path:'/story/22737424/oklahoma-company-makes-millions-off-government-cell-phones-despite-red-flags' ,host:'www.newson6.com'}

,{path:'/story/22649931/background-checks-at-ok-gun-shows-some-say-yes' ,host:'www.news9.com'}

,{path:'/story/22843802/5-year-old-missing-from-north-philly' ,host:'www.myfoxphilly.com'}

,{path:'/story/22845220/2013/07/15/boston-marathon-bombing-suspect-request-second-death-penalty' ,host:'www.myfoxboston.com'}

,{path:'/story/22830325/squirrel-eats-suv' ,host:'www.myfoxorlando.com'}

,{path:'/story/22843829/nj-governor-to-appear-as-himself-on-nbc-sitcom' ,host:'www.kpho.com'}

,{path:'/story/22845009/execution-for-warren-lee-hill-set-for-monday-night' ,host:'www.cbsatlanta.com'}

,{path:'/story/22843121/boy-rescued-from-ind-sand-dune-moving-arms-legs' ,host:'www.wsmv.com'}

,{path:'/story/22670517/rhode-island-cooling-centers-june-24-2013' ,host:'www.turnto10.com'}

,{path:'/story/22843342/nc-lawmakers-to-tweak-law-cutting-jobless-benefits' ,host:'www.wnct.com'}

,{path:'/story/22840009/soldier-killed-in-afghanistan-returns-home-to-augusta' ,host:'www.nbc26.tv'}

,{path:'/story/22843866/florida-man-drives-car-into-pool' ,host:'www.wfla.com'}

,{path:'/story/22835623/military-works-to-change-culture-to-combat-rape' ,host:'www.760kfmb.com'}

,{path:'/story/22837589/womans-lawsuit-against-dps-over-driver-license-moves-forward' ,host:'www.okcfox.com'}

,{path:'/story/22844806/expert-jackson-would-have-earned-1b-on-comeback' ,host:'www.kswo.com'}*/

];

exports.getFileName = function(test,local) {
return 'results/' + test.host.replace(/\./g,'-').replace(/\:[0-9]+/,'').replace('-com','').replace('www-','') + test.path.replace(/\//g,'-').replace(/\?clienttype=/g, "clienttype") + ((local) ? '-locl' : '-prod')
}
