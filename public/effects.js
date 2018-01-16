window.__SPECIAL_EFFECTS__ = [
  {
    name: 'johnCena',
    track: '/john-cena-theme.ogg',
    crossFade: 200,
    effectStart: function(duration) {
      return duration - 850;
    },
    useEffect: function(number, minimum, maximum) {
      return minimum === 420 && maximum === 1337;
    },
    injectHtml: function(duration) {
      return duration;
    },
    html:
      '<style>@keyframes cena {\n      0% {\n        transform: translateX(-20px) scale(1);\n      }\n      50% {\n        transform: translateX(20px) scale(1.05);\n      }\n      100% {\n        transform: translateX(-20px) scale(1);\n      }\n    }\n\n    .img-cena {\n      animation: cena;\n      animation-duration: 0.1s;\n      animation-play-state: running;\n      animation-iteration-count: infinite;\n    }\n</style>\n<img\n  class="img-fluid rounded img-cena"\n  alt="John Cena"\n  src="http://i0.kym-cdn.com/photos/images/newsfeed/001/015/752/a14.jpg"\n/>\n',
  },
  {
    name: 'snoopDogg',
    track: '/snoop-d.ogg',
    crossFade: 100,
    effectStart: function(duration) {
      return duration - 950;
    },
    useEffect: function(number, minimum, maximum) {
      return number === 420;
    },
  },
];
