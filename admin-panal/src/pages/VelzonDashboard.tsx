import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  MoreHorizontal,
  Edit,
  ArrowUpRight,
  ArrowDownRight,
  Ticket,
} from "lucide-react";

// Dummy data for charts and tables
const salesData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 198 },
  { month: "Mar", sales: 5000, orders: 300 },
  { month: "Apr", sales: 4500, orders: 278 },
  { month: "May", sales: 6000, orders: 189 },
  { month: "Jun", sales: 5500, orders: 239 },
];

const orderStatusData = [
  { name: "Delivered", value: 120, color: "hsl(var(--success))" },
  { name: "Pending", value: 80, color: "hsl(var(--warning))" },
  { name: "Cancelled", value: 30, color: "hsl(var(--destructive))" },
  { name: "Processing", value: 45, color: "hsl(var(--info))" },
];

const topProductsData = [
  { name: "Blue Denim Jacket", sales: 245, revenue: 12250 },
  { name: "White Cotton T-Shirt", sales: 189, revenue: 3780 },
  { name: "Black Leather Boots", sales: 156, revenue: 15600 },
  { name: "Red Summer Dress", sales: 134, revenue: 8040 },
  { name: "Navy Blue Jeans", sales: 98, revenue: 5880 },
];

const recentOrders = [
  { 
    id: "#VZ001", 
    customer: "John Smith", 
    products: "Blue Denim Jacket, White T-Shirt", 
    total: "$125.50", 
    status: "delivered",
    date: "2024-01-20"
  },
  { 
    id: "#VZ002", 
    customer: "Sarah Johnson", 
    products: "Black Leather Boots", 
    total: "$199.99", 
    status: "processing",
    date: "2024-01-19"
  },
  { 
    id: "#VZ003", 
    customer: "Mike Wilson", 
    products: "Red Summer Dress", 
    total: "$79.99", 
    status: "pending",
    date: "2024-01-18"
  },
  { 
    id: "#VZ004", 
    customer: "Emily Davis", 
    products: "Navy Blue Jeans, White T-Shirt", 
    total: "$89.98", 
    status: "delivered",
    date: "2024-01-17"
  },
  { 
    id: "#VZ005", 
    customer: "David Brown", 
    products: "Blue Denim Jacket", 
    total: "$65.00", 
    status: "cancelled",
    date: "2024-01-16"
  },
];

const statsCards = [
  {
    title: "Total Products",
    value: "2,847",
    change: "+12.5%",
    trending: "up",
    icon: Package,
    bgClass: "stat-card-primary",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trending: "up",
    icon: ShoppingCart,
    bgClass: "stat-card-success",
  },
  {
    title: "Total Users",
    value: "8,945",
    change: "+15.3%",
    trending: "up",
    icon: Users,
    bgClass: "stat-card-info",
  },
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "-2.4%",
    trending: "down",
    icon: DollarSign,
    bgClass: "stat-card-warning",
  },
  {
    title: "Active Coupons",
    value: "23",
    change: "+5.1%",
    trending: "up",
    icon: Ticket,
    bgClass: "stat-card-secondary",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return <Badge className="badge-solid-success">Delivered</Badge>;
    case "processing":
      return <Badge className="badge-solid-info">Processing</Badge>;
    case "pending":
      return <Badge className="badge-solid-warning">Pending</Badge>;
    case "cancelled":
      return <Badge className="badge-solid-danger">Cancelled</Badge>;
    default:
      return <Badge className="badge-solid-secondary">{status}</Badge>;
  }
};

const chartConfig = {
  sales: {
    label: "Sales ($)",
    color: "hsl(var(--primary))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--info))",
  },
};

export default function VelzonDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        {/* <Button className="btn-solid-primary gap-2">
          <Eye className="h-4 w-4" />
          View Reports
        </Button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {statsCards.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className={`${stat.bgClass} border-0`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-90">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trending === "up" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className="opacity-20">
                    <IconComponent className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Orders by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={topProductsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-card-border rounded-lg hover:bg-table-hover transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {order.products}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{order.total}</div>
                    <div className="text-sm text-muted-foreground">{order.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}