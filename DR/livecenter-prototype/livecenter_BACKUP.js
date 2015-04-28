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

    var filterArea = $(".filter-area")[0];
    var filter = $(".filter-container")[0];
    var filterDummy = $(".filter-dummy")[0];
    var sidebarArea = $(".sidebar-area")[0];
    var sidebar = $(".sidebar-container")[0];
    var eventList = $(".event-list")[0];
    var eventItems = $("li", eventList);

    filter._isFixed = false;
    sidebar._isFixed = false;

    var listItemHeight = 40;
    var fixedTopMargin = 60;

    var blog = $(".blog-container")[0];

    var csstransforms = ("transform" in document.body.style);

    var viewportHeight, sidebarRect, filterRect, sidebarAreaRect, blogRect;

    function updateValues() {
        viewportHeight = doc.documentElement.clientHeight;
        sidebarRect = getElementRect(sidebar);
        filterRect = getElementRect(filterArea);
        sidebarAreaRect = getElementRect(sidebarArea);
        blogRect = getElementRect(blog);
    }

    function checkFixed(element, rect, dummy) {
        if (rect.top <= fixedTopMargin && !element._isFixed) {
            addClass(element, "fixed");
            element.style.width = rect.width + "px";
            element._isFixed = true;
            if (dummy) {
                dummy.style.display = "block";
            }
        } else if (rect.top > fixedTopMargin && element._isFixed) {
            removeClass(element, "fixed");
            element.style.width = "";
            element._isFixed = false;
            if (dummy) {
                dummy.style.display = "none";
            }
        }
    }

    function updateElements() {
        checkFixed(filter, filterRect, filterDummy);
        checkFixed(sidebar, sidebarAreaRect);
        

        if (blogRect.bottom < 100) {
            addClass(filter, "disable");
        } else {
            removeClass(filter, "disable");
        }

        if (sidebar._isFixed) {
            if (sidebarRect.height - blogRect.bottom > 0) {
                if (csstransforms) {
                    sidebar.style.transform = "translate(0, " + (blogRect.bottom - sidebarRect.height) + "px)";
                } else {
                    sidebar.style.top = "auto";
                    sidebar.style.bottom = (viewportHeight - blogRect.bottom) + "px";
                }
            } else {
                if (csstransforms) {
                    sidebar.style.transform = "translate(0, 0)";
                } else {
                    sidebar.style.top = "";
                    sidebar.style.bottom = "";
                }
            }
        }


    }

    function resize() {
        updateValues();
        var height = (viewportHeight - 540);
        var maxItems = Math.floor((height - 90) / listItemHeight);
        for (var i=0;i<eventItems.length;i++) {
            eventItems[i].style.display = maxItems <= i ? "none" : "";
        }
        updateElements();
    }

    function scroll() {
        updateValues();
        updateElements();
    }

    addEvent(window, "scroll", scroll);
    addEvent(window, "resize", resize);

    resize();
