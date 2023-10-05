import {GetFormStats} from "@/actions/form";
import {LuView} from "react-icons/lu";
import {ReactNode, Suspense} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {Separator} from "@/components/ui/separator";
import {FaEdit, FaWpforms} from "react-icons/fa";
import {HiCursorClick} from "react-icons/hi";
import {TbArrowBounce} from "react-icons/tb";
import CreateFormBtn from "@/components/CreateFormBtn";
import {GetForms} from "@/actions/form";
import {Form} from "@prisma/client";
import {Badge} from "@/components/ui/badge";
import {formatDistance} from "date-fns";
import {BiRightArrowAlt} from "react-icons/bi";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
     <div className={"container pt-4"}>
        <Suspense fallback={<StatsCards loading={true}/>}>
            <CardStatsContainer/>
        </Suspense>
         <Separator className={"my-6"} />
         <h2 className={"text-4xl font-bold col-span-2"}>Forms</h2>
         <Separator className={"my-6"} />
         <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
             <CreateFormBtn />
                <Suspense
                    // @ts-ignore
                    fallback ={[1,2,3,4].map((el) => {
                        <FormCardSkeleton key={el} />
                    })}
                >
                    <FormCards />
                </Suspense>
         </div>
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
                            <span className={"opacity-0"}>0
                            </span>
                        </Skeleton>
                    }
                    {!loading && value}
                </div>
                <p className={"text-xs text-muted-foreground pt-1"}>
                    {helpText}
                </p>
            </CardContent>
        </Card>
    );
}

function FormCardSkeleton() {
    return <Skeleton className={"border-2 border-primary-/20 h-[190px] w-full"} />;
}

async function FormCards() {
    const forms = await GetForms();
    return (
        <>
            {forms.map((form) => (
                <FormCard key={form.id} form={form} />
            ))}
        </>
    );
}

function FormCard({form}: {form: Form}) {
    return (
        <Card className={""}>
            <CardHeader className={""}>
                <CardTitle className={"flex items-center gap-2 justify-between"}>
                    <span className={"truncate font-bold"}>{form.name}
                    </span>
                    {form.published && <Badge>Published</Badge>}
                    {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
                </CardTitle>
                <CardDescription className={"flex items-center justify-between text-muted-foreground text-sm"}>
                    {formatDistance(form.createdAt, new Date(), {addSuffix: true})}
                    {form.published && (
                        <span className={"flex items-center gap-2"}>
                            <LuView className={"text-muted-foreground"} />
                            <span>{form.visits.toLocaleString()}</span>
                            <FaWpforms className={"text-muted-foreground"} />
                            <span>{form.submissions.toLocaleString()}</span>
                        </span>)
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className={"h-[20px] truncate text-sm text-muted-foreground"}>
                {form.description || "No available description"}
            </CardContent>
            <CardFooter>
                {form.published && (
                    <Button asChild className={"w-full mt-2 text-md gap-4"}>
                        <Link href={`/form/${form.id}`}>
                            View Submissions <BiRightArrowAlt />
                        </Link>
                    </Button>
                )}
                {!form.published && (
                    <Button asChild variant={"secondary"} className={"w-full mt-2 text-md gap-4"}>
                        <Link href={`/builder/${form.id}`}>
                            Edit Form<FaEdit />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}