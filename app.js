// We've added a third and final item to our tab panel - scroll down to see it
Ext.application({
    name: 'Sencha',

    launch: function() {
        Ext.create("Ext.tab.Panel", {
            fullscreen: true,
            tabBarPosition: 'bottom',

            items: [
                {
                    title: 'Start',
                    iconCls: 'home',
                    cls: 'home',
                    html: [
                        '<img height=100% src="http://staging.sencha.com/img/sencha.png" />',
                        '<h1>Herzlich Willkommen</h1>',
                        "<p>Dies ist mein erstes Sencha Touch - Projekt. Sieh Dich ruhig etwas um.</p>",
                    ].join("")
                },
                {
                    xtype: 'nestedlist',
                    title: 'News',
                    iconCls: 'star',
                    displayField: 'title',

                    store: {
                        type: 'tree',

                        fields: [
                            'title', 'link', 'author', 'contentSnippet', 'content',
                            {name: 'leaf', defaultValue: true}
                        ],

                        root: {
                            leaf: false
                        },

                        proxy: {
                            type: 'jsonp',
                            url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/stadt-bremerhaven/dqXM',
                            reader: {
                                type: 'json',
                                rootProperty: 'responseData.feed.entries'
                            }
                        }
                    },

                    detailCard: {
                        xtype: 'panel',
                        scrollable: true,
                        styleHtmlContent: true
                    },

                    listeners: {
                        itemtap: function(nestedList, list, index, element, post) {
                            this.getDetailCard().setHtml(post.get('content'));
                        }
                    }
                },
                // this is the new item
                {
                    title: 'Kontakt',
                    iconCls: 'user',
                    xtype: 'formpanel',
                    url: 'contact.php',
                    layout: 'vbox',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Kontakt',
                            instructions: '(Die Angabe der E-Mail-Adresse ist freiwillig!)',
                            height: 285,
                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Name'
                                },
                                {
                                    xtype: 'emailfield',
                                    label: 'E-Mail'
                                },
                                {
                                    xtype: 'textareafield',
                                    label: 'Mitteilung'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Abschicken',
                            ui: 'confirm',
                            handler: function() {
                                this.up('formpanel').submit();
                            }
                        }
                    ]
                },
            ]
        });
    }
});
