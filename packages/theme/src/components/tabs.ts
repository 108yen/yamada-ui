import type { ComponentMultiStyle } from "@yamada-ui/core"
import { mode } from "@yamada-ui/core"
import { getColor, isGray, shadeColor, tintColor } from "@yamada-ui/utils"

export const Tabs: ComponentMultiStyle = {
  baseStyle: {
    container: ({ orientation }) => ({
      display: "flex",
      flexDirection: orientation === "vertical" ? "row" : "column",
    }),
    tabList: ({ align, orientation }) => ({
      flexDirection: orientation === "vertical" ? "column" : "row",
      justifyContent: align === "center" ? align : `flex-${align}`,
    }),
    tab: ({ isFitted }) => ({
      flex: isFitted ? 1 : undefined,
      whiteSpace: "nowrap",
      transitionProperty: "common",
      transitionDuration: "normal",
      _hover: { opacity: 0.7 },
      _focusVisible: {
        zIndex: "yamcha",
        boxShadow: "outline",
      },
      _selected: { _hover: { opacity: 1 } },
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.4,
      },
    }),
    tabPanels: {},
    tabPanel: {
      p: "md",
    },
  },

  variants: {
    line: ({ colorScheme: c = "primary", orientation }) => {
      const isVertical = orientation === "vertical"

      return {
        tabList: {
          borderColor: "inherit",
          ...(isVertical
            ? { borderEndWidth: "1px" }
            : { borderBottomWidth: "1px" }),
        },
        tab: {
          borderColor: "transparent",
          _selected: {
            color: [`${c}.500`, isGray(c) ? `${c}.100` : `${c}.400`],
            borderColor: "currentColor",
          },
          ...(isVertical
            ? {
                borderEndWidth: "1px",
                borderEndStyle: "solid",
                me: "-1px",
              }
            : {
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                mb: "-1px",
              }),
          _ripple: { display: "none" },
        },
      }
    },
    sticky: ({ colorScheme: c = "primary", orientation }) => {
      const isVertical = orientation === "vertical"

      return {
        tabList: {
          borderColor: "inherit",
          ...(isVertical
            ? { borderEndWidth: "1px" }
            : { borderBottomWidth: "1px" }),
        },
        tab: {
          borderColor: "transparent",
          _selected: {
            color: [`${c}.500`, isGray(c) ? `${c}.100` : `${c}.400`],
            borderColor: "inherit",
            ...(isVertical
              ? { borderEndColor: ["white", "black"] }
              : { borderBottomColor: ["white", "black"] }),
          },
          ...(isVertical
            ? {
                roundedLeft: "md",
                borderWidth: "1px",
                borderStyle: "solid",
                me: "-2px",
              }
            : {
                roundedTop: "md",
                borderWidth: "1px",
                borderStyle: "solid",
                mb: "-2px",
              }),
          _ripple: { display: "none" },
        },
      }
    },
    "sticky-subtle": ({
      theme: t,
      colorMode: m,
      colorScheme: c = "primary",
      orientation,
    }) => {
      const isVertical = orientation === "vertical"

      return {
        tabList: {
          borderColor: "inherit",
          ...(isVertical
            ? { borderEndWidth: "1px" }
            : { borderBottomWidth: "1px" }),
        },
        tab: {
          borderColor: "inherit",
          _notLast: {
            ...(isVertical ? { borderBottom: "none" } : { borderEnd: "none" }),
          },
          _selected: {
            bg: [
              isGray(c) ? `${c}.50` : `${c}.100`,
              shadeColor(`${c}.300`, 58)(t, m),
            ],
            color: [`${c}.800`, isGray(c) ? `${c}.50` : `${c}.200`],
          },
          ...(isVertical
            ? {
                borderWidth: "1px",
                borderStyle: "solid",
                me: "-1px",
              }
            : {
                borderWidth: "1px",
                borderStyle: "solid",
                mb: "-1px",
              }),
        },
      }
    },
    "sticky-solid": ({
      theme: t,
      colorMode: m,
      colorScheme: c = "primary",
      orientation,
    }) => {
      const isVertical = orientation === "vertical"

      return {
        tabList: {
          borderColor: "inherit",
          ...(isVertical
            ? { borderEndWidth: "1px" }
            : { borderBottomWidth: "1px" }),
        },
        tab: {
          borderColor: "inherit",
          _notLast: {
            ...(isVertical ? { borderBottom: "none" } : { borderEnd: "none" }),
          },
          _selected: {
            bg: [
              tintColor(`${c}.600`, 24)(t, m),
              shadeColor(`${c}.600`, 16)(t, m),
            ],
            color: `white`,
          },
          ...(isVertical
            ? {
                borderWidth: "1px",
                borderStyle: "solid",
                me: "-1px",
              }
            : {
                borderWidth: "1px",
                borderStyle: "solid",
                mb: "-1px",
              }),
        },
      }
    },
    rounded: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => {
      const color = mode(
        getColor(`${c}.500`)(t, m),
        getColor(isGray(c) ? `${c}.100` : `${c}.400`)(t, m),
      )(m)

      return {
        tabList: { gap: "sm" },
        tab: {
          borderRadius: "full",
          _selected: {
            color,
            boxShadow: `inset 0 0 0px 1px ${color}`,
          },
        },
      }
    },
    "rounded-subtle": ({
      theme: t,
      colorMode: m,
      colorScheme: c = "primary",
    }) => ({
      tabList: { gap: "sm" },
      tab: {
        borderRadius: "full",
        _selected: {
          bg: [
            isGray(c) ? `${c}.50` : `${c}.100`,
            shadeColor(`${c}.300`, 58)(t, m),
          ],
          color: [`${c}.800`, isGray(c) ? `${c}.50` : `${c}.200`],
        },
      },
    }),
    "rounded-solid": ({
      theme: t,
      colorMode: m,
      colorScheme: c = "primary",
    }) => ({
      tabList: { gap: "sm" },
      tab: {
        borderRadius: "full",
        _selected: {
          bg: [
            tintColor(`${c}.600`, 24)(t, m),
            shadeColor(`${c}.600`, 16)(t, m),
          ],
          color: `white`,
        },
      },
    }),
    unstyled: {
      tab: {
        _hover: { opacity: "inherit" },
        _ripple: { display: "none" },
      },
    },
  },

  sizes: {
    sm: {
      tab: {
        py: 1,
        px: 3,
        fontSize: "sm",
      },
    },
    md: {
      tab: {
        fontSize: "md",
        py: 2,
        px: 4,
      },
    },
    lg: {
      tab: {
        fontSize: "lg",
        py: 3,
        px: 5,
      },
    },
  },

  defaultProps: {
    size: "md",
    variant: "line",
    colorScheme: "primary",
  },
}
