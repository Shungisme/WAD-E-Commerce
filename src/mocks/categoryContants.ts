export interface ChildCategory {
  name: string;
  link: string;
}

export interface ParentCategory {
  parent: string;
  child: ChildCategory[];
}

export const CATEGORIES_CONTANT = (): ParentCategory[] => {
  return [
    {
      parent: "Sản phẩm giày",
      child: [
        {
          name: "Giày thời trang",
          link: "#",
        },
        {
          name: "Giày chạy bộ",
          link: "#",
        },
        {
          name: "Giày bóng đá",
          link: "#",
        },
        {
          name: "Giày bóng rổ",
          link: "#",
        },
        {
          name: "Giày trượt ván",
          link: "#",
        },
      ],
    },
    {
      parent: "Sản phẩm áo",
      child: [
        {
          name: "Áo gió",
          link: "#",
        },
        {
          name: "Áo thun",
          link: "#",
        },
        {
          name: "Áo polo",
          link: "#",
        },
        {
          name: "Áo nỉ",
          link: "#",
        },
        {
          name:"Áo khoác",
          link:"#"
        }
      ],
    },
    {
      parent: "Sản phẩm quần",
      child: [
        {
          name: "Quần gió",
          link: "#",
        },
        {
          name: "Quần short",
          link: "#",
        },
        {
          name: "Quần dài",
          link: "#",
        },
        {
          name: "Quần nỉ",
          link: "#",
        },
        {
          name:"Quần thể thao",
          link:"#"
        }
      ],
    },
    {
      parent: "Phụ kiện",
      child: [
        {
          name: "Tất",
          link: "#",
        },
        {
          name: "Mũ",
          link: "#",
        },
        {
          name: "Balo",
          link: "#",
        },
        {
          name: "Thắt lưng",
          link: "#",
        },
        {
          name:"Đồng hồ",
          link:"#"
        }
      ],
    },
    {
      parent: "Quà lưu niệm",
      child: [
        {
          name: "Dĩa",
          link: "#",
        },
        {
          name: "Rubik",
          link: "#",
        },
        {
          name:"Cốc",
          link:"#"
        },
        {
          name:"Túi sách",
          link:"#"
        },
        {
          name:"Vòng tay",
          link:"#"
        }
      ],
    },
  ];
};
