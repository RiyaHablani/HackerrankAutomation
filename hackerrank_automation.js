const puppeteer = require('puppeteer')

const codeObj=require('./code')
const loginLink ='https://www.hackerrank.com/auth/login'
const email ='tohivac422@cartep.com'
const password='Cool@123'

let browserOpen= puppeteer.launch({
    headless:false,

    args:['--start-maximized'],

    defaultViewport:null
})

let page
browserOpen.then(function(browserObj){
    let browserOpenPromise =browserObj.newPage()
    return browserOpenPromise;
})
.then(function(newTab){
    page=newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise;
})

.then(function() {
        let passwordIsEntered =page.type("input[type='text']",email, {delay :50});
        return passwordIsEntered;
})
.then(function(){
    let passwordIsEntered =page.type("input[type='password']",password, {delay :50})
    return passwordIsEntered;
}).then(function(){
    let loginButtonClicked =page.click('button[type="Button"]',{delay :50})
    return loginButtonClicked;
}).then(function(){
    let cickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return cickOnAlgoPromise;
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]',page,{delay :50})
    return getToWarmUp;
}).then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})
    return allChallengesPromise;
}).then(function(questionArr){
    console.log('number of questions',questionArr.length)
    let questionWillBeSolved =questionSolver(page,questionArr[0],codeObj.answers[0])
    return questionWillBeSolved;
})


function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModePromise=cPage.waitForSelector(selector)
        waitForModePromise.then(function(){
            let  clickModal =cPage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}

function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked =question.click()
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise= waitAndClick('.monaco-editor.no-user-select.vs',page)
            return EditorInFocusPromise;
        }).then(function(){
            return waitAndClick('.checkbox-input',page)
        })
    .then(function(){
        return page.waitForSelector('textarea.custominput',page)
    }).then(function(){
        return page.type('textarea.custominput',answer,{delay:10})
    }).then(function(){
        let ctrlIsPressed = page.keyboard.down('Control')
        return ctrlIsPressed;
    })
    .then(function(){
        let AIsPressed = page.keyboard.press('A',{delay:100})
        return AIsPressed;
    }).then(function(){
        let XIsPressed = page.keyboard.press('X',{delay:100})
        return XIsPressed;
    }).then(function(){
        let CtrilIsUnPressed = page.keyboard.up('Control')
        return CtrilIsUnPressed;
    }).then(function(){
        let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs',page)
        return mainEditorInFocus;
    }).then(function(){
        let CtrilIsUnPressed = page.keyboard.down('Control')
        return CtrilIsUnPressed;
    }).then(function(){
        let AIsPressed = page.keyboard.press('A',{delay:100})
        return AIsPressed;
    }).then(function(){
        let VIsPressed = page.keyboard.press('V',{delay:100})
        return VIsPressed;
    }).then(function(){
        let CtrilIsUnPressed = page.keyboard.up('Control')
        return CtrilIsUnPressed;
    }).then(function(){
        return page.click('.hr-monaco__run-code',{delay:50});
    }).then(function(){
        resolve()
    }).catch(function(err){
        reject();
    })
   })
}