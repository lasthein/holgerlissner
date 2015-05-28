var doc = document,
    win = window;
function addClass(element, className) {
    var re = new RegExp("(^|\\s)" + className + "(?!\\S)");
    if (!re.test(element.className)) {
        element.className += " " + className;
    }
}

function removeClass(element, className) {
    var re = new RegExp("(?:^|\\s)" + className + "(?!\\S)", "g");
    element.className = element.className.replace(re, "");
}

function addEvent(element, event, handler) {
    if (element.addEventListener) {
        element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, handler);
    }
}

function attr(el, name, value) {
    if (typeof value !== "undefined") {
        el.setAttribute(name, value);
    } else {
        return el.getAttribute(name);
    }
}

function $(selector, parent) {
    return (parent || doc).querySelectorAll(selector);
}

function getElementRect(element) {
    var rect = element.getBoundingClientRect();
    return {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        // IE8 doesn't set width/height
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
    };
}

var nav = $(".mobil-navigation")[0];

addEvent(nav, "click", function(e) {
    if (e.srcElement.tagName === "BUTTON") {
        var sectionClass = e.srcElement.getAttribute("data-section");
        var sections = $(".mobil-section");
        for (var i=0;i<sections.length;i++) {
            removeClass(sections[i], "active");
        }
        var section = $(".mobil-section-" + sectionClass)[0];
        addClass(section, "active");


        var buttons = $(".mobil-navigation button");
        for (i=0;i<buttons.length;i++) {
            removeClass(buttons[i], "active");
        }
        addClass(e.srcElement, "active");

        win.scrollTo(0,0);
    }
});

var videonav = $(".video-navigation")[0];
addEvent(videonav, "click", function(e) {
    if (e.srcElement.tagName === "BUTTON") {
        var sectionClass = e.srcElement.getAttribute("data-section");
        var sections = $(".player-container");
        for (var i=0;i<sections.length;i++) {
            removeClass(sections[i], "active");
        }
        var section = $(".player-" + sectionClass)[0];
        addClass(section, "active");

        var buttons = $(".video-navigation button");
        for (i=0;i<buttons.length;i++) {
            removeClass(buttons[i], "active");
        }
        addClass(e.srcElement, "active");
    }
});


(function() {
    var hasScrolled = false;
    window.addEventListener("scroll", function(e) {
        hasScrolled = true;
    }, false);

    document.addEventListener("touchmove", function(e) {
        hasScrolled = true;
    }, false);

    document.addEventListener("touchstart", function(e) {
        hasScrolled = false;
    }, false);

    document.addEventListener("touchend", function(e) {
        if (!hasScrolled && e.srcElement.tagName === "BUTTON") {
            e.preventDefault();
            var event = new MouseEvent("click", e);
            e.srcElement.dispatchEvent(event);
        }
    }, false);

})();
