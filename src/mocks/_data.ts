import {
  _id,
  _price,
  _times,
  _company,
  _boolean,
  _fullName,
  _taskNames,
  _postTitles,
  _description,
  _productNames,
} from "./_mock";

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: "Jaydon Frankie",
  email: "demo@minimals.cc",
  photoURL: "/assets/images/avatar/avatar-25.webp",
};

// ----------------------------------------------------------------------

export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  name: _fullName(index),
  email: _company(index),
  avatar: `/assets/images/avatar/avatar-${index + 1}.webp`,
  status: index % 4 ? "active" : "inactive",
  role: index % 3 ? "admin" : "user",
}));

// ----------------------------------------------------------------------

export const _posts = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  },
}));

// ----------------------------------------------------------------------

const COLORS = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

export const _products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: _id(index),
    price: _price(index),
    discount: Math.floor(Math.random() * (50 - 5 + 1)) + 5,
    quantity: Math.floor(Math.random() * 100000),
    title: _productNames(index),
    thumbnail: `/assets/images/product/product-${setIndex}.webp`,
    status:
      ([1, 3, 5].includes(setIndex) && "active") ||
      ([4, 8, 12].includes(setIndex) && "inactive") ||
      "active",
    description: "",
    categorySlug: "",
    images: [],
  };
});

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: "en",
    label: "English",
    icon: "/assets/icons/flags/ic-flag-en.svg",
  },
  {
    value: "de",
    label: "German",
    icon: "/assets/icons/flags/ic-flag-de.svg",
  },
  {
    value: "fr",
    label: "French",
    icon: "/assets/icons/flags/ic-flag-fr.svg",
  },
];

// ----------------------------------------------------------------------

export const _timeline = [...Array(5)].map((_, index) => ({
  id: _id(index),
  title: [
    "1983, orders, $4220",
    "12 Invoices have been paid",
    "Order #37745 from September",
    "New order placed #XF-2356",
    "New order placed #XF-2346",
  ][index],
  type: `order${index + 1}`,
  time: _times(index),
}));

// ----------------------------------------------------------------------

export const _tasks = [...Array(5)].map((_, index) => ({
  id: _id(index),
  name: _taskNames(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [
  {
    id: _id(1),
    title: "Your order is placed",
    description: "waiting for shipping",
    avatarUrl: null,
    type: "order-placed",
    postedAt: _times(1),
    isUnread: true,
  },
  {
    id: _id(2),
    title: _fullName(2),
    description: "answered to your comment on the Minimal",
    avatarUrl: "/assets/images/avatar/avatar-2.webp",
    type: "friend-interactive",
    postedAt: _times(2),
    isUnread: true,
  },
  {
    id: _id(3),
    title: "You have new message",
    description: "5 unread messages",
    avatarUrl: null,
    type: "chat-message",
    postedAt: _times(3),
    isUnread: false,
  },
  {
    id: _id(4),
    title: "You have new mail",
    description: "sent from Guido Padberg",
    avatarUrl: null,
    type: "mail",
    postedAt: _times(4),
    isUnread: false,
  },
  {
    id: _id(5),
    title: "Delivery processing",
    description: "Your order is being shipped",
    avatarUrl: null,
    type: "order-shipped",
    postedAt: _times(5),
    isUnread: false,
  },
];

export const _categories = [
  {
    id: _id(1),
    title: "Áo",
    parentSlug: "",
    description: "Áo",
    status: "active",
    slug: "ao",
    timestamps: _times(1),
  },
  {
    id: _id(2),
    title: "Áo sơ mi",
    parentSlug: "ao",
    description: "Áo sơ mi",
    status: "active",
    slug: "ao-so-mi",
    timestamps: _times(2),
  },
  {
    id: _id(3),
    title: "Áo thun",
    parentSlug: "ao",
    description: "Áo thun",
    status: "active",
    slug: "ao-thun",
    timestamps: _times(3),
  },
  {
    id: _id(4),
    title: "Quần",
    parentSlug: "",
    description: "Quần",
    status: "active",
    slug: "quan",
    timestamps: _times(4),
  },
  {
    id: _id(5),
    title: "Quần jean",
    parentSlug: "quan",
    description: "Quần jean",
    status: "active",
    slug: "quan-jean",
    timestamps: _times(5),
  },
  {
    id: _id(6),
    title: "Quần tây",
    parentSlug: "quan",
    description: "Quần tây",
    status: "active",
    slug: "quan-tay",
    timestamps: _times(6),
  },
  {
    id: _id(7),
    title: "Giày",
    parentSlug: "",
    description: "Giày",
    status: "active",
    slug: "giay",
    timestamps: _times(7),
  },
  {
    id: _id(8),
    title: "Giày thể thao",
    parentSlug: "giay",
    description: "Giày thể thao",
    status: "active",
    slug: "giay-the-thao",
    timestamps: _times(8),
  },
  {
    id: _id(9),
    title: "Giày lười",
    parentSlug: "giay",
    description: "Giày lười",
    status: "active",
    slug: "giay-loi",
    timestamps: _times(9),
  },
];
