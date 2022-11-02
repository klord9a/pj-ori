
jQuery(document).ready(function () {
    $('.listItem .--item button [data-bs-toggle="pill"]').on('click', event => { window.location.assign(event.target.getAttribute('href')) });
    setTimeout(function () {
        $('.loadingPage').addClass('unactive');
    }, 1500);
    $('#menu-menu-chinh li').addClass('itemmenu px-2 py-2');
    $('header .--inner .mobi').click(function () {
        $('header, header .--inner .mobi .close, header .fa-bars').toggleClass('active');
    })
    $('#menu-menu-chinh .itemmenu a').each(function (i, item) {
        var originUrl = window.location.origin + '/';
        var url = window.location.href;
        var href = $(item).attr("href");
        var isActive = url.indexOf(href);

        if (href === originUrl) {
            if (href === url) {
                $(this).addClass('active');
                return false;
            }
        } else {
            if (isActive > -1) {
                $(this).addClass('active');
            }
        }

        // if (href === url && href === originUrl) {
        //     $(this).addClass('active');
        //     return false;
        // } else {
        //     if (isActive > -1) {
        //         $(this).addClass('active');
        //     }
        // }
    });

    setTimeout(function () {
        $('.mainmenu').addClass('active');
    }, 1500);

    // if (!anchors || !navigationTooltips) {
    //     var anchors = ['1', '2', '3', '4', '5', '6', '7'];
    //     var navigationTooltips = ['The OriGarden', 'Video dự án', 'Tổng quan', 'Chủ đầu tư', 'Vị trí', 'Tiện ích', 'Mặt bằng tầng điển hình']
    // }
    function onLeaveCB(origin, destination, direction) {
        origin.item.classList.add(direction);
        destination.item.classList.remove('up');
        destination.item.classList.remove('down');
    }

    var fullpage_options = {
        navigation: true,
        fixedElements: '.decorpartKV',
        anchors: anchors,
        navigationTooltips: navigationTooltips,
        showActiveTooltip: false,
        // normalScrollElements: '#footerCopyright',
        scrollingSpeed: 1200,
        css3: true,
        // $.fn.fullpage.setMouseWheelScrolling(false);
        onLeave: onLeaveCB
    };

    if (jQuery(window).width() >= 769) {
        $('#fullpage').fullpage(fullpage_options);
        $('.nextfame').click(function (e) {
            e.preventDefault();
            $.fn.fullpage.moveSectionDown();
        });
    } else {
        $('.section').addClass('fp-completely');
    }
    // utility effect
    $(".utilPremises  .list-marker .number").mouseover(function () {
        var utiId = $(this).data('id');
        console.log(utiId);
        $('.utilPremises li').each(function (id, item) {
            $(item).data('item') == utiId ? $(item).addClass('active') : $(item).removeClass('active');
        });
    });
    $(".utilPremises li").mouseover(function () {
        var utiId2 = $(this).data('item');
        console.log(utiId2);
        $('.utilPremises  .list-marker .number, .utilPremises li').each(function (index, id) {
            $(id).data('id') == utiId2 ? $(id).addClass('active') : $(id).removeClass('active');
        });
    });
   $('.list-marker .number').mouseover(function(){
    $('.utilPremises  .list-marker .number').removeClass('active');
   });

    $('body').delegate('.projBanner .--marker span', 'mouseover', function () {
        var utiId2 = $(this).data('idd');
        console.log(utiId2);
        $('.markerCT ul').each(function (id, itemm) {
            $(itemm).data('itemm') == utiId2 ? $(itemm).addClass('active') : $(itemm).removeClass('active');
        });
    });
    // popupproject
    $('body').delegate('.mapspro polygon', 'click', function () {
        var indexpopUp = $(this).data('shape-title');
        console.log(indexpopUp);
        $('.proPopup').each(function (id, item) {
            $(item).data('item') == indexpopUp ? $(item).addClass('active') : $(item).removeClass('active');
        });
    });
    $('.proPopup .--content i').click(function () {
        $('.proPopup').removeClass('active');
    });
    // link tan project
    $('.markerCT a').on('click', function () {
        var target = $(this).data('target');
        // var TriggerEl = $(`[data-bs-target="${target}"]`);
        var firstTabEl = document.querySelector(`[data-bs-target="${target}"]`);
        var tab = new bootstrap.Tab(firstTabEl)
        
        tab.show()
        console.log(firstTabEl);
    });
    $('.itemNews .--title').click(function(){
        $('#news .--content').addClass('hidden');
        $('#news .--content').css("opacity","0");
    });
    $('.btn-close').click(function(){
        $('#news .--content').addClass('show');
        $('#news .--content').css("opacity","1");
    });

    Fancybox.bind('.--imgground img:nth-child(1)');
    Fancybox.bind('.modal-content img');
    // Fancybox.bind("[data-fancybox]");
    // Fancybox.bind(".flickity-slider a");
    
    // <!-- submit form sheet -->
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzVzAD37ul6SP5Oq2X-nazjluT7zyL1m6s_V22PnuetqRT6V0iyzyQTSU1T3iBdLf5h/exec'
    const chaty = document.querySelector('#chaty-ajax-contact-form-0');
    const chaty_inputs = document.querySelector('.chaty-contact-inputs');
    var successmsg = null;
    chaty.addEventListener('submit', e => {
        successmsg = createElementFromHTML('<div class="chaty-ajax-message" style="text-align: center;"></div>');
        chaty_inputs.appendChild(successmsg);
        e.preventDefault();
        sendForm(chaty, successmsg);
        return true;
    });
    const form = document.forms['submit-to-google-sheet'];
    if (form == undefined) {
        return;
    }
    successmsg=document.querySelector(".wpcf7-response-output");
    // const errormsg=document.getElementById('errormsg');
    form.addEventListener('submit', e => {
        e.preventDefault();
        sendForm(form, successmsg);
        return true;
    });

    function sendForm(form, successmsg) {
        successmsg.style.display ='block',
        successmsg.textContent = "Đang gửi...",
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then((response) => {
            // console.log('Success!', response);
            //show success message
            if (!response.ok) {
                form.setAttribute('class', 'failed'),
                successmsg.setAttribute('class', 'chaty-ajax-error-message'),
                successmsg.textContent = "Có lỗi! Vui lòng thử lại.";
                return;
            }
            form.setAttribute('class', 'sent'),
            successmsg.setAttribute('class', 'chaty-ajax-success-message'),
            successmsg.textContent = "Cảm ơn! Tin nhắn bạn đã được gửi."
        })
        .catch(error => 
            form.setAttribute('class', 'failed'),
            //successmsg.textContent = "Có lỗi! Vui lòng thử lại."
            )
        //show error message
        // form.reset();
    }

    //<div class="chaty-ajax-success-message">Cảm ơn! Chúng tôi sẽ liên hệ lại.</div>
    function createElementFromHTML(htmlString) {
      var div = document.createElement('div');
      div.innerHTML = htmlString.trim();

      // Change this to div.childNodes to support multiple top-level nodes.
      return div.firstChild;
    }

});

