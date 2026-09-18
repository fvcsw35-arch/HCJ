---
name: Etheric Calm
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#4d463e'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#7e766d'
  outline-variant: '#d0c5ba'
  surface-tint: '#6a5c4b'
  primary: '#6a5c4b'
  on-primary: '#ffffff'
  primary-container: '#fbe7d1'
  on-primary-container: '#756755'
  inverse-primary: '#d6c4af'
  secondary: '#4e616d'
  on-secondary: '#ffffff'
  secondary-container: '#d1e5f3'
  on-secondary-container: '#546773'
  tertiary: '#536257'
  on-tertiary: '#ffffff'
  tertiary-container: '#ddeee0'
  on-tertiary-container: '#5d6d62'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f3dfca'
  primary-fixed-dim: '#d6c4af'
  on-primary-fixed: '#241a0d'
  on-primary-fixed-variant: '#514535'
  secondary-fixed: '#d1e5f3'
  secondary-fixed-dim: '#b6c9d7'
  on-secondary-fixed: '#0a1e28'
  on-secondary-fixed-variant: '#374954'
  tertiary-fixed: '#d6e7d9'
  tertiary-fixed-dim: '#bacbbd'
  on-tertiary-fixed: '#111e16'
  on-tertiary-fixed-variant: '#3b4a40'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  pastel-peach: '#FBE7D1'
  sky-blue-tint: '#D6EAF8'
  pale-mint: '#E2F3E5'
  ethereal-white: rgba(255, 255, 255, 0.4)
  border-glass: rgba(255, 255, 255, 0.6)
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 640px
  gutter: 1.5rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style
The brand personality is **Calm, Airy, and Minimalist**, focusing on reducing cognitive load through visual serenity. The design style is a refined evolution of **Glassmorphism**, moving away from high-contrast vibrancy toward a soft, organic aesthetic. It evokes a sense of weightlessness, as if the UI is floating in a sunlit, misty atmosphere.

The style utilizes high levels of transparency, very subtle background blurs, and a light-drenched environment. It avoids harsh lines or aggressive gradients, favoring "atmospheric depth" where elements are felt rather than seen as distinct blocks. This approach is intended for high-stress or focus-heavy tasks, like long-form surveys or mindfulness-adjacent applications.

## Colors
The palette is rooted in **natural pastel tones** that mimic the soft light of dawn. 

- **Primary (Soft Peach - #FBE7D1):** Used for primary interaction points and subtle highlights. It provides warmth without the aggression of standard orange.
- **Secondary (Sky Blue - #D6EAF8):** Used for supporting elements and indicating calm states.
- **Tertiary (Pale Mint - #E2F3E5):** Used for success indicators or gentle accents, replacing the typical harsh emerald green.
- **Neutral:** A range of off-whites and near-transparent layers.

The background is a soft, multi-colored environmental wash (an "Organic Sky") rather than a solid color, using extremely low-saturation versions of the palette colors to create an airy, open feel.

## Typography
The typography system prioritizes breathability and softness. **Plus Jakarta Sans** is used for headlines, but at a slightly lighter weight (Semi-Bold instead of Bold) to maintain the airy aesthetic. 

**Hanken Grotesk** provides a clean, neutral foundation for body text. To maintain the minimalist feel, text colors should never be pure black; instead, use a deep charcoal with a hint of the primary hue to keep the text feeling "within" the environment. Use generous line-heights to ensure the content never feels crowded.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy, centering content to minimize eye travel and promote focus. 

- **Rhythm:** A 12px-based spacing system is preferred over the traditional 8px to create more dramatic whitespace.
- **Margins:** 32px horizontal margins on mobile, scaling to 64px or more on desktop to allow the "airy" background to frame the content.
- **Containment:** Content lives within a 640px central column. The spacing between major sections should be wide (`stack-lg`) to give each thought room to breathe.

## Elevation & Depth
Depth is achieved through **layered translucency** and light-refraction metaphors.

- **Surface Tiers:** Use extremely high transparency (30-50%) for base containers.
- **Backdrop Blur:** A lighter blur (8px to 12px) is used to create a "frosted veil" effect that feels more organic and less digital.
- **Outlines:** Low-contrast outlines are used instead of shadows. A 1px border using a slightly more opaque white (`border-glass`) defines the shape against the background.
- **Shadows:** Avoid traditional shadows. If necessary for focus, use an ultra-diffused, color-tinted "glow" that matches the background color, creating the illusion of light scattering rather than an object blocking light.

## Shapes
The shape language is rounded and approachable, mirroring the organic feel of the brand. 

- **Base Radius:** Elements use a 0.5rem (8px) radius for small items.
- **Large Radius:** Primary cards and containers use 1.5rem (24px) to create a soft, non-threatening frame.
- **Buttons:** Fully pill-shaped (circular ends) to indicate high interactability and contrast against the softer rectangular containers.

## Components
### Buttons
Buttons should feel like polished stones. Primary buttons use a soft gradient of Peach to Sky Blue with very low saturation. Secondary buttons are semi-transparent with a subtle border. Avoid heavy scaling animations; favor soft opacity transitions.

### Input Fields
Inputs should be nearly invisible until focused. Use a very light surface tint (5% opacity). On focus, the background becomes slightly more opaque, and the border-color shifts to a soft Sky Blue.

### Selection Controls (Radio/Check)
Use custom-styled circular elements. Selected states should be indicated by a soft "pulse" of Pastel Peach and a subtle inner glow.

### Cards & Containers
The primary survey card is the centerpiece. It must use the glassmorphism settings (40% opacity white, 12px blur) with a thin specular highlight on the top edge to simulate light hitting the top of the glass.

### Progress Indicators
Avoid solid bars. Use a series of soft, glowing dots or a thin, translucent track where the "fill" is a gentle light-source moving from left to right.