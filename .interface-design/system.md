# Interface Design System — Abheda Foundation MathStep

## Direction & Feel
- **The Civic Learning Atelier**: An approachable, warm, community-focused mathematical platform modeled on the visual identity of Abheda Foundation.
- **Tone**: Optimistic, trustworthy, human, and encouraging. Replaces cold corporate blue with warm sunflower yellow (`#FFE757`), rich charcoal (`#333333`), vivid coral (`#EF3F52`), and warm off-white surface parchment (`#F8F6EE`).

## Design Tokens (Abheda Foundation Specification)
- **Primary Color**: `#FFE757` (bright sunflower yellow — key emphasis and calls to action)
- **Secondary Color**: `#333333` (deep charcoal — main typography and grounding structure)
- **Tertiary Color**: `#EF3F52` (vivid coral-red — button text, active highlights, urgency)
- **Neutral Color**: `#FFFFFF` (clean white — headers, cards, content base)
- **Surface Color**: `#F8F6EE` (warm off-white — background canvas and panel bands)
- **On-Surface Color**: `#1F2937` (cooler dark tone for light sections)
- **Border Color**: `#E5E7EB` (pale gray — subtle card and divider boundaries)
- **Shadow Color**: `#AAAAAA` (soft neutral shadow)
- **Error Color**: `#D92D20` (system error / validation states)

## Typography (Open Sans Hierarchy)
- **Headlines**: Open Sans, Bold (700)
  - Display: 48px / 1.1
  - Large: 32px / 38px
  - Medium: 26px / 31px
  - Small: 21px / 31px (Light 300)
- **Body**: Open Sans
  - Large: 16px / 24px (Regular 400)
  - Medium: 14px / 20px (Light 300)
  - Small: 12px / 18px (Light 300)
- **Labels & Action**: Open Sans, Bold (700)
  - Large: 16px / 20px
  - Medium: 14px / 18px
  - Small: 12px / 16px
- **Math Equations**: KaTeX Mathematical serif for formulas and equations.

## Rounded Geometry
- **Cards**: `rounded-md` (8px)
- **Primary Buttons**: `rounded-lg` / `rounded-[20px]` (20px pill-curved friendly geometry)
- **Chips & Tags**: `rounded-full` (9999px)
- **Secondary Buttons / Inputs**: `rounded-sm` (4px) or `rounded-md` (8px)

## Key Component Patterns
1. **Primary Button (`button-primary`)**:
   - `bg-[#FFE757] text-[#EF3F52] hover:bg-[#EF3F52] hover:text-[#FFFFFF] rounded-[20px] px-[35px] py-[8px] h-[41px] font-bold text-sm transition-all duration-200 shadow-xs active:scale-[0.98]`
2. **Secondary Button (`button-secondary`)**:
   - `bg-transparent text-[#333333] hover:bg-[#F8F6EE] border border-[#E5E7EB] rounded-[8px] px-[20px] py-[8px] h-[41px] font-bold text-sm transition-all`
3. **Card (`card`)**:
   - `bg-[#FFFFFF] text-[#333333] rounded-[8px] border border-[#E5E7EB] p-4 sm:p-6 shadow-xs`
4. **Chip (`chip`)**:
   - `bg-[#F8F6EE] text-[#333333] rounded-full px-3 py-1 text-xs font-bold border border-[#E5E7EB]`
5. **Path Node (Active)**:
   - Sunflower yellow (`#FFE757`) fill, coral-red (`#EF3F52`) icon, warm amber glow ring.
