

// fetch('https://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#message-1')
const msg2=document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    msg2.textContent=''
    msg1.textContent=''
    if(search.value!='')
    {
        msg1.textContent='Loading your request'
        fetch('http://localhost:3000/weather?address='+search.value).then((res)=>{
            res.json().then((data)=>{
                if(data.err)
                {
                    return msg1.textContent=data.err
                }
                msg2.textContent="Location :"+data.Location+" , longitude :"+data.Longitude+" ,Latitude:"+data.Latitude
                msg1.textContent=''
            })
        
        })
    }
    else{
        msg1.textContent='You must provide Address'
    }

})