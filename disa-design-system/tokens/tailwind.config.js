/** DISA Uruguay — Tailwind config (derivado de tokens.json). Importá también tokens.css y disa.css para motion/componentes. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  "theme": {
    "screens": {
      "xs": "360px",
      "sm": "600px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
      "3xl": "1920px"
    },
    "extend": {
      "colors": {
        "blue": {
          "50": "#EEF4FB",
          "100": "#D9E7F6",
          "200": "#B3CEEC",
          "300": "#7FAEDD",
          "400": "#4A88C8",
          "500": "#1F6AB3",
          "600": "#005CA4",
          "700": "#16478A",
          "800": "#11386D",
          "900": "#0B2A55",
          "950": "#071B38"
        },
        "yellow": {
          "50": "#FFFBE6",
          "100": "#FFF5C2",
          "200": "#FFEC8A",
          "300": "#FFE04D",
          "400": "#FBD300",
          "500": "#E8BE00",
          "600": "#C29E00",
          "700": "#8F7400",
          "800": "#5E4C00"
        },
        "celeste": {
          "50": "#F0FAFE",
          "100": "#E3F5FC",
          "200": "#BFE7F7",
          "300": "#7FD0F0",
          "400": "#34B0E0",
          "500": "#1597CB",
          "600": "#0A79A6",
          "700": "#085E82"
        },
        "green": {
          "100": "#E6F4DF",
          "300": "#9CCB2E",
          "500": "#4CB034",
          "700": "#2E8A2C",
          "900": "#0E4B21"
        },
        "orange": {
          "100": "#FFE9DB",
          "500": "#FC6000",
          "700": "#B34200"
        },
        "gray": {
          "50": "#F5F7FA",
          "100": "#E9EDF2",
          "200": "#D3DAE3",
          "300": "#B0BBC9",
          "400": "#8593A6",
          "500": "#5D6B80",
          "600": "#465366",
          "700": "#333E4F",
          "800": "#222B38",
          "900": "#141B24"
        },
        "lima": "#F1E501",
        "crema": {
          "100": "#F7F1E6",
          "200": "#EFE5D3"
        },
        "navy": "#0B2A55",
        "night": "#071B38",
        "brand": {
          "blue": "#16478A",
          "blue-promo": "#005CA4",
          "navy": "#0B2A55",
          "yellow": "#FBD300",
          "celeste": "#34B0E0",
          "green-bird": "#4CB034",
          "green-deep": "#0E4B21",
          "lima": "#F1E501",
          "orange": "#FC6000",
          "crema": "#F7F1E6"
        },
        "text": {
          "default": "#0B2A55",
          "muted": "#465366",
          "subtle": "#5D6B80",
          "brand": "#16478A",
          "link": "#005CA4",
          "link-hover": "#16478A",
          "on-brand": "#FFFFFF",
          "on-energy": "#0B2A55",
          "on-night": "#FFFFFF",
          "accent-on-night": "#FBD300",
          "disabled": "#8593A6"
        },
        "state": {
          "success": "#1B7F3B",
          "success-bg": "#E7F5EC",
          "warning": "#9A5B00",
          "warning-bg": "#FFF3D6",
          "error": "#C62828",
          "error-bg": "#FDECEC",
          "info": "#005CA4",
          "info-bg": "#EEF4FB"
        },
        "promo": {
          "bg": "#FBD300",
          "text": "#0B2A55",
          "band": "#005CA4",
          "band-text": "#FFFFFF",
          "hot": "#FC6000",
          "hot-text": "#0B2A55",
          "hot-strong": "#B34200",
          "new": "#34B0E0",
          "new-text": "#0B2A55",
          "limited": "#16478A",
          "limited-text": "#FBD300"
        }
      },
      "fontFamily": {
        "display": [
          "Barlow Condensed",
          "Arial Narrow",
          "Roboto Condensed",
          "sans-serif"
        ],
        "sans": [
          "Barlow",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif"
        ],
        "hand": [
          "Permanent Marker",
          "cursive"
        ]
      },
      "fontSize": {
        "display-xl": [
          "clamp(3.5rem, 1.9rem + 6.4vw, 9rem)",
          {
            "lineHeight": "0.92"
          }
        ],
        "display-lg": [
          "clamp(3rem, 1.95rem + 4.2vw, 6.5rem)",
          {
            "lineHeight": "0.92"
          }
        ],
        "h1": [
          "clamp(2.5rem, 1.85rem + 2.6vw, 4.5rem)",
          {
            "lineHeight": "1.05"
          }
        ],
        "h2": [
          "clamp(2rem, 1.6rem + 1.6vw, 3.25rem)",
          {
            "lineHeight": "1.05"
          }
        ],
        "h3": [
          "clamp(1.5rem, 1.3rem + 0.8vw, 2.125rem)",
          {
            "lineHeight": "1.05"
          }
        ],
        "h4": [
          "clamp(1.25rem, 1.18rem + 0.3vw, 1.5rem)",
          {
            "lineHeight": "1.05"
          }
        ],
        "lead": [
          "clamp(1.125rem, 1.05rem + 0.3vw, 1.375rem)",
          {
            "lineHeight": "1.55"
          }
        ],
        "body": [
          "1.0625rem",
          {
            "lineHeight": "1.55"
          }
        ],
        "body-sm": [
          "0.9375rem",
          {
            "lineHeight": "1.55"
          }
        ],
        "caption": [
          "0.8125rem",
          {
            "lineHeight": "1.55"
          }
        ],
        "overline": [
          "0.8125rem",
          {
            "lineHeight": "1.55"
          }
        ],
        "button": [
          "1rem",
          {
            "lineHeight": "1.55"
          }
        ],
        "data-xl": [
          "clamp(4rem, 2.4rem + 6.4vw, 10rem)",
          {
            "lineHeight": "1.55"
          }
        ],
        "data-lg": [
          "clamp(3rem, 2.2rem + 3.2vw, 5.5rem)",
          {
            "lineHeight": "1.55"
          }
        ],
        "data-md": [
          "clamp(2rem, 1.7rem + 1.2vw, 3rem)",
          {
            "lineHeight": "1.55"
          }
        ]
      },
      "spacing": {
        "0": "0",
        "0.5": "2px",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
        "32": "128px",
        "40": "160px"
      },
      "borderRadius": {
        "none": "0",
        "xs": "4px",
        "sm": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "24px",
        "2xl": "32px",
        "3xl": "48px",
        "pill": "999px"
      },
      "boxShadow": {
        "1": "0 1px 2px rgba(11,42,85,0.08), 0 1px 1px rgba(11,42,85,0.04)",
        "2": "0 4px 12px -2px rgba(11,42,85,0.12), 0 2px 4px -2px rgba(11,42,85,0.08)",
        "3": "0 12px 32px -8px rgba(11,42,85,0.18), 0 4px 8px -4px rgba(11,42,85,0.08)",
        "4": "0 24px 56px -12px rgba(11,42,85,0.26)",
        "focus": "0 0 0 3px #FFFFFF, 0 0 0 6px #005CA4",
        "focus-on-dark": "0 0 0 3px #071B38, 0 0 0 6px #FBD300",
        "sticker": "0 6px 0 0 rgba(11,42,85,0.18)"
      },
      "zIndex": {
        "base": "0",
        "raised": "10",
        "sticky": "100",
        "header": "200",
        "dropdown": "300",
        "overlay": "400",
        "drawer": "450",
        "modal": "500",
        "toast": "600",
        "transition": "800",
        "preloader": "900"
      },
      "transitionDuration": {
        "instant": "80",
        "xs": "120",
        "sm": "180",
        "md": "240",
        "lg": "360",
        "xl": "520",
        "2xl": "720",
        "3xl": "1000",
        "logo": "1200",
        "counter": "1600",
        "loop-slow": "8000",
        "loop-float": "6000",
        "marquee": "40000"
      },
      "transitionTimingFunction": {
        "energy": "cubic-bezier(0.16, 1, 0.3, 1)",
        "exit": "cubic-bezier(0.7, 0, 0.84, 0)",
        "standard": "cubic-bezier(0.2, 0, 0, 1)",
        "camera": "cubic-bezier(0.65, 0, 0.35, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "linear": "linear"
      },
      "maxWidth": {
        "content": "1440px",
        "wide": "1680px",
        "text": "68ch"
      }
    }
  }
};
