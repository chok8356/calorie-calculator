module.exports = {
  plugins: ['stylelint-scss', 'stylelint-order'],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-prettier"
  ],
  overrides: [
    {
      "files": [
        "**/*.scss"
      ],
      "customSyntax": "postcss-scss"
    },
    {
      "files": [
        "**/*.vue"
      ],
      "customSyntax": "postcss-html"
    }
  ],
  rules: {
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': null,
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
    'custom-property-pattern': null,
    'unit-no-unknown': [true, {
      ignoreUnits: ['/hsl/'],
    }],

  }
}
