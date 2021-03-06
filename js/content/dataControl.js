const local = chrome.storage.local

function clearAlldata() {
    local.clear()
}

let date = new Date()
let month = date.getMonth()
let day = date.getDate()

async function setLocalDate() {
    await local.set({ 'localmonth': month })
    await local.set({ 'localday': day })
}



async function getLocalMonth() {
    await local.get('localday', function (el) {
        return el.localday
    })
}

async function getLocalDay() {
    await local.get('localmonth', function (el) {
        return el.localmonth
    })
}

function autoClear() {
    local.get('localday', function (el) {
        let localday = el.localday
        local.get('localmonth', function (el) {
            let localmonth = el.localmonth
            let clearFlag = (localmonth - month) < 0 ||
                (localmonth == 11 && month != localmonth) ||
                (localday == undefined || localmonth == undefined)
            // console.log(localday, localmonth, clearFlag)
            if (clearFlag) {
                clearAlldata()
                setLocalDate()
                // console.log("alredy clear!!!")
            } else {
                // console.log("not the time!!")
            }
        })
    })
}
