console.log("client side js file os loaded")
const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg-1')

const msg2=document.querySelector('#msg-2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const locaton =search.value
    fetch('/weather?address='+locaton).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent=data.error
            console.log(data.error)
        }
        else{
        msg1.textContent=data.location
        msg2.textContent=data.forecast
        }
    })
})
  
})