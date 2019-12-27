var isInIosApp = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.thepaper && window.webkit.messageHandlers.thepaper.postMessage;
var isInAndroidApp = window.thepaper && window.thepaper.newsClicked;
function webOnload(obj) {
    //初始图片高度
    if(obj&&obj.votedList&&obj.allVoteInfo) {
        initUserVote(obj.votedList,obj.allVoteInfo);
    }
    //图片懒加载
    imgFactory(function () {
        //传递内容高度
        sendWebHeight();
        // 传递表格滑动区域
        initGallery();
        // a标签的跳转
        askip();
        setTimeout(function () {
            LinkApp.initPage();
        }, 200);
        // 无图
        showimg.initshowimg();
        votePK();
        ordinaryVote();
    });
}
//传递android图集 / 表格 滑动区域
function initGallery() {
    if (isInAndroidApp) {
        var table = document.querySelectorAll(".table_panel");
        [].forEach.call(table, function (dom, index) {
            var top = dom.offsetTop;
            var bottom = dom.offsetTop + dom.offsetHeight;
            window.thepaper.initHorizontalComponent(top, bottom);
        })
    }

}
// 字体切换
function webOnChange(obj) {
    var textsize = obj.text_size;
    var fonttype = obj.font;
    var medaltype = obj.night;
    var nettype = obj.network;
    var webviewDom = document.querySelector(".app_new_detail");
    switch (textsize) {
        case "0":
            webviewDom.classList.add("fontexsm");
            webviewDom.classList.remove("fontsm", "fontml", "fontbig", "fontexbig","fontlabig");
            break;
        case "1":
            webviewDom.classList.add("fontsm");
            webviewDom.classList.remove("fontexsm", "fontml", "fontbig", "fontexbig","fontlabig");
            break;
        case "2":
            webviewDom.classList.add("fontml");
            webviewDom.classList.remove("fontexsm", "fontsm", "fontbig", "fontexbig","fontlabig");
            break;
        case "3":
            webviewDom.classList.add("fontbig");
            webviewDom.classList.remove("fontexsm", "fontml", "fontsm", "fontexbig","fontlabig");
            break;
        case "4":
            webviewDom.classList.add("fontexbig");
            webviewDom.classList.remove("fontexsm", "fontml", "fontbig", "fontsm","fontlabig");
            break;
        case "5":
            webviewDom.classList.add("fontlabig");
            webviewDom.classList.remove("fontexsm", "fontml", "fontbig", "fontsm","fontexbig");
            break;
        default:
            console.log('数据不对');
    }
    switch (fonttype) {
        case "0":
            webviewDom.classList.add("defultft");
            webviewDom.classList.remove("songtift");
            break;
        case "1":
            webviewDom.classList.add("songtift");
            webviewDom.classList.remove("defultft");
            break;
        default:
            console.log('数据不对');
    }
    switch (medaltype) {
        case "0":
            webviewDom.classList.add("modelbai");
            webviewDom.classList.remove("modelyj");
            break;
        case "1":
            webviewDom.classList.add("modelyj");
            webviewDom.classList.remove("modelbai");
            break;
        default:
            console.log('数据不对');
    }
    switch (nettype) {
        case "0":
            webviewDom.classList.add("netwifi");
            webviewDom.classList.remove("netfourg");

            break;
        case "1":
            webviewDom.classList.add("netfourg");
            webviewDom.classList.remove("netwifi");
            break;
    }
    //重新传递内容高度和位置
    //传递内容高度
    sendWebHeight();
    // 传递表格滑动区域
    initGallery();
    LinkApp.initChange();
    addmadel.inithasclass();
}
// 正文中a标签的跳转
function askip() {
    var skips = document.querySelectorAll(".art_a");
    [].forEach.call(skips, function (dom) {
        dom.addEventListener("click", function () {
            var parmas = getskipinfo(dom);
            LinkApp.sendthepaperToApp(parmas);
        })
    })
}
// 传递a标签的信息
function getskipinfo(dom) {
    var contType = dom.getAttribute("data-conttype");
    var contId = dom.getAttribute("data-contid");
    var cid = dom.getAttribute("data-cid");
    var optType = dom.getAttribute("data-optType");
    skipmessage = {
        "domain": "thepapercn",
        "contType": contType,
        "contId": contId,
        "cid": cid,
        "optType": optType,
    }
    skipmessage = JSON.stringify(skipmessage);
    return skipmessage;
}
// //初始图片高度
function imgFactoryForHeight() {
    var imgArray = document.querySelectorAll(".img_default");
    // var appwidth = document.querySelectorAll(".app_new_detail")[0];
    var screenWidth = window.screen.width;
    var appwidth = document.querySelectorAll(".app_new_detail")[0].offsetWidth;
    var pl = getPadding(document.querySelectorAll(".app_new_detail")[0], "paddingLeft");
    [].forEach.call(imgArray, function (dom) {
        var width = dom.getAttribute("data-width");
        var trueheight = dom.getAttribute("data-trueheight");
        var height = dom.getAttribute("data-height");
        if(trueheight) {
            var bl = width / trueheight;
            height = (appwidth-pl) / bl;
            dom.style.width = "100%";
            dom.style.height = height + "px";
        }else {
            var bl = width / height;
            height = screenWidth / bl;
            dom.style.width = "100%";
            dom.style.height = height + "px";
        }
    })

}
// 获取.app_new_detail的padding值
function getPadding(dom, attr){
    var paddingWidthStr =  dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
    var paddingWidthNum = paddingWidthStr.slice(0,paddingWidthStr.indexOf('p'));
    var getpad = paddingWidthNum*2;
    return getpad;
}
// 图片的加载
function imgFactory(callback) {
    var imgArray = document.querySelectorAll(".img_default");
    // var screenWidth =  window.screen.width;
    [].forEach.call(imgArray, function (dom) {
        
        var src = dom.getAttribute("data-src");
        // dom.setAttribute("data-errortime",errorTime)
        if (src) {
            var errorTime = 0;
            dom.src = src;
            dom.onload = function () {
                dom.style.background = "rgba(255, 255, 255, 0)";
            }
            dom.onerror = function () {
                if (errorTime < 5) {
                    errorTime++;
                    dom.src = src + '?' + Math.random() * 100;
                } else {
                   return
                }
            }
        }
    })
    if (callback) callback();
}
//传递web高度
function sendWebHeight() {
    var contHeight = document.querySelector(".app_new_detail").scrollHeight;
    if (isInAndroidApp) {
        window.thepaper.contentHeight(contHeight);
    }
    if (isInIosApp) {
        window.webkit.messageHandlers.contentHeight.postMessage(contHeight)
    }
}

