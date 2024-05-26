/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin( ( { matchUtilities, theme } ) => {
      matchUtilities(
        {
          "animation-delay": ( value ) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme( 'transitionDelay' ),
        }
      );
    }),
  ],
}

