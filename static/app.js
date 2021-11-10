class BoggleGame {

  constructor(secs = 60){
    this.sec = secs; // game length
    this.score = 0;
    this.words = new Set();
    this.countDown(this.sec)
    // this.board=document.getElementById(boardId)
    
    document.querySelector("#formId").addEventListener("submit",this.handleSubmit.bind(this))


  }
  async handleSubmit(evt){

    evt.preventDefault()

    let input=document.querySelector('input[name="word"]')
    let ul=document.querySelector("ul")
    let message=document.querySelector("#message")


    const response=await axios.get("http://127.0.0.1:5000/check-answers",{params:{word:input.value}})
    console.log(input.value.length)
    console.log(response.data.result)
  
    if (response.data.result==="ok" && this.words.has(input.value)===false){
  
      this.score+=input.value.length
      this.words.add(input.value)
  
      let li=document.createElement("li")
      li.innerText=input.value
      ul.appendChild(li)
  
      document.querySelector("#displayScore").textContent=`Your score is: ${this.score}`
  
      message.innerHTML=`<p class='mes'>${"Nice selection!"}</p>`
      await this.updateHighScore()
    }
  
    else if (response.data.result==="ok" && this.words.has(input.value)===true){
      message.innerHTML=`<p class='mes'>"It is already in the list!"</p>`
    }
    else if (response.data.result==="not-on-board"){
      message.innerHTML=`<p class='mes'>"Not on the board"</p>`
  
  
    }
    else if(response.data.result==="not-word"){
      message.innerHTML=`<p class='mes'>"It is not a word"</p>`
  
    }
    
  }
  
  // async updateNPlays(){
  //   const resp = await axios.post("/played");

  // }

  async updateHighScore(){
    const resp = await axios.post("/post-score", { score: this.score });
  
    if (resp.data.brokeRecord){
      document.querySelector("#highscore").innerHTML=`<p id="highscore">Highscore ${this.score}</p>`
  
    }
  
  }

  async countDown(num){
    let form=document.querySelector("#formId")
    let time=document.querySelector("#timer")
    let timer=1000;
    if(num<=0){
        console.log("Invalid Input!");
    }
    for (let i=num-1;i>=0;i--){
        let t=setTimeout(function(){
            time.children[0].innerText=`${i}`
  
            if(i===0){
                console.log("DONE!")
                form.style="display: none"
                // document.querySelector("#response").style="display: none"
                message.innerHTML=""
            }
            else{
               console.log(i) 
            }
        },timer);
        timer+=1000;
    }
  }

}

new BoggleGame(60)

