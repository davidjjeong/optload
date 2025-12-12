import type { LucideIcon } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
    icon: LucideIcon;
    display_value: string;
    label: string;
}

export function NumDisplayCard({
    icon,
    display_value,
    label,
} : Props){
    const Icon = icon;
    return(
        <Card>
            <CardHeader>
                <CardDescription><Icon size={48} /></CardDescription>
                <CardTitle className="text-5xl font-bold">{display_value}</CardTitle>
            </CardHeader>
            <CardFooter>
                <span className="font-light">{label}</span>
            </CardFooter>
        </Card>
    );
}