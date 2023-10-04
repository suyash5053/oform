import {GetFormStats} from "@/actions/form";
import {LuView} from "react-icons/lu";
import {ReactNode, Suspense} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {Separator} from "@/components/ui/separator";
import {FaWpforms} from "react-icons/fa";
import {HiCursorClick} from "react-icons/hi";
import {TbArrowBounce} from "react-icons/tb";

export default function Home() {
    return (
     <div className={"container pt-4"}>
        <Suspense fallback={<StatsCards loading={true}/>}>
            <CardStatsContainer/>
        </Suspense>
         <Separator className={"my-6"} />
         <h2 className={"text-4xl font-bold col-span-2"}>Forms</h2>
         <Separator className={"my-6"} />
     </div>
    );
}

async function CardStatsContainer() {
    const stats = await GetFormStats();
    return <StatsCards loading={false} data={stats} />;
}
interface StatsCardProps {
    loading: boolean;
    data?: Awaited<ReturnType<typeof GetFormStats>>;
}
function StatsCards(props: StatsCardProps) {
    const {loading, data} = props;
    return (
        <div className={"w-full pt-8 gap-4 grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-4"}>
            <StatsCard
                title={"Total Visits"}
                icon={<LuView className={"text-blue-600"} />}
                helpText={"Total number of visits to your forms"}
                value={data?.visits.toLocaleString() || ""}
                loading={loading}
                className={"shadow-md shadow-blue-600"}
            />
            <StatsCard
                title={"Total Submissions"}
                icon={<FaWpforms className={"text-yellow-600"} />}
                helpText={"Total number of submissions to your forms"}
                value={data?.submissions.toLocaleString() || ""}
                loading={loading}
                className={"shadow-md shadow-yellow-600"}
            />
            <StatsCard
                title={"Submissions Rate"}
                icon={<HiCursorClick className={"text-red-600"} />}
                helpText={"Visits that submitted a form"}
                value={data?.submissionsRate.toLocaleString() + "%" || ""}
                loading={loading}
                className={"shadow-md shadow-red-600"}
            />
            <StatsCard
                title={"Bounce Rate"}
                icon={<TbArrowBounce className={"text-green-600"} />}
                helpText={"Visits that left without submitting"}
                value={data?.bounceRate.toLocaleString() + "%" || ""}
                loading={loading}
                className={"shadow-md shadow-green-600"}
            />
        </div>
    );
}

function StatsCard({title, icon, helpText, value, loading, className}:{
    title : string;
    icon : ReactNode;
    helpText : string;
    value : string;
    loading : boolean;
    className : string;
}) {
    return (
        <Card className={className}>
            <CardHeader className={"flex flex-row items-center justify-between pb-2"}>
                <CardTitle className={"text-sm font-medium text-muted-foreground"}>
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className={"text-2xl font-bold"}>
                    {
                        loading && <Skeleton>
                            <span className={"opacity-0"}>0</span>
                        </Skeleton>
                    }
                    {!loading && value}
                </div>
                <p className={"text-xs text-muted-foreground pt-1"}>{helpText}</p>
            </CardContent>
        </Card>
    );
}