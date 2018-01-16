Special effects should be added to effects.js in the format:

```js
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
        html: '<span>custom html here</span>',
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
```
