///////////////////////////////////////////
//ハンバーガーメニュー
//////////////////////////////////////////
$('.hambager').on('click', function () {
  navOpen();
});
let navFlg = false;
function navOpen() {
  if (!navFlg) {
    $('.hamberger-wrap').addClass('is-ham-open');
    $('.mega-menu').addClass('is-megamenu-open');
    $('.header-inner').addClass('is-megamenu-icon');
    $('#header').addClass('is-megamenu-headfix');
    $('.ham-txt').text('閉じる');
    navFlg = true;
  } else {
    $('.hamberger-wrap').removeClass('is-ham-open');
    $('.mega-menu').removeClass('is-megamenu-open');
    $('.header-inner').removeClass('is-megamenu-icon');
    $('#header').removeClass('is-megamenu-headfix');
    $('.ham-txt').text('メニュー');
    navFlg = false;
  }
}


///////////////////////////////////////////
//ハンバーガーメニュー アコーディオン
///////////////////////////////////////////
$(document).ready(function() {
  $(".little-nav").hide();
  $(".nav01 .parent").on('click', function() {
    $(this).toggleClass('active');
    $(this).next('.little-nav').slideToggle(300);
  });
});


///////////////////////////////////////////
//スクロールフェードイン
///////////////////////////////////////////
const fadeIn = document.querySelectorAll(".fadeIn");
const options = {
  rootMargin: '0px',
  threshold: 0.6
};
const observer = new IntersectionObserver(showElement, options);
fadeIn.forEach((fadeIn) => {
  observer.observe(fadeIn);
});
function showElement(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}


///////////////////////////////////////////
//FAQ アコーディオン
///////////////////////////////////////////
$(".qa-list dd").hide();
$(".qa-list dl").on("click", function(e){
    $('dd',this).slideToggle('fast');
    if($(this).hasClass('open')){
        $(this).removeClass('open');
    }else{
        $(this).addClass('open');
    }
});


////////////////////////////////////////////////////////////////////////////////////////
//上にスクロールしたらヘッダーが出現する
////////////////////////////////////////////////////////////////////////////////////////
(function () {
  const header = document.getElementById("header"); // ヘッダーを取得
  const hH = header.clientHeight; // ヘッダーの高さを取得
  let lastScrollTop = 0; // 最後のスクロール位置を保持する変数
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop && currentScroll > hH) {
      // 下にスクロール
      header.classList.add('header--unpinned');
    } else {
      // 上にスクロール
      header.classList.remove('header--unpinned');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // ネガティブなスクロール値を防ぐ
  });
})();


//////////////////////////////////////////////////////////////////////////////
//各Swiperイベントの初期化
//////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', (event) => {

  //トップMVスライダー
  const swiper = new Swiper(".mv-swiper", {
    loop: true, // ループ
    speed: 2000, // 少しゆっくり(デフォルトは300)
    slidesPerView: 1, // 一度に表示する枚数
    spaceBetween: 40, // スライド間の距離
    centeredSlides: true, // アクティブなスライドを中央にする
    breakpoints: {
      769: {
        slidesPerView: 1.5,
        spaceBetween: 70,
      }
    },
    autoplay: {
      // 自動再生
      delay: 3000, // 1秒後に次のスライド
      disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
    },
    // ページネーション
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // 前後の矢印
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  //トップ　バナー無限スライダー
  const swiperBanner = new Swiper('.banner-slider', {
    slidesPerView: 1,
    spaceBetween: 20, // 画像間のスペース
    loop: true,
    autoplay: {
      delay: 0,             // delayを0にすることで連続的にスライドする
      disableOnInteraction: false,
    },
    speed: 10000,            // この値を調整して、スライドのスピードを変更する
    freeMode: true,
    freeModeMomentum: false, // フリック後のアニメーションを無効にする
    freeModeSticky: true,   // 無限ループ時にスライドがなめらかに連続して動くようにする
    breakpoints: {
      // スライドの表示枚数：700px以上の場合
      770: {
        spaceBetween: 20, // 画像間のスペース
        slidesPerView: 1.2,
      },
      // スライドの表示枚数：1000px以上の場合
      1000: {
        spaceBetween: 20, // 画像間のスペース
        slidesPerView: 1.2,
      },
      // スライドの表示枚数：1280px以上の場合
      1280: {
        spaceBetween: 40, // 画像間のスペース
        slidesPerView: 1.2,
      },
      // スライドの表示枚数：1900px以上の場合
      1900: {
        spaceBetween: 40, // 画像間のスペース
        slidesPerView: 1.5,
      }
    },
  });


  // //TOP　ランキングスライダー
  var rankingswiper; 
  $(window).on('load resize', function(){
      var w = $(window).width();
      if (w <= 1000) {
        if (rankingswiper) {
          return;
        } else {
          rankingswiper = new Swiper('.ranking-swiper', {
            autoplay: {
              delay: 3000,
            },
            scrollbar: {
              el: '.swiper-scrollbar', //要素指定
            },
            breakpoints: {
              360: {
                slidesPerView: 1.7,
                spaceBetween: 20,
              },
              769: {
                slidesPerView: 2,
                spaceBetween: 20,
              }
            },
          });
        }
      } else {
          if (rankingswiper) {
              rankingswiper.destroy();
              rankingswiper = undefined;
          } 
      } 
  });


});


