// 커피 목록 조회 API를 요청해주세요.
const getCoffee = () => {
  // 받은 데이터로 createMenuCard 함수를 이용해
  // 메뉴 카드를 만들어주세요.   
  axios.get("http://localhost:3000/lookupCoffeList/10").then((req) => {
     
    let data = req.data; // 배열

    for(let i = 0; i < data.length; i++){
      // console.log(`data.length : ${data.length}`);
      // console.log("data"+i+" : " + data[i].name + " : " + data[i].kcal);
      createMenuCard(data[i]);
    }
  }); 
};

const createMenuCard = (data) => {
  
  const menuCardWrapper = document.createElement("div");
  menuCardWrapper.className = "Menu_Card_Wrapper";

  const menuCardImgBox = document.createElement("div");
  menuCardImgBox.className = "Menu_Card_ImgBox";

  const menuCardName = document.createElement("div");
  menuCardName.className = "Menu_Card_Name";
  menuCardName.textContent = data.name || "메뉴이름";

  const menuCardInfo = document.createElement("div");
  menuCardInfo.className = "Menu_Card_Info";
  menuCardInfo.textContent = data.kcal || "칼로리";

  const menuWrapper = document.querySelector("#Menu_Background");
  menuCardWrapper.appendChild(menuCardImgBox);
  menuCardWrapper.appendChild(menuCardName);
  menuCardWrapper.appendChild(menuCardInfo);
  menuWrapper.appendChild(menuCardWrapper);
};