// 强相关与app的跳转
var LinkApp = {
    data: [
        {
            name: ".and_audio_panel",
            type: 1
        },
        {
            name: ".and_video_item",
            type: 2
        },
        {
            name: ".ait_item_box",
            type: 3
        },
    ],
    initPage: function () {
        var that = this;
        for (var i = 0; i < this.data.length; i++) {
            var item = this.data[i];
            var doms = document.querySelectorAll(item.name);
            [].forEach.call(doms, function (dom, index) {
                var type = item.type;
                if (type == "1") {
                    dom.setAttribute("isupload", "1");
                    var string = that.getDataForApp(dom, type);
                    that.sendmediaToApp(string);
                    dom.style.visibility = "hidden";
                }
                else if (type == '3') {
                    dom.onclick = function() {
                        this.setAttribute("isupload", "0");
                        var string = that.getDataForApp(dom, type);
                        that.sendmediaToApp(string);
                    }
                }
                // 点击传值
                else {
                    dom.addEventListener("click", function () {
                        this.setAttribute("data-click", "clicked");
                        this.setAttribute("isupload", "0");
                        var string = that.getDataForApp(dom, type);
                        that.sendmediaToApp(string);
                    })
                }
            })
        }
        this.initApplink()//初始超链接处理
    },
    initChange: function () {
        var that = this;
        for (var i = 0; i < this.data.length; i++) {
            var item = this.data[i];
            var doms = document.querySelectorAll(item.name);
            [].forEach.call(doms, function (dom, index) {
                var type = item.type;
                var dataclick = dom.getAttribute("data-click");
                if (type == '1') {
                    var string = that.getDataForApp(dom, type);
                    that.sendmediaToApp(string);
                }
                if (type == '3') {
                    dom.onclick = function() {
                        var string = that.getDataForApp(dom, type);
                        that.sendmediaToApp(string);
                    }
                }
                if (dataclick) {
                    // 直接传值
                    dom.setAttribute("isupload", "1")
                    var string = that.getDataForApp(dom, type);
                    that.sendmediaToApp(string);
                }

            })
        }
    },
    initWutu: function () {
        var that = this;
        for (var i = 0; i < this.data.length; i++) {
            var item = this.data[i];
            var doms = document.querySelectorAll(item.name);
            [].forEach.call(doms, function (dom, index) {
                var type = item.type;
                if (type == "1") {
                    dom.setAttribute("isupload", "1");
                    var string = that.getDataForApp(dom, type);
                    that.sendmediaToApp(string);
                    dom.style.visibility = "hidden";
                }
                if (type == "2") {
                    dom.addEventListener("click", function () {
                        this.setAttribute("data-click", "clicked");
                        this.setAttribute("isupload", "0");
                        var string = that.getDataForApp(dom, type);
                        that.sendmediaToApp(string);
                    })
                }
            })
        }
    },
    getDataForApp: function (dom, type) {
        var index = dom.getAttribute("data-index");
        var updata = dom.getAttribute("isupload");
        var result = {};
        result = {
            "domain": "thepapercn",
            "mediaType": type || '0',
            "index": index || '0',
            "pos_x": dom.offsetLeft || '0',
            "pos_y": dom.offsetTop || '0',
            "pos_w": dom.offsetWidth || '0',
            "pos_h": dom.offsetHeight || '0',
            "isUpdate": updata,
        }
        result = JSON.stringify(result);
        return result;
    },
    // 超链接处理
    initApplink: function () {
        var that = this;
        var andrelateArray = document.querySelectorAll(".and_relate");
        [].forEach.call(andrelateArray, function (dom) {
            var conttype = dom.getAttribute("data-conttype");
            var contid = dom.getAttribute("data-contid");
            var optType = dom.getAttribute("data-optType");
            var cid = dom.getAttribute("data-cid");
            dom.addEventListener("click", function () {
                var ajaxObj = {
                    "domain": "thepapercn",
                    "contType": conttype || '0',
                    "contId": contid || '0',
                    "optType": optType || '0',
                    "cid": cid || '0',
                }
                ajaxObj = JSON.stringify(ajaxObj);
                that.sendthepaperToApp(ajaxObj);
            })
        })
    },
    sendmediaToApp: function (param) {
        if (isInIosApp) {
            window.webkit.messageHandlers.media.postMessage(param);
        } else if (isInAndroidApp) {
            window.media.newsClicked(param);
            for (var i = 0; i < this.data.length; i++) {
                var item = this.data[i];
                var doms = document.querySelectorAll(item.name);
                [].forEach.call(doms, function (dom, index) {
                    var type = item.type;
                    if (type == 2) {
                        var dataclick = dom.getAttribute("data-click");
                        if (dataclick) {
                            dom.style.visibility = "hidden";
                        }
                    }
                })
            }
        } else {
            console.log(param);
        }
    },
    sendthepaperToApp: function (param) {
        if (isInIosApp) {
            window.webkit.messageHandlers.thepaper.postMessage(param);
        } else if (isInAndroidApp) {
            window.thepaper.newsClicked(param);
        } else {
            console.log(param);
        }
    }
}

