# EvoFrog - Meme Coin Website

A fun, animated, and engaging website for the EvoFrog ($EVF) meme coin project based on the evolution theme from Froakie to Greninja.

## Features

- Responsive design for all device sizes
- Advanced animations using GSAP
- Interactive evolution timeline
- Custom cursor effects
- Tokenomics visualization with Chart.js
- Parallax scrolling effects
- Video showcase section
- Community links and social integrations

## Project Structure

```
evofrog/
├── assets/
│   ├── logo.png
│   ├── froakie.png
│   ├── frogadier.png
│   ├── greninja.png
│   ├── hero-bg.png
│   ├── about-image.png
│   ├── pattern-bg.png
│   ├── froakie-card.png
│   ├── frogadier-card.png
│   ├── greninja-card.png
│   ├── video-thumbnail.png
│   ├── evofrog-video.mp4
│   ├── parallax-1.png
│   ├── parallax-2.png
│   └── parallax-3.png
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── index.html
└── README.md
```

## Setup Instructions

1. Clone the repository
2. Add all required images to the `assets` folder
3. Replace placeholder content with your actual content
4. Update community links in the HTML file

## External Libraries Used

- [GSAP](https://greensock.com/gsap/) - For advanced animations
- [Chart.js](https://www.chartjs.org/) - For the tokenomics chart
- [Font Awesome](https://fontawesome.com/) - For icons

## Customization

### Colors

The main color scheme can be adjusted in the CSS variables at the top of `css/styles.css`:

```css
:root {
    --primary-blue: #1e88e5;
    --secondary-blue: #0d47a1;
    --accent-pink: #ff4081;
    /* other variables */
}
```

### Social Links

Update the social links in the community section of `index.html`:

```html
<div class="social-links">
    <a href="YOUR_TELEGRAM_LINK" class="social-link" id="telegram">
        <i class="fab fa-telegram"></i>
        <span>Telegram</span>
    </a>
    <!-- other links -->
</div>
```

## Browser Compatibility

This website is compatible with all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open-source and available under the MIT License.

## Credits

- Designed & developed for the EvoFrog community
- Inspired by the Pokémon evolution theme 