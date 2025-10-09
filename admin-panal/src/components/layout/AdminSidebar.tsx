import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tag,
  Shirt,
  Palette,
  Tags,
  Droplet,
  Ruler,
  Percent,
  Ticket,
  ShoppingCart,
  CreditCard,
  Users,
  Star,
  Heart,
  ShoppingBasket,
  Layers,
  Navigation,
  Columns,
  MessageSquare,
  Settings,
  ChevronDown
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RootState } from "@/store";


const mainNavItems = [{ title: "Dashboard", url: "/", icon: LayoutDashboard }];

const catalogItems = [
  { title: "Categories", url: "/categories", icon: FolderTree },
  { title: "Brands", url: "/brands", icon: Tag },
  { title: "Types", url: "/types", icon: Shirt },
  { title: "Fabrics", url: "/fabrics", icon: Palette },
  { title: "Product Labels", url: "/product-labels", icon: Tags },
  { title: "Colors", url: "/colors", icon: Droplet },
  { title: "Sizes", url: "/sizes", icon: Ruler },
  { title: "Products", url: "/products", icon: Package },
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
  { title: "Pages", url: "/pages", icon: Layers },
  { title: "Navbar", url: "/navbar", icon: Navigation },
  { title: "Footer", url: "/footer", icon: Columns },
  { title: "Contact Messages", url: "/contact-messages", icon: MessageSquare },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (items: any[]) =>
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

  // ✅ Role-based allowed sections
  const getAllowedSections = () => {
    if (!user) return [];

    switch (user.role) {
      case "admin":
        return [
          { label: "Main", items: mainNavItems },
          { label: "Catalog", items: catalogItems },
          { label: "Promotions", items: promotionItems },
          { label: "Sales", items: salesItems },
          { label: "Customers", items: customerItems },
          { label: "System", items: systemItems },
        ];
      default:
        return [];
    }
  };

  const allowedSections = getAllowedSections();

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Layers className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">Mycra</h2>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {allowedSections.map((section) => (
          <Collapsible
            key={section.label}
            defaultOpen={isGroupActive(section.items)}
          >
            <SidebarGroup>
              {!isCollapsed && (
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.label}
                  </SidebarGroupLabel>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </CollapsibleTrigger>
              )}
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
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
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
