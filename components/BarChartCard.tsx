import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
    return(
        <Card>
            <CardHeader>
                <CardTitle>{chartTitle}</CardTitle>
                <CardDescription>{chartDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
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
                        <Bar dataKey="score" fill="var(--color-score)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}