////////////////////////////////////////////////////////////////////////////////////////
// 商品一覧の「さらに読み込む」
///////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
  // 初期表示アイテム数
  let itemsToShow = 10;
  const items = document.querySelectorAll('.item-card');
  const totalItems = items.length;
  let visibleItems = itemsToShow;

  // 最初に表示するアイテム数を制御
  items.forEach((item, index) => {
      if (index < itemsToShow) {
          item.style.display = 'block';
      } else {
          item.style.display = 'none';
      }
  });

  // 全てのアイテムが初めから表示されている場合は、ボタンを非表示にする
  if (totalItems <= itemsToShow) {
      document.getElementById('load-more').style.display = 'none';
  }

  // 「さらに表示する」ボタンのクリックイベント
  document.getElementById('load-more').addEventListener('click', function() {
      // 次のitemsToShow個のアイテムを表示する
      const nextToShow = visibleItems + itemsToShow;
      for(let i = visibleItems; i < nextToShow; i++) {
          if (i < totalItems) {
              items[i].style.display = 'block';
          }
      }
      visibleItems += itemsToShow;

      // もし全てのアイテムが表示されたら、ボタンを隠す
      if (visibleItems >= totalItems) {
          document.getElementById('load-more').style.display = 'none';
      }
  });
});


const els = document.querySelectorAll(".detail-bottom > .inner");

els.forEach((el) => {
  if (el.innerHTML === null || !el.innerHTML.match(/\S/g)) {
    el.classList.add("empty");
  }
})



////////////////////////////////////////////////////////////////////////////////////////
// GSAPアニメーション
///////////////////////////////////////////////////////////////////////////////////////
//テキストアニメ01
// document.querySelectorAll('.anime-ttl01').forEach(function(elem) {
//   gsap.to(elem.querySelectorAll('span'), {
//     y: 0,
//     stagger: 0.05,
//     duration: 0.5,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: elem,
//       start: 'top 80%'
//     }
//   });
// });
//テキストアニメ02
// document.querySelectorAll('.anime-ttl02').forEach(function(elem) {
//   gsap.to(elem.querySelectorAll('h2'), {
//     y: 0,
//     duration: 0.5,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: elem,
//       start: 'top 80%'
//     }
//   });
// });

//パララックス
// const Parallax = document.querySelectorAll('.anime-para');
// Parallax.forEach((Parallax) => {
//   gsap.fromTo(Parallax.querySelector('img'), {
//     yPercent: -25, 
//   }, {
//     yPercent: -50, 
//     ease: "none",
//     scrollTrigger: {
//       trigger: Parallax,
//       start: "top 70%",
//       end: "bottom top",
//       scrub: 1,
//     }
//   }); 
// });
// const Parallax02 = document.querySelectorAll('.anime-para02');
// Parallax02.forEach((Parallax02) => {
//   gsap.fromTo(Parallax02.querySelector('img'), {
//     yPercent: -20, //　元々の位置から
//   }, {
//     yPercent: 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: Parallax02,
//       start: "top 50%",
//       end: "bottom 20%",
//       scrub: 1,
//     }
//   }); 
// });