var addmadel = {
    data: [
        {
            name: ".and_video_item"
        },
        {
            name: ".ait_item_box"
        },
        {
            name: ".anw_img_box"
        },
        {
            name: ".ap_item"
        }
    ],
    inithasclass: function () {
        var that = this;
        var appdom = document.querySelector(".app_new_detail");
        var ishasclass = that.hasClass(appdom, "modelyj");
        for (var i = 0; i < this.data.length; i++) {
            var item = this.data[i];
            var doms = document.querySelectorAll(item.name);
            [].forEach.call(doms, function (dom, index) {
                var sandom = dom.children[0]
                if (ishasclass) {
                    sandom.classList.remove("toumin");
                } else {
                    sandom.classList.add("toumin");
                }

            })
        }
    },
    hasClass: function (ele, className) {
        var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
        return reg.test(ele.className)
    },

}

var showimg = {
    data: [
        {
            name: ".wutu_type_box"
        },
        {
            name: ".wutu_atlas_box"
        },
    ],
    initshowimg: function () {
        var that = this;
        for (var i = 0; i < this.data.length; i++) {
            var item = this.data[i];
            var doms = document.querySelectorAll(item.name);
            [].forEach.call(doms, function (dom, index) {
                dom.addEventListener("click", function () {
                    dom.style.display = "none";
                    dom.nextElementSibling.style.display = "block";
                    //传递内容高度
                    sendWebHeight();
                    // 传递表格滑动区域
                    initGallery();
                    // 跟新音频视频的高度
                    LinkApp.initWutu();

                })
            })
        }
    }
}

