const navigationToggle=document.querySelector(".header__navigation-toggle"),navigationBody=document.querySelector(".header__navigation-list"),noJsElement=document.querySelector(".header__navigation--no-js"),onNavigationToggleClick=e=>{e.preventDefault(),navigationToggle.classList.toggle("header__navigation-toggle--close"),navigationBody.classList.toggle("header__navigation-list--opened")},initHeader=()=>{noJsElement.classList.remove("header__navigation--no-js"),navigationToggle.addEventListener("click",onNavigationToggleClick)};export{initHeader};