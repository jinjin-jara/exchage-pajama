/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Sans KR', 'Arial', 'sans-serif'], // Google Fonts 예제
        nunito: ['Nunito'], // 사용자 정의 폰트 예제
        gwangsu: ['Gwangsu']
      },
    },
  },
  plugins: [],
}