// pk投票
function votePK() {
    var voteArrs = document.querySelectorAll(".aa_word");
    [].forEach.call(voteArrs, function (voteArr, index) {
        
        voteArr.addEventListener("click",function() {

            //获取投票的类别和支持的选项的id
            var voteId = voteArr.parentNode.getAttribute("data-vote-id");
            var dataId = voteArr.getAttribute("data-option-id");
            var parmas = getMsgToApp(voteId,dataId);
            //当前投票卡片总人数加1
            var countvotedom = voteArr.parentNode.parentNode.querySelector(".countvote");
            countvotedom.innerHTML=Number(countvotedom.innerHTML)+1;
            // 选项投票数+1
            sendMsgToApp(parmas);
            voteActive(voteArr,'false');
        })
    })
}
// 计算投票数
function calculationPk(supporetNum,opponentNum,flag) {
    var zongNum = 0;
    var percent = 0;
    var supporetPercent =0 ;
    var voteDomArr = document.querySelectorAll(".apvb_pk");
    var voteClickArr = [];
    for (var i = 0; i < voteDomArr.length; i++) {
        voteClickArr.push(voteDomArr[i].getAttribute("id"));
    }
    voteClickArr.map(function (item, index) {
        if(flag==='true') {
            zongNum = supporetNum+opponentNum;
            percent = (supporetNum/zongNum)*100;
            supporetPercent = Math.round(percent);
        }else {
            zongNum = (supporetNum+1)+opponentNum;
            percent = ((supporetNum+1)/zongNum)*100;
            supporetPercent = Math.round(percent);
        }
    })
    return supporetPercent
}
// pk投票动画
function voteActive(dom,flag) {
    var clickNum = 0;
    var otherNum = 0;
    var startAcc = 50;
    var otherAcc = 50;
    var showSupport = dom.parentNode.parentNode.children[2];
    if (dom.className.indexOf('at_agree_box') > -1) {
         // 获取投票数num,投票卡片id,投票选项id
        var supporetNum = Number(dom.getAttribute("data-vote-num"));
        var opponentNum =  Number(dom.nextElementSibling.getAttribute("data-vote-num"));
       
        clickNum = calculationPk(supporetNum,opponentNum,flag);
        otherNum = 100-clickNum;

        var agreeDom =dom.parentNode.firstElementChild.children[0];
        var orherDom = dom.parentNode.firstElementChild.children[1];
       
        dom.classList.add("aa_isshow");
        dom.nextElementSibling.classList.add("aa_isshow");
        
        showSupport.classList.add("show");
        showSupport.children[1].children[0].classList.add("hide");

        orherDom.innerHTML = "50%";
        agreeDom.innerHTML = "50%";
        
        if(clickNum===100){
            orherDom.classList.add("mixzore");
            agreeDom.style.width = clickNum+"%";
            orherDom.style.width =  otherNum+"%";
            dom.parentNode.firstElementChild.lastElementChild.style.left="98%";
        }
        else if(clickNum>90&&clickNum<100) {
            orherDom.classList.add("mixnine");
            agreeDom.style.width = "inherit";
            dom.parentNode.firstElementChild.lastElementChild.style.left="auto";
            dom.parentNode.firstElementChild.lastElementChild.style.right="0.1rem";
        
        }else if(clickNum>85&&clickNum<91){
            orherDom.classList.add("mixten");
            agreeDom.style.width = clickNum+"%";
            orherDom.style.width = otherNum+"%";
            dom.parentNode.firstElementChild.lastElementChild.style.left=clickNum+"%";
        }
        else if(clickNum>=10&&clickNum<15) {
            agreeDom.classList.add("mixten");
            agreeDom.style.width = clickNum+"%";
            orherDom.style.width = otherNum+"%";
            dom.parentNode.firstElementChild.lastElementChild.style.left=clickNum+"%";
        }
        else if(clickNum>0&&clickNum<10) {
            agreeDom.classList.add("mixnine");
            orherDom.style.width = "inherit";
            dom.parentNode.firstElementChild.lastElementChild.style.left= "0.6rem";
        }
        else if(clickNum===0) {
            agreeDom.classList.add("mixzore");
            agreeDom.style.width = clickNum+"%";
            orherDom.style.width = otherNum+"%";
            dom.parentNode.firstElementChild.lastElementChild.style.left="2%";
            
        }
        else {
            agreeDom.style.width = clickNum+"%";
            orherDom.style.width = otherNum+"%";
            dom.parentNode.firstElementChild.lastElementChild.style.left=clickNum+"%";
        }
    }
    if(dom.className.indexOf('at_noagree_box') > -1) {
        // 获取投票数num,投票卡片id,投票选项id
        var supporetNum =  Number(dom.getAttribute("data-vote-num"));
        var opponentNum =  Number(dom.previousElementSibling.getAttribute("data-vote-num"));
        clickNum = calculationPk(supporetNum,opponentNum,flag);
        otherNum = 100-clickNum;

        var agreeDom =dom.parentNode.firstElementChild.children[1];
        var orherDom = dom.parentNode.firstElementChild.children[0];

        orherDom.innerHTML = "50%";
        agreeDom.innerHTML = "50%";

        dom.classList.add("aa_isshow");
        dom.previousElementSibling.classList.add("aa_isshow");

        showSupport.classList.add("show");
        showSupport.children[0].children[0].classList.add("hide");

        if(clickNum===100){
            orherDom.classList.add("mixzore");
            agreeDom.style.width = clickNum+"%";
            orherDom.style.width = "0%";
            dom.parentNode.firstElementChild.lastElementChild.style.left="2%";
        }
        else if(clickNum>90&&clickNum<100) {
            orherDom.classList.add("mixnine");
            agreeDom.style.width = "inherit";
            dom.parentNode.firstElementChild.lastElementChild.style.left="0.6rem";
        }
        else if(clickNum>85&&clickNum<91){
            orherDom.classList.add("mixten");
            orherDom.style.width = otherNum+"%";
            agreeDom.style.width = clickNum+"%";
            dom.parentNode.firstElementChild.lastElementChild.style.left=otherNum+"%";
        }
        else if(clickNum>=10&&clickNum<15) {
            agreeDom.classList.add("mixten");
            orherDom.style.width = otherNum+"%";
            agreeDom.style.width = clickNum+"%";
            dom.parentNode.firstElementChild.lastElementChild.style.left=otherNum+"%";
        }
        else if(clickNum>0&&clickNum<10) {
            agreeDom.classList.add("mixnine");
            orherDom.style.width = "inherit";
            dom.parentNode.firstElementChild.lastElementChild.style.left= "auto";
            dom.parentNode.firstElementChild.lastElementChild.style.right= "0.1rem";
        }
        else if(clickNum===0) {
            agreeDom.classList.add("mixzore");
            agreeDom.style.width = clickNum+"%";
            orherDom.style.width = otherNum+"%";
            dom.parentNode.firstElementChild.lastElementChild.style.left="98%";
        }
        else {
            orherDom.style.width = otherNum+"%";
            agreeDom.style.width = clickNum+"%";
            dom.parentNode.firstElementChild.lastElementChild.style.left=otherNum+"%";
        }
    }
    if(clickNum>=0&&clickNum<=50){
        var timeId = setInterval(()=>{
            startAcc = startAcc-5;
            otherAcc = otherAcc+5;
            agreeDom.innerHTML=startAcc+"%";
            orherDom.innerHTML=otherAcc+"%";
            if(startAcc <= clickNum) {
                clearInterval(timeId);
                agreeDom.innerHTML=clickNum+"%";
                orherDom.innerHTML=otherNum+"%";
            }
        },20);
    }else if(clickNum>50&&clickNum<100){
        var timeId = setInterval(()=>{
            startAcc = startAcc+5;
            otherAcc = otherAcc-5;
            agreeDom.innerHTML=startAcc+"%";
            orherDom.innerHTML=otherAcc+"%";
            if(startAcc >= clickNum) {
                clearInterval(timeId);
                agreeDom.innerHTML=clickNum+"%";
                orherDom.innerHTML=otherNum+"%";
            }
        },20);
    }else if(clickNum==100) {
        var timeId = setInterval(()=>{
            startAcc = startAcc+5;
            otherAcc = otherAcc-5;
            agreeDom.innerHTML=startAcc+"%";
            orherDom.innerHTML=otherAcc+"%";
            if(startAcc >= clickNum) {
                clearInterval(timeId);
                agreeDom.innerHTML=clickNum+"%";
                orherDom.innerHTML='';
            }
        },20);
    }

}
// 普通投票
function ordinaryVote() {
    var currentCheck;
    var voteArrs = document.querySelectorAll(".anb_change_type");
    [].forEach.call(voteArrs, function (voteArr, index) {
        voteArr.addEventListener("click",function() {
            var changeNumArr = [];
            //获取投票的类别和支持的选项的id
            var parentDom = voteArr.parentNode.parentNode;
            var voteId = parentDom.getAttribute("data-vote-id");
            var dataId = voteArr.getAttribute("data-option-id");
            
            //当前投票卡片总人数加1
            if(parentDom.className.indexOf('hasclick') <= -1) {
                var countvotedom = parentDom.parentNode.querySelector(".countvote");
                countvotedom.innerHTML=Number(countvotedom.innerHTML)+1;
                var parmas = getMsgToApp(voteId,dataId);
                sendMsgToApp(parmas);
            }
            //判断是否是当前投票
            var currentCheckDoms= parentDom.querySelectorAll("ul .anb_change_type");
            [].forEach.call(currentCheckDoms, (dom, index)=> {
                var that = this;
                currentCheck = dom.children[2].innerHTML;
                if(currentCheck!='') {
                    return;
                }else {
                  that.classList.add("vote_changed");
                  that.parentNode.parentNode.classList.add("hasclick");
                  //定位当前的投票卡片
                  var parentDom = that.parentNode.parentNode.parentNode;
                  // 获取到当前投诉卡片的所有选项
                  changeNumArr.push(dom.getAttribute("data-vote-num"));
                  //计算占比
                  if(index==currentCheckDoms.length-1) {
                    var result = ordinaryVoteMix(changeNumArr,currentCheckDoms,dataId,'false');
                    ordinaryVoteActive(result,parentDom)
                  }
                }
            })
        })
    })
    
}
// 将按照投票数的大小进行排序（降序）
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
//普通投票计算占比
function ordinaryVoteMix(arr,currentdomarr,optionid,flag) {
    var zongNum = 0;
    var beforeZong = 0;
    var mix =0;
    var votenumArr = [];
    var res = [];
    arr.map(function(item, index) {
       zongNum = zongNum+Number(item);
    });
    if(flag==='false') {
        zongNum = zongNum+1;
    }
    [].forEach.call(currentdomarr, function (currentdom, index) {
        //选出最大的一个最后计算(前面几个就按照正常计算)
        var voteid = Number(currentdom.getAttribute("data-option-id"));
        var votenum = Number(currentdom.getAttribute("data-vote-num"));

        if(flag==='false'&& voteid == (Number(optionid))) {
            votenum = votenum+1;
        }
        var obj = {id:voteid,number:votenum};
        votenumArr.push(obj);
        //按照投票数的大小进行排序
        if(index == currentdomarr.length-1) {
            votenumArr.sort(compare('number'));
            votenumArr.map(function(item,index){
               if(index<votenumArr.length-1) {
                   var votenum = item.number;
                   mix = Math.ceil((votenum/zongNum)*100);
                   beforeZong =  mix+beforeZong;
                   var mixobj = {id:item.id,mix:mix+"%"};
                   res.push(mixobj);
               }
               if(index==votenumArr.length-1){
                   mix = 100 - beforeZong;
                   var mixobj = {id:item.id,mix:mix+"%"};
                   res.push(mixobj);
                }
            })
        }
    })
    return res
}
// 普通投票动画
function ordinaryVoteActive(res,dom) {
    var ordinaryVoteArr = dom.querySelectorAll(".anb_change_type");
    var votenum = 0;
    res.forEach(function(item,index){
        [].forEach.call(ordinaryVoteArr, function (arrdom, index) {
            var checkId = arrdom.getAttribute("data-option-id");
            var votezhanbi = item.mix.slice(0,-1); //去除%
            if(checkId==item.id) {
                arrdom.children[1].style.width = item.mix;
                var timeId = setInterval(()=>{
                    votenum = votenum+3;
                    arrdom.children[2].innerHTML =votenum+"%";
                    if(votenum >= votezhanbi) {
                        clearInterval(timeId);
                        arrdom.children[2].innerHTML = item.mix;
                    }
                },20);
            }
        })
    })
}
// 获取发送给app的投票数据
function getMsgToApp(voteid, dataid) {
    result = {
        "domain": "thepapercn",
        "vote_id": voteid,
        "option_id": dataid
    }
    result = JSON.stringify(result);
    return result;
}
// 发送给app投票
function sendMsgToApp(result) {
    if (isInAndroidApp) {
        window.thepaper.voteInfo(result);
    }
    if (isInIosApp) {
        window.webkit.messageHandlers.voteInfo.postMessage(result)
    }
}
//安卓设置fontsize
function andrionFontSize() {
    if (isInAndroidApp) {
        // document.querySelector("html").style.fontSize="50px";
        document.querySelector(".app_new_detail").classList.add("andrionpage");
    }
    if(isInIosApp) {
        document.querySelector(".app_new_detail").classList.add("iospage");
        
    }
}
// 记录用户已投票的卡片
function initUserVote(arr,allVote) {
    // 初始化
    var voteError = [];
    allVote.map(function(item,index) {
        var options = item.optionList;
        var voteId = item.voteId;
        var voteNum = item.voteNum;
        var voteDom = document.getElementById(voteId);
        var countvotedom = voteDom.parentNode.querySelector(".countvote");
        countvotedom.innerHTML= voteNum;
         //给投票卡片的每个选项的data-vote-num属性赋值
        if(voteDom) {
           getoptionNum(voteDom,options);
        }
        arr.map(function(arritem,arrindex){
            if(arritem.vote_id == voteId ) {
                options.map(function(t,i) {
                     if(t.optionId== arritem.option_id&&t.voteCount == '0'){
                       voteError.push(arritem);
                       arr.splice(arrindex,1);
                     }
                })
            }
        })
    })
    //数据错误的投票
    voteError.map(function(item,index) {
        var voteId = item.vote_id;
        var dataId = item.option_id;
        initVu(voteId,dataId,'false')
    })
    //数据正确的投票
    arr.map(function(item ,index) {
        var voteId = item.vote_id;
        var dataId = item.option_id;
        initVu(voteId,dataId,'true')
    })
}

