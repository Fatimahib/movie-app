// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],  
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // For backdrop blur
      // backdropBlur: {
      //   sm: '4px',
      //   colors: {

      //     "gray-dark-main": "#23242A",
      //     "gray-dark-second": "#28292D",
      //     "gray-light": "#D3DCE6",
      //     "red-main": "#FF4B45",


      //     // primary: {
      //     //   light: '#ffffff', // White background
      //     //   dark: '#23242A', 
            
      
      //     // },

      
      //   },
      // },

      // colors: {
      //   'custom-blue': '#080F36',
      // },

      colors: {
        // Define your custom colors here
        'gray-dark-main': '#23242A',
        'gray-dark-second': '#28292D',
        'gray-light': '#D3DCE6',
        'red-main': '#FF4B45',
        'custom-blue': '#080F36',
      },

      

      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },

    },
  },
  
  plugins: [
    // For line clamping
    require('@tailwindcss/line-clamp'),
  ],
}