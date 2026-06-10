/* Mobile menu burger toggle */
(function () {
    const navigation = document.querySelector('.gh-navigation');
    const burger = navigation.querySelector('.gh-burger');
    if (!burger) return;

    burger.addEventListener('click', function () {
        if (!navigation.classList.contains('is-open')) {
            navigation.classList.add('is-open');
            document.documentElement.style.overflowY = 'hidden';
        } else {
            navigation.classList.remove('is-open');
            document.documentElement.style.overflowY = null;
        }
    });
})();

/* Add lightbox to gallery images */
(function () {
    lightbox(
        '.kg-image-card > .kg-image[width][height], .kg-gallery-image > img'
    );
})();

/* Responsive video in post content */
(function () {
    const sources = [
        '.gh-content iframe[src*="youtube.com"]',
        '.gh-content iframe[src*="youtube-nocookie.com"]',
        '.gh-content iframe[src*="player.vimeo.com"]',
        '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
        '.gh-content object',
        '.gh-content embed',
    ];
    reframe(document.querySelectorAll(sources.join(',')));
})();

/* Turn the main nav into dropdown menu when there are more than 5 menu items */
(function () {
    dropdown();
})();

/* Infinite scroll pagination */
(function () {
    if (!document.body.classList.contains('home-template') && !document.body.classList.contains('post-template')) {
        pagination();
    }
})();

/* Responsive HTML table */
(function () {
    const tables = document.querySelectorAll('.gh-content > table:not(.gist table)');
    
    tables.forEach(function (table) {
        const wrapper = document.createElement('div');
        wrapper.className = 'gh-table';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
})();

/* back to top button */
(function() {
    const scrollTopBtn = document.querySelector('.js-scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.onclick = () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
        
        const progressPath = document.querySelector('.progress-circle path');
        const pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
        const updateProgress = function() {
            const mainEl = document.getElementsByTagName('main')[0];
            const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            const mainTop = mainEl.getBoundingClientRect().top + window.scrollY
            const mainBottom = mainTop + mainEl.offsetHeight

            const scrollStart = mainTop;
            const scrollEnd = mainBottom - windowHeight;

            const scroll = window.scrollY || 0;

            const clampedScroll = Math.min(Math.max(scroll, scrollStart), scrollEnd)
            const progress = (clampedScroll - scrollStart) / (scrollEnd - scrollStart)
            progressPath.style.strokeDashoffset = pathLength - (progress * pathLength)
        }

        updateProgress();
        const offset = 100;

        window.addEventListener('scroll', function(event) {
            updateProgress();

            const scrollPos = window.scrollY || window.scrollTopBtn || document.getElementsByTagName('html')[0].scrollTopBtn;
            if(scrollPos > offset){
                scrollTopBtn.classList.add('is-active')
            } else {
                scrollTopBtn.classList.remove('is-active')    
            }

        }, false);
    }
})();

/* show/hide sticky nav on scoll */
(function () {
    const stickyHeader = document.querySelector('.hide-on-scroll')
    if(stickyHeader){
        var prevScrollPosition = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollPosition = window.pageYOffset;
            // dont hide the header until the user has reached the main content
            const mainContentPosition = document.getElementsByTagName('main')[0].getBoundingClientRect().top
            if(mainContentPosition > 150) return;
            if(prevScrollPosition > currentScrollPosition){
                stickyHeader.style.top = "0";
            } else {
                // dont move header up when in mobile. it hides the close button.
                if(stickyHeader.classList.contains("is-open")) return;
                stickyHeader.style.top = "-100px";
            }
            prevScrollPosition = currentScrollPosition;
        }
    } 
})();