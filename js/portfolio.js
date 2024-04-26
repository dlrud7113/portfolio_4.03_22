// 페이지가 로드될 때 실행되는 이벤트 핸들러
document.addEventListener('DOMContentLoaded', function () {
  // 모든 섹션과 내비게이션 링크를 선택
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav li a');
  // 현재 활성화된 섹션의 인덱스를 저장하는 변수
  let currentSectionIndex = 0;
  // 스크롤 중인지 여부를 나타내는 변수
  let scrolling = false;
  // 다음 섹션으로 스크롤하는 함수
  function scrollToNextSection() {
    scrolling = true;
    currentSectionIndex++;
    if (currentSectionIndex >= sections.length) {
      currentSectionIndex = 0;
    }
    // 다음 섹션으로 스무스하게 스크롤
    sections[currentSectionIndex].scrollIntoView({
      behavior: 'smooth'
    });
  }

  // 이전 섹션으로 스크롤하는 함수
  function scrollToPreviousSection() {
    scrolling = true;
    currentSectionIndex--;
    if (currentSectionIndex < 0) {
      currentSectionIndex = sections.length - 1;
    }
    // 이전 섹션으로 스무스하게 스크롤
    sections[currentSectionIndex].scrollIntoView({
      behavior: 'smooth'
    });
  }

  // 마우스 휠 스크롤 이벤트 리스너
  document.addEventListener('wheel', function (event) {
    event.preventDefault(); // 기본 스크롤 동작 방지
    if (!scrolling) { // 스크롤 중이 아닌 경우에만 실행
      if (event.deltaY > 0) { // 마우스 휠이 아래로 스크롤될 때
        if (currentSectionIndex === sections.length - 1) {
          // 현재 섹션이 마지막 섹션인 경우 스크롤 이벤트 무시
          return;
        }
        scrollToNextSection(); // 다음 섹션으로 스크롤
      } else { // 마우스 휠이 위로 스크롤될 때
        scrollToPreviousSection(); // 이전 섹션으로 스크롤
      }
      // 스크롤 후 1초 후에 다시 스크롤 가능하도록 설정
      setTimeout(function () {
        scrolling = false;
      }, 1000);
    }
  }); // 내비게이션 링크에 클릭 이벤트 리스너 추가
  navLinks.forEach(function (link, index) {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // 링크 기본 동작 방지
      scrollToSection(index); // 해당 섹션으로 스크롤
    });
  });

  // 섹션으로 스크롤하는 함수
  function scrollToSection(index) {
    scrolling = true;
    // 해당 섹션으로 스무스하게 스크롤
    sections[index].scrollIntoView({
      behavior: 'smooth'
    });
    // 현재 활성화된 섹션 인덱스 업데이트
    currentSectionIndex = index;
    // 스크롤 후 1초 후에 다시 스크롤 가능하도록 설정
    setTimeout(function () {
      scrolling = false;
    }, 1000);
    activateNavLink(index); // 활성 내비게이션 링크 클래스 추가
  }

  // 활성 내비게이션 링크 설정 함수
  function activateNavLink(index) {
    navLinks.forEach(function (link, i) {
      if (i === index) {
        link.classList.add('active'); // 선택된 링크에 활성 클래스 추가
      } else {
        link.classList.remove('active'); // 선택되지 않은 링크의 활성 클래스 제거
      }
    });
  }

  // 스크롤 이벤트 리스너
  window.addEventListener('scroll', function () {
    let currentSection = 0;
    let minDistance = Math.abs(window.scrollY - sections[0].offsetTop);
    // 모든 섹션에 대해 반복하여 가장 가까운 섹션을 찾음
    sections.forEach(function (section, index) {
      const distance = Math.abs(window.scrollY - section.offsetTop);
      if (distance < minDistance) {
        minDistance = distance;
        currentSection = index;
      }
    });
    activateNavLink(currentSection); // 현재 활성화된 섹션에 해당하는 내비게이션 링크 활성화
  });

  // "고투탑" 버튼 클릭 이벤트 리스너
  const goToTopButton = document.getElementById('goToTop');
  goToTopButton.addEventListener('click', function () {
    scrolling = true;
    // 페이지 맨 위로 스무스하게 스크롤
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(function () {
      scrolling = false;
    }, 1000); // 스크롤 후 1초 후에 다시 스크롤 가능하도록 설정
  });

});

//banner 영역
 // 요소와 초기 위치 설정
let container = document.getElementById('container');
let position = 0;

 // 이동 함수
