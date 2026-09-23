---
version: alpha
name: Abheda Foundation
description: A community-focused nonprofit system with bright accents, clear hierarchy, and approachable editorial layouts.
colors:
  primary: "#FFE757"
  secondary: "#333333"
  tertiary: "#EF3F52"
  neutral: "#FFFFFF"
  surface: "#F8F6EE"
  on-surface: "#1F2937"
  border: "#E5E7EB"
  shadow: "#AAAAAA"
  error: "#D92D20"
typography:
  headline-display:
    fontFamily: "Open Sans"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0px"
  headline-lg:
    fontFamily: "Open Sans"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: "38px"
    letterSpacing: "0px"
  headline-md:
    fontFamily: "Open Sans"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: "31px"
    letterSpacing: "0px"
  headline-sm:
    fontFamily: "Helvetica Neue"
    fontSize: "21px"
    fontWeight: 300
    lineHeight: "31px"
    letterSpacing: "0px"
  body-lg:
    fontFamily: "Open Sans"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "0px"
  body-md:
    fontFamily: "Open Sans"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: "20px"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Open Sans"
    fontSize: "12px"
    fontWeight: 300
    lineHeight: "18px"
    letterSpacing: "0px"
  label-lg:
    fontFamily: "Open Sans"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: "20px"
    letterSpacing: "0px"
  label-md:
    fontFamily: "Open Sans"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: "18px"
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Open Sans"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: "16px"
    letterSpacing: "0px"
  caption:
    fontFamily: "Open Sans"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "18px"
    letterSpacing: "0px"
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 20px
  xl: 28px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 34px
  lg: 46px
  xl: 144px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.lg}"
    padding: "8px 35px"
    height: "41px"
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.lg}"
    padding: "8px 35px"
    height: "41px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "8px 35px"
    height: "41px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: "16px"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "12px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
---

# Abheda Foundation

## Overview
Abheda Foundation’s visual language feels warm, civic-minded, and optimistic, with a clear nonprofit tone rather than a glossy commercial one. The layout mixes editorial structure with promotional blocks, so it should read as approachable and trustworthy while still feeling active and community-driven. Dense information is balanced by large imagery, generous white space, and strong section breaks.

## Colors
- **Primary (#FFE757):** A bright sunflower yellow used for the most visible calls to action, highlights, and attention-grabbing accents. It gives the interface energy and warmth without feeling aggressive.
- **Secondary (#333333):** A deep charcoal used for main text, navigation, and body copy. It anchors the bright yellow and keeps the site readable and grounded.
- **Tertiary (#EF3F52):** A vivid coral-red used as the supporting action color, especially for button text and emphasis. It adds urgency and a human, charitable feel.
- **Neutral (#FFFFFF):** The clean white base for headers, cards, and open content areas. It keeps the site airy and makes imagery and accent colors stand out.
- **Surface (#F8F6EE):** A soft off-white background for section panels and content bands. It creates subtle warmth and separates content from pure white without heavy contrast.
- **On-surface (#1F2937):** A slightly cooler dark tone for text on light sections when a softer alternative to pure charcoal is needed.
- **Border (#E5E7EB):** A pale gray used for cards and subtle separators. It supports structure without drawing attention.
- **Shadow (#AAAAAA):** A neutral shadow tone used sparingly for depth in banners and cards. It should remain understated.
- **Error (#D92D20):** Reserved for validation and system error states. It should be used sparingly so it does not compete with the brand palette.

## Typography
Open Sans is the primary voice throughout the system, creating a clear and accessible nonprofit editorial feel. Headlines use bold weights for impact, while supporting headings may use lighter weights to preserve the airy, community-oriented tone seen in the screenshot. Body copy is compact and readable at 14px to 16px, with line heights tuned for scanability in content-heavy sections.

Headlines should stay straightforward and unembellished: no decorative casing, no dramatic tracking, and minimal letter spacing. Navigation and button labels should use bold, practical treatment so actions feel direct. Captions and supporting labels can be lighter in weight, but should remain legible against busy photography and pale surfaces.

## Layout
The site uses a wide, full-bleed presentation with large hero imagery spanning the viewport and content blocks stacked vertically below. Sections feel centered and expansive rather than constrained to a tight magazine column, with generous horizontal room and strong banded transitions. Spacing follows a simple rhythm, using 8px and 16px increments for dense UI and larger jumps of 34px, 46px, and 144px for section separation.

Content panels should rely on clear blocks, not complex grids. Use soft padded cards and distinct background bands to separate informational modules, especially where multiple feature summaries sit side by side. Large images should be allowed to dominate, while supporting text remains concise and well spaced.

## Elevation & Depth
The system is mostly flat, with hierarchy created through contrast, section bands, and image overlays rather than heavy material shadows. When depth is needed, it should be subtle and functional, such as a soft gray shadow under hero elements or a yellow glow on the primary button. Borders are light and thin, helping cards feel separated without becoming boxy.

Use tonal layering to divide information: white headers, pale surface sections, and darker announcement bars. Avoid thick neumorphic effects, glossy gradients, or pronounced floating shadows. The visual structure should feel clean and service-oriented, not skeuomorphic.

## Shapes
The corner language is soft and approachable, with modest rounding on cards and more pronounced rounding on primary actions. Buttons use pill-like curves to signal friendliness and urgency, while content cards stay closer to an 8px radius for restraint. Overall, the shape system should feel welcoming rather than sharp or overly geometric.

## Components
Buttons are the strongest recurring interface element. Primary buttons use the yellow `button-primary` treatment with coral text, rounded ends, and a fixed comfortable height around 41px. They should feel celebratory and highly visible, with a hover state that can invert toward coral for stronger contrast. Secondary buttons use transparent backgrounds, dark outlines or quiet text, and a smaller `rounded.sm` shape to stay functional. Link buttons should remain plain and unobtrusive, with no container chrome.

Cards should use the `card` token: white background, light border, modest padding, and no heavy shadow. They should frame content modules, feature summaries, and informational callouts without competing with the photographs and icons. Keep card interiors spacious enough for short headings and compact descriptions.

Inputs should mirror the card language with a simple white field, light border, and readable body typography. Keep focus states clear and accessible, but not flashy. Chips, tags, and small badges should use soft surface tones and fully rounded edges so they read as gentle filters or status markers.

Navigation should stay text-first, compact, and bold enough to read over changing backgrounds. Featured statistic or teaser blocks can combine icons with labels in a neat two-column rhythm, using the brand yellow and dark charcoal for contrast. Any banner or announcement strip should use a strong tonal band with minimal decoration and concise copy.

## Do's and Don'ts
- Do use bright yellow only for primary emphasis and key actions.
- Do keep text dark and highly readable over photos and pale surfaces.
- Do preserve generous spacing between major content bands.
- Do use Open Sans consistently for body, navigation, and buttons.
- Don't introduce heavy drop shadows or glossy 3D treatments.
- Don't replace the soft rounded button language with sharp rectangular controls.
- Don't crowd sections with dense multi-column layouts that reduce scanability.
- Don't use more than one competing accent color in a single action area.
