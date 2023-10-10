let tr;
let th;
let td1,td2,td3,td4;
let td1Input,td2Input;
let td3Select;
let trRemoveButton;
let trAddButton;
function trAddButtonFunction(){
    tr = createElement("tr").id("tr")
    th = createElement("th").id("th").html("4層目")
    td1 = createElement("td").id("td1")
    td1Input = createInput(0,"number")
    td2 = createElement("td").id("td2")
    td2Input = createInput(0,"number")
    td3 = createElement("td").id("td3")
    td3Select = createSelect()
    td4 = createElement("td").id("td4")
    trRemoveButton = createButton("削除")

    tr.parent("tablebody")
    th.parent("tr")
    td1.parent("tr")
    td1Input.parent("td1").class("form-control")
    td2.parent("tr")
    td2Input.parent("td2").class("form-control")
    td3.parent("tr")
    td3Select.parent("td3").class("form-select")
    td3SelectOptionArr = ["砂岩層","泥岩層","れき岩層","石灰岩層","凝灰岩層・火山灰層","ローム層","その他の層"]
    for(let i = 0; i < td3SelectOptionArr.length; i++)td3Select.option(td3SelectOptionArr[i])
    td4.parent("tr")
    trRemoveButton.parent("td4").class("btn btn-outline-danger w-100")
}
function elCreate(){
    trAddButton = select("#trAddButton").mousePressed(trAddButtonFunction)
}



let td3SelectOptionArr;
function elInit(){
    
}
function setup(){
    elCreate()
    elInit()
}