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
    url: '/pages',
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
        url: '/pages',
        icon: 'icon-basket-loaded',
        children: [
          {
            name: 'History',
            url: '/orders',
            icon: 'icon-basket-loaded',
          },
          {
            name: 'Map Order',
            url: '/orders/order-map',
            icon: 'icon-basket-loaded',
          },
          {
            name: 'Payment checklist',
            url: '/orders/payment-details',
            icon: 'icon-basket-loaded',
          },
        ]
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
        name: 'Vehicles',
        url: '/vehicles-list',
        icon: 'fa fa-car'
      },
      {
        name: 'Pincodes',
        url: '/pincode',
        icon: 'fa fa-map-pin'
      },
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
          name: 'Tax & Others',
          url: '/tax&others',
          icon: 'fa fa-sliders'
      }
    ]
  },
  {
    name: 'MIS Report',
    url: '/pages',
    icon: 'fa fa-cogs',
    children: [
      {
        name: 'Sale Register',
        url: '/sale-register',
        icon: 'fa fa-info'
      },
      {
          name: 'Performance Tracking',
          url: '/performance-tracking',
          icon: 'fa fa-sliders'
      },
      {
        name: 'Commission Payable',
        url: '/commision-payable',
        icon: 'fa fa-sliders'
    },
    {
      name: 'Agnet Tree Traking',
      url: '/agent-tree',
      icon: 'fa fa-sliders'
    },
    {
      name: 'Payment Receipt',
      url: '/payment-receipt',
      icon: 'fa fa-sliders'
    },
    // {
    //   name: 'Vendor Payments',
    //   url: '/vendor-payments',
    //   icon: 'fa fa-sliders'
    // }
    ]
  },
  {
    name: 'Transactions',
    url: '/pages',
    icon: 'fa fa-cogs',
    children: [
      {
        name: 'Past Withdrawals',
        url: '/past-withdrawals',
        icon: 'fa fa-sliders'
      },
      {
        name: 'Withdrawals',
        url: '/payouts',
        icon: 'fa fa-sliders'
      }
      ,{
        name:'refund',
        url:'/refund',
        icon:'fa fa-sliders'
      }

    ]
  }
];
