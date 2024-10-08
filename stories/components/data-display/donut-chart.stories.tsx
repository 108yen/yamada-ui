import type { Meta, StoryFn } from "@storybook/react"
import type {
  CellProps,
  ChartTooltip,
  DonutChartProps,
  TooltipDataSourceType,
} from "@yamada-ui/charts"
import { DonutChart } from "@yamada-ui/charts"
import type { Dict } from "@yamada-ui/react"
import { Card, CardBody, HStack, VStack, Wrap, Text } from "@yamada-ui/react"
import { useMemo, useState } from "react"
import { PropControl } from "../../components"

type Story = StoryFn<typeof DonutChart>

const meta: Meta<typeof DonutChart> = {
  title: "Components / Data Display / DonutChart",
  component: DonutChart,
}

export default meta

export const basic: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  return <DonutChart data={data} />
}

export const custom: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  const [props, setProps] = useState<DonutChartProps>({
    data: data,
    withTooltip: true,
    withLegend: false,
    fillOpacity: 1,
    paddingAngle: 0,
    startAngle: 90,
    endAngle: -270,
    strokeWidth: 1,
    tooltipAnimationDuration: 0,
    innerRadius: 60,
    outerRadius: 80,
    tooltipDataSource: "all",
  })
  const { innerRadius, outerRadius, ...rest } = props

  return (
    <VStack>
      <DonutChart
        innerRadius={`${innerRadius}%`}
        outerRadius={`${outerRadius}%`}
        {...rest}
      />

      <Wrap gap="md" alignItems="flex-start">
        <PropControl
          component="Slider"
          items={[
            {
              label: "Padding angle",
              value: props.paddingAngle,
              min: 0,
              max: 30,
              step: 1,
              onChange: (value) => {
                setProps((prev) => ({ ...prev, paddingAngle: value }))
              },
            },
            {
              label: "Stroke width",
              value: props.strokeWidth,
              min: 0.5,
              max: 5,
              step: 0.5,
              onChange: (value) => {
                setProps((prev) => ({ ...prev, strokeWidth: value }))
              },
            },
            {
              label: "Start angle",
              value: props.startAngle,
              min: 0,
              max: 180,
              step: 1,
              onChange: (value) => {
                setProps((prev) => ({ ...prev, startAngle: value }))
              },
            },
            {
              label: "End angle",
              value: props.endAngle,
              min: 180,
              max: 360,
              step: 1,
              onChange: (value) => {
                setProps((prev) => ({ ...prev, endAngle: value }))
              },
            },
            {
              label: "Fill opacity",
              value: props.fillOpacity as number,
              min: 0,
              max: 1,
              step: 0.1,
              onChange: (value) => {
                setProps((prev) => ({ ...prev, fillOpacity: value }))
              },
            },
            {
              label: "Tooltip animation duration",
              value: props.tooltipAnimationDuration,
              min: 0,
              max: 2000,
              onChange: (value) => {
                setProps((prev) => ({
                  ...prev,
                  tooltipAnimationDuration: value,
                }))
              },
            },
          ]}
        />

        <VStack w="auto">
          <PropControl
            component="Slider"
            items={[
              {
                label: "Inner Radius",
                value: props.innerRadius as number,
                min: 0,
                max: 100,
                onChange: (value) => {
                  setProps((prev) => ({
                    ...prev,
                    innerRadius: value,
                  }))
                },
              },
              {
                label: "Outer Radius",
                value: props.outerRadius as number,
                min: 0,
                max: 100,
                onChange: (value) => {
                  setProps((prev) => ({
                    ...prev,
                    outerRadius: value,
                  }))
                },
              },
              {
                label: "Label Offset",
                value: props.labelOffset as number,
                min: 0,
                max: 100,
                onChange: (value) => {
                  setProps((prev) => ({
                    ...prev,
                    labelOffset: value,
                  }))
                },
              },
            ]}
          />

          <PropControl
            component="Select"
            items={[
              {
                label: "Tooltip data source",
                defaultValue: "all",
                items: [
                  { label: "all", value: "all" },
                  { label: "segment", value: "segment" },
                ],
                value: props.tooltipDataSource,
                onChange: (value) => {
                  setProps((prev) => ({
                    ...prev,
                    tooltipDataSource: value as TooltipDataSourceType,
                  }))
                },
              },
            ]}
          />

          <PropControl
            component="Switch"
            items={[
              {
                label: "tooltip",
                isChecked: props.withTooltip,
                onChange: () =>
                  setProps((prev) => ({
                    ...prev,
                    withTooltip: !prev.withTooltip,
                  })),
              },
              {
                label: "legend",
                isChecked: props.withLegend,
                onChange: () =>
                  setProps((prev) => ({
                    ...prev,
                    withLegend: !prev.withLegend,
                  })),
              },
              {
                label: "label",
                isChecked: props.withLabels,
                onChange: () =>
                  setProps((prev) => ({
                    ...prev,
                    withLabels: !prev.withLabels,
                  })),
              },
              {
                label: "label line",
                isChecked: props.withLabelLines,
                onChange: () =>
                  setProps((prev) => ({
                    ...prev,
                    withLabelLines: !prev.withLabelLines,
                  })),
              },
              {
                label: "isPercent",
                isChecked: props.isPercent,
                onChange: () =>
                  setProps((prev) => ({
                    ...prev,
                    isPercent: !prev.isPercent,
                  })),
              },
            ]}
          />
        </VStack>
      </Wrap>
    </VStack>
  )
}

