class helperCard {
    constructor(cname, lawcount, welfare, salary, ddp, category, qollie) {
        this.domId = "applicant-helper"
        this.cname = cname
        this.lawcount = lawcount
        this.welfare = welfare
        this.salary = salary
        this.ddp = ddp
        this.category = category
        this.qollie = qollie
    }

    init() {
        this.createCard()
    }

    createCard() {
        const template = this.getTemplate()
        const el = $(template)
        const small = this.hideTemplate()
        const sel = $(small)
        $("body").prepend(el)
        $("body").prepend(sel)
        // this.getLawItem()
    }

    failCard() {
        const ftemp = this.getFailTemp()
        const el = $(ftemp)
        $("body").prepend(el)
    }

    getEl() {
        return $(`#${this.domId}`)
    }

    getLaw() {
        return $(`.card-law`)
    }

    getChart() {
        return $(`.card-salary`)
    }

    getWelfare() {
        return $(`.card-welfare`)
    }

    listener() {
        // -------mouse lisen function ---------------- 
        // const el = this.getEl()

        // let start = false
        // let elStartPoint = {
        //     x: 0,
        //     y: 0
        // }
        // let pStartPoint = {
        //     x: 0,
        //     y: 0
        // }

        // el.mousedown(function(e) {
        //     elStartPoint.x = el.offset().left
        //     elStartPoint.y = el.offset().top
        //     pStartPoint.x = e.pageX
        //     pStartPoint.y = e.pageY
        //     start = true
        // })

        // $(window).mouseup(function() {
        //     start = false
        // }).mousemove(function(e) {
        //     if (!start) {
        //         return
        //     }

        //     let offsetX = e.pageX - pStartPoint.x 
        //     let offsetY = e.pageY - pStartPoint.y - $(window).scrollTop()
        //     el.css({
        //         transform: 'none',
        //         transition: 'unset',
        //         right: 'unset',
        //         left: elStartPoint.x + offsetX,
        //         top: elStartPoint.y + offsetY
        //     })
        // })

        // el.find(".card-cantentiner").mousemove(function(e) {
        //     e.stopPropagation()
        // })
        // -------mouse lisen function ----------------
        if (this.lawcount != null && this.lawcount.length > 0) {
            $(".card-law").css({
                color: '#B20000'
            })
        }

        $("#card-hideinformation").click(function () {
            $("#applicant-helper").css("right", "-60%")
            $(".small-card").css("right", "0%")
        });
        $(".small-card").click(function () {
            $("#applicant-helper").css("right", "0%")
            $(".small-card").css("right", "-10%")
        });
    }

    qollieId() {
        if (this.qollie.data.getCompanyStat.id == "") {
            return "資料無此公司資料"
        }
        return this.qollie.data.getCompanyStat.id
    }

    qollieScore() {
        var arr = []
        if (this.qollieId() == "資料無此公司資料") {
            return arr
        }
        var good = this.qollie.data.getCompanyStat.good
        var bad = this.qollie.data.getCompanyStat.bad
        var normal = this.qollie.data.getCompanyStat.normal
        var total = good + bad + normal
        if (total != 0) {
            arr.push((good / total * 100).toFixed(1))
            arr.push((bad / total * 100).toFixed(1))
            arr.push((normal / total * 100).toFixed(1))
        }
        return arr

    }

    lawfilter() {
        let arrLaw = this.lawcount
        if (arrLaw == null) {
            arrLaw = []
        }
        let sex = []
        let safe = []
        let labor = []
        arrLaw.forEach((element, index) => {
            if (element.Law.includes("性別工作") || element.Law.includes("性平")) {
                sex.push(index)
            }
            if (element.Law.includes("職業安全") || element.Law.includes("職安")) {
                safe.push(index)
            }
            if (element.Law.includes("勞動基準") || element.Law.includes("勞基")) {
                labor.push(index)
            }
        });
        // console.log(arrLaw.length, sex.length, safe.length, labor.length)
        return [sex.length, safe.length, labor.length, arrLaw.length - sex.length - safe.length - labor.length]
    }

    hideTemplate() {
        return `
            <div class="small-card">
                <div class="arrow-extend"><</div>
                <div class="small-card-name">Jobhelper</div>
            </div>
        `
    }

    getTemplate() {
        const len = this.category.length
        // console.log(this.qollie)
        var temp = ``

        for (let i = 0; i < len; i++) {
            let id = "category_id_" + i
            let t = `<span id="${id}" class="category_list card-css">{{data}}</span>`
            let category = this.category[i]
            t = t.replace("{{data}}", category.category)
            temp = temp + t
            if (i != len - 1) {
                temp = temp + `<span>、</span>`
            }
        }
        var qid = this.qollieId()
        var qscore = this.qollieScore()
        var qolliestring = ``
        var qollielink = ``
        if (qscore.length > 0) {
            qolliestring = `
            <span class="card-css" >
                <span>好${qscore[0]}%</span>
                <span>壞${qscore[1]}%</span>
                <span>普通${qscore[2]}%</span>
            </span>`
        } else {
            qolliestring = `<span>資料不足</span>`
        }
        if (qid != "資料無此公司資料") {
            qollielink = `<a href="https://www.qollie.com/companies/${qid}" style="color:white" target="_blank" class="card-qollie card-css">`
        } else {
            qollielink = `<a href="https://www.qollie.com" style="color:white" target="_blank" class="card-qollie card-css">`
        }

        var fileter = this.lawfilter()
        var tatal = fileter[0]+fileter[1]+fileter[2]+fileter[3]
        var cardlaw = `<div class="card-law card-css">曾經違反 ${fileter[2]} 筆勞基法 ${fileter[0]} 筆性平法 ${fileter[1]} 筆職安法 共${tatal}筆勞工相關違法記錄</div>`
        if (fileter[3] != 0) {
            cardlaw = `<div class="card-law card-css">曾經違反 ${fileter[2]} 筆勞基法 ${fileter[0]} 筆性平法 ${fileter[1]} 筆職安法 ${fileter[3]}筆其它相關安全法 共${tatal}筆勞工相關違法記錄</div>`
        }
        if (tatal == 0) {
            cardlaw = `<div class="card-law card-css">目前無相關違反記錄</div>`
        }
        return `
            <div id="${this.domId}">
                
                <div class="card-container">
                    <div id="card-hideinformation">>></div>
                    <div class="card-title">職位資訊</div>
                    <hr>
                        <div class="card-cantentiner">
                            <div class="card-company card-css">${this.cname}</div>
                            ${cardlaw}
                            ${qollielink}天眼通評價：
                                ${qolliestring}
                            </a>
                            
                            <div class="card-welfare card-css">福利分析在整體福利第${this.ddp}分位(前${10 - this.ddp}0%)</div>
                            <div class="card-welfare card-css">福利摘要分析</div>
                            <span class="card-salary card-css">職務薪水參考：</span>
                            ${temp}
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    getFailTemp() {
        return `<div id="${this.domId}">
        <div class="card-container">
            <div id="card-hideinformation">>></div>
            <div class="card-title">職位資訊</div>
            <hr>
                <div class="card-cantentiner" style="color:#fff">
                    若有問題可以更新套件或重新安裝即可！
                    近期因104及chrome的更新，在做對應之功能，
                    若有超過一個禮拜皆未能成功，或發現有其它問題，
                    麻煩連絡qazxcv367tasi@gmail.com，謝謝
                </div>
            </div>
        </div>
    </div>`
    }
}
