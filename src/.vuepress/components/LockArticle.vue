<template>
  <div class="read-more-wrap"
       style="display: none; position: absolute; bottom: 0px; z-index: 9999; width: 100%; margin-top: -100px; font-family: PingFangSC-Regular, sans-serif;">
    <div id="read-more-mask"
         style="position: relative; height: 200px; background: -webkit-gradient(linear, 0 0%, 0 100%, from(rgba(255, 255, 255, 0)), to(rgb(255, 255, 255)));"></div>
    <a id="read-more-btn" target="_self"
       style="position: absolute; left: 50%; top: 70%; bottom: 30px;
        transform: translate(-50%, -50%); width: 160px; height: 36px;
         line-height: 36px; font-size: 15px; text-align: center;
          border: 1px solid rgb(222, 104, 109); color: rgb(222, 104, 109);
           background: rgb(255, 255, 255); cursor: pointer; border-radius: 6px;">阅读全文</a>

    <div id="btw-modal-wrap" style="display: none;">
      <div id="btw-mask"
           style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; opacity: 0.7; z-index: 999; background: rgb(0, 0, 0);"></div>
      <div id="btw-modal"
           style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 300px; text-align: center; font-size: 13px; background: rgb(255, 255, 255); border-radius: 10px; z-index: 9999; font-family: PingFangSC-Regular, sans-serif;">
            <span id="btw-modal-close-btn"
                  style="position: absolute; top: 5px; right: 15px; line-height: 34px; font-size: 34px; cursor: pointer; opacity: 0.2; z-index: 9999; color: rgb(0, 0, 0); background: none; border: none; outline: none;">×</span>
        <p id="btw-modal-header"
           style="margin-top: 40px; line-height: 1.8; font-size: 13px;">
            微信扫码或搜索：<span style="color: #E9405A; font-weight: bold;">智慧对话的未来</span>

            <br>发送：<span id="hutec-token" class="token"
                         style="color: #e9415a; font-weight: bold; font-size: 17px; margin-bottom: 45px;">{{value}}</span>
            <br>即可<span style="color: #e9415a; font-weight: bold;">立即永久</span>解锁本站全部文章</p>
        <img src="/images/personal/qrcode.png"
             style="width: 180px; margin-top: 10px; margin-bottom: 30px; border: 8px solid rgb(230, 230, 230);">

<!--        <p id="btw-modal-header" style="-->
<!--    margin-top: 20px;-->
<!--    line-height: 1.8;-->
<!--    font-size: 16px;-->
<!--    font-family: Arial, sans-serif;-->
<!--    text-align: center;-->
<!--    color: #333;-->
<!--">-->
<!--          输入密码解锁文章-->
<!--          <span style="-->
<!--        display: block;-->
<!--        margin-top: 20px; /* 保持与输入框上方的间距 */-->
<!--        margin-bottom: 30px; /* 增大了输入框与按钮之间的间距 */-->
<!--    ">-->
<!--        <input style="-->
<!--            background: white;-->
<!--            border: 2px solid #00DBDE;-->
<!--            color: #333;-->
<!--            padding: 8px; /* 维持输入框的填充尺寸 */-->
<!--            width: 200px; /* 维持输入框的宽度 */-->
<!--            border-radius: 5px;-->
<!--            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);-->
<!--            transition: all 0.3s ease-in-out;-->
<!--            outline: none;-->
<!--            font-size: 13px; /* 维持输入框的字体大小 */-->
<!--        " type="text" placeholder="请输入解锁密码" :value="value"-->
<!--               onfocus="style.borderColor='#007BFF';-->
<!--            style.boxShadow='inset 0 0 5px rgba(0,123,255,0.5)';"-->
<!--               onblur="style.borderColor='#00DBDE';-->
<!--            style.boxShadow='inset 0 0 5px rgba(0, 0, 0, 0.1)';"/>-->
<!--    </span>-->
<!--          <span style="-->
<!--        display: block;-->
<!--        margin-top: 30px; /* 维持按钮下方的间距 */-->
<!--    ">-->

<!--        <button style="background: linear-gradient(to right, #007BFF, #00DBDE);-->
<!--            border: none;-->
<!--            color: white;-->
<!--            padding: 10px 20px;-->
<!--            text-align: center;-->
<!--            text-decoration: none;-->
<!--            display: inline-block;-->
<!--            font-size: 16px;-->
<!--            transition: transform 0.3s ease-in-out;-->
<!--            border-radius: 5px;-->
<!--            cursor: pointer;-->
<!--            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);-->
<!--        " @click="setNoLock">解锁</button>-->
<!--    </span>-->
<!--        </p>-->
      </div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import fingerprint from './fingerprint.js'

