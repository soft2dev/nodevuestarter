module.exports = {
    "extends": [
        "aqua/vue",
        "aqua/node",
        "@vue/typescript"
    ],
    "rules": {
        "vue/component-name-in-template-casing": "off",
        "vue/max-attributes-per-line": [
            "error",
            {
                "singleline": 5,
                "multiline": {
                    "max": 1,
                    "allowFirstLine": false
                }
            }
        ],
        "vue/html-closing-bracket-newline": [
            "error",
            {
                "singleline": "never",
                "multiline": "never"
            }
        ],
        "vue/html-closing-bracket-spacing": "error",
        "vue/html-indent": [
            "error",
            4
        ],
        "vue/attribute-hyphenation": 0,
        "vue/no-v-html": "off",
        "max-statements-per-line": 2,
        "quote-props": 0,
        "no-alert": 0,
        "prefer-destructuring": 0,
        "indent": [
            "error",
            4
        ],
        "semi": [
            "error",
            "never"
        ]        
    }
};