function initVu(voteid,dataid,flag) {
    var voteDom = document.getElementById(voteid);
        if(voteDom) {
            if(voteDom.className.indexOf('apvb_pk') > -1) {
                if(flag==='false') {
                    // 总人数手动+1
                    var countvotedom = voteDom.parentNode.querySelector(".countvote");
                    countvotedom.innerHTML=Number(countvotedom.innerHTML)+1;
                }
                initPk(voteDom,dataid,flag);
            }
            if(voteDom.className.indexOf('anvb_normall_box') > -1) {
                voteDom.classList.add("hasclick");
                if(flag==='false') {
                    // 总人数手动+1
                    var countvotedom = voteDom.parentNode.querySelector(".countvote");
                    countvotedom.innerHTML=Number(countvotedom.innerHTML)+1;
                }
                initNormall(voteDom,dataid,flag);
            }
        }
}
// pk缓存
function initPk(dom,dataid,istrue) {
    var optionDoms = dom.querySelectorAll('.aa_word');
    [].forEach.call(optionDoms, function (item, index) {
        var itemid = item.getAttribute("data-option-id");
        if(itemid==dataid) {
            voteActive(item,istrue);
        }
    })
}
// 普通投票缓存
function initNormall(dom,dataid,flag) {
    var changeNumArr = [];
    var currentCheckDoms = dom.querySelectorAll('.anb_change_type');
    [].forEach.call(currentCheckDoms, function (dom, index) {
        changeNumArr.push(dom.getAttribute("data-vote-num"));
        var itemid = dom.getAttribute("data-option-id");
        if(itemid==dataid) {
            dom.classList.add("vote_changed");
        }
        if(index==currentCheckDoms.length-1) {
            var result = ordinaryVoteMix(changeNumArr,currentCheckDoms,dataid,flag);
            ordinaryVoteActive(result,dom.parentNode)
        }
    })
}
//  给投票卡片的每个选项的data-vote-num属性赋值
function getoptionNum(dom,options) {
    if(dom.className.indexOf('apvb_pk') > -1) {
        var optionDoms = dom.querySelectorAll(".aa_word");
    }
    if(dom.className.indexOf('anvb_normall_box') > -1) {
        var optionDoms = dom.querySelectorAll(".anb_change_type");
    }
    options.map(function(item,index) {
        var optionid = item.optionId;
        var voteCount = item.voteCount;
        [].forEach.call(optionDoms, function (item, index) { 
            var wordid = item.getAttribute("data-option-id");
            if(wordid == optionid) {
                item.setAttribute("data-vote-num",voteCount);
            }
        })
    })
}
window.onload = function(){
    andrionFontSize();
    imgFactoryForHeight();
    //  // 模态框
    addmadel.inithasclass();
    webOnload(obj);
}
var obj = {
    "votedList":[
        // {"vote_id":"452","option_id":"1060"},
        // {"vote_id":"453","option_id":"1063"},
    ],
    "allVoteInfo":[
        {
        "optionList": [
            {
                "optionId": "1060",
                "voteCount": "2",
                "fromCache": false
            },
            {
                "optionId": "1061",
                "voteCount": "5",
                "fromCache": false
            }
        ],
        "voteId": "452",
        "voteStatus": 0,
        "fromCache": false,
        "voteNum":"5"
        },
        {
        "optionList": [
            {
                "optionId": "1062",
                "voteCount": "0",
                "fromCache": false
            },
            {
                "optionId": "1063",
                "voteCount": "0",
                "fromCache": false
            },
            {
                "optionId": "1064",
                "voteCount": "0",
                "fromCache": false
            },
            {
                "optionId": "1065",
                "voteCount": "0",
                "fromCache": false
            }
        ],
        "voteId": "453",
        "voteStatus": 0,
        "fromCache": false,
        "voteNum":"0"
        },
    ]
}