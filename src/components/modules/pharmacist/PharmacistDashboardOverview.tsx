import {
  Pill,
  MessageCircle,
  GitPullRequestDraft,
  CheckSquare,
  ArrowRight,
  Tags,
  User,
} from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/layout/dashboard-layout/StartCard";
import DashboardSection from "@/components/layout/dashboard-layout/DashboardSection";
import DashboardGrid from "@/components/layout/dashboard-layout/DashboardGrid";
import {
  getPendingMedicinesAction,
  getQuestionsAction,
  getCategoryRecommendationsAction,
} from "@/actions/pharmacist.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/helpers/formatData";

export default async function PharmacistDashboardOverview() {
  const [pendingRes, questionsRes, recommendationsRes] = await Promise.all([
    getPendingMedicinesAction({ limit: "5" }),
    getQuestionsAction({ status: "OPEN", limit: "4" }),
    getCategoryRecommendationsAction({ limit: "6" }),
  ]);

  const pendingMedicinesCount = pendingRes?.data?.meta?.total || 0;
  const pendingMedicinesList = pendingRes?.data?.result || [];

  const activeQuestionsCount = questionsRes?.data?.meta?.total || 0;
  const activeQuestionsList = questionsRes?.data?.result || [];

  const recentCategoriesList = recommendationsRes?.data?.result || [];
  const recentRecommendationsCount =
    recommendationsRes?.data?.meta?.total || recentCategoriesList.length;

  const stats = [
    {
      title: "Pending Verifications",
      value: pendingMedicinesCount,
      icon: Pill,
      description: "Medicines waiting for approval",
      href: "/pharmacist-dashboard/pending-medicines",
    },
    {
      title: "Open Questions",
      value: activeQuestionsCount,
      icon: MessageCircle,
      description: "Customer questions needing answers",
      href: "/pharmacist-dashboard/questions",
    },
    {
      title: "Categories",
      value: recentRecommendationsCount,
      icon: Tags,
      description: "Total active system categories",
      href: "/pharmacist-dashboard/category-recommendations",
    },
    {
      title: "Daily Tasks",
      value: pendingMedicinesCount + activeQuestionsCount,
      icon: CheckSquare,
      description: "Total pending task items today",
      href: "#",
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardSection title="Overview">
        <DashboardGrid>
          {stats.map((stat) => (
            <Link href={stat.href} key={stat.title}>
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                description={stat.description}
              />
            </Link>
          ))}
        </DashboardGrid>
      </DashboardSection>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Pending Medicines */}
        <Card className="col-span-1 border-muted">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Needs Verification</CardTitle>
              <CardDescription>
                Recently added medicines awaiting review
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/pharmacist-dashboard/pending-medicines">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {pendingMedicinesList.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <Pill className="h-10 w-10 mb-2 opacity-20" />
                <p>No medicines pending verification!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingMedicinesList.map((medicine: any) => (
                    <TableRow key={medicine.id}>
                      <TableCell className="font-medium">
                        {medicine.name}
                        <div className="text-xs text-muted-foreground font-normal">
                          {medicine.category?.name || "Uncategorized"}
                        </div>
                      </TableCell>
                      <TableCell>{medicine.seller?.name || "N/A"}</TableCell>
                      <TableCell>
                        {medicine.createdAt
                          ? formatDate(medicine.createdAt)
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Recent Questions */}
        <Card className="col-span-1 border-muted">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Open Q&A</CardTitle>
              <CardDescription>
                Customers waiting for medical answers
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/pharmacist-dashboard/questions">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {activeQuestionsList.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <MessageCircle className="h-10 w-10 mb-2 opacity-20" />
                <p>No open questions from customers!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeQuestionsList.map((q: any) => (
                  <div
                    key={q.id}
                    className="flex flex-col space-y-2 border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold">
                        Regarding: {q.medicine?.name}
                      </span>
                      <Badge variant="destructive" className="text-[10px]">
                        OPEN
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 italic">
                      "{q.question}"
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Asked by {q.customer?.name} on{" "}
                      {q.createdAt ? formatDate(q.createdAt) : "Recently"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories Snapshot */}
        <Card className="col-span-1 border-muted">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>System Categories</CardTitle>
              <CardDescription>
                Currently supported medicine groups
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/pharmacist-dashboard/category-recommendations">
                Recommend <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentCategoriesList.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <Tags className="h-10 w-10 mb-2 opacity-20" />
                <p>No categories found in the system.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {recentCategoriesList.map((category: any) => (
                  <Badge
                    key={category.id}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-1 border-muted bg-primary/5">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Fast shortcuts for your daily tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 bg-background hover:border-primary/50 transition-colors"
              asChild
            >
              <Link href="/pharmacist-dashboard/pending-medicines">
                <Pill className="h-6 w-6 text-orange-500" />
                <span className="text-xs font-semibold">Verify Medicines</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 bg-background hover:border-primary/50 transition-colors"
              asChild
            >
              <Link href="/pharmacist-dashboard/questions">
                <MessageCircle className="h-6 w-6 text-green-500" />
                <span className="text-xs font-semibold">Answer Queries</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 bg-background hover:border-primary/50 transition-colors"
              asChild
            >
              <Link href="/pharmacist-dashboard/category-recommendations">
                <GitPullRequestDraft className="h-6 w-6 text-blue-500" />
                <span className="text-xs font-semibold">Recommend Updates</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 bg-background hover:border-primary/50 transition-colors"
              asChild
            >
              <Link href="/dashboard/profile">
                <User className="h-6 w-6 text-purple-500" />
                <span className="text-xs font-semibold">My Profile</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
