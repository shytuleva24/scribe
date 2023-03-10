window.onload = () => {
    const homeMenuLinks = document.querySelectorAll(".scroll-to");
    const loaderBlock = document.querySelector('.se-pre-con');
    
    loaderBlock.style.opacity = '0'
    loaderBlock.style.transition = 'opacity .5s linear'
    setTimeout(function() {
        loaderBlock.remove()
    }, 500);
    function navMenuBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset >= 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)';
        } else {
            navbar.style.background = "transparent";
        }
    }
    
    
    if (homeMenuLinks.length > 0) {
        homeMenuLinks.forEach(link => {
            link.onclick = function (event) {
                event.preventDefault();
                onMenuLinkClick(this.getAttribute("href"));
                if (document.querySelector('.navbar-collapse').classList.contains('show')) {
                    document.querySelector('.navbar-collapse').classList.remove('show');
                }
            }
        });
    
        function onMenuLinkClick(href) {
            if (document.querySelector(href)) {
                const target = document.querySelector(href);
                let targetLocation = target.getBoundingClientRect().top + window.pageYOffset - 72;
                window.scrollTo({
                    top: targetLocation,
                    behavior: "smooth"
                });
            }
        }
    }
    window.addEventListener(`scroll`, navMenuBackground);
}

function createScrollListener(elementSelector, visibleCallback, hiddenCallback, threshold) {
    const element = elementSelector;

    function handleIntersection(entries) {
        if (entries[0].isIntersecting) {
            visibleCallback();
        } else {
            hiddenCallback();
        }
    }

    const options = {
        threshold: threshold || 0.3
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(element);
}

document.querySelectorAll('._anim-items').forEach(element => {
    createScrollListener(element, function () {
        element.classList.add(`_active`);
    }, function () {
        element.classList.remove(`_active`);
    }, 0.3);
});