function moveText() {
// 현재 위치를 왼쪽으로 1px씩 이동
position -= 1;

// 요소의 위치 업데이트
container.style.left = position + 'px';

// 요소의 너비를 벗어나면 초기 위치로 이동
if (position <= -container.offsetWidth) {
position = window.innerWidth;
}

// 이동 함수 반복 호출
requestAnimationFrame(moveText);
}
// 초기 호출
moveText();


//-----------------------------intro
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml10 .main_letter');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml10 .letter',
    rotateY: [-100, 0],
    duration: 4000,
    delay: (el, i) => 30 * i
  }).add({
    targets: '.ml10',
    opacity: 0,
    duration: 5000,
    easing: "easeOutExpo",
    delay: 3500
  });


//--------------------------------------------about
const bubble_text = document.querySelectorAll('.bubble > h6');
//const bubble_warp = document.querySelector('.bubble_wrap');
const About_text = document.querySelector('.About_text');

const observer_about = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 어바웃화면에 들어옴
        entry.target.classList.add("bubble");
        //About_text.classList.add("About_text_ani");
        console.log('어바웃 화면들어옴');
      } else {
        // 어바웃화면에서 나감
        entry.target.classList.remove("bubble");
       // bubble_warp.style.display='none';
      }
    });
  },
  // 화면에서 해당 요소가 10% 이상 보일 경우 화면에 들어온 것으로 판단함
  { threshold: 0.01}
);
  const targetElements02 = document.querySelectorAll(".bubble");
  targetElements02.forEach((element02) => {
    observer_about.observe(element02);
  });

  let lastScrollTop = 0;

  // 스크롤 이벤트를 감지하여 애니메이션을 일시 중지합니다.
  window.addEventListener('scroll', function() {
    const st = window.scrollY;
    const bubbles = document.querySelectorAll('.bubble');
    
    if (st > lastScrollTop){
      // 스크롤 다운 중
      bubbles.forEach(bubble => {
        bubble.classList.add('paused');
      });
    } else {
      // 스크롤 업 중
      bubbles.forEach(bubble => {
        bubble.classList.remove('paused');
      });
    }
    lastScrollTop = st <= 0 ? 0 : st; // 페이지 상단에 도달하면 스크롤 위치 초기화
  });




//------------------------------------------------mainProject
//-----모니터 왼>오
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 화면에 들어옴
        entry.target.classList.add("fade-in");
        console.log('메인 화면들어옴');
      } 
    });
  },
  // 화면에서 해당 요소가 10% 이상 보일 경우 화면에 들어온 것으로 판단함
  { threshold: 0.1 }
);
   // 관찰 대상 설정
  const targetElements = document.querySelectorAll(".desktop_Wrap");
  targetElements.forEach((element) => {
  observer.observe(element);
    });

    //----글자 올라옴
    const observer01 = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-Text");
            console.log('메인 화면들어옴');
          } else {
            // 화면에서 나감
            entry.target.classList.remove("fade-in-Text");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // 관찰 대상 설정
    const targetElements01 = document.querySelectorAll(".MainPro_text");
    targetElements01.forEach((element01) => {
      observer01.observe(element01);
      });


//---------------------------------------sideProject
//sideProject 슬라이드이벤트
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  autoplay: {delay: 1500},
  resistance : false,
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  grid: {
    fill: "column",
    row: 2, //몇 행으로
  },
  breakpoints:{
    390:{
        slidesPerView:1,
        grid: {
        rows: 2,
        }
      },
    900:{
        slidesPerView:3
      },
    1180:{
        slidesPerView:5
      },
  }
  
});


//sideProject 마우스 오버 이벤트
let sidebox = document.querySelectorAll('.swiper-slide');
let sidehover = document.querySelectorAll('.boxhover');
let btn=document.querySelectorAll('.ani_btn');
console.log(sidebox,sidehover);

for(let i = 0; i < sidebox.length; i++){
  sidebox[i].addEventListener('mouseover',function(){
    sidehover[i].style.opacity ='1';
    btn[i].style.opacity='0';
    console.log('마우스오버');
  })
  sidebox[i].addEventListener('mouseout',function(){
    sidehover[i].style.opacity ='0';
    btn[i].style.opacity='1';
  })
};

//마우스 오버하면 슬라이드 멈춤
for(let a of sidebox){
  a.addEventListener('mouseover',function(){
    swiper.autoplay.stop();
  });
  a.addEventListener('mouseout', function(){
    swiper.autoplay.start();
  });
};


//-------------------contact

let letter_btn = document.querySelector('#letter_btn');

letter_btn.addEventListener('click',function(){
  letter_btn.classList.add(btn_ani);
})