const props = defineProps({
  //默认只要markdown使用该组件,则校验锁定
  isLock: {
    type: Boolean,
    default: true
  },
  highHeightPercent:{
    type: Number,
    default: 0.05
  },
});

const value = ref("");


onMounted(() => {
  // 判断是否锁定文章
  if (props.isLock) {
    setTimeout(() => {
      let $article = articleObj();
      _detect($article);

      // 定时任务
      setInterval(() => {
        _detect($article);
        // console.log($article,'wenzhang')
      }, 5000);

    }, 100);
  }
});


//实际高度
const actHeight = ref(0);

const articleObj = () => {
  const element = document.querySelector('.theme-hope-content');
  if (element.length <= 0) return null;

  // 文章的实际高度
  let height = element.offsetHeight;
  actHeight.value = height;

  return {
    article: element,
    height: height
  }
};
const _detect = (articleObj)=> {
  if (null == articleObj) return;

  let res = getCookie("_unlock");
  if ('success' === res) {
    return;
  }

  getToken().then(res=>{
    value.value = res;
    // url: 'https://love.hjcwzx.top/server/tec/check',
    // http://localhost:60066/jeecg-boot/tec/check
    fetch('https://love.hjcwzx.top/server/tec/check?token='+value.value)
        .then(r=>{
          r.json().then(json=>{
            let result = json.result
            if(result === 'refuse'){
              _lock(articleObj);
            }else if(result === 'accept'){
              _unlock(articleObj);
              setCookie("_unlock", "success", 12);
            }
          })
        }).catch(err=>{
          _unlock(articleObj);
        })
  })

};


const _lock = (articleObj) => {
  let $article = articleObj.article;
  let height = articleObj.height;
  if ($article.length <= 0) return;

  // 文章隐藏后的高度
  let halfHeight = height * props.highHeightPercent;

  // 篇幅短一点的文章就不需要解锁了
  if (os().isPc && halfHeight > 10) {

    // 判断是否已加锁
    const lock = document.querySelector('.lock');
    if (null !== lock) {
      return;
    }
    //设置文章可显示高度
    $article.style.height = halfHeight + 'px';
    $article.classList.add('lock');
    // 添加引导解锁标签
    // $article.remove("#read-more-wrap");

    // 选择元素
    const originalElement = document.querySelector('.read-more-wrap');
    const clone = originalElement.cloneNode(true);


    // 设置属性
    clone.setAttribute('id', 'read-more-wrap');

    // 设置样式
    clone.style.display = 'block';

    // 绑定点击事件
    const readMoreBtn = clone.querySelector('#read-more-btn');
    const modalWrap = clone.querySelector('#btw-modal-wrap');
    const modalCloseBtn = clone.querySelector('#btw-modal-close-btn');

    readMoreBtn.addEventListener('click', function () {
      modalWrap.style.display = 'block';
    });

    modalCloseBtn.addEventListener('click', function () {
      modalWrap.style.display = 'none';
    });
    $article.appendChild(clone);
  }
};

const _unlock =  (articleObj) => {

  let $article = articleObj.article;

  // 判断是否已加锁
  const lock = document.querySelector('.lock');
  if (null === lock) {
    return;
  }

  $article.style.height = 'initial';

  $article.classList.remove('lock');

  const element = document.querySelector('#read-more-wrap');
  element.remove();
};
const getToken = async () => {
  // 浏览器 Cookie true 不限制
  if (navigator.cookieEnabled) {
    let value = getCookie('UM_distinctid');
    if (!value) {
      return await getFingerprintId();
    }
    return value.substring(value.length - 6).toUpperCase();
  } else {
    return await getFingerprintId();
  }
};

// https://github.com/fingerprintjs/fingerprintjs
// 浏览器指纹(静态方式获取)
const fpPromise = fingerprint.load();


// const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4')
//     .then(FingerprintJS => FingerprintJS.load())

const getFingerprintId = async () => {
  const result = await fpPromise
      .then(fp => fp.get())

  const visitorId = result.visitorId
  let v = visitorId.toUpperCase();
  let token = v.substring(v.length - 6).toUpperCase();
  // 设置token
  value.value = token;
  return token;
};

const getUUID =() => {
  return 'xxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
const getCookie =(name) => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2)
    return parts.pop().split(";").shift();
};
const setCookie = (name, value, hours) => {
  let exp = new Date();
  exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
  // ;path=/ cookie全站有效
  document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
};
const os =() => {
  let ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  }
};


</script>

<style>
#read-more-btn {
  border: none !important;
  text-decoration: none;
  background: #3eaf7c !important;
}

#read-more-btn {
  color: #fff !important;
  transition: all .5s ease;
}

#read-more-btn:hover {
  background: #de3636 !important;
}

.lock {
  position: relative;
  overflow: hidden;
  padding-bottom: 30px;
}
</style>

