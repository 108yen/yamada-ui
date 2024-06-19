import type { AutocompleteItem } from "@yamada-ui/react"
import { AutocompleteOption, MultiAutocomplete } from "@yamada-ui/react"
import { fireEvent, render, screen, waitFor } from "@yamada-ui/test"

describe("<MultiAutoComplete />", () => {
  const AUTOCOMPLETE_CLASS = ".ui-multi-autocomplete"
  const AUTOCOMPLETE_ITEM_ROLE = "autocomplete-item"

  describe("renders correctly", () => {
    test("default", async () => {
      const { container } = render(
        <MultiAutocomplete placeholder="Select Option">
          <AutocompleteOption value="option1">option1</AutocompleteOption>
          <AutocompleteOption value="option2">option2</AutocompleteOption>
          <AutocompleteOption value="option3">option3</AutocompleteOption>
        </MultiAutocomplete>,
      )

      expect(screen.getByRole("combobox")).toHaveAttribute(
        "placeholder",
        "Select Option",
      )

      const multiAutocomplete = container.querySelector(
        ".ui-multi-autocomplete",
      )
      expect(multiAutocomplete).toBeInTheDocument()

      fireEvent.click(multiAutocomplete!)
      await waitFor(() => {
        const optionElements = screen.getAllByRole("autocomplete-item")
        expect(optionElements).toHaveLength(3)
      })
    })

    test("have default value", () => {
      render(
        <MultiAutocomplete
          placeholder="Select Option"
          defaultValue={["option1", "option2"]}
        >
          <AutocompleteOption value="option1">option1</AutocompleteOption>
          <AutocompleteOption value="option2">option2</AutocompleteOption>
          <AutocompleteOption value="option3">option3</AutocompleteOption>
        </MultiAutocomplete>,
      )

      expect(screen.getByText("option1,")).toBeInTheDocument()
    })
  })

  describe("first item is selected", () => {
    const ITEMS: AutocompleteItem[] = [
      {
        label: "option1",
        value: "option1",
      },
      {
        label: "option2",
        value: "option2",
      },
      {
        label: "option3",
        value: "option3",
      },
    ]

    test("focuses first enabled item when the first item is selected", async () => {
      const { user, container } = render(
        <MultiAutocomplete
          placeholder="Select Option"
          items={ITEMS}
          defaultValue={["option1", "option2"]}
          omitSelectedValues
        />,
      )

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)
      expect(optionElements).toHaveLength(3)

      await user.keyboard("{Escape>}{ArrowDown>}")
      await waitFor(() =>
        expect(optionElements[2]).toHaveAttribute("data-focus"),
      )
    })

    test("focuses first item when the first item is not selected", async () => {
      const { user, container } = render(
        <MultiAutocomplete
          placeholder="Select Option"
          items={ITEMS}
          defaultValue={["option3"]}
          omitSelectedValues
        />,
      )

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)
      expect(optionElements).toHaveLength(3)

      await user.keyboard("{Escape>}{ArrowDown>}")
      await waitFor(() =>
        expect(optionElements[0]).toHaveAttribute("data-focus"),
      )
    })
  })

  describe("last item is selected", () => {
    const ITEMS: AutocompleteItem[] = [
      {
        label: "option1",
        value: "option1",
      },
      {
        label: "option2",
        value: "option2",
      },
      {
        label: "option3",
        value: "option3",
      },
    ]

    test("focuses last enabled item when the last item is selected", async () => {
      const { user, container } = render(
        <MultiAutocomplete
          placeholder="Select Option"
          items={ITEMS}
          defaultValue={["option1", "option3"]}
          omitSelectedValues
        />,
      )

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)
      expect(optionElements).toHaveLength(3)

      await user.keyboard("{Escape>}{ArrowUp>}")
      await waitFor(() =>
        expect(optionElements[1]).toHaveAttribute("data-focus"),
      )
    })

    test("focuses last item when the last item is not selected", async () => {
      const { user, container } = render(
        <MultiAutocomplete
          placeholder="Select Option"
          items={ITEMS}
          defaultValue={["option1"]}
          omitSelectedValues
        />,
      )

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)
      expect(optionElements).toHaveLength(3)

      await user.keyboard("{Escape>}{ArrowUp>}")
      await waitFor(() =>
        expect(optionElements[2]).toHaveAttribute("data-focus"),
      )
    })
  })

  describe("forcus item", () => {
    const ITEMS: AutocompleteItem[] = [
      {
        label: "option1",
        value: "option1",
      },
      {
        label: "option2",
        value: "option2",
      },
      {
        label: "option3",
        value: "option3",
      },
    ]

    test("focuses item when the single item is selected", async () => {
      const { user, container } = render(
        <MultiAutocomplete
          placeholder="Select Option"
          items={ITEMS}
          defaultValue={["option2"]}
        />,
      )

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)
      expect(optionElements).toHaveLength(3)

      await user.keyboard("{Escape>}{ArrowUp>}")
      await waitFor(() =>
        expect(optionElements[1]).toHaveAttribute("data-focus"),
      )
    })
    test("focuses next item when set omitSelectedValues and item selected", async () => {
      const { user, container } = render(
        <MultiAutocomplete
          placeholder="Select Option"
          items={ITEMS}
          defaultValue={["option2"]}
          omitSelectedValues
        />,
      )

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)
      await user.click(optionElements[0])

      await waitFor(() =>
        expect(optionElements[2]).toHaveAttribute("data-focus"),
      )
    })
  })

  describe("keyDown event", () => {
    const ITEMS: AutocompleteItem[] = [
      {
        label: "option1",
        value: "option1",
      },
      {
        label: "option2",
        value: "option2",
      },
      {
        label: "option3",
        value: "option3",
      },
    ]

    test("enter keyDown should work correctly even whe alloFree is enable", async () => {
      const { user, container } = render(
        <MultiAutocomplete items={ITEMS} allowFree />,
      )

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)
      await user.keyboard("{Escape>}{Enter>}")

      const inputText = "test"
      await user.keyboard(inputText)
      await user.keyboard("{Enter>}")

      const option1Span = screen.getByText("option1,")
      expect(option1Span).toBeInTheDocument()
      const inputTextSpan = screen.getByText(`${inputText},`)
      expect(inputTextSpan).toBeInTheDocument()
    })

    test("arrowDown keyDown should work correctly", async () => {
      const { user, container } = render(<MultiAutocomplete items={ITEMS} />)

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)
      await user.keyboard("{Escape>}{ArrowDown>}")

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)

      await waitFor(() =>
        expect(optionElements[0]).toHaveAttribute("data-focus"),
      )

      for (let i = 1; i < ITEMS.length; i++) {
        await user.keyboard("{ArrowDown>}")

        await waitFor(() =>
          expect(optionElements[i]).toHaveAttribute("data-focus"),
        )
      }

      await user.keyboard("{ArrowDown>}")

      await waitFor(() =>
        expect(optionElements[0]).toHaveAttribute("data-focus"),
      )
    })

    test("arrowDown keyDown should work correctly even when defaultValue is set", async () => {
      const { user, container } = render(
        <MultiAutocomplete items={ITEMS} defaultValue={["option2"]} />,
      )

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)
      await user.keyboard("{Escape>}{ArrowDown>}")

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)
      await waitFor(() =>
        expect(optionElements[1]).toHaveAttribute("data-focus"),
      )
    })

    test("arrowUp keyDown should work correctly", async () => {
      const { user, container } = render(<MultiAutocomplete items={ITEMS} />)

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)
      await user.keyboard("{Escape>}{ArrowUp>}")

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)

      await waitFor(() =>
        expect(optionElements[ITEMS.length - 1]).toHaveAttribute("data-focus"),
      )

      for (let i = ITEMS.length - 2; i >= 0; i--) {
        await user.keyboard("{ArrowUp>}")

        await waitFor(() =>
          expect(optionElements[i]).toHaveAttribute("data-focus"),
        )
      }

      await user.keyboard("{ArrowUp>}")

      await waitFor(() =>
        expect(optionElements[ITEMS.length - 1]).toHaveAttribute("data-focus"),
      )
    })

    test("arrowUp keyDown should work correctly even when defaultValue is set", async () => {
      const { user, container } = render(
        <MultiAutocomplete items={ITEMS} defaultValue={["option2"]} />,
      )

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)
      await user.keyboard("{Escape>}{ArrowUp>}")

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)
      await waitFor(() =>
        expect(optionElements[1]).toHaveAttribute("data-focus"),
      )
    })

    test("backspace keyDown should work correctly", async () => {
      const { user, container } = render(<MultiAutocomplete items={ITEMS} />)

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)
      await waitFor(() =>
        expect(optionElements[0]).toHaveAttribute("data-focus"),
      )

      await user.keyboard("{Enter>}{ArrowDown>}{Enter>}")
      const option1Span = screen.getByText("option1,")
      const option2Span = screen.getByText("option2,")
      expect(option1Span).toBeInTheDocument()
      expect(option2Span).toBeInTheDocument()

      await user.keyboard("{Backspace>}")
      expect(option2Span).not.toBeInTheDocument()

      await user.keyboard("{Backspace>}")
      expect(option1Span).not.toBeInTheDocument()
    })

    test("tab keyDown should work correctly", async () => {
      const { user, container } = render(<MultiAutocomplete items={ITEMS} />)

      const autocomplete = container.querySelector(AUTOCOMPLETE_CLASS)
      expect(autocomplete).toBeInTheDocument()

      await user.click(autocomplete!)

      const optionElements = screen.getAllByRole(AUTOCOMPLETE_ITEM_ROLE)
      await waitFor(() =>
        expect(optionElements[0]).toHaveAttribute("data-focus"),
      )

      await user.keyboard("{Enter>}{ArrowDown>}{Enter>}")
      const option1Span = screen.getByText("option1,")
      const option2Span = screen.getByText("option2,")
      expect(option1Span).toBeInTheDocument()
      expect(option2Span).toBeInTheDocument()

      await user.keyboard("{Tab>}{Enter>}")
      expect(option1Span).not.toBeInTheDocument()
      expect(option2Span).not.toBeInTheDocument()
    })
  })
})
