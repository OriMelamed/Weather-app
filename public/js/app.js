const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messegeOne = document.querySelector('#messege-1')
const messegeTwo = document.querySelector('#messege-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messegeOne.textContent='Loading...'
    messegeTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((Response)=>{
    Response.json().then((data)=>{
        if(data.error)
        {
            messegeOne.textContent=data.error
            messegeTwo.textContent=''
        }else{
            messegeOne.textContent=data.forecast
            messegeTwo.textContent=data.location
        }
    })
})
    console.log(location)
})
