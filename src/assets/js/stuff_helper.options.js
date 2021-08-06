(function (document, chrome) {

    var options = {

        settings: {
            remove_all: {
                type: 'checkbox',
                default: true
            },
            remove_adds: {
                type: 'checkbox',
                default: true
            },
            // remove_paid_content: {
            //     type: 'checkbox',
            //     default: true
            // },
            hide_begging_panels: {
                type: 'checkbox',
                default: true
            },
            remove_share_icons: {
                type: 'checkbox',
                default: true
            },
            remove_story_images: {
                type: 'checkbox',
                default: true
            },
            full_width_story: {
                type: 'checkbox',
                default: true
            }
        },

        save_options: function () {
            var data = {}
            for (let setting in options.settings) {
                if (!options.settings.hasOwnProperty(setting)) {
                    continue
                }
                if (options.settings[setting].type === 'checkbox') {
                    data[setting] = document.getElementById(setting).checked
                }
                if (options.settings[setting].type === 'text') {
                    data[setting] = document.getElementById(setting).value
                }
            }
            chrome.storage.sync.set(
                data,
                function () {
                    var status = document.getElementById('status')
                    status.textContent = 'Options saved.'
                    setTimeout(
                        function () {
                            status.textContent = ''
                        },
                        750
                    )
                }
            )
        },

        get_default_settings: function () {
            var data = {}
            for (let setting in options.settings) {
                data[setting] = options.settings[setting].default
            }
            return data
        },

        restore_options: function () {
            chrome.storage.sync.get(
                options.get_default_settings(),
                function (items) {
                    for (let setting in items) {
                        if (options.settings[setting].type === 'checkbox') {
                            document.getElementById(setting).checked = items[setting]
                        }
                        if (options.settings[setting].type === 'text') {
                            document.getElementById(setting).value = items[setting]
                        }
                    }
                }
            )
        },

        all_options: function () {
            var checkedStatus = document.getElementById('remove_all').checked
            for (let setting in options.settings) {
                document.getElementById(setting).checked = checkedStatus
            }
        },

        init: function () {
            document.addEventListener('DOMContentLoaded', options.restore_options)
            document.getElementById('save').addEventListener('click', options.save_options)
            document.getElementById('remove_all').addEventListener('click', options.all_options)
        }

    }

    options.init()

}(document, chrome))
