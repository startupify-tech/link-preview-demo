
var submit=document.getElementById("submit");

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    var check=document.getElementsByName("type");
    for(var i=0;i<check.length;i++){
      if(check[i].checked==true){
        checked=check[i].value;
        break;
      }
    }
     var url=document.getElementById("url").value;
     //console.log(checked);
    fetch(`/geturl${checked}`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            url:url
        })
    })
      .then((response) => {
        if(!response){
          console.log("no response")
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        var image=data.favicon || data.image || data.img;
        var div=document.getElementById("preview")
        div.classList.remove("no-disp");
        div.classList.add("disp")
        div.innerHTML=`<img src=${image}> 
        <hr>
        <h3>${data.title}</h3>
        <hr>
        <p>${data.description}</p>`
        document.getElementById("url").value="";
      });
})
