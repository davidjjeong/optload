"use client";

import { useEffect, useState } from "react";
import type { TaskAnalysis } from "@/lib/types/TaskAnalysis";
import { BarChartCard } from "@/components/BarChartCard";
import { NumDisplayCard } from "@/components/NumDisplayCard";
import { ChartColumnIncreasing, Gauge, Timer } from "lucide-react";

const bloomMap:Record<number, string> = {
    1: "Remember",
    2: "Understand",
    3: "Apply",
    4: "Analyze",
    5: "Evaluate",
    6: "Create",
};

export default function Results() {
    const [data, setData] = useState<TaskAnalysis[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLatestResults() {
            const res = await fetch("/api/results/get-latest");
            const json = await res.json();
            setData(json.results as TaskAnalysis[]);
            setLoading(false);
        }
        fetchLatestResults();
    }, []);

    const finalScoreBarData = data.map((d) => ({
        task: d.assignment,
        score: d.final_score,
    }));

    const cogLoadBarData = data.map((d) => ({
        task: d.assignment,
        score: d.cognitive_load_score,
    }));

    const totalEstimatedTime = (data.reduce((sum, task) => sum + task.etc_minutes, 0) / 60).toFixed(2);
    const avgTaskDifficulty = (data.reduce((sum, task) => sum + task.task_difficulty, 0) / data.length).toFixed(2);
    const avgStressLoad = (data.reduce((sum, task) => sum + task.final_score, 0) / data.length).toFixed(2);
    const maxBloomLevel = bloomMap[Math.max(...data.map(d => d.bloom_level)) as number] || "N/A";

    return(
        <div className="flex flex-col w-full min-h-screen p-8">
            {loading ? (
                <p>Please wait a moment...</p>
            ) : !data.length ? (
                <p>No recent analysis found.</p>
            ) : (
            <div className="w-full">
                <h1 className="text-4xl font-bold mb-2">Overview</h1>
                <h2 className="text-muted-foreground mb-4">Your Most Recent Task Load Analysis</h2>
                <div className="grid gap-8">
                    <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-8">
                        <NumDisplayCard
                            icon={Gauge}
                            display_value={avgStressLoad}
                            label={`Average overall stress load across all tasks`}
                        />
                        <NumDisplayCard
                            icon={Timer}
                            display_value={totalEstimatedTime}
                            label={`Total estimated hours to complete all tasks`}
                        />
                        <NumDisplayCard
                            icon={Gauge}
                            display_value={avgTaskDifficulty}
                            label={`Average task difficulty across all tasks (1-10)`}
                        />
                        <NumDisplayCard
                            icon={ChartColumnIncreasing}
                            display_value={maxBloomLevel}
                            label={`Max Bloom's Taxonomy level across all tasks`}
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <BarChartCard
                            chartTitle="Overall Task Load"
                            chartDescription="Overall Load Scores for Each Task"
                            chartData={finalScoreBarData}
                        />
                        <BarChartCard
                            chartTitle="Cognitive Task Load"
                            chartDescription="Cognitive Load Scores for Each Task"
                            chartData={cogLoadBarData}
                        />
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}