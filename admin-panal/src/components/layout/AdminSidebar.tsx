import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tag,
  Shirt,
  Palette,
  Tags,
  Percent,
  Ticket,
  ShoppingCart,
  CreditCard,
  Users,
  Star,
  Settings,
  MessageSquare,
  ChevronDown,
  Layers,
  Droplet,
  Ruler,
  Heart,
  ShoppingBasket,
  Navigation,
  Columns,
  Home,
  Shield,
  FileText,
  BarChart2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const mainNavItems = [{ title: "Dashboard", url: "/", icon: LayoutDashboard }];

const superAdminItems = [
  { title: "All Stores", url: "/stores", icon: Home },             
  { title: "Store Owners", url: "/store-owners", icon: Users },   
];

const catalogItems = [
  { title: "Products", url: "/products", icon: Package },
  { title: "Categories", url: "/categories", icon: FolderTree },
  { title: "Brands", url: "/brands", icon: Tag },
  { title: "Types", url: "/types", icon: Shirt },
  { title: "Fabrics", url: "/fabrics", icon: Palette },
  { title: "Product Labels", url: "/product-labels", icon: Tags },
  { title: "Colors", url: "/colors", icon: Droplet },
  { title: "Sizes", url: "/sizes", icon: Ruler },
];

const promotionItems = [
  { title: "Discounts", url: "/discounts", icon: Percent },
  { title: "Coupons", url: "/coupons", icon: Ticket },
];

const salesItems = [
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Payments", url: "/payments", icon: CreditCard },
];

const customerItems = [
  { title: "Users", url: "/users", icon: Users },
  { title: "Customer Reviews", url: "/customer-reviews", icon: Star },
  { title: "Wishlist", url: "/wishlists", icon: Heart },
  { title: "Cart", url: "/carts", icon: ShoppingBasket },
];

const systemItems = [
  { title: "Sections", url: "/sections", icon: Layers },
  { title: "Navbar", url: "/navbar", icon: Navigation },
  { title: "Footer", url: "/footer", icon: Columns },
  { title: "Contact Messages", url: "/contact-messages", icon: MessageSquare },
  // { title: "Settings", url: "/settings", icon: Settings },
];


export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
const { user } = useSelector((state: RootState) => state.auth);

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (items: typeof mainNavItems) =>
    items.some(
      (item) => location.pathname.startsWith(item.url) && item.url !== "/"
    );

  const getNavClass = (path: string) => {
    const active = isActive(path);
    return `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-sidebar-active text-sidebar-active-foreground shadow-sm"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Layers className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                Mycra
              </h2>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink to={item.url} className={getNavClass(item.url)}>
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {!isCollapsed && (
          <>
            {/* Catalog Management */}
            <Collapsible defaultOpen={isGroupActive(catalogItems)}>
              <SidebarGroup>
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Catalog
                  </SidebarGroupLabel>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {catalogItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              className={getNavClass(item.url)}
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            {/* Promotions */}
            <Collapsible defaultOpen={isGroupActive(promotionItems)}>
              <SidebarGroup>
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Promotions
                  </SidebarGroupLabel>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {promotionItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              className={getNavClass(item.url)}
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            {/* Sales */}
            <Collapsible defaultOpen={isGroupActive(salesItems)}>
              <SidebarGroup>
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sales
                  </SidebarGroupLabel>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {salesItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              className={getNavClass(item.url)}
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            {/* Customers */}
            <Collapsible defaultOpen={isGroupActive(customerItems)}>
              <SidebarGroup>
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Customers
                  </SidebarGroupLabel>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {customerItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              className={getNavClass(item.url)}
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            {/* System */}
            <Collapsible defaultOpen={isGroupActive(systemItems)}>
              <SidebarGroup>
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    System
                  </SidebarGroupLabel>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {systemItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              className={getNavClass(item.url)}
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

             {user?.role === "super_admin" && (
        <Collapsible defaultOpen={isGroupActive(superAdminItems)}>
          <SidebarGroup>
            <CollapsibleTrigger className="flex w-full items-center justify-between">
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Super Admin
              </SidebarGroupLabel>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {superAdminItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.url} className={getNavClass(item.url)}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      )}
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
