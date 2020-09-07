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
    icon: 'icon-speedometer'
  },
  {
    name: 'Catalog',
    url: '/products',
    icon: 'icon-layers',
    children: [
      {
        name: 'Products',
        url: '/products-list',
        icon: 'fa fa-product-hunt'
      },
      {
        name: 'Categories',
        url: '/categories-list',
        icon: 'fa fa-server'
      },
      {
        name: 'Banners',
        url: '/bannermaster-list',
        icon: 'fa fa-file-image-o'
      }
    ]
  },

  {
    name: 'Sales',
    url: '/pages',
    icon: 'icon-chart',
    children: [
      {
        name: 'Orders',
        url: '/orders-list',
        icon: 'icon-basket-loaded'
      },
      {
        name: 'Customers',
        url: '/customer-list',
        icon: 'icon-people'
      },
      {
        name: 'Vendors',
        url: '/retailer-list',
        icon: 'icon-list'
      }
    ]
  },
  // {
  //   name: 'Retailers',
  //   url: '/pages',
  //   icon: 'icon-people',
  //   children: [
  //     {
  //       name: 'Retailers',
  //       url: '/retailer-list',
  //       icon: 'icon-list'
  //     },
  //     {
  //       name: 'Products',
  //       url: '/retailerproduct-list',
  //       icon: 'icon-pin'
  //     }
  //   ]
  // },
  {
    name: 'Transport',
    url: '/pages',
    icon: 'fa fa-ship',
    children: [
      {
        name: 'Drivers',
        url: '/driver-list',
        icon: 'fa fa-motorcycle'
      },
      {
        name: 'Pincodes',
        url: '/pincode',
        icon: 'fa fa-map-pin'
      }
    ]
  },
  {
    name: 'Settings',
    url: '/pages',
    icon: 'fa fa-cogs',
    children: [
      {
        name: 'CMS',
        url: '/cms',
        icon: 'fa fa-info'
      },
      {
          name: 'Miscellaneous',
          url: '/miscellaneous',
          icon: 'fa fa-sliders'
      }
    ]
  },
  // {
  //   name: 'Report',
  //   url: '/invoice',
  //   icon: 'icon-speedometer'
  // }
];
