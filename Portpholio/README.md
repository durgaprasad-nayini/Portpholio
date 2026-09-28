# Durga Portfolio

A modern static personal developer portfolio for Durga, a student interested in web development, gaming, FiveM/QBCore development, cloud technologies and content creation.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript

## Features

- Responsive dark developer/gaming-inspired design
- Glass-style cards, grid background and cyan/purple accents
- Multi-page navigation
- Mobile navigation menu
- Scroll reveal animations and animated learning-milestone counters
- Self-assessment skill bars
- Project category filtering
- Project details modal with ESC and outside-click closing
- Contact form validation without a backend
- Reduced-motion accessibility support
- Semantic markup, labels, focus states and SEO metadata

## How to Run

1. Open the `Portpholio` folder in VS Code.
2. Open `index.html` directly in a browser, or install the Live Server VS Code extension.
3. Right-click `index.html` and choose **Open with Live Server**.

The site uses no build step and works as a static folder.

## Customization

- **Name and copy:** edit the headings and paragraphs in `index.html`, `about.html`, `projects.html` and `contact.html`.
- **Profile photo:** add a real image at `assets/images/profile.jpg`, then replace the `.profile-placeholder` block in `index.html` with an `<img>` element.
- **Social links:** replace the `href="#"` values in the footer and contact cards with your real GitHub, LinkedIn, YouTube, Instagram and Discord URLs.
- **Projects:** edit the project cards in `projects.html`. Keep `data-category`, `data-title`, `data-description`, `data-tech` and `data-features` so the filter and modal continue working.
- **Skills:** edit the skill groups and each `--skill` percentage in `about.html`.
- **Colors:** update the CSS variables at the top of `css/style.css`.
- **Email:** change the placeholder email in `contact.html` and connect the form handler in `js/script.js` to an email service or backend when ready.

## GitHub Pages Deployment

1. Create a GitHub repository and upload the contents of this folder.
2. Open the repository's **Settings** and select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the main branch and the root folder, then save.
5. GitHub will provide the published Pages URL after deployment.

This portfolio presents personal and student learning milestones. The numbers and skill bars are not official employment statistics or certifications.
