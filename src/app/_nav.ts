interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Catalog',
    url: '/products',
    icon: 'icon-layers',
    children: [
      {
        name: 'Products',
        url: '/products-list',
        icon: 'icon-star'
      },
      {
        name: 'Categories',
        url: '/categories-list',
        icon: 'icon-star'
      },
      {
        name: 'Banner',
        url: '/bannermaster-list',
        icon: 'icon-star'
      }
    ]
  },

  {
    name: 'Sales',
    url: '/pages',
    icon: 'icon-chart',
    children: [
      {
        name: 'Order',
        url: '/orders-list',
        icon: 'icon-star'
      },
      {
        name: 'Customers',
        url: '/customer-list',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Retailers',
    url: '/pages',
    icon: 'icon-people',
    children: [
      {
        name: 'Retailer Listing',
        url: '/retailer-list',
        icon: 'icon-star'
      },
      {
        name: 'Product Mapping',
        url: '/retailerproduct-list',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Transport',
    url: '/pages',
    icon: 'icon-people',
    children: [
      {
        name: 'Drivers',
        url: '/driver-list',
        icon: 'icon-star'
      }
    ]
  },

];
