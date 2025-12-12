import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

const chartConfig = {
    score: {
        label: "Score",
        color: "var(--chart-1)",
    }
} satisfies ChartConfig;

interface BarChartProps {
    chartTitle: string;
    chartDescription: string;
    chartData: {
        task: string;
        score: number;
    }[]; 
}

export function BarChartCard({
    chartTitle,
    chartDescription,
    chartData,
} : BarChartProps) {
    const maxScore = Math.max(...chartData.map(d => d.score));

    return(
        <Card className="h-fit">
            <CardHeader>
                <CardTitle>{chartTitle}</CardTitle>
                <CardDescription>{chartDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} horizontal={false} />
                        <XAxis
                            dataKey="task"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="score" radius={8}>
                            {chartData.map((entry, i) => (
                                <Cell key={i} fill={entry.score === maxScore ? "var(--chart-1)" : "var(--muted"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}