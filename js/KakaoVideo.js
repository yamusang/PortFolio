const REST_API_KEY = '1d62c9cf1a2869895c4e52f2998100a2'
const headers = {
    method: 'GET',
    headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`
    }
}
const query = '트와이스'
const url = `https://dapi.kakao.com/v2/search/vclip?query=${query}&sort=recency`
let result 
async function loadVideo(){
    try{
        const response = await fetch(url, headers)
        const data = await response.json()
        console.log(data);
        result = data
        printVideo(data.documents,10)
    }catch(error){
        console.error('오류:',error)
    }
}

loadVideo().then(()=>{
    console.log('result:', result)
    console.log('result:', result.documents[0].url)
    
})

function printVideo(docs,count){ // 임의로 정한 변수(인자)
    const ul = document.getElementById('kakaoVideo')
    for(let i = 0; i < count; i ++){
        console.log(docs[i].url)
        const li = document.createElement('li')
        li.innerHTML=`<video src="${docs[i].url}" width="400px" height="400px" preload controls autoplay loop playsinline>`
        ul.appendChild(li)
    }
}