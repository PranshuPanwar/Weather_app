



const weatherform = document.querySelector('form');
const locate = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');


weatherform.addEventListener('submit',(event)=>{
    event.preventDefault();
   // console.log(locate.value);

   msg1.textContent='Loading...';
     msg2.textcontent='';
    if(locate.value==undefined){
       return  console.log("Please Enter the location")
    }
    
    fetch('/weather?address='+locate.value).then((response)=>{
    
     //   console.log(response);

    response.json().then((data)=>{
        if(data.error){
         msg1.textContent=data.error;
        }else{
            msg1.textContent=data.place;
        msg2.textContent=data.summary +" The tempature is "+data.temp +" Humidity is "+data.humidity;
        }
      

    })
})
})