/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         'light-pink': '#ffcbcb',
         'pink' : '#ffb5b5',
         'light-blue' : '#407088',
         'blue' : '#132743',
         'dark-blue' : ' #00204a'

      },
      backgroundImage: (theme) => ({
        'gradient-grey':'linear-gradient(109.6deg, rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%)',
        'home-page':"url('./assets/home-page.png')"
      }),
      fontFamily: {
        dmsans : ["DM Sans", "sant-serif"],
        montserrat: ["Montserrat", "sant-serif"]
      },
      content: {
         'Aerial_Hoop':"url('./assets/Aerial_Hoop.jpg')",
          'Aerial_Silks':"url('./assets/Aerial_Silks.webp')",
          'Aerial_Silks_kids':"url('./assets/Aerial_Silks_kids.jpg')",
          'Aerial_Yoga':"url('./assets/Aerial_Yoga.webp')",
          'Yoga':"url('./assets/Yoga.webp')",
          'Yoga_pregnancy':"url('./assets/Yoga_pregnancy.webp')",
          'Stretching':"url('./assets/Stretching.jpg')"

      }
    },
    screens: {
      xs: "480px",
      sm: "76px",
      md: "1060px"
    }
  },
  plugins: [],
}