export const withSize: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  return (
    <>
      <DonutChart data={data} size="sm" />
      <DonutChart data={data} size="md" />
      <DonutChart data={data} size="lg" />
    </>
  )
}

export const withLegend: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  return <DonutChart data={data} withLegend />
}

export const withValueFormatter: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  return (
    <DonutChart
      data={data}
      valueFormatter={(value) => value.toLocaleString()}
    />
  )
}

export const withLabelFormatter: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  return (
    <DonutChart
      data={data}
      labelFormatter={(value) => value.toLocaleString()}
    />
  )
}

export const withFillOpacity: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  return <DonutChart data={data} fillOpacity={[0.8, 0.7]} />
}

export const customActiveShape: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  return (
    <DonutChart
      data={data}
      pieProps={{
        activeShape: {
          strokeWidth: 2,
          stroke: ["black", "white"],
        },
        inactiveShape: { opacity: 0.5 },
      }}
    />
  )
}

export const customTooltip: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  const CustomTooltip: ChartTooltip = (props: { payload?: Dict[] }) => {
    const { payload } = props
    if (!payload) return null

    return (
      <Card variant="subtle" colorScheme="gray">
        <CardBody gap="sm">
          {payload.map((value, index) => (
            <HStack
              key={`payload-${index}`}
              w="full"
              justifyContent="space-between"
            >
              <Text>{value?.name}</Text>
              <Text color={value?.payload?.color}>{value?.value}</Text>
            </HStack>
          ))}
        </CardBody>
      </Card>
    )
  }

  return (
    <DonutChart
      data={data}
      tooltipProps={{
        content: CustomTooltip,
      }}
    />
  )
}

export const customLegend: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  return (
    <DonutChart
      data={data}
      withLegend
      legendProps={{ verticalAlign: "bottom", mb: "0", mt: "4" }}
    />
  )
}

export const customLabel: Story = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 400, color: "red.500" },
      { name: "India", value: 300, color: "orange.500" },
      { name: "Japan", value: 100, color: "blue.500" },
      { name: "Other", value: 200, color: "gray.500" },
    ],
    [],
  )

  return (
    <DonutChart
      data={data}
      labelProps={{
        value: "DonutChart",
        position: "center",
        fill: ["black", "white"],
        fontSize: "md",
        fontWeight: "bold",
      }}
    />
  )
}
