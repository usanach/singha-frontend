var discoveryNum = 0;
async function setTotalProjects() {
    const data = await getDiscovery();
    document.querySelector('#discovery [name="tt_projects"]').innerHTML = data.length;
    document.querySelector('#discovery [name="max_projects"]').innerHTML = data.length;
}
window.onload = function () {
    setTotalProjects();
    setDiscoveryHtml();
}

function selectOptions(id) {
    document.querySelector('#' + id + ' ' + 'p').innerHTML = event.target.innerHTML;
    document.querySelector('#' + id).setAttribute('value', event.target.value);
}
function toggleView() {
    document.querySelector('#discovery').setAttribute('attr-list-type', event.target.getAttribute("attr-icon"));
}

async function setDiscoveryHtml() {
    const resp = await getDiscovery();
    var cardList = document.querySelector('cardList');
    cardList.innerHTML = ''
    resp.slice(0, 4).map(data => {
        var card = document.createElement('card');
        var cardImgDiv = document.createElement('cardImg');
        var cardImg = document.createElement('img');
        var cardDetail = document.createElement('cardDetail');
        var detail = document.createElement('detail');
        var newProject = document.createElement('newProject');
        var textTitle = document.createElement('textTitle');
        var textDetail = document.createElement('textDetail');
        var textPrice = document.createElement('textPrice');
        var border = document.createElement('border');
        var borderImg = document.createElement('img');

        cardImg.src = data.data.s;
        textPrice.innerHTML = data.data.price;
        textDetail.innerHTML = data.data.location;
        textTitle.innerHTML = data.data.brands;
        newProject.innerHTML = 'New Project';

        borderImg.src = data.data.brands == "SHAWN"
            ? "./assets/discovery/border/1.svg" : data.data.brands == "S'RIN"
                ? "./assets/discovery/border/2.svg" : data.data.brands == "SMYTH'S"
                    ? "./assets/discovery/border/3.svg" : data.data.brands == "SIRANINN Residences"
                        ? "./assets/discovery/border/4.svg" : "";

        border.append(borderImg);
        cardImgDiv.append(cardImg);
        detail.append(data.data.new == true ? newProject : '');
        detail.append(textTitle);
        detail.append(textDetail);
        detail.append(textPrice);

        cardDetail.append(border);
        cardDetail.append(detail);

        card.append(cardImgDiv);
        card.append(cardDetail);

        cardList.append(card);
    })
}

async function exploreMoreDiscovery() {
    const resp = await getDiscovery();
    var cardList = document.querySelector('cardList');
    discoveryNum += 4;
    resp.slice(discoveryNum, discoveryNum + 4).map(data => {
        var card = document.createElement('card');
        var cardImgDiv = document.createElement('cardImg');
        var cardImg = document.createElement('img');
        var cardDetail = document.createElement('cardDetail');
        var detail = document.createElement('detail');
        var newProject = document.createElement('newProject');
        var textTitle = document.createElement('textTitle');
        var textDetail = document.createElement('textDetail');
        var textPrice = document.createElement('textPrice');
        var border = document.createElement('border');
        var borderImg = document.createElement('img');

        cardImg.src = data.data.s;
        textPrice.innerHTML = data.data.price;
        textDetail.innerHTML = data.data.location;
        textTitle.innerHTML = data.data.brands + '(' + data.id + ')';
        newProject.innerHTML = 'New Project';

        borderImg.src = data.data.brands == "SHAWN"
            ? "./assets/discovery/border/1.svg" : data.data.brands == "S'RIN"
                ? "./assets/discovery/border/2.svg" : data.data.brands == "SMYTH'S"
                    ? "./assets/discovery/border/3.svg" : data.data.brands == "SIRANINN Residences"
                        ? "./assets/discovery/border/4.svg" : "";

        border.append(borderImg);
        cardImgDiv.append(cardImg);
        detail.append(data.data.new == true ? newProject : '');
        detail.append(textTitle);
        detail.append(textDetail);
        detail.append(textPrice);

        cardDetail.append(border);
        cardDetail.append(detail);

        card.append(cardImgDiv);
        card.append(cardDetail);

        cardList.append(card);
    })

}