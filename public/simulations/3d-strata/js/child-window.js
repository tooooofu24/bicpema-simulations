let trAddButton;
let trNum = 0
let trSum = 0
let idArr = []
let trArr = []
function trAddButtonFunction() {
    trNum += 1
    trSum += 1
    let n = trSum
    let tr = new TR(n)
    trArr.push(tr)
    console.log(trArr)
}

function elCreate() {
    trAddButton = select("#trAddButton")
}

function reloadFunction() {
    let a = []
    for (let i = 0; i < trArr.length; i++) {
        a.push([trArr[i].td1Input.value(), trArr[i].td2Input.value(), trArr[i].td3Select.value()])
    }
    let c = document.getElementById("place_name").innerHTML
    let name = c.split("のデータを編集")[0]
    let arr = [name, a]
    window.opener.submit(arr);
}

function elInit() {
    trAddButton.mousePressed(trAddButtonFunction)
}

function setup() {
    elCreate()
    elInit()

}

function draw() {
    reloadFunction()
}

class TR {
    constructor(n) {
        let a = n
        this.tr = createElement("tr").id("tr" + a)
        this.th = createElement("th").id("th" + a).html(trNum + "層目")
        this.td1 = createElement("td").id("td1" + a)
        this.td1Input = createInput(0, "number")
        this.td2 = createElement("td").id("td2" + a)
        this.td2Input = createInput(0, "number")
        this.td3 = createElement("td").id("td3" + a)
        this.td3Select = createSelect()
        this.td4 = createElement("td").id("td4" + a)
        this.trRemoveButton = createButton("削除")
        this.tr.parent("tablebody")
        this.th.parent("tr" + a)
        this.td1.parent("tr" + a)
        this.td1Input.parent("td1" + a).class("form-control")
        this.td2.parent("tr" + a)
        this.td2Input.parent("td2" + a).class("form-control")
        this.td3.parent("tr" + a)
        this.td3Select.parent("td3" + a).class("form-select")
        this.td3SelectOptionArr = ["砂岩層", "泥岩層", "れき岩層", "石灰岩層", "凝灰岩層・火山灰層", "ローム層", "その他の層"]
        for (let i = 0; i < this.td3SelectOptionArr.length; i++)this.td3Select.option(this.td3SelectOptionArr[i])
        this.td4.parent("tr" + a)
        this.trRemoveButton.parent("td4" + a).class("btn btn-outline-danger w-100").id("trRemoveButton" + a)
        function _removeButtonFunction() {
            select("#tr" + str(a)).remove()
            trArr.pop(a)
            trNum -= 1
            idArr.splice(idArr.findIndex(idIndex => idIndex == str(a)), 1)
            for (let i = 0; i < idArr.length; i++) {
                select("#th" + idArr[i]).html(i + 1 + "層目")
            }
            console.log(trArr)
        }
        this.trRemoveButton.mousePressed(_removeButtonFunction)
        idArr.push(str(a))
        console.log(idArr)
    }
}