/* global $ */

stuff_helper = (function (stuff_helper, document) {

    var addTimer

    stuff_helper.cleanup = {

        removeAddsTimer: function () {
            console.log('removeAddsTimer')
            addTimer = setInterval (stuff_helper.cleanup.removeAdds, 5000)
        },

        removeAdds: function () {
            let add
            let count = 0;
            [                
                'app-basic-ad-unit',
                '.sics-component__ad-space',
                '.display-ad--border-container',
                '.teads-inread',
                '.display-ad',
                '.ad',
                '#neighbourlyShowcasePlus',
                '#gutterleft',
                '#gutterright',
                '#pushdownbanner',
                '.article-offer',
                '.article__raw-html',
                '.email-boost'
            ].forEach(function (selector) {
                add = $(selector)
                count += add.length
                add.remove()
            })

            if (count == 0) {
                clearInterval(addTimer)
            } else {                
                console.log(count + ' adverts removed')
            }
        },

        removePaidContent: function () {
            console.log('removePaidContent')
            $('span:text("paid content")').css('color','red')
        },

        hideBeggingPanels: function () {
            const beg = $('.support-brief-container, .t0')
            console.log(beg.length + ' begging panels hidden')
            beg.hide()


            $('aside').remove()
            const premium = $('span:hidden, p:hidden')
            let content = ''
            premium.each(function (paragraph) { 
                content += $(this).text() + '<br><br>'
            })
            $('span.ellipsis').after('<p>' + content + '</p>')
        },

        removeShareIcons: function () {
            console.log('removeShareIcons')
            $('.sics-component__sharebar, .sics-component__masthead, .share-bar, .article__action-bar').hide()
        },

        removeStoryImages: function () {
            console.log('removeStoryImages')
            $('.sics-component__story-image, .sics-component__story-video, .sics-component__html-asset, .article-media__hero-wrapper').remove()
        },

        fullWidthStory: function () {
            console.log('fullWidthStory')
            $('.sics-component__story').css('margin', '0')
            $('article.article').css('display', 'inherit')
        },




        // removexxxActivitiesFromFeed: function () {
        //     $('div.enhanced-tag', 'div.activity')
        //         .filter(
        //             (idx, elem) => {
        //                 return null !== $(elem).text().match(/xxx/i)
        //             }
        //         )
        //         .parents('div.activity')
        //         .remove()
        // },

        // removeyyyActivitiesFromFeed: function () {
        //     $('div.sponsor', 'div.activity')
        //         .filter(function () {
        //             for (let image of $('img', $(this))) {
        //                 if ($(image).attr('alt').match(/yyy elemnt/i)) {
        //                     return true
        //                 }
        //             }
        //             return false
        //         })
        //         .parents('div.activity')
        //         .remove()
        // },

        // removewww: function () {
        //     $('.activity-map-tag:contains(www),.activity-map-tag:contains(eee)', '.feed')
        //         .parents('div.activity')
        //         .remove()
        // },

        cleanup: function () {
            chrome.storage.sync.get(
                null,
                function (items) {
                    if (items.remove_all !== false) {
                        stuff_helper.cleanup.removeAddsTimer()
                        // stuff_helper.cleanup.removePaidContent()
                        stuff_helper.cleanup.hideBeggingPanels()
                        stuff_helper.cleanup.removeShareIcons()
                        stuff_helper.cleanup.removeStoryImages()
                        stuff_helper.cleanup.fullWidthStory()
                    } else {
                        if (items.remove_adds !== false) {
                            stuff_helper.cleanup.removeAddsTimer()
                        }
                        // if (items.remove_paid_content !== false) {
                        //     stuff_helper.cleanup.removePaidContent()
                        // }
                        if (items.hide_begging_panels !== false) {
                            stuff_helper.cleanup.hideBeggingPanels()
                        }
                        if (items.remove_share_icons !== false) {
                            stuff_helper.cleanup.removeShareIcons()
                        }
                        if (items.remove_story_images !== false) {
                            stuff_helper.cleanup.removeStoryImages()
                        }
                        if (items.full_width_story !== false) {
                            stuff_helper.cleanup.fullWidthStory()
                        }
                    }
                }
            )
        },

        init: function () {
            stuff_helper.cleanup.cleanup()
        }
    }

    stuff_helper.cleanup.init()

    return stuff_helper

}(stuff_helper, document))
