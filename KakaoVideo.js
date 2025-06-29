const REST_API_KEY = '1d62c9cf1a2869895c4e52f2998100a2'
const headers = {
    method: 'GET',
    headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`
    }
}
const query = '트와이스'
const url = `https://dapi.kakao.com/v2/search/vclip?query=${query}&sort=recency`
async function loadVideo(){
    try{
        const response = await fetch(url, headers)
        const data = await response.json()
        printVideo(data.documents,10)
    }catch(error){
        console.error('오류:',error)
    }
}

loadVideo().then(()=>{
    console.log('비동기 동작 후')
})

console.log('비동기 동작중')

function printVideo(docs,count){
    const ul = document.getElementById('kakaoVideo')
    for(let i = 0; i < count; i ++){
        const li = document.createElement('li')
        const uturl = docs[i].url.slice(0,23)+'embed/'+docs[i].url.slice(-11)
        li.innerHTML=`<iframe width="560" height="315" src="${uturl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        ul.appendChild(li)
    }
}